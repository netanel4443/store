import * as types from './types/homeActionTypes'
import { ProductDetails } from '../data/ProductDetails'
import { AddProductModalErrors } from '../data/AddProductModalErrors'
import { errorConsoleIfDebug, logConsoleIfDebug } from '../utils/consoleUtils'
import * as repo from '../data/firebaseOperations'
import * as localRepo from '../data/localdatabase/cachedData'
import { stringify } from 'querystring'

export const addProductCategoryToDb=(category:string,)=>{
  return (dispatch:any)=>{
    if(category!==""){
      return(
        dispatch(showLoadingModal(true)),
        dispatch(disableAddCategoryModalBtn(true)),

        repo.addCategory().doc().set({category:category})
          .then(()=>{
            dispatch(showLoadingModal(false))
            dispatch(disableAddCategoryModalBtn(false))
          })
          .catch((e)=>errorConsoleIfDebug(e))
      )
    }
  }
}

export const showLoadingModal=(visibility:boolean)=>{
  return{
      type:types.SHOW_OR_HIDE_SPINNER,
      visibility:visibility
  }
}

export const showAddProductModalVisibility=(visibility:boolean,selectedProductDetails:ProductDetails)=>{
    return{
      type:types.SHOW_ADD_PRODUCT_MODAL_VISIBILITY,
      visibility:visibility,
      selectedProductDetails: selectedProductDetails
    }
}

export const getCategoriesFromDb=()=>{
  return (dispatch:any)=>{

    return( 
      repo.getProductCategories().then(querySnapshot=>{
        const categoryArr:Map<string,string>=new Map()
          querySnapshot.docs.forEach(category=>{
            
            categoryArr.set(category.get('category'),category.id)//'category' field from database 
          })      
          dispatch(categ(categoryArr))
      })
        .catch(error=>{errorConsoleIfDebug(error)})
    )
  }
}

export const getAllProductsFromDb=()=>{
  return (dispatch:any)=>{
    const products=new Map<string,Map<string,ProductDetails>>() //Map<category id,Product details>
    const getAllproducts= repo.getAllProducts()
    return(
     getAllproducts.get().then((snapshot1)=>{
        
     snapshot1.forEach(categoryId=>{
       const tmpMap=new Map<string,ProductDetails>()
      getAllproducts.doc(categoryId.id).collection('products').get()
            .then(productSnap=> productSnap.forEach(product=>{
                const data=product.data() as ProductDetails
                tmpMap.set(product.id,data)
              
            }))
            .catch(e=>errorConsoleIfDebug(e))  
            products.set(categoryId.id,tmpMap)
            logConsoleIfDebug(products)
     })     
      })
    )
  }
}



export const getProductsFromDb=(categoryId:string)=>{
  return (dispatch:any)=>{
    const products=new Map<string,ProductDetails>() //Map<category id,Product details>
    return(
      repo.getProducts(categoryId).get()
      .then((snapshot)=>{
          snapshot.forEach(product => {
            const data=product.data() as ProductDetails
            products.set(product.id,data)
          });
          dispatch({
            type:types.GET_PRODUCTS,
            products:products
          })
      }).catch(e=>errorConsoleIfDebug(e))
    )
  }
}

const categ=(categories:Map<string,string>)=>{
    return{
      type:types.GET_CATEGORIES,
      categories:categories
    }
}

export const disableAddCategoryModalBtn=(disabled:boolean)=>{
  return{
    type:types.ADD_CATEGORY_MODAL_BTN_DISABLED,
    disabled:disabled
  }
}

export const deleteProductCategoryFromDb=(category:string)=>{
  return(dispatch:any)=>{
    return(
      dispatch(showLoadingModal(true)),
      
      repo.deleteProductCategory(category).delete()
      .catch((e)=>dispatch(showModalMessageToUser('Could not delete.',true)))
      .finally(()=>dispatch(showLoadingModal(false)))
    )
  }
}

export const updateProduct=(categoryId:string,productDetails:ProductDetails,image:File | null)=>(dispatch:any)=>{
    console.log(`doc ${categoryId}`)
    if(productDetails.productName!==""&&productDetails.category!==""){
        dispatch(showLoadingModal(true))

      if(image){
        if(productDetails.imageUrl!==""){
          return(
            repo.deleteProductImage(productDetails.imageUrl)
            .catch((e)=>{
              errorConsoleIfDebug(e)
              dispatch(showLoadingModal(false))
            })
            .then(()=> dispatch(addProductToDb(categoryId,productDetails,image)))
          )
        }
        else{
          dispatch(addProductToDb(categoryId,productDetails,image))
        }
      }
      else{
       dispatch( uploadProductDetailsToDb(categoryId,productDetails))
      }
  }
  else{
    const errorMessages=new AddProductModalErrors()
    if(productDetails.category===""){
      errorMessages.category="Include product category"
    }
    if(productDetails.productName===""){
      errorMessages.productName="Include product name"
    }
    dispatch(addProductModalErrors(errorMessages))
  }

}

export const addProductToDb=(categoryId:string,productDetails:ProductDetails,image:File)=>(dispatch:any)=>{
    
     
        dispatch(showLoadingModal(true))//start progress bar

        const uploadTask= repo.uploadProductImage(image)
    
        return(
        uploadTask.on('state_changed',snapshot=>{},
            (error)=>{
              errorConsoleIfDebug(error.message)
              dispatch(showLoadingModal(false)) //dismiss progress bar
            },
            ()=>{//success
            uploadTask.snapshot.ref.getDownloadURL()
                .then(url=> {
                  productDetails.imageUrl=url
                  dispatch(uploadProductDetailsToDb(categoryId,productDetails))
                })
                .catch(e=>{
                  errorConsoleIfDebug(e)
                  dispatch(showLoadingModal(false)) //dismiss progress bar
                })
            })
        )
  
}


export const uploadProductDetailsToDb=(categoryId:string,productDetails:ProductDetails)=>(dispatch:any)=>{
 
    const productDetailsCopy=Object.assign({},productDetails)
    return(
      repo.uploadProductDetails(categoryId).add(productDetailsCopy)
      .then(()=>logConsoleIfDebug('Product uploaded successfuly'))
      .catch(e=>errorConsoleIfDebug(e))
      .finally(()=>{ 
        dispatch(showLoadingModal(false))
        dispatch(showAddProductModalVisibility(false,new ProductDetails()))
      }
      )
    )
  
}

export const addProductModalErrors=(errorMessages:AddProductModalErrors)=>{
  
  return{
    type:types.ADD_PRODUCT_MODAL_ERRORS,
    errors:errorMessages
  }
}

export const showModalMessageToUser=(message:string,visibility:boolean)=>{
  return {
    type:types.MODALS_MESSAGE_TO_USER,
    message:message,
    visibility:visibility
  }
}

export const addProductToCart=(path:string)=>{
  localRepo.saveItemToCart(path)
}
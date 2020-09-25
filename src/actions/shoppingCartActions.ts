import * as types from './types/shoppingCartTypes'
import * as localRepo from '../data/localdatabase/cachedData'
import * as repo from '../data/firebaseOperations'
import { firestore } from 'firebase'
import { ProductDetails } from '../data/ProductDetails'
import { errorConsoleIfDebug } from '../utils/consoleUtils'
import { Stream } from 'stream'


export const getShoppingCartProducts=()=>{
 return(dispatch:any)=> {
  let paths:string[]=[]
   const queryArr:Promise<firestore.DocumentSnapshot<firestore.DocumentData>>[]=[]
    return(
      paths = localRepo.getShoppingCartItems(),
      paths.forEach((path:string)=>{
       queryArr.push( repo.getShoppingCartProducts(path) )
      }),
      Promise.all(queryArr).then(querySnapshots=>{
        const tmpDataMap=new Map<string,ProductDetails>()
        let totalPrice=0  
        querySnapshots.forEach(obj=>{
          const data=(obj.data() as ProductDetails)
          //handle a situation of product is not found in this path anymore / maybe deleted or the database has changed
          if(data!=undefined){
          tmpDataMap.set(data.productName,data)
          totalPrice=totalPrice+parseFloat(data.price).valueOf()
          }
          else{
            console.log(obj.ref.id)
            const notFound=`Expired ${tmpDataMap.size}`
            const productDetails=new ProductDetails()
            productDetails.productName=notFound
            const itemPath=obj.ref.id
            tmpDataMap.set(itemPath,productDetails)
          }
        })
        
        dispatch({type:types.GET_STORED_PRODUCTS,
                  savedProducts:tmpDataMap,
                  totalPrice:totalPrice
        })
      }).catch(e=>errorConsoleIfDebug(e))
    )
 }
}

export const deleteProductFromDb=(key:string,oldTotalPrice:number)=>{
  return(dispatch:any,getState:any)=>{
    localRepo.deleteItemFromCart(key)
    const products:Map<string,ProductDetails>=new Map(getState().shoppingCartReducer.savedProducts)
    const productPrice=parseFloat(products.get(key)!.price)
    const newTotalPrice=oldTotalPrice-productPrice.valueOf()
    
    if(key===getState().shoppingCartReducer.clickedProductKey){
     dispatch( setClickedProduct(undefined))
    }
    
    products.delete(key) 
    
    dispatch({type:types.GET_STORED_PRODUCTS,
      savedProducts:products,
      totalPrice:newTotalPrice
    })
  }
}

export const setClickedProduct=(clickedProductKey:string | undefined)=>{
  return{
    type:types.SET_CLICKED_PRODUCT,
    clickedProductKey:clickedProductKey
  }
}
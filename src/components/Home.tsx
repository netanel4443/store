import React from 'react'
import '../css/home.css'
import mainImage from '../images/website-main-img.jpeg'
import HomeNavBar from './HomeNavBar'
import  * as actions from '../actions/homeActions'
import {useEffect, useState } from 'react'
import {useDispatch,useSelector, shallowEqual} from 'react-redux'
import SimpleSpinnerModal from './modals/SimpleSpinnerModal'
import SimpleMessageModal from './modals/SimpleMessageModal'
import AddProductModal from './modals/AddProductModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle ,faEdit,faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { ProductDetails } from '../data/ProductDetails'
import { RootState } from '../reducers/rootReducer'
import '../utils/mapUtils'

function Home() {

  const  dispatch = useDispatch()

  const {isLoading,modalsMessage,messageModalVisibility}= useSelector((state:RootState) =>( {
    isLoading:state.homeReducer.loadingSpinnerVisibility,
    modalsMessage:state.homeReducer.modalsMessage,
    messageModalVisibility:state.homeReducer.messageModalVisibility,
  }),shallowEqual)

  const categories:Map<string,string>=useSelector((state:RootState)=>state.homeReducer.categories)
  const products:Map<string,Map<string,ProductDetails>>=
           useSelector((state:RootState)=> state.homeReducer.productsDetailsFromDb)
  

  useEffect(() => { 
     if(products.size==0){
       dispatch(actions.getAllProductsFromDb())
     }
  }, [])


  const setMessageModalVisibility=(visibility:boolean)=>{
    dispatch(actions.showModalMessageToUser('',visibility))
  }
  const onShowAddProductModal=()=>{
    dispatch(actions.showAddProductModalVisibility(true,new ProductDetails()))
  }

  const editProductDetails=(product:ProductDetails)=>{
    dispatch(actions.showAddProductModalVisibility(true,product))
  }


  const tes=(product:Map<string,ProductDetails>)=>{
    const tmpArr:any=[]
    product.forEach((prod,productId)=>{
      tmpArr.push(
        <li> 
        <div className='product' key={prod.productName}>
          <img className='productImage' src={prod.imageUrl}/>
          <div  className="cardy">
          <div className="card-body">
            <h5 className="card-title" style={{color:'white'}}>{prod.productName}</h5>
            <p className="card-text" style={{color:'white'}}>{prod.productDescription}</p>
            <p className='categoryPrice' style={{color:'lightskyblue'}}>{prod.price}$</p>
          </div>
          </div>
          <div className='productOptionsBar'>
          <FontAwesomeIcon className='editProductBtn' icon={faEdit} onClick={()=>editProductDetails(prod)} />
          <FontAwesomeIcon className='addProductToCartBtn' icon={faCartPlus} onClick={()=>actions.addProductToCart(productId)} />
          </div>
      </div>
      </li>
      )
  })
  return tmpArr
  }

  const _productsByCategoryy=()=>{
    const prodctsDesign:any=[]
    products.forEach((product,key) => {
      prodctsDesign.push(  
        <div className='products-row-parent'>
          <h3 style={{fontFamily:'serif'}}>{categories.getKey(key)}</h3>
          <ul className='products-horizontal-list' >
           {  tes(product)   }
          </ul>
        </div>
      )
    });

    return prodctsDesign
  }

  return (
    <div >
      <div className='main'>
        <img className='mainImage' src={mainImage} alt='s'></img>

        <div className='add-product-btn' onClick={onShowAddProductModal}>
          <div className='add-product-text'>Add product</div>
          <FontAwesomeIcon icon={faPlusCircle} style={{margin:10}}/>
        </div>
        
        <div className="homeNavbarAndProductGridParen">
          <div><HomeNavBar /></div>
          <div className='productGrid'>
             {_productsByCategoryy()}
          </div>
        </div>
      </div>
      <SimpleSpinnerModal isVisible={isLoading}/>
      <SimpleMessageModal 
        message={modalsMessage}
        setVisibility={(visibility)=>setMessageModalVisibility(visibility)}
        visibility={messageModalVisibility}/>
      <AddProductModal/>  
    </div>
  )
}

export default Home
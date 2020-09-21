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
import { logConsoleIfDebug } from '../utils/consoleUtils'
import { RootState } from '../reducers/rootReducer'

function Home() {

  const  dispatch = useDispatch()

  const {isLoading,modalsMessage,messageModalVisibility}= useSelector((state:RootState) =>( {
    isLoading:state.homeReducer.loadingSpinnerVisibility,
    modalsMessage:state.homeReducer.modalsMessage,
    messageModalVisibility:state.homeReducer.messageModalVisibility,
   
  }),shallowEqual)

  const products:Map<string,Map<string,ProductDetails>>=
            useSelector((state:RootState)=> state.homeReducer.productsDetailsFromDb)
  

  useEffect(() => { 
    // if(products.size==0){
       dispatch(actions.getAllProductsFromDb())
       logConsoleIfDebug('effect')
    // }
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

  const _productsByCategory=()=>{
    const prod:any=[]
    products.forEach((product) => {
      prod.push (
        <div className='product' key={product.productName}>
          <img className='productImage' src={product.imageUrl}/>
          <div  className="cardy">
          <div className="card-body">
            <h5 className="card-title">{product.productName}</h5>
            <p className="card-text">{product.productDescription}</p>
            <p className='categoryPrice' style={{color:'lightgreen'}}>{product.price}$</p>
          </div>
          </div>
          <div className='productOptionsBar'>
          <FontAwesomeIcon className='editProductBtn'  icon={faEdit} onClick={()=>editProductDetails(product)} />
          <FontAwesomeIcon className='addProductToCartBtn'   icon={faCartPlus} onClick={()=>actions.addProductToCart(product.productName)} />
          </div>
         
        </div>
        )
    });
    return prod
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
          <div className='productGrid'>{_productsByCategory()}</div>
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
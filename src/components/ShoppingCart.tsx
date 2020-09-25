import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions/shoppingCartActions'
import { ProductDetails } from '../data/ProductDetails'
import { RootState } from '../reducers/rootReducer'
import '../css/shoppingcart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function ShoppingCart() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getShoppingCartProducts())  
  }, [])

  const savedProducts:Map<string,ProductDetails>=useSelector((state:RootState)=>state.shoppingCartReducer.savedProducts)
  const totalPrice=useSelector((state:RootState)=>state.shoppingCartReducer.totalPrice)
  const clickedProduct:string|undefined=useSelector((state:RootState)=>state.shoppingCartReducer.clickedProductKey)


  const productsDesign=()=>{
    const prodcutsArr:any=[]
    savedProducts.forEach((savedProduct:ProductDetails,key)=>{
      prodcutsArr.push(
        <li className='savedProduct' key={key} >
          <img className='savedProductImage' src={savedProduct.imageUrl} onClick={()=>{
          dispatch(actions.setClickedProduct(key))
          console.log('clicked')

         }}/>
          <FontAwesomeIcon className='savedProductDeleteIcon' icon={faTrash}
                onClick={()=>{
                  console.log('delete')
                  dispatch(actions.deleteProductFromDb(key,totalPrice))
                  }} />
        </li>
        )
    })
    return prodcutsArr
  }
 


  return (
    <div className='mainParentShoppingCart'>

      <div>
        <p>Total products: {savedProducts.size}</p>
        <p>Total price: {totalPrice}</p>
      </div>
     
      {clickedProduct!==undefined ?(
        <div className='clickedSavedProduct'>
        <img className='clickedImg' src={savedProducts.get(clickedProduct)?.imageUrl}/>
        <div className="clickedProductCard">
          <div style={{display:'flex',flexDirection:'row',gap:50}}>
            <h4 className="card-title-bold">{savedProducts.get(clickedProduct)?.productName}</h4>
            <h4 className='savedProductCategoryPrice' style={{color:'lightgreen'}}>{savedProducts.get(clickedProduct)?.price}$</h4>
          </div>
            <p className="card-text">{savedProducts.get(clickedProduct)?.productDescription}</p>
         
        </div>
        </div>
      ):(null)
      }

       <ul className='savedProductsParent'>
          {productsDesign()}
        </ul>
    </div>
  )
}


export default ShoppingCart

import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions/shoppingCartActions'
import { ProductDetails } from '../data/ProductDetails'
import { RootState } from '../reducers/rootReducer'
import '../css/shoppingcart.css'

function ShoppingCart() {
  const dispatch = useDispatch()

  useEffect(() => {
      if(savedProducts.size===0){
        dispatch(actions.getShoppingCartProducts())
      }
  }, [])

  const [clickedProduct,setClickedProduct]=useState<ProductDetails>()

  const savedProducts=useSelector((state:RootState)=>state.shoppingCartReducer.savedProducts)
  const totalPrice=useSelector((state:RootState)=>state.shoppingCartReducer.totalPrice)


  const productsDesign=()=>{
    const prodcutsArr:any=[]
    savedProducts.forEach((savedProduct:ProductDetails)=>{
        prodcutsArr.push(
        <li className='savedProduct' key={savedProduct.productName} onClick={()=>setClickedProduct(savedProduct)}>
          <img className='savedProductImage' src={savedProduct.imageUrl}/>
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
        <img className='clickedImg'  src={(clickedProduct.imageUrl)}/>
        <div className="clickedProductCard">
          <div className="card-body">
            <h5 className="card-title">{clickedProduct.productName}</h5>
            <p className="card-text">{clickedProduct.productDescription}</p>
            <p className='savedProductCategoryPrice' style={{color:'lightgreen'}}>{clickedProduct.price}$</p>
          </div>
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

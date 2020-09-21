import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions/topNavBarActions'
import { logos } from '../images/logos/logos'
import { RootState } from '../reducers/rootReducer'
import '../css/topnavbar.css'
import StroreOwnerDetailsModal from './modals/StroreOwnerDetailsModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import SimpleSpinnerModal from './modals/SimpleSpinnerModal'
import StoreOwnerDetails from '../data/StoreOwnerDetails'
import { Link } from 'react-router-dom'
import { SHOPPING_CART_LINK } from '../actions/ui/links'


function TopNavBar() {
  /*SOD= StoreOwnerDetails*/

  const dispatch = useDispatch()
  const details:StoreOwnerDetails=useSelector((state:RootState)=>state.topNavBarReducer.storeOwnerDetails)
  const stroreOwnerDetailsModalVisibility=useSelector((state:RootState)=>state.topNavBarReducer.stroreOwnerDetailsModalVisibility)
  const isLoading:boolean=useSelector((state:RootState)=>state.topNavBarReducer.isLoading)
  const isEditSODBtnEnabled:boolean=useSelector((state:RootState)=>state.topNavBarReducer.isEditSODBtnEnabled)

  useEffect(() => {
    if(!details.hasData())
    dispatch(actions.getStoreOwnerDetailsFromDb())
  
  }, [])


  const changeStoreOwnerDetailsModalVisibility=(visibility:boolean)=>{
    dispatch(actions.changeStoreOwnerDetailsModalVisibility(visibility))
  }

  return (
    <div>
      <header  className='topNavBar container-fluid'>
       <button  style={{borderStyle:'none', backgroundColor:'transparent'}} 
                disabled={isEditSODBtnEnabled} onClick={()=>changeStoreOwnerDetailsModalVisibility(true)}>
        <FontAwesomeIcon  icon={faEdit} />
       </button>
        {(details.fbUrl!=="")?<img className='storeOwnerDetailsLogo' src={logos.facebook} onClick={()=>window.open(details.fbUrl)}/>:null}
        {(details.instagramUrl!=="")?<img  className='storeOwnerDetailsLogo' src={logos.instagram} onClick={()=>window.open(details.instagramUrl)}/>:null}
        {(details.location!=="")?<img  className='storeOwnerDetailsLogo' src={logos.location} onClick={()=>console.log(details.location)}/>:null}
  
        <div className='shoppingCartDiv'>
            <Link to={'/'+SHOPPING_CART_LINK} style={{color:'red',margin:10}}>
              <FontAwesomeIcon icon={faShoppingCart} size="lg"  />
              Cart
            </Link>
        </div>
      </header>
     
      <StroreOwnerDetailsModal
       isVisible={stroreOwnerDetailsModalVisibility}
       onConfirmation={(newDetails)=>dispatch(actions.updateStoreOwnerDetailsInDb(newDetails))}
       setVisibility={(visibility)=>changeStoreOwnerDetailsModalVisibility(visibility)}
       currentDetails={details}
       />

       <SimpleSpinnerModal isVisible={ isLoading }/>
       
    </div>
  )
}



export default TopNavBar

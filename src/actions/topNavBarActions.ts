import *as types from '../actions/types/topNavBarActionTypes'
import {getStoreOwnerDetail} from '../data/firebaseOperations'
import StoreOwnerDetails from '../data/StoreOwnerDetails'
import { errorConsoleIfDebug, logConsoleIfDebug } from '../utils/consoleUtils'
import { showLoadingModal} from '../actions/common/commonActions'

export const getStoreOwnerDetailsFromDb=()=>{
  return (dispatch:any)=>{
    return(
      getStoreOwnerDetail().get()
      .then(querySnapshot=>{
          const data=querySnapshot.data() as StoreOwnerDetails
          if(data!==undefined){
            dispatch({type:types.GET_STORE_OWNER_DETAILS,storeOwnerDetails:data})
          }
      })
      .catch(e=>errorConsoleIfDebug(e))
      .finally(()=>dispatch({type:types.ENABLE_OR_DISABLE_SOD_BTN,disabled:false}))
    )
  }
}

export const updateStoreOwnerDetailsInDb=(details:StoreOwnerDetails)=>{
  const detailsCopy=Object.assign({},details)
  return(dispatch:any)=>{
    return(
      dispatch(showOrHideLoadingSpinner(true)),
      getStoreOwnerDetail().set(detailsCopy)
      .catch(e=>errorConsoleIfDebug(e))
      .finally(()=> 
          dispatch(showOrHideLoadingSpinner(false),
          dispatch(changeStoreOwnerDetailsModalVisibility(false))
      )
      )
    )
  }
 
}

export const changeStoreOwnerDetailsModalVisibility=(visibility:boolean)=>{
    return{
      type:types.CHANGE_STORE_OWNER_DETAILS_MODAL_VISIBILITY,
      visibility:visibility
    }
}

export const showOrHideLoadingSpinner=(visibility:boolean)=>{
  return{
    type:types.SHOW_OR_HIDE_SPINNERR,
    visibility:visibility
  }
}
import * as types from '../actions/types/shoppingCartTypes'
import { ProductDetails } from '../data/ProductDetails'

const initialState={
savedProducts:new Map<string,ProductDetails>(),
totalPrice:0

}

const shoppingCartReducer=(state=initialState,action:any)=>{

  switch(action.type){
    case types.GET_STORED_PRODUCTS:
      return{
          ...state,
          savedProducts:action.savedProducts,
          totalPrice:action.totalPrice
      }
     default: return state  
  }
}


export default shoppingCartReducer
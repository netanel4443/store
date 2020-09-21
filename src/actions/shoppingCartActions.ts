import * as types from './types/shoppingCartTypes'
import * as localRepo from '../data/localdatabase/cachedData'
import * as repo from '../data/firebaseOperations'
import { firestore } from 'firebase'
import { ProductDetails } from '../data/ProductDetails'

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
                   tmpDataMap.set(data.productName,data)
                   totalPrice=+data.price
                  })
                  
                  dispatch({type:types.GET_STORED_PRODUCTS,
                            savedProducts:tmpDataMap,
                            totalPrice:totalPrice})
      })
    )
 }
}

const getSavedProductsFromDatabase=()=>{

}

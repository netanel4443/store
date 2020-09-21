import database from '../firebase'
import {storage} from '../firebase'
import { firestore } from 'firebase'

const CATEGORIES='categories'
const PRODUCTS='products'
const STORE_OWNER_DETAILS='storeOwnerDetails'  

export const addCategory=()=>{
  return  database.collection(CATEGORIES)
}

export const getProductCategories=()=>{
  return database.collection(CATEGORIES).get()         
}

export const deleteProductCategory=(category:string)=>{
  return database.collection(CATEGORIES).doc(category)
}

export const getProducts=(categoryId:string)=>{
  return database.collection(PRODUCTS).doc(categoryId).collection(PRODUCTS)
}

export const getAllProducts=()=>{
  return database.collection(CATEGORIES)
}

export const deleteProductImage=(path:string)=>{
  return storage.refFromURL(path).delete()
}

export const uploadProductImage=(image:File)=>{
  return storage.ref(image.name).put(image)
}

export const uploadProductDetails=(categoryId:string)=>{
   return database.collection(CATEGORIES).doc(categoryId).collection(PRODUCTS)
}

export const getShoppingCartProducts=(pathsToProduct:string):
        Promise<firestore.DocumentSnapshot<firestore.DocumentData>>=>{

  return database.collection(PRODUCTS).doc(pathsToProduct).get()
}

export const getStoreOwnerDetail=()=>{
  return database.collection(STORE_OWNER_DETAILS).doc('details')
}

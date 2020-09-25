import { logConsoleIfDebug } from "../../utils/consoleUtils"

const SHOPPING_CART='shoppingCart'

export const saveItemToCart=(path:string)=>{
  const stored=localStorage.getItem(SHOPPING_CART)
  logConsoleIfDebug(path)
  if(stored!==null){
    const parsedStored:string[]=JSON.parse(stored)
    //if is already on list , don't add again.
    if(!parsedStored.includes(path)){
      parsedStored.push(path)
      localStorage.setItem(SHOPPING_CART,JSON.stringify(parsedStored))
    }    
  }
  else{
    const tmpArray:string[]=[]
    tmpArray.push(path)  
    localStorage.setItem(SHOPPING_CART,JSON.stringify(tmpArray))
  }
}

export const getShoppingCartItems=():string[]=>{
  const stored=localStorage.getItem(SHOPPING_CART)
  if(stored!==null){
    logConsoleIfDebug(stored)
    return JSON.parse(stored)  
  }
  else{
    return []
  }
}

export const deleteItemFromCart=(itemPath:string)=>{ 
  const arrOfPaths=localStorage.getItem(SHOPPING_CART)
  const parsedArr:string[]=JSON.parse(arrOfPaths!)
  const itemIndex= parsedArr.indexOf(itemPath)
  parsedArr.splice(itemIndex,1)
  localStorage.removeItem(SHOPPING_CART) 
  localStorage.setItem(SHOPPING_CART,JSON.stringify(parsedArr))
}
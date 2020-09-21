import { logConsoleIfDebug } from "../../utils/consoleUtils"

const SHOPPING_CART='shoppingCart'

export const saveItemToCart=(path:string)=>{
  const stored=localStorage.getItem(SHOPPING_CART)
  if(stored!==null){
    const parsedStored:string[]=JSON.parse(stored)    
    parsedStored.push(path)
    localStorage.setItem(SHOPPING_CART,JSON.stringify(parsedStored))
    logConsoleIfDebug(parsedStored)

  }
  else{
    const tmpArray:string[]=[]
    tmpArray.push(path)  
    localStorage.setItem(SHOPPING_CART,JSON.stringify(tmpArray))
    logConsoleIfDebug(stored)

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
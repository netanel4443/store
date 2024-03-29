declare global {
  interface Map<K,V> {
     getKey(value: V): K;
 }
}

export const getKey=Map.prototype.getKey=function<K,V>(value:V):K | undefined  {
 let desiredKey:K|undefined
 this.forEach((v:V,k:K)=>{
   if (v === value){
     desiredKey=k
     return ;
   }
 }) 
 return desiredKey
}

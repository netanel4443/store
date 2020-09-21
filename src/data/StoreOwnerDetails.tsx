
export default class StoreOwnerDetails {
  fbUrl:string=""
  instagramUrl:string=""
  location:string=""

   hasData=():boolean=>{
    if( this.fbUrl.length>0 &&
        this.instagramUrl.length>0&&
        this.location.length>0){
          return true
        }
    else{  return false  }
  }
}
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import  Modal  from 'react-bootstrap/Modal'
import StoreOwnerDetails from '../../data/StoreOwnerDetails'


interface Props{
  isVisible:boolean,
  setVisibility(visibility: boolean): void,
  onConfirmation(details: StoreOwnerDetails): void,
  currentDetails:StoreOwnerDetails
}

function StroreOwnerDetailsModal({isVisible,setVisibility,onConfirmation,currentDetails}:Props) {

  const [details,setDetails]=useState(new StoreOwnerDetails())

  return (
    <div>
      <Modal
        show={isVisible}
        onShow={()=>setDetails((Object.assign({},currentDetails)))}
        onHide={()=> setVisibility(false) }
      >
        <Modal.Body>
          <form style={{display:'flex', flexDirection:'column'}}>
            <label>Facebook url:</label>
            <input defaultValue={currentDetails.fbUrl} type="text" onChange={(e)=>details.fbUrl=e.target.value}/>
            <label>Instagram url:</label>
            <input defaultValue={currentDetails.instagramUrl} type="text" onChange={(e)=>details.instagramUrl=e.target.value}/>
            <label>Location url:</label>
            <input defaultValue={currentDetails.location} type="text" onChange={(e)=>details.location=e.target.value}/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setVisibility(false)}>cancel</Button>
          <Button variant="primary"  onClick={()=>onConfirmation(details)}>ok</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default StroreOwnerDetailsModal

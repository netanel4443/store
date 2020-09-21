import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'


interface Props{
  isVisible:boolean,
  setVisibility(visibility: boolean): void,
  addCategory(categoryToAdd: string): void,
  disabled:boolean
}

function AddCategoryModal({isVisible, setVisibility,addCategory,disabled}:Props) {

  const [category,setCategory]=useState('')
  const [addBtnDisabled,setDisabled]=useState(false)

  return (
    <div>
      <Modal
        show={isVisible}
        onHide={()=>setVisibility(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <label>Category name:</label>  
          <input type="text" onChange={(e)=>setCategory(e.target.value)}/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='btn-danger' onClick={()=>setVisibility(false)}>cancel</Button>
          <Button variant="primary" disabled={disabled} onClick={()=>addCategory(category)}>add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


export default AddCategoryModal

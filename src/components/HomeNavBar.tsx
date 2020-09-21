import React from 'react'
import '../css/homenavbar.css'
import {useEffect, useState} from 'react'
import {useSelector,useDispatch, shallowEqual} from 'react-redux'
import * as actions from '../actions/homeActions' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle ,faTrash } from '@fortawesome/free-solid-svg-icons'
import AddCategoryModal from './modals/AddCategoryModal'
import MessageAndActionModal from './modals/MessageAndActionModal'
import { RootState } from '../reducers/rootReducer'

function HomeNavBar() {

  const dispatch = useDispatch()

  const {categories,addCategoryModalBtnDisabled}=useSelector(( state:RootState )=>({
    categories:state.homeReducer.categories,
    addCategoryModalBtnDisabled:state.homeReducer.addCategoryModalBtnDisabled,
  }),shallowEqual)

  const [isModalVisible,setModalVisibility]=useState(false)
  const [deleteCategoryModal,setDeleteCategoryModalVisibility]=useState(false)
  const [message,setMessage]=useState('')
  const [categoryToDelete,setCategoryToDelete]=useState('')

  useEffect(() => {
    dispatch(actions.getCategoriesFromDb())
  }, [])

  const addCategory=(categoryToAdd:string)=>{
     dispatch(actions.addProductCategoryToDb(categoryToAdd))
  }

  const onDeleteClick=(category:string)=>{
      setCategoryToDelete(category)
      setMessage(`Delete " ${category} " ?`)
      setDeleteCategoryModalVisibility(true)
  }
  const categoriesList=()=>{
    const tmpCategoriesArray:any=[]
    categories.forEach((value:string,category:string)=>{
      tmpCategoriesArray.push(
        <div className='category' key={category} >
          <FontAwesomeIcon
            icon={faTrash} size='sm' 
            style={{margin:10}}
            onClick={e=>onDeleteClick(category)}/>
          <div className='categoryName' > {category} </div>
        </div>
      ) 
      })
      return tmpCategoriesArray
  }

  return (
    <div className='mainNav'>
      <div className='categoriesMenu'>
        {categoriesList()}
      </div>

      <div className='add-category-btn'>
        <FontAwesomeIcon  icon={faPlusCircle} size='lg' onClick={()=>setModalVisibility(true)}/>
      </div> 

      <AddCategoryModal 
        isVisible={isModalVisible}
        setVisibility={setModalVisibility}
        addCategory={(categoryToAdd)=>addCategory(categoryToAdd)}
        disabled={addCategoryModalBtnDisabled} />

      <MessageAndActionModal 
        isVisibility={deleteCategoryModal}
        setVisibility={(visibility)=>setDeleteCategoryModalVisibility(visibility)}
        action={()=>dispatch(actions.deleteProductCategoryFromDb(categoryToDelete))}
        message={message}
      />
      
    </div>
   
  )
}

export default HomeNavBar
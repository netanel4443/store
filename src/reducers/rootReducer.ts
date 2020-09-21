import {combineReducers} from 'redux'
import HomeReducer from './HomeReducer'
import shoppingCartReducer from './shoppingCartReducer'
import TopNavBarReducer from './TopNavBarReducer'

const rootReducer=combineReducers({
  homeReducer:HomeReducer,
  shoppingCartReducer:shoppingCartReducer,
  topNavBarReducer:TopNavBarReducer
})
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
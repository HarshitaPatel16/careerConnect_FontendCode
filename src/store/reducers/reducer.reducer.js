import { combineReducers } from 'redux';
import userReducer from './reducers';
import farmerReducer from './reducers';
import messageReducer from './reducers';
import pendingReducer from './reducers';

import productlandingReducer from './reducers'
          
import farmerlandingReducer from './reducers'
import farmimageReducer from './reducers'

const rootReducer = combineReducers({
  user: userReducer,
 
  // Add other reducers here if needed
});



export default rootReducer;
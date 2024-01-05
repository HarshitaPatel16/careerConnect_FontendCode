import { combineReducers } from 'redux';
import userReducer from './reducers';
import postReducer from './reducers';
import commentReducer from './reducers';
import likeReducer from './reducers';


const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  like: likeReducer,
  // Add other reducers here if needed
});



export default rootReducer;
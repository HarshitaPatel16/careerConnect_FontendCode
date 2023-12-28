// actions.js
import axios from "axios";



//Add login //
export const CUSTOMERLOGIN_DATA_REQUEST = "CUSTOMERLOGIN_DATA_REQUEST";
export const CUSTOMERLOGIN_DATA_SUCCESS = "CUSTOMERLOGIN_DATA_SUCCESS";
export const CUSTOMERLOGIN_DATA_FAILURE = "CUSTOMERLOGIN_DATA_FAILURE";
//end login//

//sign-up start//

export const ADD_CREATECUSTOMER_REQUEST = "ADD_CREATECUSTOMER_REQUEST";
export const ADD_CREATECUSTOMER_SUCCESS = "ADD_CREATECUSTOMER_SUCCESS";
export const ADD_CREATECUSTOMER_FAILURE = "ADD_CREATECUSTOMER_FAILURE";

//end//

//create post //

export const ADD_CREATEPOST_REQUEST = "ADD_CREATEPOST_REQUEST";
export const ADD_CREATEPOST_SUCCESS = "ADD_CREATEPOST_SUCCESS";
export const ADD_CREATEPOST_FAILURE = "ADD_CREATEPOST_FAILURE";

//end//

//PROFILE UPDATE 
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

// GET BY PROFILE DATA
export const GET_PROFILE_BY_ID_REQUEST = "GET_PROFILE_BY_ID_REQUEST";
export const GET_PROFILE_BY_ID_SUCCESS = "GET_PROFILE_BY_ID_SUCCESS";
export const GET_PROFILE_BY_ID_FAILURE = "GET_PROFILE_BY_ID_FAILURE";


//Login start //
export const postCustomerLoginData = (API_URL, data) => {
  return (dispatch) => {
    dispatch({ type: CUSTOMERLOGIN_DATA_REQUEST });
    axios
      .post(API_URL + "user/Login", data)
      .then((response) => {
        localStorage.setItem("responsedata", response.data);
        dispatch({ type: CUSTOMERLOGIN_DATA_SUCCESS, payload: response.data });
        return response;
      })
      .catch((error) => {
        dispatch({ type: CUSTOMERLOGIN_DATA_FAILURE, payload: error.message });
        throw error;
      });
  };
};
//login end //

//Sign-up API  start//
export const addCreateCustomer = (API_URL, data) => {
  return (dispatch) => {
    dispatch({ type: ADD_CREATECUSTOMER_REQUEST });
    axios
      .post(API_URL + "user/Registion", data)
      .then((response) => {
        dispatch({ type: ADD_CREATECUSTOMER_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ADD_CREATECUSTOMER_FAILURE, payload: error.message });
      });
  };
};
//end//

//POST CREATE API  start//
export const addCreatePost = (API_URL, data) => {
  return (dispatch) => {
    dispatch({ type: ADD_CREATEPOST_REQUEST });
    axios
      .post(API_URL + "post/createPost", data)
      .then((response) => {
        dispatch({ type: ADD_CREATEPOST_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ADD_CREATEPOST_FAILURE, payload: error.message });
      });
  };
};
//end//

//profile update api start

export const updateProfile = (API_URL, data) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    axios
      .post(API_URL + "user/UpdateUser", data)
      .then((response) => {
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });
        return dispatch(getProfileById(API_URL, data));
      })

      .catch((error) => {
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
      });
  };
};

//GET BY PROFILE DATA

export const getProfileById = (API_URL, data) => {
  return (dispatch) => {
    dispatch({ type: GET_PROFILE_BY_ID_REQUEST });
    axios
      .post(API_URL + "user/readOneUser", data)
      .then((response) => {
        dispatch({ type: GET_PROFILE_BY_ID_SUCCESS, payload: response.data });
      })

      .catch((error) => {
        dispatch({ type: GET_PROFILE_BY_ID_FAILURE, payload: error.message });
      });
  };
};

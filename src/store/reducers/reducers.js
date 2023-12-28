const initialState = {
 
  customerloginData: null,
  customerregstionData:null,
  createPost:null,
  UpdateUser: null,
  readOneUser: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {



    //customer login  start//
    case "CUSTOMERLOGIN_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "CUSTOMERLOGIN_DATA_SUCCESS":
      return {
        ...state,
        customerloginData: action.payload,
        loading: false,
        error: null,
      };
    case "CUSTOMERLOGIN_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // customer login end //

    //customer registion start
    case "ADD_CREATECUSTOMER_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_CREATECUSTOMER_SUCCESS":
      return {
        ...state,
        customerregstionData: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_CREATECUSTOMER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      //customer registion start
    case "ADD_CREATEPOST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_CREATEPOST_SUCCESS":
      return {
        ...state,
        createPost: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_CREATEPOST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

          //customer registion start
    case "UPDATE_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        UpdateUser: action.payload,
        loading: false,
        error: null,
      };
    case "UPDATE_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case "GET_PROFILE_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_PROFILE_BY_ID_SUCCESS":
      return {
        ...state,
        readOneUser: action.payload,
        loading: false,
        error: null,
      };
    case "GET_PROFILE_BY_ID_SUCCESS":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


   


    default:
      return state;
  }
};

export default userReducer;

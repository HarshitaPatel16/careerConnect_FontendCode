const initialState = {
 
  customerloginData: null,
  customerregstionData:null,
  createPost:null,
  createSkills:null,
  createExperience:null,
  readOneExperience:null,
  UpdateUser: null,
  deleteExperience: null,
  deleteSkills: null,
  readOneUser: null,
  readOneSkills: null,
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
// skils 

case "ADD_CREATESKILLS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_CREATESKILLS_SUCCESS":
      return {
        ...state,
        createSkils: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_CREATESKILLS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      //experinces
      // skils 

case "ADD_CREATEEXPERIENCE_REQUEST":
  return {
    ...state,
    loading: true,
    error: null,
  };
case "ADD_CREATEEXPERIENCE_SUCCESS":
  return {
    ...state,
    createExperience: action.payload,
    loading: false,
    error: null,
  };
case "ADD_CREATEEXPERIENCE_FAILURE":
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
    case "GET_PROFILE_BY_ID_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case "GET_SKILLS_BY_ID_REQUEST":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "GET_SKILLS_BY_ID_SUCCESS":
        return {
          ...state,
          readOneSkills: action.payload,
          loading: false,
          error: null,
        };
      case "GET_SKILLS_BY_ID_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case "GET_EXPERIENCE_BY_ID_REQUEST":
          return {
            ...state,
            loading: true,
            error: null,
          };
        case "GET_EXPERIENCE_BY_ID_SUCCESS":
          return {
            ...state,
            readOneExperience: action.payload,
            loading: false,
            error: null,
          };
        case "GET_EXPERIENCE_BY_ID_FAILURE":
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
          case " DELETE_SKILLS_REQUEST":
            return {
              ...state,
              loading: true,
              error: null,
            };
          case "DELETE_SKILLS_SUCCESS":
            return {
              ...state,
              deleteSkills: action.payload,
              loading: false,
              error: null,
            };
          case " DELETE_SKILLS_FAILURE":
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
            case " DELETE_EXPERIENCE_REQUEST":
              return {
                ...state,
                loading: true,
                error: null,
              };
            case "DELETE_EXPERIENCE_SUCCESS":
              return {
                ...state,
                deleteExperience: action.payload,
                loading: false,
                error: null,
              };
            case " DELETE_EXPERIENCE_FAILURE":
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

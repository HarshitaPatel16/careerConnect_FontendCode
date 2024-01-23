const initialState = {
 
  customerloginData: null,
  customerregstionData:null,
  createPost:null,
  createSkills:null,
  createEducation:null,
  readOneExperience:null,
  UpdateUser: null,
  deleteExperience: null,
  deleteSkills: null,
  readOneUser: null,
  readAllPost: null,
  readAllSumPOST: null,
  readOneSkills: null,
  createComment: null,
  readOneComment: null,
  createExperience: null,
  deletePost: null,
  addOrUpdateLike: null,
  readOneLike: null,
  readOneEducation: null,
  readOneBySkillsId: null,
  createRequests: null,
  updateSkills: null,
  readOneUserAllData: null,
  toggleLike: null,
  readOnePost: null,
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
              case "GET_POST_REQUEST":
                return {
                  ...state,
                  loading: true,
                  error: null,
                };
              case "GET_POST_SUCCESS":
                return {
                  ...state,
                  readAllPost: action.payload,
                  loading: false,
                  error: null,
                };
              case "GET_POST_FAILURE":
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
                case "GET_POSTSUM_REQUEST":
                  return {
                    ...state,
                    loading: true,
                    error: null,
                  };
                case "GET_POSTSUM_SUCCESS":
                  return {
                    ...state,
                    readAllSumPOST: action.payload,
                    loading: false,
                    error: null,
                  };
                case "GET_POSTSUM_FAILURE":
                  return {
                    ...state,
                    loading: false,
                    error: action.payload,
                  };
                case "ADD_CREATECOMMENT_REQUEST":
                return {
                  ...state,
                  loading: true,
                  error: null,
                };
              case "ADD_CREATECOMMENT_SUCCESS":
                return {
                  ...state,
                  createComment: action.payload,
                  loading: false,
                  error: null,
                };
              case "ADD_CREATECOMMENT_FAILURE":
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
                case "ADD_CREATEEDUCATIONS_REQUEST":
                return {
                  ...state,
                  loading: true,
                  error: null,
                };
              case "ADD_CREATEEDUCATIONS_SUCCESS":
                return {
                  ...state,
                  createEducation: action.payload,
                  loading: false,
                  error: null,
                };
              case "ADD_CREATEEDUCATIONS_FAILURE":
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };

                case "GET_COMMENT_BY_ID_REQUEST":
                  return {
                    ...state,
                    loading: true,
                    error: null,
                  };
                case "GET_COMMENT_BY_ID_SUCCESS":
                  return {
                    ...state,
                    readOneComment: action.payload,
                    loading: false,
                    error: null,
                  };
                case "GET_COMMENT_BY_ID_FAILURE":
                  return {
                    ...state,
                    loading: false,
                    error: action.payload,
                  };

                  case "ADD_CREATELIKE_REQUEST":
                    return {
                      ...state,
                      loading: true,
                      error: null,
                    };
                  case "ADD_CREATELIKE_SUCCESS":
                    return {
                      ...state,
                      addOrUpdateLike: action.payload,
                      loading: false,
                      error: null,
                    };
                  case "ADD_CREATELIKE_FAILURE":
                    return {
                      ...state,
                      loading: false,
                      error: action.payload,
                    };

                    case "GET_LIKE_BY_ID_REQUEST":
                      return {
                        ...state,
                        loading: true,
                        error: null,
                      };
                    case "GET_LIKE_BY_ID_SUCCESS":
                      return {
                        ...state,
                        readOneLike: action.payload,
                        loading: false,
                        error: null,
                      };
                    case "GET_LIKE_BY_ID_FAILURE":
                      return {
                        ...state,
                        loading: false,
                        error: action.payload,
                      };
                      case "TOGGLE_LIKE_REQUEST":
                      return {
                        ...state,
                        loading: true,
                        error: null,
                      };
                      case "TOGGLE_LIKE_SUCCESS":
                        return {
                          ...state,
                          toggleLike: action.payload,
                          error: null,
                        };
                      case "TOGGLE_LIKE_FAILURE":
                        return {
                          ...state,
                          toggleLike: null,
                          error: action.payload,
                        };

                        case "GET_EDUCATIONS_BY_ID_REQUEST":
                          return {
                            ...state,
                            loading: true,
                            error: null,
                          };
                        case "GET_EDUCATIONS_BY_ID_SUCCESS":
                          return {
                            ...state,
                            readOneEducation: action.payload,
                            loading: false,
                            error: null,
                          };
                        case "GET_EDUCATIONS_BY_ID_FAILURE":
                          return {
                            ...state,
                            loading: false,
                            error: action.payload,
                          };
                          
                        case "GET_SKILLS_REQUEST":
                          return {
                            ...state,
                            loading: true,
                            error: null,
                          };
                        case "GET_SKILLS_SUCCESS":
                          return {
                            ...state,
                            readOneBySkillsId: action.payload,
                            loading: false,
                            error: null,
                          };
                        case "GET_SKILLS_FAILURE":
                          return {
                            ...state,
                            loading: false,
                            error: action.payload,
                          };

                          case "UPDATE_SKILLS_REQUEST":
                            return {
                              ...state,
                              loading: true,
                              error: null,
                            };
                          case "UPDATE_SKILLS_SUCCESS":
                            return {
                              ...state,
                              updateSkills: action.payload,
                              loading: false,
                              error: null,
                            };
                          case "UPDATE_SKILLS_FAILURE":
                            return {
                              ...state,
                              loading: false,
                              error: action.payload,
                            };


                            case "DELETE_POSTS_REQUEST":
                              return {
                                ...state,
                                loading: true,
                                error: null,
                              };
                            case "DELETE_POSTS_SUCCESS":
                              return {
                                ...state,
                                deletePost: action.payload,
                                loading: false,
                                error: null,
                              };
                            case "DELETE_POSTS_FAILURE":
                              return {
                                ...state,
                                loading: false,
                                error: action.payload,
                              };

                              case "GET_POST_BY_ID_REQUEST":
                                return {
                                  ...state,
                                  loading: true,
                                  error: null,
                                };
                              case "GET_POST_BY_ID_SUCCESS":
                                return {
                                  ...state,
                                  readOnePost: action.payload,
                                  loading: false,
                                  error: null,
                                };
                              case "GET_POST_BY_ID_FAILURE":
                                return {
                                  ...state,
                                  loading: false,
                                  error: action.payload,
                                };

                                case "ADD_REQUEST_REQUEST":
                                return {
                                  ...state,
                                  loading: true,
                                  error: null,
                                };
                              case "ADD_REQUEST_SUCCESS":
                                return {
                                  ...state,
                                  createRequests: action.payload,
                                  loading: false,
                                  error: null,
                                };
                              case "ADD_REQUEST_FAILUREE":
                                return {
                                  ...state,
                                  loading: false,
                                  error: action.payload,
                                };


                                case "GET_USER_BY_ID_REQUEST":
                                return {
                                  ...state,
                                  loading: true,
                                  error: null,
                                };
                              case "GET_USER_BY_ID_SUCCESS":
                                return {
                                  ...state,
                                  readOneUserAllData: action.payload,
                                  loading: false,
                                  error: null,
                                };
                              case "GET_USER_BY_ID_FAILURE":
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

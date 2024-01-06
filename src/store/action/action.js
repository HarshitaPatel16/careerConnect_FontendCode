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


export const ADD_CREATECOMMENT_REQUEST = "ADD_CREATEPOST_REQUEST";
export const ADD_CREATECOMMENT_SUCCESS = "ADD_CREATEPOST_SUCCESS";
export const ADD_CREATECOMMENT_FAILURE = "ADD_CREATEPOST_FAILURE";


//create skils

export const ADD_CREATESKILLS_REQUEST = "ADD_CREATESKILLS_REQUEST";
export const ADD_CREATESKILLS_SUCCESS = "ADD_CREATESKILLS_SUCCESS";
export const ADD_CREATESKILLS_FAILURE = "ADD_CREATESKILLS_FAILURE";

//PROFILE UPDATE 
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

// GET BY PROFILE DATA
export const GET_PROFILE_BY_ID_REQUEST = "GET_PROFILE_BY_ID_REQUEST";
export const GET_PROFILE_BY_ID_SUCCESS = "GET_PROFILE_BY_ID_SUCCESS";
export const GET_PROFILE_BY_ID_FAILURE = "GET_PROFILE_BY_ID_FAILURE";

// GET BY SKILS DATA
export const GET_SKILLS_BY_ID_REQUEST = "GET_SKILLS_BY_ID_REQUEST";
export const GET_SKILLS_BY_ID_SUCCESS = "GET_SKILLS_BY_ID_SUCCESS";
export const GET_SKILLS_BY_ID_FAILURE = "GET_SKILLS_BY_ID_FAILURE";

//expircane add

export const ADD_CREATEEXPERIENCE_REQUEST = "ADD_CREATEEXPERIENCE_REQUEST";
export const ADD_CREATEEXPERIENCE_SUCCESS = "ADD_CREATEEXPERIENCE_SUCCESS";
export const ADD_CREATEEXPERIENCE_FAILURE = "ADD_CREATEEXPERIENCE_FAILURE";

export const ADD_CREATELIKE_REQUEST = "ADD_CREATELIKE_REQUEST";
export const ADD_CREATELIKE_SUCCESS = "ADD_CREATELIKE_SUCCESS";
export const ADD_CREATELIKE_FAILURE = "ADD_CREATELIKE_FAILURE";


//expircane get by id

export const GET_EXPERIENCE_BY_ID_REQUEST = "GET_EXPERIENCE_BY_ID_REQUEST";
export const GET_EXPERIENCE_BY_ID_SUCCESS = "GET_EXPERIENCE_BY_ID_SUCCESS";
export const GET_EXPERIENCE_BY_ID_FAILURE = "GET_EXPERIENCE_BY_ID_FAILURE";


export const DELETE_SKILLS_REQUEST = "DELETE_SKILLS_REQUEST";
export const DELETE_SKILLS_SUCCESS = "DELETE_SKILLS_SUCCESS";
export const DELETE_SKILLS_FAILURE = "DELETE_SKILLS_FAILURE";

export const DELETE_EXPERIENCE_REQUEST = "DELETE_EXPERIENCE_REQUEST";
export const DELETE_EXPERIENCE_SUCCESS = "DELETE_EXPERIENCE_SUCCESS";
export const DELETE_EXPERIENCE_FAILURE = "DELETE_EXPERIENCE_FAILURE";



// GET BY Post DATA
export const GET_POST_REQUEST = "GET_POST_REQUEST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAILURE = "GET_POST_FAILURE";


export const GET_COMMENT_BY_ID_REQUEST = "GET_COMMENT_BY_ID_REQUEST";
export const GET_COMMENT_BY_ID_SUCCESS = "GET_COMMENT_BY_ID_SUCCESS";
export const GET_COMMENT_BY_ID_FAILURE = "GET_COMMENT_BY_ID_FAILURE";

export const GET_LIKE_BY_ID_REQUEST = "GET_LIKE_BY_ID_REQUEST";
export const GET_LIKE_BY_ID_SUCCESS = "GET_LIKE_BY_ID_SUCCESS";
export const GET_LIKE_BY_ID_FAILURE = "GET_LIKE_BY_ID_FAILURE";


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
        return dispatch(getreadAllPostData(API_URL,data));

      })
      .catch((error) => {
        dispatch({ type: ADD_CREATEPOST_FAILURE, payload: error.message });
      });
  };
};
//end//

//POST CREATE API  start//
export const addCreateLikes = (API_URL, data) => {
  return (dispatch) => {
    dispatch({ type: ADD_CREATELIKE_REQUEST });
    axios
      .post(API_URL + "like/createLike", data)
      .then((response) => {
        dispatch({ type: ADD_CREATELIKE_SUCCESS, payload: response.data });
        // return dispatch(getCommentById(API_URL,data));

      })
      .catch((error) => {
        dispatch({ type: ADD_CREATELIKE_FAILURE, payload: error.message });
      });
  };
};
//end//

//POST CREATE API  start//
export const addCreateComment = (API_URL, data) => {
  return (dispatch) => {
    dispatch({ type: ADD_CREATECOMMENT_REQUEST });
    axios
      .post(API_URL + "comment/createComment", data)
      .then((response) => {
        dispatch({ type: ADD_CREATECOMMENT_SUCCESS, payload: response.data });
        return dispatch(getCommentById(API_URL,data));

      })
      .catch((error) => {
        dispatch({ type: ADD_CREATECOMMENT_FAILURE, payload: error.message });
      });
  };
};
//end//


//skills CREATE API  start//
export const addCreateSkills = (API_URL, data) => {
  return (dispatch) => {
    dispatch({ type: ADD_CREATESKILLS_REQUEST });
    axios
      .post(API_URL + "skills/createSkills", data)
      .then((response) => {
        dispatch({ type: ADD_CREATESKILLS_SUCCESS, payload: response.data });
        return dispatch(getSkilsById(API_URL,data));
      })
      .catch((error) => {
        dispatch({ type: ADD_CREATESKILLS_FAILURE, payload: error.message });
      });
  };
};
//end//

//skills CREATE API  start//
export const addCreateExperience = (API_URL, data) => {
  return (dispatch) => {
    dispatch({ type: ADD_CREATEEXPERIENCE_REQUEST });
    axios
      .post(API_URL + "experience/createExperience", data)
      .then((response) => {
        dispatch({ type: ADD_CREATEEXPERIENCE_SUCCESS, payload: response.data });
        return dispatch(getExperienceById(API_URL,data));
      })
      .catch((error) => {
        dispatch({ type: ADD_CREATEEXPERIENCE_FAILURE, payload: error.message });
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

export const getLikeById = (API_URL, data) => {
  return (dispatch) => {
    dispatch({ type: GET_LIKE_BY_ID_REQUEST });
    axios
      .post(API_URL + "like/readOneLike", data)
      .then((response) => {
        dispatch({ type: GET_LIKE_BY_ID_SUCCESS, payload: response.data });
      })

      .catch((error) => {
        dispatch({ type: GET_LIKE_BY_ID_FAILURE, payload: error.message });
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

export const getCommentById = (API_URL, postId) => {
  return (dispatch) => {
    dispatch({ type: GET_COMMENT_BY_ID_REQUEST });
    axios
      .post(API_URL + "comment/readOneComment", { post_id: postId })
      .then((response) => {
        dispatch({ type: GET_COMMENT_BY_ID_SUCCESS, payload: response.data });
      })

      .catch((error) => {
        dispatch({ type: GET_COMMENT_BY_ID_FAILURE, payload: error.message });
      });
  };
};

//get by skills
export const getSkilsById = (API_URL, data) => {
  return (dispatch) => {
    dispatch({ type: GET_SKILLS_BY_ID_REQUEST });
    axios
      .post(API_URL + "skills/readOneSkills", data)
      .then((response) => {
        dispatch({ type: GET_SKILLS_BY_ID_SUCCESS, payload: response.data });
      })

      .catch((error) => {
        dispatch({ type: GET_SKILLS_BY_ID_FAILURE, payload: error.message });
      });
  };
};

//get by Experiance
export const getExperienceById = (API_URL, data) => {
  return (dispatch) => {
    dispatch({ type: GET_EXPERIENCE_BY_ID_REQUEST });
    axios
      .post(API_URL + "experience/readOneExperience", data)
      .then((response) => {
        dispatch({ type: GET_EXPERIENCE_BY_ID_SUCCESS, payload: response.data });
        
      })

      .catch((error) => {
        dispatch({ type: GET_EXPERIENCE_BY_ID_FAILURE, payload: error.message });
      });
  };
};

//delete skils

export const deleteSkills= (API_URL,data) => {
  return (dispatch) => {
    dispatch({ type: DELETE_SKILLS_REQUEST });
    axios
      .post(API_URL + "skills/deleteSkills",data)
      .then((response) => {
        dispatch({ type: DELETE_SKILLS_SUCCESS, payload: response.data });
        return dispatch(getSkilsById(API_URL, data));
      })

      .catch((error) => {
        dispatch({ type: DELETE_SKILLS_FAILURE, payload: error.message });
      });
  };
};

//delete skils

export const deleteExperience= (API_URL,data) => {
  return (dispatch) => {
    dispatch({ type: DELETE_EXPERIENCE_REQUEST });
    axios
      .post(API_URL + "experience/deleteExperience",data)
      .then((response) => {
        dispatch({ type: DELETE_EXPERIENCE_SUCCESS, payload: response.data });
        return dispatch(getExperienceById(API_URL, data));
      })

      .catch((error) => {
        dispatch({ type: DELETE_EXPERIENCE_FAILURE, payload: error.message });
      });
  };
};

export const getreadAllPostData = (API_URL) => {
  return (dispatch) => {
    dispatch({ type: GET_POST_REQUEST });
    axios
      .get(API_URL + "post/readAllPost")
      .then((response) => {
        dispatch({ type: GET_POST_SUCCESS, payload: response.data });
      })

      .catch((error) => {
        dispatch({ type: GET_POST_FAILURE, payload: error.message });
      });
  };
};

export const TOGGLE_LIKE_REQUEST = "TOGGLE_LIKE_REQUEST";
export const TOGGLE_LIKE_SUCCESS = "TOGGLE_LIKE_SUCCESS";
export const TOGGLE_LIKE_FAILURE = "TOGGLE_LIKE_FAILURE";

export const toggleLike = (API_URL, formData) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_LIKE_REQUEST });

    try {
      const response = await axios.post(`${API_URL}/like/toggleLike`, formData);
      dispatch({ type: TOGGLE_LIKE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: TOGGLE_LIKE_FAILURE, payload: error.message });
    }
  };
};
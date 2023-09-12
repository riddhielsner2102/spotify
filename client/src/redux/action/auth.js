import { LOGIN_SUCCESS, LOGIN_FAILURE } from './authTypes';
import { API_BASE_URL, COMMON_HEADERS } from '../service/album'; // Import the common config

export const login = (email, password) => async (dispatch) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.auth) {
          localStorage.setItem("userdata", JSON.stringify(data.user));
          localStorage.setItem("auth", JSON.stringify(data.auth));
          dispatch({ type: LOGIN_SUCCESS, payload: data.user });
          // Optionally, you can navigate here if needed.
          // navigate("/");
        } else {
          dispatch({ type: LOGIN_FAILURE, payload: "No user found" });
        }
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: "Request failed" });
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };

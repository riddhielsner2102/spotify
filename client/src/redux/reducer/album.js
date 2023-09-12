import {
    CREATE_ALBUM_SUCCESS,
    CREATE_ALBUM_FAILURE,
    READ_ALBUMS_SUCCESS,
    READ_ALBUMS_FAILURE,
    READ_ALBUM_SUCCESS,
    READ_ALBUM_FAILURE,
    UPDATE_ALBUM_SUCCESS,
    UPDATE_ALBUM_FAILURE,
    DELETE_ALBUM_SUCCESS,
    DELETE_ALBUM_FAILURE,
    SEARCH_ALBUMS_FAILURE,
    SEARCH_ALBUMS_SUCCESS
  } from '../action/albumTypes';
  
  const initialState = {
    albums: [],
    album: null,
    error: null,
  };
  console.log("🚀 ~ file: album.js:21 ~ initialState:", initialState)
  
  const albumReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ALBUM_SUCCESS:
        return {
          ...state,
          album: action.payload,
          error: null,
        };
      case CREATE_ALBUM_FAILURE:
        return {
          ...state,
          album: null,
          error: action.payload,
        };
      case READ_ALBUMS_SUCCESS:
        return {
          ...state,
          albums: action.payload,
          error: null,
        };
      case READ_ALBUMS_FAILURE:
        return {
          ...state,
          albums: [],
          error: action.payload,
        };
        case SEARCH_ALBUMS_SUCCESS:
          return {
            ...state,
            searchResults: action.payload, // Update search results
          };
        case SEARCH_ALBUMS_FAILURE:
          return {
            ...state,
            error: action.payload,
          };
      case READ_ALBUM_SUCCESS:
        return {
          ...state,
          album: action.payload,
          error: null,
        };
      case READ_ALBUM_FAILURE:
        return {
          ...state,
          album: null,
          error: action.payload,
        };
      case UPDATE_ALBUM_SUCCESS:
        return {
          ...state,
          album: action.payload,
          error: null,
        };
      case UPDATE_ALBUM_FAILURE:
        return {
          ...state,
          album: null,
          error: action.payload,
        };
      case DELETE_ALBUM_SUCCESS:
        return {
          ...state,
          albums: state.albums.filter((album) => album.id !== action.payload),
          error: null,
        };
      case DELETE_ALBUM_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default albumReducer;
  
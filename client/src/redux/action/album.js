import axios from 'axios';
import { API_BASE_URL, COMMON_HEADERS } from '../service/album'; // Import the common config


// Action Types
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';
export const CREATE_ALBUM_FAILURE = 'CREATE_ALBUM_FAILURE';
export const READ_ALBUMS_SUCCESS = 'READ_ALBUMS_SUCCESS';
export const READ_ALBUMS_FAILURE = 'READ_ALBUMS_FAILURE';
export const READ_ALBUM_SUCCESS = 'READ_ALBUM_SUCCESS';
export const READ_ALBUM_FAILURE = 'READ_ALBUM_FAILURE';
export const UPDATE_ALBUM_SUCCESS = 'UPDATE_ALBUM_SUCCESS';
export const UPDATE_ALBUM_FAILURE = 'UPDATE_ALBUM_FAILURE';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';
export const DELETE_ALBUM_FAILURE = 'DELETE_ALBUM_FAILURE';
export const SEARCH_ALBUMS_SUCCESS = 'SEARCH_ALBUMS_SUCCESS';
export const SEARCH_ALBUMS_FAILURE = 'SEARCH_ALBUMS_FAILURE';
// Action Creators

export const createAlbum = (albumData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/albums/createalbum`, albumData, {
      headers: {
        "authorization" : JSON.parse(localStorage.getItem('auth')),
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ type: CREATE_ALBUM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_ALBUM_FAILURE, payload: error.message });
  }
};

// Read all albums
export const readAlbums = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/albums/getalbums`, {
      headers: COMMON_HEADERS, // Use common headers
    });
    dispatch({ type: READ_ALBUMS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: READ_ALBUMS_FAILURE, payload: error.message });
  }
};


// Read a specific album
export const readAlbum = (albumId) => async (dispatch) => {
  console.log("🚀 ~ file: album.js:49 ~ readAlbum ~ albumId:", albumId)
  try {
    const response = await axios.get(`${API_BASE_URL}/albums/${albumId}`, {
      headers: COMMON_HEADERS, // Use common headers

    });
    dispatch({ type: READ_ALBUM_SUCCESS, payload: response.data.data });
    console.log("🚀 ~ file: album.js:52 ~ readAlbum ~ response:", response)
  } catch (error) {
    dispatch({ type: READ_ALBUM_FAILURE, payload: error.message });
  }
};

// Update an album
export const updateAlbum = (albumId, albumData) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/albums/updatealbum/${albumId}`, albumData, {
      headers: {
        "authorization" : JSON.parse(localStorage.getItem('auth')),
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ type: UPDATE_ALBUM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_ALBUM_FAILURE, payload: error.message });
  }
};

// Delete an album
export const deleteAlbum = (albumId) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/albums/${albumId}`, {
      headers: COMMON_HEADERS,
    });
    dispatch({ type: DELETE_ALBUM_SUCCESS, payload: albumId });
  } catch (error) {
    dispatch({ type: DELETE_ALBUM_FAILURE, payload: error.message });
  }
};
export const searchAlbums = (searchQuery) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/searchalbum/${searchQuery}`, {
      headers: COMMON_HEADERS,
    });
    const data = await response.json();
    
    dispatch({ type: SEARCH_ALBUMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEARCH_ALBUMS_FAILURE, payload: error.message });
  }
};
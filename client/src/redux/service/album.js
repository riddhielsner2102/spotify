
const API_BASE_URL = 'http://localhost:5000'; // Your API base URL

const COMMON_HEADERS = {
  'Content-Type': 'application/json',
  "authorization" : JSON.parse(localStorage.getItem('auth'))
};

export { API_BASE_URL, COMMON_HEADERS };
import axios from 'axios';

const getAPI = (params) => `https://jsonplaceholder.typicode.com/${params}`;

// Posts API
export const fetchPosts = (params = '') => axios.get(getAPI(`posts${params}`));
export const createPost = (postData) => axios.post(getAPI('posts'), postData);

// Comments API
export const fetchComments = (params = '') => axios.get(getAPI(`comments${params}`));

// Todos API
export const fetchTodos = (params = '') => axios.get(getAPI(`todos${params}`));

// Albums API
export const fetchAlbums = (params = '') => axios.get(getAPI(`albums${params}`));

// Photos API
export const fetchPhotos = (params = '') => axios.get(getAPI(`photos${params}`));

// Users API
export const fetchUsers = (params = '') => axios.get(getAPI(`users${params}`));

// google AUth User Info
export const googleAuthUserInfo = (access_token) => axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
        Authorization: `Bearer ${access_token}`
    },
    crossdomain: true
});

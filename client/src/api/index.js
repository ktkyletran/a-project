import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  };

  return req;
})

export const fetchPosts = () => API.get('/posts');
export const fetchPostsBySearch = (query, tag) => API.get(`/posts/search?query=${query || 'none' }&tag=${tag || 'none'}`);
export const createPost = (postData) => API.post('/posts', postData);
export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
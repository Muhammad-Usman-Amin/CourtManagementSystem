import axios from 'axios';

//const url = 'http://localhost:5000/posts';
const url = 'http://192.168.43.52:5000/posts'; // this is accessible from local network i.e mobiles etc, the ip is wireless wifi's ipv4 address

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
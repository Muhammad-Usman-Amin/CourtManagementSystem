import axios from 'axios';

// Home Network
// const url = 'http://localhost:5000/posts';
const url = 'http://192.168.43.52:5000/posts'; // this is accessible from local network i.e mobiles etc, the ip is wireless wifi's ipv4 address
const urlCases = 'http://192.168.43.52:5000/cases';
const urlEmployeeData = 'http://192.168.43.52:5000/employeeData';
const urlpqsp = 'http://192.168.43.52:5000/pqsp';

// Court Network
// const url = 'http://192.168.1.106:5000/posts'; // (Court) this is accessible from local network i.e mobiles etc, the ip is wireless wifi's ipv4 address
// const urlCases = 'http://192.168.1.106:5000/cases';
// const urlEmployeeData = 'http://192.168.1.106:5000/employeeData';
// const urlpqsp = 'http://192.168.1.106:5000/pqsp';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

export const fetchCases = () => axios.get(urlCases);
export const createCase = (newCase) => axios.post(urlCases, newCase);
export const updateCase = (id, updatedCase) => axios.patch(`${urlCases}/${id}`, updatedCase);
export const deleteCase = (id) => axios.delete(`${urlCases}/${id}`);
export const likeCase = (id) => axios.patch(`${urlCases}/${id}/likeCase`);

export const fetchEmployeeData = () => axios.get(urlEmployeeData);
export const createEmployeeData = (newEmployeeFile) => axios.post(urlEmployeeData, newEmployeeFile);
export const updateEmployeeData = (id, updatedEmployeeFile) => axios.patch(`${urlEmployeeData}/${id}`, updatedEmployeeFile);
export const deleteEmployeeData = (id) => axios.delete(`${urlEmployeeData}/${id}`);
export const likeEmployeeData = (id) => axios.patch(`${urlEmployeeData}/${id}/likeCase`);

//export const fetchpqsp = () => axios.get(urlpqsp);
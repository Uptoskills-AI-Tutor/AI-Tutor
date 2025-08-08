import axios from 'axios';

const BASE_URL = '/api/users';

export const getUserById = (id) => axios.get(`${BASE_URL}/${id}`);
export const getUserProfile = getUserById; // 👈 ADD THIS LINE

export const updateUserProfile = (id, data) => axios.put(`${BASE_URL}/${id}/profile`, data);
export const updateUserNotifications = (id, data) => axios.put(`${BASE_URL}/${id}/notifications`, data);
export const updateUserTheme = (id, data) => axios.put(`${BASE_URL}/${id}/theme`, data);
export const updateUserLanguage = (id, data) => axios.put(`${BASE_URL}/${id}/language`, data);
export const updateUserPassword = (id, data) => axios.put(`${BASE_URL}/${id}/password`, data);

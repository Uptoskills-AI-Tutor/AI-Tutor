// src/api/discussionApi.js
import axios from 'axios';

const BASE_URL = '/api/discussions';

export const fetchDiscussions = () => axios.get(BASE_URL);
export const createDiscussion = (data) => axios.post(BASE_URL, data);
export const updateDiscussion = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteDiscussion = (id) => axios.delete(`${BASE_URL}/${id}`);
export const addReply = (id, reply) => axios.post(`${BASE_URL}/${id}/reply`, { reply });

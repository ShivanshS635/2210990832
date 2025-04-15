const axios = require('axios');
const BASE_URL = process.env.BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0NzAwNzk3LCJpYXQiOjE3NDQ3MDA0OTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImZmNDkyY2IwLTlmMDQtNDI1My1hNDAwLWM3MGM4YjgzNWFlZiIsInN1YiI6InNoaXZhbnNoODMyLmJlMjJAY2hpdGthcmEuZWR1LmluIn0sImVtYWlsIjoic2hpdmFuc2g4MzIuYmUyMkBjaGl0a2FyYS5lZHUuaW4iLCJuYW1lIjoic2hpdmFuc2ggc2hhcm1hIiwicm9sbE5vIjoiMjIxMDk5MDgzMiIsImFjY2Vzc0NvZGUiOiJQd3p1ZkciLCJjbGllbnRJRCI6ImZmNDkyY2IwLTlmMDQtNDI1My1hNDAwLWM3MGM4YjgzNWFlZiIsImNsaWVudFNlY3JldCI6IlJFVXZSWld1TmROY01YV24ifQ.ULQn9NhG7FzcHlHY7YFjr-k_DdIkp8X0vYpltUOVMmA'
  }
});

const getUsers = async () => {
    try {
      const res = await axiosInstance.get(`/users`);
      return res.data.users;
    } catch (err) {
      console.error("API ERROR:", err.response?.status, err.response?.data || err.message);
      throw err;
    }
};

const getUserPosts = async (userId) => {
    try {
        const res = await axiosInstance.get(`/users/${userId}/posts`);
        return res.data.posts;
    } catch (error) {
        console.error("API ERROR:" , err.response?.status, err.response?.data || err.message)
    }
}
const getPostComments =  async (postId) => {
    try {
        const res = await axiosInstance.get(`/posts/${postId}/comments`);
        return res.data.comments;
    } catch (error) {
        console.error("API ERROR:" , err.response?.status, err.response?.data || err.message)
    }
}

module.exports = { getUsers, getUserPosts, getPostComments };

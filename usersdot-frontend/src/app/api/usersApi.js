import axiosInstance from './axiosBaseInstance';

export const fetchUsers = async (paginationInfo) => {
  try {
    const response = await axiosInstance.get('/users', {
      params: {
        page: paginationInfo?.page,
        pageSize: paginationInfo?.pageSize,
        search: paginationInfo?.searchTerm
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users/save', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users/update', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

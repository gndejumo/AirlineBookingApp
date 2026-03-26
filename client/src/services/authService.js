import api from './api';


const registerUser = (userData) => {
    return api.post('/auth/register', userData);
};

const loginUser = (userData) => {
    return api.post('/auth/login', userData);
};

const getProfile = () => {
    return api.get('/auth/profile')
}

export {registerUser, loginUser, getProfile}
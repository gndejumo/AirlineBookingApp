import api from './api';

const updateProfile = (userId, userData) => {
    api.patch(`/users/profile/${userId}`, userData);
};

const getUserBookings = (userId) => {
    api.get(`/users/bookings/${userId}`);
};

const cancelBooking = (userId) => {
    api.patch(`/users/bookings/${userId}/cancel`);
};
const logoutUser = () => {
    api.post('/users/logout');
};


export {updateProfile, getUserBookings, cancelBooking, logoutUser}
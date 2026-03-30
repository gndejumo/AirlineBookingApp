import api from './api';

const updateProfile = (userId, userData) => {
    return api.patch(`/users/profile/${userId}`, userData);
};

const getUserBookings = (userId) => {
    return api.get(`/users/bookings/${userId}`);
};

const cancelBooking = (userId) => {
    return api.patch(`/users/bookings/${userId}/cancel`);
};
const logoutUser = () => {
    return api.post('/users/logout');
};

const deleteBooking = (bookingId) => {
    return api.delete(`/users/bookings/${bookingId}`);
}

export {updateProfile, getUserBookings, cancelBooking, logoutUser, deleteBooking}
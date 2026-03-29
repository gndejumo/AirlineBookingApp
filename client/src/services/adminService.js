import api from './api'


const setAsAdmin = (userId) => {
    return api.patch(`/admin/setAsAdmin/${userId}`)
}

const makeUser = (userId) => {
    return api.patch(`/admin/makeUser/${userId}`)
}

const getAllUsers = () => {
    return api.get('/admin/users')
}

const getAllBookings = () => {
    return api.get('/admin/bookings')
}

const deleteUser = (userId) => {
    return api.delete(`/admin/users/${userId}`)
}
const cancelBookingAdmin = (userId) => {
    return api.delete(`/admin/bookings/${userId}/cancel`)
}

const getDashboardStats = () => {
    return api.get('/admin/dashboard-stats')
}


export {setAsAdmin, getAllUsers, deleteUser, getDashboardStats, makeUser, getAllBookings, cancelBookingAdmin}
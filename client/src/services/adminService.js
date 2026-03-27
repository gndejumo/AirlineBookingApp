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

const deleteUser = (userId) => {
    return api.delete(`/admin/users/${userId}`)
}

const getDashboardStats = () => {
    return api.get('/admin/dashboard-stats')
}

export {setAsAdmin, getAllUsers, deleteUser, getDashboardStats, makeUser}
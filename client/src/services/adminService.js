import api from './api'


const setAsAdmin = (userId) => {
    return api.patch(`/admin/${userId}`)
}

const getAllUsers = () => {
    return api.get('/admin/users')
}

const deleteUser = (userId) => {
    return api.delete(`/admin/users/${userId}`)
}

export {setAsAdmin, getAllUsers, deleteUser}
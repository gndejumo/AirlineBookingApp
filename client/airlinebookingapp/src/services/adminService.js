import api from './api'


const setAsAdmin = (userId) => {
    api.patch(`/admin/${userId}`)
}

const getAllUsers = () => {
    api.get('/admin/users')
}

const deleteUser = (userId) => {
    api.delete(`/admin/users/${userId}`)
}

export {setAsAdmin, getAllUsers, deleteUser}
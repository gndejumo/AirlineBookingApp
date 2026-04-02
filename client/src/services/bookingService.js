import api from './api';


const calculatePrice = () => {
    return api.post('/bookings/calculate')
}

const paymentProcessing = () => {
    return api.post('/bookings/payment')
}

const checkSeatAvailability = () => {
    return api.post('/bookings/seatavail')
}

const getBookingById = (userId) => {
    return api.get(`/bookings/${userId}`)
}

const bookFlight = (data) => {
    return api.post('/bookings', data)
}

const getMyBookings = (data) => {
    return api.get('/bookings/my-history', data)
}

export {calculatePrice, paymentProcessing, checkSeatAvailability,
    getBookingById,bookFlight, getMyBookings}
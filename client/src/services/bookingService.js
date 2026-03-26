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

const bookFlight = () => {
    return api.post('/bookings/')
}


export {calculatePrice, paymentProcessing, checkSeatAvailability,
    getBookingById,bookFlight}
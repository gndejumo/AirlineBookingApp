import api from './api';


const calculatePrice = () => {
    api.post('/bookings/calculate')
}

const paymentProcessing = () => {
    api.post('/bookings/payment')
}

const checkSeatAvailability = () => {
    api.post('/bookings/seatavail')
}

const getBookingById = (userId) => {
    api.get(`/bookings/${userId}`)
}

const bookFlight = () => {
    api.post('/bookings/')
}


export {calculatePrice, paymentProcessing, checkSeatAvailability,
    getBookingById,bookFlight}
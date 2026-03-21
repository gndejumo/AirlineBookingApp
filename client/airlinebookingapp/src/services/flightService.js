import api from 'api';

const getAllFlights = () => {
    api.get('/flights/')
}

const searchFlights = () => {
    api.get('/flights/search')
}

const filterFlights = () => {
    api.get('/flights/filter')
}

const getFlightById = (flightId) => {
    api.get(`/flights/${flightId}`)
}

const getAvailableSeats = (flightId) => {
    api.get(`/flights/${flightId}/seats`)
}

const createFlight = () => {
    api.post('/flights/')
}

const updateFlight = (flightId) => {
    api.patch(`/flights/${flightId}`)
}

const deleteFlight = (flightId) => {
    api.delete(`/flights/${flightId}`)
}

export {getAllFlights, searchFlights, filterFlights, getFlightById,
    getAvailableSeats, createFlight, updateFlight, deleteFlight}
import api from './api';

const getAllFlights = () => {
    return api.get('/flights');
};

const searchFlights = () => {
    return api.get('/flights/search');
};

const filterFlights = () => {
    return api.get('/flights/filter');
};

const getFlightById = (flightId) => {
    return api.get(`/flights/${flightId}`);
};

const getAvailableSeats = (flightId) => {
    return api.get(`/flights/${flightId}/seats`);
};

const createFlight = (data) => {
    return api.post('/flights', data);
};

const updateFlight = (flightId, data) => {
    return api.patch(`/flights/${flightId}`, data);
};

const deleteFlight = (flightId) => {
    return api.delete(`/flights/${flightId}`);
};

const getAvailableFlights = () => {
    return api.get (`/flight/available`)
}
const getPastFlights = () => {
    return api.get (`/flight/history`)
}

export {
    getAllFlights,
    searchFlights,
    filterFlights,
    getFlightById,
    getAvailableSeats,
    createFlight,
    updateFlight,
    deleteFlight,getAvailableFlights,getPastFlights
};
const JWT = require('jsonwebtoken');
const { errorResponse, successResponse } = require("../../helper/response-format");
const Conductor = require('../../models/conductor-info-model');
const Bus = require('../../models/bus-model');


const GET_PassengersInBus = async (req, res) => {
    const cookies = req.cookies;
    const decodedToken = JWT.verify(cookies.ecopass_conductor_token, process.env.JWT_SECRET);
    const conductor = await Conductor.findById(decodedToken._id);
    const busId = conductor.busId;
    try {
        const bus = await Bus.findById(busId);
        if (!bus) return errorResponse(res, 404, "Bus not found.");

        return successResponse(res, 200, "Passengers in bus details.", { passengersInBus: bus.passengersInBus });
    } catch (error) {
        console.log("🚀 ~ constGET_PassengersInBus= ~ error:", error)
        return errorResponse(res, 500, "Error while getting passegers in bus detials.", error);
    }
};


module.exports = { GET_PassengersInBus };
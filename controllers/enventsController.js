import { Events } from "../modules/eventsSchema.js";
import {handleValidationError} from "../middlewares/errorHandler.js"

export const createEvents = async (req, res, next) => {
    const { events } = req.body;

    try {
        if (!events) {
            return handleValidationError("Please Fill Full Form", 400);
        }

        const newEvent = await Events.create({ events });

        res.status(200).json({
            success: true,
            message: "Event Created Successfully!",
            event: newEvent, // IMPORTANT: return created event
        });
    } catch (err) {
        next(err);
    }
};

export const getAllEvents = async (req, res, next) => {
    try {
        const event = await Events.find(); // event = array of objects
        res.status(200).json({
            success: true,
            event,
        });
    } catch (err) {
        next(err);
    }
};
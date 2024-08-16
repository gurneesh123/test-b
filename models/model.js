import mongoose from "mongoose";

const newSchema = new mongoose.Schema({
    artName: {
        type: String
    },
    serial: {
        type: Number
    },
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String
    },
    bids: [{
        user: {
            type: String,
            required: true
        },
        bid: {
            type: Number,
            required: true
        }
    }]
});

const Art = mongoose.model("Art", newSchema);

export default Art;

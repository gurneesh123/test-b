import express from "express";
import Art from "../models/model.js";  

const router = express.Router();

// Getting arts
router.get('/', async (req, res) => {
    try {
        const result = await Art.find({});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Adding and saving Art
router.post("/", async (req, res) => {
    const { artName, serial, src, alt, bids } = req.body;

    try {
        const newArt = new Art({
            artName,
            serial,
            src,
            alt,
            bids,
        });

        await newArt.save();
        res.status(201).json(newArt);
        
    } catch (error) {
        res.status(500).json(error);
    }
});

// Getting Arts by id
router.get("/:id", async (req, res) => {
    try {
        const result = await Art.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Updating Arts by id
router.put("/:id", async (req, res) => { 
    const id = req.params.id;
    const { artName, serial, src, alt, bids } = req.body;
    try {
        const updateArt = await Art.findByIdAndUpdate(id, {
            artName,
            serial,
            src,
            alt,
            bids,
        }, { new: true });

        res.status(200).json(updateArt);    
    } catch (error) {
        res.status(500).json(error);
    }
});

// Deleting Art by id
router.delete("/:id", async (req, res) => {
    try {
        await Art.findByIdAndDelete(req.params.id); 
        res.status(200).json("Art Deleted"); 
    } catch (error) {
        res.status(500).json(error);
    }
});

// Adding bid to Art
router.post("/:id/bid", async (req, res) => {
    const id = req.params.id;
    const { user, bid } = req.body;
    try {
        const updateArt = await Art.findByIdAndUpdate(id, {
            $push: { bids: { user, bid } },
        }, { new: true });

        res.status(200).json(updateArt);    
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;

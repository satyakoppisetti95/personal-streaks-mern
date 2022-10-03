const streakModel = require('../models/streakModel');

exports.getStreaks = async (req, res) => {
    try {
        let user = req.user;
        const streaks = await streakModel.find({ userId: user._id });
        // check last updated of streak if it is more than 24 hrs then reset count to 0
        streaks.forEach(async (streak) => {
            let lastUpdated = streak.updatedAt;
            let currentDate = new Date();
            let diff = Math.abs(currentDate - lastUpdated);
            let diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
            if (diffDays > 1) {
                streak.count = 0;
                await streak.save();
            }
        });
        res.status(200).json(streaks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.createStreak = async (req, res) => {
    try {
        let user = req.user;
        const { text } = req.body;
        if(!text) {
            res.status(400).json({ message: "Please add a text" });
        }
        const streak = await streakModel.create({
            text,
            userId: user._id,
        });
        res.status(201).json(streak);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateStreak = async (req, res) => {
    try {
        let user = req.user;
        const { text } = req.body;
        const streak = await streakModel.findOneAndUpdate({ userId: user._id, _id: req.params.id }, { text }, { new: true });
        res.status(200).json(streak);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateStreakCount = async (req, res) => {
    try {
        let user = req.user;
        const streak = await streakModel.findOneAndUpdate({ userId: user._id, _id: req.params.id }, { $inc: { count: 1 } }, { new: true });
        res.status(200).json(streak);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteStreak = async (req, res) => {
    try {
        let user = req.user;
        const streak = await streakModel.findOneAndDelete({ userId: user._id, _id: req.params.id });
        res.status(200).json({ message: "Streak deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

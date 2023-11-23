const { User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            console.error({ message: err });
            return res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.thoughtsId });

            !user
            ? res.status(404).json({ message: 'No users with that ID' })
            : res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $set: req.body },
            );

            if (!user) {
                res.status(404).json({ message: 'No thoghts with that ID'})
            }
            
            res.json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.thoughtsId });
            
            if (!user) {
                res.status(404).json({ message: 'No users with that ID'})
            }

            res.json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    }
}


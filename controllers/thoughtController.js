const { Thoughts } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts)
        } catch (err) {
            console.error({ message: err });
            return res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.thoughtsId });

            !thought
            ? res.status(404).json({ message: 'No thoughts with that ID' })
            : res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thoughts.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $set: req.body },
            );

            if (!thought) {
                res.status(404).json({ message: 'No thoghts with that ID'})
            }
            
            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });
            
            if (!thought) {
                res.status(404).json({ message: 'No thoughts with that ID'})
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
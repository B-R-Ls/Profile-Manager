const { Thought, User } = require('../models');


module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (err) {
            console.error({ message: err });
            return res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtsId });

            !thought
            ? res.status(404).json({ message: 'No thoughts with that ID' })
            : res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { thoughts: req.body},
                { runValidators: true, new: true }
            );
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $set: req.body },
                { runValidators: true, new: true }
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
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtsId });
            
            if (!thought) {
                res.status(404).json({ message: 'No thoughts with that ID'})
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { reactions: req.body },
                { runValidators: true, new: true },
                );

            if (!reaction) {
                res.status(404).json({ message: 'No thoughts with that ID'})
            }

            res.json(reaction)
        } catch {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
                );
            
            if (!reaction) {
                res.status(404).json({ message: 'No thoughts with that ID'})
            }

            res.json(reaction)
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
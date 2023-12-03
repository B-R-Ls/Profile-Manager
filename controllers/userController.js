const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            console.error({ message: err });
            return res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            !user
            ? res.status(404).json({ message: 'No users with that ID' })
            : res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $set: req.body },
            );

            if (!user) {
                res.status(404).json({ message: 'No users with that ID'})
            }
            
            res.json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            
            if (!user) {
                res.status(404).json({ message: 'No users with that ID'})
            }

            res.json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { friends: req.body},
                );

                if (!friend) {
                    res.status(404).json({ message: 'No users with that ID'})
                }

                res.json(friend);
        } catch (err){
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const friend = await User.findOneAndDelete({ _id: req.params.friendsId });
            
            if (!friend) {
                res.status(404).json({ message: 'No users with that ID'})
            }

            res.json(friend)
        } catch (err) {
            res.status(500).json(err);
        }
    },
}


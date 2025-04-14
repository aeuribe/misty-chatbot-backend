const UserService = require('../services/userService');

const UserController = {
    async createUser(req, res) {
        const { email, password } = req.body;
        try {
            const newUser = await UserService.createUser(email, password);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await UserService.getUserById(id);
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateUser(req, res) {
        const { id } = req.params;
        const { email, password } = req.body;
        try {
            const updatedUser = await UserService.updateUser(id, email, password);
            if (!updatedUser) return res.status(404).json({ error: 'User not found' });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const deletedUser = await UserService.deleteUser(id);
            if (!deletedUser) return res.status(404).json({ error: 'User not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = UserController;

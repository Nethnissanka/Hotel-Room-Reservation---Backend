// adminRoutes.js
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // Validate admin credentials here
    if (username === 'admin' && password === 'admin123') {
        // Send token or success message
        res.send({ success: true, token: 'adminToken' });
    } else {
        res.status(401).send('Invalid admin credentials');
    }
});

module.exports = router;

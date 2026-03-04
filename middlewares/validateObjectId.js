const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID Format"
        });
    }
    next();
}

module.exports = {validateObjectId}
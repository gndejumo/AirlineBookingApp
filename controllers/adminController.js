const User = require('../models/User');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

const setAsAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role: "admin"},
            { returnDocument: "after" }
        );
        console.log(updatedUser);
        if (!updatedUser) {
            return res.status(404).send({
                message: "User not found."
            });
        } return res.status(200).send({
            message: "Successfully update to admin user.",
            user: {
                id: updatedUser._id,
                email: updatedUser.email,
                role: updatedUser.role
            }
            
        });
    } catch (err) {
        next(err)
    }
};

const makeUser = async (req,res,next) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId,
        {role: "user"},
        {new: true});
        if (!updatedUser) {
            return res.status(404).send({
                message: "User not found"
            })
        }
        return res.status(200).send({
            message: "Successfully updated to regular user",
            user : {
                id: updatedUser._id,
                email: updatedUser.email,
                role: updatedUser.role
            }
        })
    
    } catch (err) {
        next(err);
    }
}

const getAllUsers = (_req, res, next) => {
    return User.find({}).select("-password") //hide password
    .then(users => {
        return res.status(200).send({
            message: "User retrieved successfully",
            users
        });
    })
    .catch(err => next(err))
}

const getAllBookings = async (_req, res, next) => {
try {
    const bookings = await Booking.find()
      .populate("userId", "firstName lastName") // fields you need
      .populate("flightId");                   // critical for duration

    res.json({ bookings });
  } catch (err) {
    next(err)
  } 
}

const cancelBookingAdmin = async(req, res, next) => {
    try {
        const bookingId = req.params.id
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).send({
                message: "Booking not Found"
            })
        }
        booking.status = "cancelled";
        await booking.save();
        res.status(200).send({
            message: "Booking cancelled by admin",
            booking,
        })
    } catch(err) {
        next(err)
    }
}


const deleteUser = (req, res, next) => {
    return User.findByIdAndDelete(req.params.id)
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found"
            })
        }
        return res.status(200).send({
            message: "User deleted Successfully"
        });
    })
    .catch (err => next(err))
}

const getDashboardStats = async (_req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalFlights = await Flight.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const totalAdmins = await User.countDocuments({role: "admin"});
        const totalRegularUsers = await User.countDocuments({role: "user"})

        const revenueData = await Booking.aggregate([
            { $match: { status: "confirmed" } },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" }
                }
            }
        ]);

        const totalRevenue = revenueData[0]?.totalRevenue || 0;

        return res.status(200).send({
            totalUsers,
            totalFlights,
            totalBookings,
            totalRevenue,
            totalAdmins,
            totalRegularUsers
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {setAsAdmin,  getAllUsers, deleteUser, getDashboardStats, makeUser, getAllBookings, cancelBookingAdmin}
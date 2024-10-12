

///routes/bookingsRoute.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
// const stripe = require("stripe")("sk_test_51PicS3KZD25U7VxSUXYq4dpRwhyjdp7Bkr9qjRzwnhiy0mRMK62wEATPsAgNg98nbLmwNUOK76vIf2e87VsUB2ez0050Ie88Bn");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Route to handle room booking
router.post("/bookroom", async (req, res) => {
  const { room, userid, fromDate, toDate, totaldays, totalamount, token } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newBooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromDate,
        toDate,
        totaldays,
        totalamount,
        transactionid: payment.id, // Use the actual payment ID
      });

      const booking = await newBooking.save();

      const roomTemp = await Room.findOne({ _id: room._id });
      if (roomTemp) {
        roomTemp.currentbookings.push({
          bookingid: booking._id,
          fromDate,
          toDate,
          userid,
          status: booking.status,
        });

        await roomTemp.save();
      }
    }

    res.send("Room Booked Successfully");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Route to get bookings by user ID
router.post("/getbookingsbyuserid", async (req, res) => {
  const { userid } = req.body;

  try {
    const bookings = await Booking.find({ userid });
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});






router.post("/cancelbooking", async (req, res) => {
  const { bookingid,
    userid,
    roomid, } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id : bookingid });
    bookingitem.status='cancelled'
    await bookingitem.save();

    const room = await Room.findOne({_id:roomid})

    const bookings = room.currentbookings

    const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
    console.log(temp);

    room.currentbookings=temp;
    await room.save()

    res.send('Your Booking has been cancelled  successfully')
    
    
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
});






router.post("/getuserbookings", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid }).sort({ _id: -1 });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});







router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// app.get('/api/bookings/getallbookings', async (req, res) => {
//   try {
//     const bookings = await Booking.find(); // Adjust based on your model
//     res.json(bookings);
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });






module.exports = router;



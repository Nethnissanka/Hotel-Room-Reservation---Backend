const express = require('express');
const router = express.Router();


const Room = require('../models/room')


router.get("/getallrooms", async(req, res) => {

    try {
        const rooms = await Room.find({})
        // return res.json({ rooms });
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error});
    }
});


router.post("/getroombyid", async(req, res) => {
    const roomid = req.body.roomid

    try {
        const room  = await Room.findOne({_id:roomid})
        res.send(room);
    } catch (error) {
        return res.status(400).json({message:error})
    }
    
    });


router.post("/addroom", async(req, res) => {
        // const roomid = req.body.roomid
    
        try {
            const newroom = new Room(req.body)
            await newroom.save()
            // const room  = await Room.findOne({_id:roomid})
            res.send('new room added susccess');
        } catch (error) {
            return res.status(400).json({message:error})
        }
        
        });


//  router.post("/deleteroom", async (req, res) => {
//             const { roomid, } = req.body;
          
//             try {
//               const roomitem = await Room.findOne({ _id : roomid });
//             //   bookingitem.status='cancelled'
//               await roomitem.save();
          
             
          
//               res.send('Your room deleted  successfully')
              
              
//             } catch (error) {
//               return res.status(400).json({ message: "something went wrong" });
//             }
//           });
          
router.post("/deleteroom", async (req, res) => {
    const { roomid } = req.body;
  
    try {
      // Delete the room from the database
      await Room.deleteOne({ _id: roomid });
  
      // Send a success response
      res.send('Your room has been deleted successfully');
    } catch (error) {
      // Handle errors and send an error response
      return res.status(400).json({ message: "Something went wrong" });
    }
  });




  router.post("/updateroom", async (req, res) => {
    const { roomid, updates } = req.body;
  
    try {
      // Find the room by ID and update with the new details
      const updatedRoom = await Room.findByIdAndUpdate(roomid, updates, { new: true });
  
      // Check if room was found and updated
      if (!updatedRoom) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      // Send the updated room details in the response
      res.json(updatedRoom);
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });

module.exports = router;
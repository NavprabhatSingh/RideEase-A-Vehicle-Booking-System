const express = require('express'); 
const router = express.Router(); 
const auth = require('../middleware/auth'); 
const ctl = require('../controllers/bookingController'); 
router.post('/', auth, ctl.createBooking); 
router.get('/user', auth, ctl.getUserBookings); 
router.put('/cancel/:id', auth, ctl.cancelBooking);
 module.exports = router;
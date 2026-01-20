const tourController = require("../controllers/tourController")
const express = require("express")

const router = express.Router();

router.post('/addTour',tourController.addTour);
router.get('/getAllTour',tourController.getAllTour);
router.get('/findTour/:id',tourController.findTour);
router.put('/updateTour/:id',tourController.updateTour);
router.delete('/deleteTour/:id',tourController.deleteTour);

module.exports = router;
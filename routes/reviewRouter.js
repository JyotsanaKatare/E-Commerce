
const express = require('express')
const router = express.Router()
const review = require('../controller/reviewController');
const { upload } = require('../middlewares/imageStorage')

router.post("/add_review/:uid/:pid",upload.single("reviewImage"),review.addReview)
router.get("/list_review",review.listReview)
router.patch("/update_review/:id",review.updateReview)
router.delete("/delete_review/:id",review.deleteReview)

module.exports = router;

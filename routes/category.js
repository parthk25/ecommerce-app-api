var express = require('express');
var router = express.Router();
const catController = require('../controllers/category')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/category')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post('/add', upload.single('image'), catController.catAdd);

router.delete('/delete/:id', catController.delCat);

router.patch('/update/:id', upload.single('image'), catController.upCat);

router.get('/allcat', catController.findCat);

module.exports = router;

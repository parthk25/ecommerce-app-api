var express = require('express');
var router = express.Router();
const proController = require('../controllers/product')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/product')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

const cpUpload = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }])

router.post('/add', cpUpload, proController.addPro);

router.delete('/delete/:id', proController.delPro);

router.patch('/update/:id', cpUpload, proController.upPro);

router.get('/allproduct', proController.findPro);

router.get('/find', proController.searchProduct);

router.get('/findpage', proController.pageination);

module.exports = router;

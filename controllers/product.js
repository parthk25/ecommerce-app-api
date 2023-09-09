const PRODUCT = require("../models/product")

exports.addPro = async function (req, res, next) {
    try {
        console.log(req.body);

        const thumb = req.files.thumbnail
        thumb.map((el) =>{
            req.body.thumbnail=el.filename
        })
        
        req.body.images = []
        const file = req.files.images
        file.map((el) => {
            // console.log(el.filename);
            req.body.images.push(el.filename)
        })
        
        if (!req.body.title || !req.body.description || !req.body.price || !req.body.discountPercentage || !req.body.rating || !req.body.stock || !req.body.brand || !req.body.category || !req.body.thumbnail || !req.body.images.length) {
            throw new Error('Please Enter Valide Feilds')
        }
        const proData = await PRODUCT.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "Product Data Added",
            proData
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.delPro = async function (req, res) {
    try {
        await PRODUCT.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            message: "Product Deleted SuccessFully",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.upPro = async function (req, res) {
    try {
        const data = await PRODUCT.findById(req.params.id)
        const upData = { ...data._doc, ...req.body }

        const thumb = req.files.thumbnail
        thumb.map((el) =>{
            req.body.thumbnail=el.filename
        })

        if (req.files) {
            upData.images = []
            const file = req.files.images
            file.map((el) => {
                console.log(el.filename);
                upData.images.push(el.filename)
            })
        }

        await PRODUCT.findByIdAndUpdate(req.params.id, upData)

        res.status(200).json({
            status: "success",
            message: "Product updated SuccessFully",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.findPro = async function (req, res) {
    try {
        const findProduct = await PRODUCT.find().populate('category')
        res.status(200).json({
            status: "success",
            message: "All Product Found",
            data: findProduct
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.searchProduct = async function (req, res) {
    try {
      const productFind = await PRODUCT.find({
        "$or": [
          { title: { '$regex': req.query.search, '$options': 'i' } },
          { description: { '$regex': req.query.search, '$options': 'i' } }
        ]
      }).populate('category')
      res.status(200).json({
        status: "success",
        message: "Product Find SuccessFully",
        productFind
      })
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      })
    }
  }

  exports.pageination = async function (req, res) {
    try {
        const page = req.query.page || 0
        const productPage = 2

        const findPage = await PRODUCT.find().skip((page - 1) * productPage).limit(productPage)
        res.status(200).json({
            status: "success",
            message: "All Product Found",
            data: findPage
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
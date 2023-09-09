const CATEGORY = require('../models/category')

exports.catAdd = async function (req, res, next) {
    try {
        // console.log(req.body);
        req.body.image = req.file.filename
        if (!req.body.name || !req.body.image) {
            throw new Error('Please Enter Valide Feilds')
        }
        const catData = await CATEGORY.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "Data Added Successfully",
            catData
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.delCat =  async function (req, res, next) {
    try {
        // console.log(req.body);
        await CATEGORY.findByIdAndDelete(req.params.id, req.body)
        res.status(201).json({
            status: "Success",
            message: "Data delete Successfully"
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.upCat =  async function (req, res, next) {
    try {
        // console.log(req.body);
        req.body.image = req.file.filename
        await CATEGORY.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            status: "Success",
            message: "Data Update Successfully"
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.findCat =  async function (req, res, next) {
    try {
        // console.log(req.body);
        const findData = await CATEGORY.find()
        res.status(201).json({
            status: "Success",
            message: "All Data Fond",
            findData
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uuid = require('uuid').v4();
const path = require('path');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename : (req, file, cb) => {
        const fieldname = file.originalname.split('.').slice(0,-1)[0];
        cb(null, `${fieldname}-${uuid}` + path.extname(file.originalname));
    }
});

const upload = multer({
    storage : storage
});

router.get('/', (req, res) => {
    res.render('upload');
});

router.post('/', upload.array('images'), (req, res) => {
    res.json({status : "OK", upload : req.files});
});

module.exports = router;
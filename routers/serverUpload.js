const aws = require('aws-sdk');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const path = require('path');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const upload = multer({
    storage : multerS3({
        s3: s3,
        bucket: 'indonesian-covid19-hospital',
        metadata : (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const fileNameOnly = file.originalname.split('.').slice(0, -1)[0];
            cb(null, `rumahSakitImages/${fileNameOnly}-${uuid()}${ext}` );
        },
    })
});

router.get('/', (req, res) => {
    res.render('upload-server');
});

router.post('/', upload.array('images'), (req, res) => {
    const path = req.files.map((item) => {
        return {
            location : item.location
        }
    });
    return res.json({
        status : 'OK', 
        uploaded : req.files.length, 
        info : req.files
    });
});

module.exports = router;

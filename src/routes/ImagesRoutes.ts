import { Router } from "express";
import { _s3Bucket, _s3KeyId, _s3Region, _s3Secret } from "../constants";
import {
  deleteImage,
  getImage,
  uploadImage,
} from "../controllers/ImagesController";

var aws = require("aws-sdk"),
  bodyParser = require("body-parser"),
  multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: _s3Secret,
  accessKeyId: _s3KeyId,
  region: _s3Region,
});
const multer = require("multer");

var s3 = new aws.S3();

var upload2 = multer({
  storage: multerS3({
    s3: s3,
    // acl: "public-read",
    bucket: _s3Bucket,
    key: function (req: any, file: any, cb: any) {
      cb(null, file.originalname);
    },
  }),
});

const router = Router();
const prefix = "/imagenes";

const upload = multer({ dest: "src/uploads/" });

router.post(prefix, upload.single("foto"), uploadImage);

router.post(
  "/s3-movil",
  upload2.array("foto", 25),
  function (req: any, res, next) {
    // console.log(req.files)
    try {
      res.send({
        message: "Uploaded!",
        urls: req.files.map(function (file: any) {
          return res.status(200).send({
            url: file.location,
            key: file.key,
            type: file.mimetype,
            size: file.size,
          });
        }),
      });
    } catch (error) {}
  }
);

router.get(prefix + "/:key", getImage);

router.delete(prefix + "/:key", deleteImage);

export default router;

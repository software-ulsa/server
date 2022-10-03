import { Request, Response } from "express";
import { _s3KeyId, _s3Region, _s3Secret, _s3Bucket } from "../constants";

const S3 = require("aws-sdk/clients/s3");
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);

const fs = require("fs");
const path = require("path");

const s3 = new S3({
  accessKeyId: _s3KeyId,
  secretAccessKey: _s3Secret,
  region: _s3Region,
});

const getImagen = async (key: any) => {
  const url = s3.getSignedUrl("getObject", {
    Bucket: _s3Bucket,
    Key: key,
    Expires: 100000,
  });
  return url;
};

const deleteImagen = async (key: any) => {
  try {
    const bucketParams = { Bucket: _s3Bucket, Key: key };
    const data = await s3
      .deleteObject(bucketParams)
      .promise()
      .then(() => {})
      .catch((err: any) => {
        console.log("errooor" + err);
      });
  } catch (err) {
    console.log("Error", err);
    return "error";
  }
};

export const uploadImage = async (req: any, res: Response) => {
  //console.log(req.body.file);
  const stream = fs.createReadStream(req.file.path);

  const ext = path.extname(req.file.originalname).toLowerCase();

  let fileType = "";

  if (ext == ".png") {
    fileType = "image/png";
  } else if (ext == ".jpg" || ext == ".jpeg") {
    fileType = "image/jpg";
  } else {
    res.send({ data: "error" });
  }

  stream.on("error", function (err: any) {
    console.log("error in read stream: ", err);
    throw err;
  });

  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  let params = {
    Bucket: _s3Bucket,
    Body: stream,
    Key: imageName,
    ContentType: fileType,
  };
  const data = await s3.upload(params).promise();

  res.send({ data: data.Key })
  //res.send({ data: "ya se hizo"});
};

export const getImage = async (req: Request, res: Response) => {
  const { key } = req.params;
  const imagen = await getImagen(key);
  res.send(imagen);
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const data = await deleteImagen(key);
    res.send(data);
  } catch (err: any) {
    console.log(err.message);
  }
};

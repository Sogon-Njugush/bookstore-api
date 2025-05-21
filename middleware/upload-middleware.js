import multer from "multer";
import path from "path";

//set our multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//file filter function

const checkFileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    //file.mimetype.startsWith("image/"))
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

//create multer instance
const uploadMiddleware = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: { fileSize: 1024 * 1024 * 500 },
});

export default uploadMiddleware;

import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
}

export const editFileName = (req, file, cb) => {
    if (file)
        cb(null, uuidv4() + path.extname(file.originalname));

}
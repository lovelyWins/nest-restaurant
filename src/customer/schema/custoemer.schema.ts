import * as mongoose from "mongoose"

export const CustomerSchema = new mongoose.Schema({

    name:
        { type: String, required: true },
    roles:
        { type: [String], required: true },
    email:
        { type: String, unique: true, required: true },
    password:
        { type: String, required: true },
    phone:
        { type: String, required: true },

})
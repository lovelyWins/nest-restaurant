import * as mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
    city: String,
    country: String,
    street: String
})

// creating schema for restaurant
export const RestaurantSchema = new mongoose.Schema({

    name: { type: String },
    roles: { type: [String] },
    email: { type: String, unique: true },
    image: { type: String },
    timing: { type: [String] },
    password: { type: String },
    address: { type: addressSchema }

})



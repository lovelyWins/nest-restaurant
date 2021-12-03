import * as mongoose from "mongoose"

export const ProductSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    price: { type: String },
    category: { type: [String] },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant"
    }
})
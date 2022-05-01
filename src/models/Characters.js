import mongoose from "mongoose";

const CharactersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  commission: {type: Number, required: true},
});

export const Characters = mongoose.model("characters", CharactersSchema);

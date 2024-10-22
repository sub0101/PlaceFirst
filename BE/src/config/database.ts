import mongoose from "mongoose"
const formSchema = new mongoose.Schema({
    name: String,
    fields: [{
      label: String,
      type: String,
      required: Boolean,
      options: [String]
    }]
  });
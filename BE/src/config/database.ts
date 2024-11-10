import { strict } from "assert";
import mongoose from "mongoose"
export const formSchema = new mongoose.Schema({
  companyApplicationId:{type:String , require:true,unique:true},
  fields: [{
    label: { type: String, require:false }, // Ensure each field has a label
    type: { type: String, required: false },   // Ensure each field has a type
    required: { type: Boolean, default: false }, // Default to false
    options: { type: [String], default: [] ,require:false }  // Default to an empty array
  }]
},{ strict: false }) ;

export const ApplicantSchema = new mongoose.Schema({
  companyApplicationId:{type:String , require:true}
} ,{strict:false})
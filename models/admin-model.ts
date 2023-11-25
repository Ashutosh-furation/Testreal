import mongoose from "mongoose";
const validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [53, "name should be under 53 Characters"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, "Please fill a valid email address !"],
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "CondoOrProject" }],
  condos: [{ type: mongoose.Schema.Types.ObjectId, ref: "CondoOrProject" }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export { Admin };

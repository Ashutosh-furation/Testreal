import mongoose from "mongoose";
const validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const leadSchema = new mongoose.Schema({
  postedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  developerEmail: {
    type: String,
    required: true,
    validate: [validateEmail, "Please fill a valid email address !"],
  },
  messageFromDeveloper: {
    type: String,
    required: true,
  },
});

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export default Lead;

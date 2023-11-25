import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  developerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  landmark: {
    type: String,
    required: true,
  },
  numberOfStorey: {
    type: Number,
    required: true,
  },
  numberOfCondos: {
    type: Number,
    required: true,
  },
  occupancyDate: {
    type: String,
    required: true,
  },
  maintenanceFee: {
    type: Number,
    required: true,
  },
  pricedFrom: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  videos: [
    {
      type: String,
    },
  ],
  aboutProject: {
    type: String,
    required: true,
  },
  featuresAndFacilities: {
    type: String,
    required: true,
  },
  featureImage: [
    {
      type: String,
      required: true,
    },
  ],
  featureVideo: [
    {
      type: String,
      required: true,
    },
  ],
  aboutDeveloper: {
    type: String,
    required: true,
  },
  developerImage: [
    {
      type: String,
      required: true,
    },
  ],
  developerVideo: [
    {
      type: String,
      required: true,
    },
  ],
  uploadedByAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;

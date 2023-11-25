import mongoose from "mongoose";

const condoOrProjectSchema = new mongoose.Schema(
  {
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
      // required: true,
    },

    landmark: {
      type: String,
      // required: true,
    },
    numberOfStorey: {
      type: Number,
      required: true,
    },
    numberOfUnits: {
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
    overViewImages: [
      {
        type: String,
        required: true,
      },
    ],
    overViewVideos: [
      {
        type: String,
        // required: true,
      },
    ],
    aboutCondo: {
      type: String,
      required: true,
    },
    aboutImages: [
      {
        type: String,
        required: true,
      },
    ],
    aboutVideos: [
      {
        type: String,
        // required: true,
      },
    ],
    featuresAndFacilities: {
      type: String,
      required: true,
    },
    featureImages: [
      {
        type: String,
        required: true,
      },
    ],
    featureVideos: [
      {
        type: String,
        // required: true,
      },
    ],
    aboutDeveloper: {
      type: String,
      required: true,
    },
    developerImages: [
      {
        type: String,
        required: true,
      },
    ],
    developerVideos: [
      {
        type: String,
        // required: true,
      },
    ],
    // =============This is the field to let us know that which admin has uploaded this project or condo
    uploadedByAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

    // =============below two fields are added due to requirement
    type: {
      type: String,
      enum: ["project", "condo"],
      required: true,
    },
    deposit: {
      type: Number,
      // required: true,
    },

    // New field for storing references to FAQs
    faqs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FAQ",
      },
    ],

    // ===================This is the field to store the paths of all the attachments belonging to a project or condo (like of a pdf,docx,etc.)
    attachments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CondoOrProject =
  mongoose.models.CondoOrProject ||
  mongoose.model("CondoOrProject", condoOrProjectSchema);

export { CondoOrProject };

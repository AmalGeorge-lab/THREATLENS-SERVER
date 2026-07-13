import mongoose from "mongoose";

const FileUploadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  logType: {
    type: String,
    enum: ["auth", "web", "firewall"],
    required: true,
  },
  parsedLogs: {
    type: Number,
    default: 0,
  },
  alertsGenerated: {
    low: {
      type: Number,
      default: 0,
    },
    medium: {
      type: Number,
      default: 0,
    },
    high: {
      type: Number,
      default: 0,
    },
    critical: {
      type: Number,
      default: 0,
    },
  },
},{timestamps: true});

export default mongoose.model("FileUpload", FileUploadSchema);
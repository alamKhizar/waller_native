const mongoose = require("mongoose");

const WallpaperDetailsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    uploader: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

const WallpaperDetails = mongoose.model("WallpaperDetails", WallpaperDetailsSchema);
module.exports = { WallpaperDetails };

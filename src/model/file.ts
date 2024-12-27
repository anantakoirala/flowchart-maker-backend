import mongoose from "mongoose";
import { nullable } from "zod";

const fileSchema = new mongoose.Schema(
  {
    title: { type: String, require: [true, "Title field is required"] },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    archive: { type: Boolean, default: false },
    document: { type: String, default: null },
    whiteboard: { type: String, default: null },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);
export default File;

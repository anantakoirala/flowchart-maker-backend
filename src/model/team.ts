import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, require: [true, "Name field is required"] },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Team owner is required"],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;

const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    // This user segment is here only because goals belong
    // to individual users.
    // ref refers to, which model to use object Id for? Use for user model
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: 'User'
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);

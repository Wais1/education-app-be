const mongoose = require("mongoose");

const contentSchema = mongoose.Schema(
  {
    // This user segment is here only because goals belong
    // to individual users.
    // ref refers to, which model to use object Id for? Use for user model
    //Unique id, like a user
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Content", contentSchema);

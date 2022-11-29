const { Schema, model } = require("mongoose");


const goalsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
    members: [ 
        { type: Schema.Types.ObjectId, ref:'User' }
     ],
  },
  {
    
    timestamps: true,
  }
);

const Goals = model("Goal", goalsSchema);

module.exports = Goals;

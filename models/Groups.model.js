const { Schema, model } = require("mongoose");


const groupsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
    },
    chat:[{type: Schema.Types.ObjectId, ref:'Message'}],
    img: {
      type: String,
    },
    members: [ 
        { type: Schema.Types.ObjectId, ref:'User' }
     ],
    interests :[String],
    goals: [ { type: Schema.Types.ObjectId, ref:'Goals' } ]
  },
  {
    
    timestamps: true,
  }
);

const Groups = model("Group", groupsSchema);

module.exports = Groups;

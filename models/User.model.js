const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,

    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    interests: {
      type: String,
      default: ''
      
    },
    img: {
      type: String,
      default: 'https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png'
    },
   groups:[{type: Schema.Types.ObjectId, ref:'Groups'}]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

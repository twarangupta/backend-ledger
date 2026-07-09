const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: [true, "Email already registered"], // jo quotes me likha h vo error ka msg return hoga
      lowercase: true,
      trim: true, // trim krke spaces hata do
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ], //regex for email
    },
    name: {
      type: String,
      required: [true, "Name is required to create an acoount"],
    },
    password: {
      type: String,
      required: [true, "Password is required for creating an account"],
      minLength: [6, "Password must contain more than 6 characters"],
      select: false, // jab user call hoga front end se ya return hoga to passowrd k alawa sab return hoga
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  // we are hashing here instead of controller to secure
  // the password before saving it to the database.
  //  This is a middleware that runs before saving a user document.
  /* User.create()

                ↓

                pre("save")

                ↓

                Database */
  if (!this.isModified("password")) {
    // it is passed as string to check the field named "password" is modified or not.
    // If it is not modified then we will not hash it again.
    return 
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
  // ye method userSchema ke instance pe call hoga.
  // like user.comparePassword(password) where user is an instance of the User model.
  // reduncant code hatane ke liye humne is method ko schema me define kiya h.
  console.log("this",this)
  console.log(this.password)
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user", userSchema);

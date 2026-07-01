import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		fullname: {
			type: String,
			required: true,
			trim: true,
			index: true,
		},
		avatar: {
			type: String,
			required: true,
		},
		coverImage: {
			type: String,
		},
		watchHistory: [
			{
				type: Schema.Types.ObjectId,
				ref: "Video",
			},
		],
		passward: {
			type: String,
			required: [true, "Passward is required"],
		},
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("passward")) return next();

	this.passward = bcrypt.hash(this.passward, 10);
	next();
});

userSchema.methods.isPasswardCorrect = async function (passward) {
	return await bcrypt.compare(passward, this.passward);
};

userSchema.methods.generateAccessToken = async function () {
	return await jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
			fullname: this.fullname,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		},
	);
};

userSchema.methods.generateRefreshToken = async function () {
	return await jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_SECRET,
		},
	);
};

export const User = mongoose.model("User", userSchema);

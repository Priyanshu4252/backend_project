import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants.js";

const connect_db = async () => {
	try {
		const connection_instance = await mongoose.connect(`${process.env.MONGODB_URL}/${DATABASE_NAME}`);
        console.log(`\n Database connected || DB HOST ${connection_instance.connection.host}`);
    } catch (error) {
		console.log("mongo db connection error", error);
		process.exit(1);
	}
};

export default connect_db;

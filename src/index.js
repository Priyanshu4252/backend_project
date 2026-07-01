import dotenv from "dotenv";
import connect_db from "./db/database.js";
import app from "./app.js";
//config environment varibable
dotenv.config();

//promise is returned when a async funtion is completed
connect_db()
	.then(() => {
		(app.listen(process.env.PORT || 8000),
			() => {
				console.log(
					`app is listening at port ${process.env.PORT} || 8000`,
				);
			});
	})
	.catch((error) => {
		console.log("an error during db connection", error);
	});

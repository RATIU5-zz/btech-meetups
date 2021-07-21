import { MongoClient } from "mongodb";
import CONFIG from "../../config.json";

const handler = async (req, res) => {
	if (req.method === "POST") {
		const data = req.body;

		const { title, image, address, description } = data;

		const client = await MongoClient.connect(
			`mongodb+srv://${CONFIG.DB_USER}:${CONFIG.DB_PASS}@cluster0.pjqlc.mongodb.net/meetups?retryWrites=true&w=majority`
		);
		const db = client.db();

		const meetupsCollection = db.collection("meetups");
		const result = await meetupsCollection.insertOne(data);

		// console.log(result);

		client.close();

		res.status(201).json({ message: "meetup inserted" });
	}
};

export default handler;

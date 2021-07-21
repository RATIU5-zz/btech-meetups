import { MongoClient } from "mongodb";
import CONFIG from "../config.json";

import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Browse a huge list of highly active React meetups."
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
}

// Never gets to client side JS, used for Nextjs build only. Can only be in pages components
export async function getStaticProps() {
	const client = await MongoClient.connect(
		`mongodb+srv://${CONFIG.DB_USER}:${CONFIG.DB_PASS}@cluster0.pjqlc.mongodb.net/meetups?retryWrites=true&w=majority`
	);
	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map(m => ({
				title: m.title,
				address: m.address,
				image: m.image,
				id: m._id.toString(),
			})),
		},
		revalidate: 10,
	};
}

// export async function getServerSideProps(context) {

// 	const req = context.req;
// 	const res = context.res;

// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export default HomePage;

import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetails(props) {
	return (
		<>
			<Head>
				<title>React Meetups - {props.meetupData.title}</title>
				<meta name="description" content={props.meetupData.description} />
			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pjqlc.mongodb.net/meetups?retryWrites=true&w=majority`
	);
	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	// empty obj for filter values, obj for specific fields (1 = true)
	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	client.close();

	return {
		fallback: false,
		paths: meetups.map(m => ({ params: { meetupId: m._id.toString() } })),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pjqlc.mongodb.net/meetups?retryWrites=true&w=majority`
	);
	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	// empty obj for filter values, where _id is the provided id
	const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetupDetails;

import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
	{
		id: "m1",
		title: "A First Meetup",
		image: "https://images.unsplash.com/photo-1626788383851-428d432f8f2e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
		address: "Some address 5, 1234 Some City",
		description: "This is a first meetup!",
	},
	{
		id: "m2",
		title: "A Second Meetup",
		image: "https://images.unsplash.com/photo-1626520709326-6a89236a4fd8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80",
		address: "Some address 10, 1234 Some City",
		description: "This is a second meetup!",
	},
];

function HomePage(props) {
	return <MeetupList meetups={props.meetups} />;
}

// Never gets to client side JS, used for Nextjs build only. Can only be in pages components
export async function getStaticProps() {
	return {
		props: {
			meetups: DUMMY_MEETUPS,
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

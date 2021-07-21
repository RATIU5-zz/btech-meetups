import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
	return (
		<>
			<MeetupDetail
				image={props.image}
				title={props.title}
				address={props.address}
				description={props.description}
			/>
		</>
	);
}

export async function getStaticPaths() {
	return {
		fallback: false,
		paths: [
			{
				params: {
					meetupId: "m1",
				},
			},
			{
				params: {
					meetupId: "m2",
				},
			},
		],
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	return {
		props: {
			image: "https://images.unsplash.com/photo-1626788383851-428d432f8f2e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
			id: meetupId,
			title: "A First Meetup",
			address: "Some Street 5, Some City",
			description: "The meetup description",
		},
	};
}

export default MeetupDetails;

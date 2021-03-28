import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React from "react";
import db from "./firebase";

const mapStyles = {
	width: "100%",
	height: "100%",
};

export class MapComponent extends React.Component {
	constructor(props) {
		super(props);
		this.upload = null;
		this.state = {
			stores: [],
		};
	}

	onCollectionUpdate = (querySnapshot) => {
		const stores = [];
		querySnapshot.forEach((doc) => {
			const { latitude, longitude } = doc.data();
			stores.push({
				latitude,
				longitude,
			});
		});
		this.setState({
			stores,
		});
		console.log(stores);
	};

	componentDidMount() {
		this.upload = db
			.collection("coordinates")
			.onSnapshot(this.onCollectionUpdate);
	}

	displayMarkers = () => {
		return this.state.stores.map((store, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: store.latitude,
						lng: store.longitude,
					}}
					onClick={() => console.log("You clicked me!")}
				/>
			);
		});
	};
	render() {
		return (
			<Map
				google={this.props.google}
				zoom={15}
				style={mapStyles}
				initialCenter={{ lat: 47.359423, lng: -122.021071 }}
			>
				{this.displayMarkers()}
			</Map>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyDmLAb6HEv-2jpwE9G2tZMUaxrzwj-FFaw",
})(MapComponent);

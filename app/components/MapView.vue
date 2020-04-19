<template>
	<Page actionBarHidden="true">
		<strong>sdfsdf</strong>
		<!-- <Mapbox
						accessToken="sk.eyJ1IjoiZWRkeXZlcmJydWdnZW4iLCJhIjoia1JpRW82NCJ9.OgnvpsKzB3GJhzyofQNUBw"
						mapStyle="traffic_day"
						latitude="51.9280572"
						longitude="4.4201952"
						zoomLevel="7"
						delay="450"
						showUserLocation="true"
						hideCompass="false"
						disableZoom="false"
						disableRotation="false"
						disableScroll="false"
						disableTilt="false"
						(mapReady)="onMapReady($event)"
		></Mapbox>-->
	</Page>
</template>

<script >
import Directions from "nativescript-directions";

export default {
	data() {
		return {

		}
	},
	mounted() {
		let vm = this;

		vm.getDirection();
	},
	methods: {
		getDirection() {
			let vm = this;

			// instantiate the plugin
			var directions = new Directions();

			directions.available().then(
				function (avail) {
					vm.speechObj = "Map available: " + avail;

					if (avail) {
						directions.navigate({
							to: { // either pass in a single object or an Array (see the TypeScript example below)
								address: vm.speechObj
							}
							// for iOS-specific options, see the TypeScript example below.
						}).then(
							function () {
								vm.speechObj = "Maps app launched.";
							},
							function (error) {
								vm.speechObj = 'Error on direction: ' + error;
							}
						);
					}
				}
			);
		}
	}
}
</script>

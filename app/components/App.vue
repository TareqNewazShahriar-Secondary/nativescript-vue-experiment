<template>
	<Page actionBarHidden="true">
		<TabView>
			<TabViewItem title="Tab 1">
				<ScrollView orientation="vertical">
					<StackLayout>
						<Label>{{new Date()}}</Label>
						<Label textWrap>{{locationData}}</Label>
						<Button text="Location Permission" @tap="getLocationPermission" />
						<Button text="Location Data" @tap="getLocationData" />
						<Button text="Speech" @tap="speech" />
						<Button text="Tap n Speak Bangla" @tap="SpeechToText('bn-BD')" />
						<Button text="Tap n Speak Arabic" @tap="SpeechToText('ar-SA')" />
						<Button text="Tap n Speak English" @tap="SpeechToText('en-US')" />
						<Button text="Map view" @tap="$navigateTo(MapView)" />
						<TextField hint="Enter text..." :text="speechObj" />
						<Slider value="80" />
						<Switch checked="true" />
						<TimePicker v-model="selectedTime" />
						<DatePicker :isUserInteractionEnabled="false" :date="new Date('2013/12/23')" />
					</StackLayout>
				</ScrollView>
			</TabViewItem>
			<TabViewItem title="Tab 2">
				<WrapLayout>
				</WrapLayout>
			</TabViewItem>
			<TabViewItem title="Tab 3">
				<GridLayout columns="*" rows="*">
					<Label class="message" text="Tab 3 Content" col="0" row="0" />
				</GridLayout>
			</TabViewItem>
		</TabView>
	</Page>
</template>

<script >
import MapView from './MapView.vue'
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "ui/enums";
import { SpeechRecognition, SpeechRecognitionTranscription } from 'nativescript-speech-recognition';

export default {
	components: { MapView },
	data() {
		return {
			msg: 'Hello World!',
			selectedTime: '02:04',
			locationData: 'null',
			speechObj: null
		}
	},
	mounted() {
		let vm = this;

		vm.locationData = Accuracy;
		console.log(Accuracy);
	},
	methods: {
		getLocationPermission() {
			geolocation.enableLocationRequest();
		},
		getLocationData() {
			let vm = this;

			geolocation
				.getCurrentLocation({
					desiredAccuracy: Accuracy.high,
					maximumAge: 5000,
					timeout: 20000				})
				.then(x => {
					vm.locationData = x;
				});
		},
		speech() {
			let vm = this;

			let speechRecognition = new SpeechRecognition();
			speechRecognition.available().then(
				function (available) {
					console.log(available ? "YES!" : "NO");

					speechRecognition.requestPermission().then((isGranted) => {
						if (!isGranted) {
							alert("It seems that you haven't enabled the microphone. Please visit your app settings and let this app listen to your voice!")
						}
						else {
							vm.speechObj = 'You granted: ' + isGranted;
						}
					});
				}
			);
		},
		SpeechToText(locale) {
			let vm = this;

			let speechRecognition = new SpeechRecognition();
			speechRecognition.startListening({
				// optional, uses the device locale by default
				locale: locale,
				// set to true to get results back continuously
				returnPartialResults: true,
				// this callback will be invoked repeatedly during recognition
				onResult: (transcription) => {
					vm.speechObj = transcription.text;
					console.log(`User said: ${transcription.text}`);
					console.log(`User finished?: ${transcription.finished}`);
				},
				onError: (error) => {
					vm.speechObj = 'on first catch: ' + error;
					// because of the way iOS and Android differ, this is either:
					// - iOS: A 'string', describing the issue. 
					// - Android: A 'number', referencing an 'ERROR_*' constant from https://developer.android.com/reference/android/speech/SpeechRecognizer.
					//            If that code is either 6 or 7 you may want to restart listening.
				}
			}
			).then(
				(started) => { vm.speechObj = `started listening`; },
				(errorMessage) => { vm.speechObj = `Error: ${errorMessage}`; }
			).catch((error) => {
				vm.speechObj = 'on last catch: ' + error;
				// same as the 'onError' handler, but this may not return if the error occurs after listening has successfully started (because that resolves the promise,
				// hence the' onError' handler was created.
			});
		},
		onScanResult(text, barcodeFormat) {
			alert(text + '' + barcodeFormat);
		}
	}
}
</script>

<style scoped>
ActionBar {
	background-color: #53ba82;
	color: #ffffff;
}

.message {
	vertical-align: center;
	text-align: center;
	font-size: 20;
	color: #333333;
}
</style>

hello = document.querySelector("#hello")
document.addEventListener('click', clickHandler)
document.addEventListener('keydown', keyDownHandler)

// eventArray[0] = reserved, eventArray[1] = track 1, eventArray[2] = track 2, eventArray[3] = track 3
let eventArray = [[{beat: ""}], [], [], []]
let rec_start = 0
let recording_track = 0
let current_track = 0
let current_beat

function setup() {
	sounds = {
		coin: loadSound("assets/coin.wav"),
		horn: loadSound("assets/horn.wav"),
		beep: loadSound("assets/musicnote1.wav"),
		boop: loadSound("assets/musicnote6.wav"),
		ping: loadSound("assets/musicnote5.wav"),
		rockBeat: loadSound("assets/rockBeat.wav"),
		funkBeat: loadSound("assets/funkBeat.wav"),
		shuffleBeat: loadSound("assets/shuffleBeat.wav"),
		airhorn: loadSound("assets/airhorn.mp3")
	}
	createCanvas(0, 0);
}

function draw() {}

function clickHandler(e) {
	// if the button is a sound
	if (e.target.classList.contains("sound")) {
			// if we are "recording"
			if (recording_track > 0){
			e.preventDefault()
			sounds[e.target.id].play()
			sounds[e.target.id].setVolume(0.3)
			let eventItem = e.target.id
			let eventTime = e.timeStamp
			let eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			// if not recording, just plays sound
			} else {
				sounds[e.target.id].play()
				sounds[e.target.id].setVolume(0.3)
			}
		// if the button is "record"
		} else if (e.target.classList.contains("record")){
			if (e.target.innerText === "Record") {
				loadBar(e)
				recording_track = parseInt(e.target.dataset.id)
				let eventItem = 'record'
				let eventTime = e.timeStamp
				startRecording(e.timeStamp, recording_track)
				let eventObj = {sound: eventItem, time: eventTime}
				eventArray[recording_track].push(eventObj)
			} else {
				// inner text is "stop"
				let eventItem = 'stop'
				let eventTime = e.timeStamp
				let eventObj = {sound: eventItem, time: eventTime}
				eventArray[recording_track].push(eventObj)
				resetRec()
			}
		// if the button is "play"
		} else if (e.target.classList.contains("play")){
		current_track = parseInt(e.target.dataset.id)
			if (e.target.id === "play_all") {
				// play the entire song
				let mergedTrack = mergeTracks()
				loadBar(e)
				playTrack(mergedTrack)
			} else {
				// play an individual track
			soundTimesArray = mapArray(current_track)
			playTrack(soundTimesArray)
			}
		} else if (e.target.id === 'saveTrack'){
		//requires na me of song, artist name, song data
		fetch('http://localhost:3000/api/v1/songs', {
			method: 'POST',
			headers: {'Accept': 'application/json',
      				  'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: 'song 3',
				song_data: JSON.stringify(eventArray),
				artist_name: "test_name"
			})
		})
		}
}

function keyDownHandler(e) {
	if (recording_track > 0){
		let eventItem
		let eventTime
		let eventObj
		switch (e.key){
			case '1' :
			e.preventDefault()
			sounds['coin'].play()
			sounds['coin'].setVolume(0.3)
			eventItem = 'coin'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case '2' :
			e.preventDefault()
			sounds['horn'].play()
			sounds['horn'].setVolume(0.3)
			eventItem = 'horn'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case '3' :
			e.preventDefault()
			sounds['beep'].play()
			sounds['beep'].setVolume(0.3)
			eventItem = 'beep'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case '4' :
			e.preventDefault()
			sounds['boop'].play()
			sounds['boop'].setVolume(0.3)
			eventItem = 'boop'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case '5' :
			e.preventDefault()
			sounds['ping'].play()
			sounds['ping'].setVolume(0.3)
			eventItem = 'ping'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'Enter' :
			sounds['airhorn'].play()
			sounds['airhorn'].setVolume(0.5)
			break
		}
	} else {
		switch (e.key){
			case '1' :
				sounds['coin'].play()
				sounds['coin'].setVolume(0.3)
				break
			case '2' :
				sounds['horn'].play()
				sounds['horn'].setVolume(0.3)
				break
			case '3' :
				sounds['beep'].play()
				sounds['beep'].setVolume(0.3)
				break
			case '4' :
				sounds['boop'].play()
				sounds['boop'].setVolume(0.3)
				break
			case '5' :
				sounds['ping'].play()
				sounds['ping'].setVolume(0.3)
				break
			case "spacebar" :
			break
				case 'Enter' :
			sounds['airhorn'].play()
			sounds['airhorn'].setVolume(0.5)
			break
		}
	}
}

function startRecording (timeStamp, track) {
	eventArray[track] = []
	setBeat()
	all_rec_btns = document.querySelectorAll('.record')
	play_all_button = document.querySelector('#play_all')
	rec_start = timeStamp
	rec_btn = document.querySelector(`#record_${track}`)
	all_rec_btns.forEach (button => button.disabled = true)
	rec_btn.disabled = false
	all_rec_btns.forEach (button => button.classList.add('disabledBtn'))
	rec_btn.classList.remove('disabledBtn')
	play_all_button.disabled = true
	rec_btn.innerText = "Stop"
	// play the other 2 tracks
	// // check to see if other tracks have music
	disabledButtons = document.querySelectorAll('.disabledBtn')
	oT1 = disabledButtons[0].dataset.id
	oT2 = disabledButtons[1].dataset.id
		if (eventArray[oT1].length > 0) {
			sTA2 = mapArray(oT1)
			playTrackWithoutStop(sTA2)
		}
		if (eventArray[oT2].length > 0) {
			sTA3 = mapArray(oT2)
			playTrackWithoutStop(sTA3)
		}
}

function setBeat(){
	let selected_beat = document.querySelector('#beat_dropdown')
	current_beat = selected_beat.options[selected_beat.selectedIndex].value
	let beat = current_beat
	sounds[beat].loop()
	sounds[beat].setVolume(4.0)
	eventArray[0][0].beat = beat
	document.getElementById('beat_dropdown').hidden = true
}

function resetRec () {
	all_rec_btns.forEach (button => button.disabled = false)
	all_rec_btns.forEach (button => button.classList.remove('disabledBtn'))
	rec_btn.innerText = "Record"
	let play_all_button = document.querySelector('#play_all')
	play_all_button.disabled = false
	recording_track = 0
	let selected_beat = document.querySelector('#beat_dropdown')
	let	beat = selected_beat.options[selected_beat.selectedIndex].value
	sounds[beat].stop()
}

function mapArray(track) {
	if (eventArray[track].length > 0) {
		track_time = eventArray[track][0].time
		return eventArray[track].map(function(obj){
			return {
				sound: obj.sound,
				time: obj.time - track_time
			}
		})
	} else {
		return [];
	}
}

function playTrack(soundTimesArray) {
	soundTimesArray.shift()
	let stopTimeObject = soundTimesArray.pop()
	sounds[eventArray[0][0].beat].play()
	sounds[eventArray[0][0].beat].setVolume(4.0)
	setTimeout(() => {
		sounds[eventArray[0][0].beat].stop()
		clearInterval(intervalID)
	}, stopTimeObject.time )
	soundTimesArray.forEach( event => setTimeout( () => playSound(event.sound), event.time))
	}

function playTrackWithoutStop(soundTimesArray) {
	soundTimesArray.shift()
	let stopTimeObject = soundTimesArray.pop()
	sounds[eventArray[0][0].beat].play()
	sounds[eventArray[0][0].beat].setVolume(4.0)
	soundTimesArray.forEach( event => setTimeout( () => playSound(event.sound), event.time))
	}

function playSound(eventSound){
	//eventSound is undefined here
	sounds[eventSound].play()
	sounds[eventSound].setVolume(0.3)
}

function mergeTracks() {
	let zeroArray = [[{beat: current_beat}]]
	let track1 = mapArray(1)
	track1.shift()
	track1StopTime = track1.pop()
	let track2 = mapArray(2)
	track2.shift()
	track2StopTime = track2.pop()
	let track3 = mapArray(3)
	track3.shift()
	track3StopTime = track3.pop()
	allStopTimes = [track1StopTime, track2StopTime, track3StopTime]
	allStopTimes = allStopTimes.filter(function(stoptime){ return stoptime != undefined })
	sortedStopTimes = allStopTimes.sort(function(a,b) {return a.time - b.time})
	longest = [sortedStopTimes[sortedStopTimes.length -1]]
	let merger = [...track1, ...track2, ...track3]
	merger.sort( (a, b) => a.time - b.time)
	let mergedWithZero = [...zeroArray,...merger,...longest]
	return mergedWithZero
}

//Grabs Main Track Play Button
let mainPlay = document.getElementById('play_all')

//Grabs all the Progress Bars
let mainTrack = document.getElementById('mainTrack')
let layerOne = document.getElementById('layerOne')
let layerTwo = document.getElementById('layerTwo')
let layerThree = document.getElementById('layerThree')

//Grabs all the Layer Record buttons
let recordL1 = document.getElementById('record_1')
let recordL2 = document.getElementById('record_2')
let recordL3 = document.getElementById('record_3')

let intervalID;


function loadBar(event) {
	let fill = 0;
	intervalID = window.setInterval(function (){

		if (fill === 100){
			fill = 0;
		} else {
			fill += 5
		}

	  switch(event.target.id) {
			case 'play_all':
				mainTrack.style.width = fill + "%";
			break
			case 'record_1':
				layerOne.style.width = fill + "%";
			break
			case 'record_2':
				layerTwo.style.width = fill + "%";
			break
			case 'record_3':
				layerThree.style.width = fill + "%";
			break
		}
	}, 500);
}

//Gets Pullout Tab
let pulloutTab = document.querySelector('.pullout-tab')

//When Pullout Tab is hit
pulloutTab.addEventListener('click', showGallery)
// pulloutTab.innerText.addEventListener('click', showGallery)

//Opens gallery tab
function showGallery(event) {
  let sidebar = document.getElementById('sidebar')
	  if (sidebar.style.display === "none") {
			sidebar.style.display = "block";
			pulloutTab.style.display = "none";
		} else {
			sidebar.style.display = "none";
			pulloutTab.style.display = "block";
		}
}

//Grabs X of open Sidebar
let closeBar = document.querySelector('#closeBar')

closeBar.addEventListener('click', closeGallery)

//Closes gallery tab
function closeGallery(event) {
  let sidebar = document.getElementById('sidebar')
	sidebar.style.display = "none";
	pulloutTab.style.display = "block";
}

//Grabs Save Button
let saveTrack = document.querySelector('#saveTrack')

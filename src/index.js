hello = document.querySelector("#hello")
document.addEventListener('click', clickHandler)
document.addEventListener('keydown', keyDownHandler)

let closeBar = document.querySelector('#closeBar')
let pulloutTab = document.querySelector('.pullout-tab')

pulloutTab.addEventListener('click', showGallery)
closeBar.addEventListener('click', closeGallery)
document.addEventListener('DOMContentLoaded', getSongs)

let submitSong = document.querySelector('#submit');

// eventArray[0] = reserved, eventArray[1] = track 1, eventArray[2] = track 2, eventArray[3] = track 3
let eventArray = [[{beat: ""}], [], [], []]
let rec_start = 0
let recording_track = 0
let current_track = 0
let current_beat
let songData = [[]]
let modalClose = document.querySelector('#modalClose');

function setup() {
	sounds = {
		coin: loadSound("assets/coin.wav"),
		horn: loadSound("assets/horn.wav"),
		beep: loadSound("assets/musicnote4.wav"),
		boop: loadSound("assets/musicnote6.wav"),
		ping: loadSound("assets/musicnote5.wav"),
		rockBeat: loadSound("assets/rockBeat.wav"),
		funkBeat: loadSound("assets/funkBeat.wav"),
		shuffleBeat: loadSound("assets/shuffleBeat.wav"),
		airhorn: loadSound("assets/airhorn.mp3"),
		synthC: loadSound("assets/musicnote1C.wav"),
		synthD: loadSound("assets/musicnote1D.wav"),
		synthE: loadSound("assets/musicnote1E.wav"),
		synthF: loadSound("assets/musicnote1F.wav"),
		synthG: loadSound("assets/musicnote1G.wav"),
		synthA: loadSound("assets/musicnote1A.wav"),
		synthB: loadSound("assets/musicnote1B.wav"),
		synthC2: loadSound("assets/musicnote1C2.wav"),
		catC: loadSound("assets/catC.wav"),
		catD: loadSound("assets/catD.wav"),
		catE: loadSound("assets/catE.wav"),
		catF: loadSound("assets/catF.wav"),
		catG: loadSound("assets/catG.wav"),
		catA: loadSound("assets/catA.wav"),
		catB: loadSound("assets/catB.wav"),
		catC2: loadSound("assets/catC2.wav")
	}
	createCanvas(0, 0);
}

function draw() {}

function getSongs(){
	fetch('http://localhost:3000/api/v1/songs').then(res => res.json())
	.then(songs => addToList(songs))
}

function addToList(songs){
	songs.data.forEach(song => makeTemplate(song))
}

function makeTemplate(song){
	songData.push(song['attributes']['song-data'])
	document.querySelector('.song-list').innerHTML += `<li>${song.attributes.name} ||
	<button class="btn btn-danger play-button" id="${song.id}">PLAY</button></li><br/>`
}

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
	} else if (e.target.id === 'submit'){
		//requires na me of song, artist name, song data
		let artistName = document.querySelector('#artistName').value;
		let songTitle = document.querySelector('#songTitle').value;
		fetch('http://localhost:3000/api/v1/songs', {
			method: 'POST',
			headers: {'Accept': 'application/json',
      				  'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: `${songTitle}`,
				song_data: JSON.stringify(eventArray),
				artist_name: `${artistName}`
			})
		})
		document.getElementById('modalClose').click();
	} else if (e.target.className === 'play-button'){
		let id = e.target.id
		eventArray = songData[id]
		eventArray = JSON.parse(eventArray)
		let track = mergeTracks()
		playTrack(track)
	}
		 //ends Else
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
			case 'q' :
			e.preventDefault()
			sounds['synthC'].play()
			sounds['synthC'].setVolume(0.3)
			eventItem = 'synthC'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'w' :
			e.preventDefault()
			sounds['synthD'].play()
			sounds['synthD'].setVolume(0.3)
			eventItem = 'synthD'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'e' :
			e.preventDefault()
			sounds['synthE'].play()
			sounds['synthE'].setVolume(0.3)
			eventItem = 'synthE'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'r' :
			e.preventDefault()
			sounds['synthF'].play()
			sounds['synthF'].setVolume(0.3)
			eventItem = 'synthF'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 't' :
			e.preventDefault()
			sounds['synthG'].play()
			sounds['synthG'].setVolume(0.3)
			eventItem = 'synthG'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'y' :
			e.preventDefault()
			sounds['synthA'].play()
			sounds['synthA'].setVolume(0.3)
			eventItem = 'synthA'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'u' :
			e.preventDefault()
			sounds['synthB'].play()
			sounds['synthB'].setVolume(0.3)
			eventItem = 'synthB'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'i' :
			e.preventDefault()
			sounds['synthC2'].play()
			sounds['synthC2'].setVolume(0.3)
			eventItem = 'synthC2'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'a' :
			e.preventDefault()
			sounds['catC'].play()
			sounds['catC'].setVolume(0.3)
			eventItem = 'catC'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 's' :
			e.preventDefault()
			sounds['catD'].play()
			sounds['catD'].setVolume(0.3)
			eventItem = 'catD'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'd' :
			e.preventDefault()
			sounds['catE'].play()
			sounds['catE'].setVolume(0.3)
			eventItem = 'catE'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'f' :
			e.preventDefault()
			sounds['catF'].play()
			sounds['catF'].setVolume(0.3)
			eventItem = 'catF'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'g' :
			e.preventDefault()
			sounds['catG'].play()
			sounds['catG'].setVolume(0.3)
			eventItem = 'catG'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'h' :
			e.preventDefault()
			sounds['catA'].play()
			sounds['catA'].setVolume(0.3)
			eventItem = 'catA'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'j' :
			e.preventDefault()
			sounds['catB'].play()
			sounds['catB'].setVolume(0.3)
			eventItem = 'catB'
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			break
			case 'k' :
			e.preventDefault()
			sounds['catC2'].play()
			sounds['catC2'].setVolume(0.3)
			eventItem = 'catC2'
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
			case 'q' :
			sounds['synthC'].play()
			sounds['synthC'].setVolume(0.3)
			break
			case 'w' :
			sounds['synthD'].play()
			sounds['synthD'].setVolume(0.3)
			break
			case 'e' :
			sounds['synthE'].play()
			sounds['synthE'].setVolume(0.3)
			break
			case 'r' :
			sounds['synthF'].play()
			sounds['synthF'].setVolume(0.3)
			break
			case 't' :
			sounds['synthG'].play()
			sounds['synthG'].setVolume(0.3)
			break
			case 'y' :
			sounds['synthA'].play()
			sounds['synthA'].setVolume(0.3)
			break
			case 'u' :
			sounds['synthB'].play()
			sounds['synthB'].setVolume(0.3)
			break
			case 'i' :
			sounds['synthC2'].play()
			sounds['synthC2'].setVolume(0.3)
			break
			case 'a' :
			sounds['catC'].play()
			sounds['catC'].setVolume(0.3)
			break
			case 's' :
			sounds['catD'].play()
			sounds['catD'].setVolume(0.3)
			break
			case 'd' :
			sounds['catE'].play()
			sounds['catE'].setVolume(0.3)
			break
			case 'f' :
			sounds['catF'].play()
			sounds['catF'].setVolume(0.3)
			break
			case 'g' :
			sounds['catG'].play()
			sounds['catG'].setVolume(0.3)
			break
			case 'h' :
			sounds['catA'].play()
			sounds['catA'].setVolume(0.3)
			break
			case 'j' :
			sounds['catB'].play()
			sounds['catB'].setVolume(0.3)
			break
			case 'k' :
			sounds['catC2'].play()
			sounds['catC2'].setVolume(0.3)
			break
			// case "spacebar" :

			case 'Enter' :
			sounds['airhorn'].play()
			sounds['airhorn'].setVolume(0.5)

			// sounds['airhorn'].play()
			// sounds['airhorn'].setVolume(0.5)
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
	clearInterval(intervalID)
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

//Closes gallery tab
function closeGallery(event) {
  let sidebar = document.getElementById('sidebar')
	sidebar.style.display = "none";
	pulloutTab.style.display = "block";
}

//Grabs Save Button
// let saveTrack = document.querySelector('#saveTrack')
//
// submitSong.addEventListener('click', handleSong)
//
// function handleSong() {
//
// }

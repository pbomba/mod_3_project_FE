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
			eventItem = e.target.id
			eventTime = e.timeStamp
			eventObj = {sound: eventItem, time: eventTime}
			eventArray[recording_track].push(eventObj)
			// if not recording, just plays sound
			} else {
				sounds[e.target.id].play()
				sounds[e.target.id].setVolume(0.3)
			}
		// if the button is "record"
		} else if (e.target.classList.contains("record")){
			if (e.target.innerText === "Record") {
				recording_track = parseInt(e.target.dataset.id)
				eventItem = 'record'
				eventTime = e.timeStamp
				startRecording(e.timeStamp, recording_track)
				eventObj = {sound: eventItem, time: eventTime}
				eventArray[recording_track].push(eventObj)
			} else {
				// inner text is "stop"
				eventItem = 'stop'
				eventTime = e.timeStamp
				eventObj = {sound: eventItem, time: eventTime}
				eventArray[recording_track].push(eventObj)
				resetRec()
			}
		// if the button is "play"
		} else if (e.target.classList.contains("play")){
		current_track = parseInt(e.target.dataset.id)
			if (e.target.id === "play_all") {
				// play the entire song
				let mergedTrack = mergeTracks()
				playTrack(mergedTrack)
			} else {
				// play an individual track
			soundTimesArray = mapArray(current_track)
			playTrack(soundTimesArray)
			}
	}
}

function keyDownHandler(e) {
	if (recording_track > 0){
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
	let play_all_button = document.querySelector('#play_all')
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
			playTrack(sTA2)
		}
		if (eventArray[oT2] > 0) {
			sTA3 = mapArray(oT2)
			playTrack(sTA3)
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
	debugger
	stopTimeObject = soundTimesArray.pop()
	sounds[eventArray[0][0].beat].play()
	sounds[eventArray[0][0].beat].setVolume(4.0)
	setTimeout( () => sounds[eventArray[0][0].beat].stop(), stopTimeObject.time )
	soundTimesArray.forEach( event => setTimeout( () => playSound(event.sound), event.time))
	 // soundTimesArray.forEach( event => console.log(event))
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
	track1Time = track1.pop()
	let track2 = mapArray(2)
	track2.shift()
	track2Time = track2.pop()
	let track3 = mapArray(3)
	track3.shift()
	track3Time = track3.pop()
	allStopTimes = [track1Time, track2Time, track3Time]
	allStopTimes = allStopTimes.filter(function(stoptime){ return stoptime != undefined })
	sortedStopTimes = allStopTimes.sort(function(a,b) {return a.time - b.time})
	longest = [sortedStopTimes.pop()]
	let merger = [...track1, ...track2, ...track3]
	merger.sort( (a, b) => a.time - b.time)
	let mergedWithZero = [...zeroArray,...merger,...longest]
	return mergedWithZero
}

//Grabs the boxes that hold the Progress Bars


//Grabs all the Progress Bars
let mainTrack = document.getElementById('mainTrack')
let layerOne = document.getElementById('layerOne')
let layerTwo = document.getElementById('layerTwo')
let layerThree = document.getElementById('layerThree')

//Grabs all the Layer Record buttons
let recordL1 = document.getElementById('record_1')
let recordL2 = document.getElementById('record_2')
let recordL3 = document.getElementById('record_3')

recordL1.addEventListener('click', load_bar)
recordL2.addEventListener('click', load_bar)
recordL3.addEventListener('click', load_bar)


let fill = 0;


function load_bar() {
	window.setInterval(function (){
		fill += 10

		if (fill === 100){
			clearInterval();
		}
		else {
			if (e.target.id === recordL1) {
			layerOne.style.width = fill + "%";
		} else if (e.target.id === recordL2) {
			layerTwo.style.width = fill + "%";
		} else if (e.target.id === recordL3) {
		  layerThree.style.width = fill + "%";
		}
	}//closes off first if statement

	}, 500);
}




// eventArray.forEach (function (i) {
// 	console.log(Object.keys(i))
// })

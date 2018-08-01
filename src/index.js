hello = document.querySelector("#hello")
document.addEventListener('click', clickHandler)
document.addEventListener('keydown', keyDownHandler)

// eventArray[0] = reserved, eventArray[1] = track 1, eventArray[2] = track 2, eventArray[3] = track 3
let eventArray = [[], [], [], []]
let rec_start = 0
let recording_track = 0
let current_track = 0

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
				startRecording(e.timeStamp, recording_track)
				eventItem = 'record'
				eventTime = e.timeStamp
				eventObj = {sound: eventItem, time: eventTime}
				eventArray[recording_track].push(eventObj)
			} else {
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
	let beat = document.querySelector('input[name="beat"]:checked').value
	sounds[beat].loop()
	sounds[beat].setVolume(4.0)
	all_rec_btns = document.querySelectorAll('.record')
	let play_all_button = document.querySelector('#play_all')
	rec_start = timeStamp
	rec_btn = document.querySelector(`#record_${track}`)
	all_rec_btns.forEach (button => button.disabled = true)
	rec_btn.disabled = false
	play_all_button.disabled = true
	rec_btn.innerText = "Stop"
}

function resetRec () {
all_rec_btns.forEach (button => button.disabled = false)
rec_btn.innerText = "Record"
let play_all_button = document.querySelector('#play_all')
play_all_button.disabled = false
recording_track = 0
let beat = document.querySelector('input[name="beat"]:checked').value
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
	soundTimesArray.forEach( event => setTimeout( () => playSound(event.sound), event.time))
	 // soundTimesArray.forEach( event => console.log(event))
	}

function playSound(eventSound){
	//eventSound is undefined here
	sounds[eventSound].play()
	sounds[eventSound].setVolume(0.3)
}

function mergeTracks() {
	let zeroArray = [[]]
	let track1 = mapArray(1)
	track1.shift()
	let track2 = mapArray(2)
	track2.shift()
	let track3 = mapArray(3)
	track3.shift()
	let merger = [...track1, ...track2, ...track3]
	merger.sort( (a, b) => a.time - b.time)
	let mergedWithZero = [...zeroArray,...merger ]
	return mergedWithZero
}

// eventArray.forEach (function (i) {
// 	console.log(Object.keys(i))
// })

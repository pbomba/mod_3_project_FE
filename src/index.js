hello = document.querySelector("#hello")
document.addEventListener('click', clickHandler)

// eventArray[0] = reserved, eventArray[1] = track 1, eventArray[2] = track 2, eventArray[3] = track 3
let eventArray = [[], [], [], []]
let rec_start = 0
let recording_track = 0

function setup() {
	sounds = {
		coin: loadSound("assets/coin.wav"),
		horn: loadSound("assets/horn.wav")
	}
	createCanvas(0, 0);
}

function draw() {}

function clickHandler(e) {
	// if the button is a sound
	if (e.target.className === "sound") {
		// if we are "recording"
		if (recording_track > 0){
		e.preventDefault()
		sounds[e.target.id].play()
		eventItem = e.target.id
		eventTime = e.timeStamp
		eventObj = {sound: eventItem, time: eventTime}
		eventArray[recording_track].push(eventObj)
		// if not recording, just plays sound
		} else {
			sounds[e.target.id].play()
		}
	// if the button is "record"
	} else if (e.target.className === "record"){
	recording_track = parseInt(e.target.dataset.id)
	startRecording(e.timeStamp, recording_track)
	eventItem = 'record'
	eventTime = e.timeStamp
	eventObj = {sound: eventItem, time: eventTime}
	eventArray[recording_track].push(eventObj)
	// if the button is "play"
	} else if (e.target.className === "play_all"){
		soundTimesArray = mapArray()
		playMusic(soundTimesArray)
	}
}

function startRecording (timeStamp, track) {
	eventArray[track] = []
	rec_start = timeStamp
	rec_btn = document.querySelector('#record_1')
	rec_btn.disabled = true
	rec_btn.innerText = "Stop"
	setTimeout(resetRec, 10000)
}

function resetRec () {
rec_btn.disabled = false
rec_btn.innerText = "Record"
}

function mapArray() {
	return eventArray.map(function(obj){
		return {
			sound: obj.sound,
			time: obj.time - rec_start
		}
	})
}

function playMusic(soundTimesArray) {
	soundTimesArray.shift()
	soundTimesArray.forEach( event => setTimeout( () => playSound(event.sound), event.time))
	 // soundTimesArray.forEach( event => console.log(event))
	}

function playSound(eventSound){
	sounds[eventSound].play()
}


// eventArray.forEach (function (i) {
// 	console.log(Object.keys(i))
// })
hello = document.querySelector("#hello")
document.addEventListener('click', clickHandler)

let eventArray = []
let rec_start = 0

function setup() {
	sounds = {
		coin: loadSound("assets/coin.wav"),
		horn: loadSound("assets/horn.wav")
	}
	createCanvas(0, 0);
}

function draw() {}

function clickHandler(e) {
	if (e.target.className === "sound") {
		if (e.timeStamp < rec_start + 10000 && rec_start != 0 ){
		e.preventDefault()
		sounds[e.target.id].play()
		eventItem = e.target.id
		eventTime = e.timeStamp
		eventObj = {sound: eventItem, time: eventTime}
		eventArray.push(eventObj)
		} else {
			sounds[e.target.id].play()
		}
	} else if (e.target.className === "record"){
	startRecording(e.timeStamp)
	eventItem = 'record'
	eventTime = e.timeStamp
	eventObj = {sound: eventItem, time: eventTime}
	eventArray.push(eventObj)
	} else if (e.target.className === "play"){
		soundTimesArray = mapArray()
		playMusic(soundTimesArray)
	}
}

function startRecording (timeStamp) {
	eventArray = []
	rec_start = timeStamp
	rec_btn = document.querySelector('#record')
	rec_btn.disabled = true
	setTimeout(resetRec, 10000)
}

function resetRec () {
rec_btn.disabled = false
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
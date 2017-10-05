
function readyFn() {
	
	let sessionMin = 25,
			sessionSec =  0,
			breakMin	 =  5,
			breakSec   =  0,
			session    = true,
			running    = false,
			currentMin = sessionMin,
			currentSec = sessionSec,
			countDown;
	
	
	$('.minutes').text(sessionMin)
	$('.seconds').text('0' + sessionSec)
	$('.session .length').text(currentMin)
	$('.break .length').text(breakMin)
	$('.start').html("<i class='fa fa-play'></i>")
	
	
	function startClock() {
		countDown = setInterval(() => {
			if (currentSec > 0) {
				currentSec--		// Count down seconds
				if (currentSec < 10) {
					$('.seconds').text('0' + currentSec)
				} else {
					$('.seconds').text(currentSec)
				}
			} else {
				currentMin--		// Drop a min
				currentSec = 59 // Go back to 59 secons
				$('.minutes').text(currentMin)
				$('.seconds').text(currentSec)
			}
			
			if (currentMin === 0 && currentSec == 0) {
				playSound()
				if (session) {
					console.log('session is ' + session)
					session = false
					currentMin = breakMin
					currentSec = breakSec
					$('#alert').text('Break Time!')
				} else {
					session = true
					currentMin = sessionMin
					currentSec = sessionSec
					$('#alert').text('Work Time!')
					console.log('session is ' + session)
				}
			}
		}, 1000)
	};
	
	function changeState() {
		if (running) {
			$('.start').html("<i class='fa fa-play'></i>")
			running = false
			stopClock()
		} else {
			$('.start').html("<i class='fa fa-pause'></i>")
			running = true 
			startClock()
		}
	}
	
	function stopClock() {
		clearInterval(countDown);
		currentMin = parseInt($('.minutes').text())
		currentSec = parseInt($('.seconds').text())
	}
	
	function resetClock() {
		currentMin = sessionMin
		currentSec = sessionSec
		session    = true
		$('.minutes').text(currentMin)
		$('.seconds').text('00')
		$('.session .length').text(currentMin)
	}
	
	
	$('.session .add-min').on('click', (e) => {
		let currentTime = parseInt($('.minutes').text())
		currentTime += 1
		currentMin  = currentTime
		$('.minutes').text(currentTime)
		$('.session .length').text(currentTime)
	}) // Increase session time
	
	
	$('.session .sub-min').on('click', (e) => {
		let currentTime = parseInt($('.minutes').text())
		if (currentTime > 0) {
			currentTime -= 1
		}
		currentMin  = currentTime
		$('.minutes').text(currentTime)
		$('.session .length').text(currentTime)
	}) // Decrease session time 
	
	
	$('.break .add-min').on('click', (e) => {
		if (!running) {
			let currentTime = parseInt($('.break .length').text())
			currentTime += 5
			breakMin = currentTime
			$('.break .length').text(currentTime)
		}
	}) // Increase break time 
	
	
	$('.break .sub-min').on('click', (e) => {
		if (!running) {
			let currentTime = parseInt($('.break .length').text())
			if (currentTime > 0) {
				currentTime -= 5
			}
			breakMin = currentTime
			$('.break .length').text(currentTime)
		}
	}) // Decrease break time
	
	
	$('.start').on('click', (e) => {
		running ? console.log('Paused') : console.log('Running')
		pauseSound()
		changeState()
		
	}) // Start or Pause the clock
	
	
	$('.reset').on('click', (e) => {
		if (!running) {
			resetClock()
		}
	}) // Reset the clock 
	
	
	const playSound  = () => ion.sound.play('bell_ring')
  const pauseSound = () => ion.sound.play('button_tiny')
	
	ion.sound({
		sounds:  [
			{name: 'bell_ring'},
			{name: 'button_tiny'}
		],
		path:		 'sounds/',
		preload: true,
		volume:  1.0
	}) // Ring bell at end of countdown
		
}

$(readyFn);
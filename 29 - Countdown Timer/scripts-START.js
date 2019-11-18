let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll('[data-time]');

const timer = seconds => {
	// when start a new timer, clear any existing timers
	clearInterval(countDown);

	let now = Date.now();
	let then = now + seconds * 1000;

	// immediately run once, to get first display
	// setInterval will only display after the first interval
	displayTimeLeft(seconds);
	// display end time
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		// cehck if we should stop
		if (secondsLeft < 0) {
			clearInterval(countDown);
			return;
		}

		// display
		displayTimeLeft(secondsLeft);
	}, 1000);
};

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;

	const displayTime = `${minutes < 10 ? '0' + minutes : minutes}:${
		remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds
	}`;

	timerDisplay.textContent = displayTime;
	// change the title tag
	document.title = displayTime;

	// console.log(displayTime);
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();

	endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' + minutes : minutes}`;
}

buttons.forEach(button => button.addEventListener('click', startTimer));

function startTimer() {
	// dataset pulls anything with data tag
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

// if html element is named can use syntax below
// for form with name of 'customForm'
// with input with name of '
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();

	const mins = this.minutes.value * 60;
	timer(mins);
});

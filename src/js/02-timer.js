import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

const datetimePickerElem = document.querySelector('#datetime-picker');
startBtn.disabled = true;

const datetimePickerOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.info('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};
flatpickr(datetimePickerElem, datetimePickerOptions);

startBtn.addEventListener('click', startTimer);

function startTimer() {
  const targetDate = new Date(datetimePickerElem.value);
  const timerId = setInterval(() => {
    const timeLeft = convertMs(targetDate - Date.now());

    daysElem.textContent = timeLeft.days.toString().padStart(2, '0');
    hoursElem.textContent = timeLeft.hours.toString().padStart(2, '0');
    minutesElem.textContent = timeLeft.minutes.toString().padStart(2, '0');
    secondsElem.textContent = timeLeft.seconds.toString().padStart(2, '0');

    if (targetDate - Date.now() <= 0) {
      clearInterval(timerId);
      Notiflix.Notify.info('Time is up');
      daysElem.textContent = '00';
      hoursElem.textContent = '00';
      minutesElem.textContent = '00';
      secondsElem.textContent = '00';
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

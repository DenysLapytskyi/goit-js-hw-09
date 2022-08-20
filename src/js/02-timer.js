// Документація
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startEl.addEventListener('click', getSelectedTime);
startEl.setAttribute('disabled', 'true');

// ==== Умова 1 =====
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};
// ==== Умова 2 =====
function onClose(selectedDates) {
  const currentTime = Date.now();
  const ms = selectedDates[0] - currentTime;
  if (ms < 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    startEl.removeAttribute('disabled', 'true');
  }
}

flatpickr(inputEl, options);

function getSelectedTime() {
  timerStart();
  startEl.setAttribute('disabled', 'false');
}

function timerStart() {
  inputEl.setAttribute('disabled', 'true');
  const selectedDay = new Date(inputEl.value);
  const selectedTimeMs = selectedDay.getTime();
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTimeMs - currentTime;

    if (deltaTime < 0 && deltaTime > -1000) {
      clearInterval(intervalId);
      inputEl.removeAttribute('disabled', 'true');
    } else {
      updateTime(convertMs(deltaTime));
    }
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}
function padDays(value) {
  if (value < 100) {
    return String(value).padStart(2, '0');
  }
  return String(value).padStart(3, '0');
}
// ==== Умова =====
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = padDays(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  const getTime = { days, hours, minutes, seconds };
  return getTime;
}
// ==== з умови ДЗ кінець =====

function updateTime({ days, hours, minutes, seconds }) {
  daysEl.innerHTML = days;
  hoursEl.innerHTML = hours;
  minutesEl.innerHTML = minutes;
  secondsEl.innerHTML = seconds;
}
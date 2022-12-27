// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  position: 'center-top',
  timeout: 10000,
  clickToClose: true,
  pauseOnHover: true,
});

const refs = {
  inputDateEl: document.querySelector('#datetime-picker'),
  timerEl: document.querySelector('.timer'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    } else console.log(selectedDates[0]);
    refs.startBtn.disabled = false;
  },
};

flatpickr(refs.inputDateEl, options);

refs.startBtn.addEventListener('click', onTimerStart);

function onTimerStart() {
  Notify.success('Countdown started');
  let insertedDate = new Date(refs.inputDateEl.value);
  let timer = setInterval(() => {
    let countdown = insertedDate - new Date();
    if (countdown > 0) {
      let timeObject = convertMs(countdown);
      refs.days.textContent = addLeadingZero(timeObject.days);
      refs.hours.textContent = addLeadingZero(timeObject.hours);
      refs.minutes.textContent = addLeadingZero(timeObject.minutes);
      refs.seconds.textContent = addLeadingZero(timeObject.seconds);
    } else if (countdown <= 0) {
      Notify.success('Countdown finished');
      clearInterval(timer);
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

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

let idInterval = null;

refs.btnStart.addEventListener('click', onColorChangeStart);
refs.btnStop.addEventListener('click', onColorChangeStop);

// refs.btnStop.setAttribute('disabled', '');

function onColorChangeStart(evt) {
  onBtnDisabled();
  // evt.target.setAttribute('disabled', '');
  // refs.btnStop.removeAttribute('disabled');
  idInterval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onColorChangeStop(evt) {
  // evt.target.setAttribute('disabled', '');
  // refs.btnStart.removeAttribute('disabled');
  onBtnDisabled();
  clearInterval(idInterval);
}

function onBtnDisabled() {
  if (!refs.btnStart.disabled) {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
  } else {
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
  }
}

let isSpeaking = false;
let paused = false;
let lastOffset = 0;
const readButton = document.getElementById("readButton");
const restartButton = document.getElementById("restartButton");
const stopButton = document.getElementById("stopButton");

function getLanguage() {
  return document.documentElement.lang || "en-GB";
}

function startSpeaking(offset = 0) {
  const text = document.body.innerText.slice(offset);
  const lang = getLanguage();
  const voice = getVoiceForLanguage(lang);

  responsiveVoice.speak(text, voice, {
    onend: () => {
      isSpeaking = false;
      paused = false;
      updateReadButtonIcon("read");
      restartButton.disabled = true;
      stopButton.disabled = true;
    }
  });

  isSpeaking = true;
  paused = false;
  updateReadButtonIcon("pause");
  restartButton.disabled = false;
  stopButton.disabled = false;
}

function stopSpeaking() {
  isSpeaking = false;
  responsiveVoice.cancel();
  updateReadButtonIcon("read");
  restartButton.disabled = true;
  stopButton.disabled = true;
}

function togglePauseResume() {
  if (paused) {
    responsiveVoice.resume();
    updateReadButtonIcon("pause");
  } else {
    responsiveVoice.pause();
    updateReadButtonIcon("play");
  }
  paused = !paused;
}

function toggleSpeech() {
  if (isSpeaking) {
    togglePauseResume();
  } else {
    startSpeaking(lastOffset);
  }
}

function updateReadButtonIcon(state) {
  const readButtonImg = readButton.querySelector("img");
  if (state === "pause") {
    readButtonImg.src = "icons/pause.svg";
    readButtonImg.alt = "Pause";
  } else if (state === "play") {
    readButtonImg.src = "icons/play.svg";
    readButtonImg.alt = "Play";
  } else {
    readButtonImg.src = "icons/megaphone.svg";
    readButtonImg.alt = "Read";
  }
}

function getVoiceForLanguage(language) {
  const voices = {
    'en': 'UK English Female',
    'es': 'Spanish Female',
    'fr': 'French Female',
    'de': 'Deutsch Female',
    'it': 'Italian Female',
    'nl': 'Dutch Female',
    'pl': 'Polish Female',
    'la': 'Latin Female',
    'hi': 'Hindi Female',
    // Add more language mappings as needed
  };
  return voices[language] || voices['en'];
}

readButton.addEventListener("click", toggleSpeech);
restartButton.addEventListener("click", () => {
  if (isSpeaking) {
    responsiveVoice.cancel();
    startSpeaking(0);
  }
});
stopButton.addEventListener("click", stopSpeaking);

document.addEventListener("visibilitychange", () => {
  if (document.hidden && isSpeaking) {
    stopSpeaking();
  }
});

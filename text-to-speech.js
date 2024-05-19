let isSpeaking = false;
let paused = false;
let utteranceText = document.getElementById("content").innerText;

const readButton = document.getElementById("readButton");
const restartButton = document.getElementById("restartButton");
const stopButton = document.getElementById("stopButton");

// Function to get browser language
function getBrowserLanguage() {
  const lang = navigator.language || navigator.userLanguage;
  return lang;
}

// Function to map browser language to ResponsiveVoice language
function getResponsiveVoiceLang(lang) {
  const langMap = {
    ar: "Arabic Female",
    de: "German Female",
    en: "UK English Female",
    es: "Spanish Female",
    fr: "French Female",
    he: "Hebrew Female",
    hi: "Hindi Female",
    it: "Italian Female",
    ja: "Japanese Female",
    ko: "Korean Female",
    la: "Latin Female",
    nl: "Dutch Female",
    pl: "Polish Female",
    pt: "Portuguese Female",
    ru: "Russian Female",
    sv: "Swedish Female",
    tr: "Turkish Female",
    zh: "Chinese Female",
    // Add more languages as needed
  };
  return langMap[lang.substring(0, 2)] || "UK English Female";
}

readButton.addEventListener("click", () => {
  if (!isSpeaking) {
    startReading();
    updateReadButtonIcon("pause");
  } else {
    togglePauseResume();
  }
});

restartButton.addEventListener("click", () => {
  if (isSpeaking) {
    restartReading();
  }
});

stopButton.addEventListener("click", () => {
  stopReading();
});

function startReading() {
  const browserLang = getBrowserLanguage();
  const voiceLang = getResponsiveVoiceLang(browserLang);

  responsiveVoice.speak(utteranceText, voiceLang, {
    onend: () => {
      isSpeaking = false;
      updateReadButtonIcon("read");
      restartButton.disabled = true;
      stopButton.disabled = true;
    },
  });
  isSpeaking = true;
  paused = false;
  updateReadButtonIcon("pause");
  restartButton.disabled = false;
  stopButton.disabled = false;
}

function togglePauseResume() {
  if (paused) {
    responsiveVoice.resume();
    updateReadButtonIcon("pause");
    paused = false;
  } else {
    responsiveVoice.pause();
    updateReadButtonIcon("play");
    paused = true;
  }
}

function restartReading() {
  responsiveVoice.cancel();
  startReading();
}

function stopReading() {
  responsiveVoice.cancel();
  isSpeaking = false;
  paused = false;
  updateReadButtonIcon("read");
  restartButton.disabled = true;
  stopButton.disabled = true;
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

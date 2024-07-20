// Array of all 88 keys
const notes = [
    'A0.mp3', 'Bb0.mp3', 'B0.mp3',
    'C1.mp3', 'Db1.mp3', 'D1.mp3', 'Eb1.mp3', 'E1.mp3', 'F1.mp3', 'Gb1.mp3', 'G1.mp3', 'Ab1.mp3', 'A1.mp3', 'Bb1.mp3', 'B1.mp3',
    'C2.mp3', 'Db2.mp3', 'D2.mp3', 'Eb2.mp3', 'E2.mp3', 'F2.mp3', 'Gb2.mp3', 'G2.mp3', 'Ab2.mp3', 'A2.mp3', 'Bb2.mp3', 'B2.mp3',
    'C3.mp3', 'Db3.mp3', 'D3.mp3', 'Eb3.mp3', 'E3.mp3', 'F3.mp3', 'Gb3.mp3', 'G3.mp3', 'Ab3.mp3', 'A3.mp3', 'Bb3.mp3', 'B3.mp3',
    'C4.mp3', 'Db4.mp3', 'D4.mp3', 'Eb4.mp3', 'E4.mp3', 'F4.mp3', 'Gb4.mp3', 'G4.mp3', 'Ab4.mp3', 'A4.mp3', 'Bb4.mp3', 'B4.mp3',
    'C5.mp3', 'Db5.mp3', 'D5.mp3', 'Eb5.mp3', 'E5.mp3', 'F5.mp3', 'Gb5.mp3', 'G5.mp3', 'Ab5.mp3', 'A5.mp3', 'Bb5.mp3', 'B5.mp3',
    'C6.mp3', 'Db6.mp3', 'D6.mp3', 'Eb6.mp3', 'E6.mp3', 'F6.mp3', 'Gb6.mp3', 'G6.mp3', 'Ab6.mp3', 'A6.mp3', 'Bb6.mp3', 'B6.mp3',
    'C7.mp3', 'Db7.mp3', 'D7.mp3', 'Eb7.mp3', 'E7.mp3', 'F7.mp3', 'Gb7.mp3', 'G7.mp3', 'Ab7.mp3', 'A7.mp3', 'Bb7.mp3', 'B7.mp3',
    'C8.mp3'
];

// Queries
const pianoKeys = document.querySelector('.piano-keys');
const audioLoader = document.querySelector('.audio-loader');

// For loading and playing Audio
const audioCtx = new AudioContext();

// Asynchronous function to load the audio files
async function loadNotes(filePath) {
    // Load the audio file
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    return audioBuffer;
}

async function setupSamples(paths) {
    console.log('Setting up samples');
    const audioBuffers = {};

    for (const path of paths) {
        const noteName = path.replace('.mp3', '');
        const sample = await loadNotes(path);
        audioBuffers[noteName] = sample;
    }
    console.log("Setting up done");
    return audioBuffers;
}

function playNote(audioBuffer, time){
    const sampleSource = audioCtx.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioCtx.destination);
    sampleSource.start(time);
}

let audioBuffers = {};

async function loadAllNotes() {
    audioBuffers = await setupSamples(notes);
}

function playKey(e) {
    // Function done when key is pressed
    console.log(e.keyCode);
    const keyDiv = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (keyDiv) {
        keyDiv.classList.add('playing');
    }
    if (e.keyCode === 65) { // 'A' key for testing, you can map all keys similarly
        const noteName = 'A0'; // Adjust this based on your mapping
        if (audioBuffers[noteName]) {
            playNote(audioBuffers[noteName], 0);
        }
    }
}

function unPlayKey(e) {
    // Function is done when key is unpressed
    console.log(e.keyCode);
    const keyDiv = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (keyDiv) {
        keyDiv.classList.remove('playing');
    }
}

// Event Listeners
window.addEventListener('keydown', playKey);
window.addEventListener('keyup', unPlayKey);
document.addEventListener('DOMContentLoaded', loadAllNotes); // Not allowed. Need to create start page.

const startButton = document.getElementById('start-button');
const splash = document.getElementById('splash');
const mainContent = document.getElementById('main-content');
startButton.addEventListener('click', () => {
    splash.style.display = 'none';
    mainContent.style.display = 'flex';
})


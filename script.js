const pet = document.getElementById('pet');
const moodDisplay = document.getElementById('mood');
const hungerDisplay = document.getElementById('hunger');
const boredomDisplay = document.getElementById('boredom');

const feedButton = document.getElementById('feed');
const playButton = document.getElementById('play');
const saveButton = document.getElementById('save');
const loadButton = document.getElementById('load');

let state = {
    mood: 'happy',
    hunger: 0,
    boredom: 0,
};

function updateMood() {
    moodDisplay.textContent = `Mood: ${state.mood}`;
    pet.className = state.mood;
    hungerDisplay.textContent = state.hunger;
    boredomDisplay.textContent = state.boredom;
}

function feedPet() {
    state.hunger = Math.max(state.hunger - 10, 0);
    updateMood();
}

function playWithPet() {
    state.boredom = Math.max(state.boredom - 10, 0);
    updateMood();
}

function simulateMood() {
    state.hunger += 1;
    state.boredom += 1;

    if (state.hunger > 70 || state.boredom > 70) {
        state.mood = 'angry';
    } else if (state.hunger > 50 || state.boredom > 50) {
        state.mood = 'bored';
    } else if (state.hunger > 30 || state.boredom > 30) {
        state.mood = 'sad';
    } else {
        state.mood = 'happy';
    }
    
    updateMood();
}

function saveState() {
    localStorage.setItem('petState', JSON.stringify(state));
}

function loadState() {
    const savedState = localStorage.getItem('petState');
    if (savedState) {
        state = JSON.parse(savedState);
        updateMood();
    }
}

feedButton.addEventListener('click', feedPet);
playButton.addEventListener('click', playWithPet);
saveButton.addEventListener('click', saveState);
loadButton.addEventListener('click', loadState);

setInterval(simulateMood, 3000);

loadState();

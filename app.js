const pianoKeys = document.querySelector('.piano-keys');


function playKey(e) {
    console.log(e.keyCode);
    const keyDiv = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (keyDiv){
        keyDiv.classList.add('playing');
    }
}

function unplayKey(e) {
    console.log(e.keyCode);
    const keyDiv = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (keyDiv){
        keyDiv.classList.remove('playing');
    }
}


window.addEventListener('keydown',playKey);
window.addEventListener('keyup',unplayKey);

// Interaktywność: kliknięcie odsłania fragment tajemnicy
const box = document.getElementById('magic-box');
let clicks = 0;

box.addEventListener('click', () => {
    clicks++;
    
    if(clicks === 1) {
        box.style.backgroundColor = '#ff00ff';
        box.innerText = "Hmm...";
    } else if(clicks === 2) {
        box.style.backgroundColor = '#00ff00';
        box.innerText = "Coś się dzieje!";
    } else if(clicks === 3) {
        box.style.backgroundColor = '#ff9900';
        box.innerText = "Już prawie...";
    } else if(clicks === 4) {
        box.style.backgroundColor = '#00ffff';
        box.innerText = "Sekret odkryty!";
        document.querySelector('.title').innerText = "Gratulacje!";
        document.querySelector('.subtitle').innerText = "Twoja przygoda się rozpoczęła.";
    } else {
        // efekt dodatkowy przy dalszych kliknięciach
        box.style.transform = `rotate(${Math.random() * 360}deg) scale(${1 + Math.random()})`;
        box.style.boxShadow = `0 0 ${Math.random() * 40}px #ff00ff`;
    }
});

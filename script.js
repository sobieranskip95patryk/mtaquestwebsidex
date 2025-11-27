const box = document.getElementById('magic-box');
const extra = document.getElementById('extra-message');
let clicks = 0;

// Losowe efekty wizualne
function randomEffect() {
    const colors = ['#ff00ff', '#00ff00', '#ff9900', '#00ffff', '#ff0055', '#aaff00'];
    box.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    box.style.transform = `rotate(${Math.random()*360}deg) scale(${1 + Math.random()})`;
    box.style.boxShadow = `0 0 ${Math.random()*40}px ${colors[Math.floor(Math.random() * colors.length)]}`;
}

// Interakcja z magicznym boxem
box.addEventListener('click', () => {
    clicks++;
    randomEffect();
    
    if(clicks === 1) extra.innerText = "Hmm... coś się zaczyna.";
    else if(clicks === 2) extra.innerText = "Czujesz magię w powietrzu?";
    else if(clicks === 3) extra.innerText = "Prawie odkryte!";
    else if(clicks === 4) {
        extra.innerText = "Sekret ujawniony!";
        document.querySelector('.title').innerText = "Gratulacje!";
        document.querySelector('.subtitle').innerText = "Twoja przygoda zaczęła się na dobre!";
    } else {
        const phrases = ["Coś dziwnego...", "Magia rośnie...", "Nie uwierzysz, co się stanie...", "To dopiero początek!"];
        extra.innerText = phrases[Math.floor(Math.random()*phrases.length)];
    }
});

// Efekty reagujące na ruch myszki
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    box.style.transform = `translate(${x*50}px, ${y*50}px) rotate(${x*360}deg)`;
});

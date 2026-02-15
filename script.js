const box = document.getElementById('magic-box');
const extra = document.getElementById('extra-message');
const veilLayer = document.getElementById('veil-layer');
const whisper = document.getElementById('whisper');
const countEl = document.getElementById('count');
const coherenceEl = document.getElementById('coherence');
const core = document.getElementById('core-reveal');
const resetBtn = document.getElementById('reset-btn');
const audio = document.getElementById('ambient');
const output = document.getElementById('output-log');
const input = document.getElementById('user-input');

let interactionCount = 0;
let coherence = 0;

const quotes = [
  "Warstwa oporu zaczyna pękać…",
  "Ciepło przenika głębiej niż myślisz.",
  "Zbliżasz się do źródła – nie zatrzymuj się.",
  "Forma rozpuszcza się… pozostaje tylko puls.",
  "Koherencja nie jest celem – jest powrotem.",
  "Oddychaj źródłem.",
  "Wszystko wraca do jedności."
];

// Losowe efekty wizualne
function randomEffect() {
    const colors = ['#ff00ff', '#00ff00', '#ff9900', '#00ffff', '#ff0055', '#aaff00'];
    box.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    box.style.transform = `rotate(${Math.random()*360}deg) scale(${1 + Math.random()})`;
    box.style.boxShadow = `0 0 ${Math.random()*40}px ${colors[Math.floor(Math.random() * colors.length)]}`;
}

// Interakcja z magicznym boxem
box.addEventListener('click', () => {
    interactionCount++;
    randomEffect();
    
    if(interactionCount === 1) extra.innerText = "Hmm... coś się zaczyna.";
    else if(interactionCount === 2) extra.innerText = "Czujesz magię w powietrzu?";
    else if(interactionCount === 3) extra.innerText = "Prawie odkryte!";
    else if(interactionCount === 4) {
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

// Zamiast "Liż mnie, niewolniku..."
// "Odsłoń kolejną warstwę… zbliżasz się do centrum."
// Zamiast "Doszłam dla Ciebie!"
// "Osiągnięto stan maksymalnej koherencji."

// Zamiast "Liż mnie, niewolniku..."
// "Odsłoń kolejną warstwę… zbliżasz się do centrum."
// Zamiast "Doszłam dla Ciebie!"
// "Osiągnięto stan maksymalnej koherencji."

function updateCoherence() {
  coherence = Math.min(100, interactionCount * 8 + Math.floor(Math.random() * 5));
  coherenceEl.textContent = coherence;
  if (coherence >= 100) {
    whisper.textContent = quotes[quotes.length - 1];
    core.classList.remove('hidden');
    core.style.opacity = '1';
    veilLayer.style.transform = 'scale(1.2)';
    veilLayer.style.boxShadow = '0 0 160px #ff1493, inset 0 0 120px #ff69b4';
    resetBtn.classList.remove('hidden');
  }
}

function reset() {
  interactionCount = 0;
  coherence = 0;
  countEl.textContent = '0';
  coherenceEl.textContent = '0';
  whisper.textContent = 'Dotknij… zacznij od nowa.';
  core.classList.add('hidden');
  document.getElementById('layer2').classList.add('hidden');
  document.getElementById('layer3').classList.add('hidden');
  veilLayer.style.transform = '';
  veilLayer.style.boxShadow = '';
  veilLayer.style.filter = '';
  resetBtn.classList.add('hidden');
}

veilLayer.addEventListener('mousemove', e => {
  const rect = veilLayer.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  veilLayer.style.setProperty('--x', `${x}%`);
  veilLayer.style.setProperty('--y', `${y}%`);

  const dx = (x - 50) / 50;
  const dy = (y - 50) / 50;
  veilLayer.style.transform = `perspective(1200px) rotateX(${dy * 10}deg) rotateY(${dx * -15}deg) scale(${1 + Math.abs(dy) * 0.08})`;
});

veilLayer.addEventListener('touchmove', e => {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = veilLayer.getBoundingClientRect();
  const x = ((touch.clientX - rect.left) / rect.width) * 100;
  const y = ((touch.clientY - rect.top) / rect.height) * 100;
  veilLayer.style.setProperty('--x', `${x}%`);
  veilLayer.style.setProperty('--y', `${y}%`);
});

veilLayer.addEventListener('click', () => {
  interactionCount++;
  countEl.textContent = interactionCount;
  updateCoherence();

  if (interactionCount === 1) {
    whisper.textContent = quotes[0];
    if (audio.paused) {
      audio.volume = 0.12;
      audio.play().catch(() => {});
    }
  } else if (interactionCount === 4) {
    whisper.textContent = quotes[1];
    document.getElementById('layer2').classList.remove('hidden');
  } else if (interactionCount === 8) {
    whisper.textContent = quotes[2];
    document.getElementById('layer3').classList.remove('hidden');
    veilLayer.style.filter = 'brightness(1.4) saturate(1.8)';
  } else if (interactionCount === 12) {
    whisper.textContent = quotes[3];
  }
});

resetBtn.addEventListener('click', reset);

// startowy szept
setTimeout(() => {
  if (interactionCount === 0) whisper.textContent = 'Przesuń… dotknij… odkryj.';
}, 4000);

const commands = {
    'status': () => "Ziemia: Stabilna. Populacja: Zbyt duża. Kawa: Niewystarczająca.",
    'hack-the-world': () => "Próba włamania do rzeczywistości... [BŁĄD] Symulacja jest zbyt dobrze zabezpieczona.",
    'random-idea': () => {
        const ideas = [
            "Latające buty napędzane entuzjazmem.",
            "Aplikacja do tłumaczenia mruczenia kota na dialekty starogreckie.",
            "System zarządzania lodówką przy użyciu sieci neuronowych i magii."
        ];
        return ideas[Math.floor(Math.random() * ideas.length)];
    },
    'help': () => "Dostępne moduły: status, hack-the-world, random-idea, clear."
};

const secretCommand = "only_together";

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const val = input.value.trim();

        if (val === secretCommand) {
            activateGlobalUnity();
            input.value = '';
            return;
        }

        const p = document.createElement('p');
        p.textContent = `> ${val}`;
        output.appendChild(p);

        const response = document.createElement('p');
        response.style.color = '#fff';
        response.textContent = commands[val] ? commands[val]() : "Nieznana komenda. Czy Meta-Geniusz się pomylił? Niemożliwe.";
        output.appendChild(response);

        input.value = '';
        output.scrollTop = output.scrollHeight;
    }
});

function activateGlobalUnity() {
    const p = document.createElement('p');
    p.style.color = "#00ffff";
    p.innerHTML = `> [AUTORYZACJA PRZYJĘTA]<br>> HASŁO: ${secretCommand}<br>> ŁĄCZENIE WSZYSTKICH JEDNOSTEK...<br>> PLANETA ZSYNCHRONIZOWANA.`;
    output.appendChild(p);

    document.body.style.boxShadow = "inset 0 0 100px #00ffff";
    document.querySelector('.status-dot').style.backgroundColor = "#00ffff";

    initializePlanet();
}

function initializePlanet() {
    const container = document.getElementById('planet-container');
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.zIndex = "-1";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 15;

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();
}

function getServerStats(playerID) {
    const url = `/api/player/${playerID}/stats`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Game-Token': 'ASQK-7G-SESSION-KEY'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server connectivity issue or unauthorized access.');
        }
        return response.json();
    })
    .then(data => console.log('Player Data Fetched:', data))
    .catch(error => console.error('Data retrieval failed:', error));
}

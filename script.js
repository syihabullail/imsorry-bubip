const letterText = `Pagi Dissa cantikk... 🥺💖💕\n\nMaafin aku ya semalem ketiduran duluan. Bener-bener ga kerasa tiba-tiba udah merem aja huhu. \n\nAku tau pasti semalem nungguin ya? Maaf banget bikin bete. Jangan ngambek lagi yaa, ntar cantiknya ilang lhooo (tapi bohong, tetep cantik kok, kamu cantik, mesmerizing, enchanting, adorable, manis, lucu, gemes, awww).`;

const meterScreen = document.getElementById('meter-screen');
const envelopeScreen = document.getElementById('envelope-screen');
const envelopeWrapper = document.querySelector('.envelope-wrapper');
const mainContent = document.getElementById('main-content');
const buttonScreen = document.getElementById('button-screen');
const finalScreen = document.getElementById('final-screen');
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');
const typewriterElement = document.getElementById('typewriter-text');
const actionNext = document.getElementById('action-next');

// --- 1. METERAN SEGEL (Spam Click) ---
let clickCount = 0;
function spamClick() {
    clickCount++;
    let progress = clickCount * 10;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('meter-text').innerText = 'Membuka segel... ' + progress + '%';

    if (clickCount >= 10) {
        setTimeout(() => {
            meterScreen.style.display = 'none';
            envelopeScreen.style.display = 'flex';
        }, 300);
    }
}

// --- 2. BUKA AMPLOP ---
function openEnvelope() {
    envelopeWrapper.classList.add('open');
    
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
        musicIcon.src = "images/mute.png"; 
        musicText.innerText = "PAUSE";
    }).catch(e => console.log("Auto-play blocked"));

    setTimeout(() => {
        envelopeScreen.style.display = "none";
        mainContent.classList.add('visible');
        setTimeout(typeWriter, 1000);
    }, 1500); 
}

// --- 3. MUSIK ---
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicIcon.src = "images/mute.png"; 
        musicText.innerText = "PAUSE";
    } else {
        bgMusic.pause();
        musicIcon.src = "images/high-volume.png"; 
        musicText.innerText = "PLAY SONG";
    }
}

// --- 4. KETIK SURAT ---
let i = 0;
function typeWriter() {
    if (i < letterText.length) {
        const char = letterText.charAt(i);
        if (char === "\n") {
            typewriterElement.innerHTML += "<br>";
        } else {
            typewriterElement.innerHTML += char;
        }
        i++;
        setTimeout(typeWriter, 40); 
    } else {
        actionNext.style.display = 'block';
    }
}

// --- 5. PINDAH KE PAGE TOMBOL KABUR ---
function goToButtonPage() {
    mainContent.classList.remove('visible');
    mainContent.style.display = 'none';
    buttonScreen.style.display = 'flex';
}

// --- 6. TOMBOL NGGAK (VERSI HP) ---
let tolakCount = 0;
const tolakTexts = [
    "Yakin nih? 😞", 
    "Beneran ga dimaafin?", 
    "Jangan ngambek donggg 😭", 
    "Plisss maafin akuuu", 
    "Gabisa, tombolnya rusak 😝"
];

function tolakMaaf() {
    const btnNggak = document.getElementById('btn-nggak');
    const btnMaafin = document.getElementById('btn-maafin');

    if (tolakCount < tolakTexts.length) {
        btnNggak.innerText = tolakTexts[tolakCount];
    } 
    
    if (tolakCount >= tolakTexts.length - 1) {
        btnNggak.style.display = 'none';
    }
    
    tolakCount++;

    let currentSize = parseFloat(window.getComputedStyle(btnMaafin).fontSize);
    let currentPaddingTop = parseFloat(window.getComputedStyle(btnMaafin).paddingTop);
    let currentPaddingSide = parseFloat(window.getComputedStyle(btnMaafin).paddingLeft);
    
    btnMaafin.style.fontSize = (currentSize + 8) + 'px';
    btnMaafin.style.padding = (currentPaddingTop + 4) + 'px ' + (currentPaddingSide + 8) + 'px';
}

// --- 7. PINDAH KE PAGE PENUTUP ---
function dimaafin() {
    buttonScreen.style.display = 'none';
    finalScreen.style.display = 'flex';
}

// --- 8. ANIMASI BACKGROUND ICON MELAYANG ---
function createFloatingElements() {
    const container = document.getElementById('heartsContainer');
    const symbols = ['♥', '🌸', '✨', '💖', '💕']; 
    
    setInterval(() => {
        const el = document.createElement('div');
        el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.position = 'absolute';
        el.style.left = Math.random() * 100 + 'vw'; 
        el.style.bottom = '-50px';
        el.style.fontSize = (Math.random() * 20 + 15) + 'px';
        el.style.animation = `floatUp ${Math.random() * 3 + 4}s linear forwards`;
        el.style.opacity = '0.5'; 
        
        el.addEventListener('animationend', () => { el.remove(); });
        container.appendChild(el);
    }, 800); 
}

const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes floatUp {
    to { transform: translateY(-110vh) rotate(360deg); }
}
`;
document.head.appendChild(styleSheet);
createFloatingElements();

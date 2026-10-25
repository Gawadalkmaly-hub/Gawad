// Database Kata Majemuk Sederhana
const compoundDatabase = {
    "rumah sakit": "Tempat perawatan orang sakit.",
    "meja belajar": "Meja yang digunakan untuk belajar.",
    "kacamata": "Alat bantu untuk melihat.",
    "sapu tangan": "Kain kecil untuk menyapu keringat.",
    "kereta api": "Kendaran umum berderet di atas rel.",
    "sumber daya": "Potensi atau bahan baku.",
    "buku gambar": "Buku khusus untuk menggambar."
};

// Database Kata untuk Game
const wordList = [
    { word: "KOMPUTER", hint: "Alat elektronik untuk mengolah data" },
    { word: "PROGRAM", hint: "Kumpulan instruksi untuk komputer" },
    { word: "INTERNET", hint: "Jaringan global penghubung komputer" },
    { word: "ALGORITMA", hint: "Langkah-langkah logis pemecahan masalah" },
    { word: "VARIABEL", hint: "Wadah untuk menyimpan data dalam kode" }
];

let currentWordIndex = 0;
let score = 0;

// Fungsi Navigasi Tab
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 1. Fungsi Detektor Kata Majemuk
function checkCompound() {
    const w1 = document.getElementById('word1').value.trim().toLowerCase();
    const w2 = document.getElementById('word2').value.trim().toLowerCase();
    const resultBox = document.getElementById('detector-result');

    if (!w1 || !w2) {
        resultBox.className = "result-box error";
        resultBox.textContent = "Harap masukkan kedua kata!";
        resultBox.classList.remove('hidden');
        return;
    }

    const combinedWithSpace = `${w1} ${w2}`;
    const combinedNoSpace = `${w1}${w2}`;

    if (compoundDatabase[combinedWithSpace]) {
        resultBox.className = "result-box success";
        resultBox.innerHTML = `<strong>"${combinedWithSpace}"</strong> adalah Kata Majemuk!<br><small>Arti: ${compoundDatabase[combinedWithSpace]}</small>`;
    } else if (compoundDatabase[combinedNoSpace]) {
        resultBox.className = "result-box success";
        resultBox.innerHTML = `<strong>"${combinedNoSpace}"</strong> adalah Kata Majemuk!<br><small>Arti: ${compoundDatabase[combinedNoSpace]}</small>`;
    } else {
        resultBox.className = "result-box error";
        resultBox.textContent = `"${w1} ${w2}" bukan termasuk kata majemuk dalam sistem kami.`;
    }

    resultBox.classList.remove('hidden');
}

// 2. Logika Game Acak Kata
function shuffleString(str) {
    let arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

function loadWord() {
    const currentData = wordList[currentWordIndex];
    let scrambled = shuffleString(currentData.word);
    
    // Memastikan kata acak tidak sama dengan kata asli
    while (scrambled === currentData.word) {
        scrambled = shuffleString(currentData.word);
    }

    document.getElementById('scrambled-word').textContent = scrambled;
    document.getElementById('hint').textContent = `Clue: ${currentData.hint}`;
    document.getElementById('user-guess').value = '';
    document.getElementById('game-feedback').textContent = '';
}

function checkAnswer() {
    const userGuess = document.getElementById('user-guess').value.trim().toUpperCase();
    const correctAnswer = wordList[currentWordIndex].word;
    const feedback = document.getElementById('game-feedback');

    if (userGuess === correctAnswer) {
        feedback.style.color = "green";
        feedback.textContent = "Benar! Bagus sekali!";
        score += 10;
        document.getElementById('score').textContent = score;
        setTimeout(nextWord, 1500);
    } else {
        feedback.style.color = "red";
        feedback.textContent = "Salah, coba lagi!";
    }
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % wordList.length;
    loadWord();
}

// Inisialisasi Game saat Halaman Dimuat
window.onload = function() {
    loadWord();
};
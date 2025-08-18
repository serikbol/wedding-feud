const rounds = [
{
  question: "What’s a food you hope is not served at a wedding?",
  answers: [
    { text: "Blood Pudding/Sausage", points: 25 },
    { text: "Fish", points: 20 },
    { text: "Liver", points: 18 },
    { text: "Spaghetti/Noodles", points: 16 },
    { text: "French Food", points: 10 },
    { text: "Durian", points: 5 }
  ],
  background: "bg.png"
},
{
  question: "What’s a reason someone might cry at a wedding?",
  answers: [
    { text: "The Speeches!", points: 30 },
    { text: "Overwhelming Joy!", points: 25 },
    { text: "The Ceremony!", points: 20 },
    { text: "The Beauty of the Bride!", points: 15 },
    { text: "Dress Got Ruined!", points: 10 },
    { text: "Bride Says No!", points: 5 }
  ]
},
{
  question: "What is a popular wedding gift?",
  answers: [
    { text: "Money", points: 60 },
    { text: "Kitchenware", points: 45 },
    { text: "Home Appliances", points: 30 },
    { text: "Plants", points: 15 },
    { text: "A Vase", points: 10 },
    { text: "Engraved Glasses", points: 5 }
  ]
},
{
  question: "What is a song that gets people dancing at weddings?",
  answers: [
    { text: "Dancing Queen", points: 40, song: "dancing_queen.mp3" },
    { text: "Gimme Gimme Gimme", points: 30, song: "gimme_gimme_gimme.mp3" },
    { text: "Sweet Caroline", points: 20, song: "sweet_caroline.mp3" },
    { text: "Macarena", points: 15, song: "macarena.mp3" },
    { text: "YMCA", points: 10, song: "ymca.mp3" },
    { text: "Boogie Wonderland", points: 5, song: "boogie_wonderland.mp3" }
  ]
},
{
  question: "What is a popular wedding destination?",
  answers: [
    { text: "Italy 🇮🇹", points: 75 },
    { text: "France 🇫🇷", points: 40 },
    { text: "Turkiye 🇹🇷", points: 30 },
    { text: "Spain 🇪🇸", points: 20 },
    { text: "Greece 🇬🇷", points: 15 },
    { text: "Las Vegas 🇺🇸", points: 5 }
  ]
},
{
  question: "What was the first thing Sasha noticed about Jared? (When they first met)",
  answers: [
    { text: "His Curly Hair", points: 50 },
    { text: "His Eyes", points: 35 },
    { text: "His Smile", points: 25 },
    { text: "His Bri'ish Accent", points: 15 },
    { text: "His Wit", points: 10 },
    { text: "His School Uniform", points: 5 }
  ]
},
{
  question: "What was the first thing Jared noticed about Sasha? (When they first met)",
  answers: [
    { text: "Her Smile", points: 45 },
    { text: "Her Singing", points: 40 },
    { text: "Her Eyes", points: 25 },
    { text: "Her Blonde Hair", points: 20 },
    { text: "Her Style", points: 10 },
    { text: "Her Spirit", points: 5 }
  ]
},
{
  question: "What is the couple most likely to argue about?",
  answers: [
    { text: "Chores", points: 55 },
    { text: "What to Eat", points: 40 },
    { text: "Sasha's Lateness", points: 25 },
    { text: "What Games to Play", points: 20 },
    { text: "Adopting a Dog", points: 10 },
    { text: "Where to Travel", points: 5 }
  ]
}

];

let currentRound = 0;

// Set a custom background for each question, fallback to default
function setQuestionBackground(bgUrl) {
  const body = document.body;
  if (bgUrl) {
    body.style.backgroundImage = `url('${bgUrl}')`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundAttachment = 'fixed';
  } else {
    body.style.backgroundImage =
      'radial-gradient(circle at 20% 30%, #ff9900 0 7vw, transparent 7.5vw),' +
      'radial-gradient(circle at 80% 60%, #ff9900 0 8vw, transparent 8.5vw),' +
      'radial-gradient(circle at 60% 20%, #ffb84d 0 5vw, transparent 5.5vw),' +
      'radial-gradient(circle at 40% 80%, #ffb84d 0 6vw, transparent 6.5vw),' +
      'repeating-radial-gradient(circle, #1a3a7a 0 2vw, #2150a0 2vw 4vw)';
    body.style.backgroundSize = '';
    body.style.backgroundPosition = '';
    body.style.backgroundAttachment = '';
  }
}

function loadRound() {
  // Hide final screen if showing
  const finalScreen = document.getElementById('finalScreen');
  if (finalScreen) finalScreen.style.display = 'none';

  // If out of rounds, show final screen and hide game UI
  if (currentRound >= rounds.length) {
    document.getElementById('question').style.display = 'none';
    document.getElementById('board').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    if (finalScreen) finalScreen.style.display = 'flex';
    // Fade out background music
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
      let fadeSteps = 24;
      let fadeDuration = 1200; // ms
      let startVol = bgMusic.volume;
      let step = 0;
      let interval = setInterval(() => {
        step++;
        let newVol = startVol * (1 - step / fadeSteps);
        bgMusic.volume = Math.max(0, newVol);
        if (step >= fadeSteps) {
          bgMusic.volume = 0;
          clearInterval(interval);
        }
      }, fadeDuration / fadeSteps);
    }
    return;
  } else {
    document.getElementById('question').style.display = '';
    document.getElementById('board').style.display = '';
    document.querySelector('.controls').style.display = '';
    if (finalScreen) finalScreen.style.display = 'none';
  }

  const round = rounds[currentRound];
  setQuestionBackground(round.background);
  document.getElementById('question').textContent = round.question;
  const board = document.getElementById('board');
  board.innerHTML = "";

  // Remove old song audios if any
  document.querySelectorAll('.song-audio').forEach(el => el.remove());

  round.answers.forEach(function(ans, i) {
    const div = document.createElement('div');
    div.className = 'answer';
    div.textContent = (i+1);
    div.dataset.text = ans.text;
    div.dataset.points = ans.points;
    if (ans.song) div.dataset.song = ans.song;
    div.addEventListener('click', function() { reveal(div); });
    board.appendChild(div);

    // If this answer has a song, add an audio element (hidden)
    if (ans.song) {
      const audio = document.createElement('audio');
      audio.src = ans.song;
      audio.className = 'song-audio';
      audio.id = `song-audio-${i}`;
      // Set initial volume to match the slider (if present)
      const volumeSlider = document.getElementById('volumeSlider');
      if (volumeSlider) {
        audio.volume = parseFloat(volumeSlider.value);
      }
      board.appendChild(audio);
    }
  });
}

function reveal(el) {
  if (!el.classList.contains('revealed')) {
    el.innerHTML = `${el.dataset.text} <span class="score">${el.dataset.points}</span>`;
    el.classList.add('revealed');
    const ding = document.getElementById('ding');
    if (ding) {
      ding.currentTime = 0;
      ding.play();
    }
  }
  // Play song if available (allow replay even after reveal)
  if (el.dataset.song) {
    // Pause all other song audios first
    document.querySelectorAll('.song-audio').forEach(a => { a.pause(); a.currentTime = 0; });
    // Pause background music
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && !bgMusic.paused) {
      bgMusic.pause();
    }
    // Find the audio element for this answer and play (by matching src)
    const songFile = el.dataset.song;
    const audio = Array.from(document.querySelectorAll('.song-audio')).find(a => a.src.includes(songFile));
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      // When answer song ends, resume background music after 1 second
      audio.onended = function() {
        if (bgMusic && bgMusic.paused) {
          setTimeout(() => {
            bgMusic.play();
          }, 1000);
        }
      };
    }
  }
}

function wrongGuess() {
  const buzzer = document.getElementById('buzzer');
  if (buzzer) {
    buzzer.currentTime = 0;
    buzzer.play();
  }
  const x = document.getElementById('wrongX');
  x.classList.add('show');
  setTimeout(() => x.classList.remove('show'), 1600);
}

function nextRound() {
  // Stop all song audios
  document.querySelectorAll('.song-audio').forEach(a => { a.pause(); a.currentTime = 0; });
  // Resume background music if paused
  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic && bgMusic.paused) {
    bgMusic.play();
  }
  if (currentRound < rounds.length - 1) {
    currentRound++;
    loadRound();
  } else {
    // Show final screen
    currentRound = rounds.length;
    loadRound();
  }
}

function prevRound() {
  // Stop all song audios
  document.querySelectorAll('.song-audio').forEach(a => { a.pause(); a.currentTime = 0; });
  // Resume background music if paused
  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic && bgMusic.paused) {
    bgMusic.play();
  }
  if (currentRound > 0) {
    currentRound--;
    loadRound();
  } else {
    alert("Already at first round!");
  }
}

// Start background music on first click (due to browser autoplay rules)
document.body.addEventListener('click', function startMusic() {
  document.getElementById('bgMusic').play();
  document.body.removeEventListener('click', startMusic);
});

window.addEventListener('DOMContentLoaded', function() {
  // Set correct/incorrect sound effect sources
  const ding = document.getElementById('ding');
  if (ding) ding.src = 'ding.mp3';
  const buzzer = document.getElementById('buzzer');
  if (buzzer) buzzer.src = 'incorrect.mp3';
  const intro = document.getElementById('introOverlay');
  const countdown = document.getElementById('countdownOverlay');
  const countdownNum = document.getElementById('countdownNumber');
  const startBtn = document.getElementById('startBtn');
  const bgMusic = document.getElementById('bgMusic');
  const mainContent = document.querySelector('.main-content-wrapper .question');
  const board = document.getElementById('board');
  const controls = document.querySelector('.main-content-wrapper .controls');
  const volumeSlider = document.getElementById('volumeSlider');
  const audios = document.querySelectorAll('audio');

  // Hide main game content initially
  mainContent.style.display = 'none';
  board.style.display = 'none';
  controls.style.display = 'none';

  // Only play music on intro
  bgMusic.currentTime = 0;
  bgMusic.volume = 1;
  bgMusic.play();

  if (volumeSlider) {
    volumeSlider.addEventListener('input', function() {
      // Update all audio elements, including dynamically created ones
      document.querySelectorAll('audio').forEach(a => a.volume = parseFloat(volumeSlider.value));
    });
    // Set initial volume for all audio elements
    document.querySelectorAll('audio').forEach(a => a.volume = parseFloat(volumeSlider.value));
  }

  // NOTE: For true volume normalization, use an audio editor (like Audacity) to normalize all song files to the same loudness before adding them to your project. JavaScript volume only scales, not normalizes perceived loudness.

  startBtn.addEventListener('click', function() {
    intro.style.display = 'none';
    // Gradually lower music to 50% over 1.2 seconds
    let startVol = bgMusic.volume;
    let endVol = 0.5;
    let duration = 1200;
    let steps = 24;
    let step = 0;
    let interval = setInterval(() => {
      step++;
      let newVol = startVol - ((startVol - endVol) * (step / steps));
      bgMusic.volume = newVol;
      if (volumeSlider) volumeSlider.value = newVol;
      if (step >= steps) {
        bgMusic.volume = endVol;
        if (volumeSlider) volumeSlider.value = endVol;
        clearInterval(interval);
      }
    }, duration / steps);

    countdown.style.display = 'flex';
    let n = 5;
    function doCountdown() {
      if (n > 0) {
        countdownNum.textContent = n;
        countdownNum.classList.remove('feud');
        countdownNum.style.display = 'block';
        countdownNum.style.animation = 'none';
        void countdownNum.offsetWidth; // force reflow for animation
        countdownNum.style.animation = '';
        setTimeout(() => {
          n--;
          doCountdown();
        }, 800);
      } else {
        // Show Family Feud image instead of text
        countdownNum.style.display = 'none';
        const familyFeudImg = document.getElementById('familyFeudImage');
        if (familyFeudImg) {
          familyFeudImg.style.display = 'block';
          familyFeudImg.classList.remove('bounce');
          // Force reflow to restart animation
          void familyFeudImg.offsetWidth;
          familyFeudImg.classList.add('bounce');
        }
        setTimeout(() => {
          if (familyFeudImg) familyFeudImg.style.display = 'none';
          countdown.style.display = 'none';
          mainContent.style.display = '';
          board.style.display = '';
          controls.style.display = '';
          loadRound(); // <-- Only load the round after intro/countdown
        }, 1400);
      }
    }
    doCountdown();
  });
});

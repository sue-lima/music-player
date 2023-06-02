const player = document.querySelector(".player"),
musicImg = player.querySelector(".img-song img"),
musicName = player.querySelector(".song-info h1"),
musicArtist = player.querySelector(".song-info p"),
musicAudio = player.querySelector("#main-audio"),
playPauseButton = player.querySelector(".play-pouse"),
prevButton = player.querySelector(".prev"),
nextButton = player.querySelector(".next"),
progressBar = player.querySelector(".progress-bar")

let musicIndex = 8;

window.addEventListener("load", ()=> {
  loadingMusic(musicIndex); 
});

function loadingMusic(indexNumb) {
  musicName.innerText = allMusics[indexNumb - 1].name;
  musicArtist.innerText = allMusics[indexNumb - 1].artist;
  musicImg.src = `../assets/images/${allMusics[indexNumb - 1].img}.jpg`;
  musicAudio.src = `../assets/music/${allMusics[indexNumb - 1].src}.mp3`;
}

function playMusic() {
  player.classList.add("paused");
  playPauseButton.innerHTML = "<i class='fa-solid fa-pause fa-xl'></i>";
  musicAudio.play();
}

function pauseMusic() {
  player.classList.remove("paused");
  playPauseButton.innerHTML = "<i class='fa-solid fa-play fa-xl'></i>";
  musicAudio.pause();
}

function previousMusic() {
  musicIndex--;
  musicIndex < 1 ? musicIndex = allMusics.length : musicIndex = musicIndex;
  loadingMusic(musicIndex);
  playMusic();
}

function nextMusic() {
  musicIndex++;
  musicIndex > allMusics.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadingMusic(musicIndex);
  playMusic();
}

playPauseButton.addEventListener("click", ()=> {
  const isMusicPause = player.classList.contains("paused");
  isMusicPause ? pauseMusic() : playMusic();
});

prevButton.addEventListener("click", ()=> {
  previousMusic();
});

nextButton.addEventListener("click", ()=> {
  nextMusic();
});
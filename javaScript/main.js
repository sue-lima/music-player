const player = document.querySelector(".player"),
musicAlbum = player.querySelector(".album"),
musicImg = player.querySelector(".cover-img"),
songInfos = player.querySelector(".song-info"),
musicName = player.querySelector(".music-name"),
musicArtist = player.querySelector(".artist-name"),
musicAudio = player.querySelector("#main-audio"),
playPauseButton = player.querySelector(".play-pouse"),
prevButton = player.querySelector(".prev"),
nextButton = player.querySelector(".next"),
progressBar = player.querySelector(".progress-bar"),
progressMusic = player.querySelector(".progress-music"),
progressMusicTime = player.querySelector(".time"),
musicList = document.querySelector(".music-playlist"),
showMore = player.querySelector(".music-list"),
hideMusic = musicList.querySelector("#close")

let musicIndex = 1;

const minButton = document.getElementById("btn");
minButton.addEventListener("click", ()=> {
  musicAlbum.classList.toggle("up-down");
  songInfos.classList.toggle("up-down");
  musicImg.classList.toggle("up-down");
  musicName.classList.toggle("up-down");
  musicArtist.classList.toggle("up-down");
  progressMusicTime.classList.toggle("up-down");
  musicList.classList.toggle("up-down");
  if(musicAlbum.classList.contains('up-down')) {
    minButton.innerHTML = "<i class='fa-solid fa-sort-down fa-2xl'></i>";
    minButton.setAttribute("title", "Maximizar player");
  } else {
    minButton.innerHTML = "<i class='fa-solid fa-sort-up fa-2xl'></i>";
  }
});

window.addEventListener("load", ()=> {
  loadingMusic(musicIndex);
  playingNow(); 
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
  playPauseButton.setAttribute("title", "Pausar");
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
  playingNow();
}

function nextMusic() {
  musicIndex++;
  musicIndex > allMusics.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadingMusic(musicIndex);
  playMusic();
  playingNow();
}

playPauseButton.addEventListener("click", ()=> {
  const isMusicPause = player.classList.contains("paused");
  isMusicPause ? pauseMusic() : playMusic();
  playingNow();
});

prevButton.addEventListener("click", ()=> {
  previousMusic();
});

nextButton.addEventListener("click", ()=> {
  nextMusic();
});

musicAudio.addEventListener("timeupdate", (e)=> {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;

  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = player.querySelector(".current"),
  musicDuration = player.querySelector(".duration");

  musicAudio.addEventListener("loadeddata", ()=> {
    let audioDuration = musicAudio.duration;
    let totalMinutes = Math.floor(audioDuration / 60);
    let totalSeconds = Math.floor(audioDuration % 60);
    if(totalSeconds < 10) {
      totalSeconds = `0${totalSeconds}`;
    }
    musicDuration.innerText = `${totalMinutes}:${totalSeconds}`;
  });

  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if(currentSeconds < 10) { 
    currentSeconds = `0${currentSeconds}`;
  }
  musicCurrentTime.innerText = `${currentMinutes}:${currentSeconds}`;
});

progressMusic.addEventListener("click", (e)=>{
  let progressWidthval = progressMusic.clientWidth;
  let clickedOffSetX = e.offsetX;
  let songDuration = musicAudio.duration;

  musicAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
  playMusic();
});

const repeatButton = player.querySelector("#repeat");
repeatButton.addEventListener("click", ()=> {
  let getText = repeatButton.innerText;

  switch(getText) { 
    case "repeat": 
      repeatButton.innerText = "repeat_one";
      repeatButton.setAttribute("title", "Repetir");
      break;
    case "repeat_one":
      repeatButton.innerText = "repeat";
      repeatButton.setAttribute("title", "Repetir uma faixa");
      break;
  }
});

showMore.addEventListener("click", ()=> {
  musicList.classList.toggle("show");
});

hideMusic.addEventListener("click", ()=> {
  showMore.click();
});

musicAudio.addEventListener("ended", ()=> {
  let getText = repeatButton.innerText;

  switch(getText) { 
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      musicAudio.currentTime = 0;
      loadingMusic(musicIndex);
      playMusic();
      break;
  }
});

const ulTag = musicList.querySelector("ul");

for (let i = 0; i < allMusics.length; i++) {
  let liTag = `<li li-index="${i + 1}">
                  <div class="row">
                      <span>${allMusics[i].name}</span>
                      <p>${allMusics[i].artist}</p>
                  </div>
                  <audio class="${allMusics[i].src}" src="../assets/music/${allMusics[i].src}.mp3"></audio>
                  <span id="${allMusics[i].src}" class="audio-duration"></span>
                </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);
        
  let liAudioDuration = ulTag.querySelector(`#${allMusics[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusics[i].src}`);

  liAudioTag.addEventListener("loadeddata", ()=> {
    let audioDuration = liAudioTag.duration;
    let totalMinutes = Math.floor(audioDuration / 60); 
    let totalSeconds = Math.floor(audioDuration % 60); 
    if(totalSeconds < 10) {
      totalSeconds = `0${totalSeconds}`;
    }
    liAudioDuration.innerText = `${totalMinutes}:${totalSeconds}`;
    liAudioDuration.setAttribute("t-duration", `${totalMinutes}:${totalSeconds}`);
  });
}

const allLiTags = ulTag.querySelectorAll("li");
function playingNow() {
  for (let j = 0; j < allLiTags.length; j++) {
    let audioTag = allLiTags[j].querySelector(".audio-duration");
    if (allLiTags[j].classList.contains("playing-now")) {
      allLiTags[j].classList.remove("playing-now");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    if(allLiTags[j].getAttribute("li-index") == musicIndex) {
      allLiTags[j].classList.add("playing-now");
      audioTag.innerText = "Tocando agora";
    }

    allLiTags[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadingMusic(musicIndex);
  playMusic();
  playingNow();
}

document.addEventListener('DOMContentLoaded', function () {
    var player = document.getElementById('Slimsp_player');
    var playButton = document.getElementById('play_button');
    var cuTimer = document.getElementById('cuTimer');
    var toTimer = document.getElementById('toTimer');
    var pbar = document.getElementById('progress-bar');
    var vol = document.getElementById('change_vol');
    var volImg = document.getElementById('vol_img');
    var isPlaying = false;
    var currentTrack = null;
    var currentElement = null;

    player.onloadedmetadata = function () {
        toTimer.textContent = formatTime(player.duration);
        pbar.max = player.duration;
        player.controls = false;
        player.volume = 0.50;
    };

    function formatTime(sec) {
        var totalSeconds = Math.floor(sec);
        var totalMinutes = Math.floor(totalSeconds / 60);
        totalSeconds = totalSeconds % 60;
        return `${totalMinutes < 10 ? "0" : ""}${totalMinutes}:${totalSeconds < 10 ? "0" : ""}${totalSeconds}`;
    }

    player.addEventListener('timeupdate', function () {
        cuTimer.textContent = formatTime(player.currentTime);
        pbar.value = player.currentTime;
    });

    player.addEventListener('play', function () {
        isPlaying = true;
        updatePlayPauseIcon(true);
        if (currentElement) {
            updateIcons(true, currentElement);
        }
    });

    player.addEventListener('pause', function () {
        isPlaying = false;
        updatePlayPauseIcon(false);
        if (currentElement) {
            updateIcons(false, currentElement);
        }
    });

    function playerSlimsp(file, cantor, musica, element) {
        // Atualiza a div "info" com o nome do cantor e da música
        document.getElementById('info').textContent = `${cantor} - ${musica}`;

        var playingItem = document.querySelector('.sm2_playing');
        if (playingItem && playingItem !== element) {
            playingItem.classList.remove('sm2_playing');
            playingItem.classList.add('sm2_paused');
        }

        if (element !== playingItem) {
            element.classList.remove('sm2_paused');
            element.classList.add('sm2_playing');
            currentElement = element;
        } else {
            element.classList.toggle('sm2_playing');
            element.classList.toggle('sm2_paused');
            currentElement = null;
        }

        // Iniciar reprodução se não for o arquivo atual
        if (currentTrack !== file) {
            player.src = file;
            player.load();
            playSlimsp();
            currentTrack = file;
        } else {
            if (isPlaying) {
                pauseSlimsp();
            } else {
                playSlimsp();
            }
        }
    };

    function playSlimsp() {
        player.play();
    }

    function pauseSlimsp() {
        player.pause();
    }

    function changeVolume() {
        player.volume = vol.value;
        volImg.src = player.volume > 0 ? "Image/volume.png" : "Image/mute.png";
    }

    function mute() {
        player.volume = 0;
        vol.value = 0;
        volImg.src = "Image/mute.png";
    }

    function updateIcons(isPlaying, element) {
        if (isPlaying) {
            element.classList.remove('sm2_paused');
            element.classList.add('sm2_playing');
        } else {
            element.classList.remove('sm2_playing');
            element.classList.add('sm2_paused');
        }
    }

    function updatePlayPauseIcon(isPlaying) {
        if (playButton) {
            playButton.src = isPlaying ? "Image/pause.png" : "Image/play.png";
        }
    }

    playButton.addEventListener('click', function () {
        if (isPlaying) {
            pauseSlimsp();
        } else {
            playSlimsp();
        }
    });

    pbar.addEventListener("click", function (e) {
        var percent = e.offsetX / pbar.offsetWidth;
        player.currentTime = percent * player.duration;
        pbar.value = percent * player.duration;
    });

    vol.addEventListener('input', changeVolume);

    window.playerSlimsp = function (arquivo, cantor, musica, element) {
        if (currentTrack !== arquivo) {
            player.src = arquivo;
            player.load();
            playSlimsp();
            currentTrack = arquivo;

            // Atualiza a div "info" com o nome do cantor e da música
            document.getElementById('info').textContent = `${cantor} - ${musica}`;

            // Atualiza os ícones de reprodução/pausa
            if (currentElement) {
                updateIcons(false, currentElement);
            }
            currentElement = element;
            updateIcons(true, element);

        } else {
            if (isPlaying) {
                pauseSlimsp();
                updateIcons(false, element);
            } else {
                playSlimsp();
                updateIcons(true, element);
            }
        }
    };
});


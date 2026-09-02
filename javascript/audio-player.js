document.addEventListener('DOMContentLoaded', () => {

    const music = document.createElement('audio');
    music.id = 'bg-music';
    music.loop = true;
    music.preload = 'auto';

    const source = document.createElement('source');
    source.src = '../music/SINCE%20DAY%20ONE%20-%20Skusta%20Clee%20ft.%20Flow%20G%20KARAOKE%20INSTRUMENTAL%20%28No%20Vocals%29%20%20OPM%20Hip-HopR%26B%20Beat.mp3';
    source.type = 'audio/mpeg';

    music.appendChild(source);
    document.body.appendChild(music);

    const savedTime = localStorage.getItem('qpal_music_time');
    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    const playAudio = () => {
        music.play().catch(() => {
            const unlockAudio = () => {
                music.play();
                document.removeEventListener('click', unlockAudio);
                document.removeEventListener('keydown', unlockAudio);
                document.removeEventListener('touchstart', unlockAudio);
            };
            document.addEventListener('click', unlockAudio);
            document.addEventListener('keydown', unlockAudio);
            document.addEventListener('touchstart', unlockAudio);
        });
    };

    playAudio();

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('qpal_music_time', music.currentTime);
    });
});
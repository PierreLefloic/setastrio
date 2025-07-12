// Pause all other audio elements when one starts playing
document.querySelectorAll('audio').forEach(function(audio) {
  audio.addEventListener('play', function() {
    document.querySelectorAll('audio').forEach(function(otherAudio) {
      if (otherAudio !== audio) {
        otherAudio.pause();
        // otherAudio.currentTime = 0;
      }
    });
  });
});
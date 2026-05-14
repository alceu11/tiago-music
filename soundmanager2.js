// Include the library in your <head>
// <script src="path/to/soundmanager2.js"></script>

soundManager.setup({
  url: '/path/to/swf-files/', // Path to SWF files for Flash fallback
  onready: function() {
    // Create and play a sound
    var mySound = soundManager.createSound({
      id: 'aSound',
      url: '/path/to/audio.mp3'
    });
    mySound.play();
  }
});

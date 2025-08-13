

document.querySelectorAll('.nav-btn').forEach(button => {
  button.addEventListener('click', () => {

    window.location.href = targetUrl;

  });
});

let players = [];

function onYouTubeIframeAPIReady() {
  console.log('YouTube API Ready');
  // Wait a bit to ensure DOM is ready
  setTimeout(() => {
    const iframes = document.querySelectorAll('iframe[src*="youtube.com/embed"]');
    console.log('Found', iframes.length, 'YouTube iframes');

    iframes.forEach((iframe, index) => {
      // Give each iframe a unique ID if it doesn't have one
      if (!iframe.id) {
        iframe.id = `youtube-player-${index}`;
      }

      try {
        console.log('Creating player for:', iframe.id);
        const player = new YT.Player(iframe.id, {
          events: {
            'onReady': function (event) {
              console.log('Player ready:', iframe.id);
            },
            'onStateChange': function (event) {
              console.log('State change for', iframe.id, ':', event.data);
              if (event.data === YT.PlayerState.PLAYING) {
                console.log('Playing:', iframe.id, '- pausing others');
                // Pause all other players
                players.forEach(otherPlayer => {
                  if (otherPlayer && otherPlayer.pauseVideo && otherPlayer !== player) {
                    try {
                      otherPlayer.pauseVideo();
                      console.log('Paused another player');
                    } catch (e) {
                      console.log('Could not pause player:', e);
                    }
                  }
                });
              }
            }
          }
        });
        players.push(player);
      } catch (e) {
        console.log('Could not create player for iframe:', iframe.id, e);
      }
    });
  }, 500);
}
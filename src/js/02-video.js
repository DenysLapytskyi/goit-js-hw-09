
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';



const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const storage = localStorage.getItem('videoplayer-current-time');

 player.on(
        'timeupdate', throttle(function () {
          player.getCurrentTime()
            .then(function (seconds) {
              localStorage.setItem('videoplayer-current-time', seconds);
            })
            .catch(function (error) {});
        }, 1000),
        player
          .setCurrentTime(storage)
          .then(function (seconds) {})
          .catch(function (error) {})
      );
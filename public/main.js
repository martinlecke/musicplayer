let playing = false;
let playingIndex = 0;

let playlist = [{
    song: 'Moonlight Sonata',
    artist: 'Beethoven',
    cover: 'https://img-www.tf-cdn.com/artist/10/ludwig-van-beethoven.jpeg?_v=20160612194603&fit=crop&crop=faces%20top&w=400&h=400',
    trackUrl: 'https://www.mfiles.co.uk/mp3-downloads/moonlight-movement1.mp3'
  },
  {
    song: 'Pathétique Sonat',
    artist: 'Beethoven',
    cover: 'https://img-www.tf-cdn.com/artist/10/ludwig-van-beethoven.jpeg?_v=20160612194603&fit=crop&crop=faces%20top&w=400&h=400',
    trackUrl: 'https://www.mfiles.co.uk/mp3-downloads/beethoven-piano-sonata-pathetique-2.mp3'
  },
  {
    song: 'Rondo',
    artist: 'Mozart',
    cover: 'https://pbs.twimg.com/profile_images/555604160662368256/LtzsvBxO.jpeg',
    trackUrl: 'https://www.mfiles.co.uk/mp3-downloads/mozart-horn-concerto4-3-rondo.mp3'
  },
  {
    song: 'Nocturne',
    artist: 'Chopin',
    cover: 'https://pbs.twimg.com/profile_images/1002253627/chopincara_400x400.jpg',
    trackUrl: 'https://www.mfiles.co.uk/mp3-downloads/chopin-nocturne-op9-no2.mp3'
  },
  {
    song: 'Pathétique Sonat',
    artist: 'Beethoven',
    cover: 'https://img-www.tf-cdn.com/artist/10/ludwig-van-beethoven.jpeg?_v=20160612194603&fit=crop&crop=faces%20top&w=400&h=400',
    trackUrl: 'https://www.mfiles.co.uk/mp3-downloads/beethoven-piano-sonata-pathetique-2.mp3'
  },
  {
    song: 'Pathétique Sonat',
    artist: 'Beethoven',
    cover: 'https://img-www.tf-cdn.com/artist/10/ludwig-van-beethoven.jpeg?_v=20160612194603&fit=crop&crop=faces%20top&w=400&h=400',
    trackUrl: 'https://www.mfiles.co.uk/mp3-downloads/beethoven-piano-sonata-pathetique-2.mp3'
  },
  {
    song: 'Pathétique Sonat',
    artist: 'Beethoven',
    cover: 'https://img-www.tf-cdn.com/artist/10/ludwig-van-beethoven.jpeg?_v=20160612194603&fit=crop&crop=faces%20top&w=400&h=400',
    trackUrl: 'https://www.mfiles.co.uk/mp3-downloads/beethoven-piano-sonata-pathetique-2.mp3'
  },
  {
    song: 'Pathétique Sonat',
    artist: 'Beethoven',
    cover: 'https://img-www.tf-cdn.com/artist/10/ludwig-van-beethoven.jpeg?_v=20160612194603&fit=crop&crop=faces%20top&w=400&h=400',
    trackUrl: 'https://www.mfiles.co.uk/mp3-downloads/beethoven-piano-sonata-pathetique-2.mp3'
  },
  {
    song: 'Pathétique Sonat',
    artist: 'Beethoven',
    cover: 'https://img-www.tf-cdn.com/artist/10/ludwig-van-beethoven.jpeg?_v=20160612194603&fit=crop&crop=faces%20top&w=400&h=400',
    trackUrl: 'https://www.mfiles.co.uk/mp3-downloads/beethoven-piano-sonata-pathetique-2.mp3'
  },
  {
    song: 'Pathétique Sonat',
    artist: 'Beethoven',
    cover: 'https://img-www.tf-cdn.com/artist/10/ludwig-van-beethoven.jpeg?_v=20160612194603&fit=crop&crop=faces%20top&w=400&h=400',
    trackUrl: 'https://www.mfiles.co.uk/mp3-downloads/beethoven-piano-sonata-pathetique-2.mp3'
  }
];


let audio = playlist[0];
audio.track = new Audio(audio.trackUrl);


playlist.forEach((track, index) => {
  $('.playlist__list').append(`
    <div class="col-12 playlist__song p-3 px-4" data-track="${index}">
      <div class="row flex-row">
        <div class="col-2">
          <img src="${track.cover}" class="img-fluid" alt="Albumcover"  />
        </div>
        <div class="col flex-grow-1 d-flex flex-column justify-content-center">
          <div>
            <p class="playlist__songartist">
              ${track.artist}
            </p>
            <p class="playlist__songtitle">
              ${track.song}
            </p>
          </div>
        </div>
        <div class="col-2 text-right align-self-center playlist__song__playbutton">
          <i class="fas fa-play-circle"></i>
        </div>
      </div>
    </div>
  `);
});

const playThisSong = (index) => {
  audio.track.pause();
  playing = false;
  $('.progress-bar').css('width', 0)
  audio.track = new Audio(playlist[playingIndex].trackUrl);
  handlePlayButton();
  currentlyPlaying(index);
};

const handlePlayButton = () => {
  let value;

  if (playing) {
    audio.track.pause();
    value = 'fas fa-play-circle';
    playing = false;
  } else {
    audio.track.play();
    value = 'fas fa-pause';
    playing = true;
  }

  $('.player__button_play').html(`<i class="fas ${value}"></i>`);
}

const currentlyPlaying = (index = 0) => {
  $('.player__currently-playing__songtitle').text(playlist[index].song);
  $('.player__currently-playing__songartist').text(playlist[index].artist);
  $('.player__albumcover').attr('src', playlist[index].cover);
  $('body').css('background-image', `url(${playlist[index].cover})`);
  audio.track.addEventListener('timeupdate', playerData);
}

const togglePlaylistMenu = () => {
  if ($(window).width() < 992) {
    $('.playlist').toggle();
    $('.player').toggle();
  }
}

const toTime = (secondsTotal) => {
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = Math.floor(secondsTotal) - minutes * 60;
  return `${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
}

const playerData = () => {
  $('.player__end-time').html(toTime(audio.track.duration))
  $('.player__current-time').html(toTime(audio.track.currentTime));
  let percent = (audio.track.currentTime / audio.track.duration) * 100;
  $('.progress-bar').css('width', percent);
}

// Event handlers

$('.toggle-playlist').parent().on('click', togglePlaylistMenu);
// Play pause buttons
$(document).on('click', '.player__button_play', handlePlayButton);
// next player__buttons
$('.player__button_next').on('click', function() {
  let value = $(this).data('next');
  playingIndex += value;
  playingIndex > 0 ? playingIndex : playingIndex = 0;
  playThisSong(playingIndex);
})
// playlist play Song
$('.playlist__song__playbutton').click(function() {
  playingIndex = $(this).closest('.playlist__song').data('track');
  playThisSong(playingIndex);
  togglePlaylistMenu();
});

currentlyPlaying();
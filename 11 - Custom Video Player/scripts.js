/**
 * Get elements
 */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
/**
 * Build functions
 */
const playVideo = () => video.paused ? video.play() : video.pause(); 
const updateButton = (e) => {
  const icon = !e.target.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}
const skip = (e) => {
  const skip = e.target.dataset.skip;
  skip > 0 ? video.currentTime += +skip : video.currentTime += +skip;
}

const handleRangeUpdate = (e) => {
  video[e.target.name] = e.target.value;
}

const handleProgress = () => {
  progressBar.style['flex-basis'] = `${(video.currentTime * 100 / video.duration)}%`;
}

const scrub = (e) => {
  // const one = video.duration/progress.offsetWidth;
  video.currentTime = video.duration/progress.offsetWidth * e.offsetX;
}
 
/**
 * Hook up the event listeners
 */

video.addEventListener('click', playVideo);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', playVideo);

skipButtons.forEach( button => button.addEventListener('click', skip))

ranges.forEach( range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach( range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

/**
 * TODO: Add fullscreen mode
 */
'use strict';
//ET - 4h
//AT - 4h 30m

let request = fetch('https://itunes.apple.com/search?entity=musicVideo&term=beyonce');

let songs = [];

let songsContainer = document.querySelector('#songsCarousel');
let carouselBody = document.querySelector('#myCarousel')

request
.then(response => response.ok ? response.json() : Promise.reject())
.then(response => {
    songs = response.results;
    songs.forEach(element => {
        let songItem = document.createElement('div');
        songItem.classList.add('item');

        let songVideo = document.createElement('video');
        songVideo.setAttribute('src', element.previewUrl);
        songVideo.setAttribute('style', 'width:60%; margin: 0 20%;');
        songVideo.setAttribute('controls', '');

        let songDescription = document.createElement('div');
        songDescription.classList.add('carousel-caption');
        songDescription.setAttribute('style', 'padding: 0; margin-bottom: 25px;');

        let songArtist = document.createElement('h3');
        songArtist.style.marginBottom = '0';
        songArtist.innerText =  (element.artistName);

        let songName = document.createElement('p');
        songName.style.margin = '0';
        songName.innerHTML = (element.trackName);

        let songLink = document.createElement('a');
        songLink.setAttribute('href', element.trackViewUrl);
        songLink.setAttribute('target', 'blank');
        songLink.innerText = (`View in Apple Music (price-$${element.trackPrice})`);



        songDescription.appendChild(songArtist);
        songDescription.appendChild(songName);
        songDescription.appendChild(songLink);
        songItem.appendChild(songVideo);
        songItem.appendChild(songDescription);
        songsContainer.appendChild(songItem);
        
    });

    let firstSong = songsContainer.childNodes[1];
    firstSong.classList.add('active');

})
.catch(error => console.log(error));

carouselBody.addEventListener('mousedown', event => {
    if(event.target.hasAttribute('slide-button')) {
        let currentVideo = document.querySelector('.active').firstChild;
        currentVideo.pause();
        currentVideo.currentTime = 0;
    }
});

(function() {
    function SongPlayer($rootScope, Fixtures) {
        
        /* @desc SongPlayer object to pass public methods
        *  @type {Object} */
        var SongPlayer = {};
        
        /* @desc Keep track of current album's songs
        *  @type {Object} */
        var currentAlbum = Fixtures.getAlbum();
        
        /* @desc Buzz object audio file
        *  @type {Object} */
        var currentBuzzObject = null;
        
        
        /* @function playSong
        *  @desc Plays song and sets song playing property to true
        *  @param {Object} song */
        var playSong = function(song){
            if( song !== null){
                currentBuzzObject.play();
                song.playing = true;
            }
        };
        
        
        /* @function setSong
        *  @desc Stops currently playing song and loads new audio file as currentBuzzObject
        *  @param {Object} song */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
 
            SongPlayer.currentSong = song;
        };
        
        /* @function setSongIndex
        *  @desc Returns index of song in album
        *  @param {Object} song 
        *  @return {number}*/
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        var stopSong = function(){
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        
        /* @desc Current playback time (in seconds) of currently playing song
        *  @type {Number}*/
        SongPlayer.currentTime = null;
        
        /* @desc Sets song that is currently playing
        *  @type {Object} */
        SongPlayer.currentSong = null;
        
        
        /* @function play
        *  @desc Plays song that is passed as a paramater
        *  @param {Object} song */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } 
            else if (SongPlayer.currentSong === song) {
                playSong(song);   
            }
        };
        
        /* @function pause
        *  @desc Pauses currently playing song
        *  @param {Object} song */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
            };
        
        /* @function previous
        *  @desc Decrements current song index and plays previous song*/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if (currentSongIndex < 0) {
                stopSong();
            }
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /* @function next
        *  @desc Increments current song index and plays next song*/
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex > currentAlbum.songs.length - 1) {
                stopSong();
            }
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /* @function setCurrentTime
        *  @desc Set current time (in seconds) of currently playing song
        *  @param {Number} time*/
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
            return SongPlayer;
    }

 
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
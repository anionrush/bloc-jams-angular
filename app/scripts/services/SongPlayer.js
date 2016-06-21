(function() {
    function SongPlayer() {
        
        /* @desc SongPlayer object to pass public methods
        *  @type {Object} */
        var SongPlayer = {};
        
        /* @desc Sets song that is currently playing
        *  @type {Object} */
        var currentSong = null;
        
        /* @desc Buzz object audio file
        *  @type {Object} */
        var currentBuzzObject = null;
        
        
        /* @function playSong
        *  @desc Plays song and sets song playing property to true
        *  @param {Object} song */
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
        
        
        /* @function setSong
        *  @desc Stops currently playing song and loads new audio file as currentBuzzObject
        *  @param {Object} song */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            currentSong = song;
        };
        
        
        /* @function play
        *  @desc Plays song that is passed as a paramater
        *  @param {Object} song */
        SongPlayer.play = function(song) {
            
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            } 
            else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                playSong(song);
                
                }
            }
        };
        
        /* @function pause
        *  @desc Pauses currently playing song
        *  @param {Object} song */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
 })();
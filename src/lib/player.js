import {
    Howl,
    Howler
} from 'howler';
const PLAY_PAUSE_FADE_DURATION = 200;
class Player {
    constructor() {
        // 播放器状态
        this._playing = false; // 是否正在播放中
        this._progress = 0; // 当前播放歌曲的进度
        this._enabled = false; // 是否启用Player
        this._repeatMode = 'off'; // off | on | one
        this._shuffle = false; // true | false
        this._reversed = false;
        this._volume = 0.5; // 0 to 1
        this._volumeBeforeMuted = 1; // 用于保存静音前的音量
        this._personalFMLoading = false; // 是否正在私人FM中加载新的track
        this._personalFMNextLoading = false; // 是否正在缓存私人FM的下一首歌曲

        // 播放信息
        this._list = []; // 播放列表
        this._current = 0; // 当前播放歌曲在播放列表里的index
        this._shuffledList = []; // 被随机打乱的播放列表，随机播放模式下会使用此播放列表
        this._shuffledCurrent = 0; // 当前播放歌曲在随机列表里面的index
        this._playlistSource = {
            type: 'album',
            id: 123
        }; // 当前播放列表的信息
        this._currentTrack = {
            id: 86827685
        }; // 当前播放歌曲的详细信息
        this._playNextList = []; // 当这个list不为空时，会优先播放这个list的歌
        this._isPersonalFM = false; // 是否是私人FM模式
        this._personalFMTrack = {
            id: 0
        }; // 私人FM当前歌曲
        this._personalFMNextTrack = {
            id: 0,
        }; // 私人FM下一首歌曲
        this._howler = null;

    }
    get volume() {
        return this._volume;
    }
    set volume(volume) {
        this._volume = volume;
        Howler.volume(volume);
    }
    get list() {
        return this._list;
    }
    set list(list) {
        this._list = list;
    }
    get progress() {
        return this._progress;
      }
    set progress(value) {
    if (this._howler) {
        this._howler.seek(value);
    }
    }
    _playAudioSource(source, autoplay = true) {
        Howler.unload();
        this._howler = new Howl({
            src: [source],
            html5: true,
            preload: true,
            format: ['mp3', 'flac'],
            onend: () => {
                this._nextTrackCallback();
            },
        });
        if (autoplay) {
            this.play();
           
            //   setTrayLikeState(store.state.liked.songs.includes(this.currentTrack.id));
        }
        // this.setOutputDevice();
    }
    _nextTrackCallback() {
        this._scrobble(this._currentTrack, 0, true);
        // if (!this.isPersonalFM && this.repeatMode === 'one') {
        //   this._replaceCurrentTrack(this._currentTrack.id);
        // } else if (this.isPersonalFM) {
        //   this.playNextFMTrack();
        // } else {
        //   this.playNextTrack();
        // }
    }
    play() {
        if (this._howler ?.playing()) return;
        this._howler ?.play();

        this._howler ?.once('play', () => {
            this._howler ?.fade(0, this.volume, PLAY_PAUSE_FADE_DURATION);

            this._setPlaying(true);
            // this._playDiscordPresence(this._currentTrack, this.seek());
            //   if (store.state.lastfm.key !== undefined) {
            //     trackUpdateNowPlaying({
            //       artist: this.currentTrack.ar[0].name,
            //       track: this.currentTrack.name,
            //       album: this.currentTrack.al.name,
            //       trackNumber: this.currentTrack.no,
            //       duration: ~~(this.currentTrack.dt / 1000),
            //     });
            //   }
        });
    }
    _setPlaying(isPlaying) {
        this._playing = isPlaying;
        // if (isCreateTray) { // 设置托盘相关
        //   ipcRenderer.send('updateTrayPlayState', this._playing);
        // }
      }
    playOrPause() {
        if (this._howler ?.playing()) {
            this.pause();
        } else {
            this.play();
        }
    }
    pause() {
        this._howler?.fade(this.volume, 0, PLAY_PAUSE_FADE_DURATION);
    
        this._howler?.once('fade', () => {
          this._howler?.pause();
          this._setPlaying(false);
        //   this._pauseDiscordPresence(this._currentTrack);
        });
      }
    seek(time = null) {
        if (time !== null) {
            this._howler ?.seek(time);
            if (this._playing)
                this._playDiscordPresence(this._currentTrack, this.seek());
        }
        return this._howler === null ? 0 : this._howler.seek();
    }
    mute() {
        if (this.volume === 0) {
            this.volume = this._volumeBeforeMuted;
        } else {
            this._volumeBeforeMuted = this.volume;
            this.volume = 0;
        }
    }

    clearPlayNextList() {
        this._playNextList = [];
    }

}

export default Player
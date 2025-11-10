import { useEffect, useState } from "react";
import useSound from "use-sound";

import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";

export default function MusicPlayer() {
    //-------------------------------------------------------
    const [playlistItem, setPlaylistItem] = useState(0);
    const [song, setSong] = useState('./intro.mp3');
    const [songName, setSongName] = useState('Simpler Times');
    //-------------------------------------------------------

  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] : any = useState({
    min: "",
    sec: ""
  });
  const [currTime, setCurrTime] : any = useState({
    min: "",
    sec: ""
  });

  const [seconds, setSeconds] : any = useState();

  const [volume, setVolume] : any = useState(100);

  const onVolumeChanged = (value : any) =>{
    setVolume(value.target.value)
    sound.volume(volume / 100) ;
  }

  const [play, { pause, duration, sound}  ] : any = useSound(song);

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain
      });
    }
  }, [duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

 
    //-------------------------------------------------------
  const onPlaylistUpdate = (direction : number)=>{
      if (playlistItem + direction > 1 || playlistItem + direction < 0 ){
      return;
      }
      setIsPlaying(false);
      sound.stop();
      setPlaylistItem(prev=> prev + direction);
      
  }
  useEffect(()=>{
      switch (playlistItem) {
      case 0: setSong('/intro.mp3'); setSongName('Simpler Times'); break;
      case 1: setSong('/second.mp3'); setSongName('Faint Lights'); break;
      }
      
  }, [playlistItem])
  //-------------------------------------------------------

  return (
    <div className="component" >
      <h2 className={isPlaying ? 'play-status-on' : 'play-status-off'}>Now Playing</h2>
      <img className="musicCover" src="/title-back.jpg" height={'128px'} width={'128px'} alt="nomeaning"/>
      <div>
        <h3 className="title">{songName}</h3>
        <p className="subTitle">Adam</p>
      </div>
      <div>
        <div className="time">
          <p>
            {currTime.min.toString().length === 1 ? `0${currTime.min}` : currTime.min}:{currTime.sec.toString().length === 1 ? `0${currTime.sec}` : currTime.sec}
          </p>
          <p>
            {time.min.toString().length === 1 ? `0${time.min}` : time.min}:{time.sec.toString().length === 1 ? `0${time.sec}` : time.sec}
          </p>
        </div>
        {sound && <input
          type="range"
          min="0"
          max={duration / 1000}
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />}
      </div>
      <div className="volume-bar">
        <input type="range" min={0} max={100} value={volume} onChange={(value) => {onVolumeChanged(value)}} style={{background:'#ff2233'}}/>
      </div>
      <div>
        <button className="playButton" onClick={()=>{onPlaylistUpdate(-1)}}>
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton" onClick={()=>{onPlaylistUpdate(1)}}>
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}

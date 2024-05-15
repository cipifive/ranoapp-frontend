import './App.css'
import { Game } from './pages/Game/Game'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { Home } from './pages/Home/Home';
import { ISound } from './models/settings';
import { useSoundStore } from './Zustand/soundStore';
import ReactAudioPlayer from 'react-audio-player';
import game_music from './assets/game_music.mp3'
import { useEffect, useRef } from 'react';
import { NewGame } from './pages/NewGame/NewGame';
import { Players } from './pages/Players/Players';
import { PrimeReactProvider } from 'primereact/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContinueGame } from './pages/ContinueGame/ContinueGame';

function App() {

  const { music,sounds,changeSettings }:ISound = useSoundStore()

  console.log(music)

  const audioRef:any = useRef()
  
  const router = createBrowserRouter([
    {
      path: "/",
      element : <AppLayout Component={Home} />,
    },
    {
      path: "/new-game",
      element:<AppLayout Component={NewGame} />
    },
    {
      path: "/continue-game",
      element:<AppLayout Component={ContinueGame} />
    },
    {
      path: "/players",
      element:<AppLayout Component={Players} />
    },
    {
      path: "/game/:id",
      element:<AppLayout Component={Game} />
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    }

  ]);

  useEffect(() => {
    if(music === true) {
      changeSettings(music,sounds,audioRef)
      audioRef.current.audioEl.current.play();
    }
    
  },[music])


  return (
    <div className="flex flex-col h-full w-full">
       <PrimeReactProvider>
          <ReactAudioPlayer
            ref={audioRef}
            src={game_music}
            autoPlay={music}
            preload='auto'
            loop
            muted={!music}
          />
          
          {
            <RouterProvider  router={router} /> 
          }
       </PrimeReactProvider>
       <ToastContainer />
      </div>
    
  )
}

export default App

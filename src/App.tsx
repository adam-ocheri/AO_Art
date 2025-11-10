import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import Navbar from './components/primitives/Navbar/Navbar';
import FractalDistortionPlugin from './components/MainComponents/Programming/plugins/FractalDistortion/FractalDistortion';
import RealtimeComposerPlugin from './components/MainComponents/Programming/plugins/RealtimeComposer/RealtimeComposer';
import RealtimeComposerPluginDocs from './components/MainComponents/Programming/plugins/RealtimeComposer/RealtimeComposerDocs';

function App() {
  const location = useLocation();
  const [atHome, setAtHome] = useState(location.pathname === '/');

  useEffect(() => {
    setAtHome(location.pathname === '/');
  }, [location]);

  const [windowSize, updateWindowSize] = useState({
    window_x: window.innerWidth,
    window_y: window.innerHeight
  });

  const [SV_Visible, setSV_Visible] = useState(false);
  const [visibleSection, setVisibleSection] = useState('');

  useEffect(() => {
    const handleResize = (e: any) => {
      updateWindowSize({
        window_x: e.target.innerWidth,
        window_y: e.target.innerHeight
      });
      if (e.target.innerWidth > 500) {
        setSV_Visible(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleSmallNavigation() {
    setSV_Visible(!SV_Visible);
  }

  useEffect(() => {
    const handleScroll = () => {
      getVisibleSection(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getVisibleSection = (scrollPos: number) => {
    const sectionIds = ['home', 'about', 'programming', '3d', 'music', 'contact'];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (scrollPos + 2 >= top && scrollPos < bottom) {
        setVisibleSection(id);
        return;
      }
    }
    setVisibleSection('');
  };

  return (
    <>
      {atHome && (
        <Navbar
          windowSize={windowSize}
          SV_Visible={SV_Visible}
          setSV_Visible={setSV_Visible}
          handleSmallNavigation={handleSmallNavigation}
          visibleSection={visibleSection}
        />
      )}
      <Routes>
        <Route path='/' element={<Home visibleSection={visibleSection} windowSize={windowSize} />} />
        <Route path='/plugins/fractal-distortion' element={<FractalDistortionPlugin />} />
        <Route path='/plugins/realtime-composer' element={<RealtimeComposerPlugin />} />
        <Route path='/plugins/realtime-composer/docs' element={<RealtimeComposerPluginDocs />} />
        {/* <Route path='/test' element={<ArchCanvas hidden={false} building='' />} /> */}
        {/* <Route path='/test0' element={<Canvas3D targetSubScene='' renderStartCallback={(e) => { }} />} /> */}
      </Routes>
    </>
  );
}

export default App;

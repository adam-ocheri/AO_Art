import * as THREE from 'three'
import { useEffect, useState } from 'react'

// import { useFrame, ThreeElements, useThree, useLoader, events, createEvents } from '@react-three/fiber'
import { useFrame,  useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function  Mesh3D  ({ url, position = [0, 0, 0], rotation = [0,0,0], scale = [1, 1, 1], animated } : any) {
    const gltf : any = useLoader(GLTFLoader, url);
    const [modelReady, setModelReady] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
  
    //animInit
    
    // const animInit = new AnimationPlaybackEvent('LoadAnim1');
    // const animationEvent = new AnimationEvent('LoadAnim1');
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const clip : THREE.AnimationAction | any = animated ? mixer.clipAction(gltf.animations[0]) : null;
    if(animated){
      clip.play()
    }
  
    useEffect(() => {
      if(gltf){       
        setModelReady(true);
        console.log(gltf)
      }
      if (loaded)
      {

      }
    }, [loaded, gltf])
  
    useEffect(()=> {
      setIsMounted(true);
    }, [])
  
    useEffect(()=>{
      console.log('Model is Ready?', modelReady);
      if(modelReady && isMounted){
        setLoaded(true);
      }
    },[modelReady, isMounted])
  
    //Hook to animation thread - if mesh needs per frame update
    useFrame((state, delta) => {
      if(animated) mixer.update(delta);
    });
  
    const fired = (e : any) => {
      console.log(e);
    }

    //JSX
    return (
      <mesh position={position} rotation={rotation} scale={scale} castShadow={true} receiveShadow={true}>
        <primitive object={gltf.scene} />
      </mesh>
    );
  };
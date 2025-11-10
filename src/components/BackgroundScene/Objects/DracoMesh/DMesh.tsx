// import * as THREE from 'three'
import React, { Suspense, useEffect,  useState } from 'react'
// import { Stats, OrbitControls, Environment, useGLTF, useBounds, Bounds, Gltf, Box } from '@react-three/drei'
// import { Canvas, useFrame, ThreeElements, useThree, useLoader, events, createEvents, ObjectMap } from '@react-three/fiber'
import { useFrame,  useLoader, ObjectMap } from '@react-three/fiber'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


function Model ({ url, onLoad, position = [0, 0, 0], rotation = [0,0,0], scale = [1, 1, 1]} : any)  {
    const gltf : (GLTF & ObjectMap) | (GLTF & ObjectMap)[] | any = useLoader(GLTFLoader, url, (loader) => {
        const dracoLoader = new DRACOLoader();
        console.log('dracoLoader',dracoLoader);
        dracoLoader.setDecoderPath('/draco/');
        loader.setDRACOLoader(dracoLoader);
    });

    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(()=> {
      if(gltf && !isLoaded) {
        setIsLoaded(true);
      }
    }, [gltf])

    useEffect(()=> {
      if (isLoaded && onLoad){
        onLoad();
      }
    }, [isLoaded, onLoad])

    //Hook to animation thread - if mesh needs per frame update
    useFrame(({ clock }) => {
      //meshRef.current.rotation.y = clock.getElapsedTime() / 2;  //example
      
    });
  
    //JSX
    return (
      <mesh position={position} rotation={rotation} scale={scale} dispose={() => gltf.scene.remove()}>
        <primitive object={gltf.scene}/>
      </mesh> 
      
    );
  };

  function DMesh({ url, onLoad, position = [0, 0, 0], rotation = [0,0,0], scale = [1, 1, 1]} : any){
    return(
      <Suspense fallback={null}>
        <Model url={url} onLoad={onLoad} position={position} rotation={rotation} scale={scale} />
      </Suspense>
    )
  }
  


  export default DMesh;
// import * as THREE from 'three'
// import React, { ExoticComponent, MutableRefObject, useEffect, useRef, useState } from 'react'
// import { Stats, OrbitControls, Environment, useGLTF, useBounds, Bounds } from '@react-three/drei'

// import { Canvas, useFrame, ThreeElements, useThree, useLoader, events, createEvents } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { useEffect } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'

import { Canvas } from '@react-three/fiber'
import DMesh from '../Objects/DracoMesh/DMesh'

// document.addEventListener('requestAnimationFrame', (e) => {
//   console.log('My Event listener Fired!');
// })

// const eD = new THREE.EventDispatcher();
//   eD.addEventListener('requestAnimationFrame', (e)=> {
//     console.log('add event listener!', e)
// });
// let instancesLoaded = 0;


// function AutoCamera({speed, targetSubScene} : {speed : number, targetSubScene: string}){
//   const target1_Location = new THREE.Vector3(-21, 6, 20);
//   const target1_Rotation = new THREE.Vector3(0, -5, 0);

//   const target2_Location = new THREE.Vector3(0, 10.4, -11);
//   const target2_Rotation = new THREE.Vector3(-7.1, 0, 0);

//   const target3_Location = new THREE.Vector3(9, 0.4,20);
//   const target3_Rotation = new THREE.Vector3(0, 5, 0);

//   let shouldEnableOrbitControls = false;

//   const [targetLocation, setTargetLocation] = useState(new THREE.Vector3(0,0,0))
//   const [targetRotation, setTargetRotation] = useState(new THREE.Vector3(0,0,0))

//   useEffect(() => {
//     switch (targetSubScene) {
//       // case '': setTargetLocation(new THREE.Vector3(0,0,0)); setTargetRotation(new THREE.Vector3(0,0,0)); break;
//       // case 'programming': setTargetLocation(target1_Location); setTargetRotation(target1_Rotation); break;
//       // case '3d': setTargetLocation(target2_Location); setTargetRotation(target2_Rotation); break;
//       // case 'music': setTargetLocation(target3_Location); setTargetRotation(target3_Rotation); break;
//     }
//   }, [targetSubScene])
//   speed /= 100;

//   const {camera} = useThree();

//   function lerp(current : THREE.Vector3, target : THREE.Vector3){
//     let currentX : number = current.x;
//     let currentY : number = current.y;
//     let currentZ : number = current.z;
//     const targetX : number = target.x;
//     const targetY : number = target.y;
//     const targetZ : number = target.z;

//     const dist = (cur : number, tar : number) => {
//       if(cur > tar){
//         return cur - tar;
//       } else if (cur < tar){
//         return tar - cur;
//       }
//       else{
//         return 0;
//       }
//     }

//     const distX : number = dist(currentX, targetX);
//     const distY : number = dist(currentY, targetY);
//     const distZ : number = dist(currentZ, targetZ);

//     if(currentX > targetX){
//       currentX -= speed * distX;
//     } else if (currentX < targetX){
//       currentX += speed * distX;
//     }
//     if(currentY > targetY){
//       currentY -= speed * distY;
//     } else if (currentY < targetY){
//       currentY += speed * distY;
//     }
//     if(currentZ > targetZ){
//       currentZ -= speed * distZ;
//     } else if (currentZ < targetZ){
//       currentZ += speed * distZ;
//     }


//     return new THREE.Vector3(currentX, currentY, currentZ);
//   }

//   // useEffect(()=>{
//   //   //init camera position
//   //   camera.position.set(0,0,-30)
//   // },[])

//   useFrame((state, delta, frame) => {

    
//     const currentRotation = new THREE.Vector3(camera.rotation.x, camera.rotation.y, camera.rotation.z);
//     console.log(currentRotation)
//     const newLocation = lerp(camera.position, targetLocation);
//     const newRotation = lerp(currentRotation, targetRotation);

//     camera.position.set(newLocation.x, newLocation.y, newLocation.z);
//     camera.rotation.set(newRotation.x, newRotation.y, newRotation.z);
//   })

//   return <perspectiveCamera/>
// }

// const Model3D = ({ url, position = [0, 0, 0], rotation = [0,0,0], scale = [1, 1, 1], animated } : any) => {
//   const gltf : any = useLoader(GLTFLoader, url);
//   const [modelReady, setModelReady] = useState(false);
//   const [loaded, setLoaded] = useState(false);
//   let isLoaded = false;
//   const [isMounted, setIsMounted] = useState(false);

//   //animInit
  
//   const animInit = new AnimationPlaybackEvent('LoadAnim1');
//   const animationEvent = new AnimationEvent('LoadAnim1');
//   const mixer = new THREE.AnimationMixer(gltf.scene);
//   const clip : THREE.AnimationAction | any = animated ? mixer.clipAction(gltf.animations[0]) : null;
//   if(animated){
//     clip.play()
//   }

//   useEffect(() => {
//     //Specific Emission
//     // if(gltf?.materials?.MetalHeart?.emissiveIntensity){
//     //   gltf.materials.MetalHeart.emissive = {isEmissive: true, r: 0, g: 0.5, b: 1}
//     //   gltf.materials.MetalHeart.emissiveIntensity = 3;
//     // }
//     // if(gltf?.materials?.Guns?.emissiveIntensity){
//     //   gltf.materials.Guns.emissive = {isEmissive: true, r: 1, g: 0, b: 0}
//     //   gltf.materials.Guns.emissiveIntensity = 3;
//     // }
 
    
//     //Global Emission
//     if(gltf?.materials){
//       for (let mat in gltf.materials){
//         for(let shader in gltf.materials[mat]){
//           if(shader === 'emissiveIntensity'){
//             gltf.materials[mat][shader] = 3;
//           }
//         }
//       }
//       setModelReady(true);
//       // ++instancesLoaded;
//       // if(instancesLoaded === 3){
//       //   console.log('Should now be loaded.............')
//       // }
//       console.log(gltf)
//     }
//   }, [gltf])

//   useEffect(()=> {
//     setIsMounted(true);
//   }, [])

//   useEffect(()=>{
//     console.log('Model is Ready?', modelReady);
//     if(modelReady && loaded && isMounted){
//     }
//   },[modelReady, loaded, isMounted])

//   //Hook to animation thread - if mesh needs per frame update
//   useFrame((state, delta) => {
//     //meshRef.current.rotation.y = clock.getElapsedTime() / 2;  //example
//     // console.log('Clock', delta);
//     if(animated) mixer.update(delta);
//   });

//   const fired = (e : any) => {
//     console.log(e);
//   }
//   //JSX
//   return (
//     <mesh position={position} rotation={rotation} scale={scale} castShadow={true} receiveShadow={true}>
//       <primitive object={gltf.scene} />
//     </mesh>
//   );
// };


//https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr
//HDR_Free_City_Night_Lights_Ref.hdr
//carpentry_shop_02_1k.hdr
export default function GenericCanvas({hidden} : {hidden: boolean | undefined}) {
  
  // const tjs = useThree();
  
  useEffect(()=> {
    return () => {
      // tjs.gl.forceContextLoss();
    }
  }, [])
    return(
    <Canvas hidden={true} style={{background: 'black', width: '100%', height: '100%', position: 'absolute', zIndex: -1, display: 'flex', top: 0, left: 0}}>{/* style={{ width: '90%', height: '40vh', display: 'flex', margin: '3%'}} */}
      <Environment 
        files="./moonless_golf_1k_2_reverse.hdr" 
        background={true}
        blur={1.15}
        near={0}
        far={0}
      />
      
      <OrbitControls />
      <ambientLight intensity={3}/>
      <pointLight position={[100, 20, -50]} intensity={2} />
      <pointLight position={[0, 30, 30]} intensity={1} />
      {/* <AutoCamera speed={0.3} targetSubScene={''}/> */}
      {/* <mesh position={[0,-1,0]}>
        <boxGeometry args={[45,1,60]} />
        <meshLambertMaterial color={'#111116'}/>
      </mesh> */}
      {/* <Model3D url='/ao.glb' position={[0,-1.5,-2]} rotation={[0,-7.9,0]} scale={[0.7,0.7,0.7]} animated={true}/>
      <Model3D url='/loading.glb' position={[0,-1.5,-2]} rotation={[0,-8,0]} scale={[0.4,0.4,0.4]} animated={true}/> */}
      {/* <DMesh url='/floor_test.glb' position={[0,-2.78,1]} rotation={[0,0,0]} scale={[0.01,0.01,0.01]} /> */}
      <DMesh url='/robot_t.glb' position={[0,-4,2.5]} rotation={[0,0,0]} scale={[0.5,0.5,0.5]} />
      {/* <Model3D url='/loadrob.glb' position={[-70,-65,-90]} rotation={[0,8,0]} scale={[1,1,1]} animated={true}/> */}
      {/* <Model3D url='/loadrob.glb' position={[-0.75,-0.77,-1]} rotation={[0,8,0]} scale={[0.01,0.01,0.01]} animated={true}/> */}
    </Canvas>
  ) 
}

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { Environment } from '@react-three/drei'

import { Canvas, useFrame, ThreeElements, useThree, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import DMesh from '../Objects/DracoMesh/DMesh'

// document.addEventListener('requestAnimationFrame', (e) => {
//   console.log('My Event listener Fired!');
// })

// const eD = new THREE.EventDispatcher();
//   eD.addEventListener('requestAnimationFrame', (e)=> {
//     console.log('add event listener!', e)
// });
// let instancesLoaded = 0;

function Box(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function AutoCamera({speed, targetSubScene} : {speed : number, targetSubScene: string}){
  speed /= 100;

  const initZLocation = 150;
  const target1_Location = new THREE.Vector3(-21, 0, 20);
  const target1_Rotation = new THREE.Vector3(0, -5, 0);

  const target2_Location = new THREE.Vector3(0, 10.4, -11);
  const target2_Rotation = new THREE.Vector3(-7.1, 0, 0);

  const target3_Location = new THREE.Vector3(50, 0.4, -73);
  const target3_Rotation = new THREE.Vector3(-5.8, 0, -6.28);

  // const target3_Location = new THREE.Vector3(9.1, 0.1,19.9);
  // const target3_Rotation = new THREE.Vector3(-1.2, 4.6, 0);


  const [targetLocation, setTargetLocation] = useState(new THREE.Vector3(0,0,initZLocation))
  const [targetRotation, setTargetRotation] = useState(new THREE.Vector3(0,0,0))
  const [initialized, setInitialized] = useState(false);

  const {camera} = useThree();

  if(!initialized){
    camera.position.set(0,2.7, -13);
  }
  

  useEffect(()=>{
    if(!initialized){
      setInitialized(true);
    }
    console.log('Camera Location:', camera.position)
  },[camera])
  



  useEffect(() => {
    switch (targetSubScene) {
      case '': setTargetLocation(new THREE.Vector3(0,-200,initZLocation)); setTargetRotation(new THREE.Vector3(0,0,0)); break;
      case 'programming': setTargetLocation(target1_Location); setTargetRotation(target1_Rotation); break;
      case '3d': setTargetLocation(target2_Location); setTargetRotation(target2_Rotation); break;
      case 'music': setTargetLocation(target3_Location); setTargetRotation(target3_Rotation); break;
    }
  }, [targetSubScene])
  

  

  function lerp(current : THREE.Vector3, target : THREE.Vector3, delta : number){
    let currentX : number = current.x;
    let currentY : number = current.y;
    let currentZ : number = current.z;
    const targetX : number = target.x;
    const targetY : number = target.y;
    const targetZ : number = target.z;

    const dist = (cur : number, tar : number) => {
      if(cur > tar){
        return cur - tar;
      } else if (cur < tar){
        return tar - cur;
      }
      else{
        return 0;
      }
    }

    const distX : number = dist(currentX, targetX);
    const distY : number = dist(currentY, targetY);
    const distZ : number = dist(currentZ, targetZ);

    if(currentX > targetX){
      currentX -= speed * distX * delta;
    } else if (currentX < targetX){
      currentX += speed * distX * delta;
    }
    if(currentY > targetY){
      currentY -= speed * distY * delta;
    } else if (currentY < targetY){
      currentY += speed * distY * delta;
    }
    if(currentZ > targetZ){
      currentZ -= speed * distZ * delta;
    } else if (currentZ < targetZ){
      currentZ += speed * distZ * delta;
    }


    return new THREE.Vector3(currentX, currentY, currentZ);
  }
  const eulerOrder :THREE.EulerOrder = 'XYZ'
  useFrame((state, delta, frame) => {
    console.log(state, delta, frame)
    const currentRotation = new THREE.Euler(camera.rotation.x, camera.rotation.y, camera.rotation.z);
    const newRot = new THREE.Vector3(currentRotation.x, currentRotation.y, currentRotation.z);
    
    const newLocation = lerp(camera.position, targetLocation, delta);
    const newRotation = lerp(newRot, targetRotation, delta);

    camera.position.set(newLocation.x, newLocation.y, newLocation.z);
    camera.rotation.set(newRotation.x, newRotation.y, newRotation.z, eulerOrder);
  })

  return <perspectiveCamera/>
}

export type Asset = {
  url: string;
  position: number[] | any;
  rotation: number[] | any;
  scale: number[] | any;
  useDraco?: boolean;
}

const Model3D = ({ url, position = [0, 0, 0], rotation = [0,0,0], scale = [1, 1, 1] } : Asset) => {
  const gltf : any = useLoader(GLTFLoader, url);
  const [modelReady, setModelReady] = useState(false);
  // const loadManager : THREE.LoadingManager = THREE.DefaultLoadingManager;
  // const dMesh = new DRACOLoader(loadManager);
  // dMesh.load(url, (e)=> {
  //   console.log('DracoLoaded!!!', e)
  // })
  
  useEffect(() => {
    //Specific Emission
    // if(gltf?.materials?.MetalHeart?.emissiveIntensity){
    //   gltf.materials.MetalHeart.emissive = {isEmissive: true, r: 0, g: 0.5, b: 1}
    //   gltf.materials.MetalHeart.emissiveIntensity = 3;
    // }
    // if(gltf?.materials?.Guns?.emissiveIntensity){
    //   gltf.materials.Guns.emissive = {isEmissive: true, r: 1, g: 0, b: 0}
    //   gltf.materials.Guns.emissiveIntensity = 3;
    // }

    //Global Emission
    if(gltf?.materials){
      // for (let mat in gltf.materials){
      //   for(let shader in gltf.materials[mat]){
      //     if(shader === 'emissiveIntensity'){
      //       gltf.materials[mat][shader] = 3;
      //     }
      //   }
      // }
      setModelReady(true);
      console.log(gltf)
    }
  }, [gltf])

  //Hook to animation thread - if mesh needs per frame update
  // useFrame(({ clock }) => {
  //   //meshRef.current.rotation.y = clock.getElapsedTime() / 2;  //example
    
  // });

  //JSX
  return (
    <mesh position={position} rotation={rotation} scale={scale} frustumCulled={true}>
      <primitive object={gltf.scene} />
    </mesh>
  );
};


//https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr
//HDR_Free_City_Night_Lights_Ref.hdr
//carpentry_shop_02_1k.hdr
export default function Canvas3D({targetSubScene, renderStartCallback} : {targetSubScene : string, renderStartCallback?: (e : any) => void}) {

  // const three = useThree();
  const canvasRef : any = useRef();
  // Custom Loading Management-----Override DefaultLoadingManager---------------------------------------------------------------------------------------
  const loadManager : THREE.LoadingManager = THREE.DefaultLoadingManager;
  loadManager.onLoad = () => {
    renderStartCallback?.(loadManager);
  };
  loadManager.onProgress = ((url : any)=> {
    // console.log('Currently loading........', url)
  })
  loadManager.setURLModifier((url) => { 
    console.log('setURLModifier', url)
    return url;
  });
  // Custom Loading Management-----Override DefaultLoadingManager---------------------------------------------------------------------------------------  
  useEffect(()=> {
    console.log('loadManager', loadManager)
  }, [loadManager])

  return (
    <>
    {<Canvas ref={canvasRef} hidden={false} style={{ width: '100%', height: '100%', position: 'absolute', zIndex: -1, minHeight: '95vh'}}>
      <Environment 
        files="./HDR_Free_City_Night_Lights_Ref.hdr" 
        background={true}
        blur={0.5}
      />
      <ambientLight castShadow={true} intensity={0.3}/>
      {/* <pointLight position={[10, 10, 10]} /> */}
      <AutoCamera speed={5} targetSubScene={targetSubScene}/>
      {/* <Model3D url='/floor.glb' position={[0,-1.87, 0]} rotation={[0,0,0]} scale={[1,1,1]} /> */}
      {/*3d Assets */}
      <DMesh url='/3dCode_t.glb' position={[-20,-0.5,20]} rotation={[0,0,0]} scale={[1,1,1]} />
      <DMesh url='/robot_t.glb' position={[0,-0.53,-15]} rotation={[0,-1.55,0]} scale={[1,1,1]} />
      <DMesh url='/cello_t.glb' position={[50,-0.45,-75]} rotation={[0,-1.55,0]} scale={[1,1,1]}/>
      {/* <Model3D url='/cello.glb' position={[50,-0.45,-75]} rotation={[0,-1.55,0]} scale={[1,1,1]}/> */}
      {/* <axesHelper/> */}
      {/* <Cello_t props={{}}/> */}
    </Canvas>}
    
    </>
    
  )
}

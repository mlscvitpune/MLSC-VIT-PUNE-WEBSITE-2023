"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Loader,
  ScrollControls,
  MeshReflectorMaterial,
  Text,
  PositionalAudio,
} from "@react-three/drei";

import { CPUcase2 } from "../components-3d/CpuCase2";
import ScrollCamera from "./ScrollCamera";
import PlaySoundButton from "../components-3d/PlaySoundButton";
import {MLSCText} from "../components-3d/MLSCText";
import CustomLoader from "../components/CustomLoader";
import { ScrollDown } from "../components/UserDirections"

import { useMLSCStore } from "../store/MLSCStore";

function Home() {
  // For Responsiveness:
  // const widthChange = window.innerWidth/1300;
  // const [playBGM, setPlayBGM] = useState(false); // For the background music
  const playBGM = useMLSCStore((state) => state.playBGM);
  const setPlayBGM = useMLSCStore((state) => state.setPlayBGM);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const home_bg = "/audio/home-bgm.mp3";

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Canvas className="w-full h-full " shadows='basic'>
        {/* <OrbitControls /> */}
        <color attach="background" args={["black"]} />
        <fog attach="fog" args={["black", 10, 50]} />
        <ambientLight intensity={4} />

        <ScrollControls pages={3} damping={3}>
          <ScrollCamera />
        </ScrollControls>

        {/* <Environment preset="warehouse" background/> */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#010101" roughness={1} metalness={2} />
          {/* <MeshReflectorMaterial color="#010101" roughness={1} metalness={2} /> */}
        </mesh>

        {/* <mesh position={isMobile ? [0, 0.5, -11] : [0, 2.5, -1]} receiveShadow>
          // Handling the responsiveness
          <planeGeometry args={[10, 5]} />
          <meshStandardMaterial color="#010101" roughness={1} metalness={2} />
          {/* <MeshReflectorMaterial color="#010101" roughness={1} metalness={2} /> */}
        {/* </mesh> */} 

        {/* <Text
          scale={0.2}
          position={isMobile ? [0, 1.2, -10] : [0, 0.5, 0]} //Handling the responsiveness
          anchorY="middle"
          anchorX="center"
          castShadow
          characters="abcdefghijklmnopqrstuvwxyz,"
        >
          {"MICROSOFT LEARN STUDENT CLUB \n                       VIT, PUNE"}
        </Text> */}
        <MLSCText scale={0.25} position={isMobile ? [0, 1.3, -8.5] : [0, 0.62, 0]}  />

        <Suspense>
          <CPUcase2 position={[0, -0.5, 0]} />
        </Suspense>

        {playBGM ? (
          <Suspense>
            <group position={[0, -0.5, 0]}>
              <PositionalAudio position={[0, 0, 0]} autoplay loop url={home_bg} distance={5} />
            </group>
          </Suspense>
        ) : undefined}
      </Canvas>

      <PlaySoundButton setPlayBGM={setPlayBGM} playBGM={playBGM} />
      <CustomLoader  urlIndex={1} />
      <ScrollDown />
    </div>
  );
}

export default Home;

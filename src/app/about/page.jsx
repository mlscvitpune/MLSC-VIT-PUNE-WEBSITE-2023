"use client";

import { Canvas } from "@react-three/fiber";
import {
  Lightformer,
  Loader,
  MeshPortalMaterial,
  OrbitControls,
  Environment,
  PointMaterialImpl,
  PointerLockControls,
  KeyboardControls,
  PerspectiveCamera,
  PositionalAudio,
  DeviceOrientationControls,
} from "@react-three/drei";

import AboutScene from "./AboutScene";
import { AboutDoor } from "../path-to-about/AboutDoor";
import Effects from "../path-to-about/Effects";
import { Background } from "../path-to-about/Background";
import Fillers from "../path-to-about/Fillers";

import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useState, useRef, useEffect } from "react";
import MovingCamera from "./MovingCamera";

import { useMLSCStore } from "../store/MLSCStore";
import CustomLoader from "../components/CustomLoader";
import Sidebar from "../home/overlay-ui/Sidebar";
import PlaySoundButton from "../components-3d/PlaySoundButton";
import {
  MobileControls,
  MoveDevice,
  WASDMotion,
} from "../components/UserDirections";

export default function About() {
  const aboutYear = useMLSCStore((s) => s.aboutYear);
  const playBGM = useMLSCStore((s) => s.playBGM);
  const [isMobile, setIsMobile] = useState(false);
  const [touched, setTouched] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const positionsInAbout = useMLSCStore((s) => s.positionsInAbout);
  console.log("YEAR ", aboutYear);

  const backgroundColors = useRef({
    // colorB: "#61b0ed",
    colorB: "#001e4e",
    colorA: "#001e4e",
  });

  const positions = {
    projects: [-10, 3, -0.108],
    blogs: [10, 3, -0.108],
    gen: [0, 3, 18],
  };

  return (
    <div
      className="overflow-hidden h-screen w-screen"
    >
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          shadows="basic"
          dpr={[0.1, 10]}
          performance={{ current: 1, min: 0.1, max: 1, debounce: 200 }}
        >
          {/* <OrbitControls /> */}
          <color attach="background" args={["#000"]} />
          <PerspectiveCamera
            makeDefault
            near={0.1}
            far={1000}
            lookAt={[0, 0, 0]}
          />

          {/* <Environment preset="night" background /> */}
          {/* <AboutScene /> */}
          <Suspense>
            {isMobile ? <DeviceOrientationControls /> : <PointerLockControls />}
            <Physics>
              <MovingCamera
                position={positions[positionsInAbout]}
                touched={touched}
                isMobile={isMobile}
              />

              {/* {aboutYear !== "" ? ( */}

              <Suspense fallback={null}>
                <RigidBody colliders="trimesh" type="fixed">
                  <AboutScene />
                </RigidBody>
              </Suspense>

              {/*  */}

              {/* <AboutDoor rotation={[0, Math.PI/6+degToRad(5), 0]} scale={[0.2, 0.2, 0.2]} position={[-0.2, -2, 0.7]} /> */}
            </Physics>
          </Suspense>

          {/* <Background backgroundColors={backgroundColors} /> */}
          {/* <Fillers /> */}
          {/* <Effects /> */}
          {playBGM ? (
            <Suspense>
              <PositionalAudio
                position={[0, 0, 0]}
                autoplay
                loop
                url="/audio/about-bgm.mp3"
                distance={5}
              />
            </Suspense>
          ) : undefined}
        </Canvas>
      </KeyboardControls>
      <PlaySoundButton />
      <CustomLoader urlIndex={0} />
      {isMobile && (
        <MobileControls
          touched={touched}
          setTouched={setTouched}
        />
      )}
      {isMobile ? <MoveDevice /> : <WASDMotion />}
      <Sidebar />
    </div>
  );
}

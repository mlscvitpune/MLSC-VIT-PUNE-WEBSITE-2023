import { PerspectiveCamera } from "@react-three/drei";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Box } from "@react-three/drei";

import * as THREE from "three";

const ExploreCamera = ({ setShowAbout, setShowGetInvolved, setShowNavButtons }) => {
  const exploreCamera = useRef();
  const scroll = useScroll();

  const skipPoints = useMemo(
    () => [
      new THREE.Vector3(2.6, 0.7, 3), // 0 north
      new THREE.Vector3(2.6, 0.7, 2), // 1 north
      new THREE.Vector3(2.6, 0.7, 1), // 2 north
      new THREE.Vector3(2.6, 0.7, 0), // 3 north
      new THREE.Vector3(2.6, 0.7, -1), // 4 north
      new THREE.Vector3(1.5, 0.7, -1), // 5 west
      new THREE.Vector3(0.5, 0.7, -1.65), // 6 north-west
      new THREE.Vector3(-1, 0.7, -1.65), // 7 west
      new THREE.Vector3(-2, 0.7, -1.65), // 8 west
      new THREE.Vector3(-3, 0.7, -1.65), // 9 west
    ],
    []
  );

  // Handling responsiveness
  // const widthChange = window.innerWidth/1300;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window?.innerWidth < 768);
  }, []);

  useFrame((state, delta) => {
    const posIndex = Math.floor(scroll.offset * skipPoints.length);

    const target = new THREE.Vector3();
    const targetQuaternion = new THREE.Quaternion();

    if (posIndex === 4 || posIndex >= 6) {
      target.set(4, 0.7, -1);
    } else if (posIndex === 5) {
      target.set(-0.5, 0.7, 1.65);
    } else {
      target.set(2.6, 0.7, 3);
    }
    if (posIndex === 9) {
      target.set(-4, 0.7, -2.65);
    }

    targetQuaternion.setFromRotationMatrix(
      new THREE.Matrix4().lookAt(
        target,
        exploreCamera.current?.position,
        exploreCamera.current?.up
      )
    );

    if(posIndex === 5) {
        exploreCamera.current?.position.lerp(skipPoints[5], delta*2/3);
        scroll.damping = 10;
    }
    exploreCamera.current?.quaternion?.slerp(targetQuaternion, delta); // Adjust the 2nd parameter to control the speed of the transition
    // exploreCamera.current?.lookAt(state.pointer.x, state.pointer.y, 0);

    if (posIndex >= 0 && posIndex < 10)
      exploreCamera.current?.position.lerp(skipPoints[posIndex], delta*2/3);
    // exploreCamera.current.position.lerp(skipPoints[0], delta);
    // exploreCamera.current?.lookAt(new THREE.Vector3(2.6, 0.5, -3), true);

    if (posIndex == 5) {
      setShowAbout(true);
    } else if (posIndex == 7) {
      setShowGetInvolved(true);
    } else if(posIndex == 9) {
      setShowNavButtons(true);
    }
     else {
      setShowGetInvolved(false);
      setShowAbout(false);
      setShowNavButtons(false);
    }
  });

  useEffect(() => {
    console.log(`Scroll offset: ${scroll.offset}`);
  }, [scroll.offset]);

  return (
    <>
      <PerspectiveCamera
        ref={exploreCamera}
        position={[2.6, 0.7, 3]}
        makeDefault
        fov={isMobile ? 70 : 50}
        near={0.00048}
        far={100}
      />
      {/* <cameraHelper args={[exploreCamera.current]} /> */}
      {/* <Box material-color='red' ref={exploreCamera} args={[0.1, 0.1, 0.1]}  /> */}
    </>
  );
};

export default ExploreCamera;

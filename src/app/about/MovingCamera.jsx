import React, { useRef, useState } from "react";
import { PointerLockControls, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { Suspense } from "react";
import { degToRad, radToDeg } from "three/src/math/MathUtils";

import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d-compat";
// import TeleportAnim from "./TeleportAnim";

import { useMLSCStore } from "../store/MLSCStore";

const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const direction = new THREE.Vector3();
// const rotation = new THREE.Vector3();

function MovingCamera({ position, isMobile, touched}) {
  const controls = useRef();
  // console.log(controls);
  const [_, get] = useKeyboardControls();

  // const teleporting = useMLSCStore((s) => s.teleporting);
  // const setTeleporting = useMLSCStore((s) => s.setTeleporting);
  const [portalPos, setPortalPos] = useState([0, 0, 0]);
  const [showYearCard, setshowYearCard] = useState(false);

  const rapier = useRapier();

  const scene = useThree((state) => state.scene);

  useFrame((state, delta) => {
    const conCurr = controls.current;
    if (conCurr !== undefined) {
      const { forward, backward, left, right, jump } = get();

      const velocity = conCurr?.linvel();

      state.camera.position.set(
        conCurr?.translation().x,
        conCurr?.translation().y,
        conCurr?.translation().z
      );
      // console.log(controls);
      // console.log(velocity);

      if(isMobile){
        frontVector.set(0, 0, touched.down - touched.up);
        sideVector.set(touched.left - touched.right, 0, 0);
      }else{
        frontVector.set(0, 0, backward - forward);
        sideVector.set(left - right, 0, 0);
      }

      // console.log("FRONT VEC: ",frontVector);
      // console.log("SIDE VEC: ",sideVector);

      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(4)
        .applyEuler(state.camera.rotation);

      // console.log("direction", direction);

      controls.current?.setLinvel({
        x: direction.x,
        y: velocity.y,
        z: direction.z,
      });

      // const world = rapier?.world;
      // const ray = world.castRay(
      //   new RAPIER.Ray(controls?.current?.translation(), { x: 0, y: -10, z: 0 }),
      //   10, true
      // );

      // const ground = ray && ray.collider && Math.abs(ray.toi) <= .75;
      // console.log(ray.toi);
      if (jump)
        controls.current?.setLinvel({ x: direction.x, y: 5, z: direction.z });

    }
  });

  return (
    // <PerspectiveCamera position={[1, 4, 2]} ref={controls} />
    <group>
      <RigidBody
        type="dynamic"
        ref={controls}
        mass={5}
        position={position}
        restitution={0.3}
        colliders={false}
        enabledRotations={[false, false, false]}
        canSleep={false}
      >
        <CapsuleCollider args={[1.5, 0.75]} />
        {/* <axesHelper args={[50]} /> */}
      </RigidBody>
    </group>
  );
}

export default MovingCamera;

/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { SelectedBodyPartContext } from "../SelectedBodyPartContext";

const CenteredModel = ({ object, objectRef, position, rotation, scale }) => {
  const groupRef = useRef();

  useEffect(() => {
    if (object && groupRef.current) {
      const box = new Box3().setFromObject(object);
      const center = new Vector3();
      box.getCenter(center);

      object.position.sub(center);
      object.position.add(new Vector3(...position));
    }
  }, [object, position]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive
        object={object}
        ref={objectRef}
        position={position}
        rotation={rotation}
        scale={scale}
      />
    </group>
  );
};

const BoneNameArray = {
  Object_4: "Ribs",
  Object_5: "Spinal Column",
  Object_6: "Scapula",
  Object_7: "Tibia, Phalanges",
  Object_8: "Tarsals, Metatarsals, Phalanges",
  Object_9: "Humerus",
  Object_11: "Skull",
  Object_12: "Pelvic Girdle",
  Object_13: "Femur",
  Object_16: "Manubrium, Sternum",
  Object_17: "Carpals, Metacarpals, Phalanges",
  Object_18: "Ulna, Radius",
  Object_19: "Clavicle",
  Object_20: "Patella",
  Object_21: "Fibula",
};

const BodyPartRender = ({ objectData }) => {
  const objectRef = useRef();
  const controlsRef = useRef();
  const cameraRef = useRef();

  const handleReset = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }

    // if (cameraRef.current) {
    //     cameraRef.current.position.set(0, 0, 0); // Reset camera position
    //     cameraRef.current.rotation.set(45, 45, 45); // Reset camera rotation
    //     cameraRef.current.updateProjectionMatrix();
    //   }
  }, []);

  const { setSelectedBodyPart } = useContext(SelectedBodyPartContext);

  const setClear = () => {
    setSelectedBodyPart(null);
  };

  useEffect(() => {
    // Reset zoom and rotation whenever a new object is loaded
    handleReset();
  }, [objectData, handleReset]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
  {/* Canvas Container */}
  <div style={{ width: "100%", height: "100%", zIndex: 1 }}>
    <Canvas>
      <perspectiveCamera ref={cameraRef} position={[10, 10, 10]} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <hemisphereLight skyColor={0xeeeeff} groundColor={0x111122} intensity={4} />

      <CenteredModel
        object={objectData}
        ref={objectRef}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[5, 5, 5]}
      />

      <OrbitControls enableZoom={true} enableRotate={true} ref={controlsRef} />
    </Canvas>
  </div>

  {/* Text and Button Container */}
  <div
    className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4"
    
  >
    {/* Text Information */}
    <div className="flex-grow">
      <h2 className="text-base md:text-lg lg:text-xl font-semibold text-indigo-500">
        Anatomical Focus: {BoneNameArray[objectData.name]}
      </h2>
    </div>

    {/* Buttons */}
    <div className="flex flex-col md:flex-row gap-2">
      <button
        onClick={handleReset}
        className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
      >
        Reset View
      </button>
      <button
        onClick={setClear}
        className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
      >
        Clear
      </button>
    </div>
  </div>
</div>

  );
};

export default BodyPartRender;

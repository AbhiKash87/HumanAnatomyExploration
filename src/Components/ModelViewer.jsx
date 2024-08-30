/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useCallback, useContext, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Raycaster, Vector2, Vector3 } from "three";
import { useState } from "react";
import { SelectedBodyPartContext } from "../SelectedBodyPartContext";

const Model = ({ url, scale, position, rotation,resetTrigger }) => {
  const modelRef = useRef(); // Reference to the loaded model
  const { scene } = useLoader(GLTFLoader, url); // Load the model
  const [hoveredObject, setHoveredObject] = useState(null); // State to track hovered object
  const raycaster = useRef(new Raycaster()); // Initialize Raycaster
  const { setRemovable, removable } = useContext(SelectedBodyPartContext);

  useFrame(({ mouse, camera }) => {
    if (modelRef.current) {
      modelRef.current.rotation.x = 0; // Fix X-axis rotation
      modelRef.current.rotation.y += 0.0005; // Rotate around Y-axis

      raycaster.current.setFromCamera(new Vector2(mouse.x, mouse.y), camera);

      // Check for intersections between raycaster and model
      const intersects = raycaster.current.intersectObject(
        modelRef.current,
        true
      );

      if (intersects.length > 0) {
        setHoveredObject(intersects[0].object); // Set the hovered object
      } else {
        setHoveredObject(null);
      }
    }
  });

  const { setSelectedBodyPart } = useContext(SelectedBodyPartContext);

  const handleObjectClick = () => {
    if (hoveredObject) {
      const clonedObject = hoveredObject.clone();
      console.log("Clicked on:", clonedObject); // Handle click

      if (removable) {
        setSelectedBodyPart(hoveredObject);
      } else {
        setSelectedBodyPart(clonedObject);
      }

      // Focus camera on clicked object
      // let targetPosition = new Vector3();
      // hoveredObject.getWorldPosition(targetPosition); // Get the world position of the object

      // // Calculate the new camera position to focus on the selected part

      // const newCameraPosition = targetPosition
      //   .clone()
      //   .add(new Vector3(0, 2, 5)); // Adjust based on your preference

      // cameraRef.current.position.lerp(newCameraPosition, 0.1); // Smoothly move camera

      // camera.position.lerp(newCameraPosition, 0.1);

      // console.log(targetPosition);
      // targetPosition = {
      //   x: 0.7023877711839429,
      //   y: -0.7297466278076175,
      //   z: 5.522857689009549,
      // };
      // // // // Optionally, you can adjust the camera's lookAt to directly face the object
      // camera.lookAt(targetPosition);
    }
  };

  return (
    <primitive
      object={scene}
      ref={modelRef}
      scale={scale}
      position={position}
      rotation={rotation}
      onClick={handleObjectClick}
      key={resetTrigger}
    />
  );
};

const ModelViewer = ({ modelUrl }) => {
  const cameraRef = useRef();
  const controlsRef = useRef();
  const { setRemovable, removable } = useContext(SelectedBodyPartContext);
  const [resetTrigger, setResetTrigger] = useState(0);
  const { setSelectedBodyPart } = useContext(SelectedBodyPartContext);


  const handleReset = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    // setSelectedBodyPart(null);
    // setResetTrigger(prev => prev + 1);

  }, []);

  const setRemovableHandle = () => {
    setRemovable(!removable);
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
    {/* Canvas Container */}
    <Canvas camera={{ position: [0, 2, 5], ref: cameraRef }} style={{ zIndex: 1 }}>
      <OrbitControls ref={controlsRef} />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 6, 0]} intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={1} />
      <pointLight position={[0, 2, 0]} intensity={1} />
      <pointLight position={[0, -2, 0]} intensity={1} />
      <pointLight position={[2, -2, 0]} intensity={1} />
      <hemisphereLight skyColor={0xeeeeff} groundColor={0x111122} intensity={4} />
      <spotLight
        position={[-5, 0, 10]}
        angle={0.5}
        penumbra={0.1}
        intensity={1}
        distance={100}
        castShadow
      />
      <Model
        url={modelUrl}
        objectName={"Object_5"}
        scale={[0.8, 0.8, 0.8]}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        cameraRef={cameraRef}
        resetTrigger={resetTrigger}
      />
    </Canvas>
  
    {/* Buttons Container */}
    <div
      className="absolute bottom-0 left-0 right-0 z-50 flex justify-start md:justify-start items-center p-4"
    >
      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
        >
          Reset View
        </button>
        <button
          onClick={setRemovableHandle}
          className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
        >
          {removable ? "Make Non-Removable" : "Make Removable"}
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default ModelViewer;

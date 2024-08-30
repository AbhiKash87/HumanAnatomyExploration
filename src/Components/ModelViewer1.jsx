// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// /* eslint-disable react/no-unknown-property */
// import React, { useRef, useState } from "react";
// import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { Raycaster, Vector2, Vector3 } from "three";
// import { useDispatch } from "react-redux";
// import { setBodyPart } from "../redux/BodySlice";

// const Model = ({ url, scale, position, rotation }) => {
//   const modelRef = useRef(); // Reference to the loaded model
//   const { scene } = useLoader(GLTFLoader, url); // Load the model
//   const [hoveredObject, setHoveredObject] = useState(null); // State to track hovered object
//   const raycaster = useRef(new Raycaster()); // Initialize Raycaster
//   const dispatch = useDispatch();
//   const { camera } = useThree(); // Access the camera directly using useThree

//   useFrame(({ mouse }) => {
//     if (modelRef.current) {
//       modelRef.current.rotation.x = 0; // Fix X-axis rotation
//       modelRef.current.rotation.y += 0.0005; // Rotate around Y-axis

//       raycaster.current.setFromCamera(new Vector2(mouse.x, mouse.y), camera);

//       // Check for intersections between raycaster and model
//       const intersects = raycaster.current.intersectObject(
//         modelRef.current,
//         true
//       );

//       if (intersects.length > 0) {
//         setHoveredObject(intersects[0].object); // Set the hovered object
//       } else {
//         setHoveredObject(null);
//       }
//     }
//   });

//   const handleObjectClick = () => {
//     if (hoveredObject) {
//       console.log("Clicked on:", hoveredObject.name); // Handle click
//       dispatch(setBodyPart(hoveredObject.name));

//       // Focus camera on clicked object
//       const targetPosition = new Vector3();
//       hoveredObject.getWorldPosition(targetPosition); // Get the world position of the object

//       // Calculate the new camera position to focus on the selected part
//       const newCameraPosition = targetPosition.clone().add(new Vector3(0, 2, 5)); // Adjust based on your preference
//       camera.position.lerp(newCameraPosition, 0.1); // Smoothly move camera

//       // Optionally, you can adjust the camera's lookAt to directly face the object
//       camera.lookAt(targetPosition);
//     }
//   };

//   return (
//     <primitive
//       object={scene}
//       ref={modelRef}
//       scale={scale}
//       position={position}
//       rotation={rotation}
//       onClick={handleObjectClick}
//     />
//   );
// };

// const ModelViewer = ({ modelUrl }) => {
//   return (
//     <>
//       <Canvas camera={{ position: [0, 2, 5] }}>
//         <OrbitControls />
//         <ambientLight intensity={0.1} />
//         <pointLight position={[0, 6, 0]} intensity={1} />
//         <Model
//           url={modelUrl}
//           scale={[0.8, 0.8, 0.8]}
//           position={[0, 0, 0]}
//           rotation={[0, 0, 0]}
//         />
//       </Canvas>
//     </>
//   );
// };

// export default ModelViewer;

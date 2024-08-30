/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
      // Step 1: Create a scene
      const scene = new THREE.Scene();
  
      // Step 2: Create a camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
  
      // Step 3: Create a renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
  
      // Step 4: Add a simple geometry (e.g., a cube)
      const geometry = new THREE.BoxGeometry();

      // Create an array of materials, one for each face
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Right face - Red
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Left face - Green
        new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Top face - Blue
        new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Bottom face - Yellow
        new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Front face - Magenta
        new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Back face - Cyan
      ];
      
      // Create the mesh with the geometry and the array of materials
      const cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);
  
      // Step 5: Create an animation loop
      const animate = () => {
        requestAnimationFrame(animate);
  
        // Rotate the cube for some basic animation
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
  
        // Render the scene
        renderer.render(scene, camera);
      };
  
      animate();
  
      // Cleanup on unmount
      return () => {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      };
    }, []);
  
    return <div ref={mountRef} />;
  
}

export default ThreeScene
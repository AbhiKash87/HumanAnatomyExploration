/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Skelton = () => {
    const mountRef = useRef(null);

    useEffect(() => {
      // Scene, Camera, Renderer setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 10;
  
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
  
      // Create a material for the face
    const faceMaterial = new THREE.MeshBasicMaterial({ color: 0xffe0bd });

    // Create the head (a simple sphere)
    const headGeometry = new THREE.SphereGeometry(2, 32, 32);
    const headMesh = new THREE.Mesh(headGeometry, faceMaterial);
    scene.add(headMesh);

    // Create the eyes (small spheres)
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eyeGeometry = new THREE.SphereGeometry(0.2, 32, 32);

    const leftEyeMesh = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEyeMesh.position.set(-0.7, 0.6, 1.8);
    scene.add(leftEyeMesh);

    const rightEyeMesh = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEyeMesh.position.set(0.7, 0.6, 1.8);
    scene.add(rightEyeMesh);

    // Create the nose (a simple cone)
    const noseGeometry = new THREE.ConeGeometry(0.2, 1, 32);
    const noseMaterial = new THREE.MeshBasicMaterial({ color: 0xffc0a1 });
    const noseMesh = new THREE.Mesh(noseGeometry, noseMaterial);
    noseMesh.position.set(0, 0.3, 2.1);
    noseMesh.rotation.x = Math.PI / 2;
    scene.add(noseMesh);

    // Create the mouth (a simple cylinder)
    const mouthGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
    const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mouthMesh = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouthMesh.position.set(0, -0.5, 1.9);
    mouthMesh.rotation.x = Math.PI / 2;
    scene.add(mouthMesh);

    // Create ears (two spheres)
    const earGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const leftEarMesh = new THREE.Mesh(earGeometry, faceMaterial);
    leftEarMesh.position.set(-2, 0.5, 0);
    scene.add(leftEarMesh);

    const rightEarMesh = new THREE.Mesh(earGeometry, faceMaterial);
    rightEarMesh.position.set(2, 0.5, 0);
    scene.add(rightEarMesh);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the head to show a 3D view
      headMesh.rotation.y += 0.01;
      leftEyeMesh.rotation.y += 0.01;
      rightEyeMesh.rotation.y += 0.01;
      noseMesh.rotation.y += 0.01;
      mouthMesh.rotation.y += 0.01;
      leftEarMesh.rotation.y += 0.01;
      rightEarMesh.rotation.y += 0.01;

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
};
  


export default Skelton
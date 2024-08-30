/* eslint-disable react/prop-types */
import * as THREE from "three";
import { useEffect, useRef } from "react";

const ObjectRenderer = ({ objectData }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    mountRef.current.appendChild(renderer.domElement);

    objectData.position.set(0, 0, 0);
    objectData.scale.set(1, 1, 1);

    const light = new THREE.AmbientLight(0xffffff, 5); // White light
    scene.add(light);
    scene.background = new THREE.Color(0x383856);
    scene.add(objectData);

    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, 5);

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [objectData]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        ref={mountRef}
        style={{ width: "100%", height: "100%" }}
        className="border-red-600 border-2"
      />
    </div>
  );
};

export default ObjectRenderer;

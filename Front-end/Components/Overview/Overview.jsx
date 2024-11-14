import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const Overview = () => {
  // Declare variables for scene, camera, renderer, controls, and clock at the top of the component
  const clock = new THREE.Clock();
  let delta = 0;
  const interval = 1 / 60; // 60fps
  let scene, camera, renderer, orbital_controls;

  // The animate function
  const animate = () => {
    requestAnimationFrame(animate);
    orbital_controls.update(); // Update the controls for damping
    delta += clock.getDelta();

    if (delta > interval) {
      render(); // Render the scene
      delta = delta % interval;
    }
  };

  // The render function
  const render = () => {
    renderer.render(scene, camera);
  };

  useEffect(() => {
    // Initialize the scene, camera, and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-6.9, 3.5, 0.5);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Set up the orbital controls for the camera
    orbital_controls = new OrbitControls(camera, renderer.domElement);

    // Set up textures and floor
    const floorGeometry = new THREE.PlaneGeometry(300, 300);
    const floorTexture = new THREE.TextureLoader().load("/static/images/greek_mosaic.jpg");
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    scene.add(floorMesh);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const spotlight = new THREE.SpotLight(0xffffff, 3);
    spotlight.position.set(0, 5, 10);
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 512;
    spotlight.shadow.mapSize.height = 512;
    scene.add(spotlight);

    // Set background texture
    const spaceTexture = new THREE.TextureLoader().load("/static/images/greek_skies.jpg");
    scene.background = spaceTexture;

    // Load the 3D model with texture
    const mosaicTexture = new THREE.TextureLoader().load("/static/images/tiles.jpg");
    const loader = new GLTFLoader();
    const dracoloader = new DRACOLoader();
    dracoloader.setDecoderPath("/draco/"); // Set path for Draco decoder
    loader.setDRACOLoader(dracoloader);
    loader.load(
      "/static/Greek_Mausoleum_3_compressed.glb",  // Path to your 3D model
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            child.material.map = mosaicTexture;
            child.material.needsUpdate = true;
          }
        });
        model.scale.set(0.05, 0.05, 0.05);
        model.position.set(0, -0.2, 0);
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the model:", error);
      }
    );

    // Start the animation loop
    animate();

    // Resize handling for responsive design
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Clean up resources when component unmounts
    return () => {
      document.body.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (object.material.isMaterial) {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return null; // This component handles its own rendering, so no need to return JSX
};

export default Overview;
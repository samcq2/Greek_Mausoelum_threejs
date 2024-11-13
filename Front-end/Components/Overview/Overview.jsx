import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Overview = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-6.9, 3.5, 0.5);

    // Set up renderer with max pixel ratio and size
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Cache textures for reuse
    THREE.Cache.enabled = true;

    // Floor setup
    const floorGeometry = new THREE.PlaneGeometry(300, 300);
    const floorTexture = new THREE.TextureLoader().load('../../static/images/greek_mosaic.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    scene.add(floorMesh);

    // Lighting setup with lower shadow quality
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const spotlight = new THREE.SpotLight(0xffffff, 3);
    spotlight.position.set(0, 5, 10);
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 512;
    spotlight.shadow.mapSize.height = 512;
    scene.add(spotlight);

    // Camera controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Background texture
    const spaceTexture = new THREE.TextureLoader().load('../../static/images/greek_skies.jpg');
    scene.background = spaceTexture;

    // Load model with texture
    const mosaicTexture = new THREE.TextureLoader().load('../../static/images/tiles.jpg');
    const loader = new GLTFLoader();
    loader.load('/Greek_Mausoleum_3.glb', (gltf) => {
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
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();

      // Prevent camera from going below the floor level
      const floorLevel = 0.1;
      if (camera.position.y < floorLevel) {
        camera.position.y = floorLevel;
      }

      // Render the scene
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    // Resize handling
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Clean up resources on unmount
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
  }, []);

  return null; // This component handles its own rendering
};

export default Overview;
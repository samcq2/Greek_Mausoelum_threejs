import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Overview = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-6.9, 3.5, 0.5);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const floorGeometry = new THREE.PlaneGeometry(300, 300);
    const floorTexture = new THREE.TextureLoader().load('../../Pictures/greek_mosaic.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    scene.add(floorMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const spotlight = new THREE.SpotLight(0xffffff, 3);
    spotlight.position.set(0, 5, 10);
    spotlight.castShadow = true;
    scene.add(spotlight);

    const controls = new OrbitControls(camera, renderer.domElement);

    const mosaicTexture = new THREE.TextureLoader().load('../../Pictures/tiles.jpg');
    const loader = new GLTFLoader();
    loader.load('/Greek_Mausoleum_2.glb', (gltf) => {
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

    const spaceTexture = new THREE.TextureLoader().load('../../Pictures/greek_skies.jpg');
    scene.background = spaceTexture;

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 2,
        roughness: 0.1,
        metalness: 0.5,
      });
      const star = new THREE.Mesh(geometry, material);
      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
    }
    Array(600).fill().forEach(addStar);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      const floorLevel = 0.1;
      if (camera.position.y < floorLevel) {
        camera.position.y = floorLevel;
      }
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
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
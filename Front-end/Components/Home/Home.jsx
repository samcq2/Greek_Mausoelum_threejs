import React, { useEffect, useState } from "react";
import "./Home.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { NavLink } from "react-router-dom";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const Home = () => {
  const [showLink, setShowLink] = useState(false);
  const clock = new THREE.Clock();
  let delta = 0;
  const interval = 1 / 60; // 60fps

  let scene, camera, renderer, orbital_controls;

  // The animate function
  const animate = () => {
    requestAnimationFrame(animate);
    if (orbital_controls) orbital_controls.update(); // Update the controls for damping
    delta += clock.getDelta();

    if (delta > interval) {
      render(); // Render the scene
      delta = delta % interval;
    }

    const floorLevel = 0.4;
    if (camera.position.y < floorLevel) {
        camera.position.y = floorLevel;
    }
  };

  // The render function
  const render = () => {
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  };

  useEffect(() => {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-4, 2, 1);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const floorGeometry = new THREE.PlaneGeometry(300, 300);
    const loaderText = new THREE.TextureLoader();
    const floorTexture = loaderText.load("../../static/images/greek_mosaic.jpg");
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
    orbital_controls = controls;

    const mosaicTexture = new THREE.TextureLoader().load("../../static/images/tiles.jpg");

    const loader = new GLTFLoader();
    const dracoloader = new DRACOLoader();
    dracoloader.setDecoderPath('/draco/');  // Path to Draco decoder files
    loader.setDRACOLoader(dracoloader);

    loader.load("/static/Greek_Mausoleum_compressed.glb", function (gltf) {
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

      const startPosition = new THREE.Vector3(-6.9, 3.5, 0.5); 
      camera.position.copy(startPosition);

      const targetPosition = new THREE.Vector3(-2.2, 0.8, 0);

      camera.lookAt(model.position);

      const zoomDuration = 2000; // Duration in milliseconds
      const startTime = performance.now();

      function animateZoom() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / zoomDuration, 1);
        camera.position.lerpVectors(startPosition, targetPosition, progress);
        camera.lookAt(model.position); // Keep looking at the model's position

        if (progress < 1) {
          requestAnimationFrame(animateZoom);
        } else {
          setShowLink(true);
        }
      }

      animateZoom();
    });

    const spaceTexture = new THREE.TextureLoader().load("../../static/images/greek_skies.jpg");
    scene.background = spaceTexture;

    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Cleanup function
    return () => {
      document.body.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.MeshStandardMaterial) {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []); // Empty dependency array to run this effect once on mount

  return (
    <>
      {showLink && (
        <div>
          <div className="About-container">
            <nav>
              <NavLink exact to="/about" className="about-link">
                About me
              </NavLink>
            </nav>
          </div>

          <div className="tech-container">
            <nav>
              <NavLink exact to="/projects" className="tech-link">
                Technical Projects
              </NavLink>
            </nav>
          </div>

          <div className="contact-container">
            <nav>
              <NavLink exact to="/contact" className="contact-link">
                Contact me
              </NavLink>
            </nav>
          </div>  
        </div>
      )}
    </>
  );
};

export default Home;
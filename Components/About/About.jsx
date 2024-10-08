import React, { useEffect, useState } from "react";
import "./About.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const About = () => {
    useEffect(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 3, 5);
  
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
      loader.load('/Mausoeum_inside.glb', (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            child.material.map = mosaicTexture;
            child.material.needsUpdate = true;
          }
        });
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, 0.2, 0);
        scene.add(model);
      });
  
      const spaceTexture = new THREE.TextureLoader().load('../../Pictures/greek_skies.jpg');
      scene.background = spaceTexture;
  
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

    return (
        <div className="Desc-container">
          <div id="name">

            Samuel Clarke-Quy

          </div>
          <div id='welcome'>
            Welcome to my portfolio website developed using React and ThreeJS!
          </div>
          <div id='education-and-employment-intro'>
            My name is Samuel Clarke-Quy a Physics with Particle Physics student.
            I am currently employed by Ten10 as a Trainee Junior Technical Consultant.
          </div>

          <div id='education1'>

            At Queen Mary University of London I graduated with a bachelors of science
            in Physics with Particle Physcis (BSc Physics with Particle Physics).

          </div>

          <div id='education7'>
            
            Physics as a degree is always something I have been passionate about from 
            the world of Quantum Mechanics with applications in Quantum computing for the next
            step in cumputing power to the use of data science techniques in Particle Physics.

          </div>

          <div id='education8'>
            
            By pursuing a specialisation in Particle Physics I was able to learn and apply many 
            concepts in data science in assignments and projects including my dissertation.

          </div>

          <div id='education2'>

            This included learning Python using Pandas to interact with and clean dataframes, as well as using libraries
            to visualise and analyse segments of the dataframes using libraries such as MatPlotLib and
            SeaBorn. Additionally at my time at univeristy I was able to learn and use R Language to 
            visualise and interact with data frames.

          </div>

          <div id='education3'>

            Another step in my up-skilling in data science at university was the use machine learning techniques
            such Decision Trees, Logistic Regression, Naives Bayes machine learning models to analyse and produce 
            hypothesis from data analysis performed on various dataframes.

          </div>

          <div id='education4'>

            Some additional analytical techniques I developed at university included
            Principal Component Analysis, cross-validation and Time Series Analysis.

          </div>

          <div id='education5'>
            
            My disseration topic was on Using Machine Learning Techniques to classify and search for products of
            Neutrinos at DUNE.

          </div>

          <div id='education6'>
            Another project at University was performing data analysis on Mexico City sensors for air pollutants and 
            levels of traffic intensity in different areas to find correlations between the two.
          </div>



        </div>
      );
    };

    
  
  export default About;
import React, { useEffect, useState } from "react";
import "./About.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const About = () => {

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [activeButton2, setActiveButton2] = useState(null);
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const toggleArrow = document.getElementById("arrow");
    const toggleArrow2 = document.getElementById("arrow2");

  const clock = new THREE.Clock();
  let delta = 0;
  const interval = 1 / 60; // 60fps

  // The animate function
  const animate = () => {
    requestAnimationFrame(animate);
    if (orbital_controls) orbital_controls.update(); // Update the controls for damping
    delta += clock.getDelta();

    if (delta > interval) {
      render(); // Render the scene
      delta = delta % interval;
    }

    const floorLevel = 0.6;
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

  let scene, camera, renderer, orbital_controls;

    useEffect(() => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 3, 5);
  
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      THREE.Cache.enabled = true;
  
      const floorGeometry = new THREE.PlaneGeometry(300, 300);
      const floorTexture = new THREE.TextureLoader().load('../../static/images/greek_mosaic.jpg');
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
      spotlight.shadow.mapSize.width = 512;
      spotlight.shadow.mapSize.height = 512;
      scene.add(spotlight);
  
      const controls = new OrbitControls(camera, renderer.domElement);
      orbital_controls = controls;
  
      const mosaicTexture = new THREE.TextureLoader().load('../../static/images/tiles.jpg');
      const loader = new GLTFLoader();
      const dracoloader = new DRACOLoader();
      dracoloader.setDecoderPath('/draco/');  // Path to Draco decoder files
      loader.setDRACOLoader(dracoloader);

      loader.load('static/Mausoleum_inside_compressed.glb', (gltf) => {
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
  
      const spaceTexture = new THREE.TextureLoader().load('../../static/images/greek_skies.jpg');
      scene.background = spaceTexture;
  
      animate();
  
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

    const toggleDropdown = () => {
        toggleArrow.classList.toggle("arrow");
        setIsOpen1(!isOpen1);
        setActiveButton(activeButton === 'education' ? null : 'education');
      };
    
    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
        setActiveButton2(activeButton2 === 'employment' ? null : 'employment');
        toggleArrow2.classList.toggle("arrow2");
      };



      return (
        <div className="desc-container">
            
            <div id="name">
                Samuel Clarke-Quy
            </div>
            <div id='welcome'>
                Welcome to my portfolio website developed using React and ThreeJS!
            </div>
            <div id='education-and-employment-intro'>
                My name is Samuel Clarke-Quy a Physics with Particle Physics graduate.
                I am currently employed by Ten10 as a Trainee Junior Technical Consultant.
            </div>

            <div className="button-container">

                <button className="dropdown1" onClick={toggleDropdown}
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}

                style={{
                    backgroundColor: activeButton === 'education' ? '#e7bd42' : isHovered1 ? '#e7bd42' : 'transparent',
                    color: activeButton === 'education' ? '#336cce' : isHovered1 ? '#336cce' : '#f2e7bf',                  
                  }}>
                    {isOpen1 ? "Education" : "Education"}
                    <i class="bx bx-chevron-down" id="arrow"></i>
                </button>

                <div class="divider">

                </div>

                <button className="dropdown2" onClick={toggleDropdown2}
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setIsHovered2(false)}
                style={{
                    backgroundColor: activeButton2 === 'employment' ? '#e7bd42' : isHovered2 ? '#e7bd42' : 'transparent',
                    color: activeButton2 === 'employment' ? '#336cce' : isHovered2 ? '#336cce' : '#f2e7bf',  
                    
                  }}>
                    {isOpen2 ? "Employment": "Employment"}
                    <i2 class="bx bx-chevron-down" id="arrow2"></i2>
                </button>

            </div>
          
          {isOpen1 && (
            <div className="button1-container">
              <div id='education-title'>
                Education
              </div>
    
              <div id='education1'>
                At Queen Mary University of London I graduated with a bachelors of science in 
                Physics with Particle Physics (BSc Physics with Particle Physics).
              </div>
    
              <div id='education7'>
                Physics as a degree is always something I have been passionate about from the world of Quantum Mechanics
                 with applications in Quantum computing for the next step in computing power to the use of data science 
                 techniques in Particle Physics.
              </div>
    
              <div id='education8'>
                By pursuing a specialisation in Particle Physics I was able to learn and apply many concepts in 
                data science in assignments and projects including my dissertation.
              </div>
    
              <div id='education2'>
                This included learning Python using Pandas to interact with and clean dataframes, as well as using 
                libraries to visualise and analyse segments of the dataframes using libraries such as MatPlotLib 
                and SeaBorn. Additionally at my time at university I was able to learn and use R Language to visualise 
                and interact with data frames.
              </div>
    
              <div id='education3'>
                Another step in my up-skilling in data science at university was the use machine learning techniques 
                such as Decision Trees, Logistic Regression, Naives Bayes machine learning models to analyse and produce
                 hypotheses from data analysis performed on various dataframes.
              </div>
    
              <div id='education4'>
                Some additional analytical techniques I developed at university included Principal Component Analysis, 
                cross-validation and Time Series Analysis.
              </div>
    
              <div id='education5'>
                My dissertation topic was on Using Machine Learning Techniques to classify and search for products of 
                Neutrinos at DUNE.
              </div>
    
              <div id='education6'>
                Another project at University was performing data analysis on Mexico City sensors for air pollutants and
                 levels of traffic intensity in different areas to find correlations between the two.
              </div>
            </div>
          )}

          {isOpen2 && (
            <div className="button2-container">
                <div id='employment-title'>
                    Employment
                </div>
            </div>


          )}


        </div>
      );
    };

    
  
  export default About;
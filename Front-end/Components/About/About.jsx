import React, { useEffect, useState } from "react";
import "./About.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const About = () => {

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [activeButton2, setActiveButton2] = useState(null);
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const toggleArrow = document.getElementById("arrow");
    const toggleArrow2 = document.getElementById("arrow2");

    useEffect(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 3, 5);
  
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
  
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
      scene.add(spotlight);
  
      const controls = new OrbitControls(camera, renderer.domElement);
  
      const mosaicTexture = new THREE.TextureLoader().load('../../static/images/tiles.jpg');
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
  
      const spaceTexture = new THREE.TextureLoader().load('../../static/images/greek_skies.jpg');
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

                {/* <div id='employment1'>
                    In my employment at Ten10 I was trained in a variety of areas within the technology industry including
                    business analysis, manual testing, automated testing, development and data.
                    This included languages such as Java, JavaScript, Python and SQL  with code editors such as 
                    SQL Lite Studio, Oracle with SQL Developer, IntelliJ and VSCode.
                  </div> 

                  <div id='employment2'>

                    In core training we covered manual testing and automated testing extensively by writing
                    test scripts and test plans covering tests such as black box testing, white box testing,
                    unit testing, integration testing, etc.
                    
                  </div>

                <div id='employment3'>

                    To develop the basic skills in Java to apply to automated tesing assignments several assignments in
                    Java development by programming a Rock, Paper, Scissor game which asks the user for an input and generates
                    a random response for the opponent and tallies the wins and losses with the robot opponent. I also added exceptions
                    for when the user types an unrecognised input in the terminal.
                    
                  </div>

                <div id='employment4'>

                    Using the basic Java skills I performed automated testing on various websites for click events and
                    inputs into input fields using Selenium and WebDriver.

                </div> 

                <div id='employment4'>
                    
                    In additional training we performed a business analysis project for a mock company which was a 
                    brick and mortar company who wanted to transform itself into having digital and ecommerce presence.
                    In my team we developed mocks ups and wire frames for their ecommerce website and came with plans and
                    ideas for the plan to transition the company.

                </div>

                <div id='employment5'>

                    In my team I was responsible and came up with the plan to use SAP Fiori to develop the off the shelf
                    ecommerce website and using the companies own servers to save on costs because it had no previous digital
                    presence and was low level sized company so only 2-3 server racks would be required.

                </div>

                <div id='employment6'>

                    I was also responsible for the proposition of the EPOS provider instore using EPOS NOW to track
                    inventory and manage notifications to the central distribution centre (warehouse) to get new stock
                    delivered to the store. Also, to have digital card readers and register terminals. I came up with
                    EPOS NOW as it had an upfront cost only after researching Clover and other EPOS providers.
                </div>

                <div id='employment7'>

                    My second additional training was related to using databases which including Oracle with SQL
                    Developer to interact with database tables using ata Definition Language (DDL),
                    Data Manipulation Language (DML), Data Control Language (DCL), Transaction Control Language (TCL), 
                    and Data Query Language (DQL) commands for base level SQL knowledge.
                </div>

                <div id= 'employment8'>

                    Using this base SQL skills I then performed various PL/SQL procedures, anonymous blocks, functions
                    and packages to enhance my development skills within SQL for databases.

                </div>

                <div id = 'employment9'>

                    Then using python I performed data analysis on various dataframes using libraries such as 
                    NumPy, Pandas and Matplotlib to analyse and data clean data frames. We then perfomed a data cleaning 
                    project on dirty data parsing the cleaned data into Tableau to creating a highly interactive
                     presentation with dashboards in stories.

          </div> */}


            </div>


          )}


        </div>
      );
    };

    
  
  export default About;
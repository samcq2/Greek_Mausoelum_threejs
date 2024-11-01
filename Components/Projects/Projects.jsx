import React, { useEffect, useState } from "react";
import "./Projects.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import bandsocImage from '../../Pictures/bandsoc_frontpage.png'
import bandsocAdmin1 from '../../Pictures/admin-1.png'
import bandsocAdmin2 from '../../Pictures/admin-2.png'
import stripe from '../../Pictures/stripe.png'
import Home from '../../Pictures/portfolio-home.png';
import Contact from '../../Pictures/portfolio-contact.png';
import Projects from '../../Pictures/portfolio-projects.png';
import HeatMap from '../../Pictures/UIZ_heatmap.png';
import OverlayedHistPol from '../../Pictures/pollutants_overlayed.png';
import OverlayedHistTraf from '../../Pictures/traffic_overlayed.png';
import PolLoadings from '../../Pictures/loadings_plot_pollutants.png';
import TrafLoadings from '../../Pictures/traffic_loadings_plot.png';
import ScreePlotPol from '../../Pictures/pollutant_scree_plots.png';
import ScreePlotTraf from '../../Pictures/traffic_scree_plot.png';

const About = () => {

    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    const [isOpen7, setIsOpen7] = useState(false);

    const [activeButton3, setActiveButton3] = useState(null);
    const [activeButton4, setActiveButton4] = useState(null);
    const [activeButton5, setActiveButton5] = useState(null);
    const [activeButton6, setActiveButton6] = useState(null);
    const [activeButton7, setActiveButton7] = useState(null);

    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);
    const [isHovered5, setIsHovered5] = useState(false);
    const [isHovered6, setIsHovered6] = useState(false);
    const [isHovered7, setIsHovered7] = useState(false);

    const toggleArrow3 = document.getElementById("arrow3");
    const toggleArrow4 = document.getElementById("arrow4");
    const toggleArrow5 = document.getElementById("arrow5");
    const toggleArrow6 = document.getElementById("arrow6");
    const toggleArrow7 =  document.getElementById("arrow7");

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

    const toggleDropdown3 = () => {
      toggleArrow3.classList.toggle("arrow3");
      setIsOpen3(!isOpen3);
      setActiveButton3(activeButton3 === 'Warwick Bandsoc Web App' ? null : 'Warwick Bandsoc Web App');
    };
    
    const toggleDropdown4 = () => {
      setIsOpen4(!isOpen4);
      setActiveButton4(activeButton4 === 'Original Portfolio Website' ? null : 'Original Portfolio Website');
      toggleArrow4.classList.toggle("arrow4");
    };

    const toggleDropdown5 = () => {
      setIsOpen5(!isOpen5);
      setActiveButton5(activeButton5 === 'Mexico City Sensor Data Analysis' ? null : 'Mexico City Sensor Data Analysis');
      toggleArrow5.classList.toggle("arrow5");
    };

    const toggleDropdown6 = () => {
      setIsOpen6(!isOpen6);
      setActiveButton6(activeButton6 === 'Airport Arrivals and Departures Time Series Analysis' ? null : 'Airport Arrivals and Departures Time Series Analysis');
      toggleArrow6.classList.toggle("arrow6");
    };

    const toggleDropdown7 = () => {
      setIsOpen7(!isOpen7);
      setActiveButton7(activeButton7 === 'New Portoflio Website (Current)' ? null : 'New Portoflio Website (Current)');
      toggleArrow7.classList.toggle("arrow7");
    };



    return (
      <div className='wrapper-container'>

<div className="button-container-p">

<button className="dropdown_p1" onClick={toggleDropdown3}
onMouseEnter={() => setIsHovered3(true)}
onMouseLeave={() => setIsHovered3(false)}

style={{
    backgroundColor: activeButton3 === 'Warwick Bandsoc Web App' ? '#e7bd42' : isHovered3 ? '#e7bd42' : 'transparent',
    color: activeButton3 === 'Warwick Bandsoc Web App' ? '#336cce' : isHovered3 ? '#336cce' : '#f2e7bf',                  
  }}>
    {isOpen3 ? "Warwick Bandsoc Web App" : "Warwick Bandsoc Web App"}
    <i3 class="bx bx-chevron-down" id="arrow3"></i3>
</button>

<div class="divider2">

</div>

<button className="dropdown_p2" onClick={toggleDropdown4}
onMouseEnter={() => setIsHovered4(true)}
onMouseLeave={() => setIsHovered4(false)}
style={{
    backgroundColor: activeButton4 === 'Original Portfolio Website' ? '#e7bd42' : isHovered4 ? '#e7bd42' : 'transparent',
    color: activeButton4 === 'Original Portfolio Website' ? '#336cce' : isHovered4 ? '#336cce' : '#f2e7bf',  
    
  }}>
    {isOpen4 ? "Original Portfolio Website": "Original Portfolio Website"}
    <i4 class="bx bx-chevron-down" id="arrow4"></i4>
</button>

<button className="dropdown_p3" onClick={toggleDropdown5}
onMouseEnter={() => setIsHovered5(true)}
onMouseLeave={() => setIsHovered5(false)}
style={{
    backgroundColor: activeButton5 === 'Mexico City Sensor Data Analysis' ? '#e7bd42' : isHovered5 ? '#e7bd42' : 'transparent',
    color: activeButton5 === 'Mexico City Sensor Data Analysis' ? '#336cce' : isHovered5 ? '#336cce' : '#f2e7bf',  
    
  }}>
    {isOpen5 ? 'Mexico City Sensor Data Analysis' : 'Mexico City Sensor Data Analysis'}
    <i5 class="bx bx-chevron-down" id="arrow5"></i5>
</button>

<button className="dropdown_p4" onClick={toggleDropdown6}
onMouseEnter={() => setIsHovered6(true)}
onMouseLeave={() => setIsHovered6(false)}
style={{
    backgroundColor: activeButton6 === 'Airport Arrivals and Departures Time Series Analysis' ? '#e7bd42' : isHovered6 ? '#e7bd42' : 'transparent',
    color: activeButton6 === 'Airport Arrivals and Departures Time Series Analysis' ? '#336cce' : isHovered6 ? '#336cce' : '#f2e7bf',  
    
  }}>
    {isOpen6 ? 'Airport Arrivals and Departures Time Series Analysis' : 'Airport Arrivals and Departures Time Series Analysis'}
    <i6 class="bx bx-chevron-down" id="arrow6"></i6>
</button>

<button className="dropdown_p5" onClick={toggleDropdown7}
onMouseEnter={() => setIsHovered7(true)}
onMouseLeave={() => setIsHovered7(false)}

style={{
    backgroundColor: activeButton7 === 'New Portoflio Website (Current)' ? '#e7bd42' : isHovered7 ? '#e7bd42' : 'transparent',
    color: activeButton7 === 'New Portoflio Website (Current)' ? '#336cce' : isHovered7 ? '#336cce' : '#f2e7bf',                  
  }}>
    {isOpen7 ? "New Portoflio Website (Current)" : "New Portoflio Website (Current)"}
    <i7 class="bx bx-chevron-down" id="arrow7"></i7>
</button>
</div>
      
      <div className="desc-container2">
          
          <div id="title">
              Technical Projects Portfolio
          </div>
        
        {isOpen3 && (
          <div className="button3-container">
            <div id='project1-title'>
              Full-stack booking page developed for Warwick Band Society
            </div>

            <img src={bandsocImage} alt="Band Society" className="bandsoc-frontpage" />
            
  
            <div id='project1-1'>
              This is a full-stack app for Warwick Band Society developed as per the requirements
              of the Bandsoc executives for a booking page which allows for automated booking 
              and integrated payment through the Stripe API.
            </div>

            <img src={stripe} alt=" Stripe" className="stripe" />

            <div id="project1-2">
              Automated Booking System: Effortlessly book your practice rooms using credits,
               purchasable via Stripe API.
            </div>

            <div id="project1-3">
              Special Privileges for BOTB Bands: If you're in the Battle of The Bands, 
              enjoy priority booking and extended schedule views through a unique BOTB admin portal.
            </div>

            <div id="project1-4">
              Backend: 
              Python, Stripe API, Fast API, AWS, PostgreSQL, 
              Enhanced security via bcrypt, Docker for continuous running.
            </div>

            <div id="project1-5">
              Frontend:
              Crafted in React with Typescript, PrimeReact UI, Hosted with Vercel.
            </div>

            <div id="project1-6">
              In addition to our brand-new booking system, 
              we've also made an Admin Panel for Warwick Bandsoc executives
              (see below).
            </div>

            <img src={bandsocAdmin2} alt="Band Society admin 1" className="bandsoc-admin-2" />
            <img src={bandsocAdmin1} alt="Band Society admin 1" className="bandsoc-admin-1" />
            
          </div>
        )}

        {isOpen4 && (
          <div className="button4-container">
              <div id='project2-title'>
                  Portfolio Web App
              </div>

              <div id='project2-1'>
                  This is a portfolio website developed by myself using JavaScript with React,
                  HTML and SCSS. The User Interface (UI) is made of different components including the
                  Sidebar, Layout, Home, Projects and Contact. 
              </div>
              <img src={Home} alt="Band Society" className="Portfolio-Home" />

              <div id="project2-2">
                Technology Stack: JavaScript for coding the components with React, SCSS for styling and HTML for formatting.
              </div>

              <img src={Projects} alt="Band Society admin 1" className="Portfolio-Projects" />

              <div id="project2-3">
                Email Functionality: Integrated "emailjs" library
                in the Contact component, enabling users to send
                emails directly from the website, eliminating the
                need for a server-side backend. Compatible with
                email service providers like Gmail and Yahoo.
              </div>

              <img src={Contact} alt="Band Society admin 1" className="Portfolio-Contact" />

              <div id="project2-4">
                Map Location: Utilized React Leaflet library to
                render a map with my location. Defined a map
                container with a TileLayer attribution and url
                parameters from maptiler.com for the specific map we want.
                Added a marker to show my location by defining my longitude and
                lattitude.
              </div>

              <div id="project2-5">
                Navigation: Used NavLink to navigate between different pages within the multi-page portfolio website, providing
                seamless switching between Home, Projects, and Contact sections.
              </div>

              <div id="project2-6">
                FontAwesome Integration: Imported FontAwesome library to incorporate icons for GitHub, LinkedIn, Home,
                Projects, and Contacts buttons/links, enhancing the user experience.
              </div>

              <div id="project2-7">
                Projects Section: The Projects component contains JavaScript files and an SCSS file. These JavaScript files represents
                different projects, and Navlink is used to render buttons that lead to these projects. Each JS file corresponds
                to a specific project, and a parameter, activeClassName='active-link' is used to highlight the currently active file.
              </div>
          </div>


        )}
        
        {isOpen5 && (
          <div className="button5-container">
              
              <div id='project3-title'>
                Pollution and Traffic Data Analysis From Mexico City Sensors
              </div>

              <div id='project3-1'>
                In this data science project, I started by utilising R language within a
                Jupyter Notebook environment to perform an in-depth
                analysis of the data for the exploration section such as a Pearson corrleation heatmap (See below).
              </div>

              <img src={HeatMap} alt="Band Society" className="Heatmap" />

              <div id='project3-3'>
                The primary objectives were to explore data trends visually and calculate
                and display visually  correlations between the traffic and pollutant variables 
                using pre-installed libraries.
              </div>

              <div id='project3-4'>
                I also utilised Python to to model the data using Principal
                Component analysis (PCA) and train, test, split from Sklearn
                library for both traffic data and pollution data separately.
              </div>

              <div id='project3-5'>
                Python was also used in area characterisation to visualise the pixel
                data for each sensor and define and apply procedures to
                deduce how similar the sensor areas are.
              </div>

              <div id='project3-6'>
                The project consisted of three main phases:
              </div>

              <div id='project3-7'>
                Exploration: using histograms, overlaid histograms, correlation coefficient tables, all for each 
                pollutant and traffic intensity along with correlation heatmaps for each sensor showing how 
                the data behaves.
              </div>

              <img src={OverlayedHistPol} alt="Band Society admin 1" className="Hist-Pol" />
              <img src={OverlayedHistTraf} alt="Band Society admin 1" className="Hist-Traf" />

              <div id='project3-8'>
                Modelling: modelled the data using train, test, split with Principal Component Analysis (PCA) 
                for machine learning model Linear Regression, showing this visually with scree plot, scatter 
                plots overlaid with principal component lines, loading plots for each principal component.
              </div>

              <img src={ScreePlotPol} alt="Band Society admin 1" className="Scree-Plot-Pol" />
              <img src={ScreePlotTraf} alt="Band Society admin 1" className="Scree-Plot-Traf" />

              <img src={PolLoadings} alt="Band Society admin 1" className="Loadings-Pol" />        
              <img src={TrafLoadings} alt="Band Society admin 1" className="Loadings-Traf" />

              <div id='project3-9'>
                Area Characterisation: showed how the different pixel data by ring compares for each sensor, 
                and defined a procedure using correlation coefficients to deduce whether different sensors are similar enough to be used in an aggregated way.
              </div>


          </div>
        )}
        
        {isOpen6 && (
          <div className="button6-container">
              
              <div id='project4-title'>
                Airport Arrivals and Departures Time Series Analysis
              </div>

          </div>
        )}

        {isOpen7 && (
          <div className="button6-container">
              
              <div id='project5-title'>
                Current Portfolio Websited Developed with React and ThreeJS
              </div>

          </div>
        )}


      </div>
      </div>
    );

    };



    
  
  export default About;
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

const About = () => {

    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [activeButton3, setActiveButton3] = useState(null);
    const [activeButton4, setActiveButton4] = useState(null);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);
    const toggleArrow3 = document.getElementById("arrow3");
    const toggleArrow4 = document.getElementById("arrow4");

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
      </div>
      </div>
    );

    };



    
  
  export default About;
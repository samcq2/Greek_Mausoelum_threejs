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
import logscale_hr_vol from '../../Pictures/logscale_monthly_vol.png';
import hr_vol from '../../Pictures/monthly_vol_year.png';
import moving_average_logscale from '../../Pictures/moving_average_logscale.png';
import dep_hr_vol from '../../Pictures/dep_hourly_vol.png';
import exp_dec_weighted_avg from '../../Pictures/exp_decay.png';
import rolling_mean_std from '../../Pictures/rolling_mean_rolling_std.png';
import log_diff_shift from '../../Pictures/log_difference_shifting.png';
import resid_seasonality from '../../Pictures/resid_seasonality_og_trend.png';
import threejs_overview from '../../Pictures/threejs_overview.png';
import threejs_contact from '../../Pictures/threejs_contact.png';
import threejs_home from '../../Pictures/threejs_home.png';
import threejs_projects from  '../../Pictures/threejs_projects.png';
import threejs_about_me from '../../Pictures/threejs_about_me.png';

//ffffff

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

            <div id='project1-1'>
              This is a full-stack app for Warwick Band Society developed as per the requirements
              of the Bandsoc executives for a booking page which allows for automated booking 
              and integrated payment through the Stripe API.
            </div>

            <img src={bandsocImage} alt="Band Society" className="bandsoc-frontpage" />
            
  
            <div id="project1-2">
              Automated Booking System: Effortlessly book your practice rooms using credits,
               purchasable via Stripe API.
            </div>

            <div id="project1-3">
              Special Privileges for BOTB Bands: If you're in the Battle of The Bands, 
              enjoy priority booking and extended schedule views through a unique BOTB admin portal.
            </div>

            <img src={stripe} alt=" Stripe" className="stripe" />

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

              <div id="project4-1">
                In this project I leveraged an airport arrivals and departures dataset in the year of 2019
                to perform Time Series Analysis. This allowed me to analyse the seasonality and periodicity
                of the hourly volume of the departures throughout the year. This in turn allowed me to deduce
                anomalies in the cycle for holidays like Christmas and Easter, as well strikes where there would be
                no departures or a significant reduction in the departures from Heathrow Airport.
              </div>

              <img src={dep_hr_vol} className="departures_hourly_volume" />
              <img src={hr_vol} className="hourly_volume" />

              <div id="project4-2">
                Firstly I read the csv file in using Pandas on Python in a Jupyter notebook and 
                calculated the hourly volume of the departures from Heathrow Airport. The first_seen column
                was initially in a UNIX Time Stamp date format which I converted using to_date and extracted the hour
                with dt.hour. I then plotted the histogram fo the hourly volume using plt.hist with the departures by integer hour
                with 24 hours. I also overlayed this with a normal distribution calculated using the mean and standard deviation from the NumPy 
                library. I also defined a linespace and put this all with the norm.pdf() function for a probability
                density function with plt.plot(). I then plotted the monthly volume of departures as a lineplot for each day in the year in a similar
                way. (see above).
              </div>
              

              <img src={logscale_hr_vol} className="logscale_hourly_volume" />
              <img src={moving_average_logscale} className="moving_avg_logscale" />

              <div id="project4-3">
                To see the trends and anomalies in the periodicity/cycle of departures throughout the year
                I calculated the logscale of the monthly volume of departures. Firstly I used the np.log() function on the monthly volume
                and plotted it as I did previously. I then calculated the moving average with rolling function logscaled
                monthly departure volume. This was overlayed onto the plot with monthly volume itself. (see above).
              </div>

              <div id="project4-4">
                From the plot with overlayed moving average there are three anomalies two of which in terms days within the year correspond to
                Christmas and Easter (around day 125 and day 205). The other anomaly corresponds to employee strikes (around day 145). 
              </div>



              <img src={rolling_mean_std } className="rolling_mean_std" />
              <img src={log_diff_shift} className="log_diff_shift" />

              <div id="project4-5">
                In a similar way I calculated the moving average I also calculated the moving 
                standard deviation by applying the rolling function with the std function on the
                monthly volume. I then overlayed the moving average and moving stadnard deviation on the Original 
                monthly volume. After this I calculated the log difference shift and plotted it.
                I did this by taking away the logscale shift applying the shift() function to the logscale 
                monthly volume from the logscale monthly volume. This was plotted using plt.plot(). 
                (see above).
              </div>


              <img src={exp_dec_weighted_avg } className="exp_dec_Weighted_avg" />

              <div id="project4-6">
                Next, I calculated the exponential ddecay weighted average of the monthly volume.
                This was done by applying the ewm() function for exponentially weighted calculations
                and inputting the halflife parameter as 12 for 12 months in the year and applying the mean()
                function to calculated the average for the exponetial decay. This was overlayed on the original 
                monthly volume of departures plot. (see above).
              </div>


              <img src={resid_seasonality} className="resid_seasonality" />

              <div id="project4-7">
                Finally, I plotted the seasonality of the original, trend, seasonality and risiduality
                in a tight layout for comparison. This was done firstly by using the seasonal_decompose function 
                from the statsmodel.tsa.seasonal library, which used the monthly volume logscale data.
                Then .trend, .seasonal and .resid were applied to the decomposition separately and all were plotted
                on separate plots. The residual plot also had rolling mean and rolling standard deviation
                overlayed onto the plot. This showed the seasonality and periodicity in more detail. As well as this 
                the trend plot also showed the anomalies for Christmas, Easter and employee strikes more clearly
                and therefore confirmed my intial hypotheses for why the departures dropped signifcantly
                in the corresponding periods in 2019. (See above).
              </div>







          </div>
        )}

        {isOpen7 && (
          <div className="button6-container">
              
              <div id='project5-title'>
                Current Portfolio Websited Developed with React and ThreeJS
              </div>

              <div id='project5-1'>
                This is a full-stack portfolio website developed in the front-end using JavaScript with ThreeJS and React libraries. 
                I used ThreeJS to personalise my website making my own models using Blender and exporting the model as a glb file and imported
                it into the ThreeJS scripts. I developed ThreeJS scenes in the use effect using this model adding textures to to the floor and background (sky)
                in the scene. I also added perspective camera positions and the level of ambient light in the scene.
              </div>

              <img src={threejs_overview} className="threejs_overview" />

              <div id='project5-2'>
                As well as the base scene in the use effect for the Home page I also developed animations closer to the model by using defining the start position and 
                target positions as constants. Aftet his I defined an animate zooom function defining the time elapsed for the zoom, lerpvectors function 
                to alter the camera position in the zoom and finally the lookat function on the position of the model to make sure during the zoom it is focused on the 
                glb model I exported. This zoom is initiated when you click the Home button in the side navbar.
              </div>

              <img src={threejs_home} className="threejs_home" />

              <div id='project5-3'>
                For the about me page I designed a new model on Blender and again exported the glb file to the directory, importing it into the 
                scene as I did before with the same methods for perspective camera, animation, camera position, spotlight and ambient light.
                Here is where I utilised React to show drop downs for my education background and employment background. Here I defined toggle dropdown functions, using it 
                to dropdown the text when it is clicked as well as integrating hover characteristics. As well as this I defined associated arrow to each dropdown button defining in SCSS
                a rotation of 270 degrees, so it is clear which button is open.
              </div>

              <img src={threejs_about_me} className="threejs_about_me" />

              <div id="project5-4">
                In the same way I developed the About ThreeJS scene with animations and perspective camera, I developed the Projects page which displays
                my technical project portfolio using React. This includes images and descriptions in details of my projects, it is essentially the code as the 
                About page except there are more toggle dropdown buttons with arrows defined for the multiple technical projects I have done.
              </div>

              <img src={threejs_projects} className="threejs_projects" />

              <div id="projects5-5">
                Finally on he front end using the same ThreeJS use effect but a different react components to develop a front-end contact form to send emails to 
                my work email account. This was linked to NodeJS back-end which I first tested locally with a server.js and config.js file. To enhance security I utilised
                cert.perm and privkey.pem files with a dedicated passkey to create the http server. I defined exceptions resulting in success or fail messages
                depending if the email is sent successfully or not. I also defined an automated message that it sends to the person who fills out the form when their email is 
                successfully sent. This ensures that the user knows their email has been recieved. I then hosted this on the cloud using render.com.
              </div>
              <img src={threejs_contact} className="threejs_contact" />

          </div>
        )}


      </div>
      </div>
    );

    };
  
  export default About;
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.5;
camera.position.x = -6.9;
camera.position.y = 3.5;

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const floorGeometry = new THREE.PlaneGeometry(300, 300);

const loaderText = new THREE.TextureLoader();
const floorTexture = loaderText.load('greek_mosaic.jpg');

// Set texture wrapping and repeat for tiling
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(10, 10); // Adjust to tile the texture

// Create a material with the texture
const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });

// Create the floor mesh
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);

// Rotate and add to the scene
floorMesh.rotation.x = -Math.PI / 2;
floorMesh.receiveShadow = true;
scene.add(floorMesh);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const spotlight = new THREE.SpotLight(0xffffff, 3);
spotlight.position.set(0, 5, 10); // Adjusted position to better illuminate the scene
spotlight.castShadow = true; // Optional: Enable shadows
scene.add(spotlight);



// Controls
const controls = new OrbitControls(camera, renderer.domElement);

const mosaicTexture = new THREE.TextureLoader().load('greek_mosaic.jpg');

// GLTFLoader
const loader = new GLTFLoader();



loader.load(
  '/Greek_Mausoleum_2.glb',
  function (gltf) {
    const model = gltf.scene;

    // Apply the texture to all materials in the model
    model.traverse(function (child) {
      if (child.isMesh) {
        child.material.map = mosaicTexture;
        child.material.needsUpdate = true; // Ensure the material is updated
      }
    });

    model.scale.set(0.05, 0.05, 0.05); // Adjust scale if necessary
    model.position.set(0, -0.2, 0); // Center the model
    scene.add(model);
  });

  const spaceTexture = new THREE.TextureLoader().load('greek_skies.jpg');
  scene.background = spaceTexture;

  function addStar() {

    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { 
      color: 0xffffff,
      emissive: 0xffffff,       
      emissiveIntensity: 2,
      roughness: 0.1,
      metalness: 0.5
    })
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

    
    star.position.set(x, y, z);
    scene.add(star)

}

Array(600).fill().forEach(addStar) 

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Window resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
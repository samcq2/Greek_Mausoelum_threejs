import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// GridHelper
const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const spotlight = new THREE.SpotLight(0xffffff, 3);
spotlight.position.set(0, 5, 10); // Adjusted position to better illuminate the scene
spotlight.castShadow = true; // Optional: Enable shadows
scene.add(spotlight);

const spotLightHelper = new THREE.SpotLightHelper(spotlight);
scene.add(spotLightHelper);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// GLTFLoader
const loader = new GLTFLoader();
loader.load(
  '/Greek_Mausoleum.glb',
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.05, 0.05, 0.05); // Adjust scale if necessary
    model.position.set(0, 0, 0); // Center the model
    scene.add(model);
    console.log('Model loaded successfully:', model);
  });

  const spaceTexture = new THREE.TextureLoader().load('greek_skies.jpg');
  scene.background = spaceTexture;

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
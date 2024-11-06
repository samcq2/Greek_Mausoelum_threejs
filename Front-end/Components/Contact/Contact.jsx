import React, { useEffect, useState } from "react";
import "./Contact.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Contact = () => {
    const [emailForm, setEmailForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [result, setResult] = useState('');

    const [status, setStatus] = useState('Submit');

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

    function resetEmailForm() {
        setEmailForm({ name: '', email: '', message: '' });
    }

    function handleEmailFormChange(event) {
        setEmailForm((prevEmailData) => {
            return {
                ...prevEmailData,
                [event.target.name]: event.target.value,
            };
        });

        if (result.length > 0) {
            setResult('');
        }
    }

    const handleSubmit = async (e) => {
        setResult('');
        e.preventDefault();
        setStatus('Sending...');

        const { name, email, message } = e.target.elements;

        let details = {
            name: name.value,
            email: email.value,
            message: message.value,
        };

        try {
            let response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(details),
            });
            setStatus('Submit');
            let result = await response.json();

            if (result.status === 'success') {
                setResult('Message Sent!');
                resetEmailForm();
            } else if (result.status === 'fail') {
                alert('Uh oh! Message failed to send.');
            }
        } catch (error) {
            console.error(error);
            setStatus('Submit');
            setResult('Uh oh! Issues with submitting message.');
        }
    };


    return (
        <div className='contact'>
            <h1 className="contact-title">Contact Me</h1>
            <form
                id='contact-form'
                className='contact-form'
                onSubmit={handleSubmit}
                method='POST'>
                <input className="name"
                    placeholder='name'
                    type='text'
                    name='name'
                    required={true}
                    value={emailForm.name}
                    onChange={handleEmailFormChange}
                />
                <input className="email"
                    placeholder='email address'
                    type='email'
                    name='email'
                    required={true}
                    value={emailForm.email}
                    onChange={handleEmailFormChange}
                />
                <textarea className="input"
                    maxLength={300}
                    placeholder='message (max 300 characters)'
                    name='message'
                    required={true}
                    value={emailForm.message}
                    onChange={handleEmailFormChange}
                />
                <button className= "submit" type='submit'>{status}</button>
                <h3>{result}</h3>
            </form>
        </div>

    );

};

    export default Contact;
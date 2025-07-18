import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { useEffect , useRef} from 'react';
import styled from "styled-components";
// @ts-ignore
  
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import FootNavig from './footnavig';

const StyledApp = styled.div`
  background-color:  #F9F9F9;
  color: black;
  font-family: Lexend;
  @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
      color: white ;
  }
  min-height: 250vh;
  padding:10px;
  margin:0;
  
   zoom :100%;
`;

const Acc_panel = styled.div`
background-color: white;
  color:black;
   height:100px;
   width:98.7%;
    border-radius: 9px;
  justify-contents: center;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
        color:white;
  }
`;

const AgroApp = () => { 
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        

        const camera = new THREE.PerspectiveCamera(
            5,
            1 / 1,
           0.1,
            100
        );
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;

        // Append renderer to the mountRef div
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Controls for 3D feel
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        
        controls.maxDistance = 100;

        // Lighting
        const light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(2, 5, 5);
        scene.add(light);

        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambient);

        const Loader = new GLTFLoader();
        let loadedScene: THREE.Object3D | null = null;
            
        Loader.load('/ceraminc_plant/decorative-ceramic-vase2.gltf', function (gltf){
            loadedScene = gltf.scene;
            scene.add(gltf.scene);
        }, function (error) {
    console.error('An error happened during GLB loading:', error);
  });

        let animationId: number;

        function animate() { 
            animationId = requestAnimationFrame(animate);
            if (loadedScene) {
                loadedScene.rotation.y += 0.0009; // Slow rotation for 3D effect
            }
            renderer.render(scene, camera);
        }
        animate();

        // Handle resizing
        const handleResize = () => {
            if (mountRef.current) {
                const { clientWidth, clientHeight } = mountRef.current;
                camera.aspect = clientWidth / clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(clientWidth, clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        // Initial resize to fit container
        handleResize();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            scene.clear();
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <StyledApp>
          
                <div style={{justifyContent:'space-between', display:'flex', top:'0', marginBottom:'7px', backdropFilter:'blur(30px)'}}>
                    <div style={{left:'0'}}>Menu</div><div>Me</div>
                </div>
                <Acc_panel>
                 <p style={{padding:'30px', textAlign:'center', marginTop:'10%', fontFamily:'helvetica',fontWeight:'900',fontSize:'30px'}}> $500.00</p>
                    </Acc_panel>
                <div
                    ref={mountRef}
                    style={{ width: '100%',  overflow: 'hidden' ,zoom: '100%'}}
                />  
                <div><FootNavig/></div>

                <Acc_panel>this should be the panel that contains the timer</Acc_panel>
                <br/>
                <Acc_panel> tshis should be the Acc_panel that contains the investment data  like the allocated timing, expected results</Acc_panel>
         
        </StyledApp>
    );
};

 
export default AgroApp;

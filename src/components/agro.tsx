import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { useEffect , useRef} from 'react';
import styled from "styled-components";
// @ts-ignore
 import {Menu} from 'lucide-react'; 
  import {User} from 'lucide-react'; 
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
  padding:20px;
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
 
const Header = styled.div`
backdrop-filter:blur(30px);
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
        controls.zoom0 = 0;
        controls.zoomToCursor = false;
       
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
          
                <Header style={{justifyContent:'space-between', display:'flex', top:'0', marginBottom:'7px'}}>
                 <Menu/><User/>
                </Header>
                <Acc_panel style={{ height:'150px'}}><p style={{color:'grey', fontSize:'small', textAlign:'center', padding:'7px'}}>Total Earnings</p>
                 <p style={{ textAlign:'center',  fontFamily:'helvetica',fontWeight:'900',fontSize:'30px'}}> $500.00</p>
                    </Acc_panel>
                <div
                    ref={mountRef}
                    style={{ width: '100%',  overflow: 'hidden' , margin:'10px'}}
                />  
                <div><FootNavig/></div>

                <Acc_panel style={{ width:'90%',position:'absolute' , top:'80%', textAlign:'center'}}><p style={{ marginTop:'7%',fontSize:'20px'}}>Ends: 20/07/25</p></Acc_panel>
                <br/>
                <Acc_panel style={{ width:'90%',position:'absolute' , top:'95%', textAlign:'center', fontSize:'30px'}}><p style={{ marginTop:'7%',fontSize:'20px'}}>%ROI: 10</p></Acc_panel>
         
        </StyledApp>
    );
};

 
export default AgroApp;

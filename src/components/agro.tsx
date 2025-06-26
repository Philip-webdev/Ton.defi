import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { useEffect , useRef} from 'react';
import styled from "styled-components";
// @ts-ignore
import { sRGBEncoding } from 'three/src/constants';

const StyledApp = styled.div`
  background-color:  #F9F9F9;
  color: black;
  font-family: Lexend;
  @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
      color: white ;
  }
  min-height: 250vh;
  padding:40px 40px;
  margin:0;
  
   zoom :100%;
`;

const AppContainer = styled.div`
  
  margin: 0;
`;
const Icon = styled.div`
background-color: white;
   
  
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
        color:grey;
  }
`;
const AgroApp = () => { 
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        

        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
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
        controls.minDistance = 3;
        controls.maxDistance = 10;

        // Lighting
        const light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(2, 5, 5);
        scene.add(light);

        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambient);

        const textureLoader = new THREE.TextureLoader();
        // Load your plant texture image here (replace 'path/to/plant.png' with your image path)
        const plantTexture = textureLoader.load('../49221.jpg');

        (plantTexture as THREE.Texture).anisotropy = renderer.capabilities.getMaxAnisotropy();
         
        const width = 2, height = 3;
        const segments = 32;
        const geometry = new THREE.PlaneGeometry(width, height, segments);

        const material = new THREE.MeshStandardMaterial({
            map: plantTexture,
            side: THREE.DoubleSide,
        });

        // Mesh
        const plantMesh = new THREE.Mesh(geometry, material);
        plantMesh.castShadow = true;
        plantMesh.receiveShadow = true;
        scene.add(plantMesh);

        let animationId: number;

        function animate() {
            animationId = requestAnimationFrame(animate);
            plantMesh.rotation.y += 0.001; // Slow rotation for 3D effect
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
            <AppContainer>
                <div
                    ref={mountRef}
                    style={{ width: '100%', height: '100vh', overflow: 'hidden' ,zoom: '40%'}}
                />
            </AppContainer>
        </StyledApp>
    );
};

 
export default AgroApp;

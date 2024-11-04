import './style.css';

import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new Three.Scene();
const bgColor = new Three.Color().setHex( 0x001800 );
scene.background = bgColor;

const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new Three.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const boxTexture = new Three.TextureLoader().load('/viva-logo.png')

const geometry = new Three.BoxGeometry(10, 10, 10);
const material = new Three.MeshBasicMaterial({ map: boxTexture})
const box = new Three.Mesh(geometry, material);

scene.add(box);

const ambientLight = new Three.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const gridHelper = new Three.GridHelper(200, 50)
scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)
// controls.autoRotate = true;
// controls.autoRotateSpeed = 1;


function addConfetti() {
  const geometry = new Three.PlaneGeometry(0.5, 0.8);
  const color = Math.floor(Math.random()*16777215);
  const material = new Three.MeshStandardMaterial({color});
  const confetti = new Three.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => Three.MathUtils.randFloatSpread(100));

  confetti.position.set(x, y, z);
  scene.add(confetti);
}

Array(200).fill().forEach(addConfetti)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  let x = camera.position.x;
  let z = camera.position.z;

  camera.position.x = x * Math.cos(t*0.00001) + z * Math.sin(t*0.00001);
  camera.position.z = z * Math.cos(t*0.00001) - x * Math.sin(t*0.00001);
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate);
  box.rotation.x += 0.001;
  box.rotation.y += 0.001;
  box.rotation.z += 0.001;

  controls.update();

  renderer.render(scene, camera)
}

animate()
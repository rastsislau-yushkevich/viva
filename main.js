import './style.css';

import { swiper } from './swiper';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap'

const scene = new Three.Scene();
const bgColor = new Three.Color().setHex(0x8734d1);
scene.background = bgColor;

const camera = new Three.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new Three.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(50);

renderer.render(scene, camera);

// const boxTexture = new Three.TextureLoader().load('/viva-logo.png');

const geometry = new Three.BoxGeometry(10, 10, 10);
// const material = new Three.MeshBasicMaterial({ map: boxTexture });
const material = new Three.MeshStandardMaterial({ color: 0x00ff00  });
const box = new Three.Mesh(geometry, material);
box.position.set(0, 0, 0)
box.receiveShadow = true
box.castShadow = true

scene.add(box);

const pointLight = new Three.PointLight(0xffffbb, 100, 400);
pointLight.position.set(0, 0, 30);
scene.add(pointLight);

// const gridHelper = new Three.GridHelper(200, 50);
// scene.add(gridHelper);
// const lightHelper = new Three.PointLightHelper(pointLight, 0.5); // Параметр 0.5 — размер вспомогательного объекта
// scene.add(lightHelper);
// const controls = new OrbitControls(camera, renderer.domElement);

let previousSlideIndex = 0
swiper.on('slideChangeTransitionStart', function () {
  const currentSlideIndex = swiper.realIndex;
  const rotationDirection = (currentSlideIndex > previousSlideIndex) ? 1 : -1;
  rotateCamera(rotationDirection);
  previousSlideIndex = currentSlideIndex;
});

function rotateCamera(direction) {
  const radius = 30;
  const angleSpeed = 0.7;
  let currentAngle = Math.atan2(camera.position.x, camera.position.z);
  let newAngle = currentAngle + (direction * angleSpeed);
  gsap.to(camera.position, {
    duration: 0.7,
    x: radius * Math.sin(newAngle),
    z: radius * Math.cos(newAngle),
    onUpdate: () => {
      camera.lookAt(box.position);
    }
  });
  gsap.to(box.position, {
    duration: 0.7,
    z: box.position.z-direction*2,
  });

  gsap.to(pointLight.position, {
    duration: 0.7,
    x: radius * Math.sin(newAngle),
    z: radius * Math.cos(newAngle),
  });
}

function animate() {
	requestAnimationFrame(animate);
	box.rotation.x += 0.001;
	box.rotation.y += 0.001;
	box.rotation.z += 0.001;

	// controls.update();

	renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

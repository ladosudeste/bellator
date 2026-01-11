gsap.registerPlugin(ScrollTrigger);

/* =======================
   THREE.JS SETUP
======================= */
const canvas = document.getElementById("webgl");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 6);

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* =======================
   OBJETO 3D (Igloo style)
======================= */
const geometry = new THREE.IcosahedronGeometry(1.5, 1);
const material = new THREE.MeshPhysicalMaterial({
  color: 0x88ffff,
  roughness: 0.15,
  metalness: 0.4,
  transmission: 0.9,
  thickness: 1,
  clearcoat: 1,
  clearcoatRoughness: 0.1
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/* =======================
   LUZ
======================= */
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const light = new THREE.PointLight(0x88ffff, 2);
light.position.set(4, 4, 6);
scene.add(light);

/* =======================
   ANIMAÇÃO BASE
======================= */
function animate() {
  mesh.rotation.x += 0.002;
  mesh.rotation.y += 0.003;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

/* =======================
   SCROLL TRANSITIONS
======================= */

// Seção 1 → 2
gsap.to(camera.position, {
  z: 3,
  scrollTrigger: {
    trigger: ".section-2",
    start: "top bottom",
    end: "top center",
    scrub: true
  }
});

gsap.to(mesh.rotation, {
  y: Math.PI,
  scrollTrigger: {
    trigger: ".section-2",
    scrub: true
  }
});

// Seção 2 → 3
gsap.to(camera.position, {
  x: 1.5,
  z: 4,
  scrollTrigger: {
    trigger: ".section-3",
    start: "top bottom",
    end: "top center",
    scrub: true
  }
});

gsap.to(mesh.scale, {
  x: 0.7,
  y: 0.7,
  z: 0.7,
  scrollTrigger: {
    trigger: ".section-3",
    scrub: true
  }
});

/* =======================
   RESIZE
======================= */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

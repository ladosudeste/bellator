gsap.registerPlugin(ScrollTrigger);

/* THREE SETUP */
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

/* OBJETO */
const geometry = new THREE.IcosahedronGeometry(1.6, 1);
const material = new THREE.MeshPhysicalMaterial({
  color: 0x88ffff,
  roughness: 0.15,
  metalness: 0.4,
  transmission: 0.9,
  thickness: 1,
  clearcoat: 1
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/* LUZ */
scene.add(new THREE.AmbientLight(0xffffff, 0.7));

const light = new THREE.PointLight(0x88ffff, 2);
light.position.set(3, 4, 6);
scene.add(light);

/* LOOP */
function animate() {
  mesh.rotation.x += 0.002;
  mesh.rotation.y += 0.003;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

/* SCROLL ANIMAÇÕES */

// HERO → VALUE
gsap.to(camera.position, {
  z: 3.8,
  scrollTrigger: {
    trigger: ".value",
    start: "top bottom",
    end: "top center",
    scrub: true
  }
});

gsap.to(mesh.rotation, {
  y: Math.PI * 0.6,
  scrollTrigger: {
    trigger: ".value",
    scrub: true
  }
});

// VALUE → PROOF
gsap.to(camera.position, {
  x: 1.4,
  z: 4.2,
  scrollTrigger: {
    trigger: ".proof",
    start: "top bottom",
    end: "top center",
    scrub: true
  }
});

gsap.to(mesh.scale, {
  x: 0.85,
  y: 0.85,
  z: 0.85,
  scrollTrigger: {
    trigger: ".proof",
    scrub: true
  }
});

// PROOF → CTA
gsap.to(camera.position, {
  x: 0,
  z: 2.8,
  scrollTrigger: {
    trigger: ".cta",
    start: "top bottom",
    end: "top center",
    scrub: true
  }
});

gsap.to(mesh.rotation, {
  x: Math.PI * 0.5,
  scrollTrigger: {
    trigger: ".cta",
    scrub: true
  }
});

/* RESIZE */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

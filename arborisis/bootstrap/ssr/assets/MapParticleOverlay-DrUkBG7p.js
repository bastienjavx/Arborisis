import { mergeProps, onMounted, onUnmounted, ref, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import * as THREE from "three";
//#region resources/js/Components/Map/MapParticleOverlay.vue
var PARTICLE_COUNT = 120;
var CONNECTION_MAX_DIST = 3;
var MAX_CONNECTIONS_PER_PARTICLE = 3;
var _sfc_main = {
	__name: "MapParticleOverlay",
	__ssrInlineRender: true,
	setup(__props) {
		const canvasContainer = ref(null);
		let renderer, scene, camera, particles, lines, animationId;
		let mouseX = 0, mouseY = 0;
		let targetMouseX = 0, targetMouseY = 0;
		let startTime = 0;
		const positions = new Float32Array(PARTICLE_COUNT * 3);
		const homePositions = new Float32Array(PARTICLE_COUNT * 3);
		const velocities = new Float32Array(PARTICLE_COUNT * 3);
		const COLORS = [
			new THREE.Color(3462041),
			new THREE.Color(15986919),
			new THREE.Color(9414286)
		];
		function getVisibleBounds(camera) {
			const vFOV = THREE.MathUtils.degToRad(camera.fov);
			const height = 2 * Math.tan(vFOV / 2) * camera.position.z;
			return {
				width: height * camera.aspect,
				height
			};
		}
		onMounted(() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (!canvasContainer.value) return;
			startTime = performance.now();
			const w = canvasContainer.value.clientWidth;
			const h = canvasContainer.value.clientHeight;
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(50, w / h, .1, 50);
			camera.position.z = 8;
			renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true,
				premultipliedAlpha: true
			});
			renderer.setSize(w, h);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setClearColor(0, 0);
			canvasContainer.value.appendChild(renderer.domElement);
			const bounds = getVisibleBounds(camera);
			const colorArray = new Float32Array(PARTICLE_COUNT * 3);
			const sizeArray = new Float32Array(PARTICLE_COUNT);
			for (let i = 0; i < PARTICLE_COUNT; i++) {
				const ix = i * 3;
				positions[ix] = (Math.random() - .5) * bounds.width * 1.3;
				positions[ix + 1] = (Math.random() - .5) * bounds.height * 1.3;
				positions[ix + 2] = (Math.random() - .5) * 3.5;
				homePositions[ix] = positions[ix];
				homePositions[ix + 1] = positions[ix + 1];
				homePositions[ix + 2] = positions[ix + 2];
				velocities[ix] = 0;
				velocities[ix + 1] = 0;
				velocities[ix + 2] = 0;
				const c = COLORS[Math.floor(Math.random() * COLORS.length)];
				colorArray[ix] = c.r;
				colorArray[ix + 1] = c.g;
				colorArray[ix + 2] = c.b;
				sizeArray[i] = .08 + Math.random() * .14;
			}
			const particleGeo = new THREE.BufferGeometry();
			particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
			particleGeo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
			particleGeo.setAttribute("size", new THREE.BufferAttribute(sizeArray, 1));
			const particleMat = new THREE.ShaderMaterial({
				uniforms: { uTime: { value: 0 } },
				vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            varying float vAlpha;
            uniform float uTime;

            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                float pulse = 1.0 + 0.3 * sin(uTime * 1.8 + position.x * 4.0 + position.y * 3.0);
                gl_PointSize = size * pulse * (750.0 / max(2.5, -mvPosition.z));
                gl_Position = projectionMatrix * mvPosition;
                vAlpha = smoothstep(1.5, 5.0, -mvPosition.z) * 0.6 + 0.4;
            }
        `,
				fragmentShader: `
            varying vec3 vColor;
            varying float vAlpha;

            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                float alpha = (1.0 - smoothstep(0.12, 0.5, dist)) * vAlpha;
                float glow = 1.0 - smoothstep(0.0, 0.45, dist);
                vec3 finalColor = vColor * (0.9 + glow * 1.0);
                gl_FragColor = vec4(finalColor, alpha * 1.2);
            }
        `,
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending
			});
			particles = new THREE.Points(particleGeo, particleMat);
			scene.add(particles);
			const lineGeo = new THREE.BufferGeometry();
			const maxLines = PARTICLE_COUNT * MAX_CONNECTIONS_PER_PARTICLE;
			const linePositions = new Float32Array(maxLines * 2 * 3);
			const lineColors = new Float32Array(maxLines * 2 * 3);
			lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
			lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
			const lineMat = new THREE.LineBasicMaterial({
				vertexColors: true,
				transparent: true,
				opacity: .22,
				blending: THREE.AdditiveBlending,
				depthWrite: false
			});
			lines = new THREE.LineSegments(lineGeo, lineMat);
			scene.add(lines);
			const onMouseMove = (e) => {
				targetMouseX = e.clientX / window.innerWidth * 2 - 1;
				targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
			};
			window.addEventListener("mousemove", onMouseMove);
			const onResize = () => {
				if (!canvasContainer.value) return;
				const w2 = canvasContainer.value.clientWidth;
				const h2 = canvasContainer.value.clientHeight;
				camera.aspect = w2 / h2;
				camera.updateProjectionMatrix();
				renderer.setSize(w2, h2);
			};
			window.addEventListener("resize", onResize);
			let frameCount = 0;
			const worldMouse = new THREE.Vector3();
			const vec = new THREE.Vector3();
			const dir = new THREE.Vector3();
			const animate = () => {
				animationId = requestAnimationFrame(animate);
				const elapsed = (performance.now() - startTime) / 1e3;
				mouseX += (targetMouseX - mouseX) * .04;
				mouseY += (targetMouseY - mouseY) * .04;
				vec.set(mouseX, mouseY, .5);
				vec.unproject(camera);
				dir.copy(vec).sub(camera.position).normalize();
				const distance = -camera.position.z / dir.z;
				worldMouse.copy(camera.position).add(dir.multiplyScalar(distance));
				const posArr = particles.geometry.attributes.position.array;
				for (let i = 0; i < PARTICLE_COUNT; i++) {
					const ix = i * 3;
					const iy = i * 3 + 1;
					const iz = i * 3 + 2;
					const windX = Math.sin(elapsed * .25 + homePositions[ix] * .6) * .001 + Math.cos(elapsed * .18 + homePositions[iy] * .4) * 5e-4;
					const windY = Math.cos(elapsed * .22 + homePositions[ix] * .5) * 8e-4 + Math.sin(elapsed * .15 + homePositions[iz] * .3) * 3e-4;
					const dx = posArr[ix] - worldMouse.x;
					const dy = posArr[iy] - worldMouse.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					const repelRadius = 3;
					if (dist < repelRadius && dist > .01) {
						const force = (1 - dist / repelRadius) * .004;
						velocities[ix] += dx / dist * force;
						velocities[iy] += dy / dist * force;
					}
					velocities[ix] *= .965;
					velocities[iy] *= .965;
					velocities[iz] *= .965;
					posArr[ix] += velocities[ix] + windX;
					posArr[iy] += velocities[iy] + windY;
					posArr[iz] += velocities[iz];
					posArr[ix] += (homePositions[ix] - posArr[ix]) * .003;
					posArr[iy] += (homePositions[iy] - posArr[iy]) * .003;
					posArr[iz] += (homePositions[iz] - posArr[iz]) * .003;
				}
				particles.geometry.attributes.position.needsUpdate = true;
				frameCount++;
				if (frameCount % 2 === 0) {
					const linePos = lines.geometry.attributes.position.array;
					const lineCol = lines.geometry.attributes.color.array;
					let lineIdx = 0;
					for (let i = 0; i < PARTICLE_COUNT; i++) {
						let connections = 0;
						const ix = i * 3;
						const iy = i * 3 + 1;
						const iz = i * 3 + 2;
						for (let j = i + 1; j < PARTICLE_COUNT && connections < MAX_CONNECTIONS_PER_PARTICLE; j++) {
							const jx = j * 3;
							const jy = j * 3 + 1;
							const jz = j * 3 + 2;
							const dx = posArr[ix] - posArr[jx];
							const dy = posArr[iy] - posArr[jy];
							const dz = posArr[iz] - posArr[jz];
							const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
							if (dist < CONNECTION_MAX_DIST) {
								const alpha = 1 - dist / CONNECTION_MAX_DIST;
								const base = lineIdx * 6;
								linePos[base] = posArr[ix];
								linePos[base + 1] = posArr[iy];
								linePos[base + 2] = posArr[iz];
								linePos[base + 3] = posArr[jx];
								linePos[base + 4] = posArr[jy];
								linePos[base + 5] = posArr[jz];
								const r = .15 * alpha;
								const g = .75 * alpha;
								const b = .55 * alpha;
								lineCol[base] = r;
								lineCol[base + 1] = g;
								lineCol[base + 2] = b;
								lineCol[base + 3] = r;
								lineCol[base + 4] = g;
								lineCol[base + 5] = b;
								connections++;
								lineIdx++;
							}
						}
					}
					lines.geometry.setDrawRange(0, lineIdx * 2);
					lines.geometry.attributes.position.needsUpdate = true;
					lines.geometry.attributes.color.needsUpdate = true;
				}
				particles.material.uniforms.uTime.value = elapsed;
				renderer.render(scene, camera);
			};
			animate();
			renderer.userData = {
				onMouseMove,
				onResize
			};
		});
		onUnmounted(() => {
			if (animationId) cancelAnimationFrame(animationId);
			if (renderer) {
				const { onMouseMove, onResize } = renderer.userData || {};
				if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
				if (onResize) window.removeEventListener("resize", onResize);
				if (particles) {
					particles.geometry.dispose();
					particles.material.dispose();
				}
				if (lines) {
					lines.geometry.dispose();
					lines.material.dispose();
				}
				renderer.dispose();
				if (canvasContainer.value && renderer.domElement) canvasContainer.value.removeChild(renderer.domElement);
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "canvasContainer",
				ref: canvasContainer,
				class: "absolute inset-0 w-full h-full pointer-events-none z-[700]",
				"aria-hidden": "true"
			}, _attrs))}></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Map/MapParticleOverlay.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

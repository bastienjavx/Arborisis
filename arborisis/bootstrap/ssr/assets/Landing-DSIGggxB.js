import { n as usePlayerStore, t as _sfc_main$4 } from "./GuestLayout-30iBKZwO.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, defineAsyncComponent, mergeProps, onMounted, onUnmounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import * as THREE from "three";
//#region resources/js/Components/Three/ParticleField.vue
var _sfc_main$3 = {
	__name: "ParticleField",
	__ssrInlineRender: true,
	setup(__props) {
		const canvasContainer = ref(null);
		let renderer, scene, camera, particles, animationId;
		let clock = new THREE.Clock();
		const COLORS = [
			3462041,
			4876097,
			9414286,
			13935988
		];
		onMounted(() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (!canvasContainer.value) return;
			const width = canvasContainer.value.clientWidth;
			const height = canvasContainer.value.clientHeight;
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(60, width / height, .1, 100);
			camera.position.z = 5;
			renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true
			});
			renderer.setSize(width, height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setClearColor(0, 0);
			canvasContainer.value.appendChild(renderer.domElement);
			const particleCount = window.innerWidth < 768 ? 15 : 30;
			const positions = new Float32Array(particleCount * 3);
			const colors = new Float32Array(particleCount * 3);
			const sizes = new Float32Array(particleCount);
			const speeds = new Float32Array(particleCount);
			const colorObj = new THREE.Color();
			for (let i = 0; i < particleCount; i++) {
				positions[i * 3] = (Math.random() - .5) * 12;
				positions[i * 3 + 1] = (Math.random() - .5) * 8;
				positions[i * 3 + 2] = (Math.random() - .5) * 6;
				colorObj.setHex(COLORS[Math.floor(Math.random() * COLORS.length)]);
				colors[i * 3] = colorObj.r;
				colors[i * 3 + 1] = colorObj.g;
				colors[i * 3 + 2] = colorObj.b;
				sizes[i] = .03 + Math.random() * .06;
				speeds[i] = .2 + Math.random() * .5;
			}
			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
			geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
			geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
			const material = new THREE.ShaderMaterial({
				uniforms: { uTime: { value: 0 } },
				vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float uTime;
            void main() {
                vColor = color;
                vec3 pos = position;
                pos.y += sin(uTime * 0.3 + position.x) * 0.15;
                pos.x += cos(uTime * 0.2 + position.y) * 0.1;
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
				fragmentShader: `
            varying vec3 vColor;
            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
                gl_FragColor = vec4(vColor, alpha * 0.6);
            }
        `,
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending
			});
			particles = new THREE.Points(geometry, material);
			scene.add(particles);
			const onResize = () => {
				if (!canvasContainer.value) return;
				const w = canvasContainer.value.clientWidth;
				const h = canvasContainer.value.clientHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer.setSize(w, h);
			};
			window.addEventListener("resize", onResize);
			const animate = () => {
				animationId = requestAnimationFrame(animate);
				const elapsed = clock.getElapsedTime();
				material.uniforms.uTime.value = elapsed;
				renderer.render(scene, camera);
			};
			animate();
			renderer.userData = { onResize };
		});
		onUnmounted(() => {
			if (animationId) cancelAnimationFrame(animationId);
			if (renderer) {
				if (renderer.userData?.onResize) window.removeEventListener("resize", renderer.userData.onResize);
				if (particles) {
					particles.geometry.dispose();
					particles.material.dispose();
				}
				renderer.dispose();
				if (canvasContainer.value && renderer.domElement) canvasContainer.value.removeChild(renderer.domElement);
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "canvasContainer",
				ref: canvasContainer,
				class: "absolute inset-0 w-full h-full pointer-events-none",
				"aria-hidden": "true"
			}, _attrs))}></div>`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Three/ParticleField.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/SoundCard.vue
var _sfc_main$2 = {
	__name: "SoundCard",
	__ssrInlineRender: true,
	props: {
		sound: {
			type: Object,
			required: true
		},
		size: {
			type: String,
			default: "default"
		}
	},
	setup(__props) {
		const props = __props;
		const player = usePlayerStore();
		const isPlaying = computed(() => {
			return player.isPlaying && player.currentSound?.id === props.sound.id;
		});
		const formatDuration = (seconds) => {
			if (!seconds) return "--:--";
			return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["sound-card group relative overflow-hidden", __props.size === "compact" ? "rounded-xl" : "rounded-2xl"] }, _attrs))}><div class="relative aspect-[16/9] overflow-hidden bg-arbor-charcoal">`);
			if (__props.sound.cover_url) _push(`<img${ssrRenderAttr("src", __props.sound.cover_url)}${ssrRenderAttr("alt", `Couverture de ${__props.sound.title}`)} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">`);
			else _push(`<div class="w-full h-full flex items-center justify-center bg-arbor-deep"><svg class="w-10 h-10 text-arbor-moss/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg></div>`);
			_push(`<div class="absolute inset-0 bg-gradient-to-t from-arbor-night/80 via-transparent to-transparent"></div><button${ssrRenderAttr("aria-label", isPlaying.value ? `Mettre en pause ${__props.sound.title}` : `Lire ${__props.sound.title}`)} class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div class="w-14 h-14 rounded-full bg-arbor-emerald/90 hover:bg-arbor-emerald flex items-center justify-center shadow-lg shadow-arbor-emerald/20 transition-colors duration-200 active:scale-95">`);
			if (!isPlaying.value) _push(`<svg class="w-6 h-6 text-arbor-night ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>`);
			else _push(`<svg class="w-6 h-6 text-arbor-night" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path></svg>`);
			_push(`</div></button>`);
			if (__props.sound.category) _push(`<span class="absolute top-3 left-3 px-2 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider bg-arbor-night/60 backdrop-blur-sm text-arbor-sage border border-arbor-glass-border">${ssrInterpolate(__props.sound.category.name || __props.sound.category)}</span>`);
			else _push(`<!---->`);
			_push(`<span class="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[11px] font-mono bg-arbor-night/60 backdrop-blur-sm text-arbor-sage">${ssrInterpolate(formatDuration(__props.sound.duration))}</span></div><div class="p-4">`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("sounds.show", __props.sound.slug),
				class: "block font-medium text-arbor-cream text-sm truncate hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.sound.title)}`);
					else return [createTextVNode(toDisplayString(__props.sound.title), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<div class="flex items-center justify-between mt-1"><span class="text-xs text-arbor-sage truncate">${ssrInterpolate(__props.sound.user_name || __props.sound.user?.name || "Anonyme")}</span><div class="flex items-center gap-2 text-[11px] text-arbor-sage/70">`);
			if (__props.sound.play_count) _push(`<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(__props.sound.play_count)}</span>`);
			else _push(`<!---->`);
			if (__props.sound.like_count) _push(`<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> ${ssrInterpolate(__props.sound.like_count)}</span>`);
			else _push(`<!---->`);
			_push(`</div></div></div></div>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SoundCard.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/CreatorCard.vue
var _sfc_main$1 = {
	__name: "CreatorCard",
	__ssrInlineRender: true,
	props: {
		creator: {
			type: Object,
			required: true
		},
		featuredSound: {
			type: Object,
			default: null
		}
	},
	setup(__props) {
		const formatNumber = (num) => {
			if (!num) return "0";
			if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
			if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
			return num.toString();
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "creator-card group" }, _attrs))}><div class="flex items-center gap-4"><div class="shrink-0"><div class="w-16 h-16 rounded-full bg-arbor-moss/20 flex items-center justify-center text-xl font-display font-semibold text-arbor-emerald ring-2 ring-arbor-glass-border group-hover:ring-arbor-emerald/30 transition-all">`);
			if (__props.creator.avatar_url) _push(`<img${ssrRenderAttr("src", __props.creator.avatar_url)}${ssrRenderAttr("alt", `Avatar de ${__props.creator.name}`)} class="w-full h-full rounded-full object-cover" loading="lazy">`);
			else _push(`<span>${ssrInterpolate(__props.creator.name.charAt(0).toUpperCase())}</span>`);
			_push(`</div></div><div class="flex-1 min-w-0">`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("profile.show", __props.creator.id),
				class: "block font-medium text-arbor-cream truncate group-hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.creator.name)}`);
					else return [createTextVNode(toDisplayString(__props.creator.name), 1)];
				}),
				_: 1
			}, _parent));
			if (__props.creator.location) _push(`<p class="text-xs text-arbor-sage truncate mt-0.5">${ssrInterpolate(__props.creator.location)}</p>`);
			else _push(`<!---->`);
			_push(`<div class="flex items-center gap-3 mt-2 text-xs text-arbor-sage/70"><span class="flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg> ${ssrInterpolate(formatNumber(__props.creator.sounds_count || 0))} sons </span><span class="flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(formatNumber(__props.creator.total_plays || 0))} écoutes </span></div></div>`);
			if (__props.featuredSound) {
				_push(`<div class="hidden sm:block shrink-0 w-24">`);
				_push(ssrRenderComponent(unref(Link), {
					href: _ctx.route("sounds.show", __props.featuredSound.slug),
					class: "block relative aspect-square rounded-xl overflow-hidden bg-arbor-charcoal group/sound"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							if (__props.featuredSound.cover_url) _push(`<img${ssrRenderAttr("src", __props.featuredSound.cover_url)}${ssrRenderAttr("alt", __props.featuredSound.title)} class="w-full h-full object-cover group-hover/sound:scale-110 transition-transform duration-300" loading="lazy"${_scopeId}>`);
							else _push(`<!---->`);
							_push(`<div class="absolute inset-0 bg-arbor-night/40 flex items-center justify-center opacity-0 group-hover/sound:opacity-100 transition-opacity"${_scopeId}><svg class="w-6 h-6 text-arbor-cream" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M8 5v14l11-7z"${_scopeId}></path></svg></div>`);
						} else return [__props.featuredSound.cover_url ? (openBlock(), createBlock("img", {
							key: 0,
							src: __props.featuredSound.cover_url,
							alt: __props.featuredSound.title,
							class: "w-full h-full object-cover group-hover/sound:scale-110 transition-transform duration-300",
							loading: "lazy"
						}, null, 8, ["src", "alt"])) : createCommentVNode("", true), createVNode("div", { class: "absolute inset-0 bg-arbor-night/40 flex items-center justify-center opacity-0 group-hover/sound:opacity-100 transition-opacity" }, [(openBlock(), createBlock("svg", {
							class: "w-6 h-6 text-arbor-cream",
							fill: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", { d: "M8 5v14l11-7z" })]))])];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CreatorCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Landing.vue
var _sfc_main = {
	__name: "Landing",
	__ssrInlineRender: true,
	props: {
		stats: Object,
		featuredSounds: {
			type: Array,
			default: () => []
		},
		featuredCreators: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const SoundMap = defineAsyncComponent(() => import("./SoundMap-Dkn5yrWT.js"));
		const props = __props;
		const featuredSounds = ref(props.featuredSounds);
		const featuredCreators = ref(props.featuredCreators);
		const soundsLoading = ref(props.featuredSounds.length === 0);
		const creatorsLoading = ref(props.featuredCreators.length === 0);
		ref([
			{
				title: "Carte sonore interactive",
				description: "Explorez une carte mondiale des enregistrements naturels, filtrez par environnement et découvrez des sons uniques.",
				icon: "M9 6.75002V15M15 9.00002V17.25M15.5031 20.7485L20.3781 18.311C20.7592 18.1204 21 17.7309 21 17.3047V4.82031C21 3.98401 20.1199 3.44007 19.3719 3.81408L15.5031 5.74847C15.1864 5.90683 14.8136 5.90683 14.4969 5.74847L9.50312 3.25158C9.1864 3.09322 8.8136 3.09322 8.49688 3.25158L3.62188 5.68908C3.24075 5.87965 3 6.26919 3 6.69531V19.1797C3 20.016 3.8801 20.56 4.62811 20.186L8.49688 18.2516C8.8136 18.0932 9.1864 18.0932 9.50312 18.2516L14.4969 20.7485C14.8136 20.9068 15.1864 20.9068 15.5031 20.7485Z"
			},
			{
				title: "Lecteur audio immersif",
				description: "Écoutez chaque son dans un lecteur premium avec visualisation, contrôles intuitifs et expérience contemplative.",
				icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			},
			{
				title: "Soutenez les créateurs",
				description: "Avec les crédits ECHO, soutenez financièrement les enregistreurs et contribuez à l'archive sonore collective.",
				icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
			}
		]);
		const steps = ref([
			{
				number: "01",
				title: "Explorez",
				description: "Naviguez sur la carte ou parcourez les catégories pour découvrir des paysages sonores uniques.",
				icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7"
			},
			{
				number: "02",
				title: "Écoutez",
				description: "Lancez la lecture et laissez-vous transporter par les sons de la nature, capturés avec passion.",
				icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			},
			{
				number: "03",
				title: "Partagez",
				description: "Publiez vos propres enregistrements et soutenez les créateurs qui enrichissent l'archive.",
				icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
			}
		]);
		const categories = ref([
			{
				name: "Forêts",
				count: 0,
				color: "bg-emerald-500/20 text-emerald-400"
			},
			{
				name: "Océans",
				count: 0,
				color: "bg-blue-500/20 text-blue-400"
			},
			{
				name: "Montagnes",
				count: 0,
				color: "bg-stone-500/20 text-stone-400"
			},
			{
				name: "Rivières",
				count: 0,
				color: "bg-cyan-500/20 text-cyan-400"
			},
			{
				name: "Pluie",
				count: 0,
				color: "bg-indigo-500/20 text-indigo-400"
			},
			{
				name: "Crépuscule",
				count: 0,
				color: "bg-amber-500/20 text-amber-400"
			}
		]);
		const mapSounds = ref([]);
		const mapLoading = ref(true);
		const mapError = ref(false);
		const animatedStats = ref({
			sounds: 0,
			creators: 0,
			countries: 0
		});
		const statsVisible = ref(false);
		let statsObserver = null;
		const prefersReducedMotion = ref(false);
		const animateCount = (target, key, duration = 1500) => {
			if (prefersReducedMotion.value) {
				animatedStats.value[key] = target;
				return;
			}
			const start = performance.now();
			const from = 0;
			const to = target;
			const step = (now) => {
				const progress = Math.min((now - start) / duration, 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				animatedStats.value[key] = Math.floor(from + (to - from) * eased);
				if (progress < 1) requestAnimationFrame(step);
			};
			requestAnimationFrame(step);
		};
		const loadFeaturedSounds = async () => {
			if (featuredSounds.value.length > 0) {
				soundsLoading.value = false;
				return;
			}
			try {
				const response = await fetch("/api/sounds/featured");
				if (!response.ok) throw new Error("Failed to fetch sounds");
				featuredSounds.value = await response.json();
			} catch (e) {
				console.error("Failed to load featured sounds:", e);
			} finally {
				soundsLoading.value = false;
			}
		};
		const loadFeaturedCreators = async () => {
			if (featuredCreators.value.length > 0) {
				creatorsLoading.value = false;
				return;
			}
			try {
				const response = await fetch("/api/creators/featured");
				if (!response.ok) throw new Error("Failed to fetch creators");
				featuredCreators.value = await response.json();
			} catch (e) {
				console.error("Failed to load featured creators:", e);
			} finally {
				creatorsLoading.value = false;
			}
		};
		onMounted(() => {
			prefersReducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			loadMapSounds();
			loadFeaturedSounds();
			loadFeaturedCreators();
			const statsEl = document.getElementById("stats-section");
			if (statsEl) {
				statsObserver = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && !statsVisible.value) {
							statsVisible.value = true;
							animateCount(props.stats.sounds, "sounds");
							animateCount(props.stats.creators, "creators");
							animateCount(props.stats.countries, "countries");
						}
					});
				}, { threshold: .3 });
				statsObserver.observe(statsEl);
			}
		});
		onUnmounted(() => {
			if (statsObserver) statsObserver.disconnect();
		});
		const loadMapSounds = async () => {
			try {
				mapSounds.value = (await (await fetch("/api/map/sounds?limit=50")).json()).features ?? [];
			} catch (e) {
				console.error("Failed to load map sounds:", e);
				mapError.value = true;
			} finally {
				mapLoading.value = false;
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "L'archive sonore du monde vivant" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$4, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<section class="relative min-h-screen flex items-center justify-center overflow-hidden"${_scopeId}><img src="/images/hero-leaf.webp" alt="" class="absolute inset-0 w-full h-full object-cover animate-ken-burns" style="${ssrRenderStyle({ "filter": "brightness(0.55) contrast(1.15) saturate(0.8)" })}" fetchpriority="high" decoding="async"${_scopeId}><div class="absolute inset-0 bg-arbor-night/70"${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-t from-arbor-night via-transparent to-arbor-night/40"${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-br from-arbor-emerald/10 via-transparent to-arbor-night/60"${_scopeId}></div><div class="absolute inset-0 pointer-events-none" style="${ssrRenderStyle({ "background": "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(2, 15, 8, 0.7) 100%)" })}"${_scopeId}></div><div class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style="${ssrRenderStyle({
							"background-image": "url('data:image/svg+xml,%3Csvg viewBox=%220 0 512 512%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%225%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
							"background-repeat": "repeat"
						})}"${_scopeId}></div><div class="absolute inset-0 bg-hero-glow opacity-40"${_scopeId}></div>`);
						_push(ssrRenderComponent(_sfc_main$3, null, null, _parent, _scopeId));
						_push(`<div class="absolute inset-0 opacity-[0.02] pointer-events-none" style="${ssrRenderStyle({ "background": "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)" })}"${_scopeId}></div><div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"${_scopeId}><h1 class="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-arbor-cream leading-tight mb-6 animate-slide-up"${_scopeId}> L&#39;archive sonore<br${_scopeId}><span class="text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss"${_scopeId}>du monde vivant</span></h1><p class="text-lg sm:text-xl text-arbor-sage max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.1s" })}"${_scopeId}> Explorez, écoutez et préservez les sons de la nature, capturés par une communauté de field recorders passionnés. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/map",
							class: "btn-primary text-base px-8 py-4 w-full sm:w-auto group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"${_scopeId}></path></svg> Explorer la carte sonore `);
								else return [(openBlock(), createBlock("svg", {
									class: "w-5 h-5 mr-2 transition-transform group-hover:scale-110",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
								}), createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
								})])), createTextVNode(" Explorer la carte sonore ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: "/sounds",
							class: "btn-secondary text-base px-8 py-4 w-full sm:w-auto group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Écouter les derniers sons `);
								else return [(openBlock(), createBlock("svg", {
									class: "w-5 h-5 mr-2 transition-transform group-hover:scale-110",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								})])), createTextVNode(" Écouter les derniers sons ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div><div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"${_scopeId}><svg class="w-6 h-6 text-arbor-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"${_scopeId}></path></svg></div></section><section id="stats-section" class="py-20 border-y border-arbor-glass-border bg-arbor-deep/50"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-3 gap-8"${_scopeId}><div class="text-center group"${_scopeId}><div class="font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110"${_scopeId}>${ssrInterpolate(animatedStats.value.sounds)}+ </div><div class="text-arbor-sage text-sm"${_scopeId}>Sons naturels</div></div><div class="text-center group"${_scopeId}><div class="font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110"${_scopeId}>${ssrInterpolate(animatedStats.value.creators)}+ </div><div class="text-arbor-sage text-sm"${_scopeId}>Créateurs</div></div><div class="text-center group"${_scopeId}><div class="font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110"${_scopeId}>${ssrInterpolate(animatedStats.value.countries)}+ </div><div class="text-arbor-sage text-sm"${_scopeId}>Pays</div></div></div></div></section><section class="py-24"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center mb-16"${_scopeId}><h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4"${_scopeId}> Écoutez avant d&#39;explorer </h2><p class="text-arbor-sage max-w-xl mx-auto"${_scopeId}> Une sélection de sons récents pour vous transporter immédiatement dans la nature. </p></div>`);
						if (soundsLoading.value) {
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(6, (n) => {
								_push(`<div class="glass-card overflow-hidden animate-pulse"${_scopeId}><div class="aspect-[16/9] bg-arbor-charcoal/60"${_scopeId}></div><div class="p-4 space-y-3"${_scopeId}><div class="h-4 bg-arbor-charcoal/60 rounded w-3/4"${_scopeId}></div><div class="h-3 bg-arbor-charcoal/60 rounded w-1/2"${_scopeId}></div></div></div>`);
							});
							_push(`<!--]--></div>`);
						} else if (featuredSounds.value.length > 0) {
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(featuredSounds.value, (sound) => {
								_push(ssrRenderComponent(_sfc_main$2, {
									key: sound.id,
									sound
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else {
							_push(`<div class="text-center py-16"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4"${_scopeId}><svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div><h3 class="font-display text-lg text-arbor-cream mb-2"${_scopeId}>L&#39;archive s&#39;éveille</h3><p class="text-arbor-sage max-w-sm mx-auto mb-6"${_scopeId}> Les premiers enregistrements arrivent. Soyez parmi les premiers à capturer et partager les sons de la nature. </p>`);
							_push(ssrRenderComponent(unref(Link), {
								href: "/record",
								class: "btn-primary inline-flex items-center gap-2"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"${_scopeId}></path></svg> Enregistrer un son `);
									else return [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
									})])), createTextVNode(" Enregistrer un son ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						}
						_push(`<div class="text-center mt-10"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/sounds",
							class: "btn-secondary inline-flex items-center gap-2 group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Découvrir tous les sons <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg>`);
								else return [createTextVNode(" Découvrir tous les sons "), (openBlock(), createBlock("svg", {
									class: "w-4 h-4 transition-transform group-hover:translate-x-1",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 8l4 4m0 0l-4 4m4-4H3"
								})]))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div></section><section class="py-24 bg-arbor-deep/30"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"${_scopeId}><div${_scopeId}><h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-6"${_scopeId}> Explorez le monde<br${_scopeId}>à travers le son </h2><p class="text-arbor-sage mb-8 leading-relaxed"${_scopeId}> Chaque point sur la carte représente un moment capturé dans la nature : le chant d&#39;un oiseau à l&#39;aube, le murmure d&#39;une rivière, le vent dans les cimes. Naviguez, filtrez et plongez dans l&#39;acoustique des paysages. </p><div class="flex flex-wrap gap-3 mb-8"${_scopeId}><!--[-->`);
						ssrRenderList(categories.value, (cat) => {
							_push(`<span class="${ssrRenderClass([cat.color, "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 hover:scale-105 cursor-default"])}"${_scopeId}>${ssrInterpolate(cat.name)}</span>`);
						});
						_push(`<!--]--></div>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/map",
							class: "btn-primary group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Ouvrir la carte <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg>`);
								else return [createTextVNode(" Ouvrir la carte "), (openBlock(), createBlock("svg", {
									class: "w-4 h-4 ml-2 transition-transform group-hover:translate-x-1",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 8l4 4m0 0l-4 4m4-4H3"
								})]))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div class="glass-card aspect-[16/9] relative overflow-hidden rounded-2xl border border-arbor-glass-border hover-lift group"${_scopeId}>`);
						if (mapLoading.value) _push(`<div class="absolute inset-0 flex flex-col items-center justify-center bg-arbor-deep/80 z-10"${_scopeId}><div class="w-10 h-10 border-2 border-arbor-emerald/30 border-t-arbor-emerald rounded-full animate-spin mb-4"${_scopeId}></div><p class="text-arbor-sage text-sm"${_scopeId}>Chargement de la carte...</p></div>`);
						else _push(ssrRenderComponent(unref(SoundMap), {
							sounds: mapSounds.value,
							"initial-zoom": 2,
							"initial-center": [25, 10]
						}, null, _parent, _scopeId));
						_push(`<div class="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/5"${_scopeId}></div>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/map",
							class: "absolute inset-0 bg-arbor-night/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<span class="btn-primary"${_scopeId}> Ouvrir la carte en plein écran </span>`);
								else return [createVNode("span", { class: "btn-primary" }, " Ouvrir la carte en plein écran ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div></div></section><section class="py-24"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center mb-16"${_scopeId}><h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4"${_scopeId}> Comment ça marche </h2><p class="text-arbor-sage max-w-xl mx-auto"${_scopeId}> Arborisis est simple. Trois étapes pour explorer et partager le monde sonore. </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"${_scopeId}><!--[-->`);
						ssrRenderList(steps.value, (step, index) => {
							_push(`<div class="glass-card p-8 text-center hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 transition-all duration-300" style="${ssrRenderStyle(`animation: fadeInUp 0.6s ease-out forwards; animation-delay: ${index * .15}s; opacity: 0;`)}"${_scopeId}><div class="font-display text-5xl text-arbor-emerald/20 font-bold mb-4"${_scopeId}>${ssrInterpolate(step.number)}</div><div class="w-12 h-12 rounded-xl bg-arbor-moss/20 flex items-center justify-center mx-auto mb-6"${_scopeId}><svg class="w-6 h-6 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", step.icon)}${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-arbor-cream mb-3"${_scopeId}>${ssrInterpolate(step.title)}</h3><p class="text-arbor-sage text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(step.description)}</p></div>`);
						});
						_push(`<!--]--></div></div></section><section class="py-24 bg-arbor-deep/30 border-y border-arbor-glass-border"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center mb-16"${_scopeId}><h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4"${_scopeId}> Créateurs en avant </h2><p class="text-arbor-sage max-w-xl mx-auto"${_scopeId}> Rencontrez les enregistreurs qui donnent vie à l&#39;archive. </p></div>`);
						if (creatorsLoading.value) {
							_push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(3, (n) => {
								_push(`<div class="glass-card p-6 animate-pulse"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-16 h-16 rounded-full bg-arbor-charcoal/60 shrink-0"${_scopeId}></div><div class="flex-1 space-y-2"${_scopeId}><div class="h-4 bg-arbor-charcoal/60 rounded w-2/3"${_scopeId}></div><div class="h-3 bg-arbor-charcoal/60 rounded w-1/2"${_scopeId}></div></div></div></div>`);
							});
							_push(`<!--]--></div>`);
						} else if (featuredCreators.value.length > 0) {
							_push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(featuredCreators.value, (creator) => {
								_push(ssrRenderComponent(_sfc_main$1, {
									key: creator.id,
									creator,
									"featured-sound": creator.featured_sound
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else {
							_push(`<div class="text-center py-16"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4"${_scopeId}><svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"${_scopeId}></path></svg></div><h3 class="font-display text-lg text-arbor-cream mb-2"${_scopeId}>Les pionniers de l&#39;écoute</h3><p class="text-arbor-sage max-w-sm mx-auto mb-6"${_scopeId}> Les premiers créateurs rejoindront bientôt l&#39;archive. Devenez l&#39;un d&#39;entre eux et faites entendre votre territoire. </p>`);
							_push(ssrRenderComponent(unref(Link), {
								href: "/register",
								class: "btn-primary inline-flex items-center gap-2"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"${_scopeId}></path></svg> Rejoindre la communauté `);
									else return [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
									})])), createTextVNode(" Rejoindre la communauté ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						}
						if (featuredCreators.value.length > 0) {
							_push(`<div class="text-center mt-10"${_scopeId}>`);
							_push(ssrRenderComponent(unref(Link), {
								href: "/creators",
								class: "btn-secondary inline-flex items-center gap-2 group"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Voir tous les créateurs <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg>`);
									else return [createTextVNode(" Voir tous les créateurs "), (openBlock(), createBlock("svg", {
										class: "w-4 h-4 transition-transform group-hover:translate-x-1",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M17 8l4 4m0 0l-4 4m4-4H3"
									})]))];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</div></section><section class="py-24"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"${_scopeId}><div class="glass-card p-12 relative overflow-hidden hover-lift"${_scopeId}><div class="absolute top-0 right-0 w-64 h-64 bg-arbor-moss/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"${_scopeId}></div><div class="relative z-10"${_scopeId}><div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-arbor-emerald/20 mb-6 animate-glow-pulse"${_scopeId}><span class="text-2xl font-display font-bold text-arbor-emerald"${_scopeId}>E</span></div><h2 class="font-display text-3xl font-bold text-arbor-cream mb-4"${_scopeId}> Soutenez avec ECHO </h2><p class="text-arbor-sage mb-8 max-w-lg mx-auto leading-relaxed"${_scopeId}> Les crédits ECHO vous permettent de soutenir directement les créateurs qui capturent et partagent les sons de la nature. Un geste simple, un impact réel. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/echo",
							class: "btn-primary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Découvrir ECHO `);
								else return [createTextVNode(" Découvrir ECHO ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<span class="text-xs text-arbor-sage"${_scopeId}> Pas une cryptomonnaie. Pas un investissement. </span></div></div></div></div></section><section class="py-24 bg-arbor-deep/30 border-y border-arbor-glass-border"${_scopeId}><div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"${_scopeId}><h2 class="font-display text-3xl font-bold text-arbor-cream mb-6"${_scopeId}> Préserver l&#39;écoute du monde vivant </h2><p class="text-arbor-sage leading-relaxed mb-8"${_scopeId}> Arborisis naît d&#39;une conviction : les paysages sonores naturels sont un patrimoine fragile méritant d&#39;être documenté, partagé et protégé. En donnant une voix aux espaces silencieux, nous espérons susciter une écologie de l&#39;attention et une reconnaissance envers ceux qui consacrent leur temps à capturer ces instants éphémères. </p><div class="flex items-center justify-center gap-2 text-arbor-emerald text-sm"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"${_scopeId}></path></svg><span${_scopeId}>Respect de la nature. Confidentialité des lieux sensibles. Transparence.</span></div></div></section><section class="py-24"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"${_scopeId}><h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-6"${_scopeId}> Rejoignez la communauté </h2><p class="text-arbor-sage mb-10 max-w-xl mx-auto"${_scopeId}> Créez votre profil, publiez vos premiers enregistrements et connectez-vous avec d&#39;autres passionnés de sons naturels. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/register",
							class: "btn-primary text-base px-8 py-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Créer un compte gratuit `);
								else return [createTextVNode(" Créer un compte gratuit ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: "/login",
							class: "btn-secondary text-base px-8 py-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` J&#39;ai déjà un compte `);
								else return [createTextVNode(" J'ai déjà un compte ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div></section>`);
					} else return [
						createVNode("section", { class: "relative min-h-screen flex items-center justify-center overflow-hidden" }, [
							createVNode("img", {
								src: "/images/hero-leaf.webp",
								alt: "",
								class: "absolute inset-0 w-full h-full object-cover animate-ken-burns",
								style: { "filter": "brightness(0.55) contrast(1.15) saturate(0.8)" },
								fetchpriority: "high",
								decoding: "async"
							}),
							createVNode("div", { class: "absolute inset-0 bg-arbor-night/70" }),
							createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-arbor-night via-transparent to-arbor-night/40" }),
							createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-arbor-emerald/10 via-transparent to-arbor-night/60" }),
							createVNode("div", {
								class: "absolute inset-0 pointer-events-none",
								style: { "background": "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(2, 15, 8, 0.7) 100%)" }
							}),
							createVNode("div", {
								class: "absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay",
								style: {
									"background-image": "url('data:image/svg+xml,%3Csvg viewBox=%220 0 512 512%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%225%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
									"background-repeat": "repeat"
								}
							}),
							createVNode("div", { class: "absolute inset-0 bg-hero-glow opacity-40" }),
							createVNode(_sfc_main$3),
							createVNode("div", {
								class: "absolute inset-0 opacity-[0.02] pointer-events-none",
								style: { "background": "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)" }
							}),
							createVNode("div", { class: "relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [
								createVNode("h1", { class: "font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-arbor-cream leading-tight mb-6 animate-slide-up" }, [
									createTextVNode(" L'archive sonore"),
									createVNode("br"),
									createVNode("span", { class: "text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss" }, "du monde vivant")
								]),
								createVNode("p", {
									class: "text-lg sm:text-xl text-arbor-sage max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up",
									style: { "animation-delay": "0.1s" }
								}, " Explorez, écoutez et préservez les sons de la nature, capturés par une communauté de field recorders passionnés. "),
								createVNode("div", {
									class: "flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up",
									style: { "animation-delay": "0.2s" }
								}, [createVNode(unref(Link), {
									href: "/map",
									class: "btn-primary text-base px-8 py-4 w-full sm:w-auto group"
								}, {
									default: withCtx(() => [(openBlock(), createBlock("svg", {
										class: "w-5 h-5 mr-2 transition-transform group-hover:scale-110",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
									}), createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
									})])), createTextVNode(" Explorer la carte sonore ")]),
									_: 1
								}), createVNode(unref(Link), {
									href: "/sounds",
									class: "btn-secondary text-base px-8 py-4 w-full sm:w-auto group"
								}, {
									default: withCtx(() => [(openBlock(), createBlock("svg", {
										class: "w-5 h-5 mr-2 transition-transform group-hover:scale-110",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									})])), createTextVNode(" Écouter les derniers sons ")]),
									_: 1
								})])
							]),
							createVNode("div", { class: "absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" }, [(openBlock(), createBlock("svg", {
								class: "w-6 h-6 text-arbor-sage",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M19 14l-7 7m0 0l-7-7m7 7V3"
							})]))])
						]),
						createVNode("section", {
							id: "stats-section",
							class: "py-20 border-y border-arbor-glass-border bg-arbor-deep/50"
						}, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-8" }, [
							createVNode("div", { class: "text-center group" }, [createVNode("div", { class: "font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110" }, toDisplayString(animatedStats.value.sounds) + "+ ", 1), createVNode("div", { class: "text-arbor-sage text-sm" }, "Sons naturels")]),
							createVNode("div", { class: "text-center group" }, [createVNode("div", { class: "font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110" }, toDisplayString(animatedStats.value.creators) + "+ ", 1), createVNode("div", { class: "text-arbor-sage text-sm" }, "Créateurs")]),
							createVNode("div", { class: "text-center group" }, [createVNode("div", { class: "font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110" }, toDisplayString(animatedStats.value.countries) + "+ ", 1), createVNode("div", { class: "text-arbor-sage text-sm" }, "Pays")])
						])])]),
						createVNode("section", { class: "py-24" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
							createVNode("div", { class: "text-center mb-16" }, [createVNode("h2", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4" }, " Écoutez avant d'explorer "), createVNode("p", { class: "text-arbor-sage max-w-xl mx-auto" }, " Une sélection de sons récents pour vous transporter immédiatement dans la nature. ")]),
							soundsLoading.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
							}, [(openBlock(), createBlock(Fragment, null, renderList(6, (n) => {
								return createVNode("div", {
									key: n,
									class: "glass-card overflow-hidden animate-pulse"
								}, [createVNode("div", { class: "aspect-[16/9] bg-arbor-charcoal/60" }), createVNode("div", { class: "p-4 space-y-3" }, [createVNode("div", { class: "h-4 bg-arbor-charcoal/60 rounded w-3/4" }), createVNode("div", { class: "h-3 bg-arbor-charcoal/60 rounded w-1/2" })])]);
							}), 64))])) : featuredSounds.value.length > 0 ? (openBlock(), createBlock("div", {
								key: 1,
								class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(featuredSounds.value, (sound) => {
								return openBlock(), createBlock(_sfc_main$2, {
									key: sound.id,
									sound
								}, null, 8, ["sound"]);
							}), 128))])) : (openBlock(), createBlock("div", {
								key: 2,
								class: "text-center py-16"
							}, [
								createVNode("div", { class: "w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4" }, [(openBlock(), createBlock("svg", {
									class: "w-8 h-8 text-arbor-moss/40",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1",
									d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
								})]))]),
								createVNode("h3", { class: "font-display text-lg text-arbor-cream mb-2" }, "L'archive s'éveille"),
								createVNode("p", { class: "text-arbor-sage max-w-sm mx-auto mb-6" }, " Les premiers enregistrements arrivent. Soyez parmi les premiers à capturer et partager les sons de la nature. "),
								createVNode(unref(Link), {
									href: "/record",
									class: "btn-primary inline-flex items-center gap-2"
								}, {
									default: withCtx(() => [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
									})])), createTextVNode(" Enregistrer un son ")]),
									_: 1
								})
							])),
							createVNode("div", { class: "text-center mt-10" }, [createVNode(unref(Link), {
								href: "/sounds",
								class: "btn-secondary inline-flex items-center gap-2 group"
							}, {
								default: withCtx(() => [createTextVNode(" Découvrir tous les sons "), (openBlock(), createBlock("svg", {
									class: "w-4 h-4 transition-transform group-hover:translate-x-1",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 8l4 4m0 0l-4 4m4-4H3"
								})]))]),
								_: 1
							})])
						])]),
						createVNode("section", { class: "py-24 bg-arbor-deep/30" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" }, [createVNode("div", null, [
							createVNode("h2", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-6" }, [
								createTextVNode(" Explorez le monde"),
								createVNode("br"),
								createTextVNode("à travers le son ")
							]),
							createVNode("p", { class: "text-arbor-sage mb-8 leading-relaxed" }, " Chaque point sur la carte représente un moment capturé dans la nature : le chant d'un oiseau à l'aube, le murmure d'une rivière, le vent dans les cimes. Naviguez, filtrez et plongez dans l'acoustique des paysages. "),
							createVNode("div", { class: "flex flex-wrap gap-3 mb-8" }, [(openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
								return openBlock(), createBlock("span", {
									key: cat.name,
									class: ["px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 hover:scale-105 cursor-default", cat.color]
								}, toDisplayString(cat.name), 3);
							}), 128))]),
							createVNode(unref(Link), {
								href: "/map",
								class: "btn-primary group"
							}, {
								default: withCtx(() => [createTextVNode(" Ouvrir la carte "), (openBlock(), createBlock("svg", {
									class: "w-4 h-4 ml-2 transition-transform group-hover:translate-x-1",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 8l4 4m0 0l-4 4m4-4H3"
								})]))]),
								_: 1
							})
						]), createVNode("div", { class: "glass-card aspect-[16/9] relative overflow-hidden rounded-2xl border border-arbor-glass-border hover-lift group" }, [
							mapLoading.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "absolute inset-0 flex flex-col items-center justify-center bg-arbor-deep/80 z-10"
							}, [createVNode("div", { class: "w-10 h-10 border-2 border-arbor-emerald/30 border-t-arbor-emerald rounded-full animate-spin mb-4" }), createVNode("p", { class: "text-arbor-sage text-sm" }, "Chargement de la carte...")])) : (openBlock(), createBlock(unref(SoundMap), {
								key: 1,
								sounds: mapSounds.value,
								"initial-zoom": 2,
								"initial-center": [25, 10]
							}, null, 8, ["sounds"])),
							createVNode("div", { class: "absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/5" }),
							createVNode(unref(Link), {
								href: "/map",
								class: "absolute inset-0 bg-arbor-night/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							}, {
								default: withCtx(() => [createVNode("span", { class: "btn-primary" }, " Ouvrir la carte en plein écran ")]),
								_: 1
							})
						])])])]),
						createVNode("section", { class: "py-24" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "text-center mb-16" }, [createVNode("h2", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4" }, " Comment ça marche "), createVNode("p", { class: "text-arbor-sage max-w-xl mx-auto" }, " Arborisis est simple. Trois étapes pour explorer et partager le monde sonore. ")]), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-8" }, [(openBlock(true), createBlock(Fragment, null, renderList(steps.value, (step, index) => {
							return openBlock(), createBlock("div", {
								key: step.number,
								class: "glass-card p-8 text-center hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 transition-all duration-300",
								style: `animation: fadeInUp 0.6s ease-out forwards; animation-delay: ${index * .15}s; opacity: 0;`
							}, [
								createVNode("div", { class: "font-display text-5xl text-arbor-emerald/20 font-bold mb-4" }, toDisplayString(step.number), 1),
								createVNode("div", { class: "w-12 h-12 rounded-xl bg-arbor-moss/20 flex items-center justify-center mx-auto mb-6" }, [(openBlock(), createBlock("svg", {
									class: "w-6 h-6 text-arbor-emerald",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: step.icon
								}, null, 8, ["d"])]))]),
								createVNode("h3", { class: "text-lg font-semibold text-arbor-cream mb-3" }, toDisplayString(step.title), 1),
								createVNode("p", { class: "text-arbor-sage text-sm leading-relaxed" }, toDisplayString(step.description), 1)
							], 4);
						}), 128))])])]),
						createVNode("section", { class: "py-24 bg-arbor-deep/30 border-y border-arbor-glass-border" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
							createVNode("div", { class: "text-center mb-16" }, [createVNode("h2", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4" }, " Créateurs en avant "), createVNode("p", { class: "text-arbor-sage max-w-xl mx-auto" }, " Rencontrez les enregistreurs qui donnent vie à l'archive. ")]),
							creatorsLoading.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "grid grid-cols-1 lg:grid-cols-3 gap-6"
							}, [(openBlock(), createBlock(Fragment, null, renderList(3, (n) => {
								return createVNode("div", {
									key: n,
									class: "glass-card p-6 animate-pulse"
								}, [createVNode("div", { class: "flex items-center gap-4" }, [createVNode("div", { class: "w-16 h-16 rounded-full bg-arbor-charcoal/60 shrink-0" }), createVNode("div", { class: "flex-1 space-y-2" }, [createVNode("div", { class: "h-4 bg-arbor-charcoal/60 rounded w-2/3" }), createVNode("div", { class: "h-3 bg-arbor-charcoal/60 rounded w-1/2" })])])]);
							}), 64))])) : featuredCreators.value.length > 0 ? (openBlock(), createBlock("div", {
								key: 1,
								class: "grid grid-cols-1 lg:grid-cols-3 gap-6"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(featuredCreators.value, (creator) => {
								return openBlock(), createBlock(_sfc_main$1, {
									key: creator.id,
									creator,
									"featured-sound": creator.featured_sound
								}, null, 8, ["creator", "featured-sound"]);
							}), 128))])) : (openBlock(), createBlock("div", {
								key: 2,
								class: "text-center py-16"
							}, [
								createVNode("div", { class: "w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4" }, [(openBlock(), createBlock("svg", {
									class: "w-8 h-8 text-arbor-moss/40",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1",
									d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
								})]))]),
								createVNode("h3", { class: "font-display text-lg text-arbor-cream mb-2" }, "Les pionniers de l'écoute"),
								createVNode("p", { class: "text-arbor-sage max-w-sm mx-auto mb-6" }, " Les premiers créateurs rejoindront bientôt l'archive. Devenez l'un d'entre eux et faites entendre votre territoire. "),
								createVNode(unref(Link), {
									href: "/register",
									class: "btn-primary inline-flex items-center gap-2"
								}, {
									default: withCtx(() => [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
									})])), createTextVNode(" Rejoindre la communauté ")]),
									_: 1
								})
							])),
							featuredCreators.value.length > 0 ? (openBlock(), createBlock("div", {
								key: 3,
								class: "text-center mt-10"
							}, [createVNode(unref(Link), {
								href: "/creators",
								class: "btn-secondary inline-flex items-center gap-2 group"
							}, {
								default: withCtx(() => [createTextVNode(" Voir tous les créateurs "), (openBlock(), createBlock("svg", {
									class: "w-4 h-4 transition-transform group-hover:translate-x-1",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 8l4 4m0 0l-4 4m4-4H3"
								})]))]),
								_: 1
							})])) : createCommentVNode("", true)
						])]),
						createVNode("section", { class: "py-24" }, [createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [createVNode("div", { class: "glass-card p-12 relative overflow-hidden hover-lift" }, [createVNode("div", { class: "absolute top-0 right-0 w-64 h-64 bg-arbor-moss/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" }), createVNode("div", { class: "relative z-10" }, [
							createVNode("div", { class: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-arbor-emerald/20 mb-6 animate-glow-pulse" }, [createVNode("span", { class: "text-2xl font-display font-bold text-arbor-emerald" }, "E")]),
							createVNode("h2", { class: "font-display text-3xl font-bold text-arbor-cream mb-4" }, " Soutenez avec ECHO "),
							createVNode("p", { class: "text-arbor-sage mb-8 max-w-lg mx-auto leading-relaxed" }, " Les crédits ECHO vous permettent de soutenir directement les créateurs qui capturent et partagent les sons de la nature. Un geste simple, un impact réel. "),
							createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-center gap-4" }, [createVNode(unref(Link), {
								href: "/echo",
								class: "btn-primary"
							}, {
								default: withCtx(() => [createTextVNode(" Découvrir ECHO ")]),
								_: 1
							}), createVNode("span", { class: "text-xs text-arbor-sage" }, " Pas une cryptomonnaie. Pas un investissement. ")])
						])])])]),
						createVNode("section", { class: "py-24 bg-arbor-deep/30 border-y border-arbor-glass-border" }, [createVNode("div", { class: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [
							createVNode("h2", { class: "font-display text-3xl font-bold text-arbor-cream mb-6" }, " Préserver l'écoute du monde vivant "),
							createVNode("p", { class: "text-arbor-sage leading-relaxed mb-8" }, " Arborisis naît d'une conviction : les paysages sonores naturels sont un patrimoine fragile méritant d'être documenté, partagé et protégé. En donnant une voix aux espaces silencieux, nous espérons susciter une écologie de l'attention et une reconnaissance envers ceux qui consacrent leur temps à capturer ces instants éphémères. "),
							createVNode("div", { class: "flex items-center justify-center gap-2 text-arbor-emerald text-sm" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
							})])), createVNode("span", null, "Respect de la nature. Confidentialité des lieux sensibles. Transparence.")])
						])]),
						createVNode("section", { class: "py-24" }, [createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [
							createVNode("h2", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-6" }, " Rejoignez la communauté "),
							createVNode("p", { class: "text-arbor-sage mb-10 max-w-xl mx-auto" }, " Créez votre profil, publiez vos premiers enregistrements et connectez-vous avec d'autres passionnés de sons naturels. "),
							createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-center gap-4" }, [createVNode(unref(Link), {
								href: "/register",
								class: "btn-primary text-base px-8 py-4"
							}, {
								default: withCtx(() => [createTextVNode(" Créer un compte gratuit ")]),
								_: 1
							}), createVNode(unref(Link), {
								href: "/login",
								class: "btn-secondary text-base px-8 py-4"
							}, {
								default: withCtx(() => [createTextVNode(" J'ai déjà un compte ")]),
								_: 1
							})])
						])])
					];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Landing.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

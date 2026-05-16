import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-sK8SLxpB.js";
import { n as usePlayerStore, t as _sfc_main$7 } from "./GuestLayout-CqMC9M4d.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, onBeforeUnmount, onMounted, onUnmounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/Radio/ChannelSwitcher.vue
var _sfc_main$6 = {
	__name: "ChannelSwitcher",
	__ssrInlineRender: true,
	props: {
		channels: {
			type: Array,
			default: () => []
		},
		activeSlug: {
			type: String,
			default: "main"
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.channels.length > 1) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-6 flex flex-wrap gap-2" }, _attrs))}><!--[-->`);
				ssrRenderList(__props.channels, (channel) => {
					_push(`<a${ssrRenderAttr("href", channel.url || "/radio")} class="${ssrRenderClass([channel.slug === __props.activeSlug ? "border-arbor-emerald bg-arbor-emerald text-arbor-night" : "border-arbor-glass-border bg-arbor-deep/70 text-arbor-sage hover:text-arbor-cream", "rounded-full border px-3 py-1.5 text-sm transition"])}">${ssrInterpolate(channel.name)}</a>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Radio/ChannelSwitcher.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Composables/useRadioSession.js
var STORAGE_KEY = "<redacted>-radio-session-token";
function uuid() {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
	return `radio-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function useRadioSession() {
	function token() {
		try {
			const existing = localStorage.getItem(STORAGE_KEY);
			if (existing) return existing;
			const created = uuid();
			localStorage.setItem(STORAGE_KEY, created);
			return created;
		} catch {
			return uuid();
		}
	}
	return { sessionToken: token() };
}
//#endregion
//#region resources/js/Components/Radio/InteractionBar.vue
var _sfc_main$5 = {
	__name: "InteractionBar",
	__ssrInlineRender: true,
	props: {
		sound: Object,
		summary: {
			type: Object,
			default: () => ({
				like: 0,
				heart: 0,
				leaf: 0,
				star: 0
			})
		}
	},
	emits: ["update:summary"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { sessionToken } = useRadioSession();
		const busy = ref(false);
		const copied = ref(false);
		const soundId = computed(() => props.sound?.sound_id || props.sound?.id || null);
		const shareDisabled = computed(() => !soundId.value);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap items-center gap-2" }, _attrs))} data-v-7d0a7ccc><button type="button" class="inline-flex items-center gap-2 rounded-full bg-arbor-emerald px-4 py-2 text-sm font-semibold text-arbor-night transition hover:bg-arbor-emerald-dark disabled:opacity-50"${ssrIncludeBooleanAttr(!soundId.value || busy.value) ? " disabled" : ""} data-v-7d0a7ccc><span data-v-7d0a7ccc>J&#39;aime</span><span class="font-mono text-xs" data-v-7d0a7ccc>${ssrInterpolate(__props.summary.like || 0)}</span></button><button type="button" class="reaction-btn"${ssrIncludeBooleanAttr(!soundId.value || busy.value) ? " disabled" : ""} data-v-7d0a7ccc><span data-v-7d0a7ccc>Coeur</span><span data-v-7d0a7ccc>${ssrInterpolate(__props.summary.heart || 0)}</span></button><button type="button" class="reaction-btn"${ssrIncludeBooleanAttr(!soundId.value || busy.value) ? " disabled" : ""} data-v-7d0a7ccc><span data-v-7d0a7ccc>Feuille</span><span data-v-7d0a7ccc>${ssrInterpolate(__props.summary.leaf || 0)}</span></button><button type="button" class="reaction-btn"${ssrIncludeBooleanAttr(!soundId.value || busy.value) ? " disabled" : ""} data-v-7d0a7ccc><span data-v-7d0a7ccc>Étoile</span><span data-v-7d0a7ccc>${ssrInterpolate(__props.summary.star || 0)}</span></button><button type="button" class="reaction-btn"${ssrIncludeBooleanAttr(shareDisabled.value) ? " disabled" : ""} data-v-7d0a7ccc>${ssrInterpolate(copied.value ? "Lien copié" : "Partager")}</button></div>`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Radio/InteractionBar.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var InteractionBar_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$5, [["__scopeId", "data-v-7d0a7ccc"]]);
//#endregion
//#region resources/js/Components/Radio/LiveVisualizer.vue
var _sfc_main$4 = {
	__name: "LiveVisualizer",
	__ssrInlineRender: true,
	props: {
		analyser: Object,
		mode: {
			type: String,
			default: "spectrum"
		},
		active: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const canvasRef = ref(null);
		let rafId = null;
		const mode = computed(() => props.mode || "spectrum");
		function resize(canvas) {
			const rect = canvas.getBoundingClientRect();
			const ratio = window.devicePixelRatio || 1;
			canvas.width = Math.max(1, Math.floor(rect.width * ratio));
			canvas.height = Math.max(1, Math.floor(rect.height * ratio));
		}
		function drawIdle(ctx, width, height) {
			ctx.clearRect(0, 0, width, height);
			const gradient = ctx.createLinearGradient(0, 0, width, height);
			gradient.addColorStop(0, "rgba(75, 124, 91, 0.24)");
			gradient.addColorStop(.55, "rgba(31, 78, 63, 0.36)");
			gradient.addColorStop(1, "rgba(226, 207, 154, 0.16)");
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, width, height);
			ctx.strokeStyle = "rgba(226, 207, 154, 0.25)";
			ctx.lineWidth = 1;
			for (let i = 0; i < 9; i += 1) {
				const y = height / 10 * (i + 1);
				ctx.beginPath();
				ctx.moveTo(width * .08, y);
				ctx.bezierCurveTo(width * .32, y - 24, width * .68, y + 24, width * .92, y);
				ctx.stroke();
			}
		}
		function drawSpectrum(ctx, frequency, width, height) {
			const bars = 72;
			const gap = width * .003;
			const barWidth = (width - gap * (bars - 1)) / bars;
			const base = height * .76;
			for (let i = 0; i < bars; i += 1) {
				const value = frequency[Math.floor(i / bars * frequency.length * .72)] / 255;
				const eased = Math.pow(value, .75);
				const barHeight = Math.max(height * .04, eased * height * .72);
				const x = i * (barWidth + gap);
				const y = base - barHeight;
				const gradient = ctx.createLinearGradient(0, y, 0, base);
				gradient.addColorStop(0, "rgba(226, 207, 154, 0.95)");
				gradient.addColorStop(.45, "rgba(88, 166, 116, 0.82)");
				gradient.addColorStop(1, "rgba(21, 56, 48, 0.35)");
				ctx.fillStyle = gradient;
				ctx.fillRect(x, y, barWidth, barHeight);
			}
		}
		function drawWaveform(ctx, timeData, width, height) {
			ctx.strokeStyle = "rgba(226, 207, 154, 0.9)";
			ctx.lineWidth = Math.max(2, width * .004);
			ctx.beginPath();
			for (let i = 0; i < timeData.length; i += 1) {
				const x = i / (timeData.length - 1) * width;
				const centered = (timeData[i] - 128) / 128;
				const y = height * .5 + centered * height * .32;
				if (i === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.stroke();
		}
		function drawBloom(ctx, frequency, width, height) {
			const cx = width / 2;
			const cy = height / 2;
			const rings = 64;
			const radius = Math.min(width, height) * .18;
			for (let i = 0; i < rings; i += 1) {
				const value = frequency[Math.floor(i / rings * frequency.length * .55)] / 255;
				const angle = Math.PI * 2 * i / rings;
				const length = radius + value * Math.min(width, height) * .28;
				const inner = radius * .55;
				ctx.strokeStyle = i % 3 === 0 ? "rgba(226,207,154,.78)" : "rgba(91,169,119,.68)";
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
				ctx.lineTo(cx + Math.cos(angle) * length, cy + Math.sin(angle) * length);
				ctx.stroke();
			}
		}
		function render() {
			const canvas = canvasRef.value;
			if (!canvas) return;
			const ctx = canvas.getContext("2d");
			const width = canvas.width;
			const height = canvas.height;
			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = "rgba(8, 22, 20, 0.96)";
			ctx.fillRect(0, 0, width, height);
			if (!props.analyser || !props.active) {
				drawIdle(ctx, width, height);
				rafId = requestAnimationFrame(render);
				return;
			}
			const frequency = new Uint8Array(props.analyser.frequencyBinCount);
			const timeData = new Uint8Array(props.analyser.frequencyBinCount);
			props.analyser.getByteFrequencyData(frequency);
			props.analyser.getByteTimeDomainData(timeData);
			if (mode.value === "waveform") drawWaveform(ctx, timeData, width, height);
			else if (mode.value === "bloom") drawBloom(ctx, frequency, width, height);
			else drawSpectrum(ctx, frequency, width, height);
			rafId = requestAnimationFrame(render);
		}
		onMounted(() => {
			resize(canvasRef.value);
			window.addEventListener("resize", () => canvasRef.value && resize(canvasRef.value));
			render();
		});
		onBeforeUnmount(() => {
			if (rafId) cancelAnimationFrame(rafId);
		});
		watch(() => props.analyser, render);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<canvas${ssrRenderAttrs(mergeProps({
				ref_key: "canvasRef",
				ref: canvasRef,
				class: "h-full w-full",
				"aria-hidden": "true"
			}, _attrs))}></canvas>`);
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Radio/LiveVisualizer.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Radio/ListeningPulse.vue
var _sfc_main$3 = {
	__name: "ListeningPulse",
	__ssrInlineRender: true,
	props: { count: {
		type: Number,
		default: 0
	} },
	setup(__props) {
		const props = __props;
		const pulsing = ref(false);
		watch(() => props.count, () => {
			pulsing.value = true;
			setTimeout(() => {
				pulsing.value = false;
			}, 650);
		});
		const label = computed(() => `${props.count} auditeur${props.count > 1 ? "s" : ""}`);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["inline-flex items-center gap-2 rounded-full border border-arbor-glass-border bg-arbor-deep/75 px-3 py-1.5 text-sm text-arbor-sage transition", pulsing.value ? "scale-[1.03] border-arbor-emerald/50 text-arbor-cream" : ""] }, _attrs))}><span class="relative flex h-2.5 w-2.5"><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-arbor-emerald opacity-50"></span><span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-arbor-emerald"></span></span><span>${ssrInterpolate(label.value)}</span></div>`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Radio/ListeningPulse.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Radio/ProgrammeGrid.vue
var _sfc_main$2 = {
	__name: "ProgrammeGrid",
	__ssrInlineRender: true,
	props: { items: {
		type: Array,
		default: () => []
	} },
	setup(__props) {
		function formatTime(value) {
			if (!value) return "--:--";
			return new Intl.DateTimeFormat("fr-FR", {
				hour: "2-digit",
				minute: "2-digit"
			}).format(new Date(value));
		}
		function typeLabel(type) {
			return {
				live: "Direct",
				podcast: "Podcast",
				flash: "Flash",
				emission: "Émission",
				schedule: "Sélection"
			}[type] || "Radio";
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "mt-10" }, _attrs))}><div class="mb-4 flex items-end justify-between gap-4"><div><h2 class="font-display text-2xl font-semibold text-arbor-cream">Programme du jour</h2><p class="mt-1 text-sm text-arbor-sage">Shows, sélections et temps forts récents.</p></div></div>`);
			if (__props.items.length) {
				_push(`<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
				ssrRenderList(__props.items, (item) => {
					_push(`<article class="min-h-[132px] rounded-lg border border-arbor-glass-border bg-arbor-deep/70 p-4"><div class="mb-3 flex items-center justify-between gap-2"><span class="font-mono text-xs text-arbor-sage">${ssrInterpolate(formatTime(item.starts_at))}</span><span class="rounded-full border border-arbor-emerald/30 bg-arbor-emerald/10 px-2 py-0.5 text-[11px] font-medium text-arbor-emerald">${ssrInterpolate(typeLabel(item.type))}</span></div><h3 class="line-clamp-2 text-sm font-semibold leading-snug text-arbor-cream">${ssrInterpolate(item.title)}</h3>`);
					if (item.description) _push(`<p class="mt-2 line-clamp-2 text-xs leading-relaxed text-arbor-sage">${ssrInterpolate(item.description)}</p>`);
					else _push(`<!---->`);
					_push(`</article>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<div class="rounded-lg border border-arbor-glass-border bg-arbor-deep/70 p-5 text-sm text-arbor-sage"> Le programme est en cours de composition. </div>`);
			_push(`</section>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Radio/ProgrammeGrid.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Radio/ReactiveBackground.vue
var _sfc_main$1 = {
	__name: "ReactiveBackground",
	__ssrInlineRender: true,
	props: { bands: {
		type: Object,
		default: () => ({
			low: 0,
			mid: 0,
			high: 0,
			rms: 0
		})
	} },
	setup(__props) {
		const props = __props;
		const styleVars = computed(() => {
			const low = props.bands?.low || 0;
			const mid = props.bands?.mid || 0;
			const high = props.bands?.high || 0;
			return {
				"--radio-low": (1 + low * .8).toFixed(3),
				"--radio-mid": (1 + mid * .6).toFixed(3),
				"--radio-high": (1 + high * .7).toFixed(3)
			};
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-arbor-night",
				style: styleVars.value
			}, _attrs))} data-v-10fbe828><div class="radio-veil radio-veil-a" data-v-10fbe828></div><div class="radio-veil radio-veil-b" data-v-10fbe828></div><div class="radio-veil radio-veil-c" data-v-10fbe828></div><div class="absolute inset-0 opacity-[0.07] radio-grain" data-v-10fbe828></div></div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Radio/ReactiveBackground.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ReactiveBackground_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$1, [["__scopeId", "data-v-10fbe828"]]);
//#endregion
//#region resources/js/Composables/useRadioAudio.js
var audioContext = ref(null);
var analyser = ref(null);
var source = ref(null);
var bands = ref({
	low: 0,
	mid: 0,
	high: 0,
	rms: 0
});
var connectedElement = ref(null);
var rafId = null;
function ensureContext() {
	if (typeof window === "undefined") return null;
	const Context = window.AudioContext || window.webkitAudioContext;
	if (!Context) return null;
	if (!audioContext.value) audioContext.value = new Context();
	if (!analyser.value) {
		analyser.value = audioContext.value.createAnalyser();
		analyser.value.fftSize = 2048;
		analyser.value.smoothingTimeConstant = .82;
		analyser.value.connect(audioContext.value.destination);
	}
	return audioContext.value;
}
function startMetering() {
	if (rafId || !analyser.value) return;
	const frequency = new Uint8Array(analyser.value.frequencyBinCount);
	const tick = () => {
		analyser.value.getByteFrequencyData(frequency);
		const third = Math.max(1, Math.floor(frequency.length / 3));
		const average = (start, end) => {
			let sum = 0;
			for (let i = start; i < end; i += 1) sum += frequency[i] || 0;
			return sum / Math.max(1, end - start) / 255;
		};
		const low = average(0, third);
		const mid = average(third, third * 2);
		const high = average(third * 2, frequency.length);
		bands.value = {
			low,
			mid,
			high,
			rms: Math.sqrt((low * low + mid * mid + high * high) / 3)
		};
		rafId = requestAnimationFrame(tick);
	};
	rafId = requestAnimationFrame(tick);
}
function stopMetering() {
	if (rafId) {
		cancelAnimationFrame(rafId);
		rafId = null;
	}
}
function useRadioAudio() {
	async function connect(audioElement) {
		const context = ensureContext();
		if (!context || !audioElement) return null;
		if (context.state === "suspended") await context.resume();
		if (connectedElement.value !== audioElement) {
			if (source.value) source.value.disconnect();
			source.value = context.createMediaElementSource(audioElement);
			source.value.connect(analyser.value);
			connectedElement.value = audioElement;
		}
		startMetering();
		return analyser.value;
	}
	onBeforeUnmount(() => {
		stopMetering();
	});
	return {
		analyser: computed(() => analyser.value),
		bands,
		connect
	};
}
//#endregion
//#region resources/js/Pages/Radio/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		nowPlaying: Object,
		history: Array,
		listenerCount: Number,
		channels: Array,
		activeChannel: String
	},
	setup(__props) {
		const props = __props;
		const player = usePlayerStore();
		const { analyser, bands, connect } = useRadioAudio();
		const audioRef = ref(null);
		const isPlaying = ref(false);
		const volume = ref(.8);
		const isMuted = ref(false);
		const currentMetadata = ref(props.nowPlaying);
		const currentListeners = ref(props.listenerCount);
		const nextUp = ref(null);
		const programme = ref([]);
		const reactionsSummary = ref({
			like: 0,
			heart: 0,
			leaf: 0,
			star: 0
		});
		const visualizerMode = ref("spectrum");
		const copiedStream = ref(false);
		const copiedM3u = ref(false);
		let metadataInterval = null;
		const currentSound = computed(() => currentMetadata.value);
		const effectiveVolume = computed(() => {
			if (isMuted.value) return 0;
			return volume.value;
		});
		const streamUrl = computed(() => `/radio/stream?_=${Date.now()}`);
		onMounted(() => {
			if (player.isPlaying) player.pause();
			player.connectRadio(currentMetadata.value, "/radio/stream");
			fetchMetadata();
			fetchProgramme();
			metadataInterval = setInterval(fetchMetadata, 3e3);
		});
		onUnmounted(() => {
			if (metadataInterval) clearInterval(metadataInterval);
			if (audioRef.value) {
				audioRef.value.pause();
				audioRef.value.src = "";
				audioRef.value.load();
			}
		});
		const fetchMetadata = async () => {
			try {
				const response = await fetch("/api/radio/now-playing");
				if (response.ok) {
					const data = await response.json();
					currentMetadata.value = data.now_playing;
					currentListeners.value = data.listener_count;
					nextUp.value = data.next_up;
					reactionsSummary.value = data.reactions_summary || reactionsSummary.value;
				}
			} catch {}
		};
		const fetchProgramme = async () => {
			try {
				const response = await fetch("/api/radio/programme");
				if (response.ok) programme.value = (await response.json()).items || [];
			} catch {
				programme.value = [];
			}
		};
		const togglePlay = async () => {
			if (!audioRef.value) return;
			if (isPlaying.value) {
				audioRef.value.pause();
				isPlaying.value = false;
				player.pause();
			} else try {
				await connect(audioRef.value);
				await audioRef.value.play();
				isPlaying.value = true;
				player.connectRadio(currentMetadata.value, "/radio/stream");
				player.resumeRadio();
			} catch {}
		};
		const onAudioPlay = () => {
			isPlaying.value = true;
			player.connectRadio(currentMetadata.value, "/radio/stream");
			player.resumeRadio();
		};
		const onAudioPause = () => {
			isPlaying.value = false;
			player.pause();
		};
		const setVolume = (value) => {
			volume.value = value;
			if (audioRef.value) audioRef.value.volume = effectiveVolume.value;
			if (value > 0) isMuted.value = false;
		};
		const toggleMute = () => {
			isMuted.value = !isMuted.value;
			if (audioRef.value) audioRef.value.volume = effectiveVolume.value;
		};
		const formatDuration = (seconds) => {
			if (!seconds) return "--:--";
			return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
		};
		const copyStreamUrl = () => {
			navigator.clipboard.writeText(window.location.origin + "/radio/stream");
			copiedStream.value = true;
			setTimeout(() => copiedStream.value = false, 2e3);
		};
		const copyM3uUrl = () => {
			navigator.clipboard.writeText(window.location.origin + "/radio/stream.m3u");
			copiedM3u.value = true;
			setTimeout(() => copiedM3u.value = false, 2e3);
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Radio" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$7, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(ReactiveBackground_default, { bands: unref(bands) }, null, _parent, _scopeId));
						_push(`<div class="pt-24 pb-16"${_scopeId}><div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-12"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$6, {
							channels: __props.channels || [],
							"active-slug": __props.activeChannel || "main"
						}, null, _parent, _scopeId));
						_push(`<div class="flex items-center gap-3 mb-4"${_scopeId}><div class="w-3 h-3 rounded-full bg-red-500 animate-pulse"${_scopeId}></div><span class="text-sm text-arbor-sage font-medium tracking-wide uppercase"${_scopeId}>En direct</span></div><h1 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4"${_scopeId}> Arborisis Radio </h1><p class="text-arbor-sage max-w-xl"${_scopeId}> Un flux continu de field recordings soigneusement sélectionnés parmi les créations de notre communauté. </p><div class="mt-6"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("radio.shows.index"),
							class: "inline-flex items-center gap-2 rounded-lg border border-arbor-emerald/30 bg-arbor-emerald/10 px-4 py-2 text-sm font-medium text-arbor-emerald transition hover:bg-arbor-emerald/20"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"${_scopeId}></path></svg> Podcasts, flash info et émissions `);
								else return [(openBlock(), createBlock("svg", {
									class: "h-4 w-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
								})])), createTextVNode(" Podcasts, flash info et émissions ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2 space-y-8"${_scopeId}><div class="aspect-square sm:aspect-[16/9] rounded-2xl overflow-hidden bg-arbor-deep relative border border-arbor-glass-border shadow-2xl shadow-black/25"${_scopeId}>`);
						if (currentSound.value?.cover) _push(`<div class="absolute inset-0 bg-cover bg-center opacity-35" style="${ssrRenderStyle(`background-image: url(${currentSound.value.cover})`)}"${_scopeId}></div>`);
						else _push(`<!---->`);
						_push(ssrRenderComponent(_sfc_main$4, {
							analyser: unref(analyser),
							active: isPlaying.value,
							mode: visualizerMode.value,
							class: "absolute inset-0"
						}, null, _parent, _scopeId));
						_push(`<div class="absolute inset-0 bg-gradient-to-t from-arbor-night/80 via-transparent to-transparent"${_scopeId}></div><div class="absolute right-4 top-4 flex rounded-full border border-arbor-glass-border bg-arbor-night/65 p-1 backdrop-blur"${_scopeId}><!--[-->`);
						ssrRenderList([
							"spectrum",
							"waveform",
							"bloom"
						], (mode) => {
							_push(`<button type="button"${ssrRenderAttr("aria-label", `Mode visualiseur ${mode === "spectrum" ? "Spectre" : mode === "waveform" ? "Onde" : "Halo"}`)} class="${ssrRenderClass([visualizerMode.value === mode ? "bg-arbor-emerald text-arbor-night" : "text-arbor-sage hover:text-arbor-cream", "rounded-full px-3 py-1 text-xs capitalize transition"])}"${_scopeId}>${ssrInterpolate(mode === "spectrum" ? "Spectre" : mode === "waveform" ? "Onde" : "Halo")}</button>`);
						});
						_push(`<!--]--></div><div class="absolute bottom-0 left-0 right-0 p-6"${_scopeId}><div class="flex items-center gap-3 mb-2"${_scopeId}><div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"${_scopeId}></div><span class="text-xs text-arbor-sage uppercase tracking-wider"${_scopeId}>Now Playing</span></div><h2 class="font-display text-2xl font-bold text-arbor-cream mb-1 truncate"${_scopeId}>${ssrInterpolate(currentSound.value?.title ?? "Chargement...")}</h2><p class="text-arbor-sage truncate"${_scopeId}>${ssrInterpolate(currentSound.value?.artist ?? "Arborisis")}</p></div></div><div class="glass-card p-6"${_scopeId}><audio${ssrRenderAttr("src", streamUrl.value)} crossorigin="anonymous"${_scopeId}></audio><div class="flex items-center gap-4 mb-6"${_scopeId}><button${ssrRenderAttr("aria-label", isPlaying.value ? "Pause" : "Lire")} class="w-16 h-16 rounded-full bg-arbor-emerald flex items-center justify-center hover:bg-arbor-emerald-dark transition-colors shrink-0 shadow-lg shadow-arbor-emerald/20 group"${_scopeId}>`);
						if (!isPlaying.value) _push(`<svg class="w-7 h-7 text-arbor-night ml-1 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M8 5v14l11-7z"${_scopeId}></path></svg>`);
						else _push(`<svg class="w-7 h-7 text-arbor-night" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"${_scopeId}></path></svg>`);
						_push(`</button><div class="flex-1 min-w-0"${_scopeId}><div class="text-sm text-arbor-sage mb-1"${_scopeId}>Flux continu</div><div class="text-arbor-cream font-medium truncate"${_scopeId}>${ssrInterpolate(isPlaying.value ? "Lecture en cours" : "En pause")}</div></div>`);
						_push(ssrRenderComponent(_sfc_main$3, { count: currentListeners.value }, null, _parent, _scopeId));
						_push(`<div class="flex items-center gap-2 text-sm text-arbor-sage sr-only"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(currentListeners.value)} auditeur${ssrInterpolate(currentListeners.value !== 1 ? "s" : "")}</span></div></div><div class="flex items-center gap-3"${_scopeId}><button${ssrRenderAttr("aria-label", isMuted.value || volume.value === 0 ? "Activer le son" : "Couper le son")} class="min-w-[44px] min-h-[44px] flex items-center justify-center text-arbor-sage hover:text-arbor-cream transition-colors"${_scopeId}>`);
						if (isMuted.value || volume.value === 0) _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"${_scopeId}></path></svg>`);
						else _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"${_scopeId}></path></svg>`);
						_push(`</button><input type="range" min="0" max="1" step="0.01"${ssrRenderAttr("value", volume.value)} class="flex-1 h-1.5 bg-arbor-glass rounded-full appearance-none cursor-pointer accent-arbor-emerald"${_scopeId}></div></div><div class="glass-card p-5"${_scopeId}>`);
						_push(ssrRenderComponent(InteractionBar_default, {
							sound: currentSound.value,
							summary: reactionsSummary.value,
							"onUpdate:summary": ($event) => reactionsSummary.value = $event
						}, null, _parent, _scopeId));
						_push(`</div><div class="flex flex-wrap gap-3"${_scopeId}><button class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-colors"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"${_scopeId}></path></svg>`);
						if (copiedStream.value) _push(`<span${_scopeId}>URL copiée !</span>`);
						else _push(`<span${_scopeId}>Copier l&#39;URL du flux</span>`);
						_push(`</button><button class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-colors"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"${_scopeId}></path></svg>`);
						if (copiedM3u.value) _push(`<span${_scopeId}>M3U copié !</span>`);
						else _push(`<span${_scopeId}>Copier le lien M3U</span>`);
						_push(`</button><a href="/radio/stream.m3u" download="<redacted>-radio.m3u" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-emerald/15 border border-arbor-emerald/30 text-arbor-emerald text-sm hover:bg-arbor-emerald/25 transition-colors"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"${_scopeId}></path></svg> Télécharger M3U </a></div></div><div class="space-y-6"${_scopeId}><div class="glass-card p-6"${_scopeId}><h3 class="font-semibold text-arbor-cream mb-4 text-sm"${_scopeId}>Prochainement</h3>`);
						if (nextUp.value) {
							_push(`<div class="flex items-center gap-3"${_scopeId}><div class="w-12 h-12 rounded-lg bg-arbor-deep overflow-hidden shrink-0"${_scopeId}>`);
							if (nextUp.value.cover_url) _push(`<img${ssrRenderAttr("src", nextUp.value.cover_url)} class="w-full h-full object-cover" alt=""${_scopeId}>`);
							else _push(`<div class="w-full h-full flex items-center justify-center"${_scopeId}><svg class="w-5 h-5 text-arbor-moss/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"${_scopeId}></path></svg></div>`);
							_push(`</div><div class="min-w-0"${_scopeId}><div class="text-sm font-medium text-arbor-cream truncate"${_scopeId}>${ssrInterpolate(nextUp.value.title)}</div><div class="text-xs text-arbor-sage truncate"${_scopeId}>${ssrInterpolate(nextUp.value.user_name ?? "Arborisis")}</div></div><span class="text-xs text-arbor-sage font-mono shrink-0"${_scopeId}>${ssrInterpolate(formatDuration(nextUp.value.duration))}</span></div>`);
						} else _push(`<div class="text-sm text-arbor-sage"${_scopeId}> Sélection en cours... </div>`);
						_push(`</div><div class="glass-card p-6"${_scopeId}><h3 class="font-semibold text-arbor-cream mb-4 text-sm"${_scopeId}>Historique</h3>`);
						if (__props.history.length > 0) {
							_push(`<div class="space-y-3"${_scopeId}><!--[-->`);
							ssrRenderList(__props.history, (sound) => {
								_push(ssrRenderComponent(unref(Link), {
									key: sound.id,
									href: _ctx.route("sounds.show", sound.slug),
									class: "flex items-center gap-3 group"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="w-10 h-10 rounded-lg bg-arbor-deep overflow-hidden shrink-0"${_scopeId}>`);
											if (sound.cover_url) _push(`<img${ssrRenderAttr("src", sound.cover_url)} class="w-full h-full object-cover" alt=""${_scopeId}>`);
											else _push(`<div class="w-full h-full flex items-center justify-center"${_scopeId}><svg class="w-4 h-4 text-arbor-moss/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"${_scopeId}></path></svg></div>`);
											_push(`</div><div class="min-w-0 flex-1"${_scopeId}><div class="text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate"${_scopeId}>${ssrInterpolate(sound.title)}</div><div class="text-xs text-arbor-sage truncate"${_scopeId}>${ssrInterpolate(sound.user_name ?? "Arborisis")}</div></div><span class="text-xs text-arbor-sage font-mono shrink-0"${_scopeId}>${ssrInterpolate(formatDuration(sound.duration))}</span>`);
										} else return [
											createVNode("div", { class: "w-10 h-10 rounded-lg bg-arbor-deep overflow-hidden shrink-0" }, [sound.cover_url ? (openBlock(), createBlock("img", {
												key: 0,
												src: sound.cover_url,
												class: "w-full h-full object-cover",
												alt: ""
											}, null, 8, ["src"])) : (openBlock(), createBlock("div", {
												key: 1,
												class: "w-full h-full flex items-center justify-center"
											}, [(openBlock(), createBlock("svg", {
												class: "w-4 h-4 text-arbor-moss/50",
												fill: "none",
												stroke: "currentColor",
												viewBox: "0 0 24 24"
											}, [createVNode("path", {
												"stroke-linecap": "round",
												"stroke-linejoin": "round",
												"stroke-width": "1.5",
												d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
											})]))]))]),
											createVNode("div", { class: "min-w-0 flex-1" }, [createVNode("div", { class: "text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate" }, toDisplayString(sound.title), 1), createVNode("div", { class: "text-xs text-arbor-sage truncate" }, toDisplayString(sound.user_name ?? "Arborisis"), 1)]),
											createVNode("span", { class: "text-xs text-arbor-sage font-mono shrink-0" }, toDisplayString(formatDuration(sound.duration)), 1)
										];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else _push(`<div class="text-sm text-arbor-sage"${_scopeId}> Aucun son dans l&#39;historique. </div>`);
						_push(`</div><div class="glass-card p-6"${_scopeId}><h3 class="font-semibold text-arbor-cream mb-3 text-sm"${_scopeId}>Écouter ailleurs</h3><p class="text-sm text-arbor-sage leading-relaxed mb-4"${_scopeId}> Le flux Arborisis Radio est compatible avec tous les lecteurs audio : VLC, iTunes, Foobar2000, et les appareils mobiles. </p><div class="space-y-2 text-xs text-arbor-sage"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><span class="text-arbor-emerald"${_scopeId}>●</span><span${_scopeId}>Format MP3 continu</span></div><div class="flex items-center gap-2"${_scopeId}><span class="text-arbor-emerald"${_scopeId}>●</span><span${_scopeId}>Métadonnées temps réel</span></div><div class="flex items-center gap-2"${_scopeId}><span class="text-arbor-emerald"${_scopeId}>●</span><span${_scopeId}>Pas de publicité</span></div></div></div></div></div>`);
						_push(ssrRenderComponent(_sfc_main$2, { items: programme.value }, null, _parent, _scopeId));
						_push(`</div></div>`);
					} else return [createVNode(ReactiveBackground_default, { bands: unref(bands) }, null, 8, ["bands"]), createVNode("div", { class: "pt-24 pb-16" }, [createVNode("div", { class: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "mb-12" }, [
							createVNode(_sfc_main$6, {
								channels: __props.channels || [],
								"active-slug": __props.activeChannel || "main"
							}, null, 8, ["channels", "active-slug"]),
							createVNode("div", { class: "flex items-center gap-3 mb-4" }, [createVNode("div", { class: "w-3 h-3 rounded-full bg-red-500 animate-pulse" }), createVNode("span", { class: "text-sm text-arbor-sage font-medium tracking-wide uppercase" }, "En direct")]),
							createVNode("h1", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4" }, " Arborisis Radio "),
							createVNode("p", { class: "text-arbor-sage max-w-xl" }, " Un flux continu de field recordings soigneusement sélectionnés parmi les créations de notre communauté. "),
							createVNode("div", { class: "mt-6" }, [createVNode(unref(Link), {
								href: _ctx.route("radio.shows.index"),
								class: "inline-flex items-center gap-2 rounded-lg border border-arbor-emerald/30 bg-arbor-emerald/10 px-4 py-2 text-sm font-medium text-arbor-emerald transition hover:bg-arbor-emerald/20"
							}, {
								default: withCtx(() => [(openBlock(), createBlock("svg", {
									class: "h-4 w-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
								})])), createTextVNode(" Podcasts, flash info et émissions ")]),
								_: 1
							}, 8, ["href"])])
						]),
						createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [createVNode("div", { class: "lg:col-span-2 space-y-8" }, [
							createVNode("div", { class: "aspect-square sm:aspect-[16/9] rounded-2xl overflow-hidden bg-arbor-deep relative border border-arbor-glass-border shadow-2xl shadow-black/25" }, [
								currentSound.value?.cover ? (openBlock(), createBlock("div", {
									key: 0,
									class: "absolute inset-0 bg-cover bg-center opacity-35",
									style: `background-image: url(${currentSound.value.cover})`
								}, null, 4)) : createCommentVNode("", true),
								createVNode(_sfc_main$4, {
									analyser: unref(analyser),
									active: isPlaying.value,
									mode: visualizerMode.value,
									class: "absolute inset-0"
								}, null, 8, [
									"analyser",
									"active",
									"mode"
								]),
								createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-arbor-night/80 via-transparent to-transparent" }),
								createVNode("div", { class: "absolute right-4 top-4 flex rounded-full border border-arbor-glass-border bg-arbor-night/65 p-1 backdrop-blur" }, [(openBlock(), createBlock(Fragment, null, renderList([
									"spectrum",
									"waveform",
									"bloom"
								], (mode) => {
									return createVNode("button", {
										key: mode,
										type: "button",
										"aria-label": `Mode visualiseur ${mode === "spectrum" ? "Spectre" : mode === "waveform" ? "Onde" : "Halo"}`,
										class: ["rounded-full px-3 py-1 text-xs capitalize transition", visualizerMode.value === mode ? "bg-arbor-emerald text-arbor-night" : "text-arbor-sage hover:text-arbor-cream"],
										onClick: ($event) => visualizerMode.value = mode
									}, toDisplayString(mode === "spectrum" ? "Spectre" : mode === "waveform" ? "Onde" : "Halo"), 11, ["aria-label", "onClick"]);
								}), 64))]),
								createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-6" }, [
									createVNode("div", { class: "flex items-center gap-3 mb-2" }, [createVNode("div", { class: "w-2 h-2 rounded-full bg-red-500 animate-pulse" }), createVNode("span", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, "Now Playing")]),
									createVNode("h2", { class: "font-display text-2xl font-bold text-arbor-cream mb-1 truncate" }, toDisplayString(currentSound.value?.title ?? "Chargement..."), 1),
									createVNode("p", { class: "text-arbor-sage truncate" }, toDisplayString(currentSound.value?.artist ?? "Arborisis"), 1)
								])
							]),
							createVNode("div", { class: "glass-card p-6" }, [
								createVNode("audio", {
									ref_key: "audioRef",
									ref: audioRef,
									src: streamUrl.value,
									onPlay: onAudioPlay,
									onPause: onAudioPause,
									crossorigin: "anonymous"
								}, null, 40, ["src"]),
								createVNode("div", { class: "flex items-center gap-4 mb-6" }, [
									createVNode("button", {
										onClick: togglePlay,
										"aria-label": isPlaying.value ? "Pause" : "Lire",
										class: "w-16 h-16 rounded-full bg-arbor-emerald flex items-center justify-center hover:bg-arbor-emerald-dark transition-colors shrink-0 shadow-lg shadow-arbor-emerald/20 group"
									}, [!isPlaying.value ? (openBlock(), createBlock("svg", {
										key: 0,
										class: "w-7 h-7 text-arbor-night ml-1 transition-transform group-hover:scale-110",
										fill: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", { d: "M8 5v14l11-7z" })])) : (openBlock(), createBlock("svg", {
										key: 1,
										class: "w-7 h-7 text-arbor-night",
										fill: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", { d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z" })]))], 8, ["aria-label"]),
									createVNode("div", { class: "flex-1 min-w-0" }, [createVNode("div", { class: "text-sm text-arbor-sage mb-1" }, "Flux continu"), createVNode("div", { class: "text-arbor-cream font-medium truncate" }, toDisplayString(isPlaying.value ? "Lecture en cours" : "En pause"), 1)]),
									createVNode(_sfc_main$3, { count: currentListeners.value }, null, 8, ["count"]),
									createVNode("div", { class: "flex items-center gap-2 text-sm text-arbor-sage sr-only" }, [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
									})])), createVNode("span", null, toDisplayString(currentListeners.value) + " auditeur" + toDisplayString(currentListeners.value !== 1 ? "s" : ""), 1)])
								]),
								createVNode("div", { class: "flex items-center gap-3" }, [createVNode("button", {
									onClick: toggleMute,
									"aria-label": isMuted.value || volume.value === 0 ? "Activer le son" : "Couper le son",
									class: "min-w-[44px] min-h-[44px] flex items-center justify-center text-arbor-sage hover:text-arbor-cream transition-colors"
								}, [isMuted.value || volume.value === 0 ? (openBlock(), createBlock("svg", {
									key: 0,
									class: "w-5 h-5",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
								}), createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
								})])) : (openBlock(), createBlock("svg", {
									key: 1,
									class: "w-5 h-5",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
								})]))], 8, ["aria-label"]), createVNode("input", {
									type: "range",
									min: "0",
									max: "1",
									step: "0.01",
									value: volume.value,
									onInput: ($event) => setVolume(parseFloat($event.target.value)),
									class: "flex-1 h-1.5 bg-arbor-glass rounded-full appearance-none cursor-pointer accent-arbor-emerald"
								}, null, 40, ["value", "onInput"])])
							]),
							createVNode("div", { class: "glass-card p-5" }, [createVNode(InteractionBar_default, {
								sound: currentSound.value,
								summary: reactionsSummary.value,
								"onUpdate:summary": ($event) => reactionsSummary.value = $event
							}, null, 8, [
								"sound",
								"summary",
								"onUpdate:summary"
							])]),
							createVNode("div", { class: "flex flex-wrap gap-3" }, [
								createVNode("button", {
									onClick: copyStreamUrl,
									class: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-colors"
								}, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
								})])), copiedStream.value ? (openBlock(), createBlock("span", { key: 0 }, "URL copiée !")) : (openBlock(), createBlock("span", { key: 1 }, "Copier l'URL du flux"))]),
								createVNode("button", {
									onClick: copyM3uUrl,
									class: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-colors"
								}, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
								})])), copiedM3u.value ? (openBlock(), createBlock("span", { key: 0 }, "M3U copié !")) : (openBlock(), createBlock("span", { key: 1 }, "Copier le lien M3U"))]),
								createVNode("a", {
									href: "/radio/stream.m3u",
									download: "<redacted>-radio.m3u",
									class: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-emerald/15 border border-arbor-emerald/30 text-arbor-emerald text-sm hover:bg-arbor-emerald/25 transition-colors"
								}, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
								})])), createTextVNode(" Télécharger M3U ")])
							])
						]), createVNode("div", { class: "space-y-6" }, [
							createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-semibold text-arbor-cream mb-4 text-sm" }, "Prochainement"), nextUp.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "flex items-center gap-3"
							}, [
								createVNode("div", { class: "w-12 h-12 rounded-lg bg-arbor-deep overflow-hidden shrink-0" }, [nextUp.value.cover_url ? (openBlock(), createBlock("img", {
									key: 0,
									src: nextUp.value.cover_url,
									class: "w-full h-full object-cover",
									alt: ""
								}, null, 8, ["src"])) : (openBlock(), createBlock("div", {
									key: 1,
									class: "w-full h-full flex items-center justify-center"
								}, [(openBlock(), createBlock("svg", {
									class: "w-5 h-5 text-arbor-moss/50",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
								})]))]))]),
								createVNode("div", { class: "min-w-0" }, [createVNode("div", { class: "text-sm font-medium text-arbor-cream truncate" }, toDisplayString(nextUp.value.title), 1), createVNode("div", { class: "text-xs text-arbor-sage truncate" }, toDisplayString(nextUp.value.user_name ?? "Arborisis"), 1)]),
								createVNode("span", { class: "text-xs text-arbor-sage font-mono shrink-0" }, toDisplayString(formatDuration(nextUp.value.duration)), 1)
							])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "text-sm text-arbor-sage"
							}, " Sélection en cours... "))]),
							createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-semibold text-arbor-cream mb-4 text-sm" }, "Historique"), __props.history.length > 0 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "space-y-3"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.history, (sound) => {
								return openBlock(), createBlock(unref(Link), {
									key: sound.id,
									href: _ctx.route("sounds.show", sound.slug),
									class: "flex items-center gap-3 group"
								}, {
									default: withCtx(() => [
										createVNode("div", { class: "w-10 h-10 rounded-lg bg-arbor-deep overflow-hidden shrink-0" }, [sound.cover_url ? (openBlock(), createBlock("img", {
											key: 0,
											src: sound.cover_url,
											class: "w-full h-full object-cover",
											alt: ""
										}, null, 8, ["src"])) : (openBlock(), createBlock("div", {
											key: 1,
											class: "w-full h-full flex items-center justify-center"
										}, [(openBlock(), createBlock("svg", {
											class: "w-4 h-4 text-arbor-moss/50",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24"
										}, [createVNode("path", {
											"stroke-linecap": "round",
											"stroke-linejoin": "round",
											"stroke-width": "1.5",
											d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
										})]))]))]),
										createVNode("div", { class: "min-w-0 flex-1" }, [createVNode("div", { class: "text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate" }, toDisplayString(sound.title), 1), createVNode("div", { class: "text-xs text-arbor-sage truncate" }, toDisplayString(sound.user_name ?? "Arborisis"), 1)]),
										createVNode("span", { class: "text-xs text-arbor-sage font-mono shrink-0" }, toDisplayString(formatDuration(sound.duration)), 1)
									]),
									_: 2
								}, 1032, ["href"]);
							}), 128))])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "text-sm text-arbor-sage"
							}, " Aucun son dans l'historique. "))]),
							createVNode("div", { class: "glass-card p-6" }, [
								createVNode("h3", { class: "font-semibold text-arbor-cream mb-3 text-sm" }, "Écouter ailleurs"),
								createVNode("p", { class: "text-sm text-arbor-sage leading-relaxed mb-4" }, " Le flux Arborisis Radio est compatible avec tous les lecteurs audio : VLC, iTunes, Foobar2000, et les appareils mobiles. "),
								createVNode("div", { class: "space-y-2 text-xs text-arbor-sage" }, [
									createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-arbor-emerald" }, "●"), createVNode("span", null, "Format MP3 continu")]),
									createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-arbor-emerald" }, "●"), createVNode("span", null, "Métadonnées temps réel")]),
									createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-arbor-emerald" }, "●"), createVNode("span", null, "Pas de publicité")])
								])
							])
						])]),
						createVNode(_sfc_main$2, { items: programme.value }, null, 8, ["items"])
					])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Radio/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

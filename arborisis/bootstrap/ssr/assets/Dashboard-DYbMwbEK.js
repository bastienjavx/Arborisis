import { t as _sfc_main$7 } from "./GuestLayout-30iBKZwO.js";
import { Head, router } from "@inertiajs/vue3";
import { computed, createBlock, createCommentVNode, createVNode, mergeProps, onMounted, onUnmounted, openBlock, reactive, ref, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Components/AudioAnalysis/SpectrogramPanel.vue
var _sfc_main$6 = {
	__name: "SpectrogramPanel",
	__ssrInlineRender: true,
	props: { visualizations: {
		type: Array,
		default: () => []
	} },
	setup(__props) {
		const props = __props;
		const activeTab = ref("mel");
		const tabs = [
			{
				key: "stft",
				label: "STFT"
			},
			{
				key: "mel_spectrogram",
				label: "Mel"
			},
			{
				key: "mfcc",
				label: "MFCC"
			}
		];
		const activeViz = computed(() => {
			return props.visualizations.find((v) => v.type === activeTab.value);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6" }, _attrs))}><div class="flex items-center justify-between mb-4"><h3 class="font-semibold text-arbor-cream text-sm">Spectrogrammes</h3><div class="flex gap-1"><!--[-->`);
			ssrRenderList(tabs, (tab) => {
				_push(`<button class="${ssrRenderClass([activeTab.value === tab.key ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-sage hover:text-arbor-cream", "px-3 py-1 rounded-lg text-xs transition-colors"])}">${ssrInterpolate(tab.label)}</button>`);
			});
			_push(`<!--]--></div></div><div class="rounded-xl overflow-hidden bg-arbor-deep border border-arbor-glass-border">`);
			if (activeViz.value?.url) _push(`<img${ssrRenderAttr("src", activeViz.value.url)}${ssrRenderAttr("alt", `Spectrogramme ${activeTab.value}`)} class="w-full h-auto object-contain" loading="lazy">`);
			else _push(`<div class="aspect-video flex items-center justify-center text-arbor-sage text-sm"> Aucun spectrogramme ${ssrInterpolate(activeTab.value)} disponible </div>`);
			_push(`</div></div>`);
		};
	}
};
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AudioAnalysis/SpectrogramPanel.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/AudioAnalysis/FeaturePanel.vue
var _sfc_main$5 = {
	__name: "FeaturePanel",
	__ssrInlineRender: true,
	props: { features: {
		type: Object,
		default: () => ({})
	} },
	setup(__props) {
		const formatNum = (val, digits = 4) => {
			if (val === null || val === void 0) return "-";
			return Number(val).toFixed(digits);
		};
		const sections = [{
			key: "temporal",
			label: "Temporelles",
			items: [{
				key: "zcr",
				label: "Zero-Crossing Rate",
				stat: "mean"
			}, {
				key: "rms",
				label: "RMS Energy",
				stat: "mean"
			}]
		}, {
			key: "spectral",
			label: "Spectrales",
			items: [
				{
					key: "centroid",
					label: "Centroid (Hz)",
					stat: "mean"
				},
				{
					key: "bandwidth",
					label: "Bandwidth (Hz)",
					stat: "mean"
				},
				{
					key: "rolloff",
					label: "Rolloff (Hz)",
					stat: "mean"
				},
				{
					key: "flatness",
					label: "Flatness",
					stat: "mean"
				}
			]
		}];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6" }, _attrs))}><h3 class="font-semibold text-arbor-cream text-sm mb-4">Features extraites</h3><div class="space-y-5"><!--[-->`);
			ssrRenderList(sections, (section) => {
				_push(`<div><h4 class="text-xs text-arbor-sage uppercase tracking-wider mb-2">${ssrInterpolate(section.label)}</h4><div class="space-y-2"><!--[-->`);
				ssrRenderList(section.items, (item) => {
					_push(`<div class="flex items-center justify-between py-2 px-3 rounded-lg bg-arbor-glass/30"><span class="text-sm text-arbor-sage">${ssrInterpolate(item.label)}</span><span class="text-sm font-mono text-arbor-cream">${ssrInterpolate(formatNum(__props.features[section.key]?.[item.key]?.stats?.[item.stat]))}</span></div>`);
				});
				_push(`<!--]--></div></div>`);
			});
			_push(`<!--]--></div></div>`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AudioAnalysis/FeaturePanel.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/AudioAnalysis/HeatmapViewer.vue
var _sfc_main$4 = {
	__name: "HeatmapViewer",
	__ssrInlineRender: true,
	props: { visualizations: {
		type: Array,
		default: () => []
	} },
	setup(__props) {
		const props = __props;
		const heatmapViz = computed(() => {
			return props.visualizations.find((v) => v.type === "feature_correlation");
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6" }, _attrs))}><h3 class="font-semibold text-arbor-cream text-sm mb-4">Corrélations</h3><div class="rounded-xl overflow-hidden bg-arbor-deep border border-arbor-glass-border">`);
			if (heatmapViz.value?.url) _push(`<img${ssrRenderAttr("src", heatmapViz.value.url)} alt="Matrice de corrélation" class="w-full h-auto object-contain" loading="lazy">`);
			else _push(`<div class="aspect-square flex items-center justify-center text-arbor-sage text-sm"> Heatmap non disponible </div>`);
			_push(`</div></div>`);
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AudioAnalysis/HeatmapViewer.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Composables/useWebAudio.js
function useWebAudio() {
	let audioContext = null;
	let analyser = null;
	let source = null;
	let audioElement = null;
	let rafId = null;
	const isInitialized = ref(false);
	const isPlaying = ref(false);
	const currentTime = ref(0);
	const duration = ref(0);
	const frequencyData = ref(new Uint8Array(0));
	const timeDomainData = ref(new Uint8Array(0));
	const spectrogramHistory = ref([]);
	const rms = ref(0);
	const zcr = ref(0);
	const createAnalyzer = (element, fftSize = 2048) => {
		audioElement = element;
		if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
		if (analyser) analyser.disconnect();
		analyser = audioContext.createAnalyser();
		analyser.fftSize = fftSize;
		analyser.smoothingTimeConstant = .8;
		if (source) source.disconnect();
		source = audioContext.createMediaElementSource(audioElement);
		source.connect(analyser);
		analyser.connect(audioContext.destination);
		frequencyData.value = new Uint8Array(analyser.frequencyBinCount);
		timeDomainData.value = new Uint8Array(analyser.frequencyBinCount);
		isInitialized.value = true;
		duration.value = audioElement.duration || 0;
		audioElement.addEventListener("play", () => {
			isPlaying.value = true;
		});
		audioElement.addEventListener("pause", () => {
			isPlaying.value = false;
		});
		audioElement.addEventListener("timeupdate", () => {
			currentTime.value = audioElement.currentTime;
		});
	};
	const startAnalysisLoop = () => {
		if (!analyser) return;
		const loop = () => {
			if (!analyser) return;
			analyser.getByteFrequencyData(frequencyData.value);
			analyser.getByteTimeDomainData(timeDomainData.value);
			let sum = 0;
			for (let i = 0; i < timeDomainData.value.length; i++) {
				const normalized = (timeDomainData.value[i] - 128) / 128;
				sum += normalized * normalized;
			}
			rms.value = Math.sqrt(sum / timeDomainData.value.length);
			let crossings = 0;
			for (let i = 1; i < timeDomainData.value.length; i++) if ((timeDomainData.value[i] - 128) * (timeDomainData.value[i - 1] - 128) < 0) crossings++;
			zcr.value = crossings / timeDomainData.value.length;
			spectrogramHistory.value.push([...frequencyData.value]);
			if (spectrogramHistory.value.length > 200) spectrogramHistory.value.shift();
			rafId = requestAnimationFrame(loop);
		};
		loop();
	};
	const play = async () => {
		if (audioContext?.state === "suspended") await audioContext.resume();
		audioElement?.play();
		startAnalysisLoop();
	};
	const pause = () => {
		audioElement?.pause();
		if (rafId) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	};
	const seek = (time) => {
		if (audioElement) audioElement.currentTime = time;
	};
	const dispose = () => {
		if (rafId) cancelAnimationFrame(rafId);
		if (source) {
			source.disconnect();
			source = null;
		}
		if (analyser) {
			analyser.disconnect();
			analyser = null;
		}
		if (audioContext) {
			audioContext.close();
			audioContext = null;
		}
		isInitialized.value = false;
	};
	onUnmounted(() => {
		dispose();
	});
	return {
		isInitialized,
		isPlaying,
		currentTime,
		duration,
		frequencyData,
		timeDomainData,
		spectrogramHistory,
		rms,
		zcr,
		createAnalyzer,
		play,
		pause,
		seek,
		dispose
	};
}
//#endregion
//#region resources/js/Components/AudioAnalysis/RealTimeAnalyzer.vue
var _sfc_main$3 = {
	__name: "RealTimeAnalyzer",
	__ssrInlineRender: true,
	props: {
		audioUrl: {
			type: String,
			required: true
		},
		duration: {
			type: Number,
			default: 0
		}
	},
	setup(__props) {
		const props = __props;
		const audioRef = ref(null);
		const canvasRef = ref(null);
		const vuCanvasRef = ref(null);
		const blobUrl = ref(null);
		const { isInitialized, isPlaying, rms, zcr, frequencyData, spectrogramHistory, createAnalyzer, play, pause, dispose } = useWebAudio();
		let drawRaf = null;
		onMounted(async () => {
			try {
				const blob = await (await fetch(props.audioUrl)).blob();
				blobUrl.value = URL.createObjectURL(blob);
				if (audioRef.value) {
					audioRef.value.src = blobUrl.value;
					audioRef.value.addEventListener("canplay", () => {
						createAnalyzer(audioRef.value, 2048);
					});
				}
			} catch (e) {
				console.error("Failed to load audio blob for realtime analysis:", e);
			}
		});
		onUnmounted(() => {
			if (drawRaf) cancelAnimationFrame(drawRaf);
			dispose();
			if (blobUrl.value) URL.revokeObjectURL(blobUrl.value);
		});
		watch(isPlaying, (playing) => {
			if (playing) startDrawing();
			else if (drawRaf) cancelAnimationFrame(drawRaf);
		});
		const startDrawing = () => {
			const canvas = canvasRef.value;
			const vuCanvas = vuCanvasRef.value;
			if (!canvas || !vuCanvas) return;
			const ctx = canvas.getContext("2d");
			const vuCtx = vuCanvas.getContext("2d");
			const draw = () => {
				const width = canvas.width;
				const height = canvas.height;
				ctx.fillStyle = "#0B1220";
				ctx.fillRect(0, 0, width, height);
				ctx.beginPath();
				ctx.strokeStyle = "#34D399";
				ctx.lineWidth = 2;
				const data = frequencyData.value;
				const sliceWidth = width / data.length;
				let x = 0;
				for (let i = 0; i < data.length; i++) {
					const y = height - data[i] / 255 * height;
					if (i === 0) ctx.moveTo(x, y);
					else ctx.lineTo(x, y);
					x += sliceWidth;
				}
				ctx.stroke();
				const spec = spectrogramHistory.value;
				if (spec.length > 0) {
					const specWidth = width;
					const specHeight = height * .4;
					const specY = height * .55;
					const binWidth = specWidth / spec.length;
					for (let t = 0; t < spec.length; t++) {
						const frame = spec[t];
						const binHeight = specHeight / frame.length;
						for (let f = 0; f < frame.length; f += 4) {
							ctx.fillStyle = `rgba(52, 211, 153, ${frame[f] / 255 * .6})`;
							ctx.fillRect(t * binWidth, specY + f * binHeight, binWidth + 1, binHeight * 4);
						}
					}
				}
				const vuWidth = vuCanvas.width;
				const vuHeight = vuCanvas.height;
				vuCtx.fillStyle = "#111827";
				vuCtx.fillRect(0, 0, vuWidth, vuHeight);
				const barWidth = vuWidth * .8;
				const barHeight = vuHeight * .4;
				const barX = (vuWidth - barWidth) / 2;
				const barY = (vuHeight - barHeight) / 2;
				vuCtx.fillStyle = "#2a3142";
				vuCtx.fillRect(barX, barY, barWidth, barHeight);
				const fillWidth = barWidth * Math.min(rms.value * 2, 1);
				const gradient = vuCtx.createLinearGradient(barX, 0, barX + barWidth, 0);
				gradient.addColorStop(0, "#34D399");
				gradient.addColorStop(.7, "#D4A574");
				gradient.addColorStop(1, "#ef4444");
				vuCtx.fillStyle = gradient;
				vuCtx.fillRect(barX, barY, fillWidth, barHeight);
				vuCtx.fillStyle = "#F3F0E7";
				vuCtx.font = "12px monospace";
				vuCtx.textAlign = "center";
				vuCtx.fillText(`RMS: ${(rms.value * 100).toFixed(1)}%`, vuWidth / 2, vuHeight - 8);
				drawRaf = requestAnimationFrame(draw);
			};
			draw();
		};
		const formatTime = (seconds) => {
			if (!seconds || isNaN(seconds)) return "0:00";
			return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6" }, _attrs))}><div class="flex items-center justify-between mb-4"><h3 class="font-semibold text-arbor-cream text-sm">Analyse temps réel</h3><button${ssrRenderAttr("aria-label", unref(isPlaying) ? "Pause" : "Lecture")} class="w-10 h-10 rounded-full bg-arbor-emerald flex items-center justify-center hover:bg-arbor-emerald-dark transition-colors">`);
			if (!unref(isPlaying)) _push(`<svg class="w-4 h-4 text-arbor-night ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>`);
			else _push(`<svg class="w-4 h-4 text-arbor-night" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path></svg>`);
			_push(`</button></div><audio preload="metadata" class="hidden"></audio><div class="space-y-3"><canvas width="600" height="200" class="w-full rounded-xl bg-arbor-deep border border-arbor-glass-border"></canvas><canvas width="300" height="60" class="w-full rounded-xl bg-arbor-deep border border-arbor-glass-border"></canvas></div><div class="flex justify-between text-xs text-arbor-sage mt-3"><span>ZCR: ${ssrInterpolate((unref(zcr) * 100).toFixed(1))}%</span><span>Durée: ${ssrInterpolate(formatTime(__props.duration))}</span></div></div>`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AudioAnalysis/RealTimeAnalyzer.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/AudioAnalysis/ExportPanel.vue
var _sfc_main$2 = {
	__name: "ExportPanel",
	__ssrInlineRender: true,
	props: {
		analysisId: {
			type: Number,
			required: true
		},
		visualizations: {
			type: Array,
			default: () => []
		}
	},
	emits: ["export"],
	setup(__props, { emit: __emit }) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6" }, _attrs))}><h3 class="font-semibold text-arbor-cream text-sm mb-4">Exporter</h3><div class="grid grid-cols-2 gap-3"><button class="px-4 py-3 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-colors flex items-center justify-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg> JSON </button><button class="px-4 py-3 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-colors flex items-center justify-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg> CSV </button></div>`);
			if (__props.visualizations.length) {
				_push(`<div class="mt-4 pt-4 border-t border-arbor-glass-border"><h4 class="text-xs text-arbor-sage mb-2">Figures PNG</h4><div class="flex flex-wrap gap-2"><!--[-->`);
				ssrRenderList(__props.visualizations, (viz) => {
					_push(`<a${ssrRenderAttr("href", viz.url)} target="_blank" class="px-3 py-1.5 rounded-lg bg-arbor-glass text-arbor-sage text-xs hover:text-arbor-emerald hover:bg-arbor-emerald/10 transition-colors">${ssrInterpolate(viz.type)}</a>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AudioAnalysis/ExportPanel.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/AudioAnalysis/AnalysisControls.vue
var _sfc_main$1 = {
	__name: "AnalysisControls",
	__ssrInlineRender: true,
	props: { isLoading: {
		type: Boolean,
		default: false
	} },
	emits: ["analyze"],
	setup(__props, { emit: __emit }) {
		const params = reactive({
			n_fft: 2048,
			hop_length: 512,
			frequency_scale: "linear",
			n_mels: 128,
			n_mfcc: 13,
			preprocessing: {
				filter_type: null,
				cutoff: 1e3,
				normalize: true,
				normalize_method: "peak",
				vad: false
			},
			visualization_types: [
				"stft",
				"mel",
				"mfcc"
			]
		});
		const nfftOptions = [
			512,
			1024,
			2048,
			4096
		];
		const scaleOptions = [
			{
				value: "linear",
				label: "Linéaire"
			},
			{
				value: "log",
				label: "Logarithmique"
			},
			{
				value: "mel",
				label: "Mel"
			}
		];
		const filterOptions = [
			{
				value: null,
				label: "Aucun"
			},
			{
				value: "lowpass",
				label: "Passe-bas"
			},
			{
				value: "highpass",
				label: "Passe-haut"
			},
			{
				value: "bandpass",
				label: "Passe-bande"
			}
		];
		const vizOptions = [
			{
				value: "stft",
				label: "STFT"
			},
			{
				value: "mel",
				label: "Mel"
			},
			{
				value: "mfcc",
				label: "MFCC"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6 space-y-5" }, _attrs))}><h3 class="font-semibold text-arbor-cream text-sm">Paramètres d&#39;analyse</h3><div class="space-y-4"><div><label class="block text-xs text-arbor-sage mb-1">Taille FFT (n_fft)</label><select class="w-full bg-arbor-deep border border-arbor-glass-border rounded-lg px-3 py-2 text-sm text-arbor-cream focus:outline-none focus:border-arbor-emerald"><!--[-->`);
			ssrRenderList(nfftOptions, (opt) => {
				_push(`<option${ssrRenderAttr("value", opt)}${ssrIncludeBooleanAttr(Array.isArray(params.n_fft) ? ssrLooseContain(params.n_fft, opt) : ssrLooseEqual(params.n_fft, opt)) ? " selected" : ""}>${ssrInterpolate(opt)}</option>`);
			});
			_push(`<!--]--></select></div><div><label class="block text-xs text-arbor-sage mb-1">Hop length</label><input${ssrRenderAttr("value", params.hop_length)} type="number" min="64" max="4096" step="64" class="w-full bg-arbor-deep border border-arbor-glass-border rounded-lg px-3 py-2 text-base text-arbor-cream focus:outline-none focus:border-arbor-emerald"></div><div><label class="block text-xs text-arbor-sage mb-1">Échelle fréquentielle</label><select class="w-full bg-arbor-deep border border-arbor-glass-border rounded-lg px-3 py-2 text-sm text-arbor-cream focus:outline-none focus:border-arbor-emerald"><!--[-->`);
			ssrRenderList(scaleOptions, (opt) => {
				_push(`<option${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(Array.isArray(params.frequency_scale) ? ssrLooseContain(params.frequency_scale, opt.value) : ssrLooseEqual(params.frequency_scale, opt.value)) ? " selected" : ""}>${ssrInterpolate(opt.label)}</option>`);
			});
			_push(`<!--]--></select></div><div><label class="block text-xs text-arbor-sage mb-1">Nombre de bands Mel</label><input${ssrRenderAttr("value", params.n_mels)} type="number" min="32" max="256" class="w-full bg-arbor-deep border border-arbor-glass-border rounded-lg px-3 py-2 text-base text-arbor-cream focus:outline-none focus:border-arbor-emerald"></div><div><label class="block text-xs text-arbor-sage mb-1">Nombre de MFCC</label><input${ssrRenderAttr("value", params.n_mfcc)} type="number" min="5" max="40" class="w-full bg-arbor-deep border border-arbor-glass-border rounded-lg px-3 py-2 text-base text-arbor-cream focus:outline-none focus:border-arbor-emerald"></div><div class="border-t border-arbor-glass-border pt-4"><h4 class="text-xs text-arbor-sage mb-3">Prétraitement</h4><div class="space-y-3"><div class="flex items-center justify-between"><span class="text-sm text-arbor-cream">Normalisation</span><button class="${ssrRenderClass([params.preprocessing.normalize ? "bg-arbor-emerald" : "bg-arbor-fog", "w-10 h-5 rounded-full relative transition-colors"])}"><span class="${ssrRenderClass([params.preprocessing.normalize ? "translate-x-5" : "translate-x-0.5", "absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform"])}"></span></button></div>`);
			if (params.preprocessing.normalize) _push(`<div><label class="block text-xs text-arbor-sage mb-1">Méthode</label><select class="w-full bg-arbor-deep border border-arbor-glass-border rounded-lg px-3 py-2 text-sm text-arbor-cream focus:outline-none focus:border-arbor-emerald"><option value="peak"${ssrIncludeBooleanAttr(Array.isArray(params.preprocessing.normalize_method) ? ssrLooseContain(params.preprocessing.normalize_method, "peak") : ssrLooseEqual(params.preprocessing.normalize_method, "peak")) ? " selected" : ""}>Peak</option><option value="rms"${ssrIncludeBooleanAttr(Array.isArray(params.preprocessing.normalize_method) ? ssrLooseContain(params.preprocessing.normalize_method, "rms") : ssrLooseEqual(params.preprocessing.normalize_method, "rms")) ? " selected" : ""}>RMS</option><option value="zscore"${ssrIncludeBooleanAttr(Array.isArray(params.preprocessing.normalize_method) ? ssrLooseContain(params.preprocessing.normalize_method, "zscore") : ssrLooseEqual(params.preprocessing.normalize_method, "zscore")) ? " selected" : ""}>Z-Score</option></select></div>`);
			else _push(`<!---->`);
			_push(`<div><label class="block text-xs text-arbor-sage mb-1">Filtre</label><select class="w-full bg-arbor-deep border border-arbor-glass-border rounded-lg px-3 py-2 text-sm text-arbor-cream focus:outline-none focus:border-arbor-emerald"><!--[-->`);
			ssrRenderList(filterOptions, (opt) => {
				_push(`<option${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(Array.isArray(params.preprocessing.filter_type) ? ssrLooseContain(params.preprocessing.filter_type, opt.value) : ssrLooseEqual(params.preprocessing.filter_type, opt.value)) ? " selected" : ""}>${ssrInterpolate(opt.label)}</option>`);
			});
			_push(`<!--]--></select></div>`);
			if (params.preprocessing.filter_type) _push(`<div><label class="block text-xs text-arbor-sage mb-1">Fréquence de coupure (Hz)</label><input${ssrRenderAttr("value", params.preprocessing.cutoff)} type="number" min="10" class="w-full bg-arbor-deep border border-arbor-glass-border rounded-lg px-3 py-2 text-base text-arbor-cream focus:outline-none focus:border-arbor-emerald"></div>`);
			else _push(`<!---->`);
			_push(`<div class="flex items-center justify-between"><span class="text-sm text-arbor-cream">VAD (détection voix)</span><button class="${ssrRenderClass([params.preprocessing.vad ? "bg-arbor-emerald" : "bg-arbor-fog", "w-10 h-5 rounded-full relative transition-colors"])}"><span class="${ssrRenderClass([params.preprocessing.vad ? "translate-x-5" : "translate-x-0.5", "absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform"])}"></span></button></div></div></div><div class="border-t border-arbor-glass-border pt-4"><h4 class="text-xs text-arbor-sage mb-3">Visualisations</h4><div class="flex flex-wrap gap-2"><!--[-->`);
			ssrRenderList(vizOptions, (opt) => {
				_push(`<button class="${ssrRenderClass([params.visualization_types.includes(opt.value) ? "bg-arbor-emerald/20 text-arbor-emerald border-arbor-emerald/30" : "bg-arbor-glass text-arbor-sage border-arbor-glass-border", "px-3 py-1.5 rounded-lg text-xs border transition-colors"])}">${ssrInterpolate(opt.label)}</button>`);
			});
			_push(`<!--]--></div></div></div><button${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="w-full py-2.5 rounded-lg bg-arbor-emerald text-arbor-night font-medium text-sm hover:bg-arbor-emerald-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">`);
			if (__props.isLoading) _push(`<svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
			else _push(`<!---->`);
			_push(`<span>${ssrInterpolate(__props.isLoading ? "Analyse en cours..." : "Lancer l'analyse")}</span></button></div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AudioAnalysis/AnalysisControls.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Composables/useAudioAnalysis.js
function useAudioAnalysis(soundId) {
	const analysis = ref(null);
	const visualizations = ref([]);
	const isLoading = ref(false);
	const isAnalyzing = ref(false);
	const error = ref(null);
	const hasAnalysis = computed(() => analysis.value !== null);
	const isPending = computed(() => analysis.value?.status === "pending");
	const isCompleted = computed(() => analysis.value?.status === "completed");
	const isFailed = computed(() => analysis.value?.status === "failed");
	const fetchAnalysis = async () => {
		isLoading.value = true;
		error.value = null;
		try {
			const response = await fetch(route("api.sounds.analysis.show", soundId), { headers: { "Accept": "application/json" } });
			if (!response.ok) throw new Error("Erreur lors du chargement de l'analyse");
			const data = await response.json();
			analysis.value = data.analysis;
			visualizations.value = data.analysis?.visualizations ?? [];
		} catch (err) {
			error.value = err.message;
		} finally {
			isLoading.value = false;
		}
	};
	const triggerAnalysis = async (params = {}) => {
		isAnalyzing.value = true;
		error.value = null;
		try {
			await router.post(route("sounds.analysis.store", soundId), params, {
				preserveScroll: true,
				onSuccess: () => {
					analysis.value = { status: "pending" };
				},
				onError: (errors) => {
					error.value = Object.values(errors).flat().join(", ");
				}
			});
		} catch (err) {
			error.value = err.message;
		} finally {
			isAnalyzing.value = false;
		}
	};
	const exportData = async (analysisId, format) => {
		const url = route("sounds.analysis.export", {
			analysis: analysisId,
			format
		});
		window.open(url, "_blank");
	};
	return {
		analysis,
		visualizations,
		isLoading,
		isAnalyzing,
		error,
		hasAnalysis,
		isPending,
		isCompleted,
		isFailed,
		fetchAnalysis,
		triggerAnalysis,
		exportData
	};
}
//#endregion
//#region resources/js/Pages/AudioAnalysis/Dashboard.vue
var _sfc_main = {
	__name: "Dashboard",
	__ssrInlineRender: true,
	props: {
		sound: Object,
		analysis: Object,
		isOwner: Boolean
	},
	setup(__props) {
		const props = __props;
		const { analysis: liveAnalysis, visualizations, isLoading, isAnalyzing, error, isPending, isCompleted, triggerAnalysis, exportData } = useAudioAnalysis(props.sound.id);
		if (props.analysis) {
			liveAnalysis.value = props.analysis;
			visualizations.value = props.analysis.visualizations ?? [];
		}
		const handleAnalyze = (params) => {
			triggerAnalysis(params);
		};
		const handleExport = ({ analysisId, format }) => {
			exportData(analysisId, format);
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: `Analyse — ${__props.sound.title}` }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$7, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="pt-24 pb-16"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8"${_scopeId}><div class="flex items-center gap-2 text-sm text-arbor-sage mb-2"${_scopeId}><span${_scopeId}>Analyse audio</span><span class="text-arbor-glass-border"${_scopeId}>/</span><span class="text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.sound.title)}</span></div><h1 class="font-display text-2xl font-bold text-arbor-cream"${_scopeId}> Tableau de bord d&#39;analyse </h1></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><div class="lg:col-span-2 space-y-6"${_scopeId}>`);
						if (unref(isPending)) _push(`<div class="glass-card p-6 flex items-center gap-4"${_scopeId}><svg class="animate-spin h-6 w-6 text-arbor-emerald" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"${_scopeId}></path></svg><div${_scopeId}><p class="text-arbor-cream font-medium"${_scopeId}>Analyse en cours...</p><p class="text-sm text-arbor-sage"${_scopeId}>Les résultats apparaîtront automatiquement.</p></div></div>`);
						else _push(`<!---->`);
						if (unref(error)) _push(`<div class="glass-card p-4 border-red-500/30 bg-red-500/5"${_scopeId}><p class="text-red-400 text-sm"${_scopeId}>${ssrInterpolate(unref(error))}</p></div>`);
						else _push(`<!---->`);
						_push(ssrRenderComponent(_sfc_main$6, { visualizations: unref(visualizations) }, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$4, { visualizations: unref(visualizations) }, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$3, {
							"audio-url": __props.sound.audio_url,
							duration: __props.sound.duration
						}, null, _parent, _scopeId));
						_push(`</div><div class="space-y-6"${_scopeId}>`);
						if (__props.isOwner) _push(ssrRenderComponent(_sfc_main$1, {
							"is-loading": unref(isAnalyzing),
							onAnalyze: handleAnalyze
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(_sfc_main$5, { features: unref(liveAnalysis)?.features ?? {} }, null, _parent, _scopeId));
						if (__props.isOwner && unref(liveAnalysis)?.id) _push(ssrRenderComponent(_sfc_main$2, {
							"analysis-id": unref(liveAnalysis).id,
							visualizations: unref(visualizations),
							onExport: handleExport
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						if (!__props.isOwner) _push(`<div class="glass-card p-6"${_scopeId}><p class="text-sm text-arbor-sage"${_scopeId}> Cet aperçu est limité. Le créateur a accès à l&#39;analyse complète. </p></div>`);
						else _push(`<!---->`);
						_push(`</div></div></div></div>`);
					} else return [createVNode("div", { class: "pt-24 pb-16" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "mb-8" }, [createVNode("div", { class: "flex items-center gap-2 text-sm text-arbor-sage mb-2" }, [
						createVNode("span", null, "Analyse audio"),
						createVNode("span", { class: "text-arbor-glass-border" }, "/"),
						createVNode("span", { class: "text-arbor-cream" }, toDisplayString(__props.sound.title), 1)
					]), createVNode("h1", { class: "font-display text-2xl font-bold text-arbor-cream" }, " Tableau de bord d'analyse ")]), createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
						unref(isPending) ? (openBlock(), createBlock("div", {
							key: 0,
							class: "glass-card p-6 flex items-center gap-4"
						}, [(openBlock(), createBlock("svg", {
							class: "animate-spin h-6 w-6 text-arbor-emerald",
							fill: "none",
							viewBox: "0 0 24 24"
						}, [createVNode("circle", {
							class: "opacity-25",
							cx: "12",
							cy: "12",
							r: "10",
							stroke: "currentColor",
							"stroke-width": "4"
						}), createVNode("path", {
							class: "opacity-75",
							fill: "currentColor",
							d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
						})])), createVNode("div", null, [createVNode("p", { class: "text-arbor-cream font-medium" }, "Analyse en cours..."), createVNode("p", { class: "text-sm text-arbor-sage" }, "Les résultats apparaîtront automatiquement.")])])) : createCommentVNode("", true),
						unref(error) ? (openBlock(), createBlock("div", {
							key: 1,
							class: "glass-card p-4 border-red-500/30 bg-red-500/5"
						}, [createVNode("p", { class: "text-red-400 text-sm" }, toDisplayString(unref(error)), 1)])) : createCommentVNode("", true),
						createVNode(_sfc_main$6, { visualizations: unref(visualizations) }, null, 8, ["visualizations"]),
						createVNode(_sfc_main$4, { visualizations: unref(visualizations) }, null, 8, ["visualizations"]),
						createVNode(_sfc_main$3, {
							"audio-url": __props.sound.audio_url,
							duration: __props.sound.duration
						}, null, 8, ["audio-url", "duration"])
					]), createVNode("div", { class: "space-y-6" }, [
						__props.isOwner ? (openBlock(), createBlock(_sfc_main$1, {
							key: 0,
							"is-loading": unref(isAnalyzing),
							onAnalyze: handleAnalyze
						}, null, 8, ["is-loading"])) : createCommentVNode("", true),
						createVNode(_sfc_main$5, { features: unref(liveAnalysis)?.features ?? {} }, null, 8, ["features"]),
						__props.isOwner && unref(liveAnalysis)?.id ? (openBlock(), createBlock(_sfc_main$2, {
							key: 1,
							"analysis-id": unref(liveAnalysis).id,
							visualizations: unref(visualizations),
							onExport: handleExport
						}, null, 8, ["analysis-id", "visualizations"])) : createCommentVNode("", true),
						!__props.isOwner ? (openBlock(), createBlock("div", {
							key: 2,
							class: "glass-card p-6"
						}, [createVNode("p", { class: "text-sm text-arbor-sage" }, " Cet aperçu est limité. Le créateur a accès à l'analyse complète. ")])) : createCommentVNode("", true)
					])])])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/AudioAnalysis/Dashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

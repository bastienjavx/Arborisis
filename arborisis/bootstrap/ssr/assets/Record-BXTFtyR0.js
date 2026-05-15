import { t as _sfc_main$2 } from "./AuthenticatedLayout-C3aZldG3.js";
import { n as _sfc_main$3, r as _sfc_main$5, t as _sfc_main$4 } from "./TextInput-ih5vh4Ub.js";
import { Head, useForm } from "@inertiajs/vue3";
import { Fragment, Transition, computed, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, onMounted, onUnmounted, openBlock, ref, renderList, shallowRef, toDisplayString, unref, useSSRContext, vModelCheckbox, vModelSelect, vModelText, watch, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Composables/useAudioRecorder.js
var SUPPORTED_MIME_TYPES = [
	"audio/webm;codecs=opus",
	"audio/webm",
	"audio/mp4",
	"audio/mp4;codecs=mp4a",
	"audio/aac"
];
function getBestMimeType() {
	for (const type of SUPPORTED_MIME_TYPES) if (MediaRecorder.isTypeSupported(type)) return type;
	return "";
}
function useAudioRecorder() {
	const isRecording = ref(false);
	const isPaused = ref(false);
	const duration = ref(0);
	const audioBlob = ref(null);
	const audioUrl = ref(null);
	const error = ref(null);
	const devices = ref([]);
	const selectedDevice = ref(null);
	const rms = ref(0);
	const peak = ref(0);
	const isLoadingDevices = ref(false);
	let mediaRecorder = null;
	let mediaStream = null;
	let audioContext = null;
	const analyser = shallowRef(null);
	const sourceNode = shallowRef(null);
	let chunks = [];
	let timerInterval = null;
	let rafId = null;
	let startTime = 0;
	let pausedDuration = 0;
	const cleanup = () => {
		if (rafId) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
		}
		if (mediaRecorder && mediaRecorder.state !== "inactive") try {
			mediaRecorder.stop();
		} catch {}
		if (mediaStream) {
			mediaStream.getTracks().forEach((t) => t.stop());
			mediaStream = null;
		}
		if (sourceNode.value) {
			try {
				sourceNode.value.disconnect();
			} catch {}
			sourceNode.value = null;
		}
		if (analyser.value) {
			try {
				analyser.value.disconnect();
			} catch {}
			analyser.value = null;
		}
		if (audioContext && audioContext.state !== "closed") {
			try {
				audioContext.close();
			} catch {}
			audioContext = null;
		}
		mediaRecorder = null;
	};
	const enumerateDevices = async () => {
		isLoadingDevices.value = true;
		error.value = null;
		try {
			let deviceList = await navigator.mediaDevices.enumerateDevices();
			if (deviceList.every((d) => !d.label)) try {
				(await navigator.mediaDevices.getUserMedia({ audio: true })).getTracks().forEach((t) => t.stop());
				deviceList = await navigator.mediaDevices.enumerateDevices();
			} catch (permErr) {
				error.value = "Veuillez autoriser l'accès au micro pour voir les périphériques.";
				isLoadingDevices.value = false;
				return;
			}
			devices.value = deviceList.filter((d) => d.kind === "audioinput").map((d) => ({
				deviceId: d.deviceId,
				label: d.label || `Micro ${d.deviceId.slice(0, 8)}`
			}));
			if (devices.value.length > 0 && !selectedDevice.value) selectedDevice.value = devices.value[0].deviceId;
		} catch (e) {
			error.value = e.message || "Impossible d'accéder aux périphériques audio.";
		} finally {
			isLoadingDevices.value = false;
		}
	};
	const startAnalysisLoop = () => {
		if (!analyser.value) return;
		const dataArray = new Uint8Array(analyser.value.frequencyBinCount);
		const timeArray = new Uint8Array(analyser.value.frequencyBinCount);
		const loop = () => {
			if (!analyser.value) return;
			analyser.value.getByteFrequencyData(dataArray);
			analyser.value.getByteTimeDomainData(timeArray);
			let sum = 0;
			for (let i = 0; i < timeArray.length; i++) {
				const normalized = (timeArray[i] - 128) / 128;
				sum += normalized * normalized;
			}
			rms.value = Math.sqrt(sum / timeArray.length);
			let max = 0;
			for (let i = 0; i < dataArray.length; i++) if (dataArray[i] > max) max = dataArray[i];
			peak.value = max / 255;
			rafId = requestAnimationFrame(loop);
		};
		loop();
	};
	const startRecording = async (opts = {}) => {
		cleanup();
		error.value = null;
		audioBlob.value = null;
		if (audioUrl.value) {
			URL.revokeObjectURL(audioUrl.value);
			audioUrl.value = null;
		}
		duration.value = 0;
		pausedDuration = 0;
		chunks = [];
		const constraints = { audio: {
			deviceId: opts.deviceId ? { exact: opts.deviceId } : void 0,
			echoCancellation: opts.echoCancellation ?? false,
			noiseSuppression: opts.noiseSuppression ?? false,
			autoGainControl: opts.autoGainControl ?? false,
			sampleRate: opts.sampleRate ?? 48e3,
			channelCount: opts.channelCount ?? 2
		} };
		try {
			mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
		} catch (e) {
			error.value = e.message || "Accès au micro refusé.";
			return;
		}
		audioContext = new (window.AudioContext || window.webkitAudioContext)();
		analyser.value = audioContext.createAnalyser();
		analyser.value.fftSize = 2048;
		analyser.value.smoothingTimeConstant = .8;
		sourceNode.value = audioContext.createMediaStreamSource(mediaStream);
		sourceNode.value.connect(analyser.value);
		const mimeType = getBestMimeType();
		const recorderOpts = mimeType ? { mimeType } : {};
		try {
			mediaRecorder = new MediaRecorder(mediaStream, recorderOpts);
		} catch (e) {
			error.value = e.message || "Votre navigateur ne supporte pas l'enregistrement audio.";
			cleanup();
			return;
		}
		mediaRecorder.ondataavailable = (event) => {
			if (event.data && event.data.size > 0) chunks.push(event.data);
		};
		mediaRecorder.onstop = () => {
			const blob = new Blob(chunks, { type: mediaRecorder.mimeType || "audio/webm" });
			audioBlob.value = blob;
			audioUrl.value = URL.createObjectURL(blob);
			chunks = [];
			cleanup();
		};
		mediaRecorder.onerror = (e) => {
			error.value = "Erreur lors de l'enregistrement : " + (e.message || "inconnue");
			cleanup();
		};
		mediaRecorder.start(1e3);
		isRecording.value = true;
		isPaused.value = false;
		startTime = Date.now();
		startAnalysisLoop();
		timerInterval = setInterval(() => {
			if (!isPaused.value) duration.value = Math.floor((Date.now() - startTime - pausedDuration) / 1e3);
		}, 500);
	};
	const pauseRecording = () => {
		if (mediaRecorder && mediaRecorder.state === "recording") {
			mediaRecorder.pause();
			isPaused.value = true;
			pausedDuration += Date.now() - startTime - pausedDuration - duration.value * 1e3;
		}
	};
	const resumeRecording = () => {
		if (mediaRecorder && mediaRecorder.state === "paused") {
			mediaRecorder.resume();
			isPaused.value = false;
			startTime = Date.now() - duration.value * 1e3 - pausedDuration;
		}
	};
	const stopRecording = () => {
		if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
		isRecording.value = false;
		isPaused.value = false;
		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
		}
		if (rafId) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	};
	const resetRecording = () => {
		cleanup();
		isRecording.value = false;
		isPaused.value = false;
		duration.value = 0;
		if (audioUrl.value) {
			URL.revokeObjectURL(audioUrl.value);
			audioUrl.value = null;
		}
		audioBlob.value = null;
		error.value = null;
		rms.value = 0;
		peak.value = 0;
	};
	const formatDuration = (seconds) => {
		return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
	};
	onUnmounted(() => {
		cleanup();
		if (audioUrl.value) URL.revokeObjectURL(audioUrl.value);
	});
	return {
		isRecording,
		isPaused,
		duration,
		audioBlob,
		audioUrl,
		error,
		devices,
		selectedDevice,
		rms,
		peak,
		isLoadingDevices,
		analyser,
		sourceNode,
		enumerateDevices,
		startRecording,
		pauseRecording,
		resumeRecording,
		stopRecording,
		resetRecording,
		formatDuration
	};
}
//#endregion
//#region resources/js/Components/Audio/AudioRecorder.vue
var _sfc_main$1 = {
	__name: "AudioRecorder",
	__ssrInlineRender: true,
	emits: ["confirm", "cancel"],
	setup(__props, { emit: __emit }) {
		const { isRecording, isPaused, duration, audioBlob, audioUrl, error, devices, selectedDevice, rms, peak, isLoadingDevices, analyser, enumerateDevices, startRecording, pauseRecording, resumeRecording, stopRecording, resetRecording, formatDuration } = useAudioRecorder();
		ref(null);
		ref(null);
		ref(false);
		const showAdvanced = ref(false);
		const echoCancellation = ref(false);
		const noiseSuppression = ref(false);
		const autoGainControl = ref(false);
		let drawRaf = null;
		const state = computed(() => {
			if (audioUrl.value) return "preview";
			if (isRecording.value && isPaused.value) return "paused";
			if (isRecording.value) return "recording";
			return "idle";
		});
		const timerDisplay = computed(() => formatDuration(duration.value));
		watch(state, (s) => {
			if (s !== "recording" && drawRaf) {
				cancelAnimationFrame(drawRaf);
				drawRaf = null;
			}
		});
		onMounted(() => {
			enumerateDevices();
		});
		onUnmounted(() => {
			if (drawRaf) cancelAnimationFrame(drawRaf);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden" }, _attrs))}><div class="pointer-events-none absolute inset-0 opacity-30" style="${ssrRenderStyle({ "background": "radial-gradient(ellipse 60% 40% at 50% 55%, rgba(52,211,153,0.08), transparent 70%)" })}"></div>`);
			if (unref(error)) _push(`<div class="absolute top-4 left-4 right-4 z-20 mx-auto max-w-md rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300 backdrop-blur-sm">${ssrInterpolate(unref(error))} <button class="ml-2 inline-block text-xs underline opacity-80 hover:opacity-100"> Fermer </button></div>`);
			else _push(`<!---->`);
			_push(`<div class="z-10 mb-10 flex w-full max-w-md flex-col items-center gap-4 px-6"><div class="relative w-full"><label class="mb-1.5 block text-center text-xs font-medium tracking-widest text-arbor-sage/70 uppercase"> Source audio </label><select${ssrIncludeBooleanAttr(unref(isRecording) || unref(isLoadingDevices)) ? " disabled" : ""} class="w-full appearance-none rounded-xl border border-arbor-glass-border bg-arbor-deep/60 px-4 py-2.5 text-sm text-arbor-cream shadow-sm backdrop-blur-sm transition-colors focus:border-arbor-emerald focus:outline-none focus:ring-1 focus:ring-arbor-emerald disabled:opacity-50"><!--[-->`);
			ssrRenderList(unref(devices), (dev) => {
				_push(`<option${ssrRenderAttr("value", dev.deviceId)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedDevice)) ? ssrLooseContain(unref(selectedDevice), dev.deviceId) : ssrLooseEqual(unref(selectedDevice), dev.deviceId)) ? " selected" : ""}>${ssrInterpolate(dev.label)}</option>`);
			});
			_push(`<!--]--></select><div class="pointer-events-none absolute right-3 top-[2.1rem] text-arbor-sage/50"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></div><button class="text-xs text-arbor-sage/60 underline-offset-2 transition-colors hover:text-arbor-sage">${ssrInterpolate(showAdvanced.value ? "Masquer les options" : "Options avancées")}</button><div class="w-full overflow-hidden" style="${ssrRenderStyle(showAdvanced.value ? null : { display: "none" })}"><div class="flex flex-wrap justify-center gap-4 rounded-xl border border-arbor-glass-border bg-arbor-deep/40 px-4 py-3"><label class="flex cursor-pointer items-center gap-2 text-xs text-arbor-sage"><input${ssrIncludeBooleanAttr(Array.isArray(echoCancellation.value) ? ssrLooseContain(echoCancellation.value, null) : echoCancellation.value) ? " checked" : ""} type="checkbox" class="rounded border-arbor-glass-border bg-arbor-deep text-arbor-emerald focus:ring-arbor-emerald"> Réduction d&#39;écho </label><label class="flex cursor-pointer items-center gap-2 text-xs text-arbor-sage"><input${ssrIncludeBooleanAttr(Array.isArray(noiseSuppression.value) ? ssrLooseContain(noiseSuppression.value, null) : noiseSuppression.value) ? " checked" : ""} type="checkbox" class="rounded border-arbor-glass-border bg-arbor-deep text-arbor-emerald focus:ring-arbor-emerald"> Suppression de bruit </label><label class="flex cursor-pointer items-center gap-2 text-xs text-arbor-sage"><input${ssrIncludeBooleanAttr(Array.isArray(autoGainControl.value) ? ssrLooseContain(autoGainControl.value, null) : autoGainControl.value) ? " checked" : ""} type="checkbox" class="rounded border-arbor-glass-border bg-arbor-deep text-arbor-emerald focus:ring-arbor-emerald"> AGC </label></div></div></div><div class="relative z-10 mb-8 h-24 w-full max-w-2xl px-6"><canvas class="${ssrRenderClass([{ "opacity-100": state.value === "recording" || state.value === "paused" }, "h-full w-full rounded-xl opacity-0 transition-opacity duration-500"])}"></canvas></div><div class="relative z-10 flex flex-col items-center"><div class="${ssrRenderClass([{ "scale-110 opacity-0": state.value !== "idle" }, "absolute inset-0 -m-6 rounded-full border border-arbor-emerald/10 transition-all duration-700"])}"></div><div class="${ssrRenderClass([{ "scale-110 opacity-0": state.value !== "idle" }, "absolute inset-0 -m-12 rounded-full border border-arbor-emerald/5 transition-all duration-700 delay-100"])}"></div><div class="absolute inset-0 -m-4 rounded-full border-2 border-arbor-emerald/40 transition-all duration-300" style="${ssrRenderStyle({
				transform: state.value === "recording" ? `scale(${1 + unref(peak) * .12})` : "scale(1)",
				opacity: state.value === "recording" ? .5 + unref(peak) * .5 : 0
			})}"></div><div class="absolute inset-0 -m-8 rounded-full border border-arbor-emerald/20 transition-all duration-500" style="${ssrRenderStyle({
				transform: state.value === "recording" ? `scale(${1 + unref(rms) * .2})` : "scale(1)",
				opacity: state.value === "recording" ? .3 + unref(rms) * .4 : 0
			})}"></div><button class="${ssrRenderClass([[state.value === "recording" ? "bg-arbor-emerald/10 shadow-[0_0_40px_rgba(52,211,153,0.25)]" : state.value === "paused" ? "bg-arbor-amber/10 shadow-[0_0_40px_rgba(212,165,116,0.15)]" : "bg-arbor-glass shadow-[0_0_30px_rgba(52,211,153,0.08)] hover:shadow-[0_0_50px_rgba(52,211,153,0.18)] hover:bg-arbor-emerald/5"], "relative flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300 active:scale-[0.96]"])}">`);
			if (state.value === "idle") _push(`<svg class="h-10 w-10 text-arbor-emerald transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>`);
			else if (state.value === "recording") _push(`<svg class="h-10 w-10 text-arbor-emerald" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>`);
			else if (state.value === "paused") _push(`<svg class="ml-1 h-10 w-10 text-arbor-amber" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>`);
			else _push(`<!---->`);
			_push(`</button><div class="${ssrRenderClass([{
				"text-arbor-emerald": state.value === "recording",
				"text-arbor-amber": state.value === "paused",
				"text-arbor-sage/50": state.value === "idle"
			}, "mt-5 font-mono text-3xl tracking-widest transition-colors duration-300"])}">${ssrInterpolate(timerDisplay.value)}</div><p class="mt-2 text-sm font-display italic text-arbor-sage/60 transition-all duration-300">`);
			if (state.value === "idle") _push(`<span>Appuyez pour écouter le silence</span>`);
			else if (state.value === "recording") _push(`<span>Enregistrement en cours…</span>`);
			else if (state.value === "paused") _push(`<span>En pause</span>`);
			else _push(`<!---->`);
			_push(`</p></div>`);
			if (state.value === "recording" || state.value === "paused") _push(`<div class="z-10 mt-10 flex gap-6"><button class="flex h-12 w-12 items-center justify-center rounded-full border border-arbor-glass-border bg-arbor-deep/60 text-arbor-cream backdrop-blur-sm transition-all hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30" title="Arrêter"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg></button></div>`);
			else _push(`<!---->`);
			if (state.value === "preview") _push(`<div class="z-10 mt-8 flex w-full max-w-lg flex-col items-center gap-6 px-6"><div class="w-full rounded-2xl border border-arbor-glass-border bg-arbor-deep/40 p-6 backdrop-blur-sm"><p class="mb-4 text-center font-display text-lg italic text-arbor-cream"> Votre capture </p><audio${ssrRenderAttr("src", unref(audioUrl))} class="w-full" controls></audio><div class="mt-6 flex justify-center gap-4"><button class="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 text-sm"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Réenregistrer </button><button class="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Utiliser cet enregistrement </button></div></div></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Audio/AudioRecorder.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Sounds/Record.vue
var _sfc_main = {
	__name: "Record",
	__ssrInlineRender: true,
	props: {
		categories: Array,
		environments: Array
	},
	setup(__props) {
		const step = ref("record");
		const recordedBlob = ref(null);
		const recordedUrl = ref(null);
		const form = useForm({
			audio_file: null,
			title: "",
			description: "",
			recorded_at: "",
			recorded_time: "",
			latitude: "",
			longitude: "",
			location_name: "",
			is_sensitive_location: false,
			tags: "",
			category_id: "",
			environment_id: "",
			equipment: "",
			license: "all_rights_reserved",
			visibility: "public",
			cover_image: null
		});
		const coverPreview = ref(null);
		ref(false);
		const geoError = ref("");
		const locating = ref(false);
		const uploadProgress = ref(0);
		const licenses = [
			{
				value: "all_rights_reserved",
				label: "Tous droits réservés"
			},
			{
				value: "cc_by",
				label: "CC BY"
			},
			{
				value: "cc_by_sa",
				label: "CC BY-SA"
			},
			{
				value: "cc_by_nc",
				label: "CC BY-NC"
			},
			{
				value: "cc0",
				label: "CC0 (Domaine public)"
			}
		];
		const visibilities = [
			{
				value: "public",
				label: "Public"
			},
			{
				value: "followers",
				label: "Abonnés uniquement"
			},
			{
				value: "private",
				label: "Privé"
			}
		];
		const onConfirmRecording = (blob, url) => {
			recordedBlob.value = blob;
			recordedUrl.value = url;
			const now = /* @__PURE__ */ new Date();
			const y = now.getFullYear();
			const m = String(now.getMonth() + 1).padStart(2, "0");
			const d = String(now.getDate()).padStart(2, "0");
			const h = String(now.getHours()).padStart(2, "0");
			const min = String(now.getMinutes()).padStart(2, "0");
			const filename = `<redacted>_record_${y}${m}${d}_${h}${min}${String(now.getSeconds()).padStart(2, "0")}.${blob.type.includes("mp4") || blob.type.includes("aac") ? "m4a" : "webm"}`;
			form.audio_file = new File([blob], filename, { type: blob.type || "audio/webm" });
			form.recorded_at = `${y}-${m}-${d}`;
			form.recorded_time = `${h}:${min}`;
			step.value = "meta";
		};
		const handleCoverChange = (e) => {
			const file = e.target.files[0];
			if (file) {
				form.cover_image = file;
				coverPreview.value = URL.createObjectURL(file);
			}
		};
		const getCurrentLocation = () => {
			if (!navigator.geolocation) {
				geoError.value = "La géolocalisation n'est pas supportée par ce navigateur.";
				return;
			}
			locating.value = true;
			geoError.value = "";
			navigator.geolocation.getCurrentPosition((position) => {
				form.latitude = position.coords.latitude.toFixed(6);
				form.longitude = position.coords.longitude.toFixed(6);
				locating.value = false;
			}, () => {
				geoError.value = "Impossible d'obtenir votre position. Vérifiez les permissions de votre navigateur.";
				locating.value = false;
			});
		};
		const submit = () => {
			uploadProgress.value = 0;
			form.post(route("sounds.store"), {
				forceFormData: true,
				onProgress: (progress) => {
					uploadProgress.value = progress.percentage;
				},
				onSuccess: () => {
					form.reset();
					coverPreview.value = null;
					uploadProgress.value = 0;
					step.value = "record";
					recordedBlob.value = null;
					recordedUrl.value = null;
				}
			});
		};
		const goBackToRecord = () => {
			step.value = "record";
			recordedBlob.value = null;
			recordedUrl.value = null;
			form.audio_file = null;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Enregistrer un son" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$2, null, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<h2 class="font-display text-xl font-semibold text-arbor-cream"${_scopeId}> Enregistrer un son </h2>`);
					else return [createVNode("h2", { class: "font-display text-xl font-semibold text-arbor-cream" }, " Enregistrer un son ")];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-[calc(100vh-8rem)]"${_scopeId}>`);
						if (step.value === "record") {
							_push(`<div class="py-6"${_scopeId}><div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8 text-center"${_scopeId}><h1 class="font-display text-3xl font-light italic text-arbor-cream sm:text-4xl"${_scopeId}> Capturez l&#39;instant </h1><p class="mt-2 text-sm text-arbor-sage/70"${_scopeId}> Un enregistrement est un acte de présence. Choisissez votre source et appuyez sur le bouton. </p></div><div class="glass-card overflow-hidden"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$1, { onConfirm: onConfirmRecording }, null, _parent, _scopeId));
							_push(`</div></div></div>`);
						} else _push(`<!---->`);
						if (step.value === "meta") {
							_push(`<div class="py-8"${_scopeId}><div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="font-display text-2xl font-light italic text-arbor-cream"${_scopeId}> Décrivez votre capture </h2><p class="mt-1 text-sm text-arbor-sage/60"${_scopeId}> Vous pouvez revenir en arrière pour réenregistrer. </p></div><button class="btn-secondary text-sm"${_scopeId}><svg class="mr-1.5 inline h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Retour </button></div><form class="space-y-8"${_scopeId}><div class="glass-card p-6"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, { value: "Enregistrement" }, null, _parent, _scopeId));
							_push(`<div class="mt-3 flex items-center gap-4 rounded-xl border border-arbor-glass-border bg-arbor-deep/40 px-4 py-3"${_scopeId}><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-arbor-emerald/10"${_scopeId}><svg class="h-5 w-5 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div><div class="min-w-0 flex-1"${_scopeId}><p class="truncate text-sm text-arbor-cream"${_scopeId}>${ssrInterpolate(unref(form).audio_file?.name || "Enregistrement")}</p><p class="text-xs text-arbor-sage/60"${_scopeId}>${ssrInterpolate(unref(form).audio_file?.type?.includes("mp4") || unref(form).audio_file?.type?.includes("aac") ? "M4A" : "WebM")} — ${ssrInterpolate((unref(form).audio_file?.size / 1024 / 1024).toFixed(2))} Mo </p></div><audio${ssrRenderAttr("src", recordedUrl.value)} controls class="h-8 w-32 sm:w-48"${_scopeId}></audio></div></div><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "title",
								value: "Titre *"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_sfc_main$4, {
								id: "title",
								modelValue: unref(form).title,
								"onUpdate:modelValue": ($event) => unref(form).title = $event,
								type: "text",
								class: "mt-2 block w-full",
								placeholder: "Ex: Aube dans la forêt de Fontainebleau",
								required: ""
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_sfc_main$5, { message: unref(form).errors.title }, null, _parent, _scopeId));
							_push(`</div><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "description",
								value: "Description"
							}, null, _parent, _scopeId));
							_push(`<textarea id="description" rows="4" class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald" placeholder="Décrivez le contexte de l&#39;enregistrement, ce que vous entendez, l&#39;ambiance..."${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
							_push(ssrRenderComponent(_sfc_main$5, { message: unref(form).errors.description }, null, _parent, _scopeId));
							_push(`</div><div class="glass-card p-6"${_scopeId}><h3 class="mb-4 font-semibold text-arbor-cream"${_scopeId}>Localisation *</h3><div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId}><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "latitude",
								value: "Latitude"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_sfc_main$4, {
								id: "latitude",
								modelValue: unref(form).latitude,
								"onUpdate:modelValue": ($event) => unref(form).latitude = $event,
								type: "text",
								class: "mt-2 block w-full",
								placeholder: "48.8566",
								required: ""
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_sfc_main$5, { message: unref(form).errors.latitude }, null, _parent, _scopeId));
							_push(`</div><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "longitude",
								value: "Longitude"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_sfc_main$4, {
								id: "longitude",
								modelValue: unref(form).longitude,
								"onUpdate:modelValue": ($event) => unref(form).longitude = $event,
								type: "text",
								class: "mt-2 block w-full",
								placeholder: "2.3522",
								required: ""
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_sfc_main$5, { message: unref(form).errors.longitude }, null, _parent, _scopeId));
							_push(`</div></div><button type="button"${ssrIncludeBooleanAttr(locating.value) ? " disabled" : ""} class="mb-2 flex items-center gap-1.5 text-sm text-arbor-emerald transition-colors hover:text-arbor-emerald-dark disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}>`);
							if (locating.value) _push(`<svg class="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"${_scopeId}></path></svg>`);
							else _push(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg>`);
							if (locating.value) _push(`<span${_scopeId}>Localisation...</span>`);
							else _push(`<span${_scopeId}>Utiliser ma position actuelle</span>`);
							_push(`</button>`);
							if (geoError.value) _push(`<div class="mb-4 flex items-center gap-1.5 text-sm text-red-400"${_scopeId}><svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> ${ssrInterpolate(geoError.value)}</div>`);
							else _push(`<!---->`);
							_push(`<div class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId}><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "location_name",
								value: "Nom du lieu"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_sfc_main$4, {
								id: "location_name",
								modelValue: unref(form).location_name,
								"onUpdate:modelValue": ($event) => unref(form).location_name = $event,
								type: "text",
								class: "mt-2 block w-full",
								placeholder: "Ex: Forêt de Fontainebleau"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="mt-4 flex items-center gap-2"${_scopeId}><input id="is_sensitive_location"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_sensitive_location) ? ssrLooseContain(unref(form).is_sensitive_location, null) : unref(form).is_sensitive_location) ? " checked" : ""} type="checkbox" class="rounded border-arbor-glass-border bg-arbor-deep text-arbor-emerald focus:ring-arbor-emerald"${_scopeId}><label for="is_sensitive_location" class="text-sm text-arbor-sage"${_scopeId}> Ce lieu est sensible — afficher une localisation approximative uniquement </label></div></div><div class="grid grid-cols-1 gap-6 sm:grid-cols-2"${_scopeId}><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "recorded_at",
								value: "Date d'enregistrement"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_sfc_main$4, {
								id: "recorded_at",
								modelValue: unref(form).recorded_at,
								"onUpdate:modelValue": ($event) => unref(form).recorded_at = $event,
								type: "date",
								class: "mt-2 block w-full"
							}, null, _parent, _scopeId));
							_push(`</div><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "recorded_time",
								value: "Heure d'enregistrement"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_sfc_main$4, {
								id: "recorded_time",
								modelValue: unref(form).recorded_time,
								"onUpdate:modelValue": ($event) => unref(form).recorded_time = $event,
								type: "time",
								class: "mt-2 block w-full"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="grid grid-cols-1 gap-6 sm:grid-cols-2"${_scopeId}><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "category_id",
								value: "Catégorie"
							}, null, _parent, _scopeId));
							_push(`<select id="category_id" class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}${_scopeId}>Choisir une catégorie</option><!--[-->`);
							ssrRenderList(__props.categories, (cat) => {
								_push(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, cat.id) : ssrLooseEqual(unref(form).category_id, cat.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(cat.name)}</option>`);
							});
							_push(`<!--]--></select></div><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "environment_id",
								value: "Environnement"
							}, null, _parent, _scopeId));
							_push(`<select id="environment_id" class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).environment_id) ? ssrLooseContain(unref(form).environment_id, "") : ssrLooseEqual(unref(form).environment_id, "")) ? " selected" : ""}${_scopeId}>Choisir un environnement</option><!--[-->`);
							ssrRenderList(__props.environments, (env) => {
								_push(`<option${ssrRenderAttr("value", env.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).environment_id) ? ssrLooseContain(unref(form).environment_id, env.id) : ssrLooseEqual(unref(form).environment_id, env.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(env.name)}</option>`);
							});
							_push(`<!--]--></select></div></div><div class="grid grid-cols-1 gap-6 sm:grid-cols-2"${_scopeId}><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "equipment",
								value: "Matériel utilisé"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_sfc_main$4, {
								id: "equipment",
								modelValue: unref(form).equipment,
								"onUpdate:modelValue": ($event) => unref(form).equipment = $event,
								type: "text",
								class: "mt-2 block w-full",
								placeholder: "Ex: Zoom H6 + Sennheiser MKH 416"
							}, null, _parent, _scopeId));
							_push(`</div><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "tags",
								value: "Tags (séparés par des virgules)"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_sfc_main$4, {
								id: "tags",
								modelValue: unref(form).tags,
								"onUpdate:modelValue": ($event) => unref(form).tags = $event,
								type: "text",
								class: "mt-2 block w-full",
								placeholder: "Ex: oiseaux, matin, printemps"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="grid grid-cols-1 gap-6 sm:grid-cols-2"${_scopeId}><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "license",
								value: "Licence *"
							}, null, _parent, _scopeId));
							_push(`<select id="license" class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald" required${_scopeId}><!--[-->`);
							ssrRenderList(licenses, (lic) => {
								_push(`<option${ssrRenderAttr("value", lic.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).license) ? ssrLooseContain(unref(form).license, lic.value) : ssrLooseEqual(unref(form).license, lic.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(lic.label)}</option>`);
							});
							_push(`<!--]--></select>`);
							_push(ssrRenderComponent(_sfc_main$5, { message: unref(form).errors.license }, null, _parent, _scopeId));
							_push(`</div><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, {
								for: "visibility",
								value: "Visibilité *"
							}, null, _parent, _scopeId));
							_push(`<select id="visibility" class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald" required${_scopeId}><!--[-->`);
							ssrRenderList(visibilities, (vis) => {
								_push(`<option${ssrRenderAttr("value", vis.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).visibility) ? ssrLooseContain(unref(form).visibility, vis.value) : ssrLooseEqual(unref(form).visibility, vis.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vis.label)}</option>`);
							});
							_push(`<!--]--></select>`);
							_push(ssrRenderComponent(_sfc_main$5, { message: unref(form).errors.visibility }, null, _parent, _scopeId));
							_push(`</div></div><div${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$3, { value: "Image de couverture" }, null, _parent, _scopeId));
							_push(`<div class="mt-2"${_scopeId}>`);
							if (coverPreview.value) _push(`<div class="relative mb-3 aspect-square w-48 overflow-hidden rounded-xl"${_scopeId}><img${ssrRenderAttr("src", coverPreview.value)} class="h-full w-full object-cover"${_scopeId}><button type="button" class="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-arbor-night/80 text-arbor-cream transition-colors hover:bg-red-500/80"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
							else _push(`<!---->`);
							_push(`<label class="inline-flex cursor-pointer items-center rounded-xl border border-arbor-glass-border bg-arbor-glass px-4 py-2 text-sm text-arbor-cream transition-colors hover:bg-white/10"${_scopeId}><svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg> Choisir une image <input type="file" accept="image/*" class="hidden"${_scopeId}></label><p class="mt-2 text-xs text-arbor-sage"${_scopeId}>JPG, PNG, WebP — max 10 Mo</p></div>`);
							_push(ssrRenderComponent(_sfc_main$5, { message: unref(form).errors.cover_image }, null, _parent, _scopeId));
							_push(`</div><div class="flex items-center justify-end gap-4 border-t border-arbor-glass-border pt-4"${_scopeId}><button type="button" class="text-sm text-arbor-sage transition-colors hover:text-arbor-cream"${_scopeId}> Annuler </button><div class="w-full max-w-xs"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}>`);
							if (unref(form).processing) _push(`<span${_scopeId}>Publication en cours...</span>`);
							else _push(`<span${_scopeId}>Publier le son</span>`);
							_push(`</button>`);
							if (unref(form).processing && uploadProgress.value > 0) _push(`<div class="mt-3"${_scopeId}><div class="h-1.5 overflow-hidden rounded-full bg-arbor-glass"${_scopeId}><div class="h-full rounded-full bg-arbor-emerald transition-all duration-200" style="${ssrRenderStyle(`width: ${uploadProgress.value}%`)}"${_scopeId}></div></div><p class="mt-1 text-right text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(Math.round(uploadProgress.value))}%</p></div>`);
							else _push(`<!---->`);
							_push(`</div></div></form></div></div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "relative min-h-[calc(100vh-8rem)]" }, [createVNode(Transition, {
						"enter-active-class": "transition duration-500 ease-out",
						"enter-from-class": "opacity-0 translate-y-4",
						"enter-to-class": "opacity-100 translate-y-0",
						"leave-active-class": "transition duration-300 ease-in absolute inset-0",
						"leave-from-class": "opacity-100 translate-y-0",
						"leave-to-class": "opacity-0 -translate-y-4"
					}, {
						default: withCtx(() => [step.value === "record" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "py-6"
						}, [createVNode("div", { class: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "mb-8 text-center" }, [createVNode("h1", { class: "font-display text-3xl font-light italic text-arbor-cream sm:text-4xl" }, " Capturez l'instant "), createVNode("p", { class: "mt-2 text-sm text-arbor-sage/70" }, " Un enregistrement est un acte de présence. Choisissez votre source et appuyez sur le bouton. ")]), createVNode("div", { class: "glass-card overflow-hidden" }, [createVNode(_sfc_main$1, { onConfirm: onConfirmRecording })])])])) : createCommentVNode("", true)]),
						_: 1
					}), createVNode(Transition, {
						"enter-active-class": "transition duration-500 ease-out delay-200",
						"enter-from-class": "opacity-0 translate-y-4",
						"enter-to-class": "opacity-100 translate-y-0",
						"leave-active-class": "transition duration-300 ease-in absolute inset-0",
						"leave-from-class": "opacity-100 translate-y-0",
						"leave-to-class": "opacity-0 translate-y-4"
					}, {
						default: withCtx(() => [step.value === "meta" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "py-8"
						}, [createVNode("div", { class: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "mb-6 flex items-center justify-between" }, [createVNode("div", null, [createVNode("h2", { class: "font-display text-2xl font-light italic text-arbor-cream" }, " Décrivez votre capture "), createVNode("p", { class: "mt-1 text-sm text-arbor-sage/60" }, " Vous pouvez revenir en arrière pour réenregistrer. ")]), createVNode("button", {
							class: "btn-secondary text-sm",
							onClick: goBackToRecord
						}, [(openBlock(), createBlock("svg", {
							class: "mr-1.5 inline h-4 w-4",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M10 19l-7-7m0 0l7-7m-7 7h18"
						})])), createTextVNode(" Retour ")])]), createVNode("form", {
							onSubmit: withModifiers(submit, ["prevent"]),
							class: "space-y-8"
						}, [
							createVNode("div", { class: "glass-card p-6" }, [createVNode(_sfc_main$3, { value: "Enregistrement" }), createVNode("div", { class: "mt-3 flex items-center gap-4 rounded-xl border border-arbor-glass-border bg-arbor-deep/40 px-4 py-3" }, [
								createVNode("div", { class: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-arbor-emerald/10" }, [(openBlock(), createBlock("svg", {
									class: "h-5 w-5 text-arbor-emerald",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
								})]))]),
								createVNode("div", { class: "min-w-0 flex-1" }, [createVNode("p", { class: "truncate text-sm text-arbor-cream" }, toDisplayString(unref(form).audio_file?.name || "Enregistrement"), 1), createVNode("p", { class: "text-xs text-arbor-sage/60" }, toDisplayString(unref(form).audio_file?.type?.includes("mp4") || unref(form).audio_file?.type?.includes("aac") ? "M4A" : "WebM") + " — " + toDisplayString((unref(form).audio_file?.size / 1024 / 1024).toFixed(2)) + " Mo ", 1)]),
								createVNode("audio", {
									src: recordedUrl.value,
									controls: "",
									class: "h-8 w-32 sm:w-48"
								}, null, 8, ["src"])
							])]),
							createVNode("div", null, [
								createVNode(_sfc_main$3, {
									for: "title",
									value: "Titre *"
								}),
								createVNode(_sfc_main$4, {
									id: "title",
									modelValue: unref(form).title,
									"onUpdate:modelValue": ($event) => unref(form).title = $event,
									type: "text",
									class: "mt-2 block w-full",
									placeholder: "Ex: Aube dans la forêt de Fontainebleau",
									required: ""
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$5, { message: unref(form).errors.title }, null, 8, ["message"])
							]),
							createVNode("div", null, [
								createVNode(_sfc_main$3, {
									for: "description",
									value: "Description"
								}),
								withDirectives(createVNode("textarea", {
									id: "description",
									"onUpdate:modelValue": ($event) => unref(form).description = $event,
									rows: "4",
									class: "mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald",
									placeholder: "Décrivez le contexte de l'enregistrement, ce que vous entendez, l'ambiance..."
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).description]]),
								createVNode(_sfc_main$5, { message: unref(form).errors.description }, null, 8, ["message"])
							]),
							createVNode("div", { class: "glass-card p-6" }, [
								createVNode("h3", { class: "mb-4 font-semibold text-arbor-cream" }, "Localisation *"),
								createVNode("div", { class: "mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2" }, [createVNode("div", null, [
									createVNode(_sfc_main$3, {
										for: "latitude",
										value: "Latitude"
									}),
									createVNode(_sfc_main$4, {
										id: "latitude",
										modelValue: unref(form).latitude,
										"onUpdate:modelValue": ($event) => unref(form).latitude = $event,
										type: "text",
										class: "mt-2 block w-full",
										placeholder: "48.8566",
										required: ""
									}, null, 8, ["modelValue", "onUpdate:modelValue"]),
									createVNode(_sfc_main$5, { message: unref(form).errors.latitude }, null, 8, ["message"])
								]), createVNode("div", null, [
									createVNode(_sfc_main$3, {
										for: "longitude",
										value: "Longitude"
									}),
									createVNode(_sfc_main$4, {
										id: "longitude",
										modelValue: unref(form).longitude,
										"onUpdate:modelValue": ($event) => unref(form).longitude = $event,
										type: "text",
										class: "mt-2 block w-full",
										placeholder: "2.3522",
										required: ""
									}, null, 8, ["modelValue", "onUpdate:modelValue"]),
									createVNode(_sfc_main$5, { message: unref(form).errors.longitude }, null, 8, ["message"])
								])]),
								createVNode("button", {
									type: "button",
									onClick: getCurrentLocation,
									disabled: locating.value,
									class: "mb-2 flex items-center gap-1.5 text-sm text-arbor-emerald transition-colors hover:text-arbor-emerald-dark disabled:cursor-not-allowed disabled:opacity-50"
								}, [locating.value ? (openBlock(), createBlock("svg", {
									key: 0,
									class: "h-4 w-4 animate-spin",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								})])) : (openBlock(), createBlock("svg", {
									key: 1,
									class: "h-4 w-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								}), createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								})])), locating.value ? (openBlock(), createBlock("span", { key: 2 }, "Localisation...")) : (openBlock(), createBlock("span", { key: 3 }, "Utiliser ma position actuelle"))], 8, ["disabled"]),
								geoError.value ? (openBlock(), createBlock("div", {
									key: 0,
									class: "mb-4 flex items-center gap-1.5 text-sm text-red-400"
								}, [(openBlock(), createBlock("svg", {
									class: "h-4 w-4 shrink-0",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								})])), createTextVNode(" " + toDisplayString(geoError.value), 1)])) : createCommentVNode("", true),
								createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [createVNode("div", null, [createVNode(_sfc_main$3, {
									for: "location_name",
									value: "Nom du lieu"
								}), createVNode(_sfc_main$4, {
									id: "location_name",
									modelValue: unref(form).location_name,
									"onUpdate:modelValue": ($event) => unref(form).location_name = $event,
									type: "text",
									class: "mt-2 block w-full",
									placeholder: "Ex: Forêt de Fontainebleau"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])])]),
								createVNode("div", { class: "mt-4 flex items-center gap-2" }, [withDirectives(createVNode("input", {
									id: "is_sensitive_location",
									"onUpdate:modelValue": ($event) => unref(form).is_sensitive_location = $event,
									type: "checkbox",
									class: "rounded border-arbor-glass-border bg-arbor-deep text-arbor-emerald focus:ring-arbor-emerald"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).is_sensitive_location]]), createVNode("label", {
									for: "is_sensitive_location",
									class: "text-sm text-arbor-sage"
								}, " Ce lieu est sensible — afficher une localisation approximative uniquement ")])
							]),
							createVNode("div", { class: "grid grid-cols-1 gap-6 sm:grid-cols-2" }, [createVNode("div", null, [createVNode(_sfc_main$3, {
								for: "recorded_at",
								value: "Date d'enregistrement"
							}), createVNode(_sfc_main$4, {
								id: "recorded_at",
								modelValue: unref(form).recorded_at,
								"onUpdate:modelValue": ($event) => unref(form).recorded_at = $event,
								type: "date",
								class: "mt-2 block w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode("div", null, [createVNode(_sfc_main$3, {
								for: "recorded_time",
								value: "Heure d'enregistrement"
							}), createVNode(_sfc_main$4, {
								id: "recorded_time",
								modelValue: unref(form).recorded_time,
								"onUpdate:modelValue": ($event) => unref(form).recorded_time = $event,
								type: "time",
								class: "mt-2 block w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])])]),
							createVNode("div", { class: "grid grid-cols-1 gap-6 sm:grid-cols-2" }, [createVNode("div", null, [createVNode(_sfc_main$3, {
								for: "category_id",
								value: "Catégorie"
							}), withDirectives(createVNode("select", {
								id: "category_id",
								"onUpdate:modelValue": ($event) => unref(form).category_id = $event,
								class: "mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"
							}, [createVNode("option", { value: "" }, "Choisir une catégorie"), (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
								return openBlock(), createBlock("option", {
									key: cat.id,
									value: cat.id
								}, toDisplayString(cat.name), 9, ["value"]);
							}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).category_id]])]), createVNode("div", null, [createVNode(_sfc_main$3, {
								for: "environment_id",
								value: "Environnement"
							}), withDirectives(createVNode("select", {
								id: "environment_id",
								"onUpdate:modelValue": ($event) => unref(form).environment_id = $event,
								class: "mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"
							}, [createVNode("option", { value: "" }, "Choisir un environnement"), (openBlock(true), createBlock(Fragment, null, renderList(__props.environments, (env) => {
								return openBlock(), createBlock("option", {
									key: env.id,
									value: env.id
								}, toDisplayString(env.name), 9, ["value"]);
							}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).environment_id]])])]),
							createVNode("div", { class: "grid grid-cols-1 gap-6 sm:grid-cols-2" }, [createVNode("div", null, [createVNode(_sfc_main$3, {
								for: "equipment",
								value: "Matériel utilisé"
							}), createVNode(_sfc_main$4, {
								id: "equipment",
								modelValue: unref(form).equipment,
								"onUpdate:modelValue": ($event) => unref(form).equipment = $event,
								type: "text",
								class: "mt-2 block w-full",
								placeholder: "Ex: Zoom H6 + Sennheiser MKH 416"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode("div", null, [createVNode(_sfc_main$3, {
								for: "tags",
								value: "Tags (séparés par des virgules)"
							}), createVNode(_sfc_main$4, {
								id: "tags",
								modelValue: unref(form).tags,
								"onUpdate:modelValue": ($event) => unref(form).tags = $event,
								type: "text",
								class: "mt-2 block w-full",
								placeholder: "Ex: oiseaux, matin, printemps"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])])]),
							createVNode("div", { class: "grid grid-cols-1 gap-6 sm:grid-cols-2" }, [createVNode("div", null, [
								createVNode(_sfc_main$3, {
									for: "license",
									value: "Licence *"
								}),
								withDirectives(createVNode("select", {
									id: "license",
									"onUpdate:modelValue": ($event) => unref(form).license = $event,
									class: "mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald",
									required: ""
								}, [(openBlock(), createBlock(Fragment, null, renderList(licenses, (lic) => {
									return createVNode("option", {
										key: lic.value,
										value: lic.value
									}, toDisplayString(lic.label), 9, ["value"]);
								}), 64))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).license]]),
								createVNode(_sfc_main$5, { message: unref(form).errors.license }, null, 8, ["message"])
							]), createVNode("div", null, [
								createVNode(_sfc_main$3, {
									for: "visibility",
									value: "Visibilité *"
								}),
								withDirectives(createVNode("select", {
									id: "visibility",
									"onUpdate:modelValue": ($event) => unref(form).visibility = $event,
									class: "mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald",
									required: ""
								}, [(openBlock(), createBlock(Fragment, null, renderList(visibilities, (vis) => {
									return createVNode("option", {
										key: vis.value,
										value: vis.value
									}, toDisplayString(vis.label), 9, ["value"]);
								}), 64))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).visibility]]),
								createVNode(_sfc_main$5, { message: unref(form).errors.visibility }, null, 8, ["message"])
							])]),
							createVNode("div", null, [
								createVNode(_sfc_main$3, { value: "Image de couverture" }),
								createVNode("div", { class: "mt-2" }, [
									coverPreview.value ? (openBlock(), createBlock("div", {
										key: 0,
										class: "relative mb-3 aspect-square w-48 overflow-hidden rounded-xl"
									}, [createVNode("img", {
										src: coverPreview.value,
										class: "h-full w-full object-cover"
									}, null, 8, ["src"]), createVNode("button", {
										type: "button",
										onClick: ($event) => {
											coverPreview.value = null;
											unref(form).cover_image = null;
										},
										class: "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-arbor-night/80 text-arbor-cream transition-colors hover:bg-red-500/80"
									}, [(openBlock(), createBlock("svg", {
										class: "h-4 w-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M6 18L18 6M6 6l12 12"
									})]))], 8, ["onClick"])])) : createCommentVNode("", true),
									createVNode("label", { class: "inline-flex cursor-pointer items-center rounded-xl border border-arbor-glass-border bg-arbor-glass px-4 py-2 text-sm text-arbor-cream transition-colors hover:bg-white/10" }, [
										(openBlock(), createBlock("svg", {
											class: "mr-2 h-4 w-4",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24"
										}, [createVNode("path", {
											"stroke-linecap": "round",
											"stroke-linejoin": "round",
											"stroke-width": "2",
											d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										})])),
										createTextVNode(" Choisir une image "),
										createVNode("input", {
											type: "file",
											accept: "image/*",
											class: "hidden",
											onChange: handleCoverChange
										}, null, 32)
									]),
									createVNode("p", { class: "mt-2 text-xs text-arbor-sage" }, "JPG, PNG, WebP — max 10 Mo")
								]),
								createVNode(_sfc_main$5, { message: unref(form).errors.cover_image }, null, 8, ["message"])
							]),
							createVNode("div", { class: "flex items-center justify-end gap-4 border-t border-arbor-glass-border pt-4" }, [createVNode("button", {
								type: "button",
								class: "text-sm text-arbor-sage transition-colors hover:text-arbor-cream",
								onClick: goBackToRecord
							}, " Annuler "), createVNode("div", { class: "w-full max-w-xs" }, [createVNode("button", {
								type: "submit",
								disabled: unref(form).processing,
								class: "btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
							}, [unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Publication en cours...")) : (openBlock(), createBlock("span", { key: 1 }, "Publier le son"))], 8, ["disabled"]), unref(form).processing && uploadProgress.value > 0 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mt-3"
							}, [createVNode("div", { class: "h-1.5 overflow-hidden rounded-full bg-arbor-glass" }, [createVNode("div", {
								class: "h-full rounded-full bg-arbor-emerald transition-all duration-200",
								style: `width: ${uploadProgress.value}%`
							}, null, 4)]), createVNode("p", { class: "mt-1 text-right text-xs text-arbor-sage" }, toDisplayString(Math.round(uploadProgress.value)) + "%", 1)])) : createCommentVNode("", true)])])
						], 32)])])) : createCommentVNode("", true)]),
						_: 1
					})])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Sounds/Record.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

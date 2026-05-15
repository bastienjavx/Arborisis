import { n as usePlayerStore, t as _sfc_main$7 } from "./GuestLayout-zlBIN9S_.js";
import { t as _sfc_main$8 } from "./Breadcrumb-Ylz9mFho.js";
import { t as _sfc_main$9 } from "./FollowButton-bVZSlH7u.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, onMounted, onUnmounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import WaveSurfer from "wavesurfer.js";
//#region resources/js/Components/Social/LikeButton.vue
var _sfc_main$6 = {
	__name: "LikeButton",
	__ssrInlineRender: true,
	props: {
		soundId: Number,
		initialLiked: Boolean,
		initialCount: Number
	},
	setup(__props) {
		const props = __props;
		const liked = ref(props.initialLiked);
		const count = ref(props.initialCount);
		const loading = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				disabled: loading.value,
				class: ["inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors", liked.value ? "bg-arbor-emerald/20 text-arbor-emerald" : "bg-arbor-glass text-arbor-sage hover:bg-white/10"]
			}, _attrs))}><svg class="${ssrRenderClass([{ "scale-110": liked.value }, "w-5 h-5 transition-transform"])}"${ssrRenderAttr("fill", liked.value ? "currentColor" : "none")} stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg><span class="text-sm font-medium">${ssrInterpolate(count.value)}</span></button>`);
		};
	}
};
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Social/LikeButton.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Social/CommentItem.vue
var _sfc_main$5 = {
	__name: "CommentItem",
	__ssrInlineRender: true,
	props: { comment: Object },
	emits: ["reply"],
	setup(__props, { emit: __emit }) {
		const showReplies = ref(true);
		useForm({});
		const formatDate = (dateString) => {
			if (!dateString) return "";
			return new Date(dateString).toLocaleDateString("fr-FR", {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			});
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))}><div class="flex gap-3"><div class="w-8 h-8 rounded-full bg-arbor-moss/30 flex items-center justify-center shrink-0"><span class="text-xs font-bold text-arbor-emerald">${ssrInterpolate(__props.comment.user?.name?.charAt(0)?.toUpperCase() ?? "?")}</span></div><div class="flex-1 min-w-0"><div class="glass-card p-3"><div class="flex items-center justify-between mb-1"><div class="flex items-center gap-2"><span class="text-sm font-medium text-arbor-cream">${ssrInterpolate(__props.comment.user?.name ?? "Anonyme")}</span><span class="text-xs text-arbor-sage">${ssrInterpolate(formatDate(__props.comment.created_at))}</span></div>`);
			if (__props.comment.user?.id === _ctx.$page.props.auth.user?.id || _ctx.$page.props.auth.user?.is_moderator) _push(`<div class="flex items-center gap-2"><button class="text-xs text-red-400 hover:text-red-300 transition-colors"> Supprimer </button></div>`);
			else _push(`<!---->`);
			_push(`</div><p class="text-sm text-arbor-sage leading-relaxed">${ssrInterpolate(__props.comment.body)}</p></div><div class="flex items-center gap-3 mt-1 ml-1">`);
			if (_ctx.$page.props.auth.user) _push(`<button class="text-xs text-arbor-sage hover:text-arbor-emerald transition-colors"> Répondre </button>`);
			else _push(`<!---->`);
			if (__props.comment.replies?.length > 0) _push(`<button class="text-xs text-arbor-sage hover:text-arbor-cream transition-colors">${ssrInterpolate(showReplies.value ? "Masquer" : "Voir")} ${ssrInterpolate(__props.comment.replies.length)} réponse${ssrInterpolate(__props.comment.replies.length > 1 ? "s" : "")}</button>`);
			else _push(`<!---->`);
			_push(`</div></div></div>`);
			if (showReplies.value && __props.comment.replies?.length > 0) {
				_push(`<div class="ml-11 space-y-3"><!--[-->`);
				ssrRenderList(__props.comment.replies, (reply) => {
					_push(`<div class="flex gap-3"><div class="w-6 h-6 rounded-full bg-arbor-moss/20 flex items-center justify-center shrink-0"><span class="text-xs font-bold text-arbor-emerald">${ssrInterpolate(reply.user?.name?.charAt(0)?.toUpperCase() ?? "?")}</span></div><div class="flex-1"><div class="glass-card p-3"><div class="flex items-center justify-between mb-1"><div class="flex items-center gap-2"><span class="text-sm font-medium text-arbor-cream">${ssrInterpolate(reply.user?.name ?? "Anonyme")}</span><span class="text-xs text-arbor-sage">${ssrInterpolate(formatDate(reply.created_at))}</span></div>`);
					if (reply.user?.id === _ctx.$page.props.auth.user?.id || _ctx.$page.props.auth.user?.is_moderator) _push(`<div><button class="text-xs text-red-400 hover:text-red-300 transition-colors"> Supprimer </button></div>`);
					else _push(`<!---->`);
					_push(`</div><p class="text-sm text-arbor-sage leading-relaxed">${ssrInterpolate(reply.body)}</p></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Social/CommentItem.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Social/CommentSection.vue
var _sfc_main$4 = {
	__name: "CommentSection",
	__ssrInlineRender: true,
	props: {
		soundId: Number,
		comments: Object
	},
	setup(__props) {
		const showForm = ref(false);
		const replyingTo = ref(null);
		const form = useForm({
			body: "",
			parent_id: null
		});
		const startReply = (commentId) => {
			replyingTo.value = commentId;
			showForm.value = true;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><h2 class="font-semibold text-arbor-cream">Commentaires</h2>`);
			if (_ctx.$page.props.auth.user && !showForm.value) _push(`<button class="text-sm text-arbor-emerald hover:text-arbor-emerald-dark transition-colors"> Ajouter un commentaire </button>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (showForm.value) {
				_push(`<div class="glass-card p-4">`);
				if (replyingTo.value) _push(`<div class="text-sm text-arbor-sage mb-2"> Réponse à un commentaire <button class="text-arbor-emerald ml-2 hover:underline">Annuler</button></div>`);
				else _push(`<!---->`);
				_push(`<form class="space-y-3"><textarea rows="3" class="w-full rounded-lg bg-arbor-deep border-arbor-glass text-arbor-cream placeholder-arbor-sage/50 focus:border-arbor-emerald focus:ring-arbor-emerald text-sm resize-none" placeholder="Votre commentaire...">${ssrInterpolate(unref(form).body)}</textarea>`);
				if (unref(form).errors.body) _push(`<div class="text-sm text-red-400">${ssrInterpolate(unref(form).errors.body)}</div>`);
				else _push(`<!---->`);
				_push(`<div class="flex justify-end gap-2"><button type="button" class="px-3 py-1.5 text-sm text-arbor-sage hover:text-arbor-cream transition-colors"> Annuler </button><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-4 py-1.5 rounded-lg bg-arbor-emerald text-arbor-night text-sm font-medium hover:bg-arbor-emerald-dark transition-colors disabled:opacity-50"> Publier </button></div></form></div>`);
			} else _push(`<!---->`);
			if (__props.comments.data.length > 0) {
				_push(`<div class="space-y-4"><!--[-->`);
				ssrRenderList(__props.comments.data, (comment) => {
					_push(ssrRenderComponent(_sfc_main$5, {
						key: comment.id,
						comment,
						onReply: startReply
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(`<div class="text-center py-8 text-arbor-sage text-sm"> Aucun commentaire pour le moment. Soyez le premier à réagir ! </div>`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Social/CommentSection.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Social/ReportModal.vue
var _sfc_main$3 = {
	__name: "ReportModal",
	__ssrInlineRender: true,
	props: {
		reportableType: String,
		reportableId: Number
	},
	setup(__props) {
		const props = __props;
		const show = ref(false);
		const form = useForm({
			reportable_type: props.reportableType,
			reportable_id: props.reportableId,
			reason: "",
			description: ""
		});
		const reasons = [
			{
				value: "spam",
				label: "Spam"
			},
			{
				value: "harassment",
				label: "Harcèlement"
			},
			{
				value: "inappropriate_content",
				label: "Contenu inapproprié"
			},
			{
				value: "copyright",
				label: "Violation de droits d'auteur"
			},
			{
				value: "misinformation",
				label: "Désinformation"
			},
			{
				value: "other",
				label: "Autre"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}><button class="text-xs text-arbor-sage hover:text-red-400 transition-colors flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> Signaler </button>`);
			if (show.value) {
				_push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-arbor-night/80 backdrop-blur-sm"><div class="glass-card w-full max-w-md p-6 space-y-4"><div class="flex items-center justify-between"><h3 class="font-semibold text-arbor-cream">Signaler un contenu</h3><button class="text-arbor-sage hover:text-arbor-cream"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><form class="space-y-4"><div><label class="block text-sm text-arbor-sage mb-2">Motif</label><select class="w-full rounded-lg bg-arbor-deep border-arbor-glass text-arbor-cream focus:border-arbor-emerald focus:ring-arbor-emerald text-sm" required><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).reason) ? ssrLooseContain(unref(form).reason, "") : ssrLooseEqual(unref(form).reason, "")) ? " selected" : ""}>Choisir un motif</option><!--[-->`);
				ssrRenderList(reasons, (r) => {
					_push(`<option${ssrRenderAttr("value", r.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).reason) ? ssrLooseContain(unref(form).reason, r.value) : ssrLooseEqual(unref(form).reason, r.value)) ? " selected" : ""}>${ssrInterpolate(r.label)}</option>`);
				});
				_push(`<!--]--></select>`);
				if (unref(form).errors.reason) _push(`<div class="text-sm text-red-400 mt-1">${ssrInterpolate(unref(form).errors.reason)}</div>`);
				else _push(`<!---->`);
				_push(`</div><div><label class="block text-sm text-arbor-sage mb-2">Description (optionnel)</label><textarea rows="3" class="w-full rounded-lg bg-arbor-deep border-arbor-glass text-arbor-cream placeholder-arbor-sage/50 focus:border-arbor-emerald focus:ring-arbor-emerald text-sm resize-none" placeholder="Décrivez le problème...">${ssrInterpolate(unref(form).description)}</textarea>`);
				if (unref(form).errors.description) _push(`<div class="text-sm text-red-400 mt-1">${ssrInterpolate(unref(form).errors.description)}</div>`);
				else _push(`<!---->`);
				_push(`</div><div class="flex justify-end gap-2"><button type="button" class="px-4 py-2 text-sm text-arbor-sage hover:text-arbor-cream transition-colors"> Annuler </button><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors disabled:opacity-50"> Signaler </button></div></form></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Social/ReportModal.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Audio/WaveSurfer.vue
var _sfc_main$2 = {
	__name: "WaveSurfer",
	__ssrInlineRender: true,
	props: {
		audioUrl: {
			type: String,
			required: true
		},
		isPlaying: {
			type: Boolean,
			default: false
		},
		waveColor: {
			type: String,
			default: "#4a5d4a"
		},
		progressColor: {
			type: String,
			default: "#7c9a6a"
		},
		cursorColor: {
			type: String,
			default: "#d4c9a8"
		},
		height: {
			type: Number,
			default: 80
		}
	},
	emits: [
		"ready",
		"timeupdate",
		"finish",
		"play",
		"pause"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const containerRef = ref(null);
		let wavesurfer = null;
		onMounted(() => {
			if (!containerRef.value || !props.audioUrl) return;
			wavesurfer = WaveSurfer.create({
				container: containerRef.value,
				waveColor: props.waveColor,
				progressColor: props.progressColor,
				cursorColor: props.cursorColor,
				cursorWidth: 2,
				height: props.height,
				barWidth: 2,
				barGap: 1,
				barRadius: 2,
				url: props.audioUrl
			});
			wavesurfer.on("ready", () => {
				emit("ready", wavesurfer.getDuration());
			});
			wavesurfer.on("audioprocess", (currentTime) => {
				emit("timeupdate", currentTime);
			});
			wavesurfer.on("finish", () => {
				emit("finish");
			});
			wavesurfer.on("play", () => {
				emit("play");
			});
			wavesurfer.on("pause", () => {
				emit("pause");
			});
		});
		onUnmounted(() => {
			if (wavesurfer) {
				wavesurfer.destroy();
				wavesurfer = null;
			}
		});
		watch(() => props.isPlaying, (playing) => {
			if (!wavesurfer) return;
			if (playing) wavesurfer.play();
			else wavesurfer.pause();
		});
		function seekTo(percent) {
			if (!wavesurfer) return;
			wavesurfer.seekTo(percent);
		}
		__expose({ seekTo });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "containerRef",
				ref: containerRef,
				class: "w-full"
			}, _attrs))}></div>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Audio/WaveSurfer.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/AudioAnalysis/AudioAnalysisPanel.vue
var _sfc_main$1 = {
	__name: "AudioAnalysisPanel",
	__ssrInlineRender: true,
	props: {
		analysis: {
			type: Object,
			default: null
		},
		sound: {
			type: Object,
			required: true
		},
		isOwner: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const isRetrying = ref(false);
		const status = computed(() => props.analysis?.status ?? "no_analysis");
		const statusConfig = {
			pending: {
				label: "En attente",
				color: "text-amber-400",
				bg: "bg-amber-400/10",
				icon: "⏳"
			},
			queued: {
				label: "En file d'attente",
				color: "text-sky-400",
				bg: "bg-sky-400/10",
				icon: "📥"
			},
			processing: {
				label: "Analyse en cours",
				color: "text-emerald-400",
				bg: "bg-emerald-400/10",
				icon: "🔬"
			},
			completed: {
				label: "Analyse terminée",
				color: "text-teal-400",
				bg: "bg-teal-400/10",
				icon: "✓"
			},
			failed: {
				label: "Échec",
				color: "text-rose-400",
				bg: "bg-rose-400/10",
				icon: "✕"
			},
			no_analysis: {
				label: "Aucune analyse",
				color: "text-arbor-sage",
				bg: "bg-arbor-glass",
				icon: "−"
			}
		};
		const currentStatus = computed(() => statusConfig[status.value] ?? statusConfig.no_analysis);
		const qualityGradient = computed(() => {
			switch (props.analysis?.quality_label) {
				case "excellent": return "from-emerald-500 to-teal-400";
				case "good": return "from-teal-500 to-cyan-400";
				case "medium": return "from-amber-500 to-yellow-400";
				case "poor": return "from-orange-500 to-red-400";
				case "unusable": return "from-red-600 to-rose-500";
				default: return "from-arbor-moss to-arbor-sage";
			}
		});
		const qualityPercent = computed(() => {
			return {
				excellent: 100,
				good: 80,
				medium: 50,
				poor: 25,
				unusable: 5
			}[props.analysis?.quality_label] ?? 0;
		});
		const canRetry = computed(() => {
			return props.isOwner && ["failed", "no_analysis"].includes(status.value);
		});
		const formatDuration = (s) => {
			if (!s) return "—";
			return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
		};
		const confidenceColor = (c) => {
			if (c >= .8) return "bg-emerald-500";
			if (c >= .6) return "bg-teal-500";
			if (c >= .4) return "bg-amber-500";
			return "bg-orange-500";
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6 space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="${ssrRenderClass([currentStatus.value.bg, "w-10 h-10 rounded-xl flex items-center justify-center text-lg"])}"><span>${ssrInterpolate(currentStatus.value.icon)}</span></div><div><h3 class="font-semibold text-arbor-cream">Analyse Audio</h3><p class="${ssrRenderClass([currentStatus.value.color, "text-xs"])}">${ssrInterpolate(currentStatus.value.label)}</p></div></div>`);
			if (canRetry.value) _push(`<button${ssrIncludeBooleanAttr(isRetrying.value) ? " disabled" : ""} class="px-4 py-2 rounded-lg bg-arbor-emerald/10 text-arbor-emerald text-sm hover:bg-arbor-emerald/20 transition-colors disabled:opacity-50">${ssrInterpolate(isRetrying.value ? "Relance…" : "Relancer")}</button>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if ([
				"pending",
				"queued",
				"processing"
			].includes(status.value)) {
				_push(`<div class="py-8 text-center"><div class="inline-flex items-center gap-2 text-arbor-sage text-sm"><svg class="animate-spin w-4 h-4 text-arbor-emerald" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
				if (status.value === "processing") _push(`<span>L&#39;analyse est en cours sur nos serveurs…</span>`);
				else if (status.value === "queued") _push(`<span>File d&#39;attente — l&#39;analyse démarrera sous peu.</span>`);
				else _push(`<span>En attente de traitement.</span>`);
				_push(`</div></div>`);
			} else if (status.value === "failed") {
				_push(`<div class="py-4 text-center"><p class="text-rose-400 text-sm">L&#39;analyse a échoué. Vous pouvez réessayer plus tard.</p>`);
				if (__props.analysis?.error_message) _push(`<p class="text-xs text-arbor-sage mt-1 font-mono">${ssrInterpolate(__props.analysis.error_message)}</p>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else if (status.value === "no_analysis") _push(`<div class="py-4 text-center"><p class="text-arbor-sage text-sm">Aucune analyse n&#39;est disponible pour ce son.</p></div>`);
			else if (status.value === "completed") {
				_push(`<div class="space-y-6"><div class="flex flex-wrap gap-2">`);
				if (__props.analysis.duration_seconds) _push(`<span class="px-2.5 py-1 rounded-md bg-arbor-glass text-xs text-arbor-sage">${ssrInterpolate(formatDuration(__props.analysis.duration_seconds))}</span>`);
				else _push(`<!---->`);
				if (__props.analysis.format) _push(`<span class="px-2.5 py-1 rounded-md bg-arbor-glass text-xs text-arbor-sage uppercase">${ssrInterpolate(__props.analysis.format)}</span>`);
				else _push(`<!---->`);
				if (__props.analysis.sample_rate) _push(`<span class="px-2.5 py-1 rounded-md bg-arbor-glass text-xs text-arbor-sage">${ssrInterpolate((__props.analysis.sample_rate / 1e3).toFixed(1))} kHz </span>`);
				else _push(`<!---->`);
				if (__props.analysis.channels) _push(`<span class="px-2.5 py-1 rounded-md bg-arbor-glass text-xs text-arbor-sage">${ssrInterpolate(__props.analysis.channels === 1 ? "Mono" : "Stéréo")}</span>`);
				else _push(`<!---->`);
				_push(`</div>`);
				if (__props.analysis.quality_label) _push(`<div><div class="flex items-center justify-between mb-1.5"><span class="text-xs text-arbor-sage">Qualité d&#39;enregistrement</span><span class="${ssrRenderClass([currentStatus.value.color, "text-xs font-medium capitalize"])}">${ssrInterpolate(__props.analysis.quality_label)}</span></div><div class="h-1.5 rounded-full bg-arbor-glass overflow-hidden"><div class="${ssrRenderClass([qualityGradient.value, "h-full rounded-full bg-gradient-to-r transition-all duration-700"])}" style="${ssrRenderStyle(`width: ${qualityPercent.value}%`)}"></div></div></div>`);
				else _push(`<!---->`);
				if (__props.analysis.spectrogram_url) _push(`<div><p class="text-xs text-arbor-sage mb-2">Spectrogramme</p><div class="rounded-xl overflow-hidden bg-arbor-deep border border-arbor-glass-border"><img${ssrRenderAttr("src", __props.analysis.spectrogram_url)} alt="Spectrogramme" class="w-full h-auto object-cover" loading="lazy"></div></div>`);
				else _push(`<!---->`);
				if (__props.analysis.birdnet_detections?.length > 0) {
					_push(`<div><p class="text-xs text-arbor-sage mb-3"> Espèces principales du résumé automatique </p><div class="space-y-2"><!--[-->`);
					ssrRenderList(__props.analysis.birdnet_detections, (det, i) => {
						_push(`<div class="flex items-center gap-3 p-3 rounded-lg bg-arbor-glass/50 border border-arbor-glass-border/50"><div class="w-8 h-8 rounded-lg flex items-center justify-center bg-arbor-deep text-sm">🐦</div><div class="flex-1 min-w-0"><p class="text-sm text-arbor-cream truncate">${ssrInterpolate(det.common_name)}</p>`);
						if (det.scientific_name) _push(`<p class="text-xs text-arbor-sage truncate italic">${ssrInterpolate(det.scientific_name)}</p>`);
						else _push(`<!---->`);
						_push(`</div>`);
						if (det.confidence !== null && det.confidence !== void 0) _push(`<div class="w-20"><div class="h-1.5 rounded-full bg-arbor-glass overflow-hidden"><div class="${ssrRenderClass([confidenceColor(det.confidence), "h-full rounded-full transition-all"])}" style="${ssrRenderStyle(`width: ${Math.round(det.confidence * 100)}%`)}"></div></div><p class="text-[10px] text-arbor-sage text-right mt-0.5">${ssrInterpolate(Math.round(det.confidence * 100))}%</p></div>`);
						else _push(`<!---->`);
						_push(`</div>`);
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				if (__props.analysis.suggested_tags?.length > 0) {
					_push(`<div><p class="text-xs text-arbor-sage mb-2">Tags suggérés</p><div class="flex flex-wrap gap-2"><!--[-->`);
					ssrRenderList(__props.analysis.suggested_tags, (tag) => {
						_push(`<span class="px-2.5 py-1 rounded-md bg-arbor-emerald/10 text-arbor-emerald text-xs">${ssrInterpolate(tag)}</span>`);
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				_push(`<div class="flex flex-wrap gap-3 pt-2 border-t border-arbor-glass-border/50">`);
				if (__props.analysis.features_url) _push(`<a${ssrRenderAttr("href", __props.analysis.features_url)} target="_blank" class="text-xs text-arbor-sage hover:text-arbor-emerald transition-colors flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Features JSON </a>`);
				else _push(`<!---->`);
				if (__props.analysis.birdnet_url) _push(`<a${ssrRenderAttr("href", __props.analysis.birdnet_url)} target="_blank" class="text-xs text-arbor-sage hover:text-arbor-emerald transition-colors flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> BirdNET </a>`);
				else _push(`<!---->`);
				if (__props.analysis.summary_url) _push(`<a${ssrRenderAttr("href", __props.analysis.summary_url)} target="_blank" class="text-xs text-arbor-sage hover:text-arbor-emerald transition-colors flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Résumé </a>`);
				else _push(`<!---->`);
				_push(`</div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AudioAnalysis/AudioAnalysisPanel.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Sounds/Show.vue
var _sfc_main = {
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		sound: Object,
		audioUrl: String,
		coverUrl: String,
		comments: Object,
		isLiked: Boolean,
		isFollowing: Boolean,
		analysis: Object
	},
	setup(__props) {
		const props = __props;
		const player = usePlayerStore();
		const isPlaying = ref(false);
		const currentTime = ref(0);
		const duration = ref(props.sound.duration || 0);
		const waveSurferRef = ref(null);
		const copied = ref(false);
		const isCurrentInPlayer = computed(() => player.currentSound?.id === props.sound.id);
		const effectiveIsPlaying = computed(() => {
			if (isCurrentInPlayer.value) return player.isPlaying;
			return isPlaying.value;
		});
		watch(() => player.isPlaying, (playing) => {
			if (isCurrentInPlayer.value) isPlaying.value = playing;
		});
		const formatTime = (seconds) => {
			if (!seconds || isNaN(seconds)) return "0:00";
			return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
		};
		const togglePlay = () => {
			if (!isCurrentInPlayer.value) {
				player.play({
					id: props.sound.id,
					title: props.sound.title,
					slug: props.sound.slug,
					audioUrl: props.audioUrl,
					userName: props.sound.user?.name,
					duration: duration.value
				});
				isPlaying.value = true;
				return;
			}
			player.togglePlay();
		};
		const onWaveReady = (dur) => {
			duration.value = dur;
		};
		const onWaveTimeUpdate = (time) => {
			currentTime.value = time;
			if (isCurrentInPlayer.value) player.setTime(time);
		};
		const onWaveFinish = () => {
			isPlaying.value = false;
			currentTime.value = 0;
			if (isCurrentInPlayer.value) player.stop();
		};
		const seek = (event) => {
			if (!duration.value) return;
			const rect = event.currentTarget.getBoundingClientRect();
			const percent = (event.clientX - rect.left) / rect.width;
			if (waveSurferRef.value) waveSurferRef.value.seekTo(percent);
			currentTime.value = percent * duration.value;
			if (isCurrentInPlayer.value) player.setTime(currentTime.value);
		};
		const formatDate = (dateString) => {
			if (!dateString) return null;
			return new Date(dateString).toLocaleDateString("fr-FR", {
				year: "numeric",
				month: "long",
				day: "numeric"
			});
		};
		const shareLink = () => {
			navigator.clipboard.writeText(window.location.href);
			copied.value = true;
			setTimeout(() => copied.value = false, 2e3);
		};
		const getMetaIcon = (type) => {
			const icons = {
				category: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
				environment: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
				equipment: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
				date: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
				license: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
				location: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
			};
			return icons[type] || icons.category;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: __props.sound.title }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$7, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="pt-24 pb-16"${_scopeId}><div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$8, { items: [
							{
								label: "Accueil",
								href: "/"
							},
							{
								label: "Sons",
								href: "/sounds"
							},
							{ label: __props.sound.title }
						] }, null, _parent, _scopeId));
						_push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2 space-y-8"${_scopeId}><div class="aspect-[16/9] rounded-2xl overflow-hidden bg-arbor-deep relative group"${_scopeId}>`);
						if (__props.coverUrl) _push(`<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style="${ssrRenderStyle(`background-image: url(${__props.coverUrl})`)}" loading="lazy"${_scopeId}></div>`);
						else _push(`<div class="absolute inset-0 bg-gradient-to-br from-arbor-moss/20 to-arbor-emerald/10 flex items-center justify-center"${_scopeId}><svg class="w-24 h-24 text-arbor-moss/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div>`);
						_push(`</div><div class="glass-card p-6 relative"${_scopeId}><div class="flex items-center gap-4 mb-4"${_scopeId}><button${ssrRenderAttr("aria-label", effectiveIsPlaying.value ? "Pause" : "Lire")} class="w-14 h-14 rounded-full bg-arbor-emerald flex items-center justify-center hover:bg-arbor-emerald-dark transition-colors shrink-0 shadow-lg shadow-arbor-emerald/20 group"${_scopeId}>`);
						if (!effectiveIsPlaying.value) _push(`<svg class="w-6 h-6 text-arbor-night ml-1 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M8 5v14l11-7z"${_scopeId}></path></svg>`);
						else _push(`<svg class="w-6 h-6 text-arbor-night" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"${_scopeId}></path></svg>`);
						_push(`</button><div class="flex-1 min-w-0"${_scopeId}><h1 class="font-display text-xl font-bold text-arbor-cream truncate"${_scopeId}>${ssrInterpolate(__props.sound.title)}</h1>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("creators.show", __props.sound.user?.slug),
							class: "text-sm text-arbor-sage hover:text-arbor-emerald transition-colors"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(__props.sound.user?.name ?? "Anonyme")}`);
								else return [createTextVNode(toDisplayString(__props.sound.user?.name ?? "Anonyme"), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div>`);
						if (__props.audioUrl) _push(ssrRenderComponent(_sfc_main$2, {
							ref_key: "waveSurferRef",
							ref: waveSurferRef,
							"audio-url": __props.audioUrl,
							"is-playing": effectiveIsPlaying.value,
							"wave-color": "#4a5d4a",
							"progress-color": "#7c9a6a",
							"cursor-color": "#d4c9a8",
							height: 80,
							onReady: onWaveReady,
							onTimeupdate: onWaveTimeUpdate,
							onFinish: onWaveFinish,
							onPlay: ($event) => isPlaying.value = true,
							onPause: ($event) => isPlaying.value = false
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`<div class="flex items-center gap-3 mt-4"${_scopeId}><span class="text-xs text-arbor-sage w-10 text-right font-mono"${_scopeId}>${ssrInterpolate(formatTime(currentTime.value))}</span><div class="flex-1 h-1.5 bg-arbor-glass rounded-full cursor-pointer relative overflow-hidden group"${_scopeId}><div class="absolute top-0 left-0 h-full bg-arbor-emerald rounded-full transition-all duration-100 group-hover:bg-arbor-emerald-dark" style="${ssrRenderStyle(`width: ${duration.value ? currentTime.value / duration.value * 100 : 0}%`)}"${_scopeId}></div><div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-arbor-cream rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" style="${ssrRenderStyle(`left: calc(${duration.value ? currentTime.value / duration.value * 100 : 0}% - 6px)`)}"${_scopeId}></div></div><span class="text-xs text-arbor-sage w-10 font-mono"${_scopeId}>${ssrInterpolate(formatTime(duration.value))}</span></div></div><div class="flex items-center gap-3"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$6, {
							"sound-id": __props.sound.id,
							"initial-liked": __props.isLiked,
							"initial-count": __props.sound.like_count
						}, null, _parent, _scopeId));
						_push(`<button class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-all"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"${_scopeId}></path></svg>`);
						if (copied.value) _push(`<span${_scopeId}>Lien copié !</span>`);
						else _push(`<span${_scopeId}>Partager</span>`);
						_push(`</button>`);
						_push(ssrRenderComponent(_sfc_main$3, {
							"reportable-type": "sound",
							"reportable-id": __props.sound.id
						}, null, _parent, _scopeId));
						_push(`</div><div${_scopeId}><h2 class="font-semibold text-arbor-cream mb-3"${_scopeId}>Description</h2><p class="text-arbor-sage leading-relaxed whitespace-pre-line"${_scopeId}>${ssrInterpolate(__props.sound.description || "Aucune description.")}</p></div><div class="grid grid-cols-2 sm:grid-cols-3 gap-4"${_scopeId}>`);
						if (__props.sound.category) _push(`<div class="glass-card p-4 hover-lift"${_scopeId}><div class="flex items-center gap-2 mb-2"${_scopeId}><svg class="w-4 h-4 text-arbor-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", getMetaIcon("category"))}${_scopeId}></path></svg><div class="text-xs text-arbor-sage"${_scopeId}>Catégorie</div></div><div class="text-sm font-medium text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.sound.category.name)}</div></div>`);
						else _push(`<!---->`);
						if (__props.sound.environment) _push(`<div class="glass-card p-4 hover-lift"${_scopeId}><div class="flex items-center gap-2 mb-2"${_scopeId}><svg class="w-4 h-4 text-arbor-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", getMetaIcon("environment"))}${_scopeId}></path></svg><div class="text-xs text-arbor-sage"${_scopeId}>Environnement</div></div><div class="text-sm font-medium text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.sound.environment.name)}</div></div>`);
						else _push(`<!---->`);
						if (__props.sound.equipment) _push(`<div class="glass-card p-4 hover-lift"${_scopeId}><div class="flex items-center gap-2 mb-2"${_scopeId}><svg class="w-4 h-4 text-arbor-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", getMetaIcon("equipment"))}${_scopeId}></path></svg><div class="text-xs text-arbor-sage"${_scopeId}>Matériel</div></div><div class="text-sm font-medium text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.sound.equipment)}</div></div>`);
						else _push(`<!---->`);
						if (__props.sound.recorded_at) _push(`<div class="glass-card p-4 hover-lift"${_scopeId}><div class="flex items-center gap-2 mb-2"${_scopeId}><svg class="w-4 h-4 text-arbor-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", getMetaIcon("date"))}${_scopeId}></path></svg><div class="text-xs text-arbor-sage"${_scopeId}>Date d&#39;enregistrement</div></div><div class="text-sm font-medium text-arbor-cream"${_scopeId}>${ssrInterpolate(formatDate(__props.sound.recorded_at))}</div></div>`);
						else _push(`<!---->`);
						_push(`<div class="glass-card p-4 hover-lift"${_scopeId}><div class="flex items-center gap-2 mb-2"${_scopeId}><svg class="w-4 h-4 text-arbor-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", getMetaIcon("license"))}${_scopeId}></path></svg><div class="text-xs text-arbor-sage"${_scopeId}>Licence</div></div><div class="text-sm font-medium text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.sound.license)}</div></div>`);
						if (__props.sound.sound_location?.location_name) _push(`<div class="glass-card p-4 hover-lift"${_scopeId}><div class="flex items-center gap-2 mb-2"${_scopeId}><svg class="w-4 h-4 text-arbor-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", getMetaIcon("location"))}${_scopeId}></path></svg><div class="text-xs text-arbor-sage"${_scopeId}>Lieu</div></div><div class="text-sm font-medium text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.sound.sound_location.location_name)}</div></div>`);
						else _push(`<!---->`);
						_push(`</div>`);
						_push(ssrRenderComponent(_sfc_main$1, {
							analysis: __props.analysis,
							sound: __props.sound,
							"is-owner": _ctx.$page.props.auth.user && _ctx.$page.props.auth.user.id === __props.sound.user_id
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$4, {
							"sound-id": __props.sound.id,
							comments: __props.comments
						}, null, _parent, _scopeId));
						_push(`</div><div class="space-y-6"${_scopeId}><div class="glass-card p-6 hover-lift"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("creators.show", __props.sound.user?.slug),
							class: "flex items-center gap-3 mb-4 group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="w-12 h-12 rounded-full bg-arbor-moss/30 flex items-center justify-center overflow-hidden ring-2 ring-arbor-glass-border/50 group-hover:ring-arbor-emerald/30 transition-all"${_scopeId}><span class="text-lg font-display font-bold text-arbor-emerald"${_scopeId}>${ssrInterpolate(__props.sound.user?.name?.charAt(0)?.toUpperCase() ?? "?")}</span></div><div${_scopeId}><div class="font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors"${_scopeId}>${ssrInterpolate(__props.sound.user?.name ?? "Anonyme")}</div><div class="text-xs text-arbor-sage"${_scopeId}>Créateur</div></div>`);
								else return [createVNode("div", { class: "w-12 h-12 rounded-full bg-arbor-moss/30 flex items-center justify-center overflow-hidden ring-2 ring-arbor-glass-border/50 group-hover:ring-arbor-emerald/30 transition-all" }, [createVNode("span", { class: "text-lg font-display font-bold text-arbor-emerald" }, toDisplayString(__props.sound.user?.name?.charAt(0)?.toUpperCase() ?? "?"), 1)]), createVNode("div", null, [createVNode("div", { class: "font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors" }, toDisplayString(__props.sound.user?.name ?? "Anonyme"), 1), createVNode("div", { class: "text-xs text-arbor-sage" }, "Créateur")])];
							}),
							_: 1
						}, _parent, _scopeId));
						if (_ctx.$page.props.auth.user && _ctx.$page.props.auth.user.id !== __props.sound.user_id) _push(ssrRenderComponent(_sfc_main$9, {
							"user-id": __props.sound.user_id,
							"initial-following": __props.isFollowing,
							size: "md",
							class: "w-full"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div>`);
						if (__props.sound.tags?.length > 0) {
							_push(`<div class="glass-card p-6"${_scopeId}><h3 class="font-semibold text-arbor-cream mb-3 text-sm"${_scopeId}>Tags</h3><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
							ssrRenderList(__props.sound.tags, (tag) => {
								_push(`<span class="px-3 py-1 rounded-lg bg-arbor-glass text-arbor-sage text-xs hover:bg-arbor-emerald/10 hover:text-arbor-emerald transition-colors cursor-default"${_scopeId}>${ssrInterpolate(tag.name)}</span>`);
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						_push(`<div class="glass-card p-6"${_scopeId}><h3 class="font-semibold text-arbor-cream mb-4 text-sm"${_scopeId}>Statistiques</h3><div class="space-y-3"${_scopeId}><div class="flex justify-between text-sm group"${_scopeId}><span class="text-arbor-sage"${_scopeId}>Écoutes</span><span class="text-arbor-cream font-medium group-hover:text-arbor-emerald transition-colors"${_scopeId}>${ssrInterpolate(__props.sound.play_count)}</span></div><div class="flex justify-between text-sm group"${_scopeId}><span class="text-arbor-sage"${_scopeId}>J&#39;aime</span><span class="text-arbor-cream font-medium group-hover:text-rose-400 transition-colors"${_scopeId}>${ssrInterpolate(__props.sound.like_count)}</span></div><div class="flex justify-between text-sm group"${_scopeId}><span class="text-arbor-sage"${_scopeId}>Commentaires</span><span class="text-arbor-cream font-medium group-hover:text-sky-400 transition-colors"${_scopeId}>${ssrInterpolate(__props.sound.comment_count)}</span></div></div></div></div></div></div></div>`);
					} else return [createVNode("div", { class: "pt-24 pb-16" }, [createVNode("div", { class: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode(_sfc_main$8, { items: [
						{
							label: "Accueil",
							href: "/"
						},
						{
							label: "Sons",
							href: "/sounds"
						},
						{ label: __props.sound.title }
					] }, null, 8, ["items"]), createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [createVNode("div", { class: "lg:col-span-2 space-y-8" }, [
						createVNode("div", { class: "aspect-[16/9] rounded-2xl overflow-hidden bg-arbor-deep relative group" }, [__props.coverUrl ? (openBlock(), createBlock("div", {
							key: 0,
							class: "absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105",
							style: `background-image: url(${__props.coverUrl})`,
							loading: "lazy"
						}, null, 4)) : (openBlock(), createBlock("div", {
							key: 1,
							class: "absolute inset-0 bg-gradient-to-br from-arbor-moss/20 to-arbor-emerald/10 flex items-center justify-center"
						}, [(openBlock(), createBlock("svg", {
							class: "w-24 h-24 text-arbor-moss/30",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "1",
							d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
						})]))]))]),
						createVNode("div", { class: "glass-card p-6 relative" }, [
							createVNode("div", { class: "flex items-center gap-4 mb-4" }, [createVNode("button", {
								onClick: togglePlay,
								"aria-label": effectiveIsPlaying.value ? "Pause" : "Lire",
								class: "w-14 h-14 rounded-full bg-arbor-emerald flex items-center justify-center hover:bg-arbor-emerald-dark transition-colors shrink-0 shadow-lg shadow-arbor-emerald/20 group"
							}, [!effectiveIsPlaying.value ? (openBlock(), createBlock("svg", {
								key: 0,
								class: "w-6 h-6 text-arbor-night ml-1 transition-transform group-hover:scale-110",
								fill: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", { d: "M8 5v14l11-7z" })])) : (openBlock(), createBlock("svg", {
								key: 1,
								class: "w-6 h-6 text-arbor-night",
								fill: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", { d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z" })]))], 8, ["aria-label"]), createVNode("div", { class: "flex-1 min-w-0" }, [createVNode("h1", { class: "font-display text-xl font-bold text-arbor-cream truncate" }, toDisplayString(__props.sound.title), 1), createVNode(unref(Link), {
								href: _ctx.route("creators.show", __props.sound.user?.slug),
								class: "text-sm text-arbor-sage hover:text-arbor-emerald transition-colors"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(__props.sound.user?.name ?? "Anonyme"), 1)]),
								_: 1
							}, 8, ["href"])])]),
							__props.audioUrl ? (openBlock(), createBlock(_sfc_main$2, {
								key: 0,
								ref_key: "waveSurferRef",
								ref: waveSurferRef,
								"audio-url": __props.audioUrl,
								"is-playing": effectiveIsPlaying.value,
								"wave-color": "#4a5d4a",
								"progress-color": "#7c9a6a",
								"cursor-color": "#d4c9a8",
								height: 80,
								onReady: onWaveReady,
								onTimeupdate: onWaveTimeUpdate,
								onFinish: onWaveFinish,
								onPlay: ($event) => isPlaying.value = true,
								onPause: ($event) => isPlaying.value = false
							}, null, 8, [
								"audio-url",
								"is-playing",
								"onPlay",
								"onPause"
							])) : createCommentVNode("", true),
							createVNode("div", { class: "flex items-center gap-3 mt-4" }, [
								createVNode("span", { class: "text-xs text-arbor-sage w-10 text-right font-mono" }, toDisplayString(formatTime(currentTime.value)), 1),
								createVNode("div", {
									class: "flex-1 h-1.5 bg-arbor-glass rounded-full cursor-pointer relative overflow-hidden group",
									onClick: seek
								}, [createVNode("div", {
									class: "absolute top-0 left-0 h-full bg-arbor-emerald rounded-full transition-all duration-100 group-hover:bg-arbor-emerald-dark",
									style: `width: ${duration.value ? currentTime.value / duration.value * 100 : 0}%`
								}, null, 4), createVNode("div", {
									class: "absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-arbor-cream rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity",
									style: `left: calc(${duration.value ? currentTime.value / duration.value * 100 : 0}% - 6px)`
								}, null, 4)]),
								createVNode("span", { class: "text-xs text-arbor-sage w-10 font-mono" }, toDisplayString(formatTime(duration.value)), 1)
							])
						]),
						createVNode("div", { class: "flex items-center gap-3" }, [
							createVNode(_sfc_main$6, {
								"sound-id": __props.sound.id,
								"initial-liked": __props.isLiked,
								"initial-count": __props.sound.like_count
							}, null, 8, [
								"sound-id",
								"initial-liked",
								"initial-count"
							]),
							createVNode("button", {
								onClick: shareLink,
								class: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-all"
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
							})])), copied.value ? (openBlock(), createBlock("span", { key: 0 }, "Lien copié !")) : (openBlock(), createBlock("span", { key: 1 }, "Partager"))]),
							createVNode(_sfc_main$3, {
								"reportable-type": "sound",
								"reportable-id": __props.sound.id
							}, null, 8, ["reportable-id"])
						]),
						createVNode("div", null, [createVNode("h2", { class: "font-semibold text-arbor-cream mb-3" }, "Description"), createVNode("p", { class: "text-arbor-sage leading-relaxed whitespace-pre-line" }, toDisplayString(__props.sound.description || "Aucune description."), 1)]),
						createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 gap-4" }, [
							__props.sound.category ? (openBlock(), createBlock("div", {
								key: 0,
								class: "glass-card p-4 hover-lift"
							}, [createVNode("div", { class: "flex items-center gap-2 mb-2" }, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4 text-arbor-sage",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: getMetaIcon("category")
							}, null, 8, ["d"])])), createVNode("div", { class: "text-xs text-arbor-sage" }, "Catégorie")]), createVNode("div", { class: "text-sm font-medium text-arbor-cream" }, toDisplayString(__props.sound.category.name), 1)])) : createCommentVNode("", true),
							__props.sound.environment ? (openBlock(), createBlock("div", {
								key: 1,
								class: "glass-card p-4 hover-lift"
							}, [createVNode("div", { class: "flex items-center gap-2 mb-2" }, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4 text-arbor-sage",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: getMetaIcon("environment")
							}, null, 8, ["d"])])), createVNode("div", { class: "text-xs text-arbor-sage" }, "Environnement")]), createVNode("div", { class: "text-sm font-medium text-arbor-cream" }, toDisplayString(__props.sound.environment.name), 1)])) : createCommentVNode("", true),
							__props.sound.equipment ? (openBlock(), createBlock("div", {
								key: 2,
								class: "glass-card p-4 hover-lift"
							}, [createVNode("div", { class: "flex items-center gap-2 mb-2" }, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4 text-arbor-sage",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: getMetaIcon("equipment")
							}, null, 8, ["d"])])), createVNode("div", { class: "text-xs text-arbor-sage" }, "Matériel")]), createVNode("div", { class: "text-sm font-medium text-arbor-cream" }, toDisplayString(__props.sound.equipment), 1)])) : createCommentVNode("", true),
							__props.sound.recorded_at ? (openBlock(), createBlock("div", {
								key: 3,
								class: "glass-card p-4 hover-lift"
							}, [createVNode("div", { class: "flex items-center gap-2 mb-2" }, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4 text-arbor-sage",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: getMetaIcon("date")
							}, null, 8, ["d"])])), createVNode("div", { class: "text-xs text-arbor-sage" }, "Date d'enregistrement")]), createVNode("div", { class: "text-sm font-medium text-arbor-cream" }, toDisplayString(formatDate(__props.sound.recorded_at)), 1)])) : createCommentVNode("", true),
							createVNode("div", { class: "glass-card p-4 hover-lift" }, [createVNode("div", { class: "flex items-center gap-2 mb-2" }, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4 text-arbor-sage",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: getMetaIcon("license")
							}, null, 8, ["d"])])), createVNode("div", { class: "text-xs text-arbor-sage" }, "Licence")]), createVNode("div", { class: "text-sm font-medium text-arbor-cream" }, toDisplayString(__props.sound.license), 1)]),
							__props.sound.sound_location?.location_name ? (openBlock(), createBlock("div", {
								key: 4,
								class: "glass-card p-4 hover-lift"
							}, [createVNode("div", { class: "flex items-center gap-2 mb-2" }, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4 text-arbor-sage",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: getMetaIcon("location")
							}, null, 8, ["d"])])), createVNode("div", { class: "text-xs text-arbor-sage" }, "Lieu")]), createVNode("div", { class: "text-sm font-medium text-arbor-cream" }, toDisplayString(__props.sound.sound_location.location_name), 1)])) : createCommentVNode("", true)
						]),
						createVNode(_sfc_main$1, {
							analysis: __props.analysis,
							sound: __props.sound,
							"is-owner": _ctx.$page.props.auth.user && _ctx.$page.props.auth.user.id === __props.sound.user_id
						}, null, 8, [
							"analysis",
							"sound",
							"is-owner"
						]),
						createVNode(_sfc_main$4, {
							"sound-id": __props.sound.id,
							comments: __props.comments
						}, null, 8, ["sound-id", "comments"])
					]), createVNode("div", { class: "space-y-6" }, [
						createVNode("div", { class: "glass-card p-6 hover-lift" }, [createVNode(unref(Link), {
							href: _ctx.route("creators.show", __props.sound.user?.slug),
							class: "flex items-center gap-3 mb-4 group"
						}, {
							default: withCtx(() => [createVNode("div", { class: "w-12 h-12 rounded-full bg-arbor-moss/30 flex items-center justify-center overflow-hidden ring-2 ring-arbor-glass-border/50 group-hover:ring-arbor-emerald/30 transition-all" }, [createVNode("span", { class: "text-lg font-display font-bold text-arbor-emerald" }, toDisplayString(__props.sound.user?.name?.charAt(0)?.toUpperCase() ?? "?"), 1)]), createVNode("div", null, [createVNode("div", { class: "font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors" }, toDisplayString(__props.sound.user?.name ?? "Anonyme"), 1), createVNode("div", { class: "text-xs text-arbor-sage" }, "Créateur")])]),
							_: 1
						}, 8, ["href"]), _ctx.$page.props.auth.user && _ctx.$page.props.auth.user.id !== __props.sound.user_id ? (openBlock(), createBlock(_sfc_main$9, {
							key: 0,
							"user-id": __props.sound.user_id,
							"initial-following": __props.isFollowing,
							size: "md",
							class: "w-full"
						}, null, 8, ["user-id", "initial-following"])) : createCommentVNode("", true)]),
						__props.sound.tags?.length > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "glass-card p-6"
						}, [createVNode("h3", { class: "font-semibold text-arbor-cream mb-3 text-sm" }, "Tags"), createVNode("div", { class: "flex flex-wrap gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.sound.tags, (tag) => {
							return openBlock(), createBlock("span", {
								key: tag.id,
								class: "px-3 py-1 rounded-lg bg-arbor-glass text-arbor-sage text-xs hover:bg-arbor-emerald/10 hover:text-arbor-emerald transition-colors cursor-default"
							}, toDisplayString(tag.name), 1);
						}), 128))])])) : createCommentVNode("", true),
						createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-semibold text-arbor-cream mb-4 text-sm" }, "Statistiques"), createVNode("div", { class: "space-y-3" }, [
							createVNode("div", { class: "flex justify-between text-sm group" }, [createVNode("span", { class: "text-arbor-sage" }, "Écoutes"), createVNode("span", { class: "text-arbor-cream font-medium group-hover:text-arbor-emerald transition-colors" }, toDisplayString(__props.sound.play_count), 1)]),
							createVNode("div", { class: "flex justify-between text-sm group" }, [createVNode("span", { class: "text-arbor-sage" }, "J'aime"), createVNode("span", { class: "text-arbor-cream font-medium group-hover:text-rose-400 transition-colors" }, toDisplayString(__props.sound.like_count), 1)]),
							createVNode("div", { class: "flex justify-between text-sm group" }, [createVNode("span", { class: "text-arbor-sage" }, "Commentaires"), createVNode("span", { class: "text-arbor-cream font-medium group-hover:text-sky-400 transition-colors" }, toDisplayString(__props.sound.comment_count), 1)])
						])])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Sounds/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

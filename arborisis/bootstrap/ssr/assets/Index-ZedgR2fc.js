/* empty css                 */
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-D-F0WtqU.js";
import { t as _sfc_main$12 } from "./AuthenticatedLayout-BYUVvhyG.js";
import { t as echo } from "./echo-DCkQjCaD.js";
/* empty css             */
import { Head } from "@inertiajs/vue3";
import { Transition, computed, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, nextTick, onMounted, onUnmounted, openBlock, ref, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import L from "leaflet";
//#region resources/js/Components/Gamification/SensitivityWarning.vue
var _sfc_main$11 = {
	__name: "SensitivityWarning",
	__ssrInlineRender: true,
	props: {
		level: {
			type: String,
			default: "normal"
		},
		warningText: {
			type: String,
			default: null
		}
	},
	setup(__props) {
		const props = __props;
		const isSensitive = computed(() => {
			return props.level !== "normal";
		});
		const levelConfig = computed(() => {
			return {
				fragile: {
					icon: "🌿",
					title: "Lieu fragile",
					color: "text-amber-300",
					bg: "bg-amber-500/10",
					border: "border-amber-500/20"
				},
				sensitive_species: {
					icon: "🦉",
					title: "Espèce sensible",
					color: "text-rose-300",
					bg: "bg-rose-500/10",
					border: "border-rose-500/20"
				},
				private: {
					icon: "🔒",
					title: "Lieu privé",
					color: "text-slate-300",
					bg: "bg-slate-500/10",
					border: "border-slate-500/20"
				},
				dangerous: {
					icon: "⚠️",
					title: "Zone dangereuse",
					color: "text-orange-300",
					bg: "bg-orange-500/10",
					border: "border-orange-500/20"
				}
			}[props.level] || null;
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (isSensitive.value && levelConfig.value) _push(`<div${ssrRenderAttrs(mergeProps({ class: ["rounded-xl border p-4 flex items-start gap-3", [levelConfig.value.bg, levelConfig.value.border]] }, _attrs))}><span class="text-xl shrink-0 mt-0.5">${ssrInterpolate(levelConfig.value.icon)}</span><div><p class="${ssrRenderClass([levelConfig.value.color, "font-medium text-sm"])}">${ssrInterpolate(levelConfig.value.title)}</p><p class="${ssrRenderClass([levelConfig.value.color, "text-xs mt-1 opacity-80 leading-relaxed"])}">${ssrInterpolate(__props.warningText || "Ce lieu est protégé : sa position exacte reste confidentielle.")}</p></div></div>`);
			else _push(`<!---->`);
		};
	}
};
var _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/SensitivityWarning.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/ModerationInfoBox.vue
var _sfc_main$10 = {
	__name: "ModerationInfoBox",
	__ssrInlineRender: true,
	props: { status: {
		type: String,
		required: true
	} },
	setup(__props) {
		const props = __props;
		const statusConfig = {
			pending: {
				text: "Ce point est en attente de modération. Il ne sera visible publiquement qu'après validation.",
				color: "text-amber-300",
				bg: "bg-amber-500/10",
				border: "border-amber-500/20"
			},
			approved: {
				text: "Ce point a été validé par la modération.",
				color: "text-emerald-300",
				bg: "bg-emerald-500/10",
				border: "border-emerald-500/20"
			},
			rejected: {
				text: "Ce point a été rejeté par la modération.",
				color: "text-rose-300",
				bg: "bg-rose-500/10",
				border: "border-rose-500/20"
			},
			hidden: {
				text: "Ce point a été masqué par la modération.",
				color: "text-slate-300",
				bg: "bg-slate-500/10",
				border: "border-slate-500/20"
			}
		};
		const config = statusConfig[props.status] || statusConfig.pending;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["rounded-xl border p-3 text-xs", [
				unref(config).bg,
				unref(config).border,
				unref(config).color
			]] }, _attrs))}>${ssrInterpolate(unref(config).text)}</div>`);
		};
	}
};
var _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/ModerationInfoBox.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/PointDetailDrawer.vue
var _sfc_main$9 = {
	__name: "PointDetailDrawer",
	__ssrInlineRender: true,
	props: {
		point: {
			type: Object,
			default: null
		},
		isOpen: {
			type: Boolean,
			default: false
		}
	},
	emits: ["close", "visit"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const categoryColors = {
			birds: "#FBBF24",
			forest: "#34D399",
			water: "#60A5FA",
			insects: "#A3E635",
			wind: "#C7D2FE",
			night_ambience: "#A78BFA",
			meeting_point: "#F472B6",
			quiet_spot: "#8FA68E",
			educational_zone: "#38BDF8",
			other: "#9CA3AF"
		};
		const categoryLabel = computed(() => {
			if (!props.point) return "";
			return {
				birds: "Oiseaux",
				forest: "Forêt",
				water: "Eau",
				insects: "Insectes",
				wind: "Vent",
				night_ambience: "Ambiance nocturne",
				meeting_point: "Point de rencontre",
				quiet_spot: "Spot calme",
				educational_zone: "Zone pédagogique",
				other: "Autre"
			}[props.point.category_value] || props.point.category;
		});
		const categoryColor = computed(() => {
			if (!props.point) return "#9CA3AF";
			return categoryColors[props.point.category_value] || "#9CA3AF";
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.isOpen && __props.point) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute top-4 right-4 bottom-4 w-80 z-map bg-arbor-night/95 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col" }, _attrs))}><div class="relative h-40 shrink-0">`);
				if (__props.point.cover_image) _push(`<div class="absolute inset-0 bg-cover bg-center" style="${ssrRenderStyle({ backgroundImage: `url(${__props.point.cover_image})` })}"></div>`);
				else _push(`<div class="absolute inset-0 flex items-center justify-center" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${categoryColor.value}15, ${categoryColor.value}05)` })}"><svg class="w-16 h-16 opacity-20" style="${ssrRenderStyle({ color: categoryColor.value })}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>`);
				_push(`<div class="absolute inset-0 bg-gradient-to-t from-arbor-night via-arbor-night/40 to-transparent"></div><button aria-label="Fermer" class="absolute top-3 right-3 min-w-[44px] min-h-[44px] rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="absolute bottom-3 left-4 right-4"><span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider" style="${ssrRenderStyle({
					background: categoryColor.value + "20",
					color: categoryColor.value,
					border: "1px solid " + categoryColor.value + "30"
				})}">${ssrInterpolate(categoryLabel.value)}</span><h2 class="text-lg font-semibold text-arbor-cream mt-1.5 leading-tight">${ssrInterpolate(__props.point.title)}</h2></div></div><div class="flex-1 overflow-y-auto p-4 space-y-4">`);
				_push(ssrRenderComponent(_sfc_main$11, {
					level: __props.point.nature_sensitivity_level,
					"warning-text": __props.point.nature_sensitivity_warning
				}, null, _parent));
				if (__props.point.moderation_status !== "approved") _push(ssrRenderComponent(_sfc_main$10, { status: __props.point.moderation_status }, null, _parent));
				else _push(`<!---->`);
				if (__props.point.description) _push(`<p class="text-sm text-arbor-sage/80 leading-relaxed">${ssrInterpolate(__props.point.description)}</p>`);
				else _push(`<!---->`);
				_push(`<div class="grid grid-cols-2 gap-3 text-xs"><div class="bg-white/5 rounded-lg p-3"><p class="text-arbor-sage/50 mb-1">Difficulté</p><div class="flex gap-0.5"><!--[-->`);
				ssrRenderList(5, (i) => {
					_push(`<span class="${ssrRenderClass([i <= __props.point.difficulty_level ? "bg-arbor-emerald" : "bg-white/10", "w-4 h-1.5 rounded-full"])}"></span>`);
				});
				_push(`<!--]--></div></div><div class="bg-white/5 rounded-lg p-3"><p class="text-arbor-sage/50 mb-1">Moment</p><p class="text-arbor-cream">${ssrInterpolate(__props.point.recommended_time || "Toute la journée")}</p></div></div>`);
				if (__props.point.tags?.length) {
					_push(`<div class="flex flex-wrap gap-1.5"><!--[-->`);
					ssrRenderList(__props.point.tags, (tag) => {
						_push(`<span class="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-arbor-sage/70 border border-white/5">${ssrInterpolate(tag)}</span>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				_push(`<div class="pt-3 border-t border-white/5"><p class="text-xs text-arbor-sage/50"> Proposé par <span class="text-arbor-sage/80">${ssrInterpolate(__props.point.user?.name || "Anonyme")}</span></p><p class="text-[10px] text-arbor-sage/30 mt-0.5">${ssrInterpolate(__props.point.created_at)}</p></div></div><div class="shrink-0 p-4 border-t border-white/5 space-y-2"><button class="w-full py-2.5 rounded-xl bg-arbor-emerald text-arbor-night font-semibold text-sm hover:bg-arbor-emerald/90 transition-colors flex items-center justify-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Visiter ce lieu </button><button class="w-full py-2 rounded-xl bg-white/5 text-arbor-sage text-xs hover:bg-white/10 transition-colors"> Signaler un problème </button></div></div>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/PointDetailDrawer.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/CreateArborisisPointForm.vue
var _sfc_main$8 = {
	__name: "CreateArborisisPointForm",
	__ssrInlineRender: true,
	props: {
		initialLat: {
			type: Number,
			default: null
		},
		initialLng: {
			type: Number,
			default: null
		}
	},
	emits: ["submit", "cancel"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const form = ref({
			title: "",
			description: "",
			latitude: props.initialLat ?? "",
			longitude: props.initialLng ?? "",
			category: "",
			tags: [],
			difficulty_level: 1,
			nature_sensitivity_level: "normal",
			recommended_time: "",
			audio_environment_type: ""
		});
		const tagInput = ref("");
		watch(() => props.initialLat, (val) => {
			if (val !== null && val !== void 0) form.value.latitude = val;
		});
		watch(() => props.initialLng, (val) => {
			if (val !== null && val !== void 0) form.value.longitude = val;
		});
		const categories = [
			{
				value: "birds",
				label: "Oiseaux"
			},
			{
				value: "forest",
				label: "Forêt"
			},
			{
				value: "water",
				label: "Eau"
			},
			{
				value: "insects",
				label: "Insectes"
			},
			{
				value: "wind",
				label: "Vent"
			},
			{
				value: "night_ambience",
				label: "Ambiance nocturne"
			},
			{
				value: "meeting_point",
				label: "Point de rencontre"
			},
			{
				value: "quiet_spot",
				label: "Spot calme"
			},
			{
				value: "educational_zone",
				label: "Zone pédagogique"
			},
			{
				value: "other",
				label: "Autre"
			}
		];
		const sensitivityLevels = [
			{
				value: "normal",
				label: "Normal"
			},
			{
				value: "fragile",
				label: "Fragile"
			},
			{
				value: "sensitive_species",
				label: "Espèce sensible"
			},
			{
				value: "private",
				label: "Privé"
			},
			{
				value: "dangerous",
				label: "Dangereux"
			}
		];
		const isSubmitting = ref(false);
		const errors = ref({});
		const locationError = ref("");
		const showSensitiveWarning = computed(() => {
			return form.value.nature_sensitivity_level !== "normal";
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-5" }, _attrs))}><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Titre du lieu</label><input${ssrRenderAttr("value", form.value.title)} type="text" required minlength="3" maxlength="255" class="w-full bg-arbor-glass border border-arbor-glass-border rounded-xl px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:border-arbor-emerald/50 focus:ring-1 focus:ring-arbor-emerald/20 transition-colors" placeholder="Ex: Clairière aux chouettes">`);
			if (errors.value.title) _push(`<p class="text-xs text-rose-400 mt-1">${ssrInterpolate(errors.value.title[0])}</p>`);
			else _push(`<!---->`);
			_push(`</div><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Description</label><textarea rows="3" maxlength="5000" class="w-full bg-arbor-glass border border-arbor-glass-border rounded-xl px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:border-arbor-emerald/50 focus:ring-1 focus:ring-arbor-emerald/20 transition-colors resize-none" placeholder="Décrivez ce lieu, ce qu&#39;on y entend, comment y accéder...">${ssrInterpolate(form.value.description)}</textarea></div><div class="grid grid-cols-2 gap-3"><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Latitude</label><input${ssrRenderAttr("value", form.value.latitude)} type="number" step="any" required class="w-full bg-arbor-glass border border-arbor-glass-border rounded-xl px-4 py-2.5 text-base text-arbor-cream focus:outline-none focus:border-arbor-emerald/50 transition-colors"></div><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Longitude</label><input${ssrRenderAttr("value", form.value.longitude)} type="number" step="any" required class="w-full bg-arbor-glass border border-arbor-glass-border rounded-xl px-4 py-2.5 text-base text-arbor-cream focus:outline-none focus:border-arbor-emerald/50 transition-colors"></div></div>`);
			if (form.value.latitude === "" && form.value.longitude === "") {
				_push(`<div class="flex flex-col gap-2 mt-1"><button type="button" class="text-xs text-arbor-emerald hover:text-arbor-emerald/80 underline underline-offset-2 text-left"> 📍 Utiliser ma position actuelle </button>`);
				if (locationError.value) _push(`<p class="text-[11px] text-amber-300/80">${ssrInterpolate(locationError.value)}</p>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`<div class="grid grid-cols-2 gap-3"><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Catégorie</label><select required class="w-full bg-arbor-glass border border-arbor-glass-border rounded-xl px-4 py-2.5 text-sm text-arbor-cream focus:outline-none focus:border-arbor-emerald/50 transition-colors appearance-none"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(form.value.category) ? ssrLooseContain(form.value.category, "") : ssrLooseEqual(form.value.category, "")) ? " selected" : ""}>Choisir...</option><!--[-->`);
			ssrRenderList(categories, (cat) => {
				_push(`<option${ssrRenderAttr("value", cat.value)}${ssrIncludeBooleanAttr(Array.isArray(form.value.category) ? ssrLooseContain(form.value.category, cat.value) : ssrLooseEqual(form.value.category, cat.value)) ? " selected" : ""}>${ssrInterpolate(cat.label)}</option>`);
			});
			_push(`<!--]--></select></div><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Difficulté (1-5)</label><input${ssrRenderAttr("value", form.value.difficulty_level)} type="number" min="1" max="5" class="w-full bg-arbor-glass border border-arbor-glass-border rounded-xl px-4 py-2.5 text-base text-arbor-cream focus:outline-none focus:border-arbor-emerald/50 transition-colors"></div></div><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Niveau de sensibilité naturelle</label><select class="w-full bg-arbor-glass border border-arbor-glass-border rounded-xl px-4 py-2.5 text-sm text-arbor-cream focus:outline-none focus:border-arbor-emerald/50 transition-colors appearance-none"><!--[-->`);
			ssrRenderList(sensitivityLevels, (level) => {
				_push(`<option${ssrRenderAttr("value", level.value)}${ssrIncludeBooleanAttr(Array.isArray(form.value.nature_sensitivity_level) ? ssrLooseContain(form.value.nature_sensitivity_level, level.value) : ssrLooseEqual(form.value.nature_sensitivity_level, level.value)) ? " selected" : ""}>${ssrInterpolate(level.label)}</option>`);
			});
			_push(`<!--]--></select>`);
			if (showSensitiveWarning.value) _push(`<p class="text-[11px] text-amber-300/80 mt-1.5"> ⚠️ Les coordonnées exactes seront masquées et remplacées par une position approximative. </p>`);
			else _push(`<!---->`);
			_push(`</div><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Tags</label><div class="flex flex-wrap gap-1.5 mb-2"><!--[-->`);
			ssrRenderList(form.value.tags, (tag) => {
				_push(`<span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-arbor-emerald/10 text-arbor-emerald text-xs">${ssrInterpolate(tag)} <button type="button" class="hover:text-arbor-cream">×</button></span>`);
			});
			_push(`<!--]--></div><div class="flex gap-2"><input${ssrRenderAttr("value", tagInput.value)} type="text" maxlength="50" class="flex-1 bg-arbor-glass border border-arbor-glass-border rounded-xl px-4 py-2 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:border-arbor-emerald/50 transition-colors" placeholder="Ajouter un tag..."><button type="button" class="px-3 py-2 rounded-xl bg-arbor-glass text-arbor-sage text-xs hover:bg-white/10 transition-colors"> + Ajouter </button></div></div><div class="pt-2 flex gap-3"><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="flex-1 py-2.5 rounded-xl bg-arbor-emerald text-arbor-night font-semibold text-sm hover:bg-arbor-emerald/90 transition-colors disabled:opacity-50">${ssrInterpolate(isSubmitting.value ? "Envoi..." : "Proposer ce lieu")}</button><button type="button" class="px-5 py-2.5 rounded-xl bg-arbor-glass text-arbor-sage text-sm hover:bg-white/10 transition-colors"> Annuler </button></div></form>`);
		};
	}
};
var _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/CreateArborisisPointForm.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/VisitButton.vue
var _sfc_main$7 = {
	__name: "VisitButton",
	__ssrInlineRender: true,
	props: {
		pointId: {
			type: [String, Number],
			required: true
		},
		pointSlug: {
			type: String,
			required: true
		},
		isNearby: {
			type: Boolean,
			default: false
		},
		hasConsent: {
			type: Boolean,
			default: false
		},
		cooldownRemaining: {
			type: Number,
			default: 0
		}
	},
	emits: ["visit", "request-consent"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const isLoading = ref(false);
		const buttonText = computed(() => {
			if (!props.hasConsent) return "Autoriser la géolocalisation";
			if (props.cooldownRemaining > 0) return `Disponible dans ${formatCooldown(props.cooldownRemaining)}`;
			if (!props.isNearby) return "Rapprochez-vous pour visiter";
			return "Visiter ce lieu";
		});
		const isDisabled = computed(() => {
			return isLoading.value || !props.hasConsent || props.cooldownRemaining > 0 || !props.isNearby;
		});
		const formatCooldown = (seconds) => {
			const mins = Math.floor(seconds / 60);
			const secs = seconds % 60;
			if (mins > 0) return `${mins}m ${secs}s`;
			return `${secs}s`;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				disabled: isDisabled.value,
				class: ["w-full py-3 rounded-xl font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2", [isDisabled.value ? "bg-white/5 text-arbor-sage/40 cursor-not-allowed" : "bg-arbor-emerald text-arbor-night hover:bg-arbor-emerald/90 hover:scale-[1.02] active:scale-[0.98]"]]
			}, _attrs))}>`);
			if (isLoading.value) _push(`<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
			else _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`);
			_push(` ${ssrInterpolate(buttonText.value)}</button>`);
		};
	}
};
var _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/VisitButton.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/VisitSuccessModal.vue
var _sfc_main$6 = {
	__name: "VisitSuccessModal",
	__ssrInlineRender: true,
	props: {
		isOpen: {
			type: Boolean,
			default: false
		},
		pointTitle: {
			type: String,
			default: ""
		},
		xpGained: {
			type: Number,
			default: 10
		}
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.isOpen) _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center p-4" }, _attrs))}><div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div><div class="relative bg-arbor-night border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"><div class="w-16 h-16 mx-auto mb-4 rounded-full bg-arbor-emerald/10 flex items-center justify-center"><svg class="w-8 h-8 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><h3 class="text-lg font-semibold text-arbor-cream mb-1"> Visite enregistrée </h3><p class="text-sm text-arbor-sage/70 mb-4"> Tu as découvert un nouvel écho naturel. </p><div class="bg-white/5 rounded-xl p-4 mb-6"><p class="text-xs text-arbor-sage/70 mb-1">Lieu visité</p><p class="text-sm font-medium text-arbor-cream">${ssrInterpolate(__props.pointTitle)}</p></div><div class="flex items-center justify-center gap-2 mb-6"><span class="text-xs text-arbor-sage/70">+</span><span class="text-2xl font-bold text-arbor-emerald">${ssrInterpolate(__props.xpGained)}</span><span class="text-xs text-arbor-sage/70">XP</span></div><button class="w-full py-2.5 rounded-xl bg-arbor-emerald text-arbor-night font-semibold text-sm hover:bg-arbor-emerald/90 transition-colors"> Continuer l&#39;exploration </button></div></div>`);
			else _push(`<!---->`);
		};
	}
};
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/VisitSuccessModal.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/PresenceToggle.vue
var _sfc_main$5 = {
	__name: "PresenceToggle",
	__ssrInlineRender: true,
	props: {
		isActive: {
			type: Boolean,
			default: false
		},
		mode: {
			type: String,
			default: "invisible"
		}
	},
	emits: ["toggle", "change-mode"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const isLoading = ref(false);
		const statusText = computed(() => {
			if (props.isActive) return props.mode === "invisible" ? "Invisible" : "Visible sur la carte";
			return "Hors ligne";
		});
		const statusColor = computed(() => {
			if (!props.isActive) return "bg-slate-500/20 text-slate-400";
			if (props.mode === "invisible") return "bg-amber-500/20 text-amber-400";
			return "bg-emerald-500/20 text-emerald-400";
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-3" }, _attrs))}><button${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="${ssrRenderClass([__props.isActive ? "bg-arbor-emerald" : "bg-white/10", "relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/30"])}"><span class="${ssrRenderClass([__props.isActive ? "translate-x-5" : "translate-x-0", "absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300"])}"></span></button><div><p class="text-sm font-medium text-arbor-cream">Présence sur la carte</p><p class="${ssrRenderClass([statusColor.value.split(" ")[1], "text-[11px]"])}"><span class="${ssrRenderClass([statusColor.value.split(" ")[0], "inline-block w-1.5 h-1.5 rounded-full mr-1"])}"></span> ${ssrInterpolate(statusText.value)}</p></div></div>`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/PresenceToggle.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/PrivacyModeSelector.vue
var _sfc_main$4 = {
	__name: "PrivacyModeSelector",
	__ssrInlineRender: true,
	props: { modelValue: {
		type: String,
		default: "invisible"
	} },
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const modes = [
			{
				value: "invisible",
				label: "Invisible",
				desc: "Personne ne te voit"
			},
			{
				value: "approximate",
				label: "Approximative",
				desc: "Position floutée à ~100m"
			},
			{
				value: "friends_only",
				label: "Amis",
				desc: "Visible uniquement par tes amis"
			},
			{
				value: "public_zone",
				label: "Publique",
				desc: "Visible par tous dans la zone"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}><p class="text-xs font-medium text-arbor-sage/70 mb-2">Mode de visibilité</p><!--[-->`);
			ssrRenderList(modes, (mode) => {
				_push(`<button class="${ssrRenderClass([__props.modelValue === mode.value ? "border-arbor-emerald/40 bg-arbor-emerald/5" : "border-white/5 bg-white/5 hover:bg-white/10", "w-full flex items-center gap-3 p-3 rounded-xl border transition-colors text-left"])}"><div class="${ssrRenderClass([__props.modelValue === mode.value ? "border-arbor-emerald" : "border-white/20", "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"])}">`);
				if (__props.modelValue === mode.value) _push(`<div class="w-2 h-2 rounded-full bg-arbor-emerald"></div>`);
				else _push(`<!---->`);
				_push(`</div><div><p class="text-sm text-arbor-cream">${ssrInterpolate(mode.label)}</p><p class="text-[11px] text-arbor-sage/70">${ssrInterpolate(mode.desc)}</p></div></button>`);
			});
			_push(`<!--]--></div>`);
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/PrivacyModeSelector.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/MapRadar.vue
var _sfc_main$3 = {
	__name: "MapRadar",
	__ssrInlineRender: true,
	props: {
		active: {
			type: Boolean,
			default: false
		},
		style: {
			type: Object,
			default: () => ({})
		}
	},
	setup(__props) {
		const props = __props;
		const containerClass = computed(() => props.active ? "opacity-100" : "opacity-0 pointer-events-none");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: ["absolute z-[400] pointer-events-none transition-opacity duration-700", containerClass.value],
				style: __props.style,
				"aria-hidden": "true"
			}, _attrs))} data-v-a427048f><div class="relative -translate-x-1/2 -translate-y-1/2" data-v-a427048f><div class="radar-ring radar-ring-1" data-v-a427048f></div><div class="radar-ring radar-ring-2" data-v-a427048f></div><div class="radar-ring radar-ring-3" data-v-a427048f></div></div></div>`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/MapRadar.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var MapRadar_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$3, [["__scopeId", "data-v-a427048f"]]);
//#endregion
//#region resources/js/Components/Gamification/NearbyUserDrawer.vue
var _sfc_main$2 = {
	__name: "NearbyUserDrawer",
	__ssrInlineRender: true,
	props: {
		isOpen: {
			type: Boolean,
			default: false
		},
		user: {
			type: Object,
			default: null
		},
		distance: {
			type: Number,
			default: null
		}
	},
	emits: [
		"close",
		"greet",
		"share",
		"invite"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const displayDistance = computed(() => {
			if (props.distance == null) return null;
			if (props.distance < 1e3) return `${Math.round(props.distance)}m`;
			return `${(props.distance / 1e3).toFixed(1)}km`;
		});
		const isNearby = computed(() => props.distance !== null && props.distance <= 500);
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.isOpen && __props.user) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-x-0 bottom-0 z-drawer md:absolute md:top-4 md:right-4 md:bottom-auto md:left-auto md:w-80 md:translate-y-0" }, _attrs))}><div class="bg-arbor-night/95 backdrop-blur-xl border-t md:border border-white/10 md:rounded-2xl shadow-2xl p-5"><div class="flex items-center justify-between mb-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-arbor-emerald/20 flex items-center justify-center"><svg class="w-5 h-5 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div><div><h3 class="text-base font-semibold text-arbor-cream">${ssrInterpolate(__props.user.name || "Enregistreur anonyme")}</h3>`);
				if (displayDistance.value) _push(`<p class="text-xs text-arbor-sage/70">${ssrInterpolate(displayDistance.value)} de toi</p>`);
				else _push(`<!---->`);
				_push(`</div></div><button aria-label="Fermer" class="min-w-[44px] min-h-[44px] flex items-center justify-center text-arbor-sage/50 hover:text-arbor-cream"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="space-y-2"><button${ssrIncludeBooleanAttr(!isNearby.value) ? " disabled" : ""} class="w-full py-2.5 rounded-xl bg-arbor-emerald text-arbor-night font-semibold text-sm hover:bg-arbor-emerald/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Saluer </button><button${ssrIncludeBooleanAttr(!isNearby.value) ? " disabled" : ""} class="w-full py-2.5 rounded-xl bg-white/5 text-arbor-cream font-medium text-sm hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Partager un spot </button><button class="w-full py-2.5 rounded-xl bg-white/5 text-arbor-cream font-medium text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Inviter à enregistrer </button></div>`);
				if (!isNearby.value) _push(`<p class="mt-3 text-[11px] text-arbor-sage/50 text-center"> Rapproche-toi à moins de 500m pour interagir. </p>`);
				else _push(`<!---->`);
				_push(`</div></div>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/NearbyUserDrawer.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/GroupEventDrawer.vue
var _sfc_main$1 = {
	__name: "GroupEventDrawer",
	__ssrInlineRender: true,
	props: {
		isOpen: {
			type: Boolean,
			default: false
		},
		event: {
			type: Object,
			default: null
		},
		isParticipant: {
			type: Boolean,
			default: false
		},
		canCheckIn: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		"close",
		"join",
		"leave",
		"checkIn"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const eventTypeLabel = computed(() => {
			return {
				dawn_chorus: "Dawn Chorus",
				soundwalk: "Soundwalk",
				night_ambience: "Ambiance nocturne",
				freestyle: "Session libre"
			}[props.event?.event_type] ?? "Événement";
		});
		const eventTypeColor = computed(() => {
			return {
				dawn_chorus: "text-amber-400 bg-amber-400/10",
				soundwalk: "text-sky-400 bg-sky-400/10",
				night_ambience: "text-violet-400 bg-violet-400/10",
				freestyle: "text-arbor-emerald bg-arbor-emerald/10"
			}[props.event?.event_type] ?? "text-arbor-sage bg-arbor-sage/10";
		});
		const timeUntil = computed(() => {
			if (!props.event?.scheduled_at) return "";
			const diff = new Date(props.event.scheduled_at) - Date.now();
			if (diff < 0) return "En cours";
			const mins = Math.round(diff / 6e4);
			if (mins < 60) return `Dans ${mins}min`;
			return `Dans ${Math.round(mins / 60)}h`;
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.isOpen && __props.event) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute top-4 right-4 bottom-4 w-80 max-w-[calc(100vw-2rem)] z-drawer bg-arbor-night/95 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-5" }, _attrs))}><div class="flex items-center justify-between mb-4"><span class="${ssrRenderClass([eventTypeColor.value, "text-[10px] px-2 py-1 rounded-md font-medium"])}">${ssrInterpolate(eventTypeLabel.value)}</span><button aria-label="Fermer" class="min-w-[44px] min-h-[44px] flex items-center justify-center text-arbor-sage/50 hover:text-arbor-cream"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><h2 class="text-lg font-semibold text-arbor-cream mb-1">${ssrInterpolate(__props.event.title)}</h2><p class="text-xs text-arbor-sage/70 mb-4">${ssrInterpolate(__props.event.description)}</p><div class="flex items-center gap-3 text-xs text-arbor-sage/60 mb-4"><span class="flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(timeUntil.value)}</span><span class="flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> ${ssrInterpolate(__props.event.participants_count ?? 0)} / ${ssrInterpolate(__props.event.max_participants)}</span></div><div class="mt-auto space-y-2">`);
				if (!__props.isParticipant) _push(`<button class="w-full py-2.5 rounded-xl bg-arbor-emerald text-arbor-night font-semibold text-sm hover:bg-arbor-emerald/90 transition-colors"> Rejoindre </button>`);
				else _push(`<!---->`);
				if (__props.isParticipant && __props.canCheckIn) _push(`<button class="w-full py-2.5 rounded-xl bg-arbor-amber text-arbor-night font-semibold text-sm hover:bg-arbor-amber/90 transition-colors"> Check-in </button>`);
				else _push(`<!---->`);
				if (__props.isParticipant && !__props.canCheckIn) _push(`<button class="w-full py-2.5 rounded-xl bg-white/5 text-arbor-cream font-medium text-sm hover:bg-white/10 transition-colors"> Quitter </button>`);
				else _push(`<!---->`);
				_push(`</div></div>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/GroupEventDrawer.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Composables/useMapPresence.js
/**
* Composable pour gérer la présence temps réel sur la carte.
* Combine WebSocket (Echo/Reverb) + fallback HTTP polling.
*/
function useMapPresence(mapInstance, currentUserId, options = {}) {
	const presences = ref(/* @__PURE__ */ new Map());
	const presenceLayer = ref(null);
	const isConnected = ref(false);
	const fetchInterval = ref(null);
	const echoChannel = ref(null);
	const PRESENCE_FETCH_MS = 1e4;
	const MARKER_ANIMATION_MS = 500;
	const getMarkerColor = (mode, userId) => {
		if (userId === currentUserId.value) return {
			fill: "#10B981",
			glow: "shadow-emerald-500/50"
		};
		if (mode === "friends_only") return {
			fill: "#38BDF8",
			glow: "shadow-sky-400/40"
		};
		if (mode === "public_zone") return {
			fill: "#FBBF24",
			glow: "shadow-amber-400/40"
		};
		return {
			fill: "#9CA3AF",
			glow: "shadow-gray-400/30"
		};
	};
	const createMarkerHtml = (presence) => {
		const isMe = presence.user_id === currentUserId;
		const colors = getMarkerColor(presence.visibility_mode, presence.user_id);
		const size = isMe ? 16 : 12;
		return `
            <div class="relative flex items-center justify-center" style="width:${size}px;height:${size}px;">
                <div class="absolute inset-0 rounded-full opacity-40 ${isMe ? "animate-ping" : "animate-pulse"}"
                     style="background:${colors.fill}; animation-duration:${isMe ? "2s" : "3s"};"></div>
                <div class="relative rounded-full border-2 border-white shadow-lg ${colors.glow}"
                     style="width:${size}px;height:${size}px;background:${colors.fill};"></div>
            </div>
        `;
	};
	const animateMarkerTo = (marker, targetLatLng) => {
		const startLatLng = marker.getLatLng();
		const startTime = performance.now();
		const animate = (now) => {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / MARKER_ANIMATION_MS, 1);
			const ease = 1 - (1 - progress) * (1 - progress);
			const lat = startLatLng.lat + (targetLatLng.lat - startLatLng.lat) * ease;
			const lng = startLatLng.lng + (targetLatLng.lng - startLatLng.lng) * ease;
			marker.setLatLng([lat, lng]);
			if (progress < 1) requestAnimationFrame(animate);
		};
		requestAnimationFrame(animate);
	};
	const ensureLayer = () => {
		if (!presenceLayer.value && mapInstance.value) presenceLayer.value = L.layerGroup().addTo(mapInstance.value);
		return presenceLayer.value;
	};
	const updateOrCreateMarker = (presence) => {
		if (presence.user_id === currentUserId.value) return;
		const layer = ensureLayer();
		if (!layer) return;
		let marker = presences.value.get(presence.user_id)?.marker;
		const latLng = [presence.latitude, presence.longitude];
		if (!marker) {
			const icon = L.divIcon({
				className: "user-presence-marker",
				html: createMarkerHtml(presence),
				iconSize: [20, 20],
				iconAnchor: [10, 10]
			});
			marker = L.marker(latLng, {
				icon,
				zIndexOffset: 500
			});
			marker.addTo(layer);
			marker.on("click", (e) => {
				e.originalEvent?.stopPropagation();
				if (typeof options.onUserClick === "function") options.onUserClick(presence);
			});
			const name = presence.user_name ?? "Enregistreur anonyme";
			const distanceText = presence.distance_meters ? `${Math.round(presence.distance_meters)}m` : presence.last_seen_at ?? "";
			marker.bindPopup(`
                <div class="text-xs text-arbor-cream font-medium">${name}</div>
                <div class="text-[10px] text-arbor-sage/70">${distanceText}</div>
            `, {
				closeButton: false,
				className: "arbor-popup",
				offset: [0, -8]
			});
		} else {
			animateMarkerTo(marker, {
				lat: presence.latitude,
				lng: presence.longitude
			});
			const icon = marker.getElement()?.querySelector(".relative");
			if (icon) icon.innerHTML = createMarkerHtml(presence);
		}
		presences.value.set(presence.user_id, {
			...presence,
			marker,
			lastUpdated: Date.now()
		});
	};
	const removeMarker = (userId) => {
		const data = presences.value.get(userId);
		if (data?.marker) presenceLayer.value?.removeLayer(data.marker);
		presences.value.delete(userId);
	};
	const fetchPresences = async () => {
		if (!mapInstance.value) return;
		const bounds = mapInstance.value.getBounds();
		const params = new URLSearchParams({
			"bounds[south]": bounds.getSouth(),
			"bounds[north]": bounds.getNorth(),
			"bounds[west]": bounds.getWest(),
			"bounds[east]": bounds.getEast()
		});
		try {
			const res = await fetch(`/api/map/presence?${params.toString()}`, {
				credentials: "same-origin",
				headers: { "Accept": "application/json" }
			});
			if (!res.ok) return;
			const geojson = await res.json();
			const activeIds = /* @__PURE__ */ new Set();
			geojson.features?.forEach((feature) => {
				const p = feature.properties;
				const coords = feature.geometry.coordinates;
				const presence = {
					user_id: p.user_id,
					user_name: p.user_name,
					latitude: coords[1],
					longitude: coords[0],
					visibility_mode: p.visibility_mode,
					last_seen_at: p.last_seen_at
				};
				activeIds.add(p.user_id);
				updateOrCreateMarker(presence);
			});
			for (const [userId] of presences.value) if (!activeIds.has(userId)) removeMarker(userId);
		} catch (e) {
			console.error("Failed to fetch presences:", e);
		}
	};
	const subscribeEcho = () => {
		if (echoChannel.value) return;
		echoChannel.value = echo.channel("presence.map");
		echoChannel.value.listen(".presence.updated", (data) => {
			updateOrCreateMarker({
				user_id: data.user_id,
				user_name: data.visibility_mode === "public_zone" ? data.user_name : null,
				latitude: data.latitude,
				longitude: data.longitude,
				visibility_mode: data.visibility_mode,
				last_seen_at: "à l'instant"
			});
		});
		echoChannel.value.listen(".presence.left", (data) => {
			removeMarker(data.user_id);
		});
		isConnected.value = true;
	};
	const unsubscribeEcho = () => {
		if (echoChannel.value) {
			echoChannel.value.stopListening(".presence.updated");
			echoChannel.value.stopListening(".presence.left");
			echo.leaveChannel("presence.map");
			echoChannel.value = null;
		}
		isConnected.value = false;
	};
	onMounted(() => {
		subscribeEcho();
		const startFetching = () => {
			if (mapInstance.value) {
				fetchPresences();
				fetchInterval.value = setInterval(fetchPresences, PRESENCE_FETCH_MS);
			} else setTimeout(startFetching, 200);
		};
		startFetching();
	});
	onUnmounted(() => {
		unsubscribeEcho();
		if (fetchInterval.value) clearInterval(fetchInterval.value);
		if (presenceLayer.value) {
			mapInstance.value?.removeLayer(presenceLayer.value);
			presenceLayer.value = null;
		}
		presences.value.clear();
	});
	return {
		presences,
		isConnected,
		fetchPresences
	};
}
//#endregion
//#region resources/js/Composables/useNearbyNotifications.js
/**
* Composable pour écouter les notifications de proximité (Phase 2).
* Écoute le canal privé App.Models.User.{id} pour l'événement user.nearby.
*/
function useNearbyNotifications(userId) {
	const lastNotification = ref(null);
	const notifications = ref([]);
	let channel = null;
	const dismiss = () => {
		lastNotification.value = null;
	};
	const clearAll = () => {
		notifications.value = [];
		lastNotification.value = null;
	};
	onMounted(() => {
		if (!userId.value) return;
		channel = echo.private(`App.Models.User.${userId.value}`);
		channel.listen(".user.nearby", (data) => {
			const notification = {
				id: Date.now(),
				initiatorId: data.initiator_id,
				initiatorName: data.initiator_name,
				distanceMeters: data.distance_meters,
				interactionType: data.interaction_type,
				timestamp: Date.now()
			};
			notifications.value.unshift(notification);
			lastNotification.value = notification;
			if (navigator.vibrate) navigator.vibrate([
				30,
				50,
				30
			]);
		});
	});
	onUnmounted(() => {
		if (channel) {
			channel.stopListening(".user.nearby");
			echo.leaveChannel(`App.Models.User.${userId.value}`);
			channel = null;
		}
	});
	return {
		lastNotification,
		notifications,
		dismiss,
		clearAll
	};
}
//#endregion
//#region resources/js/Pages/ArborisisMap/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: { auth: Object },
	setup(__props) {
		const props = __props;
		const points = ref([]);
		const loading = ref(false);
		const selectedPoint = ref(null);
		const drawerOpen = ref(false);
		const createMode = ref(false);
		const mapContainer = ref(null);
		const map = ref(null);
		const markersLayer = ref(null);
		const groupEventLayer = ref(null);
		const visitSuccessOpen = ref(false);
		const visitSuccessTitle = ref("");
		const createLat = ref(null);
		const createLng = ref(null);
		const tempMarker = ref(null);
		const presenceActive = ref(false);
		const presenceMode = ref("invisible");
		const flashMessage = ref("");
		const flashType = ref("error");
		const sidebarCollapsed = ref(typeof window !== "undefined" ? window.innerWidth < 768 : false);
		const selectedNearbyUser = ref(null);
		const nearbyDrawerOpen = ref(false);
		const proximityToast = ref(null);
		const selectedGroupEvent = ref(null);
		const groupEventDrawerOpen = ref(false);
		const groupEvents = ref([]);
		const myEventIds = ref(/* @__PURE__ */ new Set());
		const radarStyle = ref({
			left: "50%",
			top: "50%"
		});
		const currentUserId = computed(() => props.auth?.user?.id ?? null);
		const handleUserClick = (presence) => {
			selectedNearbyUser.value = presence;
			nearbyDrawerOpen.value = true;
		};
		const { presences: otherPresences, isConnected: presenceSocketConnected } = useMapPresence(map, currentUserId, { onUserClick: handleUserClick });
		const { lastNotification, dismiss: dismissNotification } = useNearbyNotifications(currentUserId);
		const setFlash = (message, type = "error") => {
			flashMessage.value = message;
			flashType.value = type;
			setTimeout(() => {
				flashMessage.value = "";
			}, 5e3);
		};
		const userLocationMarker = ref(null);
		const updateRadarPosition = () => {
			if (!map.value || !userLocationMarker.value) return;
			const point = map.value.latLngToContainerPoint(userLocationMarker.value.getLatLng());
			radarStyle.value = {
				left: `${point.x}px`,
				top: `${point.y}px`
			};
		};
		const userLocationWatchId = ref(null);
		const userLocationAccuracyCircle = ref(null);
		const presenceUpdateInterval = ref(null);
		const lastSentPosition = ref(null);
		const lastGpsAccuracy = ref(10);
		const categoryColors = {
			birds: "#FBBF24",
			forest: "#34D399",
			water: "#60A5FA",
			insects: "#A3E635",
			wind: "#C7D2FE",
			night_ambience: "#A78BFA",
			meeting_point: "#F472B6",
			quiet_spot: "#8FA68E",
			educational_zone: "#38BDF8",
			other: "#9CA3AF"
		};
		const getCategoryColor = (cat) => categoryColors[cat] || "#9CA3AF";
		const fetchPoints = async () => {
			loading.value = true;
			try {
				points.value = (await (await fetch("/api/<redacted>-points", { credentials: "same-origin" })).json()).features ?? [];
			} catch (e) {
				console.error("Failed to load points:", e);
				points.value = [];
			} finally {
				loading.value = false;
			}
		};
		const initMap = () => {
			if (!mapContainer.value) return;
			map.value = L.map(mapContainer.value, {
				zoomControl: false,
				attributionControl: false,
				scrollWheelZoom: window.innerWidth >= 768
			}).setView([46.603354, 1.888334], 5);
			L.control.zoom({ position: "bottomright" }).addTo(map.value);
			L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
				attribution: "&copy; CARTO",
				subdomains: "abcd",
				maxZoom: 19
			}).addTo(map.value);
			markersLayer.value = L.layerGroup().addTo(map.value);
			groupEventLayer.value = L.layerGroup().addTo(map.value);
			updateMarkers();
			map.value.on("click", handleMapClick);
			map.value.on("move", updateRadarPosition);
			map.value.on("zoom", updateRadarPosition);
			fetchGroupEvents();
		};
		const clearTempMarker = () => {
			if (tempMarker.value) {
				map.value?.removeLayer(tempMarker.value);
				tempMarker.value = null;
			}
			createLat.value = null;
			createLng.value = null;
		};
		const handleMapClick = (e) => {
			if (!map.value) return;
			if (!createMode.value) return;
			drawerOpen.value = true;
			selectedPoint.value = null;
			createLat.value = e.latlng.lat;
			createLng.value = e.latlng.lng;
			if (!tempMarker.value) {
				const tempIcon = L.divIcon({
					className: "temp-create-marker",
					html: `<div class="w-5 h-5 rounded-full bg-arbor-emerald border-2 border-white shadow-lg relative">
                <div class="absolute inset-0 rounded-full bg-arbor-emerald animate-ping opacity-50"></div>
            </div>`,
					iconSize: [20, 20],
					iconAnchor: [10, 10]
				});
				tempMarker.value = L.marker([e.latlng.lat, e.latlng.lng], {
					icon: tempIcon,
					draggable: true,
					zIndexOffset: 2e3
				}).addTo(map.value);
				tempMarker.value.on("dragend", (event) => {
					const latLng = event.target.getLatLng();
					createLat.value = latLng.lat;
					createLng.value = latLng.lng;
				});
			} else tempMarker.value.setLatLng([e.latlng.lat, e.latlng.lng]);
		};
		const updateMarkers = () => {
			if (!markersLayer.value || !map.value) return;
			markersLayer.value.clearLayers();
			points.value.forEach((point) => {
				const coords = point.geometry.coordinates;
				const p = point.properties;
				const color = getCategoryColor(p.category_value);
				const marker = L.circleMarker([coords[1], coords[0]], {
					radius: 8,
					fillColor: color,
					color,
					weight: 2,
					opacity: .8,
					fillOpacity: .4
				});
				marker.on("click", (e) => {
					e.originalEvent.stopPropagation();
					clearTempMarker();
					selectedPoint.value = {
						...p,
						latitude: coords[1],
						longitude: coords[0]
					};
					drawerOpen.value = true;
					createMode.value = false;
				});
				markersLayer.value.addLayer(marker);
			});
		};
		watch(points, updateMarkers, { deep: true });
		watch(drawerOpen, (open) => {
			if (!open) {
				createMode.value = false;
				clearTempMarker();
			}
		});
		const updateUserLocationMarker = (lat, lng, accuracy = 0) => {
			if (!map.value) return;
			if (!userLocationMarker.value) {
				const userIcon = L.divIcon({
					className: "user-location-marker",
					html: `<div class="w-4 h-4 rounded-full bg-arbor-emerald border-2 border-white shadow-lg shadow-arbor-emerald/50 relative">
                <div class="absolute inset-0 rounded-full bg-arbor-emerald animate-ping opacity-40"></div>
            </div>`,
					iconSize: [16, 16],
					iconAnchor: [8, 8]
				});
				userLocationMarker.value = L.marker([lat, lng], {
					icon: userIcon,
					zIndexOffset: 1e3
				}).addTo(map.value);
			} else userLocationMarker.value.setLatLng([lat, lng]);
			nextTick(updateRadarPosition);
			if (accuracy > 0) if (!userLocationAccuracyCircle.value) userLocationAccuracyCircle.value = L.circle([lat, lng], {
				radius: accuracy,
				fillColor: "#10B981",
				color: "#10B981",
				weight: 1,
				opacity: .3,
				fillOpacity: .1
			}).addTo(map.value);
			else {
				userLocationAccuracyCircle.value.setLatLng([lat, lng]);
				userLocationAccuracyCircle.value.setRadius(accuracy);
			}
		};
		const clearUserLocationMarker = () => {
			if (userLocationMarker.value) {
				map.value?.removeLayer(userLocationMarker.value);
				userLocationMarker.value = null;
			}
			if (userLocationAccuracyCircle.value) {
				map.value?.removeLayer(userLocationAccuracyCircle.value);
				userLocationAccuracyCircle.value = null;
			}
		};
		const sendPresenceUpdate = async (lat, lng) => {
			try {
				await fetch("/api/presence/update", {
					method: "POST",
					credentials: "same-origin",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.content
					},
					body: JSON.stringify({
						latitude: lat,
						longitude: lng,
						visibility_mode: presenceMode.value
					})
				});
			} catch (e) {
				console.error("Presence update failed:", e);
			}
		};
		const haversineDistance = (lat1, lng1, lat2, lng2) => {
			const R = 6371e3;
			const dLat = (lat2 - lat1) * Math.PI / 180;
			const dLng = (lng2 - lng1) * Math.PI / 180;
			const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
			return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		};
		const handleVisit = async () => {
			if (!selectedPoint.value?.slug) {
				setFlash("Point non valide pour la visite.", "error");
				return;
			}
			const sendVisit = (lat, lng, accuracy) => {
				fetch(`/api/<redacted>-points/${selectedPoint.value.slug}/visit`, {
					method: "POST",
					credentials: "same-origin",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.content,
						"Accept": "application/json"
					},
					body: JSON.stringify({
						latitude: lat,
						longitude: lng,
						accuracy,
						consent_given: true
					})
				}).then(async (response) => {
					const data = await response.json();
					if (response.ok) {
						visitSuccessTitle.value = selectedPoint.value.title;
						visitSuccessOpen.value = true;
						drawerOpen.value = false;
					} else if (response.status === 401) setFlash("Vous devez être connecté pour visiter un lieu.", "error");
					else setFlash(data.message || "Visite impossible", "error");
				}).catch((e) => {
					console.error("Visit error:", e);
					setFlash("Erreur lors de la visite", "error");
				});
			};
			const fallbackLat = selectedPoint.value.latitude;
			const fallbackLng = selectedPoint.value.longitude;
			const fallbackAccuracy = lastGpsAccuracy.value || 50;
			let hasResponded = false;
			const doVisit = (lat, lng, accuracy) => {
				if (hasResponded) return;
				hasResponded = true;
				sendVisit(lat, lng, accuracy);
			};
			if (navigator.geolocation) {
				const timeoutId = setTimeout(() => {
					doVisit(fallbackLat, fallbackLng, fallbackAccuracy);
				}, 6e3);
				navigator.geolocation.getCurrentPosition((pos) => {
					clearTimeout(timeoutId);
					doVisit(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy);
				}, (err) => {
					clearTimeout(timeoutId);
					console.warn("Geolocation error in visit:", err);
					doVisit(fallbackLat, fallbackLng, fallbackAccuracy);
				}, {
					enableHighAccuracy: true,
					timeout: 5e3,
					maximumAge: 6e4
				});
			} else doVisit(fallbackLat, fallbackLng, fallbackAccuracy);
		};
		const handleCreatePoint = async (formData) => {
			try {
				const response = await fetch("/api/<redacted>-points", {
					method: "POST",
					credentials: "same-origin",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.content,
						"Accept": "application/json"
					},
					body: JSON.stringify(formData)
				});
				const data = await response.json();
				if (response.ok) {
					createMode.value = false;
					drawerOpen.value = false;
					clearTempMarker();
					fetchPoints();
					setFlash(data.message || "Lieu proposé avec succès", "success");
				} else if (response.status === 401) setFlash("Vous devez être connecté pour proposer un lieu. Veuillez rafraîchir la page.", "error");
				else if (data.errors) setFlash(Object.values(data.errors).flat().join("\n"), "error");
				else if (data.message) setFlash(data.message, "error");
				else setFlash("Une erreur est survenue lors de la création.", "error");
			} catch (e) {
				console.error(e);
				setFlash("Erreur lors de la création", "error");
			}
		};
		const startCreateMode = () => {
			createMode.value = true;
			drawerOpen.value = true;
			selectedPoint.value = null;
			if (!createLat.value && !createLng.value && navigator.geolocation) navigator.geolocation.getCurrentPosition((pos) => {
				const lat = pos.coords.latitude;
				const lng = pos.coords.longitude;
				createLat.value = lat;
				createLng.value = lng;
				if (map.value) {
					const tempIcon = L.divIcon({
						className: "temp-create-marker",
						html: `<div class="w-5 h-5 rounded-full bg-arbor-emerald border-2 border-white shadow-lg relative">
                            <div class="absolute inset-0 rounded-full bg-arbor-emerald animate-ping opacity-50"></div>
                        </div>`,
						iconSize: [20, 20],
						iconAnchor: [10, 10]
					});
					if (!tempMarker.value) {
						tempMarker.value = L.marker([lat, lng], {
							icon: tempIcon,
							draggable: true,
							zIndexOffset: 2e3
						}).addTo(map.value);
						tempMarker.value.on("dragend", (event) => {
							const latLng = event.target.getLatLng();
							createLat.value = latLng.lat;
							createLng.value = latLng.lng;
						});
					} else tempMarker.value.setLatLng([lat, lng]);
				}
			}, () => {}, {
				enableHighAccuracy: true,
				timeout: 5e3
			});
		};
		const togglePresence = async () => {
			if (presenceActive.value) {
				if (userLocationWatchId.value !== null) {
					navigator.geolocation.clearWatch(userLocationWatchId.value);
					userLocationWatchId.value = null;
				}
				if (presenceUpdateInterval.value) {
					clearInterval(presenceUpdateInterval.value);
					presenceUpdateInterval.value = null;
				}
				await fetch("/api/presence", {
					method: "DELETE",
					credentials: "same-origin"
				});
				presenceActive.value = false;
				clearUserLocationMarker();
				lastSentPosition.value = null;
			} else {
				if (!navigator.geolocation) {
					console.warn("Géolocalisation non supportée par ce navigateur");
					return;
				}
				userLocationWatchId.value = navigator.geolocation.watchPosition((pos) => {
					const lat = pos.coords.latitude;
					const lng = pos.coords.longitude;
					const accuracy = pos.coords.accuracy;
					updateUserLocationMarker(lat, lng, accuracy);
					lastGpsAccuracy.value = accuracy;
					const isFirstUpdate = !lastSentPosition.value;
					const hasMovedSignificantly = lastSentPosition.value && haversineDistance(lastSentPosition.value.lat, lastSentPosition.value.lng, lat, lng) > 50;
					if (isFirstUpdate || hasMovedSignificantly) {
						sendPresenceUpdate(lat, lng);
						lastSentPosition.value = {
							lat,
							lng
						};
					}
					presenceActive.value = true;
				}, (err) => {
					console.error("Geolocation error:", err);
				}, {
					enableHighAccuracy: true,
					maximumAge: 1e4,
					timeout: 1e4
				});
				presenceUpdateInterval.value = setInterval(() => {
					if (userLocationMarker.value) {
						const latLng = userLocationMarker.value.getLatLng();
						sendPresenceUpdate(latLng.lat, latLng.lng);
						lastSentPosition.value = {
							lat: latLng.lat,
							lng: latLng.lng
						};
					}
				}, 3e4);
			}
		};
		watch(lastNotification, (notif) => {
			if (notif) {
				proximityToast.value = notif;
				setTimeout(() => {
					proximityToast.value = null;
				}, 8e3);
			}
		});
		const handleGreet = async () => {
			if (!selectedNearbyUser.value) return;
			try {
				const res = await fetch(`/api/nearby/greet/${selectedNearbyUser.value.user_id}`, {
					method: "POST",
					credentials: "same-origin",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.content
					}
				});
				setFlash((await res.json()).message, res.ok ? "success" : "error");
				if (res.ok) nearbyDrawerOpen.value = false;
			} catch (e) {
				setFlash("Erreur lors du salut", "error");
			}
		};
		const handleShare = () => {
			setFlash("Fonctionnalité de partage à venir en Phase 2+", "success");
		};
		const handleInvite = () => {
			setFlash("Fonctionnalité d'invitation à venir en Phase 3", "success");
		};
		const fetchGroupEvents = async () => {
			if (!map.value) return;
			const center = map.value.getCenter();
			try {
				const res = await fetch(`/api/group-events/nearby?lat=${center.lat}&lng=${center.lng}&radius=10`, { credentials: "same-origin" });
				if (!res.ok) return;
				groupEvents.value = (await res.json()).features ?? [];
			} catch (e) {
				console.error("Failed to fetch group events:", e);
			}
		};
		const renderGroupEvents = () => {
			if (!groupEventLayer.value || !map.value) return;
			groupEventLayer.value.clearLayers();
			const typeColors = {
				dawn_chorus: "#FBBF24",
				soundwalk: "#38BDF8",
				night_ambience: "#A78BFA",
				freestyle: "#34D399"
			};
			groupEvents.value.forEach((feature) => {
				const coords = feature.geometry.coordinates;
				const color = typeColors[feature.properties.event_type] || "#9CA3AF";
				const marker = L.circleMarker([coords[1], coords[0]], {
					radius: 10,
					fillColor: color,
					color,
					weight: 2,
					opacity: .9,
					fillOpacity: .25
				});
				marker.on("click", (e) => {
					e.originalEvent.stopPropagation();
					selectedGroupEvent.value = feature;
					groupEventDrawerOpen.value = true;
				});
				groupEventLayer.value.addLayer(marker);
			});
		};
		watch(groupEvents, renderGroupEvents, { deep: true });
		const handleJoinEvent = async () => {
			if (!selectedGroupEvent.value) return;
			try {
				const res = await fetch(`/api/group-events/${selectedGroupEvent.value.properties.id}/join`, {
					method: "POST",
					credentials: "same-origin",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.content
					}
				});
				setFlash((await res.json()).message, res.ok ? "success" : "error");
				if (res.ok) {
					myEventIds.value.add(selectedGroupEvent.value.properties.id);
					selectedGroupEvent.value.properties.participants_count += 1;
				}
			} catch (e) {
				setFlash("Erreur", "error");
			}
		};
		const handleLeaveEvent = async () => {
			if (!selectedGroupEvent.value) return;
			try {
				const res = await fetch(`/api/group-events/${selectedGroupEvent.value.properties.id}/leave`, {
					method: "POST",
					credentials: "same-origin",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.content
					}
				});
				setFlash((await res.json()).message, res.ok ? "success" : "error");
				if (res.ok) {
					myEventIds.value.delete(selectedGroupEvent.value.properties.id);
					selectedGroupEvent.value.properties.participants_count = Math.max(0, selectedGroupEvent.value.properties.participants_count - 1);
				}
			} catch (e) {
				setFlash("Erreur", "error");
			}
		};
		const handleCheckInEvent = async () => {
			if (!selectedGroupEvent.value) return;
			if (!navigator.geolocation) {
				setFlash("Géolocalisation non disponible", "error");
				return;
			}
			navigator.geolocation.getCurrentPosition(async (pos) => {
				try {
					const res = await fetch(`/api/group-events/${selectedGroupEvent.value.properties.id}/check-in`, {
						method: "POST",
						credentials: "same-origin",
						headers: {
							"Content-Type": "application/json",
							"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.content
						},
						body: JSON.stringify({
							latitude: pos.coords.latitude,
							longitude: pos.coords.longitude,
							accuracy: pos.coords.accuracy
						})
					});
					setFlash((await res.json()).message, res.ok ? "success" : "error");
				} catch (e) {
					setFlash("Erreur de check-in", "error");
				}
			}, () => setFlash("Impossible d'obtenir ta position", "error"), {
				enableHighAccuracy: true,
				timeout: 5e3
			});
		};
		onMounted(() => {
			fetchPoints();
			nextTick(() => initMap());
		});
		onUnmounted(() => {
			if (userLocationWatchId.value !== null) navigator.geolocation.clearWatch(userLocationWatchId.value);
			if (presenceUpdateInterval.value) clearInterval(presenceUpdateInterval.value);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Carte Arborisis" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$12, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative isolate h-[calc(100vh-4rem)] min-h-[600px] overflow-hidden"${_scopeId}><div class="w-full h-full"${_scopeId}></div>`);
						_push(ssrRenderComponent(MapRadar_default, {
							active: presenceActive.value,
							style: radarStyle.value
						}, null, _parent, _scopeId));
						if (flashMessage.value) _push(`<div class="${ssrRenderClass([flashType.value === "success" ? "bg-arbor-emerald/20 border border-arbor-emerald/30 text-arbor-emerald" : "bg-red-500/20 border border-red-500/30 text-red-400", "absolute top-4 left-1/2 -translate-x-1/2 z-toast px-4 py-3 rounded-xl shadow-lg max-w-sm w-[calc(100%-2rem)] text-sm text-center pointer-events-auto"])}"${_scopeId}>${ssrInterpolate(flashMessage.value)}</div>`);
						else _push(`<!---->`);
						_push(`<div class="absolute top-6 left-1/2 -translate-x-1/2 z-map text-center pointer-events-none"${_scopeId}><h1 class="font-display text-3xl font-semibold text-arbor-cream tracking-tight drop-shadow-lg"${_scopeId}> Carte Arborisis </h1><p class="text-arbor-sage/80 text-sm mt-1 font-light drop-shadow"${_scopeId}> Découvre les échos naturels autour de toi </p></div><div class="absolute top-4 left-4 z-map max-w-[calc(100vw-2rem)]"${_scopeId}>`);
						if (sidebarCollapsed.value) {
							_push(`<button class="glass-card shadow-2xl shadow-black/25 p-3 flex items-center gap-2 text-arbor-cream hover:text-white transition-colors"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"${_scopeId}></path></svg><span class="text-xs font-medium"${_scopeId}>Menu</span>`);
							if (presenceActive.value) _push(`<span class="w-2 h-2 rounded-full bg-arbor-emerald animate-pulse"${_scopeId}></span>`);
							else _push(`<!---->`);
							_push(`</button>`);
						} else _push(`<!---->`);
						if (!sidebarCollapsed.value) {
							_push(`<div class="glass-card shadow-2xl shadow-black/25 p-4 space-y-4 w-80"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-xs font-semibold text-arbor-sage/50 uppercase tracking-wider"${_scopeId}>Menu</span><button class="text-arbor-sage/40 hover:text-arbor-cream transition-colors"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"${_scopeId}></path></svg></button></div><button class="w-full py-2.5 rounded-xl bg-arbor-emerald text-arbor-night font-semibold text-sm hover:bg-arbor-emerald/90 transition-colors flex items-center justify-center gap-2"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Proposer un lieu </button><div class="pt-3 border-t border-white/10"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$5, {
								"is-active": presenceActive.value,
								mode: presenceMode.value,
								onToggle: togglePresence
							}, null, _parent, _scopeId));
							if (presenceActive.value) {
								_push(`<div class="mt-3"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$4, {
									modelValue: presenceMode.value,
									"onUpdate:modelValue": ($event) => presenceMode.value = $event
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`</div><div class="pt-3 border-t border-white/10 text-xs text-arbor-sage/60"${_scopeId}><p${_scopeId}>${ssrInterpolate(points.value.length)} point${ssrInterpolate(points.value.length > 1 ? "s" : "")} sur la carte</p>`);
							if (unref(otherPresences).size > 0) _push(`<p class="mt-1"${_scopeId}>${ssrInterpolate(unref(otherPresences).size)} enregistreur${ssrInterpolate(unref(otherPresences).size > 1 ? "s" : "")} à proximité </p>`);
							else _push(`<!---->`);
							_push(`</div></div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
						_push(ssrRenderComponent(_sfc_main$9, {
							point: selectedPoint.value,
							"is-open": drawerOpen.value && !createMode.value,
							onClose: ($event) => drawerOpen.value = false,
							onVisit: handleVisit
						}, null, _parent, _scopeId));
						if (drawerOpen.value && createMode.value) {
							_push(`<div class="absolute top-4 right-4 bottom-4 w-80 max-w-[calc(100vw-2rem)] z-map bg-arbor-night/95 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-5"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h2 class="text-lg font-semibold text-arbor-cream"${_scopeId}>Proposer un lieu</h2><button class="text-arbor-sage/50 hover:text-arbor-cream"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><div class="flex-1 overflow-y-auto"${_scopeId}>`);
							if (createLat.value == null || createLng.value == null) _push(`<div class="mb-4 rounded-xl bg-arbor-emerald/10 border border-arbor-emerald/20 px-3 py-2.5 text-center"${_scopeId}><p class="text-xs text-arbor-emerald font-medium"${_scopeId}> 👆 Cliquez sur la carte pour positionner votre point </p></div>`);
							else _push(`<!---->`);
							_push(ssrRenderComponent(_sfc_main$8, {
								"initial-lat": createLat.value,
								"initial-lng": createLng.value,
								onSubmit: handleCreatePoint,
								onCancel: ($event) => drawerOpen.value = false
							}, null, _parent, _scopeId));
							_push(`</div></div>`);
						} else _push(`<!---->`);
						if (proximityToast.value) _push(`<div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-toast px-5 py-3 rounded-2xl shadow-2xl max-w-sm w-[calc(100%-2rem)] text-sm pointer-events-auto bg-arbor-night/95 backdrop-blur-xl border border-arbor-emerald/20"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><div class="w-8 h-8 rounded-full bg-arbor-emerald/20 flex items-center justify-center shrink-0 mt-0.5"${_scopeId}><svg class="w-4 h-4 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg></div><div class="flex-1"${_scopeId}><p class="text-arbor-cream font-medium"${_scopeId}>${ssrInterpolate(proximityToast.value.initiatorName)} est à ${ssrInterpolate(proximityToast.value.distanceMeters)}m </p><p class="text-xs text-arbor-sage/60 mt-0.5"${_scopeId}> Un enregistreur est tout près — peut-être une belle rencontre ? </p></div><button class="text-arbor-sage/40 hover:text-arbor-cream shrink-0"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div></div>`);
						else _push(`<!---->`);
						_push(ssrRenderComponent(_sfc_main$2, {
							"is-open": nearbyDrawerOpen.value,
							user: selectedNearbyUser.value,
							distance: selectedNearbyUser.value ? haversineDistance(userLocationMarker.value?.getLatLng()?.lat ?? 0, userLocationMarker.value?.getLatLng()?.lng ?? 0, selectedNearbyUser.value.latitude, selectedNearbyUser.value.longitude) : null,
							onClose: ($event) => nearbyDrawerOpen.value = false,
							onGreet: handleGreet,
							onShare: handleShare,
							onInvite: handleInvite
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$1, {
							"is-open": groupEventDrawerOpen.value,
							event: selectedGroupEvent.value?.properties,
							"is-participant": selectedGroupEvent.value ? myEventIds.value.has(selectedGroupEvent.value.properties.id) : false,
							"can-check-in": false,
							onClose: ($event) => groupEventDrawerOpen.value = false,
							onJoin: handleJoinEvent,
							onLeave: handleLeaveEvent,
							onCheckIn: handleCheckInEvent
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$6, {
							"is-open": visitSuccessOpen.value,
							"point-title": visitSuccessTitle.value,
							"xp-gained": 10,
							onClose: ($event) => visitSuccessOpen.value = false
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "relative isolate h-[calc(100vh-4rem)] min-h-[600px] overflow-hidden" }, [
						createVNode("div", {
							ref_key: "mapContainer",
							ref: mapContainer,
							class: "w-full h-full"
						}, null, 512),
						createVNode(MapRadar_default, {
							active: presenceActive.value,
							style: radarStyle.value
						}, null, 8, ["active", "style"]),
						createVNode(Transition, {
							"enter-active-class": "transition ease-out duration-300",
							"enter-from-class": "-translate-y-4 opacity-0",
							"enter-to-class": "translate-y-0 opacity-100",
							"leave-active-class": "transition ease-in duration-200",
							"leave-from-class": "translate-y-0 opacity-100",
							"leave-to-class": "-translate-y-4 opacity-0"
						}, {
							default: withCtx(() => [flashMessage.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: ["absolute top-4 left-1/2 -translate-x-1/2 z-toast px-4 py-3 rounded-xl shadow-lg max-w-sm w-[calc(100%-2rem)] text-sm text-center pointer-events-auto", flashType.value === "success" ? "bg-arbor-emerald/20 border border-arbor-emerald/30 text-arbor-emerald" : "bg-red-500/20 border border-red-500/30 text-red-400"]
							}, toDisplayString(flashMessage.value), 3)) : createCommentVNode("", true)]),
							_: 1
						}),
						createVNode("div", { class: "absolute top-6 left-1/2 -translate-x-1/2 z-map text-center pointer-events-none" }, [createVNode("h1", { class: "font-display text-3xl font-semibold text-arbor-cream tracking-tight drop-shadow-lg" }, " Carte Arborisis "), createVNode("p", { class: "text-arbor-sage/80 text-sm mt-1 font-light drop-shadow" }, " Découvre les échos naturels autour de toi ")]),
						createVNode("div", { class: "absolute top-4 left-4 z-map max-w-[calc(100vw-2rem)]" }, [createVNode(Transition, {
							"enter-active-class": "transition ease-out duration-200",
							"enter-from-class": "-translate-x-2 opacity-0",
							"enter-to-class": "translate-x-0 opacity-100",
							"leave-active-class": "transition ease-in duration-150",
							"leave-from-class": "translate-x-0 opacity-100",
							"leave-to-class": "-translate-x-2 opacity-0"
						}, {
							default: withCtx(() => [sidebarCollapsed.value ? (openBlock(), createBlock("button", {
								key: 0,
								onClick: ($event) => sidebarCollapsed.value = false,
								class: "glass-card shadow-2xl shadow-black/25 p-3 flex items-center gap-2 text-arbor-cream hover:text-white transition-colors"
							}, [
								(openBlock(), createBlock("svg", {
									class: "w-5 h-5",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M4 6h16M4 12h16M4 18h16"
								})])),
								createVNode("span", { class: "text-xs font-medium" }, "Menu"),
								presenceActive.value ? (openBlock(), createBlock("span", {
									key: 0,
									class: "w-2 h-2 rounded-full bg-arbor-emerald animate-pulse"
								})) : createCommentVNode("", true)
							], 8, ["onClick"])) : createCommentVNode("", true)]),
							_: 1
						}), createVNode(Transition, {
							"enter-active-class": "transition ease-out duration-200",
							"enter-from-class": "-translate-x-2 opacity-0",
							"enter-to-class": "translate-x-0 opacity-100",
							"leave-active-class": "transition ease-in duration-150",
							"leave-from-class": "translate-x-0 opacity-100",
							"leave-to-class": "-translate-x-2 opacity-0"
						}, {
							default: withCtx(() => [!sidebarCollapsed.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "glass-card shadow-2xl shadow-black/25 p-4 space-y-4 w-80"
							}, [
								createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-xs font-semibold text-arbor-sage/50 uppercase tracking-wider" }, "Menu"), createVNode("button", {
									onClick: ($event) => sidebarCollapsed.value = true,
									class: "text-arbor-sage/40 hover:text-arbor-cream transition-colors"
								}, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M11 19l-7-7 7-7m8 14l-7-7 7-7"
								})]))], 8, ["onClick"])]),
								createVNode("button", {
									onClick: startCreateMode,
									class: "w-full py-2.5 rounded-xl bg-arbor-emerald text-arbor-night font-semibold text-sm hover:bg-arbor-emerald/90 transition-colors flex items-center justify-center gap-2"
								}, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M12 4v16m8-8H4"
								})])), createTextVNode(" Proposer un lieu ")]),
								createVNode("div", { class: "pt-3 border-t border-white/10" }, [createVNode(_sfc_main$5, {
									"is-active": presenceActive.value,
									mode: presenceMode.value,
									onToggle: togglePresence
								}, null, 8, ["is-active", "mode"]), presenceActive.value ? (openBlock(), createBlock("div", {
									key: 0,
									class: "mt-3"
								}, [createVNode(_sfc_main$4, {
									modelValue: presenceMode.value,
									"onUpdate:modelValue": ($event) => presenceMode.value = $event
								}, null, 8, ["modelValue", "onUpdate:modelValue"])])) : createCommentVNode("", true)]),
								createVNode("div", { class: "pt-3 border-t border-white/10 text-xs text-arbor-sage/60" }, [createVNode("p", null, toDisplayString(points.value.length) + " point" + toDisplayString(points.value.length > 1 ? "s" : "") + " sur la carte", 1), unref(otherPresences).size > 0 ? (openBlock(), createBlock("p", {
									key: 0,
									class: "mt-1"
								}, toDisplayString(unref(otherPresences).size) + " enregistreur" + toDisplayString(unref(otherPresences).size > 1 ? "s" : "") + " à proximité ", 1)) : createCommentVNode("", true)])
							])) : createCommentVNode("", true)]),
							_: 1
						})]),
						createVNode(_sfc_main$9, {
							point: selectedPoint.value,
							"is-open": drawerOpen.value && !createMode.value,
							onClose: ($event) => drawerOpen.value = false,
							onVisit: handleVisit
						}, null, 8, [
							"point",
							"is-open",
							"onClose"
						]),
						createVNode(Transition, {
							"enter-active-class": "transition ease-out duration-300",
							"enter-from-class": "translate-x-full opacity-0",
							"enter-to-class": "translate-x-0 opacity-100",
							"leave-active-class": "transition ease-in duration-200",
							"leave-from-class": "translate-x-0 opacity-100",
							"leave-to-class": "translate-x-full opacity-0"
						}, {
							default: withCtx(() => [drawerOpen.value && createMode.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "absolute top-4 right-4 bottom-4 w-80 max-w-[calc(100vw-2rem)] z-map bg-arbor-night/95 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-5"
							}, [createVNode("div", { class: "flex items-center justify-between mb-4" }, [createVNode("h2", { class: "text-lg font-semibold text-arbor-cream" }, "Proposer un lieu"), createVNode("button", {
								onClick: ($event) => drawerOpen.value = false,
								class: "text-arbor-sage/50 hover:text-arbor-cream"
							}, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M6 18L18 6M6 6l12 12"
							})]))], 8, ["onClick"])]), createVNode("div", { class: "flex-1 overflow-y-auto" }, [createLat.value == null || createLng.value == null ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mb-4 rounded-xl bg-arbor-emerald/10 border border-arbor-emerald/20 px-3 py-2.5 text-center"
							}, [createVNode("p", { class: "text-xs text-arbor-emerald font-medium" }, " 👆 Cliquez sur la carte pour positionner votre point ")])) : createCommentVNode("", true), createVNode(_sfc_main$8, {
								"initial-lat": createLat.value,
								"initial-lng": createLng.value,
								onSubmit: handleCreatePoint,
								onCancel: ($event) => drawerOpen.value = false
							}, null, 8, [
								"initial-lat",
								"initial-lng",
								"onCancel"
							])])])) : createCommentVNode("", true)]),
							_: 1
						}),
						createVNode(Transition, {
							"enter-active-class": "transition ease-out duration-500",
							"enter-from-class": "translate-y-4 opacity-0",
							"enter-to-class": "translate-y-0 opacity-100",
							"leave-active-class": "transition ease-in duration-300",
							"leave-from-class": "translate-y-0 opacity-100",
							"leave-to-class": "translate-y-4 opacity-0"
						}, {
							default: withCtx(() => [proximityToast.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "absolute bottom-6 left-1/2 -translate-x-1/2 z-toast px-5 py-3 rounded-2xl shadow-2xl max-w-sm w-[calc(100%-2rem)] text-sm pointer-events-auto bg-arbor-night/95 backdrop-blur-xl border border-arbor-emerald/20"
							}, [createVNode("div", { class: "flex items-start gap-3" }, [
								createVNode("div", { class: "w-8 h-8 rounded-full bg-arbor-emerald/20 flex items-center justify-center shrink-0 mt-0.5" }, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4 text-arbor-emerald",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M13 10V3L4 14h7v7l9-11h-7z"
								})]))]),
								createVNode("div", { class: "flex-1" }, [createVNode("p", { class: "text-arbor-cream font-medium" }, toDisplayString(proximityToast.value.initiatorName) + " est à " + toDisplayString(proximityToast.value.distanceMeters) + "m ", 1), createVNode("p", { class: "text-xs text-arbor-sage/60 mt-0.5" }, " Un enregistreur est tout près — peut-être une belle rencontre ? ")]),
								createVNode("button", {
									onClick: ($event) => proximityToast.value = null,
									class: "text-arbor-sage/40 hover:text-arbor-cream shrink-0"
								}, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M6 18L18 6M6 6l12 12"
								})]))], 8, ["onClick"])
							])])) : createCommentVNode("", true)]),
							_: 1
						}),
						createVNode(_sfc_main$2, {
							"is-open": nearbyDrawerOpen.value,
							user: selectedNearbyUser.value,
							distance: selectedNearbyUser.value ? haversineDistance(userLocationMarker.value?.getLatLng()?.lat ?? 0, userLocationMarker.value?.getLatLng()?.lng ?? 0, selectedNearbyUser.value.latitude, selectedNearbyUser.value.longitude) : null,
							onClose: ($event) => nearbyDrawerOpen.value = false,
							onGreet: handleGreet,
							onShare: handleShare,
							onInvite: handleInvite
						}, null, 8, [
							"is-open",
							"user",
							"distance",
							"onClose"
						]),
						createVNode(_sfc_main$1, {
							"is-open": groupEventDrawerOpen.value,
							event: selectedGroupEvent.value?.properties,
							"is-participant": selectedGroupEvent.value ? myEventIds.value.has(selectedGroupEvent.value.properties.id) : false,
							"can-check-in": false,
							onClose: ($event) => groupEventDrawerOpen.value = false,
							onJoin: handleJoinEvent,
							onLeave: handleLeaveEvent,
							onCheckIn: handleCheckInEvent
						}, null, 8, [
							"is-open",
							"event",
							"is-participant",
							"onClose"
						]),
						createVNode(_sfc_main$6, {
							"is-open": visitSuccessOpen.value,
							"point-title": visitSuccessTitle.value,
							"xp-gained": 10,
							onClose: ($event) => visitSuccessOpen.value = false
						}, null, 8, [
							"is-open",
							"point-title",
							"onClose"
						])
					])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ArborisisMap/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

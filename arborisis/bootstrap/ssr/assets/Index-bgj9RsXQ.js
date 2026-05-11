/* empty css                 */
import { t as _sfc_main$9 } from "./AuthenticatedLayout-D7T5e9JB.js";
import { Head } from "@inertiajs/vue3";
import { Transition, computed, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, nextTick, onMounted, onUnmounted, openBlock, ref, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import L from "leaflet";
//#region resources/js/Components/Gamification/SensitivityWarning.vue
var _sfc_main$8 = {
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
var _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/SensitivityWarning.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/ModerationInfoBox.vue
var _sfc_main$7 = {
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
var _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/ModerationInfoBox.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/PointDetailDrawer.vue
var _sfc_main$6 = {
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
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute top-4 right-4 bottom-4 w-80 z-[800] bg-arbor-night/95 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col" }, _attrs))}><div class="relative h-40 shrink-0">`);
				if (__props.point.cover_image) _push(`<div class="absolute inset-0 bg-cover bg-center" style="${ssrRenderStyle({ backgroundImage: `url(${__props.point.cover_image})` })}"></div>`);
				else _push(`<div class="absolute inset-0 flex items-center justify-center" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${categoryColor.value}15, ${categoryColor.value}05)` })}"><svg class="w-16 h-16 opacity-20" style="${ssrRenderStyle({ color: categoryColor.value })}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>`);
				_push(`<div class="absolute inset-0 bg-gradient-to-t from-arbor-night via-arbor-night/40 to-transparent"></div><button class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="absolute bottom-3 left-4 right-4"><span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider" style="${ssrRenderStyle({
					background: categoryColor.value + "20",
					color: categoryColor.value,
					border: "1px solid " + categoryColor.value + "30"
				})}">${ssrInterpolate(categoryLabel.value)}</span><h2 class="text-lg font-semibold text-arbor-cream mt-1.5 leading-tight">${ssrInterpolate(__props.point.title)}</h2></div></div><div class="flex-1 overflow-y-auto p-4 space-y-4">`);
				_push(ssrRenderComponent(_sfc_main$8, {
					level: __props.point.nature_sensitivity_level,
					"warning-text": __props.point.nature_sensitivity_warning
				}, null, _parent));
				if (__props.point.moderation_status !== "approved") _push(ssrRenderComponent(_sfc_main$7, { status: __props.point.moderation_status }, null, _parent));
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
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/PointDetailDrawer.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/CreateArborisisPointForm.vue
var _sfc_main$5 = {
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
			_push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-5" }, _attrs))}><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Titre du lieu</label><input${ssrRenderAttr("value", form.value.title)} type="text" required minlength="3" maxlength="255" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-arbor-cream placeholder:text-white/20 focus:outline-none focus:border-arbor-emerald/50 focus:ring-1 focus:ring-arbor-emerald/20 transition-colors" placeholder="Ex: Clairière aux chouettes">`);
			if (errors.value.title) _push(`<p class="text-xs text-rose-400 mt-1">${ssrInterpolate(errors.value.title[0])}</p>`);
			else _push(`<!---->`);
			_push(`</div><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Description</label><textarea rows="3" maxlength="5000" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-arbor-cream placeholder:text-white/20 focus:outline-none focus:border-arbor-emerald/50 focus:ring-1 focus:ring-arbor-emerald/20 transition-colors resize-none" placeholder="Décrivez ce lieu, ce qu&#39;on y entend, comment y accéder...">${ssrInterpolate(form.value.description)}</textarea></div><div class="grid grid-cols-2 gap-3"><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Latitude</label><input${ssrRenderAttr("value", form.value.latitude)} type="number" step="any" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-arbor-cream focus:outline-none focus:border-arbor-emerald/50 transition-colors"></div><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Longitude</label><input${ssrRenderAttr("value", form.value.longitude)} type="number" step="any" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-arbor-cream focus:outline-none focus:border-arbor-emerald/50 transition-colors"></div></div>`);
			if (form.value.latitude === "" && form.value.longitude === "") {
				_push(`<div class="flex flex-col gap-2 mt-1"><button type="button" class="text-xs text-arbor-emerald hover:text-arbor-emerald/80 underline underline-offset-2 text-left"> 📍 Utiliser ma position actuelle </button>`);
				if (locationError.value) _push(`<p class="text-[11px] text-amber-300/80">${ssrInterpolate(locationError.value)}</p>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`<div class="grid grid-cols-2 gap-3"><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Catégorie</label><select required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-arbor-cream focus:outline-none focus:border-arbor-emerald/50 transition-colors appearance-none"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(form.value.category) ? ssrLooseContain(form.value.category, "") : ssrLooseEqual(form.value.category, "")) ? " selected" : ""}>Choisir...</option><!--[-->`);
			ssrRenderList(categories, (cat) => {
				_push(`<option${ssrRenderAttr("value", cat.value)}${ssrIncludeBooleanAttr(Array.isArray(form.value.category) ? ssrLooseContain(form.value.category, cat.value) : ssrLooseEqual(form.value.category, cat.value)) ? " selected" : ""}>${ssrInterpolate(cat.label)}</option>`);
			});
			_push(`<!--]--></select></div><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Difficulté (1-5)</label><input${ssrRenderAttr("value", form.value.difficulty_level)} type="number" min="1" max="5" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-arbor-cream focus:outline-none focus:border-arbor-emerald/50 transition-colors"></div></div><div><label class="block text-xs font-medium text-arbor-sage/70 mb-1.5">Niveau de sensibilité naturelle</label><select class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-arbor-cream focus:outline-none focus:border-arbor-emerald/50 transition-colors appearance-none"><!--[-->`);
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
			_push(`<!--]--></div><div class="flex gap-2"><input${ssrRenderAttr("value", tagInput.value)} type="text" maxlength="50" class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-arbor-cream placeholder:text-white/20 focus:outline-none focus:border-arbor-emerald/50 transition-colors" placeholder="Ajouter un tag..."><button type="button" class="px-3 py-2 rounded-xl bg-white/5 text-arbor-sage text-xs hover:bg-white/10 transition-colors"> + Ajouter </button></div></div><div class="pt-2 flex gap-3"><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="flex-1 py-2.5 rounded-xl bg-arbor-emerald text-arbor-night font-semibold text-sm hover:bg-arbor-emerald/90 transition-colors disabled:opacity-50">${ssrInterpolate(isSubmitting.value ? "Envoi..." : "Proposer ce lieu")}</button><button type="button" class="px-5 py-2.5 rounded-xl bg-white/5 text-arbor-sage text-sm hover:bg-white/10 transition-colors"> Annuler </button></div></form>`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/CreateArborisisPointForm.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/VisitButton.vue
var _sfc_main$4 = {
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
				class: ["w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2", [isDisabled.value ? "bg-white/5 text-arbor-sage/40 cursor-not-allowed" : "bg-arbor-emerald text-arbor-night hover:bg-arbor-emerald/90 hover:scale-[1.02] active:scale-[0.98]"]]
			}, _attrs))}>`);
			if (isLoading.value) _push(`<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
			else _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`);
			_push(` ${ssrInterpolate(buttonText.value)}</button>`);
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/VisitButton.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/VisitSuccessModal.vue
var _sfc_main$3 = {
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
			if (__props.isOpen) _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center p-4" }, _attrs))}><div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div><div class="relative bg-arbor-night border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"><div class="w-16 h-16 mx-auto mb-4 rounded-full bg-arbor-emerald/10 flex items-center justify-center"><svg class="w-8 h-8 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><h3 class="text-lg font-semibold text-arbor-cream mb-1"> Visite enregistrée </h3><p class="text-sm text-arbor-sage/70 mb-4"> Tu as découvert un nouvel écho naturel. </p><div class="bg-white/5 rounded-xl p-4 mb-6"><p class="text-xs text-arbor-sage/50 mb-1">Lieu visité</p><p class="text-sm font-medium text-arbor-cream">${ssrInterpolate(__props.pointTitle)}</p></div><div class="flex items-center justify-center gap-2 mb-6"><span class="text-xs text-arbor-sage/50">+</span><span class="text-2xl font-bold text-arbor-emerald">${ssrInterpolate(__props.xpGained)}</span><span class="text-xs text-arbor-sage/50">XP</span></div><button class="w-full py-2.5 rounded-xl bg-arbor-emerald text-arbor-night font-semibold text-sm hover:bg-arbor-emerald/90 transition-colors"> Continuer l&#39;exploration </button></div></div>`);
			else _push(`<!---->`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/VisitSuccessModal.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/PresenceToggle.vue
var _sfc_main$2 = {
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
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/PresenceToggle.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Gamification/PrivacyModeSelector.vue
var _sfc_main$1 = {
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
				_push(`<button class="${ssrRenderClass([__props.modelValue === mode.value ? "border-arbor-emerald/40 bg-arbor-emerald/5" : "border-white/5 bg-white/5 hover:bg-white/10", "w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left"])}"><div class="${ssrRenderClass([__props.modelValue === mode.value ? "border-arbor-emerald" : "border-white/20", "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"])}">`);
				if (__props.modelValue === mode.value) _push(`<div class="w-2 h-2 rounded-full bg-arbor-emerald"></div>`);
				else _push(`<!---->`);
				_push(`</div><div><p class="text-sm text-arbor-cream">${ssrInterpolate(mode.label)}</p><p class="text-[11px] text-arbor-sage/50">${ssrInterpolate(mode.desc)}</p></div></button>`);
			});
			_push(`<!--]--></div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Gamification/PrivacyModeSelector.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/ArborisisMap/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: { auth: Object },
	setup(__props) {
		const points = ref([]);
		const loading = ref(false);
		const selectedPoint = ref(null);
		const drawerOpen = ref(false);
		const createMode = ref(false);
		const mapContainer = ref(null);
		const map = ref(null);
		const markersLayer = ref(null);
		const visitSuccessOpen = ref(false);
		const visitSuccessTitle = ref("");
		const createLat = ref(null);
		const createLng = ref(null);
		const tempMarker = ref(null);
		const presenceActive = ref(false);
		const presenceMode = ref("invisible");
		const userLocationMarker = ref(null);
		const userLocationWatchId = ref(null);
		const userLocationAccuracyCircle = ref(null);
		const presenceUpdateInterval = ref(null);
		const lastSentPosition = ref(null);
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
				attributionControl: false
			}).setView([46.603354, 1.888334], 5);
			L.control.zoom({ position: "bottomright" }).addTo(map.value);
			L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
				attribution: "&copy; CARTO",
				subdomains: "abcd",
				maxZoom: 19
			}).addTo(map.value);
			markersLayer.value = L.layerGroup().addTo(map.value);
			updateMarkers();
			map.value.on("click", handleMapClick);
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
			createMode.value = true;
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
		const handleVisit = async () => {
			if (!selectedPoint.value) return;
			try {
				const response = await fetch(`/api/<redacted>-points/${selectedPoint.value.slug}/visit`, {
					method: "POST",
					credentials: "same-origin",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.content,
						"Accept": "application/json"
					},
					body: JSON.stringify({
						latitude: selectedPoint.value.latitude,
						longitude: selectedPoint.value.longitude,
						accuracy: 10,
						consent_given: true
					})
				});
				const data = await response.json();
				if (response.ok) {
					visitSuccessTitle.value = selectedPoint.value.title;
					visitSuccessOpen.value = true;
					drawerOpen.value = false;
				} else if (response.status === 401) alert("Vous devez être connecté pour visiter un lieu.");
				else alert(data.message || "Visite impossible");
			} catch (e) {
				console.error(e);
				alert("Erreur lors de la visite");
			}
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
					alert(data.message);
				} else if (response.status === 401) alert("Vous devez être connecté pour proposer un lieu. Veuillez rafraîchir la page.");
				else if (data.errors) alert(Object.values(data.errors).flat().join("\n"));
				else if (data.message) alert(data.message);
				else alert("Une erreur est survenue lors de la création.");
			} catch (e) {
				console.error(e);
				alert("Erreur lors de la création");
			}
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
					if (!lastSentPosition.value) {
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
			_push(ssrRenderComponent(_sfc_main$9, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative isolate h-[calc(100vh-4rem)] min-h-[600px] overflow-hidden"${_scopeId}><div class="w-full h-full"${_scopeId}></div><div class="absolute top-6 left-1/2 -translate-x-1/2 z-[800] text-center pointer-events-none"${_scopeId}><h1 class="font-display text-3xl font-semibold text-arbor-cream tracking-tight drop-shadow-lg"${_scopeId}> Carte Arborisis </h1><p class="text-arbor-sage/80 text-sm mt-1 font-light drop-shadow"${_scopeId}> Découvre les échos naturels autour de toi </p></div><div class="absolute top-4 left-4 z-[800] w-80 max-w-[calc(100vw-2rem)]"${_scopeId}><div class="glass-card shadow-2xl shadow-black/25 p-4 space-y-4"${_scopeId}><button class="w-full py-2.5 rounded-xl bg-arbor-emerald text-arbor-night font-semibold text-sm hover:bg-arbor-emerald/90 transition-colors flex items-center justify-center gap-2"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Proposer un lieu </button><div class="pt-3 border-t border-white/10"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
							"is-active": presenceActive.value,
							mode: presenceMode.value,
							onToggle: togglePresence
						}, null, _parent, _scopeId));
						if (presenceActive.value) {
							_push(`<div class="mt-3"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$1, {
								modelValue: presenceMode.value,
								"onUpdate:modelValue": ($event) => presenceMode.value = $event
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</div><div class="pt-3 border-t border-white/10 text-xs text-arbor-sage/60"${_scopeId}><p${_scopeId}>${ssrInterpolate(points.value.length)} point${ssrInterpolate(points.value.length > 1 ? "s" : "")} sur la carte</p></div></div></div>`);
						_push(ssrRenderComponent(_sfc_main$6, {
							point: selectedPoint.value,
							"is-open": drawerOpen.value && !createMode.value,
							onClose: ($event) => drawerOpen.value = false,
							onVisit: handleVisit
						}, null, _parent, _scopeId));
						if (drawerOpen.value && createMode.value) {
							_push(`<div class="absolute top-4 right-4 bottom-4 w-80 max-w-[calc(100vw-2rem)] z-[800] bg-arbor-night/95 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-5"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h2 class="text-lg font-semibold text-arbor-cream"${_scopeId}>Proposer un lieu</h2><button class="text-arbor-sage/50 hover:text-arbor-cream"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><div class="flex-1 overflow-y-auto"${_scopeId}>`);
							if (createLat.value == null || createLng.value == null) _push(`<div class="mb-4 rounded-xl bg-arbor-emerald/10 border border-arbor-emerald/20 px-3 py-2.5 text-center"${_scopeId}><p class="text-xs text-arbor-emerald font-medium"${_scopeId}> 👆 Cliquez sur la carte pour positionner votre point </p></div>`);
							else _push(`<!---->`);
							_push(ssrRenderComponent(_sfc_main$5, {
								"initial-lat": createLat.value,
								"initial-lng": createLng.value,
								onSubmit: handleCreatePoint,
								onCancel: ($event) => drawerOpen.value = false
							}, null, _parent, _scopeId));
							_push(`</div></div>`);
						} else _push(`<!---->`);
						_push(ssrRenderComponent(_sfc_main$3, {
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
						createVNode("div", { class: "absolute top-6 left-1/2 -translate-x-1/2 z-[800] text-center pointer-events-none" }, [createVNode("h1", { class: "font-display text-3xl font-semibold text-arbor-cream tracking-tight drop-shadow-lg" }, " Carte Arborisis "), createVNode("p", { class: "text-arbor-sage/80 text-sm mt-1 font-light drop-shadow" }, " Découvre les échos naturels autour de toi ")]),
						createVNode("div", { class: "absolute top-4 left-4 z-[800] w-80 max-w-[calc(100vw-2rem)]" }, [createVNode("div", { class: "glass-card shadow-2xl shadow-black/25 p-4 space-y-4" }, [
							createVNode("button", {
								onClick: ($event) => {
									createMode.value = true;
									drawerOpen.value = true;
									selectedPoint.value = null;
								},
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
							})])), createTextVNode(" Proposer un lieu ")], 8, ["onClick"]),
							createVNode("div", { class: "pt-3 border-t border-white/10" }, [createVNode(_sfc_main$2, {
								"is-active": presenceActive.value,
								mode: presenceMode.value,
								onToggle: togglePresence
							}, null, 8, ["is-active", "mode"]), presenceActive.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mt-3"
							}, [createVNode(_sfc_main$1, {
								modelValue: presenceMode.value,
								"onUpdate:modelValue": ($event) => presenceMode.value = $event
							}, null, 8, ["modelValue", "onUpdate:modelValue"])])) : createCommentVNode("", true)]),
							createVNode("div", { class: "pt-3 border-t border-white/10 text-xs text-arbor-sage/60" }, [createVNode("p", null, toDisplayString(points.value.length) + " point" + toDisplayString(points.value.length > 1 ? "s" : "") + " sur la carte", 1)])
						])]),
						createVNode(_sfc_main$6, {
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
								class: "absolute top-4 right-4 bottom-4 w-80 max-w-[calc(100vw-2rem)] z-[800] bg-arbor-night/95 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-5"
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
							}, [createVNode("p", { class: "text-xs text-arbor-emerald font-medium" }, " 👆 Cliquez sur la carte pour positionner votre point ")])) : createCommentVNode("", true), createVNode(_sfc_main$5, {
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
						createVNode(_sfc_main$3, {
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

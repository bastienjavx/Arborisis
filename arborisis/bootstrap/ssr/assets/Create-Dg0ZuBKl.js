import { t as _sfc_main$1 } from "./AuthenticatedLayout-BFjA2KJR.js";
import { n as _sfc_main$2, r as _sfc_main$3, t as _sfc_main$4 } from "./TextInput-BIuc15x0.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelCheckbox, vModelSelect, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Sounds/Create.vue
var _sfc_main = {
	__name: "Create",
	__ssrInlineRender: true,
	props: {
		categories: Array,
		environments: Array,
		selectedListeningPoint: Object
	},
	setup(__props) {
		const props = __props;
		const form = useForm({
			audio_file: null,
			title: "",
			description: "",
			recorded_at: "",
			recorded_time: "",
			latitude: props.selectedListeningPoint?.public_latitude ?? "",
			longitude: props.selectedListeningPoint?.public_longitude ?? "",
			location_name: props.selectedListeningPoint?.title ?? "",
			is_sensitive_location: false,
			tags: "",
			category_id: "",
			new_category_name: "",
			environment_id: props.selectedListeningPoint?.environment_id ?? "",
			new_environment_name: "",
			equipment: "",
			license: "all_rights_reserved",
			visibility: "public",
			cover_image: null,
			listening_point_id: props.selectedListeningPoint?.id ?? "",
			create_new_listening_point: false
		});
		const audioPreview = ref(null);
		const coverPreview = ref(null);
		const isDragging = ref(false);
		const geoError = ref("");
		const locating = ref(false);
		const uploadProgress = ref(0);
		const categorySelection = ref("");
		const environmentSelection = ref(props.selectedListeningPoint?.environment_id ?? "");
		const completionItems = computed(() => [
			{
				label: "Audio",
				done: Boolean(form.audio_file)
			},
			{
				label: "Titre",
				done: Boolean(form.title)
			},
			{
				label: "Lieu",
				done: Boolean(form.latitude && form.longitude)
			},
			{
				label: "Droits",
				done: Boolean(form.license && form.visibility)
			}
		]);
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
		const selectCategory = (value) => {
			categorySelection.value = value;
			form.category_id = value === "__new" ? "" : value;
			if (value !== "__new") form.new_category_name = "";
		};
		const selectEnvironment = (value) => {
			environmentSelection.value = value;
			form.environment_id = value === "__new" ? "" : value;
			if (value !== "__new") form.new_environment_name = "";
		};
		const handleAudioChange = (e) => {
			const file = e.target.files[0];
			if (file) {
				form.audio_file = file;
				audioPreview.value = URL.createObjectURL(file);
			}
		};
		const handleCoverChange = (e) => {
			const file = e.target.files[0];
			if (file) {
				form.cover_image = file;
				coverPreview.value = URL.createObjectURL(file);
			}
		};
		const handleDrop = (e) => {
			e.preventDefault();
			isDragging.value = false;
			const file = e.dataTransfer.files[0];
			if (file && file.type.startsWith("audio/")) {
				form.audio_file = file;
				audioPreview.value = URL.createObjectURL(file);
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
					audioPreview.value = null;
					coverPreview.value = null;
					uploadProgress.value = 0;
				}
			});
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Publier un son" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div${_scopeId}><p class="atlas-kicker"${_scopeId}>Nouvelle archive</p><h2 class="font-display text-2xl font-semibold text-arbor-cream"${_scopeId}> Publier une trace sonore </h2></div>`);
					else return [createVNode("div", null, [createVNode("p", { class: "atlas-kicker" }, "Nouvelle archive"), createVNode("h2", { class: "font-display text-2xl font-semibold text-arbor-cream" }, " Publier une trace sonore ")])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="py-8"${_scopeId}><div class="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8"${_scopeId}><aside class="space-y-5"${_scopeId}><div class="trace-frame p-6"${_scopeId}><div class="relative z-10"${_scopeId}><p class="atlas-kicker mb-4"${_scopeId}>Carnet de terrain</p><h1 class="atlas-heading text-4xl"${_scopeId}>Une capsule du vivant.</h1><p class="mt-5 text-sm leading-6 text-arbor-sage"${_scopeId}> Ajoutez le fichier, son contexte, puis une localisation. Les coordonnées publiques seront protégées selon les règles de confidentialité Arborisis. </p></div></div><div class="trace-frame p-5"${_scopeId}><div class="relative z-10"${_scopeId}><p class="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-arbor-sage"${_scopeId}>Progression</p><div class="space-y-3"${_scopeId}><!--[-->`);
						ssrRenderList(completionItems.value, (item) => {
							_push(`<div class="flex items-center justify-between rounded-lg border border-arbor-mineral/10 bg-arbor-mist/[0.035] px-3 py-2 text-sm"${_scopeId}><span class="text-arbor-sage"${_scopeId}>${ssrInterpolate(item.label)}</span><span class="${ssrRenderClass([item.done ? "bg-arbor-firefly shadow-firefly" : "bg-arbor-mineral/20", "h-2.5 w-2.5 rounded-full"])}"${_scopeId}></span></div>`);
						});
						_push(`<!--]--></div></div></div><div class="rounded-lg border border-arbor-lichen/20 bg-arbor-lichen/10 p-4 text-sm leading-6 text-arbor-sage"${_scopeId}> Les lieux sensibles doivent rester approximés. Ne publiez jamais d’espèces fragiles avec coordonnées exactes. </div></aside><div${_scopeId}><div class="mb-8 rounded-lg border border-arbor-lichen/20 bg-arbor-lichen/5 p-5 backdrop-blur-sm"${_scopeId}><div class="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream"${_scopeId}> Enregistrez directement depuis votre appareil </h3><p class="mt-1 text-sm text-arbor-sage/70"${_scopeId}> Utilisez le micro de votre téléphone ou une interface externe, sans quitter Arborisis. </p></div>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("sounds.record", __props.selectedListeningPoint ? { listening_point_id: __props.selectedListeningPoint.id } : {}),
							class: "btn-primary inline-flex shrink-0 items-center gap-2 text-sm"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg> Ouvrir l&#39;enregistreur `);
								else return [(openBlock(), createBlock("svg", {
									class: "h-4 w-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
								})])), createTextVNode(" Ouvrir l'enregistreur ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div><form class="space-y-8"${_scopeId}><input type="hidden"${ssrRenderAttr("value", unref(form).listening_point_id)}${_scopeId}><input type="hidden"${ssrRenderAttr("value", unref(form).create_new_listening_point)}${_scopeId}>`);
						if (__props.selectedListeningPoint) {
							_push(`<div class="trace-frame border-arbor-lichen/25 bg-arbor-lichen/10 p-5"${_scopeId}><div class="relative z-10"${_scopeId}><p class="atlas-kicker mb-2"${_scopeId}>Nouvelle prise liée</p><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><h3 class="font-display text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.selectedListeningPoint.title)}</h3><p class="mt-1 text-sm text-arbor-sage"${_scopeId}> Point prérempli · coordonnées publiques approximées à ${ssrInterpolate(__props.selectedListeningPoint.public_accuracy_meters)} m. </p></div>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("listening-points.show", __props.selectedListeningPoint.slug),
								class: "text-sm text-arbor-lichen hover:text-arbor-firefly"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Voir le point `);
									else return [createTextVNode(" Voir le point ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div></div>`);
						} else _push(`<!---->`);
						_push(`<div class="trace-frame p-5 sm:p-6"${_scopeId}><div class="relative z-10"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, { value: "Fichier audio *" }, null, _parent, _scopeId));
						_push(`<div class="${ssrRenderClass([isDragging.value ? "border-arbor-firefly bg-arbor-firefly/5" : "border-arbor-mineral/15 hover:border-arbor-lichen/40", "mt-2 border border-dashed rounded-lg p-8 text-center transition-colors"])}"${_scopeId}>`);
						if (!audioPreview.value) _push(`<div${_scopeId}><div class="poetic-empty-icon flex items-center justify-center"${_scopeId}><svg class="relative w-8 h-8 text-arbor-lichen/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"${_scopeId}></path></svg></div><p class="text-arbor-sage text-sm mb-2"${_scopeId}> Glissez-déposez votre fichier audio ici, ou <label class="text-arbor-lichen cursor-pointer hover:underline"${_scopeId}> parcourez <input type="file" accept="audio/mpeg,audio/wav,audio/flac,audio/mp4,audio/x-m4a" class="hidden"${_scopeId}></label></p><p class="text-xs text-arbor-sage/70"${_scopeId}>MP3, WAV, FLAC, M4A — max 500 Mo</p></div>`);
						else _push(`<div${_scopeId}><audio${ssrRenderAttr("src", audioPreview.value)} controls class="w-full"${_scopeId}></audio><button type="button" class="mt-3 text-sm text-arbor-sage hover:text-red-400 transition-colors"${_scopeId}> Supprimer le fichier </button></div>`);
						_push(`</div>`);
						_push(ssrRenderComponent(_sfc_main$3, { message: unref(form).errors.audio_file }, null, _parent, _scopeId));
						_push(`</div></div><div class="trace-frame p-5 sm:p-6"${_scopeId}><div class="relative z-10"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
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
						_push(ssrRenderComponent(_sfc_main$3, { message: unref(form).errors.title }, null, _parent, _scopeId));
						_push(`</div></div><div class="trace-frame p-5 sm:p-6"${_scopeId}><div class="relative z-10"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
							for: "description",
							value: "Description"
						}, null, _parent, _scopeId));
						_push(`<textarea id="description" rows="4" class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald" placeholder="Décrivez le contexte de l&#39;enregistrement, ce que vous entendez, l&#39;ambiance..."${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
						_push(ssrRenderComponent(_sfc_main$3, { message: unref(form).errors.description }, null, _parent, _scopeId));
						_push(`</div></div><div class="trace-frame p-6"${_scopeId}><div class="relative z-10"${_scopeId}><div class="mb-4 flex items-start justify-between gap-4"${_scopeId}><div${_scopeId}><p class="atlas-kicker mb-1"${_scopeId}>Lieu d&#39;écoute</p><h3 class="font-display text-2xl font-semibold text-arbor-cream"${_scopeId}>Localisation *</h3></div><span class="rounded-full border border-arbor-firefly/20 bg-arbor-firefly/10 px-3 py-1 text-[11px] text-arbor-firefly"${_scopeId}> Publique approximée </span></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
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
						_push(ssrRenderComponent(_sfc_main$3, { message: unref(form).errors.latitude }, null, _parent, _scopeId));
						_push(`</div><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
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
						_push(ssrRenderComponent(_sfc_main$3, { message: unref(form).errors.longitude }, null, _parent, _scopeId));
						_push(`</div></div><button type="button"${ssrIncludeBooleanAttr(locating.value) ? " disabled" : ""} class="text-sm text-arbor-lichen hover:text-arbor-firefly flex items-center gap-1.5 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>`);
						if (locating.value) _push(`<svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"${_scopeId}></path></svg>`);
						else _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg>`);
						if (locating.value) _push(`<span${_scopeId}>Localisation...</span>`);
						else _push(`<span${_scopeId}>Utiliser ma position actuelle</span>`);
						_push(`</button>`);
						if (geoError.value) _push(`<div class="mb-4 text-sm text-red-400 flex items-center gap-1.5"${_scopeId}><svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> ${ssrInterpolate(geoError.value)}</div>`);
						else _push(`<!---->`);
						_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
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
						_push(`</div></div><div class="mt-4 flex items-center gap-2"${_scopeId}><input id="is_sensitive_location"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_sensitive_location) ? ssrLooseContain(unref(form).is_sensitive_location, null) : unref(form).is_sensitive_location) ? " checked" : ""} type="checkbox" class="rounded border-arbor-glass-border bg-arbor-deep text-arbor-emerald focus:ring-arbor-emerald"${_scopeId}><label for="is_sensitive_location" class="text-sm text-arbor-sage"${_scopeId}> Ce lieu est sensible — afficher une localisation approximative uniquement </label></div></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
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
						_push(ssrRenderComponent(_sfc_main$2, {
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
						_push(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
							for: "category_id",
							value: "Catégorie"
						}, null, _parent, _scopeId));
						_push(`<select id="category_id" class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(categorySelection.value) ? ssrLooseContain(categorySelection.value, "") : ssrLooseEqual(categorySelection.value, "")) ? " selected" : ""}${_scopeId}>Choisir une catégorie</option><!--[-->`);
						ssrRenderList(__props.categories, (cat) => {
							_push(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(categorySelection.value) ? ssrLooseContain(categorySelection.value, cat.id) : ssrLooseEqual(categorySelection.value, cat.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(cat.name)}</option>`);
						});
						_push(`<!--]--><option value="__new"${ssrIncludeBooleanAttr(Array.isArray(categorySelection.value) ? ssrLooseContain(categorySelection.value, "__new") : ssrLooseEqual(categorySelection.value, "__new")) ? " selected" : ""}${_scopeId}>Créer une nouvelle catégorie</option></select>`);
						if (categorySelection.value === "__new") _push(ssrRenderComponent(_sfc_main$4, {
							id: "new_category_name",
							modelValue: unref(form).new_category_name,
							"onUpdate:modelValue": ($event) => unref(form).new_category_name = $event,
							type: "text",
							class: "mt-3 block w-full",
							placeholder: "Ex: Chiroptères, geais, ambiance de canopée"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(_sfc_main$3, { message: unref(form).errors.category_id || unref(form).errors.new_category_name }, null, _parent, _scopeId));
						_push(`</div><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
							for: "environment_id",
							value: "Environnement"
						}, null, _parent, _scopeId));
						_push(`<select id="environment_id" class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(environmentSelection.value) ? ssrLooseContain(environmentSelection.value, "") : ssrLooseEqual(environmentSelection.value, "")) ? " selected" : ""}${_scopeId}>Choisir un environnement</option><!--[-->`);
						ssrRenderList(__props.environments, (env) => {
							_push(`<option${ssrRenderAttr("value", env.id)}${ssrIncludeBooleanAttr(Array.isArray(environmentSelection.value) ? ssrLooseContain(environmentSelection.value, env.id) : ssrLooseEqual(environmentSelection.value, env.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(env.name)}</option>`);
						});
						_push(`<!--]--><option value="__new"${ssrIncludeBooleanAttr(Array.isArray(environmentSelection.value) ? ssrLooseContain(environmentSelection.value, "__new") : ssrLooseEqual(environmentSelection.value, "__new")) ? " selected" : ""}${_scopeId}>Créer un nouvel environnement</option></select>`);
						if (environmentSelection.value === "__new") _push(ssrRenderComponent(_sfc_main$4, {
							id: "new_environment_name",
							modelValue: unref(form).new_environment_name,
							"onUpdate:modelValue": ($event) => unref(form).new_environment_name = $event,
							type: "text",
							class: "mt-3 block w-full",
							placeholder: "Ex: ripisylve, vieille haie, friche ferroviaire"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(_sfc_main$3, { message: unref(form).errors.environment_id || unref(form).errors.new_environment_name }, null, _parent, _scopeId));
						_push(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
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
						_push(ssrRenderComponent(_sfc_main$2, {
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
						_push(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
							for: "license",
							value: "Licence *"
						}, null, _parent, _scopeId));
						_push(`<select id="license" class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald" required${_scopeId}><!--[-->`);
						ssrRenderList(licenses, (lic) => {
							_push(`<option${ssrRenderAttr("value", lic.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).license) ? ssrLooseContain(unref(form).license, lic.value) : ssrLooseEqual(unref(form).license, lic.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(lic.label)}</option>`);
						});
						_push(`<!--]--></select>`);
						_push(ssrRenderComponent(_sfc_main$3, { message: unref(form).errors.license }, null, _parent, _scopeId));
						_push(`</div><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
							for: "visibility",
							value: "Visibilité *"
						}, null, _parent, _scopeId));
						_push(`<select id="visibility" class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald" required${_scopeId}><!--[-->`);
						ssrRenderList(visibilities, (vis) => {
							_push(`<option${ssrRenderAttr("value", vis.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).visibility) ? ssrLooseContain(unref(form).visibility, vis.value) : ssrLooseEqual(unref(form).visibility, vis.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vis.label)}</option>`);
						});
						_push(`<!--]--></select>`);
						_push(ssrRenderComponent(_sfc_main$3, { message: unref(form).errors.visibility }, null, _parent, _scopeId));
						_push(`</div></div><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, { value: "Image de couverture" }, null, _parent, _scopeId));
						_push(`<div class="mt-2"${_scopeId}>`);
						if (coverPreview.value) _push(`<div class="relative w-48 aspect-square rounded-xl overflow-hidden mb-3"${_scopeId}><img${ssrRenderAttr("src", coverPreview.value)} class="w-full h-full object-cover"${_scopeId}><button type="button" class="absolute top-2 right-2 w-8 h-8 rounded-full bg-arbor-night/80 flex items-center justify-center text-arbor-cream hover:bg-red-500/80 transition-colors"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
						else _push(`<!---->`);
						_push(`<label class="inline-flex items-center px-4 py-2 rounded-xl border border-arbor-glass-border bg-arbor-glass text-sm text-arbor-cream cursor-pointer hover:bg-white/10 transition-colors"${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg> Choisir une image <input type="file" accept="image/*" class="hidden"${_scopeId}></label><p class="text-xs text-arbor-sage mt-2"${_scopeId}>JPG, PNG, WebP — max 10 Mo</p></div>`);
						_push(ssrRenderComponent(_sfc_main$3, { message: unref(form).errors.cover_image }, null, _parent, _scopeId));
						_push(`</div><div class="flex items-center justify-end gap-4 pt-4 border-t border-arbor-glass-border"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/sounds",
							class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Annuler `);
								else return [createTextVNode(" Annuler ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div class="w-full max-w-xs"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full"${_scopeId}>`);
						if (unref(form).processing) _push(`<span${_scopeId}>Publication en cours...</span>`);
						else _push(`<span${_scopeId}>Publier le son</span>`);
						_push(`</button>`);
						if (unref(form).processing && uploadProgress.value > 0) _push(`<div class="mt-3"${_scopeId}><div class="h-1.5 bg-arbor-glass rounded-full overflow-hidden"${_scopeId}><div class="h-full bg-gradient-to-r from-arbor-lichen to-arbor-firefly rounded-full transition-all duration-200" style="${ssrRenderStyle(`width: ${uploadProgress.value}%`)}"${_scopeId}></div></div><p class="text-xs text-arbor-sage mt-1 text-right"${_scopeId}>${ssrInterpolate(Math.round(uploadProgress.value))}%</p></div>`);
						else _push(`<!---->`);
						_push(`</div></div></form></div></div></div>`);
					} else return [createVNode("div", { class: "py-8" }, [createVNode("div", { class: "mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8" }, [createVNode("aside", { class: "space-y-5" }, [
						createVNode("div", { class: "trace-frame p-6" }, [createVNode("div", { class: "relative z-10" }, [
							createVNode("p", { class: "atlas-kicker mb-4" }, "Carnet de terrain"),
							createVNode("h1", { class: "atlas-heading text-4xl" }, "Une capsule du vivant."),
							createVNode("p", { class: "mt-5 text-sm leading-6 text-arbor-sage" }, " Ajoutez le fichier, son contexte, puis une localisation. Les coordonnées publiques seront protégées selon les règles de confidentialité Arborisis. ")
						])]),
						createVNode("div", { class: "trace-frame p-5" }, [createVNode("div", { class: "relative z-10" }, [createVNode("p", { class: "mb-4 text-xs font-medium uppercase tracking-[0.16em] text-arbor-sage" }, "Progression"), createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(completionItems.value, (item) => {
							return openBlock(), createBlock("div", {
								key: item.label,
								class: "flex items-center justify-between rounded-lg border border-arbor-mineral/10 bg-arbor-mist/[0.035] px-3 py-2 text-sm"
							}, [createVNode("span", { class: "text-arbor-sage" }, toDisplayString(item.label), 1), createVNode("span", { class: ["h-2.5 w-2.5 rounded-full", item.done ? "bg-arbor-firefly shadow-firefly" : "bg-arbor-mineral/20"] }, null, 2)]);
						}), 128))])])]),
						createVNode("div", { class: "rounded-lg border border-arbor-lichen/20 bg-arbor-lichen/10 p-4 text-sm leading-6 text-arbor-sage" }, " Les lieux sensibles doivent rester approximés. Ne publiez jamais d’espèces fragiles avec coordonnées exactes. ")
					]), createVNode("div", null, [createVNode("div", { class: "mb-8 rounded-lg border border-arbor-lichen/20 bg-arbor-lichen/5 p-5 backdrop-blur-sm" }, [createVNode("div", { class: "flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between" }, [createVNode("div", null, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream" }, " Enregistrez directement depuis votre appareil "), createVNode("p", { class: "mt-1 text-sm text-arbor-sage/70" }, " Utilisez le micro de votre téléphone ou une interface externe, sans quitter Arborisis. ")]), createVNode(unref(Link), {
						href: _ctx.route("sounds.record", __props.selectedListeningPoint ? { listening_point_id: __props.selectedListeningPoint.id } : {}),
						class: "btn-primary inline-flex shrink-0 items-center gap-2 text-sm"
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
							d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
						})])), createTextVNode(" Ouvrir l'enregistreur ")]),
						_: 1
					}, 8, ["href"])])]), createVNode("form", {
						onSubmit: withModifiers(submit, ["prevent"]),
						class: "space-y-8"
					}, [
						withDirectives(createVNode("input", {
							type: "hidden",
							"onUpdate:modelValue": ($event) => unref(form).listening_point_id = $event
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).listening_point_id]]),
						withDirectives(createVNode("input", {
							type: "hidden",
							"onUpdate:modelValue": ($event) => unref(form).create_new_listening_point = $event
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).create_new_listening_point]]),
						__props.selectedListeningPoint ? (openBlock(), createBlock("div", {
							key: 0,
							class: "trace-frame border-arbor-lichen/25 bg-arbor-lichen/10 p-5"
						}, [createVNode("div", { class: "relative z-10" }, [createVNode("p", { class: "atlas-kicker mb-2" }, "Nouvelle prise liée"), createVNode("div", { class: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }, [createVNode("div", null, [createVNode("h3", { class: "font-display text-2xl font-semibold text-arbor-cream" }, toDisplayString(__props.selectedListeningPoint.title), 1), createVNode("p", { class: "mt-1 text-sm text-arbor-sage" }, " Point prérempli · coordonnées publiques approximées à " + toDisplayString(__props.selectedListeningPoint.public_accuracy_meters) + " m. ", 1)]), createVNode(unref(Link), {
							href: _ctx.route("listening-points.show", __props.selectedListeningPoint.slug),
							class: "text-sm text-arbor-lichen hover:text-arbor-firefly"
						}, {
							default: withCtx(() => [createTextVNode(" Voir le point ")]),
							_: 1
						}, 8, ["href"])])])])) : createCommentVNode("", true),
						createVNode("div", { class: "trace-frame p-5 sm:p-6" }, [createVNode("div", { class: "relative z-10" }, [
							createVNode(_sfc_main$2, { value: "Fichier audio *" }),
							createVNode("div", {
								class: ["mt-2 border border-dashed rounded-lg p-8 text-center transition-colors", isDragging.value ? "border-arbor-firefly bg-arbor-firefly/5" : "border-arbor-mineral/15 hover:border-arbor-lichen/40"],
								onDragover: withModifiers(($event) => isDragging.value = true, ["prevent"]),
								onDragleave: withModifiers(($event) => isDragging.value = false, ["prevent"]),
								onDrop: handleDrop
							}, [!audioPreview.value ? (openBlock(), createBlock("div", { key: 0 }, [
								createVNode("div", { class: "poetic-empty-icon flex items-center justify-center" }, [(openBlock(), createBlock("svg", {
									class: "relative w-8 h-8 text-arbor-lichen/70",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
								})]))]),
								createVNode("p", { class: "text-arbor-sage text-sm mb-2" }, [createTextVNode(" Glissez-déposez votre fichier audio ici, ou "), createVNode("label", { class: "text-arbor-lichen cursor-pointer hover:underline" }, [createTextVNode(" parcourez "), createVNode("input", {
									type: "file",
									accept: "audio/mpeg,audio/wav,audio/flac,audio/mp4,audio/x-m4a",
									class: "hidden",
									onChange: handleAudioChange
								}, null, 32)])]),
								createVNode("p", { class: "text-xs text-arbor-sage/70" }, "MP3, WAV, FLAC, M4A — max 500 Mo")
							])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("audio", {
								src: audioPreview.value,
								controls: "",
								class: "w-full"
							}, null, 8, ["src"]), createVNode("button", {
								type: "button",
								onClick: ($event) => {
									audioPreview.value = null;
									unref(form).audio_file = null;
								},
								class: "mt-3 text-sm text-arbor-sage hover:text-red-400 transition-colors"
							}, " Supprimer le fichier ", 8, ["onClick"])]))], 42, ["onDragover", "onDragleave"]),
							createVNode(_sfc_main$3, { message: unref(form).errors.audio_file }, null, 8, ["message"])
						])]),
						createVNode("div", { class: "trace-frame p-5 sm:p-6" }, [createVNode("div", { class: "relative z-10" }, [
							createVNode(_sfc_main$2, {
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
							createVNode(_sfc_main$3, { message: unref(form).errors.title }, null, 8, ["message"])
						])]),
						createVNode("div", { class: "trace-frame p-5 sm:p-6" }, [createVNode("div", { class: "relative z-10" }, [
							createVNode(_sfc_main$2, {
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
							createVNode(_sfc_main$3, { message: unref(form).errors.description }, null, 8, ["message"])
						])]),
						createVNode("div", { class: "trace-frame p-6" }, [createVNode("div", { class: "relative z-10" }, [
							createVNode("div", { class: "mb-4 flex items-start justify-between gap-4" }, [createVNode("div", null, [createVNode("p", { class: "atlas-kicker mb-1" }, "Lieu d'écoute"), createVNode("h3", { class: "font-display text-2xl font-semibold text-arbor-cream" }, "Localisation *")]), createVNode("span", { class: "rounded-full border border-arbor-firefly/20 bg-arbor-firefly/10 px-3 py-1 text-[11px] text-arbor-firefly" }, " Publique approximée ")]),
							createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4" }, [createVNode("div", null, [
								createVNode(_sfc_main$2, {
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
								createVNode(_sfc_main$3, { message: unref(form).errors.latitude }, null, 8, ["message"])
							]), createVNode("div", null, [
								createVNode(_sfc_main$2, {
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
								createVNode(_sfc_main$3, { message: unref(form).errors.longitude }, null, 8, ["message"])
							])]),
							createVNode("button", {
								type: "button",
								onClick: getCurrentLocation,
								disabled: locating.value,
								class: "text-sm text-arbor-lichen hover:text-arbor-firefly flex items-center gap-1.5 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
							}, [locating.value ? (openBlock(), createBlock("svg", {
								key: 0,
								class: "w-4 h-4 animate-spin",
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
								class: "w-4 h-4",
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
								class: "mb-4 text-sm text-red-400 flex items-center gap-1.5"
							}, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4 shrink-0",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							})])), createTextVNode(" " + toDisplayString(geoError.value), 1)])) : createCommentVNode("", true),
							createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [createVNode("div", null, [createVNode(_sfc_main$2, {
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
						])]),
						createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-6" }, [createVNode("div", null, [createVNode(_sfc_main$2, {
							for: "recorded_at",
							value: "Date d'enregistrement"
						}), createVNode(_sfc_main$4, {
							id: "recorded_at",
							modelValue: unref(form).recorded_at,
							"onUpdate:modelValue": ($event) => unref(form).recorded_at = $event,
							type: "date",
							class: "mt-2 block w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode("div", null, [createVNode(_sfc_main$2, {
							for: "recorded_time",
							value: "Heure d'enregistrement"
						}), createVNode(_sfc_main$4, {
							id: "recorded_time",
							modelValue: unref(form).recorded_time,
							"onUpdate:modelValue": ($event) => unref(form).recorded_time = $event,
							type: "time",
							class: "mt-2 block w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])])]),
						createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-6" }, [createVNode("div", null, [
							createVNode(_sfc_main$2, {
								for: "category_id",
								value: "Catégorie"
							}),
							withDirectives(createVNode("select", {
								id: "category_id",
								"onUpdate:modelValue": ($event) => categorySelection.value = $event,
								onChange: ($event) => selectCategory($event.target.value),
								class: "mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"
							}, [
								createVNode("option", { value: "" }, "Choisir une catégorie"),
								(openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
									return openBlock(), createBlock("option", {
										key: cat.id,
										value: cat.id
									}, toDisplayString(cat.name), 9, ["value"]);
								}), 128)),
								createVNode("option", { value: "__new" }, "Créer une nouvelle catégorie")
							], 40, ["onUpdate:modelValue", "onChange"]), [[vModelSelect, categorySelection.value]]),
							categorySelection.value === "__new" ? (openBlock(), createBlock(_sfc_main$4, {
								key: 0,
								id: "new_category_name",
								modelValue: unref(form).new_category_name,
								"onUpdate:modelValue": ($event) => unref(form).new_category_name = $event,
								type: "text",
								class: "mt-3 block w-full",
								placeholder: "Ex: Chiroptères, geais, ambiance de canopée"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
							createVNode(_sfc_main$3, { message: unref(form).errors.category_id || unref(form).errors.new_category_name }, null, 8, ["message"])
						]), createVNode("div", null, [
							createVNode(_sfc_main$2, {
								for: "environment_id",
								value: "Environnement"
							}),
							withDirectives(createVNode("select", {
								id: "environment_id",
								"onUpdate:modelValue": ($event) => environmentSelection.value = $event,
								onChange: ($event) => selectEnvironment($event.target.value),
								class: "mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"
							}, [
								createVNode("option", { value: "" }, "Choisir un environnement"),
								(openBlock(true), createBlock(Fragment, null, renderList(__props.environments, (env) => {
									return openBlock(), createBlock("option", {
										key: env.id,
										value: env.id
									}, toDisplayString(env.name), 9, ["value"]);
								}), 128)),
								createVNode("option", { value: "__new" }, "Créer un nouvel environnement")
							], 40, ["onUpdate:modelValue", "onChange"]), [[vModelSelect, environmentSelection.value]]),
							environmentSelection.value === "__new" ? (openBlock(), createBlock(_sfc_main$4, {
								key: 0,
								id: "new_environment_name",
								modelValue: unref(form).new_environment_name,
								"onUpdate:modelValue": ($event) => unref(form).new_environment_name = $event,
								type: "text",
								class: "mt-3 block w-full",
								placeholder: "Ex: ripisylve, vieille haie, friche ferroviaire"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
							createVNode(_sfc_main$3, { message: unref(form).errors.environment_id || unref(form).errors.new_environment_name }, null, 8, ["message"])
						])]),
						createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-6" }, [createVNode("div", null, [createVNode(_sfc_main$2, {
							for: "equipment",
							value: "Matériel utilisé"
						}), createVNode(_sfc_main$4, {
							id: "equipment",
							modelValue: unref(form).equipment,
							"onUpdate:modelValue": ($event) => unref(form).equipment = $event,
							type: "text",
							class: "mt-2 block w-full",
							placeholder: "Ex: Zoom H6 + Sennheiser MKH 416"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode("div", null, [createVNode(_sfc_main$2, {
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
						createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-6" }, [createVNode("div", null, [
							createVNode(_sfc_main$2, {
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
							createVNode(_sfc_main$3, { message: unref(form).errors.license }, null, 8, ["message"])
						]), createVNode("div", null, [
							createVNode(_sfc_main$2, {
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
							createVNode(_sfc_main$3, { message: unref(form).errors.visibility }, null, 8, ["message"])
						])]),
						createVNode("div", null, [
							createVNode(_sfc_main$2, { value: "Image de couverture" }),
							createVNode("div", { class: "mt-2" }, [
								coverPreview.value ? (openBlock(), createBlock("div", {
									key: 0,
									class: "relative w-48 aspect-square rounded-xl overflow-hidden mb-3"
								}, [createVNode("img", {
									src: coverPreview.value,
									class: "w-full h-full object-cover"
								}, null, 8, ["src"]), createVNode("button", {
									type: "button",
									onClick: ($event) => {
										coverPreview.value = null;
										unref(form).cover_image = null;
									},
									class: "absolute top-2 right-2 w-8 h-8 rounded-full bg-arbor-night/80 flex items-center justify-center text-arbor-cream hover:bg-red-500/80 transition-colors"
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
								})]))], 8, ["onClick"])])) : createCommentVNode("", true),
								createVNode("label", { class: "inline-flex items-center px-4 py-2 rounded-xl border border-arbor-glass-border bg-arbor-glass text-sm text-arbor-cream cursor-pointer hover:bg-white/10 transition-colors" }, [
									(openBlock(), createBlock("svg", {
										class: "w-4 h-4 mr-2",
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
								createVNode("p", { class: "text-xs text-arbor-sage mt-2" }, "JPG, PNG, WebP — max 10 Mo")
							]),
							createVNode(_sfc_main$3, { message: unref(form).errors.cover_image }, null, 8, ["message"])
						]),
						createVNode("div", { class: "flex items-center justify-end gap-4 pt-4 border-t border-arbor-glass-border" }, [createVNode(unref(Link), {
							href: "/sounds",
							class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
						}, {
							default: withCtx(() => [createTextVNode(" Annuler ")]),
							_: 1
						}), createVNode("div", { class: "w-full max-w-xs" }, [createVNode("button", {
							type: "submit",
							disabled: unref(form).processing,
							class: "btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full"
						}, [unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Publication en cours...")) : (openBlock(), createBlock("span", { key: 1 }, "Publier le son"))], 8, ["disabled"]), unref(form).processing && uploadProgress.value > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-3"
						}, [createVNode("div", { class: "h-1.5 bg-arbor-glass rounded-full overflow-hidden" }, [createVNode("div", {
							class: "h-full bg-gradient-to-r from-arbor-lichen to-arbor-firefly rounded-full transition-all duration-200",
							style: `width: ${uploadProgress.value}%`
						}, null, 4)]), createVNode("p", { class: "text-xs text-arbor-sage mt-1 text-right" }, toDisplayString(Math.round(uploadProgress.value)) + "%", 1)])) : createCommentVNode("", true)])])
					], 32)])])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Sounds/Create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

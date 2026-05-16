import { t as _sfc_main$1 } from "./GuestLayout-CqMC9M4d.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelSelect, vModelText, withCtx, withDirectives } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/ListeningPoints/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		points: Object,
		filters: Object
	},
	setup(__props) {
		const props = __props;
		const search = ref(props.filters?.q ?? "");
		const habitat = ref(props.filters?.habitat ?? "");
		const habitatOptions = [
			{
				value: "",
				label: "Tous les habitats"
			},
			{
				value: "forest",
				label: "Forêt"
			},
			{
				value: "wetland",
				label: "Zone humide"
			},
			{
				value: "river",
				label: "Rivière"
			},
			{
				value: "meadow",
				label: "Prairie"
			},
			{
				value: "ocean",
				label: "Océan"
			},
			{
				value: "mountain",
				label: "Montagne"
			},
			{
				value: "urban_nature",
				label: "Nature urbaine"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Points d'écoute" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="min-h-screen bg-arbor-night"${_scopeId}><div class="relative overflow-hidden"${_scopeId}><div class="absolute inset-0 bg-gradient-to-b from-arbor-moss/10 via-transparent to-transparent pointer-events-none"${_scopeId}></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10"${_scopeId}><div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4"${_scopeId}><div${_scopeId}><div class="flex items-center gap-2 mb-3"${_scopeId}><span class="inline-block w-2 h-2 rounded-full bg-arbor-emerald animate-pulse"${_scopeId}></span><span class="text-xs font-medium text-arbor-emerald uppercase tracking-widest"${_scopeId}>Écoute scientifique</span></div><h1 class="font-display text-4xl md:text-5xl font-bold text-arbor-cream leading-tight"${_scopeId}> Points d&#39;écoute </h1><p class="mt-3 text-arbor-sage text-lg max-w-2xl"${_scopeId}> Lieux suivis dans le temps par la communauté Arborisis. Chaque point rassemble plusieurs enregistrements pour observer l&#39;évolution sonore de la nature. </p></div></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"${_scopeId}><div class="glass-card p-4 flex flex-col sm:flex-row gap-4"${_scopeId}><div class="flex-1"${_scopeId}><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Rechercher un lieu..." class="w-full bg-arbor-deep/50 border border-arbor-glass-border rounded-lg px-4 py-2 text-arbor-cream placeholder-arbor-sage/50 focus:outline-none focus:border-arbor-emerald/50"${_scopeId}></div><div class="sm:w-48"${_scopeId}><select class="w-full bg-arbor-deep/50 border border-arbor-glass-border rounded-lg px-4 py-2 text-arbor-cream focus:outline-none focus:border-arbor-emerald/50"${_scopeId}><!--[-->`);
						ssrRenderList(habitatOptions, (opt) => {
							_push(`<option${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(Array.isArray(habitat.value) ? ssrLooseContain(habitat.value, opt.value) : ssrLooseEqual(habitat.value, opt.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(opt.label)}</option>`);
						});
						_push(`<!--]--></select></div>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("listening-points.index", {
								q: search.value,
								habitat: habitat.value
							}),
							class: "px-6 py-2 bg-arbor-emerald/20 text-arbor-emerald border border-arbor-emerald/30 rounded-lg hover:bg-arbor-emerald/30 transition-colors text-sm font-medium text-center"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Filtrer `);
								else return [createTextVNode(" Filtrer ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
						ssrRenderList(__props.points.data, (point) => {
							_push(ssrRenderComponent(unref(Link), {
								key: point.id,
								href: _ctx.route("listening-points.show", point.slug),
								class: "glass-card p-6 group hover:border-arbor-emerald/30 transition-all duration-300"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<div class="flex items-start justify-between mb-4"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><span class="text-2xl"${_scopeId}>${ssrInterpolate(point.habitat_type === "forest" ? "🌲" : point.habitat_type === "wetland" ? "💧" : point.habitat_type === "river" ? "🌊" : point.habitat_type === "meadow" ? "🌾" : point.habitat_type === "ocean" ? "🌊" : point.habitat_type === "mountain" ? "⛰️" : "📍")}</span><span class="text-xs text-arbor-sage uppercase tracking-wider"${_scopeId}>${ssrInterpolate(point.habitat_type)}</span></div><span class="text-xs font-mono text-arbor-emerald"${_scopeId}>${ssrInterpolate(point.sounds_count)} enreg.</span></div><h3 class="font-display text-xl font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors"${_scopeId}>${ssrInterpolate(point.title)}</h3><p class="mt-2 text-sm text-arbor-sage line-clamp-2"${_scopeId}>${ssrInterpolate(point.description || "Aucune description disponible.")}</p><div class="mt-4 flex items-center gap-4 text-xs text-arbor-sage/70"${_scopeId}><span${_scopeId}>${ssrInterpolate(point.public_latitude?.toFixed(2))}, ${ssrInterpolate(point.public_longitude?.toFixed(2))}</span>`);
										if (point.first_recorded_at) _push(`<span${_scopeId}> Depuis ${ssrInterpolate(new Date(point.first_recorded_at).getFullYear())}</span>`);
										else _push(`<!---->`);
										_push(`</div><div class="mt-4 flex items-center gap-2"${_scopeId}><div class="flex -space-x-2"${_scopeId}><!--[-->`);
										ssrRenderList(point.contributors?.slice(0, 3), (contributor) => {
											_push(`<div class="w-7 h-7 rounded-full bg-arbor-moss border-2 border-arbor-deep flex items-center justify-center text-[10px] text-arbor-cream"${_scopeId}>${ssrInterpolate(contributor.name?.charAt(0)?.toUpperCase())}</div>`);
										});
										_push(`<!--]--></div><span class="text-xs text-arbor-sage/70"${_scopeId}>${ssrInterpolate(point.contributors?.length || 1)} contributeur${ssrInterpolate(point.contributors?.length > 1 ? "s" : "")}</span></div>`);
									} else return [
										createVNode("div", { class: "flex items-start justify-between mb-4" }, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-2xl" }, toDisplayString(point.habitat_type === "forest" ? "🌲" : point.habitat_type === "wetland" ? "💧" : point.habitat_type === "river" ? "🌊" : point.habitat_type === "meadow" ? "🌾" : point.habitat_type === "ocean" ? "🌊" : point.habitat_type === "mountain" ? "⛰️" : "📍"), 1), createVNode("span", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, toDisplayString(point.habitat_type), 1)]), createVNode("span", { class: "text-xs font-mono text-arbor-emerald" }, toDisplayString(point.sounds_count) + " enreg.", 1)]),
										createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors" }, toDisplayString(point.title), 1),
										createVNode("p", { class: "mt-2 text-sm text-arbor-sage line-clamp-2" }, toDisplayString(point.description || "Aucune description disponible."), 1),
										createVNode("div", { class: "mt-4 flex items-center gap-4 text-xs text-arbor-sage/70" }, [createVNode("span", null, toDisplayString(point.public_latitude?.toFixed(2)) + ", " + toDisplayString(point.public_longitude?.toFixed(2)), 1), point.first_recorded_at ? (openBlock(), createBlock("span", { key: 0 }, " Depuis " + toDisplayString(new Date(point.first_recorded_at).getFullYear()), 1)) : createCommentVNode("", true)]),
										createVNode("div", { class: "mt-4 flex items-center gap-2" }, [createVNode("div", { class: "flex -space-x-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(point.contributors?.slice(0, 3), (contributor) => {
											return openBlock(), createBlock("div", {
												key: contributor.id,
												class: "w-7 h-7 rounded-full bg-arbor-moss border-2 border-arbor-deep flex items-center justify-center text-[10px] text-arbor-cream"
											}, toDisplayString(contributor.name?.charAt(0)?.toUpperCase()), 1);
										}), 128))]), createVNode("span", { class: "text-xs text-arbor-sage/70" }, toDisplayString(point.contributors?.length || 1) + " contributeur" + toDisplayString(point.contributors?.length > 1 ? "s" : ""), 1)])
									];
								}),
								_: 2
							}, _parent, _scopeId));
						});
						_push(`<!--]--></div>`);
						if (__props.points.links.length > 3) {
							_push(`<div class="mt-10 flex justify-center"${_scopeId}><div class="flex gap-2"${_scopeId}><!--[-->`);
							ssrRenderList(__props.points.links, (link) => {
								_push(ssrRenderComponent(unref(Link), {
									key: link.label,
									href: link.url,
									class: ["px-3 py-1.5 rounded-lg text-sm transition-colors", link.active ? "bg-arbor-emerald/20 text-arbor-emerald border border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30 border border-transparent"]
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "min-h-screen bg-arbor-night" }, [
						createVNode("div", { class: "relative overflow-hidden" }, [createVNode("div", { class: "absolute inset-0 bg-gradient-to-b from-arbor-moss/10 via-transparent to-transparent pointer-events-none" }), createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10" }, [createVNode("div", { class: "flex flex-col md:flex-row md:items-end md:justify-between gap-4" }, [createVNode("div", null, [
							createVNode("div", { class: "flex items-center gap-2 mb-3" }, [createVNode("span", { class: "inline-block w-2 h-2 rounded-full bg-arbor-emerald animate-pulse" }), createVNode("span", { class: "text-xs font-medium text-arbor-emerald uppercase tracking-widest" }, "Écoute scientifique")]),
							createVNode("h1", { class: "font-display text-4xl md:text-5xl font-bold text-arbor-cream leading-tight" }, " Points d'écoute "),
							createVNode("p", { class: "mt-3 text-arbor-sage text-lg max-w-2xl" }, " Lieux suivis dans le temps par la communauté Arborisis. Chaque point rassemble plusieurs enregistrements pour observer l'évolution sonore de la nature. ")
						])])])]),
						createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" }, [createVNode("div", { class: "glass-card p-4 flex flex-col sm:flex-row gap-4" }, [
							createVNode("div", { class: "flex-1" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => search.value = $event,
								type: "text",
								placeholder: "Rechercher un lieu...",
								class: "w-full bg-arbor-deep/50 border border-arbor-glass-border rounded-lg px-4 py-2 text-arbor-cream placeholder-arbor-sage/50 focus:outline-none focus:border-arbor-emerald/50"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, search.value]])]),
							createVNode("div", { class: "sm:w-48" }, [withDirectives(createVNode("select", {
								"onUpdate:modelValue": ($event) => habitat.value = $event,
								class: "w-full bg-arbor-deep/50 border border-arbor-glass-border rounded-lg px-4 py-2 text-arbor-cream focus:outline-none focus:border-arbor-emerald/50"
							}, [(openBlock(), createBlock(Fragment, null, renderList(habitatOptions, (opt) => {
								return createVNode("option", {
									key: opt.value,
									value: opt.value
								}, toDisplayString(opt.label), 9, ["value"]);
							}), 64))], 8, ["onUpdate:modelValue"]), [[vModelSelect, habitat.value]])]),
							createVNode(unref(Link), {
								href: _ctx.route("listening-points.index", {
									q: search.value,
									habitat: habitat.value
								}),
								class: "px-6 py-2 bg-arbor-emerald/20 text-arbor-emerald border border-arbor-emerald/30 rounded-lg hover:bg-arbor-emerald/30 transition-colors text-sm font-medium text-center"
							}, {
								default: withCtx(() => [createTextVNode(" Filtrer ")]),
								_: 1
							}, 8, ["href"])
						])]),
						createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" }, [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.points.data, (point) => {
							return openBlock(), createBlock(unref(Link), {
								key: point.id,
								href: _ctx.route("listening-points.show", point.slug),
								class: "glass-card p-6 group hover:border-arbor-emerald/30 transition-all duration-300"
							}, {
								default: withCtx(() => [
									createVNode("div", { class: "flex items-start justify-between mb-4" }, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-2xl" }, toDisplayString(point.habitat_type === "forest" ? "🌲" : point.habitat_type === "wetland" ? "💧" : point.habitat_type === "river" ? "🌊" : point.habitat_type === "meadow" ? "🌾" : point.habitat_type === "ocean" ? "🌊" : point.habitat_type === "mountain" ? "⛰️" : "📍"), 1), createVNode("span", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, toDisplayString(point.habitat_type), 1)]), createVNode("span", { class: "text-xs font-mono text-arbor-emerald" }, toDisplayString(point.sounds_count) + " enreg.", 1)]),
									createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors" }, toDisplayString(point.title), 1),
									createVNode("p", { class: "mt-2 text-sm text-arbor-sage line-clamp-2" }, toDisplayString(point.description || "Aucune description disponible."), 1),
									createVNode("div", { class: "mt-4 flex items-center gap-4 text-xs text-arbor-sage/70" }, [createVNode("span", null, toDisplayString(point.public_latitude?.toFixed(2)) + ", " + toDisplayString(point.public_longitude?.toFixed(2)), 1), point.first_recorded_at ? (openBlock(), createBlock("span", { key: 0 }, " Depuis " + toDisplayString(new Date(point.first_recorded_at).getFullYear()), 1)) : createCommentVNode("", true)]),
									createVNode("div", { class: "mt-4 flex items-center gap-2" }, [createVNode("div", { class: "flex -space-x-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(point.contributors?.slice(0, 3), (contributor) => {
										return openBlock(), createBlock("div", {
											key: contributor.id,
											class: "w-7 h-7 rounded-full bg-arbor-moss border-2 border-arbor-deep flex items-center justify-center text-[10px] text-arbor-cream"
										}, toDisplayString(contributor.name?.charAt(0)?.toUpperCase()), 1);
									}), 128))]), createVNode("span", { class: "text-xs text-arbor-sage/70" }, toDisplayString(point.contributors?.length || 1) + " contributeur" + toDisplayString(point.contributors?.length > 1 ? "s" : ""), 1)])
								]),
								_: 2
							}, 1032, ["href"]);
						}), 128))]), __props.points.links.length > 3 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-10 flex justify-center"
						}, [createVNode("div", { class: "flex gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.points.links, (link) => {
							return openBlock(), createBlock(unref(Link), {
								key: link.label,
								href: link.url,
								innerHTML: link.label,
								class: ["px-3 py-1.5 rounded-lg text-sm transition-colors", link.active ? "bg-arbor-emerald/20 text-arbor-emerald border border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30 border border-transparent"]
							}, null, 8, [
								"href",
								"innerHTML",
								"class"
							]);
						}), 128))])])) : createCommentVNode("", true)])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ListeningPoints/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

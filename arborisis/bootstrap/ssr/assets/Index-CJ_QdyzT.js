import { t as _sfc_main$1 } from "./GuestLayout-CExMlVyB.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelText, watch, withCtx, withDirectives } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Creators/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		creators: {
			type: Object,
			default: () => ({ data: [] })
		},
		filters: {
			type: Object,
			default: () => ({ search: "" })
		}
	},
	setup(__props) {
		const search = ref(__props.filters.search || "");
		let searchTimeout = null;
		watch(search, (value) => {
			clearTimeout(searchTimeout);
			searchTimeout = setTimeout(() => {
				router.get(route("creators.index"), { search: value }, {
					preserveState: true,
					preserveScroll: true,
					replace: true
				});
			}, 300);
		});
		const getAvatarUrl = (creator) => {
			return creator?.profile?.avatar || null;
		};
		const getInitials = (name) => {
			return name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Créateurs" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-screen bg-arbor-night"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-40"${_scopeId}></div></div><div class="relative z-10 pt-28 pb-24 section-padding"${_scopeId}><div class="max-w-6xl mx-auto"${_scopeId}><div class="text-center mb-12 animate-fade-in"${_scopeId}><h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-arbor-cream leading-tight mb-4"${_scopeId}> Les enregistreurs de la nature </h1><p class="text-arbor-sage text-lg max-w-xl mx-auto"${_scopeId}> Découvrez les créateurs qui capturent et partagent les sons du monde vivant. </p></div><div class="max-w-md mx-auto mb-12 animate-slide-up"${_scopeId}><div class="relative"${_scopeId}><svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-arbor-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Rechercher un créateur..." class="w-full bg-arbor-charcoal/50 border border-arbor-fog/50 rounded-xl pl-12 pr-4 py-3 text-arbor-cream placeholder-arbor-sage/50 focus:border-arbor-moss/50 focus:ring-1 focus:ring-arbor-moss/30 outline-none transition-colors"${_scopeId}></div></div>`);
						if (__props.creators.data.length > 0) {
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(__props.creators.data, (creator, index) => {
								_push(ssrRenderComponent(unref(Link), {
									key: creator.id,
									href: _ctx.route("creators.show", creator.slug),
									class: "glass-card p-6 group hover:bg-white/10 transition-all duration-300 hover-lift",
									style: `animation: fadeInUp 0.5s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="flex items-center gap-4 mb-4"${_scopeId}><div class="relative"${_scopeId}>`);
											if (getAvatarUrl(creator)) _push(`<div class="w-16 h-16 rounded-2xl overflow-hidden bg-arbor-deep"${_scopeId}><img${ssrRenderAttr("src", getAvatarUrl(creator))} class="w-full h-full object-cover"${_scopeId}></div>`);
											else _push(`<div class="w-16 h-16 rounded-2xl bg-arbor-moss/20 flex items-center justify-center text-arbor-moss-light font-display text-xl"${_scopeId}>${ssrInterpolate(getInitials(creator.name))}</div>`);
											_push(`<div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-arbor-emerald border-2 border-arbor-night flex items-center justify-center"${_scopeId}><svg class="w-3 h-3 text-arbor-night" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div></div><div class="min-w-0"${_scopeId}><h3 class="text-arbor-cream font-semibold text-lg group-hover:text-arbor-emerald transition-colors truncate"${_scopeId}>${ssrInterpolate(creator.name)}</h3><p class="text-arbor-sage text-sm"${_scopeId}>${ssrInterpolate(creator.public_sounds_count)} son${ssrInterpolate(creator.public_sounds_count > 1 ? "s" : "")}</p></div></div><p class="text-arbor-sage text-sm leading-relaxed line-clamp-2"${_scopeId}>${ssrInterpolate(creator.profile?.bio || "Aucune bio pour le moment.")}</p>`);
										} else return [createVNode("div", { class: "flex items-center gap-4 mb-4" }, [createVNode("div", { class: "relative" }, [getAvatarUrl(creator) ? (openBlock(), createBlock("div", {
											key: 0,
											class: "w-16 h-16 rounded-2xl overflow-hidden bg-arbor-deep"
										}, [createVNode("img", {
											src: getAvatarUrl(creator),
											class: "w-full h-full object-cover"
										}, null, 8, ["src"])])) : (openBlock(), createBlock("div", {
											key: 1,
											class: "w-16 h-16 rounded-2xl bg-arbor-moss/20 flex items-center justify-center text-arbor-moss-light font-display text-xl"
										}, toDisplayString(getInitials(creator.name)), 1)), createVNode("div", { class: "absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-arbor-emerald border-2 border-arbor-night flex items-center justify-center" }, [(openBlock(), createBlock("svg", {
											class: "w-3 h-3 text-arbor-night",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24"
										}, [createVNode("path", {
											"stroke-linecap": "round",
											"stroke-linejoin": "round",
											"stroke-width": "3",
											d: "M5 13l4 4L19 7"
										})]))])]), createVNode("div", { class: "min-w-0" }, [createVNode("h3", { class: "text-arbor-cream font-semibold text-lg group-hover:text-arbor-emerald transition-colors truncate" }, toDisplayString(creator.name), 1), createVNode("p", { class: "text-arbor-sage text-sm" }, toDisplayString(creator.public_sounds_count) + " son" + toDisplayString(creator.public_sounds_count > 1 ? "s" : ""), 1)])]), createVNode("p", { class: "text-arbor-sage text-sm leading-relaxed line-clamp-2" }, toDisplayString(creator.profile?.bio || "Aucune bio pour le moment."), 1)];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else _push(`<div class="text-center py-20 glass-card animate-fade-in"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4"${_scopeId}><svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg></div><h3 class="font-display text-xl text-arbor-cream mb-2"${_scopeId}>Aucun créateur trouvé</h3><p class="text-arbor-sage text-sm"${_scopeId}>Essayez une autre recherche.</p></div>`);
						if (__props.creators.links && __props.creators.links.length > 3) {
							_push(`<div class="flex justify-center gap-2 mt-10"${_scopeId}><!--[-->`);
							ssrRenderList(__props.creators.links, (link) => {
								_push(ssrRenderComponent(unref(Link), {
									key: link.label,
									href: link.url,
									class: ["px-3 py-1 rounded-lg text-sm transition-colors", link.active ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-sage hover:bg-arbor-charcoal/50"],
									"preserve-state": ""
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						_push(`</div></div></div>`);
					} else return [createVNode("div", { class: "relative min-h-screen bg-arbor-night" }, [createVNode("div", {
						class: "absolute inset-0 overflow-hidden pointer-events-none",
						"aria-hidden": "true"
					}, [createVNode("div", { class: "absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-40" })]), createVNode("div", { class: "relative z-10 pt-28 pb-24 section-padding" }, [createVNode("div", { class: "max-w-6xl mx-auto" }, [
						createVNode("div", { class: "text-center mb-12 animate-fade-in" }, [createVNode("h1", { class: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-arbor-cream leading-tight mb-4" }, " Les enregistreurs de la nature "), createVNode("p", { class: "text-arbor-sage text-lg max-w-xl mx-auto" }, " Découvrez les créateurs qui capturent et partagent les sons du monde vivant. ")]),
						createVNode("div", { class: "max-w-md mx-auto mb-12 animate-slide-up" }, [createVNode("div", { class: "relative" }, [(openBlock(), createBlock("svg", {
							class: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-arbor-sage",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "1.5",
							d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						})])), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => search.value = $event,
							type: "text",
							placeholder: "Rechercher un créateur...",
							class: "w-full bg-arbor-charcoal/50 border border-arbor-fog/50 rounded-xl pl-12 pr-4 py-3 text-arbor-cream placeholder-arbor-sage/50 focus:border-arbor-moss/50 focus:ring-1 focus:ring-arbor-moss/30 outline-none transition-colors"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, search.value]])])]),
						__props.creators.data.length > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.creators.data, (creator, index) => {
							return openBlock(), createBlock(unref(Link), {
								key: creator.id,
								href: _ctx.route("creators.show", creator.slug),
								class: "glass-card p-6 group hover:bg-white/10 transition-all duration-300 hover-lift",
								style: `animation: fadeInUp 0.5s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`
							}, {
								default: withCtx(() => [createVNode("div", { class: "flex items-center gap-4 mb-4" }, [createVNode("div", { class: "relative" }, [getAvatarUrl(creator) ? (openBlock(), createBlock("div", {
									key: 0,
									class: "w-16 h-16 rounded-2xl overflow-hidden bg-arbor-deep"
								}, [createVNode("img", {
									src: getAvatarUrl(creator),
									class: "w-full h-full object-cover"
								}, null, 8, ["src"])])) : (openBlock(), createBlock("div", {
									key: 1,
									class: "w-16 h-16 rounded-2xl bg-arbor-moss/20 flex items-center justify-center text-arbor-moss-light font-display text-xl"
								}, toDisplayString(getInitials(creator.name)), 1)), createVNode("div", { class: "absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-arbor-emerald border-2 border-arbor-night flex items-center justify-center" }, [(openBlock(), createBlock("svg", {
									class: "w-3 h-3 text-arbor-night",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "3",
									d: "M5 13l4 4L19 7"
								})]))])]), createVNode("div", { class: "min-w-0" }, [createVNode("h3", { class: "text-arbor-cream font-semibold text-lg group-hover:text-arbor-emerald transition-colors truncate" }, toDisplayString(creator.name), 1), createVNode("p", { class: "text-arbor-sage text-sm" }, toDisplayString(creator.public_sounds_count) + " son" + toDisplayString(creator.public_sounds_count > 1 ? "s" : ""), 1)])]), createVNode("p", { class: "text-arbor-sage text-sm leading-relaxed line-clamp-2" }, toDisplayString(creator.profile?.bio || "Aucune bio pour le moment."), 1)]),
								_: 2
							}, 1032, ["href", "style"]);
						}), 128))])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "text-center py-20 glass-card animate-fade-in"
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
								d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
							})]))]),
							createVNode("h3", { class: "font-display text-xl text-arbor-cream mb-2" }, "Aucun créateur trouvé"),
							createVNode("p", { class: "text-arbor-sage text-sm" }, "Essayez une autre recherche.")
						])),
						__props.creators.links && __props.creators.links.length > 3 ? (openBlock(), createBlock("div", {
							key: 2,
							class: "flex justify-center gap-2 mt-10"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.creators.links, (link) => {
							return openBlock(), createBlock(unref(Link), {
								key: link.label,
								href: link.url,
								innerHTML: link.label,
								class: ["px-3 py-1 rounded-lg text-sm transition-colors", link.active ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-sage hover:bg-arbor-charcoal/50"],
								"preserve-state": ""
							}, null, 8, [
								"href",
								"innerHTML",
								"class"
							]);
						}), 128))])) : createCommentVNode("", true)
					])])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Creators/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

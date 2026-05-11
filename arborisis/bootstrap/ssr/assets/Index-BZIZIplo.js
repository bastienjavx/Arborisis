import { t as _sfc_main$1 } from "./GuestLayout-D7OewCdf.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Sounds/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		sounds: Object,
		categories: Array
	},
	setup(__props) {
		const props = __props;
		const selectedCategory = ref("");
		const filteredSounds = computed(() => {
			if (!selectedCategory.value) return props.sounds.data;
			return props.sounds.data.filter((s) => s.category_id === selectedCategory.value);
		});
		const isNew = (createdAt) => {
			if (!createdAt) return false;
			const date = new Date(createdAt);
			return (/* @__PURE__ */ new Date() - date) / (1e3 * 60 * 60 * 24) < 7;
		};
		const formatDuration = (seconds) => {
			if (!seconds) return "--:--";
			return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Sons naturels" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="pt-24 pb-16"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-12"${_scopeId}><h1 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4"${_scopeId}> Sons naturels </h1><p class="text-arbor-sage max-w-xl"${_scopeId}> Explorez les enregistrements géolocalisés de notre communauté de field recorders. </p></div><div class="flex flex-wrap gap-2 mb-8"${_scopeId}><button class="${ssrRenderClass([selectedCategory.value === "" ? "bg-arbor-emerald/15 text-arbor-emerald border border-arbor-emerald/30 shadow-sm shadow-arbor-emerald/5" : "bg-arbor-glass text-arbor-sage hover:bg-white/10 border border-transparent", "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"])}"${_scopeId}> Tous </button><!--[-->`);
						ssrRenderList(__props.categories, (category) => {
							_push(`<button class="${ssrRenderClass([selectedCategory.value === category.id ? "bg-arbor-emerald/15 text-arbor-emerald border border-arbor-emerald/30 shadow-sm shadow-arbor-emerald/5" : "bg-arbor-glass text-arbor-sage hover:bg-white/10 border border-transparent", "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"])}"${_scopeId}>${ssrInterpolate(category.name)}</button>`);
						});
						_push(`<!--]--></div><div class="mb-6 text-sm text-arbor-sage"${_scopeId}><span class="text-arbor-emerald font-medium"${_scopeId}>${ssrInterpolate(filteredSounds.value.length)}</span> son${ssrInterpolate(filteredSounds.value.length > 1 ? "s" : "")} trouvé${ssrInterpolate(filteredSounds.value.length > 1 ? "s" : "")}</div>`);
						if (filteredSounds.value.length > 0) {
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(filteredSounds.value, (sound, index) => {
								_push(ssrRenderComponent(unref(Link), {
									key: sound.id,
									href: _ctx.route("sounds.show", sound.slug),
									class: "glass-card overflow-hidden hover:bg-white/10 transition-all duration-300 group hover-lift",
									style: `animation: fadeInUp 0.5s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="aspect-[16/9] bg-arbor-deep relative overflow-hidden"${_scopeId}>`);
											if (sound.cover_url) _push(`<div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style="${ssrRenderStyle(`background-image: url(${sound.cover_url})`)}" loading="lazy"${_scopeId}></div>`);
											else _push(`<div class="absolute inset-0 flex items-center justify-center"${_scopeId}><svg class="w-12 h-12 text-arbor-moss/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div>`);
											_push(`<div class="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-arbor-night/80 text-xs text-arbor-cream"${_scopeId}>${ssrInterpolate(formatDuration(sound.duration))}</div>`);
											if (isNew(sound.created_at)) _push(`<div class="absolute top-2 left-2"${_scopeId}><span class="badge badge-emerald text-[10px]"${_scopeId}>Nouveau</span></div>`);
											else _push(`<!---->`);
											_push(`<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"${_scopeId}><div class="w-14 h-14 rounded-full bg-arbor-emerald/90 flex items-center justify-center shadow-lg shadow-arbor-emerald/30 transition-transform group-hover:scale-110"${_scopeId}><svg class="w-6 h-6 text-arbor-night ml-1" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M8 5v14l11-7z"${_scopeId}></path></svg></div></div></div><div class="p-5"${_scopeId}><h3 class="font-semibold text-arbor-cream mb-1 group-hover:text-arbor-emerald transition-colors"${_scopeId}>${ssrInterpolate(sound.title)}</h3><p class="text-sm text-arbor-sage mb-3"${_scopeId}>${ssrInterpolate(sound.user?.name ?? "Anonyme")}</p><div class="flex items-center gap-3 text-xs text-arbor-sage"${_scopeId}><span class="flex items-center gap-1"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg> ${ssrInterpolate(sound.play_count)}</span><span class="flex items-center gap-1"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"${_scopeId}></path></svg> ${ssrInterpolate(sound.like_count)}</span></div></div>`);
										} else return [createVNode("div", { class: "aspect-[16/9] bg-arbor-deep relative overflow-hidden" }, [
											sound.cover_url ? (openBlock(), createBlock("div", {
												key: 0,
												class: "absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105",
												style: `background-image: url(${sound.cover_url})`,
												loading: "lazy"
											}, null, 4)) : (openBlock(), createBlock("div", {
												key: 1,
												class: "absolute inset-0 flex items-center justify-center"
											}, [(openBlock(), createBlock("svg", {
												class: "w-12 h-12 text-arbor-moss/30",
												fill: "none",
												stroke: "currentColor",
												viewBox: "0 0 24 24"
											}, [createVNode("path", {
												"stroke-linecap": "round",
												"stroke-linejoin": "round",
												"stroke-width": "1",
												d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
											})]))])),
											createVNode("div", { class: "absolute bottom-2 right-2 px-2 py-1 rounded-md bg-arbor-night/80 text-xs text-arbor-cream" }, toDisplayString(formatDuration(sound.duration)), 1),
											isNew(sound.created_at) ? (openBlock(), createBlock("div", {
												key: 2,
												class: "absolute top-2 left-2"
											}, [createVNode("span", { class: "badge badge-emerald text-[10px]" }, "Nouveau")])) : createCommentVNode("", true),
											createVNode("div", { class: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" }, [createVNode("div", { class: "w-14 h-14 rounded-full bg-arbor-emerald/90 flex items-center justify-center shadow-lg shadow-arbor-emerald/30 transition-transform group-hover:scale-110" }, [(openBlock(), createBlock("svg", {
												class: "w-6 h-6 text-arbor-night ml-1",
												fill: "currentColor",
												viewBox: "0 0 24 24"
											}, [createVNode("path", { d: "M8 5v14l11-7z" })]))])])
										]), createVNode("div", { class: "p-5" }, [
											createVNode("h3", { class: "font-semibold text-arbor-cream mb-1 group-hover:text-arbor-emerald transition-colors" }, toDisplayString(sound.title), 1),
											createVNode("p", { class: "text-sm text-arbor-sage mb-3" }, toDisplayString(sound.user?.name ?? "Anonyme"), 1),
											createVNode("div", { class: "flex items-center gap-3 text-xs text-arbor-sage" }, [createVNode("span", { class: "flex items-center gap-1" }, [(openBlock(), createBlock("svg", {
												class: "w-4 h-4",
												fill: "none",
												stroke: "currentColor",
												viewBox: "0 0 24 24"
											}, [createVNode("path", {
												"stroke-linecap": "round",
												"stroke-linejoin": "round",
												"stroke-width": "2",
												d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											}), createVNode("path", {
												"stroke-linecap": "round",
												"stroke-linejoin": "round",
												"stroke-width": "2",
												d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											})])), createTextVNode(" " + toDisplayString(sound.play_count), 1)]), createVNode("span", { class: "flex items-center gap-1" }, [(openBlock(), createBlock("svg", {
												class: "w-4 h-4",
												fill: "none",
												stroke: "currentColor",
												viewBox: "0 0 24 24"
											}, [createVNode("path", {
												"stroke-linecap": "round",
												"stroke-linejoin": "round",
												"stroke-width": "2",
												d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
											})])), createTextVNode(" " + toDisplayString(sound.like_count), 1)])])
										])];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else {
							_push(`<div class="text-center py-24"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4"${_scopeId}><svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-arbor-cream mb-2"${_scopeId}>Aucun son pour le moment</h3><p class="text-arbor-sage mb-6"${_scopeId}>Soyez le premier à publier un enregistrement naturel.</p>`);
							if (_ctx.$page.props.auth.user) _push(ssrRenderComponent(unref(Link), {
								href: "/sounds/create",
								class: "btn-primary"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Publier un son `);
									else return [createTextVNode(" Publier un son ")];
								}),
								_: 1
							}, _parent, _scopeId));
							else _push(ssrRenderComponent(unref(Link), {
								href: "/register",
								class: "btn-primary"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Créer un compte `);
									else return [createTextVNode(" Créer un compte ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						}
						if (__props.sounds.links && __props.sounds.links.length > 3) {
							_push(`<div class="mt-12 flex justify-center"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><!--[-->`);
							ssrRenderList(__props.sounds.links, (link, index) => {
								_push(`<!--[-->`);
								if (link.url) _push(ssrRenderComponent(unref(Link), {
									href: link.url,
									class: ["px-4 py-2 rounded-lg text-sm transition-colors", link.active ? "bg-arbor-emerald/15 text-arbor-emerald border border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass border border-transparent"]
								}, null, _parent, _scopeId));
								else _push(`<span class="px-4 py-2 rounded-lg text-sm text-arbor-sage/50"${_scopeId}>${link.label ?? ""}</span>`);
								_push(`<!--]-->`);
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "pt-24 pb-16" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "mb-12" }, [createVNode("h1", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4" }, " Sons naturels "), createVNode("p", { class: "text-arbor-sage max-w-xl" }, " Explorez les enregistrements géolocalisés de notre communauté de field recorders. ")]),
						createVNode("div", { class: "flex flex-wrap gap-2 mb-8" }, [createVNode("button", {
							onClick: ($event) => selectedCategory.value = "",
							class: ["px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200", selectedCategory.value === "" ? "bg-arbor-emerald/15 text-arbor-emerald border border-arbor-emerald/30 shadow-sm shadow-arbor-emerald/5" : "bg-arbor-glass text-arbor-sage hover:bg-white/10 border border-transparent"]
						}, " Tous ", 10, ["onClick"]), (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
							return openBlock(), createBlock("button", {
								key: category.id,
								onClick: ($event) => selectedCategory.value = selectedCategory.value === category.id ? "" : category.id,
								class: ["px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200", selectedCategory.value === category.id ? "bg-arbor-emerald/15 text-arbor-emerald border border-arbor-emerald/30 shadow-sm shadow-arbor-emerald/5" : "bg-arbor-glass text-arbor-sage hover:bg-white/10 border border-transparent"]
							}, toDisplayString(category.name), 11, ["onClick"]);
						}), 128))]),
						createVNode("div", { class: "mb-6 text-sm text-arbor-sage" }, [createVNode("span", { class: "text-arbor-emerald font-medium" }, toDisplayString(filteredSounds.value.length), 1), createTextVNode(" son" + toDisplayString(filteredSounds.value.length > 1 ? "s" : "") + " trouvé" + toDisplayString(filteredSounds.value.length > 1 ? "s" : ""), 1)]),
						filteredSounds.value.length > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(filteredSounds.value, (sound, index) => {
							return openBlock(), createBlock(unref(Link), {
								key: sound.id,
								href: _ctx.route("sounds.show", sound.slug),
								class: "glass-card overflow-hidden hover:bg-white/10 transition-all duration-300 group hover-lift",
								style: `animation: fadeInUp 0.5s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`
							}, {
								default: withCtx(() => [createVNode("div", { class: "aspect-[16/9] bg-arbor-deep relative overflow-hidden" }, [
									sound.cover_url ? (openBlock(), createBlock("div", {
										key: 0,
										class: "absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105",
										style: `background-image: url(${sound.cover_url})`,
										loading: "lazy"
									}, null, 4)) : (openBlock(), createBlock("div", {
										key: 1,
										class: "absolute inset-0 flex items-center justify-center"
									}, [(openBlock(), createBlock("svg", {
										class: "w-12 h-12 text-arbor-moss/30",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "1",
										d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
									})]))])),
									createVNode("div", { class: "absolute bottom-2 right-2 px-2 py-1 rounded-md bg-arbor-night/80 text-xs text-arbor-cream" }, toDisplayString(formatDuration(sound.duration)), 1),
									isNew(sound.created_at) ? (openBlock(), createBlock("div", {
										key: 2,
										class: "absolute top-2 left-2"
									}, [createVNode("span", { class: "badge badge-emerald text-[10px]" }, "Nouveau")])) : createCommentVNode("", true),
									createVNode("div", { class: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" }, [createVNode("div", { class: "w-14 h-14 rounded-full bg-arbor-emerald/90 flex items-center justify-center shadow-lg shadow-arbor-emerald/30 transition-transform group-hover:scale-110" }, [(openBlock(), createBlock("svg", {
										class: "w-6 h-6 text-arbor-night ml-1",
										fill: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", { d: "M8 5v14l11-7z" })]))])])
								]), createVNode("div", { class: "p-5" }, [
									createVNode("h3", { class: "font-semibold text-arbor-cream mb-1 group-hover:text-arbor-emerald transition-colors" }, toDisplayString(sound.title), 1),
									createVNode("p", { class: "text-sm text-arbor-sage mb-3" }, toDisplayString(sound.user?.name ?? "Anonyme"), 1),
									createVNode("div", { class: "flex items-center gap-3 text-xs text-arbor-sage" }, [createVNode("span", { class: "flex items-center gap-1" }, [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									}), createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									})])), createTextVNode(" " + toDisplayString(sound.play_count), 1)]), createVNode("span", { class: "flex items-center gap-1" }, [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									})])), createTextVNode(" " + toDisplayString(sound.like_count), 1)])])
								])]),
								_: 2
							}, 1032, ["href", "style"]);
						}), 128))])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "text-center py-24"
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
							createVNode("h3", { class: "text-lg font-semibold text-arbor-cream mb-2" }, "Aucun son pour le moment"),
							createVNode("p", { class: "text-arbor-sage mb-6" }, "Soyez le premier à publier un enregistrement naturel."),
							_ctx.$page.props.auth.user ? (openBlock(), createBlock(unref(Link), {
								key: 0,
								href: "/sounds/create",
								class: "btn-primary"
							}, {
								default: withCtx(() => [createTextVNode(" Publier un son ")]),
								_: 1
							})) : (openBlock(), createBlock(unref(Link), {
								key: 1,
								href: "/register",
								class: "btn-primary"
							}, {
								default: withCtx(() => [createTextVNode(" Créer un compte ")]),
								_: 1
							}))
						])),
						__props.sounds.links && __props.sounds.links.length > 3 ? (openBlock(), createBlock("div", {
							key: 2,
							class: "mt-12 flex justify-center"
						}, [createVNode("div", { class: "flex items-center gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.sounds.links, (link, index) => {
							return openBlock(), createBlock(Fragment, { key: index }, [link.url ? (openBlock(), createBlock(unref(Link), {
								key: 0,
								href: link.url,
								class: ["px-4 py-2 rounded-lg text-sm transition-colors", link.active ? "bg-arbor-emerald/15 text-arbor-emerald border border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass border border-transparent"],
								innerHTML: link.label
							}, null, 8, [
								"href",
								"class",
								"innerHTML"
							])) : (openBlock(), createBlock("span", {
								key: 1,
								class: "px-4 py-2 rounded-lg text-sm text-arbor-sage/50",
								innerHTML: link.label
							}, null, 8, ["innerHTML"]))], 64);
						}), 128))])])) : createCommentVNode("", true)
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Sounds/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

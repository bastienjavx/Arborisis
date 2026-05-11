import { t as _sfc_main$1 } from "./GuestLayout-D7OewCdf.js";
import { t as _sfc_main$2 } from "./FollowButton-D5RJN_lj.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Profile/Show.vue
var _sfc_main = {
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		creator: Object,
		sounds: Object,
		stats: Object,
		avatarUrl: String,
		isFollowing: Boolean
	},
	setup(__props) {
		const formatDuration = (seconds) => {
			if (!seconds) return "--:--";
			return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
		};
		const isNew = (createdAt) => {
			if (!createdAt) return false;
			const date = new Date(createdAt);
			return (/* @__PURE__ */ new Date() - date) / (1e3 * 60 * 60 * 24) < 7;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: __props.creator.name }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="pt-24 pb-16"${_scopeId}><div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="glass-card p-6 sm:p-8 mb-8 relative overflow-hidden"${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-arbor-moss/5 via-transparent to-arbor-emerald/5 pointer-events-none"${_scopeId}></div><div class="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6"${_scopeId}><div class="w-24 h-24 rounded-full bg-arbor-moss/30 flex items-center justify-center shrink-0 overflow-hidden ring-4 ring-arbor-glass-border/50"${_scopeId}>`);
						if (__props.avatarUrl) _push(`<img${ssrRenderAttr("src", __props.avatarUrl)}${ssrRenderAttr("alt", __props.creator.name)} class="w-full h-full object-cover" loading="lazy"${_scopeId}>`);
						else _push(`<span class="text-3xl font-display font-bold text-arbor-emerald"${_scopeId}>${ssrInterpolate(__props.creator.name?.charAt(0)?.toUpperCase() ?? "?")}</span>`);
						_push(`</div><div class="flex-1 text-center sm:text-left"${_scopeId}><h1 class="font-display text-2xl sm:text-3xl font-bold text-arbor-cream mb-2"${_scopeId}>${ssrInterpolate(__props.creator.name)}</h1>`);
						if (__props.creator.profile?.bio) _push(`<p class="text-arbor-sage mb-4 max-w-xl"${_scopeId}>${ssrInterpolate(__props.creator.profile.bio)}</p>`);
						else _push(`<!---->`);
						_push(`<div class="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-arbor-sage mb-4"${_scopeId}><div class="flex items-center gap-1 group cursor-default"${_scopeId}><span class="font-semibold text-arbor-cream transition-transform group-hover:scale-110"${_scopeId}>${ssrInterpolate(__props.stats.sounds_count)}</span><span${_scopeId}>son${ssrInterpolate(__props.stats.sounds_count > 1 ? "s" : "")}</span></div><div class="flex items-center gap-1 group cursor-default"${_scopeId}><span class="font-semibold text-arbor-cream transition-transform group-hover:scale-110"${_scopeId}>${ssrInterpolate(__props.stats.followers_count)}</span><span${_scopeId}>abonné${ssrInterpolate(__props.stats.followers_count > 1 ? "s" : "")}</span></div><div class="flex items-center gap-1 group cursor-default"${_scopeId}><span class="font-semibold text-arbor-cream transition-transform group-hover:scale-110"${_scopeId}>${ssrInterpolate(__props.stats.following_count)}</span><span${_scopeId}>abonnements</span></div><div class="flex items-center gap-1 group cursor-default"${_scopeId}><span class="font-semibold text-arbor-cream transition-transform group-hover:scale-110"${_scopeId}>${ssrInterpolate(__props.stats.total_plays)}</span><span${_scopeId}>écoutes</span></div></div>`);
						if (_ctx.$page.props.auth.user && _ctx.$page.props.auth.user.id !== __props.creator.id) _push(ssrRenderComponent(_sfc_main$2, {
							"user-id": __props.creator.id,
							"initial-following": __props.isFollowing,
							size: "md"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div></div></div>`);
						if (__props.sounds.data.length > 0) {
							_push(`<div${_scopeId}><h2 class="font-semibold text-arbor-cream mb-6 text-lg"${_scopeId}>Enregistrements</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(__props.sounds.data, (sound, index) => {
								_push(ssrRenderComponent(unref(Link), {
									key: sound.id,
									href: _ctx.route("sounds.show", sound.slug),
									class: "glass-card overflow-hidden hover:bg-white/10 transition-all duration-300 group hover-lift",
									style: `animation: fadeInUp 0.5s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="aspect-[16/9] bg-arbor-deep relative overflow-hidden"${_scopeId}>`);
											if (sound.cover_url) _push(`<div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style="${ssrRenderStyle(`background-image: url(${sound.cover_url})`)}"${_scopeId}></div>`);
											else _push(`<div class="absolute inset-0 flex items-center justify-center"${_scopeId}><svg class="w-12 h-12 text-arbor-moss/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div>`);
											_push(`<div class="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-arbor-night/80 text-xs text-arbor-cream"${_scopeId}>${ssrInterpolate(formatDuration(sound.duration))}</div>`);
											if (isNew(sound.created_at)) _push(`<div class="absolute top-2 left-2"${_scopeId}><span class="badge badge-emerald text-[10px]"${_scopeId}>Nouveau</span></div>`);
											else _push(`<!---->`);
											_push(`<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"${_scopeId}><div class="w-14 h-14 rounded-full bg-arbor-emerald/90 flex items-center justify-center shadow-lg shadow-arbor-emerald/30 transition-transform group-hover:scale-110"${_scopeId}><svg class="w-6 h-6 text-arbor-night ml-1" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M8 5v14l11-7z"${_scopeId}></path></svg></div></div></div><div class="p-5"${_scopeId}><h3 class="font-semibold text-arbor-cream mb-1 group-hover:text-arbor-emerald transition-colors"${_scopeId}>${ssrInterpolate(sound.title)}</h3><div class="flex items-center gap-3 text-xs text-arbor-sage"${_scopeId}><span class="flex items-center gap-1"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg> ${ssrInterpolate(sound.play_count)}</span><span class="flex items-center gap-1"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"${_scopeId}></path></svg> ${ssrInterpolate(sound.like_count)}</span></div></div>`);
										} else return [createVNode("div", { class: "aspect-[16/9] bg-arbor-deep relative overflow-hidden" }, [
											sound.cover_url ? (openBlock(), createBlock("div", {
												key: 0,
												class: "absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105",
												style: `background-image: url(${sound.cover_url})`
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
										]), createVNode("div", { class: "p-5" }, [createVNode("h3", { class: "font-semibold text-arbor-cream mb-1 group-hover:text-arbor-emerald transition-colors" }, toDisplayString(sound.title), 1), createVNode("div", { class: "flex items-center gap-3 text-xs text-arbor-sage" }, [createVNode("span", { class: "flex items-center gap-1" }, [(openBlock(), createBlock("svg", {
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
										})])), createTextVNode(" " + toDisplayString(sound.like_count), 1)])])])];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<div class="text-center py-16"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4"${_scopeId}><svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-arbor-cream mb-2"${_scopeId}>Aucun son publié</h3><p class="text-arbor-sage"${_scopeId}>Ce créateur n&#39;a pas encore publié d&#39;enregistrements.</p></div>`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "pt-24 pb-16" }, [createVNode("div", { class: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "glass-card p-6 sm:p-8 mb-8 relative overflow-hidden" }, [createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-arbor-moss/5 via-transparent to-arbor-emerald/5 pointer-events-none" }), createVNode("div", { class: "relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6" }, [createVNode("div", { class: "w-24 h-24 rounded-full bg-arbor-moss/30 flex items-center justify-center shrink-0 overflow-hidden ring-4 ring-arbor-glass-border/50" }, [__props.avatarUrl ? (openBlock(), createBlock("img", {
						key: 0,
						src: __props.avatarUrl,
						alt: __props.creator.name,
						class: "w-full h-full object-cover",
						loading: "lazy"
					}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
						key: 1,
						class: "text-3xl font-display font-bold text-arbor-emerald"
					}, toDisplayString(__props.creator.name?.charAt(0)?.toUpperCase() ?? "?"), 1))]), createVNode("div", { class: "flex-1 text-center sm:text-left" }, [
						createVNode("h1", { class: "font-display text-2xl sm:text-3xl font-bold text-arbor-cream mb-2" }, toDisplayString(__props.creator.name), 1),
						__props.creator.profile?.bio ? (openBlock(), createBlock("p", {
							key: 0,
							class: "text-arbor-sage mb-4 max-w-xl"
						}, toDisplayString(__props.creator.profile.bio), 1)) : createCommentVNode("", true),
						createVNode("div", { class: "flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-arbor-sage mb-4" }, [
							createVNode("div", { class: "flex items-center gap-1 group cursor-default" }, [createVNode("span", { class: "font-semibold text-arbor-cream transition-transform group-hover:scale-110" }, toDisplayString(__props.stats.sounds_count), 1), createVNode("span", null, "son" + toDisplayString(__props.stats.sounds_count > 1 ? "s" : ""), 1)]),
							createVNode("div", { class: "flex items-center gap-1 group cursor-default" }, [createVNode("span", { class: "font-semibold text-arbor-cream transition-transform group-hover:scale-110" }, toDisplayString(__props.stats.followers_count), 1), createVNode("span", null, "abonné" + toDisplayString(__props.stats.followers_count > 1 ? "s" : ""), 1)]),
							createVNode("div", { class: "flex items-center gap-1 group cursor-default" }, [createVNode("span", { class: "font-semibold text-arbor-cream transition-transform group-hover:scale-110" }, toDisplayString(__props.stats.following_count), 1), createVNode("span", null, "abonnements")]),
							createVNode("div", { class: "flex items-center gap-1 group cursor-default" }, [createVNode("span", { class: "font-semibold text-arbor-cream transition-transform group-hover:scale-110" }, toDisplayString(__props.stats.total_plays), 1), createVNode("span", null, "écoutes")])
						]),
						_ctx.$page.props.auth.user && _ctx.$page.props.auth.user.id !== __props.creator.id ? (openBlock(), createBlock(_sfc_main$2, {
							key: 1,
							"user-id": __props.creator.id,
							"initial-following": __props.isFollowing,
							size: "md"
						}, null, 8, ["user-id", "initial-following"])) : createCommentVNode("", true)
					])])]), __props.sounds.data.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("h2", { class: "font-semibold text-arbor-cream mb-6 text-lg" }, "Enregistrements"), createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.sounds.data, (sound, index) => {
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
									style: `background-image: url(${sound.cover_url})`
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
							]), createVNode("div", { class: "p-5" }, [createVNode("h3", { class: "font-semibold text-arbor-cream mb-1 group-hover:text-arbor-emerald transition-colors" }, toDisplayString(sound.title), 1), createVNode("div", { class: "flex items-center gap-3 text-xs text-arbor-sage" }, [createVNode("span", { class: "flex items-center gap-1" }, [(openBlock(), createBlock("svg", {
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
							})])), createTextVNode(" " + toDisplayString(sound.like_count), 1)])])])]),
							_: 2
						}, 1032, ["href", "style"]);
					}), 128))])])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "text-center py-16"
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
						createVNode("h3", { class: "text-lg font-semibold text-arbor-cream mb-2" }, "Aucun son publié"),
						createVNode("p", { class: "text-arbor-sage" }, "Ce créateur n'a pas encore publié d'enregistrements.")
					]))])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

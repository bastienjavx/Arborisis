import { t as _sfc_main$2 } from "./GuestLayout-BBezdEIa.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Components/Blog/BlogPostCard.vue
var _sfc_main$1 = {
	__name: "BlogPostCard",
	__ssrInlineRender: true,
	props: { post: {
		type: Object,
		required: true
	} },
	setup(__props) {
		const formatDate = (dateString) => {
			if (!dateString) return "";
			const date = new Date(dateString);
			return new Intl.DateTimeFormat("fr-FR", {
				day: "numeric",
				month: "long",
				year: "numeric"
			}).format(date);
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Link), mergeProps({
				href: _ctx.route("blog.show", __props.post.slug),
				class: "group block glass-card hover:bg-white/10 transition-all duration-300 hover-lift overflow-hidden"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (__props.post.cover_image) _push(`<div class="aspect-[16/9] overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", __props.post.cover_image)}${ssrRenderAttr("alt", __props.post.title)} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"${_scopeId}></div>`);
						else _push(`<div class="aspect-[16/9] bg-gradient-to-br from-arbor-moss/20 to-arbor-emerald/10 flex items-center justify-center"${_scopeId}><svg class="w-12 h-12 text-arbor-moss/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div>`);
						_push(`<div class="p-6"${_scopeId}><div class="flex items-center gap-3 mb-3"${_scopeId}><span class="text-xs font-medium text-arbor-emerald bg-arbor-emerald/10 px-2.5 py-1 rounded-full"${_scopeId}> Chronique </span><span class="text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDate(__props.post.published_at))}</span></div><h2 class="font-display text-xl font-bold text-arbor-cream mb-2 group-hover:text-arbor-emerald transition-colors line-clamp-2"${_scopeId}>${ssrInterpolate(__props.post.title)}</h2>`);
						if (__props.post.subtitle) _push(`<p class="text-arbor-sage text-sm leading-relaxed line-clamp-2 mb-3"${_scopeId}>${ssrInterpolate(__props.post.subtitle)}</p>`);
						else if (__props.post.excerpt) _push(`<p class="text-arbor-sage text-sm leading-relaxed line-clamp-3 mb-3"${_scopeId}>${ssrInterpolate(__props.post.excerpt)}</p>`);
						else _push(`<!---->`);
						_push(`<div class="flex items-center text-arbor-emerald text-sm font-medium group-hover:translate-x-1 transition-transform"${_scopeId}> Lire la chronique <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg></div></div>`);
					} else return [__props.post.cover_image ? (openBlock(), createBlock("div", {
						key: 0,
						class: "aspect-[16/9] overflow-hidden"
					}, [createVNode("img", {
						src: __props.post.cover_image,
						alt: __props.post.title,
						class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
						loading: "lazy"
					}, null, 8, ["src", "alt"])])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "aspect-[16/9] bg-gradient-to-br from-arbor-moss/20 to-arbor-emerald/10 flex items-center justify-center"
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
					})]))])), createVNode("div", { class: "p-6" }, [
						createVNode("div", { class: "flex items-center gap-3 mb-3" }, [createVNode("span", { class: "text-xs font-medium text-arbor-emerald bg-arbor-emerald/10 px-2.5 py-1 rounded-full" }, " Chronique "), createVNode("span", { class: "text-xs text-arbor-sage" }, toDisplayString(formatDate(__props.post.published_at)), 1)]),
						createVNode("h2", { class: "font-display text-xl font-bold text-arbor-cream mb-2 group-hover:text-arbor-emerald transition-colors line-clamp-2" }, toDisplayString(__props.post.title), 1),
						__props.post.subtitle ? (openBlock(), createBlock("p", {
							key: 0,
							class: "text-arbor-sage text-sm leading-relaxed line-clamp-2 mb-3"
						}, toDisplayString(__props.post.subtitle), 1)) : __props.post.excerpt ? (openBlock(), createBlock("p", {
							key: 1,
							class: "text-arbor-sage text-sm leading-relaxed line-clamp-3 mb-3"
						}, toDisplayString(__props.post.excerpt), 1)) : createCommentVNode("", true),
						createVNode("div", { class: "flex items-center text-arbor-emerald text-sm font-medium group-hover:translate-x-1 transition-transform" }, [createTextVNode(" Lire la chronique "), (openBlock(), createBlock("svg", {
							class: "w-4 h-4 ml-1.5",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M17 8l4 4m0 0l-4 4m4-4H3"
						})]))])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Blog/BlogPostCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Blog/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: { posts: {
		type: Object,
		default: () => ({ data: [] })
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Chroniques du monde sonore" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$2, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-screen bg-arbor-night"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-40"${_scopeId}></div></div><div class="relative z-10 pt-28 pb-24 section-padding"${_scopeId}><div class="max-w-6xl mx-auto"${_scopeId}><div class="text-center mb-16 animate-fade-in"${_scopeId}><h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-arbor-cream leading-tight mb-5"${_scopeId}> Chroniques du monde sonore </h1><div class="w-16 h-px bg-arbor-emerald/30 mx-auto mb-6"${_scopeId}></div><p class="text-arbor-sage text-lg max-w-xl mx-auto leading-relaxed"${_scopeId}> Récits, réflexions et découvertes sur l&#39;art du field recording et l&#39;écologie sonore. </p><p class="text-arbor-sage/60 text-sm mt-3"${_scopeId}> Chaque jour, une nouvelle chronique rédigée par notre intelligence artificielle naturaliste. </p></div>`);
						if (__props.posts.data.length > 0) {
							_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(__props.posts.data, (post, index) => {
								_push(ssrRenderComponent(_sfc_main$1, {
									key: post.id,
									post,
									style: `animation: fadeInUp 0.5s ease-out forwards; animation-delay: ${index * .08}s; opacity: 0;`
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else _push(`<div class="text-center py-20 glass-card animate-fade-in"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4"${_scopeId}><svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div><h3 class="font-display text-xl text-arbor-cream mb-2"${_scopeId}>Aucune chronique pour le moment</h3><p class="text-arbor-sage text-sm"${_scopeId}>Les premières chroniques apparaîtront très bientôt.</p></div>`);
						if (__props.posts.links && __props.posts.links.length > 3) {
							_push(`<div class="flex justify-center gap-2 mt-12"${_scopeId}><!--[-->`);
							ssrRenderList(__props.posts.links, (link) => {
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
						createVNode("div", { class: "text-center mb-16 animate-fade-in" }, [
							createVNode("h1", { class: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-arbor-cream leading-tight mb-5" }, " Chroniques du monde sonore "),
							createVNode("div", { class: "w-16 h-px bg-arbor-emerald/30 mx-auto mb-6" }),
							createVNode("p", { class: "text-arbor-sage text-lg max-w-xl mx-auto leading-relaxed" }, " Récits, réflexions et découvertes sur l'art du field recording et l'écologie sonore. "),
							createVNode("p", { class: "text-arbor-sage/60 text-sm mt-3" }, " Chaque jour, une nouvelle chronique rédigée par notre intelligence artificielle naturaliste. ")
						]),
						__props.posts.data.length > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.posts.data, (post, index) => {
							return openBlock(), createBlock(_sfc_main$1, {
								key: post.id,
								post,
								style: `animation: fadeInUp 0.5s ease-out forwards; animation-delay: ${index * .08}s; opacity: 0;`
							}, null, 8, ["post", "style"]);
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
								d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
							})]))]),
							createVNode("h3", { class: "font-display text-xl text-arbor-cream mb-2" }, "Aucune chronique pour le moment"),
							createVNode("p", { class: "text-arbor-sage text-sm" }, "Les premières chroniques apparaîtront très bientôt.")
						])),
						__props.posts.links && __props.posts.links.length > 3 ? (openBlock(), createBlock("div", {
							key: 2,
							class: "flex justify-center gap-2 mt-12"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.posts.links, (link) => {
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Blog/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

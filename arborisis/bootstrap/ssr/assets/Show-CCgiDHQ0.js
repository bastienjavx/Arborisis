import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-sK8SLxpB.js";
import { t as _sfc_main$2 } from "./GuestLayout-CqMC9M4d.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/Blog/BlogPostContent.vue
var _sfc_main$1 = {
	__name: "BlogPostContent",
	__ssrInlineRender: true,
	props: { content: {
		type: String,
		required: true
	} },
	setup(__props) {
		const props = __props;
		const processedContent = computed(() => {
			let html = props.content;
			html = html.replace(/<a[^>]*data-arborisis-type="sound"[^>]*data-arborisis-id="(\d+)"[^>]*>/g, "<a data-inertia-link href=\"/sounds/$1\" class=\"text-arbor-emerald hover:text-arbor-emerald-dark hover:underline transition-colors font-medium\">");
			html = html.replace(/<a[^>]*data-arborisis-type="creator"[^>]*data-arborisis-id="(\d+)"[^>]*>/g, "<a data-inertia-link href=\"/creators/$1\" class=\"text-arbor-emerald hover:text-arbor-emerald-dark hover:underline transition-colors font-medium\">");
			html = html.replace(/<a[^>]*data-arborisis-type="map"[^>]*>/g, "<a data-inertia-link href=\"/map\" class=\"text-arbor-emerald hover:text-arbor-emerald-dark hover:underline transition-colors font-medium\">");
			html = html.replace(/<a[^>]*data-arborisis-type="arborisis-map"[^>]*>/g, "<a data-inertia-link href=\"/arborisis-map\" class=\"text-arbor-emerald hover:text-arbor-emerald-dark hover:underline transition-colors font-medium\">");
			return html;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-content" }, _attrs))} data-v-5089b9e6>${processedContent.value ?? ""}</div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Blog/BlogPostContent.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var BlogPostContent_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$1, [["__scopeId", "data-v-5089b9e6"]]);
//#endregion
//#region resources/js/Pages/Blog/Show.vue
var _sfc_main = {
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		post: {
			type: Object,
			required: true
		},
		relatedSounds: {
			type: Array,
			default: () => []
		},
		relatedCreators: {
			type: Array,
			default: () => []
		},
		previousPost: {
			type: Object,
			default: null
		},
		nextPost: {
			type: Object,
			default: null
		}
	},
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
		const getAvatarUrl = (creator) => {
			return creator?.creator?.profile?.avatarUrl || null;
		};
		const getInitials = (name) => {
			return name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: __props.post.title }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$2, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-screen bg-arbor-night"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-30"${_scopeId}></div></div><div class="relative z-10 pt-28 pb-24 section-padding"${_scopeId}><div class="max-w-4xl mx-auto"${_scopeId}><div class="mb-8 animate-fade-in"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/blog",
							class: "inline-flex items-center text-arbor-sage hover:text-arbor-emerald transition-colors text-sm"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Toutes les chroniques `);
								else return [(openBlock(), createBlock("svg", {
									class: "w-4 h-4 mr-1.5",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M10 19l-7-7m0 0l7-7m-7 7h18"
								})])), createTextVNode(" Toutes les chroniques ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><header class="mb-12 animate-fade-in"${_scopeId}><div class="flex items-center gap-3 mb-6"${_scopeId}><span class="text-xs font-medium text-arbor-emerald bg-arbor-emerald/10 px-2.5 py-1 rounded-full"${_scopeId}> Chronique </span><span class="text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDate(__props.post.published_at))}</span></div><h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-arbor-cream leading-tight mb-6"${_scopeId}>${ssrInterpolate(__props.post.title)}</h1>`);
						if (__props.post.subtitle) _push(`<p class="text-arbor-sage text-lg sm:text-xl leading-relaxed mb-8"${_scopeId}>${ssrInterpolate(__props.post.subtitle)}</p>`);
						else _push(`<!---->`);
						if (__props.post.excerpt) _push(`<div class="glass-card p-6 border-l-2 border-arbor-emerald/30 rounded-r-xl"${_scopeId}><p class="text-arbor-cream/70 text-base leading-relaxed italic"${_scopeId}>${ssrInterpolate(__props.post.excerpt)}</p></div>`);
						else _push(`<!---->`);
						_push(`</header>`);
						if (__props.post.cover_image) _push(`<div class="mb-12 rounded-2xl overflow-hidden animate-slide-up"${_scopeId}><img${ssrRenderAttr("src", __props.post.cover_image)}${ssrRenderAttr("alt", __props.post.title)} class="w-full aspect-[21/9] object-cover"${_scopeId}></div>`);
						else _push(`<!---->`);
						_push(`<div class="grid grid-cols-1 lg:grid-cols-12 gap-10"${_scopeId}><div class="lg:col-span-8 animate-slide-up"${_scopeId}>`);
						_push(ssrRenderComponent(BlogPostContent_default, { content: __props.post.content }, null, _parent, _scopeId));
						_push(`<div class="mt-16 pt-8 border-t border-arbor-glass-border"${_scopeId}><div class="flex flex-col sm:flex-row justify-between gap-4"${_scopeId}>`);
						if (__props.previousPost) _push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("blog.show", __props.previousPost.slug),
							class: "group flex items-start gap-3 text-left"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-5 h-5 text-arbor-sage group-hover:text-arbor-emerald transition-colors mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg><div${_scopeId}><span class="text-xs text-arbor-sage block mb-1"${_scopeId}>Chronique précédente</span><span class="text-arbor-cream font-medium group-hover:text-arbor-emerald transition-colors line-clamp-2"${_scopeId}>${ssrInterpolate(__props.previousPost.title)}</span></div>`);
								else return [(openBlock(), createBlock("svg", {
									class: "w-5 h-5 text-arbor-sage group-hover:text-arbor-emerald transition-colors mt-0.5 shrink-0",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M10 19l-7-7m0 0l7-7m-7 7h18"
								})])), createVNode("div", null, [createVNode("span", { class: "text-xs text-arbor-sage block mb-1" }, "Chronique précédente"), createVNode("span", { class: "text-arbor-cream font-medium group-hover:text-arbor-emerald transition-colors line-clamp-2" }, toDisplayString(__props.previousPost.title), 1)])];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<div${_scopeId}></div>`);
						if (__props.nextPost) _push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("blog.show", __props.nextPost.slug),
							class: "group flex items-start gap-3 text-right sm:flex-row-reverse"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-5 h-5 text-arbor-sage group-hover:text-arbor-emerald transition-colors mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"${_scopeId}></path></svg><div${_scopeId}><span class="text-xs text-arbor-sage block mb-1"${_scopeId}>Chronique suivante</span><span class="text-arbor-cream font-medium group-hover:text-arbor-emerald transition-colors line-clamp-2"${_scopeId}>${ssrInterpolate(__props.nextPost.title)}</span></div>`);
								else return [(openBlock(), createBlock("svg", {
									class: "w-5 h-5 text-arbor-sage group-hover:text-arbor-emerald transition-colors mt-0.5 shrink-0",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M14 5l7 7m0 0l-7 7m7-7H3"
								})])), createVNode("div", null, [createVNode("span", { class: "text-xs text-arbor-sage block mb-1" }, "Chronique suivante"), createVNode("span", { class: "text-arbor-cream font-medium group-hover:text-arbor-emerald transition-colors line-clamp-2" }, toDisplayString(__props.nextPost.title), 1)])];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div></div></div><aside class="lg:col-span-4 space-y-8 animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.1s" })}"${_scopeId}>`);
						if (__props.relatedSounds.length > 0) {
							_push(`<div class="glass-card p-5"${_scopeId}><h3 class="font-display text-sm font-semibold text-arbor-cream uppercase tracking-wider mb-4"${_scopeId}> Sons mentionnés </h3><div class="space-y-3"${_scopeId}><!--[-->`);
							ssrRenderList(__props.relatedSounds, (related) => {
								_push(ssrRenderComponent(unref(Link), {
									key: related.sound_id,
									href: _ctx.route("sounds.show", related.sound.slug),
									class: "flex items-center gap-3 group"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<div class="w-12 h-12 rounded-lg bg-arbor-moss/20 flex items-center justify-center shrink-0"${_scopeId}><svg class="w-5 h-5 text-arbor-moss" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"${_scopeId}></path></svg></div><div class="min-w-0"${_scopeId}><p class="text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate"${_scopeId}>${ssrInterpolate(related.sound.title)}</p><p class="text-xs text-arbor-sage truncate"${_scopeId}>${ssrInterpolate(related.mention_context)}</p></div>`);
										else return [createVNode("div", { class: "w-12 h-12 rounded-lg bg-arbor-moss/20 flex items-center justify-center shrink-0" }, [(openBlock(), createBlock("svg", {
											class: "w-5 h-5 text-arbor-moss",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24"
										}, [createVNode("path", {
											"stroke-linecap": "round",
											"stroke-linejoin": "round",
											"stroke-width": "1.5",
											d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
										})]))]), createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate" }, toDisplayString(related.sound.title), 1), createVNode("p", { class: "text-xs text-arbor-sage truncate" }, toDisplayString(related.mention_context), 1)])];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						if (__props.relatedCreators.length > 0) {
							_push(`<div class="glass-card p-5"${_scopeId}><h3 class="font-display text-sm font-semibold text-arbor-cream uppercase tracking-wider mb-4"${_scopeId}> Créateurs mentionnés </h3><div class="space-y-3"${_scopeId}><!--[-->`);
							ssrRenderList(__props.relatedCreators, (related) => {
								_push(ssrRenderComponent(unref(Link), {
									key: related.user_id,
									href: _ctx.route("creators.show", related.creator.slug),
									class: "flex items-center gap-3 group"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="w-10 h-10 rounded-full bg-arbor-moss/20 flex items-center justify-center shrink-0 overflow-hidden"${_scopeId}>`);
											if (getAvatarUrl(related)) _push(`<img${ssrRenderAttr("src", getAvatarUrl(related))}${ssrRenderAttr("alt", related.name)} class="w-full h-full object-cover"${_scopeId}>`);
											else _push(`<span class="text-xs text-arbor-moss font-medium"${_scopeId}>${ssrInterpolate(getInitials(related.name))}</span>`);
											_push(`</div><div class="min-w-0"${_scopeId}><p class="text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate"${_scopeId}>${ssrInterpolate(related.name)}</p><p class="text-xs text-arbor-sage truncate"${_scopeId}>${ssrInterpolate(related.mention_context)}</p></div>`);
										} else return [createVNode("div", { class: "w-10 h-10 rounded-full bg-arbor-moss/20 flex items-center justify-center shrink-0 overflow-hidden" }, [getAvatarUrl(related) ? (openBlock(), createBlock("img", {
											key: 0,
											src: getAvatarUrl(related),
											alt: related.name,
											class: "w-full h-full object-cover"
										}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
											key: 1,
											class: "text-xs text-arbor-moss font-medium"
										}, toDisplayString(getInitials(related.name)), 1))]), createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate" }, toDisplayString(related.name), 1), createVNode("p", { class: "text-xs text-arbor-sage truncate" }, toDisplayString(related.mention_context), 1)])];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						if (__props.post.ai_metadata?.keywords?.length) {
							_push(`<div class="glass-card p-5"${_scopeId}><h3 class="font-display text-sm font-semibold text-arbor-cream uppercase tracking-wider mb-4"${_scopeId}> Mots-clés </h3><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
							ssrRenderList(__props.post.ai_metadata.keywords, (keyword) => {
								_push(`<span class="text-xs text-arbor-sage bg-arbor-glass px-2.5 py-1 rounded-full"${_scopeId}>${ssrInterpolate(keyword)}</span>`);
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						_push(`</aside></div></div></div></div>`);
					} else return [createVNode("div", { class: "relative min-h-screen bg-arbor-night" }, [createVNode("div", {
						class: "absolute inset-0 overflow-hidden pointer-events-none",
						"aria-hidden": "true"
					}, [createVNode("div", { class: "absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-30" })]), createVNode("div", { class: "relative z-10 pt-28 pb-24 section-padding" }, [createVNode("div", { class: "max-w-4xl mx-auto" }, [
						createVNode("div", { class: "mb-8 animate-fade-in" }, [createVNode(unref(Link), {
							href: "/blog",
							class: "inline-flex items-center text-arbor-sage hover:text-arbor-emerald transition-colors text-sm"
						}, {
							default: withCtx(() => [(openBlock(), createBlock("svg", {
								class: "w-4 h-4 mr-1.5",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M10 19l-7-7m0 0l7-7m-7 7h18"
							})])), createTextVNode(" Toutes les chroniques ")]),
							_: 1
						})]),
						createVNode("header", { class: "mb-12 animate-fade-in" }, [
							createVNode("div", { class: "flex items-center gap-3 mb-6" }, [createVNode("span", { class: "text-xs font-medium text-arbor-emerald bg-arbor-emerald/10 px-2.5 py-1 rounded-full" }, " Chronique "), createVNode("span", { class: "text-xs text-arbor-sage" }, toDisplayString(formatDate(__props.post.published_at)), 1)]),
							createVNode("h1", { class: "font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-arbor-cream leading-tight mb-6" }, toDisplayString(__props.post.title), 1),
							__props.post.subtitle ? (openBlock(), createBlock("p", {
								key: 0,
								class: "text-arbor-sage text-lg sm:text-xl leading-relaxed mb-8"
							}, toDisplayString(__props.post.subtitle), 1)) : createCommentVNode("", true),
							__props.post.excerpt ? (openBlock(), createBlock("div", {
								key: 1,
								class: "glass-card p-6 border-l-2 border-arbor-emerald/30 rounded-r-xl"
							}, [createVNode("p", { class: "text-arbor-cream/70 text-base leading-relaxed italic" }, toDisplayString(__props.post.excerpt), 1)])) : createCommentVNode("", true)
						]),
						__props.post.cover_image ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mb-12 rounded-2xl overflow-hidden animate-slide-up"
						}, [createVNode("img", {
							src: __props.post.cover_image,
							alt: __props.post.title,
							class: "w-full aspect-[21/9] object-cover"
						}, null, 8, ["src", "alt"])])) : createCommentVNode("", true),
						createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-12 gap-10" }, [createVNode("div", { class: "lg:col-span-8 animate-slide-up" }, [createVNode(BlogPostContent_default, { content: __props.post.content }, null, 8, ["content"]), createVNode("div", { class: "mt-16 pt-8 border-t border-arbor-glass-border" }, [createVNode("div", { class: "flex flex-col sm:flex-row justify-between gap-4" }, [__props.previousPost ? (openBlock(), createBlock(unref(Link), {
							key: 0,
							href: _ctx.route("blog.show", __props.previousPost.slug),
							class: "group flex items-start gap-3 text-left"
						}, {
							default: withCtx(() => [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-arbor-sage group-hover:text-arbor-emerald transition-colors mt-0.5 shrink-0",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M10 19l-7-7m0 0l7-7m-7 7h18"
							})])), createVNode("div", null, [createVNode("span", { class: "text-xs text-arbor-sage block mb-1" }, "Chronique précédente"), createVNode("span", { class: "text-arbor-cream font-medium group-hover:text-arbor-emerald transition-colors line-clamp-2" }, toDisplayString(__props.previousPost.title), 1)])]),
							_: 1
						}, 8, ["href"])) : (openBlock(), createBlock("div", { key: 1 })), __props.nextPost ? (openBlock(), createBlock(unref(Link), {
							key: 2,
							href: _ctx.route("blog.show", __props.nextPost.slug),
							class: "group flex items-start gap-3 text-right sm:flex-row-reverse"
						}, {
							default: withCtx(() => [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-arbor-sage group-hover:text-arbor-emerald transition-colors mt-0.5 shrink-0",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M14 5l7 7m0 0l-7 7m7-7H3"
							})])), createVNode("div", null, [createVNode("span", { class: "text-xs text-arbor-sage block mb-1" }, "Chronique suivante"), createVNode("span", { class: "text-arbor-cream font-medium group-hover:text-arbor-emerald transition-colors line-clamp-2" }, toDisplayString(__props.nextPost.title), 1)])]),
							_: 1
						}, 8, ["href"])) : createCommentVNode("", true)])])]), createVNode("aside", {
							class: "lg:col-span-4 space-y-8 animate-slide-up",
							style: { "animation-delay": "0.1s" }
						}, [
							__props.relatedSounds.length > 0 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "glass-card p-5"
							}, [createVNode("h3", { class: "font-display text-sm font-semibold text-arbor-cream uppercase tracking-wider mb-4" }, " Sons mentionnés "), createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.relatedSounds, (related) => {
								return openBlock(), createBlock(unref(Link), {
									key: related.sound_id,
									href: _ctx.route("sounds.show", related.sound.slug),
									class: "flex items-center gap-3 group"
								}, {
									default: withCtx(() => [createVNode("div", { class: "w-12 h-12 rounded-lg bg-arbor-moss/20 flex items-center justify-center shrink-0" }, [(openBlock(), createBlock("svg", {
										class: "w-5 h-5 text-arbor-moss",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "1.5",
										d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
									})]))]), createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate" }, toDisplayString(related.sound.title), 1), createVNode("p", { class: "text-xs text-arbor-sage truncate" }, toDisplayString(related.mention_context), 1)])]),
									_: 2
								}, 1032, ["href"]);
							}), 128))])])) : createCommentVNode("", true),
							__props.relatedCreators.length > 0 ? (openBlock(), createBlock("div", {
								key: 1,
								class: "glass-card p-5"
							}, [createVNode("h3", { class: "font-display text-sm font-semibold text-arbor-cream uppercase tracking-wider mb-4" }, " Créateurs mentionnés "), createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.relatedCreators, (related) => {
								return openBlock(), createBlock(unref(Link), {
									key: related.user_id,
									href: _ctx.route("creators.show", related.creator.slug),
									class: "flex items-center gap-3 group"
								}, {
									default: withCtx(() => [createVNode("div", { class: "w-10 h-10 rounded-full bg-arbor-moss/20 flex items-center justify-center shrink-0 overflow-hidden" }, [getAvatarUrl(related) ? (openBlock(), createBlock("img", {
										key: 0,
										src: getAvatarUrl(related),
										alt: related.name,
										class: "w-full h-full object-cover"
									}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
										key: 1,
										class: "text-xs text-arbor-moss font-medium"
									}, toDisplayString(getInitials(related.name)), 1))]), createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate" }, toDisplayString(related.name), 1), createVNode("p", { class: "text-xs text-arbor-sage truncate" }, toDisplayString(related.mention_context), 1)])]),
									_: 2
								}, 1032, ["href"]);
							}), 128))])])) : createCommentVNode("", true),
							__props.post.ai_metadata?.keywords?.length ? (openBlock(), createBlock("div", {
								key: 2,
								class: "glass-card p-5"
							}, [createVNode("h3", { class: "font-display text-sm font-semibold text-arbor-cream uppercase tracking-wider mb-4" }, " Mots-clés "), createVNode("div", { class: "flex flex-wrap gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.post.ai_metadata.keywords, (keyword) => {
								return openBlock(), createBlock("span", {
									key: keyword,
									class: "text-xs text-arbor-sage bg-arbor-glass px-2.5 py-1 rounded-full"
								}, toDisplayString(keyword), 1);
							}), 128))])])) : createCommentVNode("", true)
						])])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Blog/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

import { t as _sfc_main$1 } from "./GuestLayout-CqMC9M4d.js";
import { t as _sfc_main$2 } from "./FollowButton-BRPBIklU.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Social/Friends.vue
var _sfc_main = {
	__name: "Friends",
	__ssrInlineRender: true,
	props: {
		user: Object,
		list: Object
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: `Amis de ${__props.user.name}` }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="pt-24 pb-16"${_scopeId}><div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("creators.show", __props.user.slug),
							class: "text-sm text-arbor-sage hover:text-arbor-cream flex items-center gap-1 mb-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId}></path></svg> Retour au profil `);
								else return [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M15 19l-7-7 7-7"
								})])), createTextVNode(" Retour au profil ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<h1 class="font-display text-2xl font-bold text-arbor-cream"${_scopeId}> Amis de ${ssrInterpolate(__props.user.name)}</h1><p class="text-arbor-sage text-sm mt-1"${_scopeId}>${ssrInterpolate(__props.list.total)} ami${ssrInterpolate(__props.list.total > 1 ? "s" : "")}</p></div>`);
						if (__props.list.data.length > 0) {
							_push(`<div class="space-y-3"${_scopeId}><!--[-->`);
							ssrRenderList(__props.list.data, (person) => {
								_push(`<div class="glass-card p-4 flex items-center gap-4 hover:bg-white/5 transition-colors"${_scopeId}>`);
								_push(ssrRenderComponent(unref(Link), {
									href: _ctx.route("creators.show", person.slug),
									class: "shrink-0"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="w-12 h-12 rounded-full bg-arbor-moss/30 flex items-center justify-center overflow-hidden ring-2 ring-arbor-glass-border/50"${_scopeId}>`);
											if (person.avatar_url) _push(`<img${ssrRenderAttr("src", person.avatar_url)}${ssrRenderAttr("alt", person.name)} class="w-full h-full object-cover"${_scopeId}>`);
											else _push(`<span class="text-lg font-display font-bold text-arbor-emerald"${_scopeId}>${ssrInterpolate(person.name?.charAt(0)?.toUpperCase() ?? "?")}</span>`);
											_push(`</div>`);
										} else return [createVNode("div", { class: "w-12 h-12 rounded-full bg-arbor-moss/30 flex items-center justify-center overflow-hidden ring-2 ring-arbor-glass-border/50" }, [person.avatar_url ? (openBlock(), createBlock("img", {
											key: 0,
											src: person.avatar_url,
											alt: person.name,
											class: "w-full h-full object-cover"
										}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
											key: 1,
											class: "text-lg font-display font-bold text-arbor-emerald"
										}, toDisplayString(person.name?.charAt(0)?.toUpperCase() ?? "?"), 1))])];
									}),
									_: 2
								}, _parent, _scopeId));
								_push(`<div class="flex-1 min-w-0"${_scopeId}>`);
								_push(ssrRenderComponent(unref(Link), {
									href: _ctx.route("creators.show", person.slug),
									class: "block"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-arbor-cream truncate hover:text-arbor-emerald transition-colors"${_scopeId}>${ssrInterpolate(person.name)}</h3>`);
										else return [createVNode("h3", { class: "font-semibold text-arbor-cream truncate hover:text-arbor-emerald transition-colors" }, toDisplayString(person.name), 1)];
									}),
									_: 2
								}, _parent, _scopeId));
								if (person.profile?.bio) _push(`<p class="text-xs text-arbor-sage/70 truncate"${_scopeId}>${ssrInterpolate(person.profile.bio)}</p>`);
								else _push(`<!---->`);
								_push(`</div>`);
								if (_ctx.$page.props.auth.user && _ctx.$page.props.auth.user.id !== person.id) _push(ssrRenderComponent(_sfc_main$2, {
									"user-id": person.id,
									"initial-following": true,
									size: "sm"
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(`</div>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<div class="text-center py-12"${_scopeId}><p class="text-arbor-sage"${_scopeId}>Aucun ami pour le moment.</p></div>`);
						if (__props.list.links.length > 3) {
							_push(`<div class="mt-6 flex justify-center"${_scopeId}><div class="flex gap-2"${_scopeId}><!--[-->`);
							ssrRenderList(__props.list.links, (link, index) => {
								_push(ssrRenderComponent(unref(Link), {
									key: index,
									href: link.url,
									class: [
										"px-3 py-1.5 rounded-lg text-sm transition-colors",
										link.active ? "bg-arbor-emerald text-arbor-night font-medium" : "text-arbor-sage hover:bg-white/5",
										!link.url && "opacity-40 pointer-events-none"
									]
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "pt-24 pb-16" }, [createVNode("div", { class: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "mb-8" }, [
							createVNode(unref(Link), {
								href: _ctx.route("creators.show", __props.user.slug),
								class: "text-sm text-arbor-sage hover:text-arbor-cream flex items-center gap-1 mb-4"
							}, {
								default: withCtx(() => [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M15 19l-7-7 7-7"
								})])), createTextVNode(" Retour au profil ")]),
								_: 1
							}, 8, ["href"]),
							createVNode("h1", { class: "font-display text-2xl font-bold text-arbor-cream" }, " Amis de " + toDisplayString(__props.user.name), 1),
							createVNode("p", { class: "text-arbor-sage text-sm mt-1" }, toDisplayString(__props.list.total) + " ami" + toDisplayString(__props.list.total > 1 ? "s" : ""), 1)
						]),
						__props.list.data.length > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "space-y-3"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.list.data, (person) => {
							return openBlock(), createBlock("div", {
								key: person.id,
								class: "glass-card p-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
							}, [
								createVNode(unref(Link), {
									href: _ctx.route("creators.show", person.slug),
									class: "shrink-0"
								}, {
									default: withCtx(() => [createVNode("div", { class: "w-12 h-12 rounded-full bg-arbor-moss/30 flex items-center justify-center overflow-hidden ring-2 ring-arbor-glass-border/50" }, [person.avatar_url ? (openBlock(), createBlock("img", {
										key: 0,
										src: person.avatar_url,
										alt: person.name,
										class: "w-full h-full object-cover"
									}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
										key: 1,
										class: "text-lg font-display font-bold text-arbor-emerald"
									}, toDisplayString(person.name?.charAt(0)?.toUpperCase() ?? "?"), 1))])]),
									_: 2
								}, 1032, ["href"]),
								createVNode("div", { class: "flex-1 min-w-0" }, [createVNode(unref(Link), {
									href: _ctx.route("creators.show", person.slug),
									class: "block"
								}, {
									default: withCtx(() => [createVNode("h3", { class: "font-semibold text-arbor-cream truncate hover:text-arbor-emerald transition-colors" }, toDisplayString(person.name), 1)]),
									_: 2
								}, 1032, ["href"]), person.profile?.bio ? (openBlock(), createBlock("p", {
									key: 0,
									class: "text-xs text-arbor-sage/70 truncate"
								}, toDisplayString(person.profile.bio), 1)) : createCommentVNode("", true)]),
								_ctx.$page.props.auth.user && _ctx.$page.props.auth.user.id !== person.id ? (openBlock(), createBlock(_sfc_main$2, {
									key: 0,
									"user-id": person.id,
									"initial-following": true,
									size: "sm"
								}, null, 8, ["user-id"])) : createCommentVNode("", true)
							]);
						}), 128))])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "text-center py-12"
						}, [createVNode("p", { class: "text-arbor-sage" }, "Aucun ami pour le moment.")])),
						__props.list.links.length > 3 ? (openBlock(), createBlock("div", {
							key: 2,
							class: "mt-6 flex justify-center"
						}, [createVNode("div", { class: "flex gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.list.links, (link, index) => {
							return openBlock(), createBlock(unref(Link), {
								key: index,
								href: link.url,
								class: [
									"px-3 py-1.5 rounded-lg text-sm transition-colors",
									link.active ? "bg-arbor-emerald text-arbor-night font-medium" : "text-arbor-sage hover:bg-white/5",
									!link.url && "opacity-40 pointer-events-none"
								],
								innerHTML: link.label
							}, null, 8, [
								"href",
								"class",
								"innerHTML"
							]);
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Social/Friends.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

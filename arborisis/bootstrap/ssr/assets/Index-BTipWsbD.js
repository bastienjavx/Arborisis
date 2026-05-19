import { t as _sfc_main$1 } from "./GuestLayout-BBezdEIa.js";
import { t as _sfc_main$2 } from "./SoundCard-BD9ylTEJ.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
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
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Sons naturels" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="pt-24 pb-16"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="trace-frame mb-10 p-6 sm:p-8"${_scopeId}><div class="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"${_scopeId}><div${_scopeId}><p class="atlas-kicker mb-4"${_scopeId}>Archives sonores</p><h1 class="atlas-heading text-5xl sm:text-6xl"${_scopeId}> Sons naturels </h1><p class="mt-5 text-arbor-sage max-w-xl leading-7"${_scopeId}> Explorez les enregistrements géolocalisés et approximés de la communauté Arborisis. </p></div>`);
						if (_ctx.$page.props.auth.user) _push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("sounds.create"),
							class: "btn-primary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Publier une trace `);
								else return [createTextVNode(" Publier une trace ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div></div><div class="flex flex-wrap gap-2 mb-8"${_scopeId}><button class="${ssrRenderClass([selectedCategory.value === "" ? "bg-arbor-lichen/15 text-arbor-lichen border border-arbor-lichen/30 shadow-sm shadow-arbor-lichen/5" : "bg-arbor-glass text-arbor-sage hover:bg-white/10 border border-transparent", "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"])}"${_scopeId}> Tous </button><!--[-->`);
						ssrRenderList(__props.categories, (category) => {
							_push(`<button class="${ssrRenderClass([selectedCategory.value === category.id ? "bg-arbor-lichen/15 text-arbor-lichen border border-arbor-lichen/30 shadow-sm shadow-arbor-lichen/5" : "bg-arbor-glass text-arbor-sage hover:bg-white/10 border border-transparent", "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"])}"${_scopeId}>${ssrInterpolate(category.name)}</button>`);
						});
						_push(`<!--]--></div><div class="mb-6 text-sm text-arbor-sage"${_scopeId}><span class="text-arbor-lichen font-medium"${_scopeId}>${ssrInterpolate(filteredSounds.value.length)}</span> trace${ssrInterpolate(filteredSounds.value.length > 1 ? "s" : "")} sonore${ssrInterpolate(filteredSounds.value.length > 1 ? "s" : "")}</div>`);
						if (filteredSounds.value.length > 0) {
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(filteredSounds.value, (sound, index) => {
								_push(ssrRenderComponent(_sfc_main$2, {
									key: sound.id,
									sound,
									style: `animation: fadeInUp 0.5s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else {
							_push(`<div class="poetic-empty py-24"${_scopeId}><div class="poetic-empty-icon flex items-center justify-center"${_scopeId}><svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div><h3 class="font-display text-2xl font-semibold text-arbor-cream mb-2"${_scopeId}>Aucune trace pour le moment</h3><p class="text-arbor-sage mb-6"${_scopeId}>Soyez le premier à publier un enregistrement naturel.</p>`);
							if (_ctx.$page.props.auth.user) _push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("sounds.create"),
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
								else _push(`<span class="px-4 py-2 rounded-lg text-sm text-arbor-sage/70"${_scopeId}>${link.label ?? ""}</span>`);
								_push(`<!--]-->`);
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "pt-24 pb-16" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "trace-frame mb-10 p-6 sm:p-8" }, [createVNode("div", { class: "relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between" }, [createVNode("div", null, [
							createVNode("p", { class: "atlas-kicker mb-4" }, "Archives sonores"),
							createVNode("h1", { class: "atlas-heading text-5xl sm:text-6xl" }, " Sons naturels "),
							createVNode("p", { class: "mt-5 text-arbor-sage max-w-xl leading-7" }, " Explorez les enregistrements géolocalisés et approximés de la communauté Arborisis. ")
						]), _ctx.$page.props.auth.user ? (openBlock(), createBlock(unref(Link), {
							key: 0,
							href: _ctx.route("sounds.create"),
							class: "btn-primary"
						}, {
							default: withCtx(() => [createTextVNode(" Publier une trace ")]),
							_: 1
						}, 8, ["href"])) : createCommentVNode("", true)])]),
						createVNode("div", { class: "flex flex-wrap gap-2 mb-8" }, [createVNode("button", {
							onClick: ($event) => selectedCategory.value = "",
							class: ["rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200", selectedCategory.value === "" ? "bg-arbor-lichen/15 text-arbor-lichen border border-arbor-lichen/30 shadow-sm shadow-arbor-lichen/5" : "bg-arbor-glass text-arbor-sage hover:bg-white/10 border border-transparent"]
						}, " Tous ", 10, ["onClick"]), (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
							return openBlock(), createBlock("button", {
								key: category.id,
								onClick: ($event) => selectedCategory.value = selectedCategory.value === category.id ? "" : category.id,
								class: ["rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200", selectedCategory.value === category.id ? "bg-arbor-lichen/15 text-arbor-lichen border border-arbor-lichen/30 shadow-sm shadow-arbor-lichen/5" : "bg-arbor-glass text-arbor-sage hover:bg-white/10 border border-transparent"]
							}, toDisplayString(category.name), 11, ["onClick"]);
						}), 128))]),
						createVNode("div", { class: "mb-6 text-sm text-arbor-sage" }, [createVNode("span", { class: "text-arbor-lichen font-medium" }, toDisplayString(filteredSounds.value.length), 1), createTextVNode(" trace" + toDisplayString(filteredSounds.value.length > 1 ? "s" : "") + " sonore" + toDisplayString(filteredSounds.value.length > 1 ? "s" : ""), 1)]),
						filteredSounds.value.length > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(filteredSounds.value, (sound, index) => {
							return openBlock(), createBlock(_sfc_main$2, {
								key: sound.id,
								sound,
								style: `animation: fadeInUp 0.5s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`
							}, null, 8, ["sound", "style"]);
						}), 128))])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "poetic-empty py-24"
						}, [
							createVNode("div", { class: "poetic-empty-icon flex items-center justify-center" }, [(openBlock(), createBlock("svg", {
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
							createVNode("h3", { class: "font-display text-2xl font-semibold text-arbor-cream mb-2" }, "Aucune trace pour le moment"),
							createVNode("p", { class: "text-arbor-sage mb-6" }, "Soyez le premier à publier un enregistrement naturel."),
							_ctx.$page.props.auth.user ? (openBlock(), createBlock(unref(Link), {
								key: 0,
								href: _ctx.route("sounds.create"),
								class: "btn-primary"
							}, {
								default: withCtx(() => [createTextVNode(" Publier un son ")]),
								_: 1
							}, 8, ["href"])) : (openBlock(), createBlock(unref(Link), {
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
								class: "px-4 py-2 rounded-lg text-sm text-arbor-sage/70",
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

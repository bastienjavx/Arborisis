import { t as _sfc_main$1 } from "./GuestLayout-30iBKZwO.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Radio/Shows.vue
var _sfc_main = {
	__name: "Shows",
	__ssrInlineRender: true,
	props: {
		items: Array,
		counts: Object
	},
	setup(__props) {
		const props = __props;
		const activeCategory = ref("all");
		const categories = [
			{
				key: "all",
				label: "Tout",
				accent: "text-arbor-cream"
			},
			{
				key: "podcast",
				label: "Podcasts",
				accent: "text-violet-300"
			},
			{
				key: "flash",
				label: "Flash info",
				accent: "text-cyan-300"
			},
			{
				key: "emission",
				label: "Émissions",
				accent: "text-rose-300"
			}
		];
		const typeMeta = {
			podcast: {
				label: "Podcast",
				pill: "bg-violet-500/15 text-violet-200 border-violet-400/20",
				line: "bg-violet-300"
			},
			flash: {
				label: "Flash info",
				pill: "bg-cyan-500/15 text-cyan-200 border-cyan-400/20",
				line: "bg-cyan-300"
			},
			emission: {
				label: "Émission",
				pill: "bg-rose-500/15 text-rose-200 border-rose-400/20",
				line: "bg-rose-300"
			}
		};
		const filteredItems = computed(() => {
			if (activeCategory.value === "all") return props.items ?? [];
			return (props.items ?? []).filter((item) => item.show_type === activeCategory.value);
		});
		const featuredItem = computed(() => props.items?.[0] ?? null);
		const formatDuration = (seconds) => {
			if (!seconds) return "--:--";
			const total = Math.round(seconds);
			return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, "0")}`;
		};
		const formatDate = (iso) => {
			if (!iso) return "Non daté";
			return new Date(iso).toLocaleDateString("fr-FR", {
				day: "2-digit",
				month: "long",
				year: "numeric"
			});
		};
		const metaFor = (type) => typeMeta[type] ?? typeMeta.podcast;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Podcasts, flash info et émissions" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="pt-24 pb-16"${_scopeId}><div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"${_scopeId}><section class="mb-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end"${_scopeId}><div${_scopeId}><div class="mb-5 flex flex-wrap items-center gap-3"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("radio.index"),
							class: "inline-flex items-center gap-2 rounded-lg border border-arbor-glass-border bg-arbor-glass px-3 py-2 text-sm text-arbor-sage transition hover:text-arbor-cream"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"${_scopeId}></path></svg> Radio en direct `);
								else return [(openBlock(), createBlock("svg", {
									class: "h-4 w-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M15 19l-7-7 7-7"
								})])), createTextVNode(" Radio en direct ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<span class="rounded-full border border-arbor-emerald/25 bg-arbor-emerald/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-arbor-emerald"${_scopeId}> Archives radio </span></div><h1 class="font-display text-4xl font-semibold leading-tight text-arbor-cream sm:text-5xl"${_scopeId}> Podcasts, flash info et émissions </h1><p class="mt-5 max-w-2xl text-base leading-7 text-arbor-sage"${_scopeId}> Les formats générés d&#39;Arborisis Radio sont regroupés ici : capsules longues, bulletins courts et émissions animées. </p></div><div class="rounded-lg border border-arbor-glass-border bg-arbor-deep p-5"${_scopeId}><p class="text-xs uppercase tracking-[0.24em] text-arbor-sage"${_scopeId}>Derniere publication</p>`);
						if (featuredItem.value) _push(`<div class="mt-4 flex items-start gap-4"${_scopeId}><span class="${ssrRenderClass([metaFor(featuredItem.value.show_type).line, "mt-1 h-12 w-1 rounded-full"])}"${_scopeId}></span><div class="min-w-0"${_scopeId}><span class="${ssrRenderClass([metaFor(featuredItem.value.show_type).pill, "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(metaFor(featuredItem.value.show_type).label)}</span><h2 class="mt-3 line-clamp-2 font-display text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(featuredItem.value.title)}</h2><p class="mt-2 text-sm text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDate(featuredItem.value.published_at))} · ${ssrInterpolate(formatDuration(featuredItem.value.duration))}</p></div></div>`);
						else _push(`<p class="mt-4 text-sm text-arbor-sage"${_scopeId}> Aucun format publié pour le moment. </p>`);
						_push(`</div></section><div class="mb-8 flex gap-2 overflow-x-auto rounded-lg border border-arbor-glass-border bg-arbor-night/70 p-1"${_scopeId}><!--[-->`);
						ssrRenderList(categories, (category) => {
							_push(`<button type="button" class="${ssrRenderClass([activeCategory.value === category.key ? "bg-arbor-cream text-arbor-night" : "text-arbor-sage hover:bg-arbor-glass hover:text-arbor-cream", "whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition"])}"${_scopeId}><span${_scopeId}>${ssrInterpolate(category.label)}</span><span class="${ssrRenderClass([activeCategory.value === category.key ? "text-arbor-night/70" : category.accent, "ml-2 font-mono text-xs"])}"${_scopeId}>${ssrInterpolate(__props.counts?.[category.key] ?? 0)}</span></button>`);
						});
						_push(`<!--]--></div>`);
						if (filteredItems.value.length) {
							_push(`<section class="grid gap-4"${_scopeId}><!--[-->`);
							ssrRenderList(filteredItems.value, (item) => {
								_push(`<article class="grid gap-4 rounded-lg border border-arbor-glass-border bg-arbor-glass p-5 md:grid-cols-[1fr_280px] md:items-center"${_scopeId}><div class="min-w-0"${_scopeId}><div class="mb-3 flex flex-wrap items-center gap-3"${_scopeId}><span class="${ssrRenderClass([metaFor(item.show_type).pill, "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(metaFor(item.show_type).label)}</span><span class="text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDate(item.published_at))}</span><span class="font-mono text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDuration(item.duration))}</span></div><h2 class="line-clamp-2 font-display text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(item.title)}</h2>`);
								if (item.theme) _push(`<p class="mt-1 text-sm text-arbor-emerald"${_scopeId}>${ssrInterpolate(item.theme)}</p>`);
								else _push(`<!---->`);
								if (item.description) _push(`<p class="mt-3 line-clamp-3 text-sm leading-6 text-arbor-sage"${_scopeId}>${ssrInterpolate(item.description)}</p>`);
								else _push(`<!---->`);
								_push(`</div><div class="rounded-lg border border-arbor-glass-border bg-arbor-night/55 p-3"${_scopeId}><audio${ssrRenderAttr("src", item.audio_url)} controls preload="none" class="h-10 w-full"${_scopeId}></audio></div></article>`);
							});
							_push(`<!--]--></section>`);
						} else _push(`<section class="rounded-lg border border-arbor-glass-border bg-arbor-glass p-8 text-center"${_scopeId}><p class="font-display text-2xl text-arbor-cream"${_scopeId}>Aucun contenu dans cette catégorie</p><p class="mt-2 text-sm text-arbor-sage"${_scopeId}>Les prochaines générations quotidiennes apparaîtront ici après publication.</p></section>`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "pt-24 pb-16" }, [createVNode("div", { class: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" }, [
						createVNode("section", { class: "mb-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end" }, [createVNode("div", null, [
							createVNode("div", { class: "mb-5 flex flex-wrap items-center gap-3" }, [createVNode(unref(Link), {
								href: _ctx.route("radio.index"),
								class: "inline-flex items-center gap-2 rounded-lg border border-arbor-glass-border bg-arbor-glass px-3 py-2 text-sm text-arbor-sage transition hover:text-arbor-cream"
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
									d: "M15 19l-7-7 7-7"
								})])), createTextVNode(" Radio en direct ")]),
								_: 1
							}, 8, ["href"]), createVNode("span", { class: "rounded-full border border-arbor-emerald/25 bg-arbor-emerald/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-arbor-emerald" }, " Archives radio ")]),
							createVNode("h1", { class: "font-display text-4xl font-semibold leading-tight text-arbor-cream sm:text-5xl" }, " Podcasts, flash info et émissions "),
							createVNode("p", { class: "mt-5 max-w-2xl text-base leading-7 text-arbor-sage" }, " Les formats générés d'Arborisis Radio sont regroupés ici : capsules longues, bulletins courts et émissions animées. ")
						]), createVNode("div", { class: "rounded-lg border border-arbor-glass-border bg-arbor-deep p-5" }, [createVNode("p", { class: "text-xs uppercase tracking-[0.24em] text-arbor-sage" }, "Derniere publication"), featuredItem.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-4 flex items-start gap-4"
						}, [createVNode("span", { class: ["mt-1 h-12 w-1 rounded-full", metaFor(featuredItem.value.show_type).line] }, null, 2), createVNode("div", { class: "min-w-0" }, [
							createVNode("span", { class: ["inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", metaFor(featuredItem.value.show_type).pill] }, toDisplayString(metaFor(featuredItem.value.show_type).label), 3),
							createVNode("h2", { class: "mt-3 line-clamp-2 font-display text-2xl font-semibold text-arbor-cream" }, toDisplayString(featuredItem.value.title), 1),
							createVNode("p", { class: "mt-2 text-sm text-arbor-sage" }, toDisplayString(formatDate(featuredItem.value.published_at)) + " · " + toDisplayString(formatDuration(featuredItem.value.duration)), 1)
						])])) : (openBlock(), createBlock("p", {
							key: 1,
							class: "mt-4 text-sm text-arbor-sage"
						}, " Aucun format publié pour le moment. "))])]),
						createVNode("div", { class: "mb-8 flex gap-2 overflow-x-auto rounded-lg border border-arbor-glass-border bg-arbor-night/70 p-1" }, [(openBlock(), createBlock(Fragment, null, renderList(categories, (category) => {
							return createVNode("button", {
								key: category.key,
								type: "button",
								onClick: ($event) => activeCategory.value = category.key,
								class: ["whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition", activeCategory.value === category.key ? "bg-arbor-cream text-arbor-night" : "text-arbor-sage hover:bg-arbor-glass hover:text-arbor-cream"]
							}, [createVNode("span", null, toDisplayString(category.label), 1), createVNode("span", { class: ["ml-2 font-mono text-xs", activeCategory.value === category.key ? "text-arbor-night/70" : category.accent] }, toDisplayString(__props.counts?.[category.key] ?? 0), 3)], 10, ["onClick"]);
						}), 64))]),
						filteredItems.value.length ? (openBlock(), createBlock("section", {
							key: 0,
							class: "grid gap-4"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(filteredItems.value, (item) => {
							return openBlock(), createBlock("article", {
								key: item.id,
								class: "grid gap-4 rounded-lg border border-arbor-glass-border bg-arbor-glass p-5 md:grid-cols-[1fr_280px] md:items-center"
							}, [createVNode("div", { class: "min-w-0" }, [
								createVNode("div", { class: "mb-3 flex flex-wrap items-center gap-3" }, [
									createVNode("span", { class: ["inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", metaFor(item.show_type).pill] }, toDisplayString(metaFor(item.show_type).label), 3),
									createVNode("span", { class: "text-xs text-arbor-sage" }, toDisplayString(formatDate(item.published_at)), 1),
									createVNode("span", { class: "font-mono text-xs text-arbor-sage" }, toDisplayString(formatDuration(item.duration)), 1)
								]),
								createVNode("h2", { class: "line-clamp-2 font-display text-2xl font-semibold text-arbor-cream" }, toDisplayString(item.title), 1),
								item.theme ? (openBlock(), createBlock("p", {
									key: 0,
									class: "mt-1 text-sm text-arbor-emerald"
								}, toDisplayString(item.theme), 1)) : createCommentVNode("", true),
								item.description ? (openBlock(), createBlock("p", {
									key: 1,
									class: "mt-3 line-clamp-3 text-sm leading-6 text-arbor-sage"
								}, toDisplayString(item.description), 1)) : createCommentVNode("", true)
							]), createVNode("div", { class: "rounded-lg border border-arbor-glass-border bg-arbor-night/55 p-3" }, [createVNode("audio", {
								src: item.audio_url,
								controls: "",
								preload: "none",
								class: "h-10 w-full"
							}, null, 8, ["src"])])]);
						}), 128))])) : (openBlock(), createBlock("section", {
							key: 1,
							class: "rounded-lg border border-arbor-glass-border bg-arbor-glass p-8 text-center"
						}, [createVNode("p", { class: "font-display text-2xl text-arbor-cream" }, "Aucun contenu dans cette catégorie"), createVNode("p", { class: "mt-2 text-sm text-arbor-sage" }, "Les prochaines générations quotidiennes apparaîtront ici après publication.")]))
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Radio/Shows.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

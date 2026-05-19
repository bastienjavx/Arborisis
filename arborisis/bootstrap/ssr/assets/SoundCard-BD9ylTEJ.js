import { n as usePlayerStore } from "./GuestLayout-BBezdEIa.js";
import { Link } from "@inertiajs/vue3";
import { computed, createTextVNode, mergeProps, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/SoundCard.vue
var _sfc_main = {
	__name: "SoundCard",
	__ssrInlineRender: true,
	props: {
		sound: {
			type: Object,
			required: true
		},
		size: {
			type: String,
			default: "default"
		}
	},
	setup(__props) {
		const props = __props;
		const player = usePlayerStore();
		const isPlaying = computed(() => {
			return player.isPlaying && player.currentSound?.id === props.sound.id;
		});
		const traceBars = computed(() => {
			const seed = Number(props.sound.id || props.sound.duration || 7);
			return Array.from({ length: 18 }, (_, i) => {
				const value = 22 + Math.abs(Math.sin(seed * .43 + i * .74)) * 72;
				return Math.round(value);
			});
		});
		const formatDuration = (seconds) => {
			if (!seconds) return "--:--";
			return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["sound-archive-card group relative", __props.size === "compact" ? "rounded-lg" : "rounded-xl"] }, _attrs))}><div class="relative aspect-[16/10] overflow-hidden bg-arbor-charcoal">`);
			if (__props.sound.cover_url) _push(`<img${ssrRenderAttr("src", __props.sound.cover_url)}${ssrRenderAttr("alt", `Couverture de ${__props.sound.title}`)} class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">`);
			else _push(`<div class="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(143,230,193,0.12),transparent_45%),linear-gradient(135deg,#07110D,#102018)]"><div class="sound-trace h-12 w-12 rounded-full bg-arbor-firefly/10 text-arbor-firefly"></div></div>`);
			_push(`<div class="absolute inset-0 bg-gradient-to-t from-arbor-ink via-arbor-ink/20 to-transparent"></div><div class="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(7,17,13,0.96))]"></div><button${ssrRenderAttr("aria-label", isPlaying.value ? `Mettre en pause ${__props.sound.title}` : `Lire ${__props.sound.title}`)} class="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 cursor-pointer group-hover:opacity-100"><div class="sound-trace flex h-14 w-14 items-center justify-center rounded-full bg-arbor-lichen text-arbor-ink shadow-lichen transition-all duration-200 hover:scale-105 active:scale-95">`);
			if (!isPlaying.value) _push(`<svg class="w-6 h-6 text-arbor-night ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>`);
			else _push(`<svg class="w-6 h-6 text-arbor-night" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path></svg>`);
			_push(`</div></button>`);
			if (__props.sound.category) _push(`<span class="absolute left-3 top-3 rounded-full border border-arbor-mineral/15 bg-arbor-ink/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-arbor-lichen backdrop-blur-sm">${ssrInterpolate(__props.sound.category.name || __props.sound.category)}</span>`);
			else _push(`<!---->`);
			_push(`<span class="absolute right-3 bottom-3 rounded-full bg-arbor-ink/70 px-2.5 py-1 font-mono text-[11px] text-arbor-mist backdrop-blur-sm">${ssrInterpolate(formatDuration(__props.sound.duration))}</span></div><div class="relative p-4"><div class="mb-4 flex h-8 items-end gap-[3px]" aria-hidden="true"><!--[-->`);
			ssrRenderList(traceBars.value, (height, index) => {
				_push(`<span class="flex-1 rounded-full bg-arbor-mineral/12 transition-colors duration-300 group-hover:bg-arbor-firefly/45" style="${ssrRenderStyle({ height: `${height}%` })}"></span>`);
			});
			_push(`<!--]--></div>`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("sounds.show", __props.sound.slug),
				class: "block truncate font-display text-lg font-semibold leading-tight text-arbor-cream transition-colors hover:text-arbor-lichen"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.sound.title)}`);
					else return [createTextVNode(toDisplayString(__props.sound.title), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<div class="mt-2 flex items-center justify-between gap-3"><span class="truncate text-xs text-arbor-sage">${ssrInterpolate(__props.sound.user_name || __props.sound.user?.name || "Anonyme")}</span><div class="flex items-center gap-2 text-[11px] text-arbor-sage/70">`);
			if (__props.sound.play_count) _push(`<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(__props.sound.play_count)}</span>`);
			else _push(`<!---->`);
			if (__props.sound.like_count) _push(`<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> ${ssrInterpolate(__props.sound.like_count)}</span>`);
			else _push(`<!---->`);
			_push(`</div></div></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SoundCard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as t };

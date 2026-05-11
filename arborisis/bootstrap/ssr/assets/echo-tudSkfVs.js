import { usePage } from "@inertiajs/vue3";
import { computed, mergeProps, ref, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttrs, ssrRenderClass } from "vue/server-renderer";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
//#region resources/js/Components/Chat/ChatMessageItem.vue
var _sfc_main$1 = {
	__name: "ChatMessageItem",
	__ssrInlineRender: true,
	props: { message: Object },
	emits: ["delete", "ban"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const page = usePage();
		const isSystem = computed(() => props.message.type === "system");
		const isOwn = computed(() => props.message.user?.id === page.props.auth.user?.id);
		const isModerator = computed(() => page.props.auth.user?.is_moderator);
		const canDelete = computed(() => !isSystem.value && (isOwn.value || isModerator.value));
		const canBan = computed(() => isModerator.value && !isOwn.value && !isSystem.value);
		const formatTime = (date) => {
			return new Date(date).toLocaleTimeString("fr-FR", {
				hour: "2-digit",
				minute: "2-digit"
			});
		};
		return (_ctx, _push, _parent, _attrs) => {
			if (isSystem.value) _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center my-2" }, _attrs))}><span class="text-xs italic text-arbor-sage bg-arbor-glass/30 px-3 py-1 rounded-full">${ssrInterpolate(__props.message.body)}</span></div>`);
			else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: ["flex gap-3 mb-4", isOwn.value ? "flex-row-reverse" : "flex-row"] }, _attrs))}><div class="w-8 h-8 rounded-full bg-arbor-moss/30 flex items-center justify-center text-xs font-medium text-arbor-emerald shrink-0">${ssrInterpolate(__props.message.user?.name?.charAt(0).toUpperCase() || "?")}</div><div class="${ssrRenderClass([isOwn.value ? "text-right" : "text-left", "max-w-[70%]"])}"><div class="${ssrRenderClass([isOwn.value ? "justify-end" : "justify-start", "flex items-center gap-2 mb-0.5"])}"><span class="text-xs font-medium text-arbor-sage">${ssrInterpolate(__props.message.user?.name || "Inconnu")}</span><span class="text-[10px] text-arbor-sage/60">${ssrInterpolate(formatTime(__props.message.created_at))}</span>`);
				if (__props.message.user?.is_moderator || __props.message.is_moderator) _push(`<span class="text-[10px] bg-arbor-amber/20 text-arbor-amber px-1 rounded">Modo</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="${ssrRenderClass([isOwn.value ? "bg-arbor-emerald/20 text-arbor-cream" : "bg-arbor-glass text-arbor-cream", "inline-block px-3 py-2 rounded-xl text-sm"])}">${ssrInterpolate(__props.message.body)}</div>`);
				if (canBan.value) _push(`<button class="ml-2 text-arbor-sage/50 hover:text-arbor-amber text-xs"> Exclure </button>`);
				else _push(`<!---->`);
				if (canDelete.value) _push(`<button class="ml-2 text-arbor-sage/50 hover:text-red-400 text-xs"> Suppr. </button>`);
				else _push(`<!---->`);
				_push(`</div></div>`);
			}
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Chat/ChatMessageItem.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Chat/ChatInput.vue
var _sfc_main = {
	__name: "ChatInput",
	__ssrInlineRender: true,
	props: { loading: Boolean },
	emits: ["send"],
	setup(__props, { emit: __emit }) {
		const body = ref("");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 border-t border-arbor-glass-border bg-arbor-deep/30" }, _attrs))}><div class="flex gap-3"><textarea rows="1" class="flex-1 resize-none rounded-xl bg-arbor-glass border border-arbor-glass-border px-4 py-2.5 text-sm text-arbor-cream placeholder-arbor-sage/50 focus:outline-none focus:border-arbor-emerald/50" placeholder="Écrivez un message... (Ctrl+Enter pour envoyer)">${ssrInterpolate(body.value)}</textarea><button${ssrIncludeBooleanAttr(__props.loading || !body.value.trim()) ? " disabled" : ""} class="shrink-0 px-4 py-2 rounded-xl bg-arbor-emerald text-arbor-night font-medium text-sm hover:bg-arbor-emerald-dark disabled:opacity-50 transition"> Envoyer </button></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Chat/ChatInput.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
//#region resources/js/echo.js
window.Pusher = Pusher;
var echo = new Echo({
	broadcaster: "reverb",
	key: "arborisis-local-key",
	wsHost: "arborisis.com",
	wsPort: "443",
	wssPort: "443",
	forceTLS: true,
	enabledTransports: ["ws", "wss"]
});
//#endregion
export { _sfc_main as n, _sfc_main$1 as r, echo as t };

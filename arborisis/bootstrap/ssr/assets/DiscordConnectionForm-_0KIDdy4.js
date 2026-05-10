import { useForm } from "@inertiajs/vue3";
import { unref, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs } from "vue/server-renderer";
//#region resources/js/Pages/Profile/Partials/DiscordConnectionForm.vue
var _sfc_main = {
	__name: "DiscordConnectionForm",
	__ssrInlineRender: true,
	props: { discord: {
		type: Object,
		default: null
	} },
	setup(__props) {
		const form = useForm({});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-medium text-arbor-cream"> Compte Discord </h2><p class="mt-1 text-sm text-arbor-fog"> Liez votre compte Discord pour accéder aux fonctionnalités du bot. </p></header><div class="mt-6">`);
			if (__props.discord) {
				_push(`<div class="flex items-center gap-4">`);
				if (__props.discord.discord_avatar) _push(`<img${ssrRenderAttr("src", `https://cdn.discordapp.com/avatars/${__props.discord.discord_id}/${__props.discord.discord_avatar}.png`)} alt="Avatar Discord" class="h-12 w-12 rounded-full border border-arbor-sage/30">`);
				else _push(`<!---->`);
				_push(`<div class="flex-1"><p class="text-arbor-cream font-medium">${ssrInterpolate(__props.discord.discord_username)}</p><p class="text-xs text-arbor-fog"> Lié le ${ssrInterpolate(new Date(__props.discord.linked_at).toLocaleDateString("fr-FR"))}</p></div><button type="button" class="inline-flex items-center rounded-md bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-600/30 transition"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}> Déconnecter </button></div>`);
			} else _push(`<div><a${ssrRenderAttr("href", _ctx.route("discord.redirect"))} class="inline-flex items-center rounded-md bg-[#5865F2] px-4 py-2 text-sm font-medium text-white hover:bg-[#4752C4] transition"><svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path></svg> Connecter Discord </a></div>`);
			_push(`</div></section>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/DiscordConnectionForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

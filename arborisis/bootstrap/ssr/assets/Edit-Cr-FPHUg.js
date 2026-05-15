import { t as _sfc_main$1 } from "./AuthenticatedLayout-BYUVvhyG.js";
import _sfc_main$2 from "./DeleteUserForm-Clvj-G7B.js";
import _sfc_main$3 from "./DiscordConnectionForm-BD-JW2p1.js";
import _sfc_main$4 from "./UpdatePasswordForm-eKaCx-md.js";
import _sfc_main$5 from "./UpdateProfileInformationForm-Bdqe40aC.js";
import _sfc_main$6 from "./UpdateAvatarForm-D5TI305u.js";
import { Head } from "@inertiajs/vue3";
import { createVNode, unref, useSSRContext, withCtx } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Pages/Profile/Edit.vue
var _sfc_main = {
	__name: "Edit",
	__ssrInlineRender: true,
	props: {
		mustVerifyEmail: { type: Boolean },
		status: { type: String },
		discord: {
			type: Object,
			default: null
		},
		profile: {
			type: Object,
			default: null
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Profil" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<h2 class="font-display text-2xl font-semibold text-arbor-cream"${_scopeId}> Paramètres du profil </h2>`);
					else return [createVNode("h2", { class: "font-display text-2xl font-semibold text-arbor-cream" }, " Paramètres du profil ")];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8"${_scopeId}><div class="glass-card p-6 sm:p-8"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$6, { "avatar-url": __props.profile?.avatarUrl }, null, _parent, _scopeId));
						_push(`</div><div class="glass-card p-6 sm:p-8"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$5, {
							"must-verify-email": __props.mustVerifyEmail,
							status: __props.status,
							profile: __props.profile,
							class: "max-w-xl"
						}, null, _parent, _scopeId));
						_push(`</div><div class="glass-card p-6 sm:p-8"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$3, { discord: __props.discord }, null, _parent, _scopeId));
						_push(`</div><div class="glass-card p-6 sm:p-8"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$4, { class: "max-w-xl" }, null, _parent, _scopeId));
						_push(`</div><div class="glass-card p-6 sm:p-8 border-red-500/20"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, { class: "max-w-xl" }, null, _parent, _scopeId));
						_push(`</div></div></div>`);
					} else return [createVNode("div", { class: "py-12" }, [createVNode("div", { class: "mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "glass-card p-6 sm:p-8" }, [createVNode(_sfc_main$6, { "avatar-url": __props.profile?.avatarUrl }, null, 8, ["avatar-url"])]),
						createVNode("div", { class: "glass-card p-6 sm:p-8" }, [createVNode(_sfc_main$5, {
							"must-verify-email": __props.mustVerifyEmail,
							status: __props.status,
							profile: __props.profile,
							class: "max-w-xl"
						}, null, 8, [
							"must-verify-email",
							"status",
							"profile"
						])]),
						createVNode("div", { class: "glass-card p-6 sm:p-8" }, [createVNode(_sfc_main$3, { discord: __props.discord }, null, 8, ["discord"])]),
						createVNode("div", { class: "glass-card p-6 sm:p-8" }, [createVNode(_sfc_main$4, { class: "max-w-xl" })]),
						createVNode("div", { class: "glass-card p-6 sm:p-8 border-red-500/20" }, [createVNode(_sfc_main$2, { class: "max-w-xl" })])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

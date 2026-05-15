import { n as _sfc_main$1, r as _sfc_main$3, t as _sfc_main$2 } from "./TextInput-BZZClIMG.js";
import { t as PrimaryButton_default } from "./PrimaryButton-CErzNidA.js";
import { Link, useForm, usePage } from "@inertiajs/vue3";
import { createTextVNode, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue
var _sfc_main = {
	__name: "UpdateProfileInformationForm",
	__ssrInlineRender: true,
	props: {
		mustVerifyEmail: { type: Boolean },
		status: { type: String },
		profile: {
			type: Object,
			default: null
		}
	},
	setup(__props) {
		const props = __props;
		const user = usePage().props.auth.user;
		const form = useForm({
			name: user.name,
			email: user.email,
			bio: props.profile?.bio ?? "",
			location: props.profile?.location ?? "",
			website: props.profile?.website ?? ""
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-medium text-arbor-cream"> Informations du profil </h2><p class="mt-1 text-sm text-arbor-sage"> Mettez à jour les informations de votre compte et votre adresse e-mail. </p></header><form class="mt-6 space-y-6"><div>`);
			_push(ssrRenderComponent(_sfc_main$1, {
				for: "name",
				value: "Nom"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$2, {
				id: "name",
				type: "text",
				class: "mt-1 block w-full",
				modelValue: unref(form).name,
				"onUpdate:modelValue": ($event) => unref(form).name = $event,
				required: "",
				autofocus: "",
				autocomplete: "name"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$3, {
				class: "mt-2",
				message: unref(form).errors.name
			}, null, _parent));
			_push(`</div><div>`);
			_push(ssrRenderComponent(_sfc_main$1, {
				for: "email",
				value: "Adresse e-mail"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$2, {
				id: "email",
				type: "email",
				class: "mt-1 block w-full",
				modelValue: unref(form).email,
				"onUpdate:modelValue": ($event) => unref(form).email = $event,
				required: "",
				autocomplete: "username"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$3, {
				class: "mt-2",
				message: unref(form).errors.email
			}, null, _parent));
			_push(`</div><div>`);
			_push(ssrRenderComponent(_sfc_main$1, {
				for: "bio",
				value: "Bio"
			}, null, _parent));
			_push(`<textarea id="bio" rows="3" maxlength="1000" class="mt-1 block w-full rounded-lg border border-arbor-fog/30 bg-arbor-charcoal/50 px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:border-arbor-emerald/50 focus:outline-none focus:ring-1 focus:ring-arbor-emerald/20 transition-colors resize-none" placeholder="Parlez-nous de vous, de votre passion pour le field recording...">${ssrInterpolate(unref(form).bio)}</textarea>`);
			_push(ssrRenderComponent(_sfc_main$3, {
				class: "mt-2",
				message: unref(form).errors.bio
			}, null, _parent));
			_push(`</div><div>`);
			_push(ssrRenderComponent(_sfc_main$1, {
				for: "location",
				value: "Localisation"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$2, {
				id: "location",
				type: "text",
				class: "mt-1 block w-full",
				modelValue: unref(form).location,
				"onUpdate:modelValue": ($event) => unref(form).location = $event,
				autocomplete: "off",
				placeholder: "Ex: Bretagne, France"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$3, {
				class: "mt-2",
				message: unref(form).errors.location
			}, null, _parent));
			_push(`</div><div>`);
			_push(ssrRenderComponent(_sfc_main$1, {
				for: "website",
				value: "Site web"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$2, {
				id: "website",
				type: "url",
				class: "mt-1 block w-full",
				modelValue: unref(form).website,
				"onUpdate:modelValue": ($event) => unref(form).website = $event,
				autocomplete: "url",
				placeholder: "https://..."
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$3, {
				class: "mt-2",
				message: unref(form).errors.website
			}, null, _parent));
			_push(`</div>`);
			if (__props.mustVerifyEmail && unref(user).email_verified_at === null) {
				_push(`<div><p class="mt-2 text-sm text-arbor-cream"> Votre adresse e-mail n&#39;est pas vérifiée. `);
				_push(ssrRenderComponent(unref(Link), {
					href: _ctx.route("verification.send"),
					method: "post",
					as: "button",
					class: "rounded-md text-sm text-arbor-sage underline hover:text-arbor-cream focus:outline-none focus:ring-2 focus:ring-arbor-emerald focus:ring-offset-2 focus:ring-offset-arbor-night"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Cliquez ici pour renvoyer l&#39;e-mail de vérification. `);
						else return [createTextVNode(" Cliquez ici pour renvoyer l'e-mail de vérification. ")];
					}),
					_: 1
				}, _parent));
				_push(`</p><div class="mt-2 text-sm font-medium text-arbor-emerald" style="${ssrRenderStyle(__props.status === "verification-link-sent" ? null : { display: "none" })}"> Un nouveau lien de vérification a été envoyé à votre adresse e-mail. </div></div>`);
			} else _push(`<!---->`);
			_push(`<div class="flex items-center gap-4">`);
			_push(ssrRenderComponent(PrimaryButton_default, { disabled: unref(form).processing }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Enregistrer`);
					else return [createTextVNode("Enregistrer")];
				}),
				_: 1
			}, _parent));
			if (unref(form).recentlySuccessful) _push(`<p class="text-sm text-arbor-emerald"> Modifications enregistrées. </p>`);
			else _push(`<!---->`);
			_push(`</div></form></section>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

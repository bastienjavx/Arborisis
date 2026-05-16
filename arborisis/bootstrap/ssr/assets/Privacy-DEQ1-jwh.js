import { t as _sfc_main$1 } from "./GuestLayout-CqMC9M4d.js";
import { Head } from "@inertiajs/vue3";
import { Fragment, createBlock, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Privacy.vue
var _sfc_main = {
	__name: "Privacy",
	__ssrInlineRender: true,
	setup(__props) {
		const sections = [
			{
				title: "Qui sommes-nous ?",
				content: `Arborisis est une plateforme sociale dédiée au field recording et à la préservation des sons de la nature. Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre site et nos services.`
			},
			{
				title: "Données collectées",
				content: `Nous collectons uniquement les données nécessaires au fonctionnement de la plateforme :

**Données d'inscription** : nom, adresse e-mail, mot de passe (chiffré). Ces informations sont obligatoires pour créer un compte.

**Données de profil** : photo de profil, biographie, liens vers vos réseaux sociaux — que vous choisissez de renseigner.

**Données de contribution** : les enregistrements audio, métadonnées associées (titre, description, tags) et localisation approximative que vous publiez.

**Données de navigation** : adresse IP, type de navigateur, pages visitées, via des cookies et outils d'analyse (Google Analytics).`
			},
			{
				title: "Finalités du traitement",
				content: `Vos données sont utilisées pour :

• Vous permettre de créer et gérer votre compte utilisateur.
• Publier, diffuser et partager vos enregistrements sur la plateforme.
• Assurer la sécurité de nos services et prévenir les abus.
• Analyser le trafic et améliorer l'expérience utilisateur (Google Analytics).
• Gérer les transactions de crédits ECHO entre créateurs et donateurs.
• Vous contacter en cas de besoin (notifications, support, mise à jour des conditions).`
			},
			{
				title: "Cookies et traceurs",
				content: `Arborisis utilise des cookies pour garantir le bon fonctionnement du site et mesurer son audience.

**Cookies essentiels** : nécessaires à l'authentification et à la sécurité. Ils ne peuvent pas être désactivés.

**Cookies analytiques** : nous permettent de comprendre comment vous utilisez le site (Google Analytics). Ils ne sont déposés qu'avec votre consentement explicite.

**Cookies publicitaires** : actuellement non utilisés, mais réservés pour de futures campagnes de communication. Ils nécessitent votre consentement.

Vous pouvez modifier vos choix à tout moment en cliquant sur « Cookies » en bas de page.`
			},
			{
				title: "Partage des données",
				content: `Vos données personnelles ne sont jamais revendues à des tiers. Nous ne les partageons qu'avec :

• **Nos sous-traitants techniques** : hébergeur (Contabo), services de stockage (Contabo S3), prestataire de paiement (Stripe) — tous soumis au RGPD.
• **Autorités compétentes** : uniquement sur réquisition judiciaire ou pour répondre à une obligation légale.
• **Autres utilisateurs** : les informations de profil public et les enregistrements que vous publiez sont visibles par l'ensemble de la communauté Arborisis.`
			},
			{
				title: "Sécurité et conservation",
				content: `Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données : chiffrement des mots de passe (bcrypt), connexions HTTPS/TLS, accès restreints aux serveurs.

La durée de conservation varie selon les données :

• **Données de compte** : conservées tant que votre compte est actif. Supprimées sous 30 jours après une demande de suppression définitive.
• **Enregistrements audio** : conservés tant qu'ils restent publiés. Vous pouvez les supprimer à tout moment.
• **Données de navigation** : anonymisées sous 14 mois pour Google Analytics.`
			},
			{
				title: "Vos droits (RGPD)",
				content: `Conformément au Règlement Général sur la Protection des Données, vous disposez des droits suivants :

• **Droit d'accès** : obtenir une copie de vos données personnelles.
• **Droit de rectification** : corriger des informations inexactes.
• **Droit à l'effacement** : demander la suppression de vos données (droit à l'oubli).
• **Droit à la portabilité** : récupérer vos données dans un format structuré.
• **Droit d'opposition** : vous opposer au traitement de certaines données.
• **Droit de limitation** : restreindre temporairement le traitement.

Pour exercer ces droits, contactez-nous à l'adresse indiquée ci-dessous. Nous répondons dans un délai maximum d'un mois.`
			},
			{
				title: "Contact",
				content: `Pour toute question relative à cette politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter :

**E-mail** : privacy@arborisis.com

Dernière mise à jour : mai 2026.`
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Politique de confidentialité" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-screen bg-arbor-night"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-40"${_scopeId}></div></div><div class="relative z-10"${_scopeId}><section class="pt-24 pb-16 px-4 sm:px-6 lg:px-8"${_scopeId}><div class="max-w-3xl mx-auto text-center"${_scopeId}><h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-arbor-cream leading-tight mb-6"${_scopeId}> Politique de <span class="text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss"${_scopeId}>confidentialité</span></h1><p class="text-arbor-sage text-lg max-w-2xl mx-auto leading-relaxed"${_scopeId}> Nous accordons une importance capitale à la protection de vos données. Découvrez comment nous les traitons, les sécurisons et respectons vos droits. </p></div></section><section class="py-16 px-4 sm:px-6 lg:px-8"${_scopeId}><div class="max-w-3xl mx-auto space-y-4"${_scopeId}><!--[-->`);
						ssrRenderList(sections, (section, index) => {
							_push(`<div class="glass-card p-6 sm:p-8 hover:bg-white/10 transition-all duration-300" style="${ssrRenderStyle(`animation: slideUp 0.5s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`)}"${_scopeId}><h2 class="font-display text-xl sm:text-2xl font-bold text-arbor-cream mb-4"${_scopeId}>${ssrInterpolate(section.title)}</h2><div class="text-arbor-sage leading-relaxed text-sm sm:text-base space-y-3 whitespace-pre-line"${_scopeId}>${ssrInterpolate(section.content)}</div></div>`);
						});
						_push(`<!--]--></div></section></div></div>`);
					} else return [createVNode("div", { class: "relative min-h-screen bg-arbor-night" }, [createVNode("div", {
						class: "absolute inset-0 overflow-hidden pointer-events-none",
						"aria-hidden": "true"
					}, [createVNode("div", { class: "absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-40" })]), createVNode("div", { class: "relative z-10" }, [createVNode("section", { class: "pt-24 pb-16 px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "max-w-3xl mx-auto text-center" }, [createVNode("h1", { class: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-arbor-cream leading-tight mb-6" }, [createTextVNode(" Politique de "), createVNode("span", { class: "text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss" }, "confidentialité")]), createVNode("p", { class: "text-arbor-sage text-lg max-w-2xl mx-auto leading-relaxed" }, " Nous accordons une importance capitale à la protection de vos données. Découvrez comment nous les traitons, les sécurisons et respectons vos droits. ")])]), createVNode("section", { class: "py-16 px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "max-w-3xl mx-auto space-y-4" }, [(openBlock(), createBlock(Fragment, null, renderList(sections, (section, index) => {
						return createVNode("div", {
							key: section.title,
							class: "glass-card p-6 sm:p-8 hover:bg-white/10 transition-all duration-300",
							style: `animation: slideUp 0.5s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`
						}, [createVNode("h2", { class: "font-display text-xl sm:text-2xl font-bold text-arbor-cream mb-4" }, toDisplayString(section.title), 1), createVNode("div", { class: "text-arbor-sage leading-relaxed text-sm sm:text-base space-y-3 whitespace-pre-line" }, toDisplayString(section.content), 1)], 4);
					}), 64))])])])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Privacy.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

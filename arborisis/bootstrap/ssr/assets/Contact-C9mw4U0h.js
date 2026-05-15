import { t as _sfc_main$1 } from "./GuestLayout-30iBKZwO.js";
import { Head, router, useForm } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelText, withCtx, withDirectives, withKeys, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Contact.vue
var _sfc_main = {
	__name: "Contact",
	__ssrInlineRender: true,
	props: {
		flash: Object,
		ticket: String,
		ticketData: Object
	},
	setup(__props) {
		const props = __props;
		const form = useForm({
			type: "contact",
			name: "",
			email: "",
			subject: "",
			message: ""
		});
		const trackInput = ref(props.ticket ?? "");
		const trackError = ref("");
		const types = [
			{
				value: "contact",
				label: "Contact général",
				description: "Pour toute question ou suggestion."
			},
			{
				value: "privacy",
				label: "Données personnelles / RGPD",
				description: "Exercer vos droits ou signaler un problème de confidentialité."
			},
			{
				value: "support",
				label: "Support technique",
				description: "Un bug, un problème de connexion ou d'upload ?"
			}
		];
		computed(() => {
			return types.find((t) => t.value === form.type)?.label ?? "";
		});
		function submit() {
			form.post(route("contact.store"), {
				preserveScroll: true,
				onSuccess: () => form.reset("subject", "message")
			});
		}
		function trackTicket() {
			trackError.value = "";
			const value = trackInput.value.trim().toUpperCase();
			if (!value) {
				router.get(route("contact"), {}, { preserveState: true });
				return;
			}
			if (!/^ARB-\d{8}-[A-Z0-9]{5}$/.test(value)) {
				trackError.value = "Le numéro de suivi doit être au format ARB-YYYYMMDD-XXXXX.";
				return;
			}
			router.get(route("contact"), { ticket: value }, { preserveState: true });
		}
		const statusBadgeClass = computed(() => {
			if (!props.ticketData) return "";
			switch (props.ticketData.status) {
				case "new": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
				case "in_progress": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
				case "resolved": return "bg-arbor-emerald/10 text-arbor-emerald border-arbor-emerald/20";
				case "spam": return "bg-red-500/10 text-red-400 border-red-500/20";
				default: return "bg-arbor-glass/30 text-arbor-sage border-arbor-glass-border";
			}
		});
		function formatDate(iso) {
			return new Date(iso).toLocaleDateString("fr-FR", {
				day: "numeric",
				month: "long",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Contact" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-screen bg-arbor-night"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-40"${_scopeId}></div></div><div class="relative z-10"${_scopeId}><section class="pt-24 pb-12 px-4 sm:px-6 lg:px-8"${_scopeId}><div class="max-w-3xl mx-auto text-center"${_scopeId}><h1 class="font-display text-4xl sm:text-5xl font-bold text-arbor-cream leading-tight mb-4"${_scopeId}> Contactez-<span class="text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss"${_scopeId}>nous</span></h1><p class="text-arbor-sage text-lg max-w-2xl mx-auto leading-relaxed"${_scopeId}> Une question, une demande RGPD ou un problème technique ? Nous vous répondrons dans les plus brefs délais. </p></div></section><section class="pb-24 px-4 sm:px-6 lg:px-8"${_scopeId}><div class="max-w-2xl mx-auto space-y-10"${_scopeId}><div class="p-6 rounded-2xl border border-arbor-glass-border bg-arbor-glass/20"${_scopeId}><h2 class="text-lg font-semibold text-arbor-cream mb-4"${_scopeId}>Suivre ma demande</h2><div class="flex flex-col sm:flex-row gap-3"${_scopeId}><input${ssrRenderAttr("value", trackInput.value)} type="text" class="flex-1 rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors uppercase" placeholder="ARB-YYYYMMDD-XXXXX"${_scopeId}><button type="button" class="btn-primary px-6 py-2.5 text-sm font-medium"${_scopeId}> Suivre </button></div>`);
						if (trackError.value) _push(`<div class="mt-2 text-sm text-red-400"${_scopeId}>${ssrInterpolate(trackError.value)}</div>`);
						else _push(`<!---->`);
						if (__props.ticketData) {
							_push(`<div class="mt-6 space-y-4"${_scopeId}><div class="flex items-center gap-3 flex-wrap"${_scopeId}><span class="text-sm font-mono text-arbor-sage"${_scopeId}>${ssrInterpolate(__props.ticketData.ticket_number)}</span><span class="${ssrRenderClass([statusBadgeClass.value, "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"])}"${_scopeId}>${ssrInterpolate(__props.ticketData.status_label)}</span><span class="text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(__props.ticketData.type_label)}</span></div><div class="p-4 rounded-xl bg-arbor-glass/30 border border-arbor-glass-border"${_scopeId}><h3 class="text-sm font-medium text-arbor-cream mb-1"${_scopeId}>${ssrInterpolate(__props.ticketData.subject)}</h3><p class="text-sm text-arbor-sage whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(__props.ticketData.message)}</p><p class="text-xs text-arbor-sage/60 mt-2"${_scopeId}>Ouvert le ${ssrInterpolate(formatDate(__props.ticketData.created_at))}</p></div>`);
							if (__props.ticketData.replies.length > 0) {
								_push(`<div class="space-y-3"${_scopeId}><h4 class="text-sm font-medium text-arbor-cream"${_scopeId}>Réponses</h4><!--[-->`);
								ssrRenderList(__props.ticketData.replies, (reply, idx) => {
									_push(`<div class="p-4 rounded-xl bg-arbor-glass/20 border border-arbor-glass-border"${_scopeId}><div class="flex items-center justify-between mb-1"${_scopeId}><span class="text-xs font-medium text-arbor-emerald"${_scopeId}>${ssrInterpolate(reply.author)}</span><span class="text-xs text-arbor-sage/60"${_scopeId}>${ssrInterpolate(formatDate(reply.created_at))}</span></div><p class="text-sm text-arbor-sage whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(reply.reply)}</p></div>`);
								});
								_push(`<!--]--></div>`);
							} else _push(`<div class="text-sm text-arbor-sage/70"${_scopeId}> Aucune réponse pour le moment. Notre équipe vous répondra sous peu. </div>`);
							_push(`</div>`);
						} else if (__props.ticket) _push(`<div class="mt-6 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 text-sm"${_scopeId}> Aucun ticket trouvé avec le numéro <span class="font-mono"${_scopeId}>${ssrInterpolate(__props.ticket)}</span>. </div>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><h2 class="text-lg font-semibold text-arbor-cream mb-4"${_scopeId}>Nouvelle demande</h2>`);
						if (_ctx.$page.props.flash?.success) _push(`<div class="mb-6 p-4 rounded-xl bg-arbor-emerald/10 border border-arbor-emerald/20 text-arbor-emerald text-sm"${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.success)}</div>`);
						else _push(`<!---->`);
						_push(`<form class="space-y-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-arbor-cream mb-3"${_scopeId}>Type de demande</label><div class="grid grid-cols-1 sm:grid-cols-3 gap-3"${_scopeId}><!--[-->`);
						ssrRenderList(types, (t) => {
							_push(`<button type="button" class="${ssrRenderClass(["text-left p-4 rounded-xl border transition-colors duration-200", unref(form).type === t.value ? "border-arbor-emerald bg-arbor-emerald/10 text-arbor-emerald" : "border-arbor-glass-border bg-arbor-glass/30 text-arbor-sage hover:bg-white/10"])}"${_scopeId}><div class="font-medium text-sm"${_scopeId}>${ssrInterpolate(t.label)}</div><div class="text-xs mt-1 opacity-80 leading-snug"${_scopeId}>${ssrInterpolate(t.description)}</div></button>`);
						});
						_push(`<!--]--></div>`);
						if (unref(form).errors.type) _push(`<div class="mt-2 text-sm text-red-400"${_scopeId}>${ssrInterpolate(unref(form).errors.type)}</div>`);
						else _push(`<!---->`);
						_push(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label for="name" class="block text-sm font-medium text-arbor-cream mb-1.5"${_scopeId}>Nom</label><input id="name"${ssrRenderAttr("value", unref(form).name)} type="text" required class="w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors" placeholder="Votre nom"${_scopeId}>`);
						if (unref(form).errors.name) _push(`<div class="mt-1.5 text-sm text-red-400"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</div>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label for="email" class="block text-sm font-medium text-arbor-cream mb-1.5"${_scopeId}>E-mail</label><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" required class="w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors" placeholder="vous@exemple.com"${_scopeId}>`);
						if (unref(form).errors.email) _push(`<div class="mt-1.5 text-sm text-red-400"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</div>`);
						else _push(`<!---->`);
						_push(`</div></div><div${_scopeId}><label for="subject" class="block text-sm font-medium text-arbor-cream mb-1.5"${_scopeId}>Sujet</label><input id="subject"${ssrRenderAttr("value", unref(form).subject)} type="text" required class="w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors" placeholder="Sujet de votre message"${_scopeId}>`);
						if (unref(form).errors.subject) _push(`<div class="mt-1.5 text-sm text-red-400"${_scopeId}>${ssrInterpolate(unref(form).errors.subject)}</div>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label for="message" class="block text-sm font-medium text-arbor-cream mb-1.5"${_scopeId}>Message</label><textarea id="message" rows="5" required maxlength="5000" class="w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors resize-none" placeholder="Décrivez votre demande en détail..."${_scopeId}>${ssrInterpolate(unref(form).message)}</textarea><div class="mt-1 flex justify-between"${_scopeId}>`);
						if (unref(form).errors.message) _push(`<span class="text-sm text-red-400"${_scopeId}>${ssrInterpolate(unref(form).errors.message)}</span>`);
						else _push(`<!---->`);
						_push(`<span class="text-xs text-arbor-sage ml-auto"${_scopeId}>${ssrInterpolate(unref(form).message.length)} / 5000</span></div></div><div class="pt-2"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary w-full sm:w-auto px-8 py-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>`);
						if (unref(form).processing) _push(`<span${_scopeId}>Envoi en cours...</span>`);
						else _push(`<span${_scopeId}>Envoyer ma demande</span>`);
						_push(`</button></div><p class="text-xs text-arbor-sage"${_scopeId}> En soumettant ce formulaire, vous acceptez que vos données soient traitées conformément à notre <a href="/privacy" class="text-arbor-emerald hover:underline"${_scopeId}>politique de confidentialité</a>. Vous recevrez un numéro de suivi unique. </p></form></div></div></section></div></div>`);
					} else return [createVNode("div", { class: "relative min-h-screen bg-arbor-night" }, [createVNode("div", {
						class: "absolute inset-0 overflow-hidden pointer-events-none",
						"aria-hidden": "true"
					}, [createVNode("div", { class: "absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-40" })]), createVNode("div", { class: "relative z-10" }, [createVNode("section", { class: "pt-24 pb-12 px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "max-w-3xl mx-auto text-center" }, [createVNode("h1", { class: "font-display text-4xl sm:text-5xl font-bold text-arbor-cream leading-tight mb-4" }, [createTextVNode(" Contactez-"), createVNode("span", { class: "text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss" }, "nous")]), createVNode("p", { class: "text-arbor-sage text-lg max-w-2xl mx-auto leading-relaxed" }, " Une question, une demande RGPD ou un problème technique ? Nous vous répondrons dans les plus brefs délais. ")])]), createVNode("section", { class: "pb-24 px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "max-w-2xl mx-auto space-y-10" }, [createVNode("div", { class: "p-6 rounded-2xl border border-arbor-glass-border bg-arbor-glass/20" }, [
						createVNode("h2", { class: "text-lg font-semibold text-arbor-cream mb-4" }, "Suivre ma demande"),
						createVNode("div", { class: "flex flex-col sm:flex-row gap-3" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => trackInput.value = $event,
							type: "text",
							class: "flex-1 rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors uppercase",
							placeholder: "ARB-YYYYMMDD-XXXXX",
							onKeydown: withKeys(withModifiers(trackTicket, ["prevent"]), ["enter"])
						}, null, 40, ["onUpdate:modelValue", "onKeydown"]), [[vModelText, trackInput.value]]), createVNode("button", {
							type: "button",
							onClick: trackTicket,
							class: "btn-primary px-6 py-2.5 text-sm font-medium"
						}, " Suivre ")]),
						trackError.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-2 text-sm text-red-400"
						}, toDisplayString(trackError.value), 1)) : createCommentVNode("", true),
						__props.ticketData ? (openBlock(), createBlock("div", {
							key: 1,
							class: "mt-6 space-y-4"
						}, [
							createVNode("div", { class: "flex items-center gap-3 flex-wrap" }, [
								createVNode("span", { class: "text-sm font-mono text-arbor-sage" }, toDisplayString(__props.ticketData.ticket_number), 1),
								createVNode("span", { class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", statusBadgeClass.value] }, toDisplayString(__props.ticketData.status_label), 3),
								createVNode("span", { class: "text-xs text-arbor-sage" }, toDisplayString(__props.ticketData.type_label), 1)
							]),
							createVNode("div", { class: "p-4 rounded-xl bg-arbor-glass/30 border border-arbor-glass-border" }, [
								createVNode("h3", { class: "text-sm font-medium text-arbor-cream mb-1" }, toDisplayString(__props.ticketData.subject), 1),
								createVNode("p", { class: "text-sm text-arbor-sage whitespace-pre-wrap" }, toDisplayString(__props.ticketData.message), 1),
								createVNode("p", { class: "text-xs text-arbor-sage/60 mt-2" }, "Ouvert le " + toDisplayString(formatDate(__props.ticketData.created_at)), 1)
							]),
							__props.ticketData.replies.length > 0 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "space-y-3"
							}, [createVNode("h4", { class: "text-sm font-medium text-arbor-cream" }, "Réponses"), (openBlock(true), createBlock(Fragment, null, renderList(__props.ticketData.replies, (reply, idx) => {
								return openBlock(), createBlock("div", {
									key: idx,
									class: "p-4 rounded-xl bg-arbor-glass/20 border border-arbor-glass-border"
								}, [createVNode("div", { class: "flex items-center justify-between mb-1" }, [createVNode("span", { class: "text-xs font-medium text-arbor-emerald" }, toDisplayString(reply.author), 1), createVNode("span", { class: "text-xs text-arbor-sage/60" }, toDisplayString(formatDate(reply.created_at)), 1)]), createVNode("p", { class: "text-sm text-arbor-sage whitespace-pre-wrap" }, toDisplayString(reply.reply), 1)]);
							}), 128))])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "text-sm text-arbor-sage/70"
							}, " Aucune réponse pour le moment. Notre équipe vous répondra sous peu. "))
						])) : __props.ticket ? (openBlock(), createBlock("div", {
							key: 2,
							class: "mt-6 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 text-sm"
						}, [
							createTextVNode(" Aucun ticket trouvé avec le numéro "),
							createVNode("span", { class: "font-mono" }, toDisplayString(__props.ticket), 1),
							createTextVNode(". ")
						])) : createCommentVNode("", true)
					]), createVNode("div", null, [
						createVNode("h2", { class: "text-lg font-semibold text-arbor-cream mb-4" }, "Nouvelle demande"),
						_ctx.$page.props.flash?.success ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mb-6 p-4 rounded-xl bg-arbor-emerald/10 border border-arbor-emerald/20 text-arbor-emerald text-sm"
						}, toDisplayString(_ctx.$page.props.flash.success), 1)) : createCommentVNode("", true),
						createVNode("form", {
							onSubmit: withModifiers(submit, ["prevent"]),
							class: "space-y-6"
						}, [
							createVNode("div", null, [
								createVNode("label", { class: "block text-sm font-medium text-arbor-cream mb-3" }, "Type de demande"),
								createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-3" }, [(openBlock(), createBlock(Fragment, null, renderList(types, (t) => {
									return createVNode("button", {
										key: t.value,
										type: "button",
										onClick: ($event) => unref(form).type = t.value,
										class: ["text-left p-4 rounded-xl border transition-colors duration-200", unref(form).type === t.value ? "border-arbor-emerald bg-arbor-emerald/10 text-arbor-emerald" : "border-arbor-glass-border bg-arbor-glass/30 text-arbor-sage hover:bg-white/10"]
									}, [createVNode("div", { class: "font-medium text-sm" }, toDisplayString(t.label), 1), createVNode("div", { class: "text-xs mt-1 opacity-80 leading-snug" }, toDisplayString(t.description), 1)], 10, ["onClick"]);
								}), 64))]),
								unref(form).errors.type ? (openBlock(), createBlock("div", {
									key: 0,
									class: "mt-2 text-sm text-red-400"
								}, toDisplayString(unref(form).errors.type), 1)) : createCommentVNode("", true)
							]),
							createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [createVNode("div", null, [
								createVNode("label", {
									for: "name",
									class: "block text-sm font-medium text-arbor-cream mb-1.5"
								}, "Nom"),
								withDirectives(createVNode("input", {
									id: "name",
									"onUpdate:modelValue": ($event) => unref(form).name = $event,
									type: "text",
									required: "",
									class: "w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors",
									placeholder: "Votre nom"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).name]]),
								unref(form).errors.name ? (openBlock(), createBlock("div", {
									key: 0,
									class: "mt-1.5 text-sm text-red-400"
								}, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
							]), createVNode("div", null, [
								createVNode("label", {
									for: "email",
									class: "block text-sm font-medium text-arbor-cream mb-1.5"
								}, "E-mail"),
								withDirectives(createVNode("input", {
									id: "email",
									"onUpdate:modelValue": ($event) => unref(form).email = $event,
									type: "email",
									required: "",
									class: "w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors",
									placeholder: "vous@exemple.com"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).email]]),
								unref(form).errors.email ? (openBlock(), createBlock("div", {
									key: 0,
									class: "mt-1.5 text-sm text-red-400"
								}, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
							])]),
							createVNode("div", null, [
								createVNode("label", {
									for: "subject",
									class: "block text-sm font-medium text-arbor-cream mb-1.5"
								}, "Sujet"),
								withDirectives(createVNode("input", {
									id: "subject",
									"onUpdate:modelValue": ($event) => unref(form).subject = $event,
									type: "text",
									required: "",
									class: "w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors",
									placeholder: "Sujet de votre message"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).subject]]),
								unref(form).errors.subject ? (openBlock(), createBlock("div", {
									key: 0,
									class: "mt-1.5 text-sm text-red-400"
								}, toDisplayString(unref(form).errors.subject), 1)) : createCommentVNode("", true)
							]),
							createVNode("div", null, [
								createVNode("label", {
									for: "message",
									class: "block text-sm font-medium text-arbor-cream mb-1.5"
								}, "Message"),
								withDirectives(createVNode("textarea", {
									id: "message",
									"onUpdate:modelValue": ($event) => unref(form).message = $event,
									rows: "5",
									required: "",
									maxlength: "5000",
									class: "w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors resize-none",
									placeholder: "Décrivez votre demande en détail..."
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).message]]),
								createVNode("div", { class: "mt-1 flex justify-between" }, [unref(form).errors.message ? (openBlock(), createBlock("span", {
									key: 0,
									class: "text-sm text-red-400"
								}, toDisplayString(unref(form).errors.message), 1)) : createCommentVNode("", true), createVNode("span", { class: "text-xs text-arbor-sage ml-auto" }, toDisplayString(unref(form).message.length) + " / 5000", 1)])
							]),
							createVNode("div", { class: "pt-2" }, [createVNode("button", {
								type: "submit",
								disabled: unref(form).processing,
								class: "btn-primary w-full sm:w-auto px-8 py-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
							}, [unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Envoi en cours...")) : (openBlock(), createBlock("span", { key: 1 }, "Envoyer ma demande"))], 8, ["disabled"])]),
							createVNode("p", { class: "text-xs text-arbor-sage" }, [
								createTextVNode(" En soumettant ce formulaire, vous acceptez que vos données soient traitées conformément à notre "),
								createVNode("a", {
									href: "/privacy",
									class: "text-arbor-emerald hover:underline"
								}, "politique de confidentialité"),
								createTextVNode(". Vous recevrez un numéro de suivi unique. ")
							])
						], 32)
					])])])])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Contact.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

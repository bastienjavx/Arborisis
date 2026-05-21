import { t as _sfc_main$1 } from "./AuthenticatedLayout-BPpla_WX.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, toDisplayString, unref, useSSRContext, vModelRadio, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseEqual, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Pages/Admin/Helpdesk/Show.vue
var _sfc_main = {
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		ticket: Object,
		pendingSuggestion: Object
	},
	setup(__props) {
		const props = __props;
		const validateForm = useForm({
			action: "validate",
			edited_body: props.pendingSuggestion?.suggested_body || "",
			rejection_reason: ""
		});
		function submitValidation() {
			validateForm.post(`/api/helpdesk/ia-suggestions/${props.pendingSuggestion.id}/validate`, { onSuccess: () => window.location.reload() });
		}
		function formatDate(date) {
			if (!date) return "-";
			return new Date(date).toLocaleDateString("fr-FR", {
				day: "numeric",
				month: "short",
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: `Validation IA #${__props.ticket.ticket_number}` }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/admin/helpdesk",
							class: "text-sm text-arbor-sage transition hover:text-arbor-cream"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` ← Retour à l&#39;admin `);
								else return [createTextVNode(" ← Retour à l'admin ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div class="mb-8 rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-6"${_scopeId}><span class="font-mono text-sm text-arbor-sage"${_scopeId}>${ssrInterpolate(__props.ticket.ticket_number)}</span><h1 class="mt-2 font-display text-2xl text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.ticket.subject)}</h1><p class="mt-4 text-sm leading-relaxed text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.ticket.body)}</p><p class="mt-4 text-xs text-arbor-sage"${_scopeId}>Par ${ssrInterpolate(__props.ticket.user.name)} · ${ssrInterpolate(formatDate(__props.ticket.created_at))}</p></div>`);
						if (__props.pendingSuggestion) {
							_push(`<div class="rounded-2xl border border-arbor-emerald/30 bg-arbor-emerald/5 p-6"${_scopeId}><div class="mb-4 flex items-center gap-2"${_scopeId}><svg class="h-5 w-5 text-arbor-firefly" viewBox="0 0 24 24" fill="none" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg><h2 class="text-lg font-medium text-arbor-firefly"${_scopeId}>Suggestion IA — Validation requise</h2></div><p class="mb-2 text-xs text-arbor-sage"${_scopeId}>Modèle : ${ssrInterpolate(__props.pendingSuggestion.model_used || "Sylve")}</p><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-arbor-cream"${_scopeId}>Réponse suggérée (modifiable)</label><textarea rows="8" class="w-full resize-none rounded-xl border border-arbor-glass-border bg-arbor-night/70 px-4 py-3 text-sm text-arbor-cream focus:border-arbor-emerald focus:ring-arbor-emerald/40"${_scopeId}>${ssrInterpolate(unref(validateForm).edited_body)}</textarea></div>`);
							if (unref(validateForm).action === "reject") _push(`<div${_scopeId}><label class="mb-2 block text-sm font-medium text-arbor-cream"${_scopeId}>Motif du rejet</label><textarea rows="3" class="w-full resize-none rounded-xl border border-arbor-glass-border bg-arbor-night/70 px-4 py-3 text-sm text-arbor-cream focus:border-arbor-emerald focus:ring-arbor-emerald/40" placeholder="Pourquoi cette suggestion est-elle rejetée ?"${_scopeId}>${ssrInterpolate(unref(validateForm).rejection_reason)}</textarea></div>`);
							else _push(`<!---->`);
							_push(`<div class="flex flex-wrap gap-3"${_scopeId}><label class="${ssrRenderClass([unref(validateForm).action === "validate" ? "border-arbor-emerald/40 bg-arbor-emerald/10 text-arbor-firefly" : "border-arbor-glass-border bg-arbor-glass/10 text-arbor-sage", "cursor-pointer rounded-xl border px-5 py-2.5 text-sm font-medium transition"])}"${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(validateForm).action, "validate")) ? " checked" : ""} type="radio" value="validate" class="sr-only"${_scopeId}> Valider et envoyer </label><label class="${ssrRenderClass([unref(validateForm).action === "edit" ? "border-arbor-emerald/40 bg-arbor-emerald/10 text-arbor-firefly" : "border-arbor-glass-border bg-arbor-glass/10 text-arbor-sage", "cursor-pointer rounded-xl border px-5 py-2.5 text-sm font-medium transition"])}"${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(validateForm).action, "edit")) ? " checked" : ""} type="radio" value="edit" class="sr-only"${_scopeId}> Modifier et envoyer </label><label class="${ssrRenderClass([unref(validateForm).action === "reject" ? "border-red-500/40 bg-red-500/10 text-red-300" : "border-arbor-glass-border bg-arbor-glass/10 text-arbor-sage", "cursor-pointer rounded-xl border px-5 py-2.5 text-sm font-medium transition"])}"${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(validateForm).action, "reject")) ? " checked" : ""} type="radio" value="reject" class="sr-only"${_scopeId}> Rejeter </label></div><button type="submit"${ssrIncludeBooleanAttr(unref(validateForm).processing) ? " disabled" : ""} class="rounded-xl bg-arbor-emerald px-6 py-3 text-sm font-semibold text-arbor-night transition hover:bg-arbor-firefly disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(validateForm).processing ? "Traitement..." : "Confirmer")}</button></form></div>`);
						} else _push(`<div class="rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-6 text-center"${_scopeId}><p class="text-arbor-sage"${_scopeId}>Aucune suggestion IA en attente pour ce ticket.</p></div>`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "mb-6" }, [createVNode(unref(Link), {
							href: "/admin/helpdesk",
							class: "text-sm text-arbor-sage transition hover:text-arbor-cream"
						}, {
							default: withCtx(() => [createTextVNode(" ← Retour à l'admin ")]),
							_: 1
						})]),
						createVNode("div", { class: "mb-8 rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-6" }, [
							createVNode("span", { class: "font-mono text-sm text-arbor-sage" }, toDisplayString(__props.ticket.ticket_number), 1),
							createVNode("h1", { class: "mt-2 font-display text-2xl text-arbor-cream" }, toDisplayString(__props.ticket.subject), 1),
							createVNode("p", { class: "mt-4 text-sm leading-relaxed text-arbor-cream" }, toDisplayString(__props.ticket.body), 1),
							createVNode("p", { class: "mt-4 text-xs text-arbor-sage" }, "Par " + toDisplayString(__props.ticket.user.name) + " · " + toDisplayString(formatDate(__props.ticket.created_at)), 1)
						]),
						__props.pendingSuggestion ? (openBlock(), createBlock("div", {
							key: 0,
							class: "rounded-2xl border border-arbor-emerald/30 bg-arbor-emerald/5 p-6"
						}, [
							createVNode("div", { class: "mb-4 flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
								class: "h-5 w-5 text-arbor-firefly",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M13 10V3L4 14h7v7l9-11h-7z"
							})])), createVNode("h2", { class: "text-lg font-medium text-arbor-firefly" }, "Suggestion IA — Validation requise")]),
							createVNode("p", { class: "mb-2 text-xs text-arbor-sage" }, "Modèle : " + toDisplayString(__props.pendingSuggestion.model_used || "Sylve"), 1),
							createVNode("form", {
								onSubmit: withModifiers(submitValidation, ["prevent"]),
								class: "space-y-4"
							}, [
								createVNode("div", null, [createVNode("label", { class: "mb-2 block text-sm font-medium text-arbor-cream" }, "Réponse suggérée (modifiable)"), withDirectives(createVNode("textarea", {
									"onUpdate:modelValue": ($event) => unref(validateForm).edited_body = $event,
									rows: "8",
									class: "w-full resize-none rounded-xl border border-arbor-glass-border bg-arbor-night/70 px-4 py-3 text-sm text-arbor-cream focus:border-arbor-emerald focus:ring-arbor-emerald/40"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(validateForm).edited_body]])]),
								unref(validateForm).action === "reject" ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("label", { class: "mb-2 block text-sm font-medium text-arbor-cream" }, "Motif du rejet"), withDirectives(createVNode("textarea", {
									"onUpdate:modelValue": ($event) => unref(validateForm).rejection_reason = $event,
									rows: "3",
									class: "w-full resize-none rounded-xl border border-arbor-glass-border bg-arbor-night/70 px-4 py-3 text-sm text-arbor-cream focus:border-arbor-emerald focus:ring-arbor-emerald/40",
									placeholder: "Pourquoi cette suggestion est-elle rejetée ?"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(validateForm).rejection_reason]])])) : createCommentVNode("", true),
								createVNode("div", { class: "flex flex-wrap gap-3" }, [
									createVNode("label", { class: ["cursor-pointer rounded-xl border px-5 py-2.5 text-sm font-medium transition", unref(validateForm).action === "validate" ? "border-arbor-emerald/40 bg-arbor-emerald/10 text-arbor-firefly" : "border-arbor-glass-border bg-arbor-glass/10 text-arbor-sage"] }, [withDirectives(createVNode("input", {
										"onUpdate:modelValue": ($event) => unref(validateForm).action = $event,
										type: "radio",
										value: "validate",
										class: "sr-only"
									}, null, 8, ["onUpdate:modelValue"]), [[vModelRadio, unref(validateForm).action]]), createTextVNode(" Valider et envoyer ")], 2),
									createVNode("label", { class: ["cursor-pointer rounded-xl border px-5 py-2.5 text-sm font-medium transition", unref(validateForm).action === "edit" ? "border-arbor-emerald/40 bg-arbor-emerald/10 text-arbor-firefly" : "border-arbor-glass-border bg-arbor-glass/10 text-arbor-sage"] }, [withDirectives(createVNode("input", {
										"onUpdate:modelValue": ($event) => unref(validateForm).action = $event,
										type: "radio",
										value: "edit",
										class: "sr-only"
									}, null, 8, ["onUpdate:modelValue"]), [[vModelRadio, unref(validateForm).action]]), createTextVNode(" Modifier et envoyer ")], 2),
									createVNode("label", { class: ["cursor-pointer rounded-xl border px-5 py-2.5 text-sm font-medium transition", unref(validateForm).action === "reject" ? "border-red-500/40 bg-red-500/10 text-red-300" : "border-arbor-glass-border bg-arbor-glass/10 text-arbor-sage"] }, [withDirectives(createVNode("input", {
										"onUpdate:modelValue": ($event) => unref(validateForm).action = $event,
										type: "radio",
										value: "reject",
										class: "sr-only"
									}, null, 8, ["onUpdate:modelValue"]), [[vModelRadio, unref(validateForm).action]]), createTextVNode(" Rejeter ")], 2)
								]),
								createVNode("button", {
									type: "submit",
									disabled: unref(validateForm).processing,
									class: "rounded-xl bg-arbor-emerald px-6 py-3 text-sm font-semibold text-arbor-night transition hover:bg-arbor-firefly disabled:opacity-50"
								}, toDisplayString(unref(validateForm).processing ? "Traitement..." : "Confirmer"), 9, ["disabled"])
							], 32)
						])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-6 text-center"
						}, [createVNode("p", { class: "text-arbor-sage" }, "Aucune suggestion IA en attente pour ce ticket.")]))
					])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Helpdesk/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

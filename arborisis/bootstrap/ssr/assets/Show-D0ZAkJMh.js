import { t as _sfc_main$1 } from "./AuthenticatedLayout-BPpla_WX.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, vModelCheckbox, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Helpdesk/Show.vue
var _sfc_main = {
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		ticket: Object,
		canReply: Boolean
	},
	setup(__props) {
		const props = __props;
		const replyForm = useForm({
			body: "",
			is_internal_note: false
		});
		const statusLabels = {
			open: "Ouvert",
			in_progress: "En cours",
			resolved: "Résolu",
			closed: "Fermé"
		};
		const statusColors = {
			open: "bg-amber-500/20 text-amber-300 border-amber-500/30",
			in_progress: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
			resolved: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
			closed: "bg-slate-500/20 text-slate-300 border-slate-500/30"
		};
		function submitReply() {
			replyForm.post(`/helpdesk/${props.ticket.id}/reply`, { onSuccess: () => replyForm.reset() });
		}
		function formatDate(date) {
			if (!date) return "-";
			return new Date(date).toLocaleDateString("fr-FR", {
				day: "numeric",
				month: "short",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: `Ticket #${__props.ticket.ticket_number}` }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/helpdesk",
							class: "text-sm text-arbor-sage transition hover:text-arbor-cream"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` ← Retour aux tickets `);
								else return [createTextVNode(" ← Retour aux tickets ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div class="mb-8 rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-6"${_scopeId}><div class="flex items-start justify-between gap-4"${_scopeId}><div${_scopeId}><div class="flex items-center gap-3"${_scopeId}><span class="font-mono text-sm text-arbor-sage"${_scopeId}>${ssrInterpolate(__props.ticket.ticket_number)}</span><span class="${ssrRenderClass([statusColors[__props.ticket.status], "rounded-full border px-2.5 py-0.5 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(statusLabels[__props.ticket.status])}</span></div><h1 class="mt-3 font-display text-2xl text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.ticket.subject)}</h1><p class="mt-2 text-sm text-arbor-sage"${_scopeId}> Par ${ssrInterpolate(__props.ticket.user.name)} · ${ssrInterpolate(formatDate(__props.ticket.created_at))}</p></div><div class="shrink-0 text-right"${_scopeId}><span class="text-xs font-medium uppercase tracking-wide text-arbor-cyan-trace"${_scopeId}>${ssrInterpolate(__props.ticket.priority)}</span></div></div><div class="mt-6 rounded-xl bg-arbor-night/50 p-4 text-sm leading-relaxed text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.ticket.body)}</div>`);
						if (__props.canReply && __props.ticket.status !== "closed") _push(`<div class="mt-4 flex flex-wrap gap-2"${_scopeId}><form${ssrRenderAttr("action", `/helpdesk/${__props.ticket.id}/resolve`)} method="post"${_scopeId}><button type="submit" class="rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/30"${_scopeId}>Résoudre</button></form><form${ssrRenderAttr("action", `/helpdesk/${__props.ticket.id}/close`)} method="post"${_scopeId}><button type="submit" class="rounded-lg bg-slate-500/20 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-500/30"${_scopeId}>Fermer</button></form></div>`);
						else _push(`<!---->`);
						_push(`</div><div class="space-y-4"${_scopeId}><!--[-->`);
						ssrRenderList(__props.ticket.replies, (reply) => {
							_push(`<div class="${ssrRenderClass([reply.is_internal_note ? "border-amber-500/20 bg-amber-500/5" : "border-arbor-glass-border bg-arbor-glass/10", "rounded-2xl border p-5"])}"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><span class="text-sm font-medium text-arbor-cream"${_scopeId}>${ssrInterpolate(reply.user.name)}</span>`);
							if (reply.is_ai_generated) _push(`<span class="rounded bg-arbor-emerald/20 px-1.5 py-0.5 text-[10px] font-medium text-arbor-firefly"${_scopeId}>IA</span>`);
							else _push(`<!---->`);
							if (reply.is_internal_note) _push(`<span class="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-medium text-amber-300"${_scopeId}>Interne</span>`);
							else _push(`<!---->`);
							_push(`</div><span class="text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDate(reply.created_at))}</span></div><p class="mt-3 text-sm leading-relaxed text-arbor-cream"${_scopeId}>${ssrInterpolate(reply.body)}</p></div>`);
						});
						_push(`<!--]--></div>`);
						if (__props.ticket.ia_suggestions.length > 0) {
							_push(`<div class="mt-6"${_scopeId}><!--[-->`);
							ssrRenderList(__props.ticket.ia_suggestions.filter((s) => s.status === "pending"), (suggestion) => {
								_push(`<div class="rounded-2xl border border-arbor-emerald/30 bg-arbor-emerald/5 p-5"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><svg class="h-4 w-4 text-arbor-firefly" viewBox="0 0 24 24" fill="none" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg><span class="text-sm font-medium text-arbor-firefly"${_scopeId}>Suggestion IA en attente de validation</span></div><p class="mt-3 text-sm italic text-arbor-sage"${_scopeId}>${ssrInterpolate(suggestion.suggested_body)}</p></div>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						if (__props.canReply && __props.ticket.status !== "closed") {
							_push(`<div class="mt-8 rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-5"${_scopeId}><h3 class="mb-4 text-sm font-medium text-arbor-cream"${_scopeId}>Ajouter une réponse</h3><form${_scopeId}><textarea rows="4" class="w-full resize-none rounded-xl border border-arbor-glass-border bg-arbor-night/70 px-4 py-3 text-sm text-arbor-cream placeholder:text-arbor-sage/50 focus:border-arbor-emerald focus:ring-arbor-emerald/40" placeholder="Votre réponse..."${_scopeId}>${ssrInterpolate(unref(replyForm).body)}</textarea>`);
							if (unref(replyForm).errors.body) _push(`<p class="mt-1 text-xs text-red-400"${_scopeId}>${ssrInterpolate(unref(replyForm).errors.body)}</p>`);
							else _push(`<!---->`);
							_push(`<div class="mt-4 flex items-center justify-between"${_scopeId}><label class="flex items-center gap-2 text-sm text-arbor-sage"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(replyForm).is_internal_note) ? ssrLooseContain(unref(replyForm).is_internal_note, null) : unref(replyForm).is_internal_note) ? " checked" : ""} type="checkbox" class="rounded border-arbor-glass-border bg-arbor-night/70 text-arbor-emerald"${_scopeId}> Note interne (visible uniquement par l&#39;équipe) </label><button type="submit"${ssrIncludeBooleanAttr(unref(replyForm).processing) ? " disabled" : ""} class="rounded-xl bg-arbor-emerald px-5 py-2.5 text-sm font-semibold text-arbor-night transition hover:bg-arbor-firefly disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(replyForm).processing ? "Envoi..." : "Envoyer")}</button></div></form></div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "mb-6" }, [createVNode(unref(Link), {
							href: "/helpdesk",
							class: "text-sm text-arbor-sage transition hover:text-arbor-cream"
						}, {
							default: withCtx(() => [createTextVNode(" ← Retour aux tickets ")]),
							_: 1
						})]),
						createVNode("div", { class: "mb-8 rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-6" }, [
							createVNode("div", { class: "flex items-start justify-between gap-4" }, [createVNode("div", null, [
								createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: "font-mono text-sm text-arbor-sage" }, toDisplayString(__props.ticket.ticket_number), 1), createVNode("span", { class: ["rounded-full border px-2.5 py-0.5 text-xs font-medium", statusColors[__props.ticket.status]] }, toDisplayString(statusLabels[__props.ticket.status]), 3)]),
								createVNode("h1", { class: "mt-3 font-display text-2xl text-arbor-cream" }, toDisplayString(__props.ticket.subject), 1),
								createVNode("p", { class: "mt-2 text-sm text-arbor-sage" }, " Par " + toDisplayString(__props.ticket.user.name) + " · " + toDisplayString(formatDate(__props.ticket.created_at)), 1)
							]), createVNode("div", { class: "shrink-0 text-right" }, [createVNode("span", { class: "text-xs font-medium uppercase tracking-wide text-arbor-cyan-trace" }, toDisplayString(__props.ticket.priority), 1)])]),
							createVNode("div", { class: "mt-6 rounded-xl bg-arbor-night/50 p-4 text-sm leading-relaxed text-arbor-cream" }, toDisplayString(__props.ticket.body), 1),
							__props.canReply && __props.ticket.status !== "closed" ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mt-4 flex flex-wrap gap-2"
							}, [createVNode("form", {
								action: `/helpdesk/${__props.ticket.id}/resolve`,
								method: "post",
								onSubmit: withModifiers(($event) => _ctx.$inertia.post(`/helpdesk/${__props.ticket.id}/resolve`), ["prevent"])
							}, [createVNode("button", {
								type: "submit",
								class: "rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/30"
							}, "Résoudre")], 40, ["action", "onSubmit"]), createVNode("form", {
								action: `/helpdesk/${__props.ticket.id}/close`,
								method: "post",
								onSubmit: withModifiers(($event) => _ctx.$inertia.post(`/helpdesk/${__props.ticket.id}/close`), ["prevent"])
							}, [createVNode("button", {
								type: "submit",
								class: "rounded-lg bg-slate-500/20 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-500/30"
							}, "Fermer")], 40, ["action", "onSubmit"])])) : createCommentVNode("", true)
						]),
						createVNode("div", { class: "space-y-4" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.ticket.replies, (reply) => {
							return openBlock(), createBlock("div", {
								key: reply.id,
								class: ["rounded-2xl border p-5", reply.is_internal_note ? "border-amber-500/20 bg-amber-500/5" : "border-arbor-glass-border bg-arbor-glass/10"]
							}, [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("div", { class: "flex items-center gap-2" }, [
								createVNode("span", { class: "text-sm font-medium text-arbor-cream" }, toDisplayString(reply.user.name), 1),
								reply.is_ai_generated ? (openBlock(), createBlock("span", {
									key: 0,
									class: "rounded bg-arbor-emerald/20 px-1.5 py-0.5 text-[10px] font-medium text-arbor-firefly"
								}, "IA")) : createCommentVNode("", true),
								reply.is_internal_note ? (openBlock(), createBlock("span", {
									key: 1,
									class: "rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-medium text-amber-300"
								}, "Interne")) : createCommentVNode("", true)
							]), createVNode("span", { class: "text-xs text-arbor-sage" }, toDisplayString(formatDate(reply.created_at)), 1)]), createVNode("p", { class: "mt-3 text-sm leading-relaxed text-arbor-cream" }, toDisplayString(reply.body), 1)], 2);
						}), 128))]),
						__props.ticket.ia_suggestions.length > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-6"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.ticket.ia_suggestions.filter((s) => s.status === "pending"), (suggestion) => {
							return openBlock(), createBlock("div", {
								key: suggestion.id,
								class: "rounded-2xl border border-arbor-emerald/30 bg-arbor-emerald/5 p-5"
							}, [createVNode("div", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
								class: "h-4 w-4 text-arbor-firefly",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M13 10V3L4 14h7v7l9-11h-7z"
							})])), createVNode("span", { class: "text-sm font-medium text-arbor-firefly" }, "Suggestion IA en attente de validation")]), createVNode("p", { class: "mt-3 text-sm italic text-arbor-sage" }, toDisplayString(suggestion.suggested_body), 1)]);
						}), 128))])) : createCommentVNode("", true),
						__props.canReply && __props.ticket.status !== "closed" ? (openBlock(), createBlock("div", {
							key: 1,
							class: "mt-8 rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-5"
						}, [createVNode("h3", { class: "mb-4 text-sm font-medium text-arbor-cream" }, "Ajouter une réponse"), createVNode("form", { onSubmit: withModifiers(submitReply, ["prevent"]) }, [
							withDirectives(createVNode("textarea", {
								"onUpdate:modelValue": ($event) => unref(replyForm).body = $event,
								rows: "4",
								class: "w-full resize-none rounded-xl border border-arbor-glass-border bg-arbor-night/70 px-4 py-3 text-sm text-arbor-cream placeholder:text-arbor-sage/50 focus:border-arbor-emerald focus:ring-arbor-emerald/40",
								placeholder: "Votre réponse..."
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(replyForm).body]]),
							unref(replyForm).errors.body ? (openBlock(), createBlock("p", {
								key: 0,
								class: "mt-1 text-xs text-red-400"
							}, toDisplayString(unref(replyForm).errors.body), 1)) : createCommentVNode("", true),
							createVNode("div", { class: "mt-4 flex items-center justify-between" }, [createVNode("label", { class: "flex items-center gap-2 text-sm text-arbor-sage" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(replyForm).is_internal_note = $event,
								type: "checkbox",
								class: "rounded border-arbor-glass-border bg-arbor-night/70 text-arbor-emerald"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(replyForm).is_internal_note]]), createTextVNode(" Note interne (visible uniquement par l'équipe) ")]), createVNode("button", {
								type: "submit",
								disabled: unref(replyForm).processing,
								class: "rounded-xl bg-arbor-emerald px-5 py-2.5 text-sm font-semibold text-arbor-night transition hover:bg-arbor-firefly disabled:opacity-50"
							}, toDisplayString(unref(replyForm).processing ? "Envoi..." : "Envoyer"), 9, ["disabled"])])
						], 32)])) : createCommentVNode("", true)
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Helpdesk/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

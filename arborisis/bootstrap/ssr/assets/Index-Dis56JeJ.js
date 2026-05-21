import { t as _sfc_main$1 } from "./AuthenticatedLayout-BPpla_WX.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Admin/Helpdesk/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		tickets: Object,
		pendingSuggestionsCount: Number
	},
	setup(__props) {
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
		const priorityColors = {
			low: "text-arbor-sage",
			normal: "text-arbor-cyan-trace",
			high: "text-amber-400",
			critical: "text-red-400"
		};
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
			_push(ssrRenderComponent(unref(Head), { title: "Admin Helpdesk" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="font-display text-3xl text-arbor-cream"${_scopeId}>Admin Helpdesk</h1><p class="mt-1 text-sm text-arbor-sage"${_scopeId}>Gestion des tickets et validation IA</p></div>`);
						if (__props.pendingSuggestionsCount > 0) _push(`<div class="rounded-xl bg-arbor-emerald/10 px-4 py-2 text-sm text-arbor-firefly"${_scopeId}>${ssrInterpolate(__props.pendingSuggestionsCount)} suggestion${ssrInterpolate(__props.pendingSuggestionsCount > 1 ? "s" : "")} en attente </div>`);
						else _push(`<!---->`);
						_push(`</div><div class="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4"${_scopeId}><div class="rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-4"${_scopeId}><p class="text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.tickets.data.filter((t) => t.status === "open").length)}</p><p class="text-xs text-arbor-sage"${_scopeId}>Ouverts</p></div><div class="rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-4"${_scopeId}><p class="text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.tickets.data.filter((t) => t.status === "in_progress").length)}</p><p class="text-xs text-arbor-sage"${_scopeId}>En cours</p></div><div class="rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-4"${_scopeId}><p class="text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.tickets.data.filter((t) => t.status === "resolved").length)}</p><p class="text-xs text-arbor-sage"${_scopeId}>Résolus</p></div><div class="rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-4"${_scopeId}><p class="text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.tickets.total)}</p><p class="text-xs text-arbor-sage"${_scopeId}>Total</p></div></div><div class="space-y-3"${_scopeId}><!--[-->`);
						ssrRenderList(__props.tickets.data, (ticket) => {
							_push(`<div class="rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-5 transition hover:border-arbor-emerald/20"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="min-w-0 flex-1"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><span class="font-mono text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(ticket.ticket_number)}</span><span class="${ssrRenderClass([statusColors[ticket.status], "rounded-full border px-2 py-0.5 text-[10px] font-medium"])}"${_scopeId}>${ssrInterpolate(statusLabels[ticket.status])}</span>`);
							if (ticket.ia_suggestions?.some((s) => s.status === "pending")) _push(`<span class="rounded-full bg-arbor-emerald/20 px-2 py-0.5 text-[10px] font-medium text-arbor-firefly"${_scopeId}> IA en attente </span>`);
							else _push(`<!---->`);
							_push(`</div>`);
							_push(ssrRenderComponent(unref(Link), {
								href: `/admin/helpdesk/${ticket.id}`,
								class: "mt-1 block truncate text-sm font-medium text-arbor-cream transition hover:text-arbor-firefly"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(ticket.subject)}`);
									else return [createTextVNode(toDisplayString(ticket.subject), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`<p class="mt-1 text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(ticket.user.name)} · ${ssrInterpolate(ticket.category?.name || "Non catégorisé")}</p></div><div class="shrink-0 text-right"${_scopeId}><span class="${ssrRenderClass([priorityColors[ticket.priority], "text-xs font-medium uppercase"])}"${_scopeId}>${ssrInterpolate(ticket.priority)}</span><p class="mt-1 text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDate(ticket.created_at))}</p></div></div></div>`);
						});
						_push(`<!--]--></div></div>`);
					} else return [createVNode("div", { class: "mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "mb-8 flex items-center justify-between" }, [createVNode("div", null, [createVNode("h1", { class: "font-display text-3xl text-arbor-cream" }, "Admin Helpdesk"), createVNode("p", { class: "mt-1 text-sm text-arbor-sage" }, "Gestion des tickets et validation IA")]), __props.pendingSuggestionsCount > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "rounded-xl bg-arbor-emerald/10 px-4 py-2 text-sm text-arbor-firefly"
						}, toDisplayString(__props.pendingSuggestionsCount) + " suggestion" + toDisplayString(__props.pendingSuggestionsCount > 1 ? "s" : "") + " en attente ", 1)) : createCommentVNode("", true)]),
						createVNode("div", { class: "mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4" }, [
							createVNode("div", { class: "rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-4" }, [createVNode("p", { class: "text-2xl font-semibold text-arbor-cream" }, toDisplayString(__props.tickets.data.filter((t) => t.status === "open").length), 1), createVNode("p", { class: "text-xs text-arbor-sage" }, "Ouverts")]),
							createVNode("div", { class: "rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-4" }, [createVNode("p", { class: "text-2xl font-semibold text-arbor-cream" }, toDisplayString(__props.tickets.data.filter((t) => t.status === "in_progress").length), 1), createVNode("p", { class: "text-xs text-arbor-sage" }, "En cours")]),
							createVNode("div", { class: "rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-4" }, [createVNode("p", { class: "text-2xl font-semibold text-arbor-cream" }, toDisplayString(__props.tickets.data.filter((t) => t.status === "resolved").length), 1), createVNode("p", { class: "text-xs text-arbor-sage" }, "Résolus")]),
							createVNode("div", { class: "rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-4" }, [createVNode("p", { class: "text-2xl font-semibold text-arbor-cream" }, toDisplayString(__props.tickets.total), 1), createVNode("p", { class: "text-xs text-arbor-sage" }, "Total")])
						]),
						createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.tickets.data, (ticket) => {
							return openBlock(), createBlock("div", {
								key: ticket.id,
								class: "rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-5 transition hover:border-arbor-emerald/20"
							}, [createVNode("div", { class: "flex items-center gap-4" }, [createVNode("div", { class: "min-w-0 flex-1" }, [
								createVNode("div", { class: "flex items-center gap-3" }, [
									createVNode("span", { class: "font-mono text-xs text-arbor-sage" }, toDisplayString(ticket.ticket_number), 1),
									createVNode("span", { class: ["rounded-full border px-2 py-0.5 text-[10px] font-medium", statusColors[ticket.status]] }, toDisplayString(statusLabels[ticket.status]), 3),
									ticket.ia_suggestions?.some((s) => s.status === "pending") ? (openBlock(), createBlock("span", {
										key: 0,
										class: "rounded-full bg-arbor-emerald/20 px-2 py-0.5 text-[10px] font-medium text-arbor-firefly"
									}, " IA en attente ")) : createCommentVNode("", true)
								]),
								createVNode(unref(Link), {
									href: `/admin/helpdesk/${ticket.id}`,
									class: "mt-1 block truncate text-sm font-medium text-arbor-cream transition hover:text-arbor-firefly"
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(ticket.subject), 1)]),
									_: 2
								}, 1032, ["href"]),
								createVNode("p", { class: "mt-1 text-xs text-arbor-sage" }, toDisplayString(ticket.user.name) + " · " + toDisplayString(ticket.category?.name || "Non catégorisé"), 1)
							]), createVNode("div", { class: "shrink-0 text-right" }, [createVNode("span", { class: ["text-xs font-medium uppercase", priorityColors[ticket.priority]] }, toDisplayString(ticket.priority), 3), createVNode("p", { class: "mt-1 text-xs text-arbor-sage" }, toDisplayString(formatDate(ticket.created_at)), 1)])])]);
						}), 128))])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Helpdesk/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

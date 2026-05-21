import { t as _sfc_main$1 } from "./AuthenticatedLayout-BPpla_WX.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Helpdesk/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		tickets: Object,
		categories: Array,
		filters: Object,
		isAgent: Boolean
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
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Helpdesk" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="font-display text-3xl text-arbor-cream"${_scopeId}>Helpdesk</h1><p class="mt-1 text-sm text-arbor-sage"${_scopeId}>${ssrInterpolate(__props.isAgent ? "Gestion des tickets support" : "Centre d'aide et support")}</p></div>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/helpdesk/create",
							class: "rounded-xl bg-arbor-emerald px-5 py-2.5 text-sm font-semibold text-arbor-night transition hover:bg-arbor-firefly"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Nouveau ticket `);
								else return [createTextVNode(" Nouveau ticket ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div class="mb-6 flex flex-wrap gap-3"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/helpdesk",
							class: ["rounded-lg border px-3 py-1.5 text-xs transition", !__props.filters.status ? "border-arbor-emerald/40 bg-arbor-emerald/10 text-arbor-firefly" : "border-arbor-glass-border bg-arbor-glass/10 text-arbor-sage hover:text-arbor-cream"]
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Tous `);
								else return [createTextVNode(" Tous ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<!--[-->`);
						ssrRenderList(statusLabels, (label, key) => {
							_push(ssrRenderComponent(unref(Link), {
								key,
								href: `/helpdesk?status=${key}`,
								class: ["rounded-lg border px-3 py-1.5 text-xs transition", __props.filters.status === key ? "border-arbor-emerald/40 bg-arbor-emerald/10 text-arbor-firefly" : "border-arbor-glass-border bg-arbor-glass/10 text-arbor-sage hover:text-arbor-cream"]
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(label)}`);
									else return [createTextVNode(toDisplayString(label), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
						});
						_push(`<!--]--></div><div class="space-y-3"${_scopeId}><!--[-->`);
						ssrRenderList(__props.tickets.data, (ticket) => {
							_push(`<div class="rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-5 transition hover:border-arbor-emerald/20"${_scopeId}><div class="flex items-start justify-between gap-4"${_scopeId}><div class="min-w-0 flex-1"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><span class="text-xs font-mono text-arbor-sage"${_scopeId}>${ssrInterpolate(ticket.ticket_number)}</span><span class="${ssrRenderClass([statusColors[ticket.status], "rounded-full border px-2.5 py-0.5 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(statusLabels[ticket.status])}</span></div>`);
							_push(ssrRenderComponent(unref(Link), {
								href: `/helpdesk/${ticket.id}`,
								class: "mt-2 block truncate text-lg font-medium text-arbor-cream transition hover:text-arbor-firefly"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(ticket.subject)}`);
									else return [createTextVNode(toDisplayString(ticket.subject), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`<p class="mt-1 line-clamp-2 text-sm text-arbor-sage"${_scopeId}>${ssrInterpolate(ticket.body)}</p></div><div class="shrink-0 text-right"${_scopeId}><span class="${ssrRenderClass([priorityColors[ticket.priority], "text-xs font-medium uppercase tracking-wide"])}"${_scopeId}>${ssrInterpolate(ticket.priority)}</span><p class="mt-2 text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDate(ticket.created_at))}</p></div></div></div>`);
						});
						_push(`<!--]-->`);
						if (__props.tickets.data.length === 0) _push(`<div class="py-16 text-center"${_scopeId}><p class="text-arbor-sage"${_scopeId}>Aucun ticket trouvé.</p></div>`);
						else _push(`<!---->`);
						_push(`</div>`);
						if (__props.tickets.links.length > 3) {
							_push(`<div class="mt-6 flex justify-center gap-2"${_scopeId}><!--[-->`);
							ssrRenderList(__props.tickets.links, (link, index) => {
								_push(ssrRenderComponent(unref(Link), {
									key: index,
									href: link.url,
									class: ["rounded-lg px-3 py-1.5 text-sm transition", link.active ? "bg-arbor-emerald text-arbor-night" : "text-arbor-sage hover:text-arbor-cream"]
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "mb-8 flex items-center justify-between" }, [createVNode("div", null, [createVNode("h1", { class: "font-display text-3xl text-arbor-cream" }, "Helpdesk"), createVNode("p", { class: "mt-1 text-sm text-arbor-sage" }, toDisplayString(__props.isAgent ? "Gestion des tickets support" : "Centre d'aide et support"), 1)]), createVNode(unref(Link), {
							href: "/helpdesk/create",
							class: "rounded-xl bg-arbor-emerald px-5 py-2.5 text-sm font-semibold text-arbor-night transition hover:bg-arbor-firefly"
						}, {
							default: withCtx(() => [createTextVNode(" Nouveau ticket ")]),
							_: 1
						})]),
						createVNode("div", { class: "mb-6 flex flex-wrap gap-3" }, [createVNode(unref(Link), {
							href: "/helpdesk",
							class: ["rounded-lg border px-3 py-1.5 text-xs transition", !__props.filters.status ? "border-arbor-emerald/40 bg-arbor-emerald/10 text-arbor-firefly" : "border-arbor-glass-border bg-arbor-glass/10 text-arbor-sage hover:text-arbor-cream"]
						}, {
							default: withCtx(() => [createTextVNode(" Tous ")]),
							_: 1
						}, 8, ["class"]), (openBlock(), createBlock(Fragment, null, renderList(statusLabels, (label, key) => {
							return createVNode(unref(Link), {
								key,
								href: `/helpdesk?status=${key}`,
								class: ["rounded-lg border px-3 py-1.5 text-xs transition", __props.filters.status === key ? "border-arbor-emerald/40 bg-arbor-emerald/10 text-arbor-firefly" : "border-arbor-glass-border bg-arbor-glass/10 text-arbor-sage hover:text-arbor-cream"]
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(label), 1)]),
								_: 2
							}, 1032, ["href", "class"]);
						}), 64))]),
						createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.tickets.data, (ticket) => {
							return openBlock(), createBlock("div", {
								key: ticket.id,
								class: "rounded-2xl border border-arbor-glass-border bg-arbor-glass/10 p-5 transition hover:border-arbor-emerald/20"
							}, [createVNode("div", { class: "flex items-start justify-between gap-4" }, [createVNode("div", { class: "min-w-0 flex-1" }, [
								createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: "text-xs font-mono text-arbor-sage" }, toDisplayString(ticket.ticket_number), 1), createVNode("span", { class: ["rounded-full border px-2.5 py-0.5 text-xs font-medium", statusColors[ticket.status]] }, toDisplayString(statusLabels[ticket.status]), 3)]),
								createVNode(unref(Link), {
									href: `/helpdesk/${ticket.id}`,
									class: "mt-2 block truncate text-lg font-medium text-arbor-cream transition hover:text-arbor-firefly"
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(ticket.subject), 1)]),
									_: 2
								}, 1032, ["href"]),
								createVNode("p", { class: "mt-1 line-clamp-2 text-sm text-arbor-sage" }, toDisplayString(ticket.body), 1)
							]), createVNode("div", { class: "shrink-0 text-right" }, [createVNode("span", { class: ["text-xs font-medium uppercase tracking-wide", priorityColors[ticket.priority]] }, toDisplayString(ticket.priority), 3), createVNode("p", { class: "mt-2 text-xs text-arbor-sage" }, toDisplayString(formatDate(ticket.created_at)), 1)])])]);
						}), 128)), __props.tickets.data.length === 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "py-16 text-center"
						}, [createVNode("p", { class: "text-arbor-sage" }, "Aucun ticket trouvé.")])) : createCommentVNode("", true)]),
						__props.tickets.links.length > 3 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-6 flex justify-center gap-2"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.tickets.links, (link, index) => {
							return openBlock(), createBlock(unref(Link), {
								key: index,
								href: link.url,
								class: ["rounded-lg px-3 py-1.5 text-sm transition", link.active ? "bg-arbor-emerald text-arbor-night" : "text-arbor-sage hover:text-arbor-cream"],
								innerHTML: link.label
							}, null, 8, [
								"href",
								"class",
								"innerHTML"
							]);
						}), 128))])) : createCommentVNode("", true)
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Helpdesk/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

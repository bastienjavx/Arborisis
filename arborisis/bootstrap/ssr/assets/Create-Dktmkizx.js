import { t as _sfc_main$1 } from "./AuthenticatedLayout-BPpla_WX.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, vModelRadio, vModelSelect, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Helpdesk/Create.vue
var _sfc_main = {
	__name: "Create",
	__ssrInlineRender: true,
	props: { categories: Array },
	setup(__props) {
		const form = useForm({
			category_id: "",
			subject: "",
			body: "",
			priority: "normal"
		});
		const priorities = [
			{
				value: "low",
				label: "Basse"
			},
			{
				value: "normal",
				label: "Normale"
			},
			{
				value: "high",
				label: "Haute"
			},
			{
				value: "critical",
				label: "Critique"
			}
		];
		function submit() {
			form.post("/helpdesk");
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Nouveau ticket" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8"${_scopeId}>`);
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
						_push(`<h1 class="mt-4 font-display text-3xl text-arbor-cream"${_scopeId}>Nouveau ticket</h1><p class="mt-1 text-sm text-arbor-sage"${_scopeId}>Décrivez votre problème en détail pour que nous puissions vous aider.</p></div><form class="space-y-6"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-arbor-cream"${_scopeId}>Sujet</label><input${ssrRenderAttr("value", unref(form).subject)} type="text" class="w-full rounded-xl border border-arbor-glass-border bg-arbor-night/70 px-4 py-3 text-sm text-arbor-cream placeholder:text-arbor-sage/50 focus:border-arbor-emerald focus:ring-arbor-emerald/40" placeholder="Ex : Problème d&#39;upload audio" maxlength="255"${_scopeId}>`);
						if (unref(form).errors.subject) _push(`<p class="mt-1 text-xs text-red-400"${_scopeId}>${ssrInterpolate(unref(form).errors.subject)}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-arbor-cream"${_scopeId}>Catégorie</label><select class="w-full rounded-xl border border-arbor-glass-border bg-arbor-night/70 px-4 py-3 text-sm text-arbor-cream focus:border-arbor-emerald focus:ring-arbor-emerald/40"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}${_scopeId}>Non catégorisé</option><!--[-->`);
						ssrRenderList(__props.categories, (cat) => {
							_push(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, cat.id) : ssrLooseEqual(unref(form).category_id, cat.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(cat.name)}</option>`);
						});
						_push(`<!--]--></select></div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-arbor-cream"${_scopeId}>Priorité</label><div class="flex flex-wrap gap-3"${_scopeId}><!--[-->`);
						ssrRenderList(priorities, (p) => {
							_push(`<label class="${ssrRenderClass([unref(form).priority === p.value ? "border-arbor-emerald/40 bg-arbor-emerald/10 text-arbor-firefly" : "border-arbor-glass-border bg-arbor-glass/10 text-arbor-sage", "cursor-pointer rounded-lg border px-4 py-2 text-sm transition"])}"${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).priority, p.value)) ? " checked" : ""} type="radio"${ssrRenderAttr("value", p.value)} class="sr-only"${_scopeId}> ${ssrInterpolate(p.label)}</label>`);
						});
						_push(`<!--]--></div>`);
						if (unref(form).errors.priority) _push(`<p class="mt-1 text-xs text-red-400"${_scopeId}>${ssrInterpolate(unref(form).errors.priority)}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-arbor-cream"${_scopeId}>Description</label><textarea rows="6" class="w-full resize-none rounded-xl border border-arbor-glass-border bg-arbor-night/70 px-4 py-3 text-sm text-arbor-cream placeholder:text-arbor-sage/50 focus:border-arbor-emerald focus:ring-arbor-emerald/40" placeholder="Décrivez votre problème en détail..." maxlength="10000"${_scopeId}>${ssrInterpolate(unref(form).body)}</textarea>`);
						if (unref(form).errors.body) _push(`<p class="mt-1 text-xs text-red-400"${_scopeId}>${ssrInterpolate(unref(form).errors.body)}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="flex items-center gap-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-xl bg-arbor-emerald px-6 py-3 text-sm font-semibold text-arbor-night transition hover:bg-arbor-firefly disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Envoi..." : "Créer le ticket")}</button>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/helpdesk",
							class: "text-sm text-arbor-sage transition hover:text-arbor-cream"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Annuler`);
								else return [createTextVNode("Annuler")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form></div>`);
					} else return [createVNode("div", { class: "mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8" }, [createVNode("div", { class: "mb-8" }, [
						createVNode(unref(Link), {
							href: "/helpdesk",
							class: "text-sm text-arbor-sage transition hover:text-arbor-cream"
						}, {
							default: withCtx(() => [createTextVNode(" ← Retour aux tickets ")]),
							_: 1
						}),
						createVNode("h1", { class: "mt-4 font-display text-3xl text-arbor-cream" }, "Nouveau ticket"),
						createVNode("p", { class: "mt-1 text-sm text-arbor-sage" }, "Décrivez votre problème en détail pour que nous puissions vous aider.")
					]), createVNode("form", {
						class: "space-y-6",
						onSubmit: withModifiers(submit, ["prevent"])
					}, [
						createVNode("div", null, [
							createVNode("label", { class: "mb-2 block text-sm font-medium text-arbor-cream" }, "Sujet"),
							withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).subject = $event,
								type: "text",
								class: "w-full rounded-xl border border-arbor-glass-border bg-arbor-night/70 px-4 py-3 text-sm text-arbor-cream placeholder:text-arbor-sage/50 focus:border-arbor-emerald focus:ring-arbor-emerald/40",
								placeholder: "Ex : Problème d'upload audio",
								maxlength: "255"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).subject]]),
							unref(form).errors.subject ? (openBlock(), createBlock("p", {
								key: 0,
								class: "mt-1 text-xs text-red-400"
							}, toDisplayString(unref(form).errors.subject), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [createVNode("label", { class: "mb-2 block text-sm font-medium text-arbor-cream" }, "Catégorie"), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => unref(form).category_id = $event,
							class: "w-full rounded-xl border border-arbor-glass-border bg-arbor-night/70 px-4 py-3 text-sm text-arbor-cream focus:border-arbor-emerald focus:ring-arbor-emerald/40"
						}, [createVNode("option", { value: "" }, "Non catégorisé"), (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
							return openBlock(), createBlock("option", {
								key: cat.id,
								value: cat.id
							}, toDisplayString(cat.name), 9, ["value"]);
						}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).category_id]])]),
						createVNode("div", null, [
							createVNode("label", { class: "mb-2 block text-sm font-medium text-arbor-cream" }, "Priorité"),
							createVNode("div", { class: "flex flex-wrap gap-3" }, [(openBlock(), createBlock(Fragment, null, renderList(priorities, (p) => {
								return createVNode("label", {
									key: p.value,
									class: ["cursor-pointer rounded-lg border px-4 py-2 text-sm transition", unref(form).priority === p.value ? "border-arbor-emerald/40 bg-arbor-emerald/10 text-arbor-firefly" : "border-arbor-glass-border bg-arbor-glass/10 text-arbor-sage"]
								}, [withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).priority = $event,
									type: "radio",
									value: p.value,
									class: "sr-only"
								}, null, 8, ["onUpdate:modelValue", "value"]), [[vModelRadio, unref(form).priority]]), createTextVNode(" " + toDisplayString(p.label), 1)], 2);
							}), 64))]),
							unref(form).errors.priority ? (openBlock(), createBlock("p", {
								key: 0,
								class: "mt-1 text-xs text-red-400"
							}, toDisplayString(unref(form).errors.priority), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("label", { class: "mb-2 block text-sm font-medium text-arbor-cream" }, "Description"),
							withDirectives(createVNode("textarea", {
								"onUpdate:modelValue": ($event) => unref(form).body = $event,
								rows: "6",
								class: "w-full resize-none rounded-xl border border-arbor-glass-border bg-arbor-night/70 px-4 py-3 text-sm text-arbor-cream placeholder:text-arbor-sage/50 focus:border-arbor-emerald focus:ring-arbor-emerald/40",
								placeholder: "Décrivez votre problème en détail...",
								maxlength: "10000"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).body]]),
							unref(form).errors.body ? (openBlock(), createBlock("p", {
								key: 0,
								class: "mt-1 text-xs text-red-400"
							}, toDisplayString(unref(form).errors.body), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", { class: "flex items-center gap-4" }, [createVNode("button", {
							type: "submit",
							disabled: unref(form).processing,
							class: "rounded-xl bg-arbor-emerald px-6 py-3 text-sm font-semibold text-arbor-night transition hover:bg-arbor-firefly disabled:opacity-50"
						}, toDisplayString(unref(form).processing ? "Envoi..." : "Créer le ticket"), 9, ["disabled"]), createVNode(unref(Link), {
							href: "/helpdesk",
							class: "text-sm text-arbor-sage transition hover:text-arbor-cream"
						}, {
							default: withCtx(() => [createTextVNode("Annuler")]),
							_: 1
						})])
					], 32)])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Helpdesk/Create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

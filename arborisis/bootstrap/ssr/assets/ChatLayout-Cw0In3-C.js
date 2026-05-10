import { t as _sfc_main$4 } from "./AuthenticatedLayout-Ct-jPMsT.js";
import { t as _sfc_main$5 } from "./Modal-CyzN-1PS.js";
import { Link, useForm, usePage } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, openBlock, ref, renderList, renderSlot, toDisplayString, unref, useSSRContext, vModelSelect, vModelText, watch, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
//#region resources/js/Components/Chat/CreateRoomModal.vue
var _sfc_main$3 = {
	__name: "CreateRoomModal",
	__ssrInlineRender: true,
	props: { modelValue: Boolean },
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const form = useForm({
			name: "",
			description: "",
			type: "public"
		});
		const close = () => emit("update:modelValue", false);
		const submit = () => {
			form.post(route("chat.rooms.store"), { onSuccess: () => {
				form.reset();
				close();
			} });
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$5, mergeProps({
				show: __props.modelValue,
				onClose: close
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="p-6"${_scopeId}><h2 class="text-lg font-semibold text-arbor-cream mb-4"${_scopeId}>Créer un salon</h2><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-arbor-sage mb-1"${_scopeId}>Nom</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="w-full rounded-lg bg-arbor-glass border border-arbor-glass-border px-3 py-2 text-arbor-cream text-sm focus:outline-none focus:border-arbor-emerald/50" required${_scopeId}>`);
						if (unref(form).errors.name) _push(`<div class="text-red-400 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</div>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="block text-sm font-medium text-arbor-sage mb-1"${_scopeId}>Description</label><textarea rows="2" class="w-full rounded-lg bg-arbor-glass border border-arbor-glass-border px-3 py-2 text-arbor-cream text-sm focus:outline-none focus:border-arbor-emerald/50"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div${_scopeId}><label class="block text-sm font-medium text-arbor-sage mb-1"${_scopeId}>Type</label><select class="w-full rounded-lg bg-arbor-glass border border-arbor-glass-border px-3 py-2 text-arbor-cream text-sm focus:outline-none focus:border-arbor-emerald/50"${_scopeId}><option value="public"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "public") : ssrLooseEqual(unref(form).type, "public")) ? " selected" : ""}${_scopeId}>Public</option><option value="admin_only"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "admin_only") : ssrLooseEqual(unref(form).type, "admin_only")) ? " selected" : ""}${_scopeId}>Réservé admin</option></select></div><div class="flex justify-end gap-3 pt-2"${_scopeId}><button type="button" class="px-4 py-2 rounded-lg text-sm text-arbor-sage hover:bg-arbor-glass transition"${_scopeId}>Annuler</button><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-4 py-2 rounded-lg text-sm bg-arbor-emerald text-arbor-night font-medium hover:bg-arbor-emerald-dark disabled:opacity-50 transition"${_scopeId}>Créer</button></div></form></div>`);
					} else return [createVNode("div", { class: "p-6" }, [createVNode("h2", { class: "text-lg font-semibold text-arbor-cream mb-4" }, "Créer un salon"), createVNode("form", {
						onSubmit: withModifiers(submit, ["prevent"]),
						class: "space-y-4"
					}, [
						createVNode("div", null, [
							createVNode("label", { class: "block text-sm font-medium text-arbor-sage mb-1" }, "Nom"),
							withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).name = $event,
								type: "text",
								class: "w-full rounded-lg bg-arbor-glass border border-arbor-glass-border px-3 py-2 text-arbor-cream text-sm focus:outline-none focus:border-arbor-emerald/50",
								required: ""
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).name]]),
							unref(form).errors.name ? (openBlock(), createBlock("div", {
								key: 0,
								class: "text-red-400 text-xs mt-1"
							}, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-arbor-sage mb-1" }, "Description"), withDirectives(createVNode("textarea", {
							"onUpdate:modelValue": ($event) => unref(form).description = $event,
							rows: "2",
							class: "w-full rounded-lg bg-arbor-glass border border-arbor-glass-border px-3 py-2 text-arbor-cream text-sm focus:outline-none focus:border-arbor-emerald/50"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).description]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-arbor-sage mb-1" }, "Type"), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => unref(form).type = $event,
							class: "w-full rounded-lg bg-arbor-glass border border-arbor-glass-border px-3 py-2 text-arbor-cream text-sm focus:outline-none focus:border-arbor-emerald/50"
						}, [createVNode("option", { value: "public" }, "Public"), createVNode("option", { value: "admin_only" }, "Réservé admin")], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).type]])]),
						createVNode("div", { class: "flex justify-end gap-3 pt-2" }, [createVNode("button", {
							type: "button",
							onClick: close,
							class: "px-4 py-2 rounded-lg text-sm text-arbor-sage hover:bg-arbor-glass transition"
						}, "Annuler"), createVNode("button", {
							type: "submit",
							disabled: unref(form).processing,
							class: "px-4 py-2 rounded-lg text-sm bg-arbor-emerald text-arbor-night font-medium hover:bg-arbor-emerald-dark disabled:opacity-50 transition"
						}, "Créer", 8, ["disabled"])])
					], 32)])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Chat/CreateRoomModal.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Chat/NewConversationModal.vue
var _sfc_main$2 = {
	__name: "NewConversationModal",
	__ssrInlineRender: true,
	props: { modelValue: Boolean },
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const form = useForm({ user_id: null });
		const search = ref("");
		const results = ref([]);
		const loading = ref(false);
		const close = () => emit("update:modelValue", false);
		const searchUsers = async () => {
			if (search.value.length < 2) {
				results.value = [];
				return;
			}
			loading.value = true;
			try {
				const res = await fetch(`/api/users/search?q=${encodeURIComponent(search.value)}`, { headers: {
					"Accept": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				} });
				if (res.ok) results.value = await res.json();
			} catch (e) {
				console.error(e);
			} finally {
				loading.value = false;
			}
		};
		let debounce;
		watch(search, () => {
			clearTimeout(debounce);
			debounce = setTimeout(searchUsers, 300);
		});
		const selectUser = (user) => {
			form.user_id = user.id;
			form.post(route("chat.conversations.store"), { onSuccess: () => {
				form.reset();
				search.value = "";
				results.value = [];
				close();
			} });
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$5, mergeProps({
				show: __props.modelValue,
				onClose: close
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="p-6"${_scopeId}><h2 class="text-lg font-semibold text-arbor-cream mb-4"${_scopeId}>Nouvelle conversation</h2><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-arbor-sage mb-1"${_scopeId}>Rechercher un utilisateur</label><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Nom..." class="w-full rounded-lg bg-arbor-glass border border-arbor-glass-border px-3 py-2 text-arbor-cream text-sm focus:outline-none focus:border-arbor-emerald/50"${_scopeId}></div>`);
						if (loading.value) _push(`<div class="text-sm text-arbor-sage"${_scopeId}>Chargement...</div>`);
						else if (results.value.length) {
							_push(`<div class="space-y-1 max-h-48 overflow-y-auto"${_scopeId}><!--[-->`);
							ssrRenderList(results.value, (user) => {
								_push(`<button class="w-full text-left px-3 py-2 rounded-lg text-sm text-arbor-cream hover:bg-arbor-glass transition flex items-center gap-2"${_scopeId}><div class="w-6 h-6 rounded-full bg-arbor-moss/30 flex items-center justify-center text-xs font-medium text-arbor-emerald"${_scopeId}>${ssrInterpolate(user.name.charAt(0).toUpperCase())}</div> ${ssrInterpolate(user.name)}</button>`);
							});
							_push(`<!--]--></div>`);
						} else if (search.value.length >= 2) _push(`<div class="text-sm text-arbor-sage"${_scopeId}>Aucun résultat</div>`);
						else _push(`<!---->`);
						_push(`<div class="flex justify-end pt-2"${_scopeId}><button type="button" class="px-4 py-2 rounded-lg text-sm text-arbor-sage hover:bg-arbor-glass transition"${_scopeId}>Annuler</button></div></div></div>`);
					} else return [createVNode("div", { class: "p-6" }, [createVNode("h2", { class: "text-lg font-semibold text-arbor-cream mb-4" }, "Nouvelle conversation"), createVNode("div", { class: "space-y-3" }, [
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-arbor-sage mb-1" }, "Rechercher un utilisateur"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => search.value = $event,
							type: "text",
							placeholder: "Nom...",
							class: "w-full rounded-lg bg-arbor-glass border border-arbor-glass-border px-3 py-2 text-arbor-cream text-sm focus:outline-none focus:border-arbor-emerald/50"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, search.value]])]),
						loading.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "text-sm text-arbor-sage"
						}, "Chargement...")) : results.value.length ? (openBlock(), createBlock("div", {
							key: 1,
							class: "space-y-1 max-h-48 overflow-y-auto"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(results.value, (user) => {
							return openBlock(), createBlock("button", {
								key: user.id,
								onClick: ($event) => selectUser(user),
								class: "w-full text-left px-3 py-2 rounded-lg text-sm text-arbor-cream hover:bg-arbor-glass transition flex items-center gap-2"
							}, [createVNode("div", { class: "w-6 h-6 rounded-full bg-arbor-moss/30 flex items-center justify-center text-xs font-medium text-arbor-emerald" }, toDisplayString(user.name.charAt(0).toUpperCase()), 1), createTextVNode(" " + toDisplayString(user.name), 1)], 8, ["onClick"]);
						}), 128))])) : search.value.length >= 2 ? (openBlock(), createBlock("div", {
							key: 2,
							class: "text-sm text-arbor-sage"
						}, "Aucun résultat")) : createCommentVNode("", true),
						createVNode("div", { class: "flex justify-end pt-2" }, [createVNode("button", {
							type: "button",
							onClick: close,
							class: "px-4 py-2 rounded-lg text-sm text-arbor-sage hover:bg-arbor-glass transition"
						}, "Annuler")])
					])])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Chat/NewConversationModal.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Chat/ChatSidebar.vue
var _sfc_main$1 = {
	__name: "ChatSidebar",
	__ssrInlineRender: true,
	props: {
		rooms: Array,
		conversations: Array,
		activeRoom: Object,
		activeConversation: Object
	},
	setup(__props) {
		const showCreateRoom = ref(false);
		const showNewConversation = ref(false);
		const page = usePage();
		const isModerator = computed(() => page.props.auth.user?.is_moderator);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<aside${ssrRenderAttrs(mergeProps({ class: "w-72 bg-arbor-deep/50 border-r border-arbor-glass-border flex flex-col shrink-0" }, _attrs))}><div class="p-4 border-b border-arbor-glass-border">`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("chat.index"),
				class: "text-lg font-display font-semibold text-arbor-cream hover:text-arbor-emerald transition"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Chat `);
					else return [createTextVNode(" Chat ")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="flex-1 overflow-y-auto"><div class="p-3"><div class="flex items-center justify-between mb-2"><h3 class="text-xs font-semibold uppercase tracking-wider text-arbor-sage">Salons</h3>`);
			if (isModerator.value) _push(`<button class="text-arbor-sage hover:text-arbor-emerald" title="Créer un salon"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></button>`);
			else _push(`<!---->`);
			_push(`</div><div class="space-y-1"><!--[-->`);
			ssrRenderList(__props.rooms, (room) => {
				_push(ssrRenderComponent(unref(Link), {
					key: room.id,
					href: _ctx.route("chat.rooms.show", room.slug),
					class: ["block px-3 py-2 rounded-lg text-sm transition", __props.activeRoom?.id === room.id ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-cream hover:bg-arbor-glass"]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="flex items-center gap-2"${_scopeId}>`);
							if (room.type === "admin_only") _push(`<span class="text-[10px] bg-arbor-amber/20 text-arbor-amber px-1.5 rounded"${_scopeId}>Admin</span>`);
							else _push(`<!---->`);
							_push(`<span class="truncate"${_scopeId}>${ssrInterpolate(room.name)}</span></div>`);
						} else return [createVNode("div", { class: "flex items-center gap-2" }, [room.type === "admin_only" ? (openBlock(), createBlock("span", {
							key: 0,
							class: "text-[10px] bg-arbor-amber/20 text-arbor-amber px-1.5 rounded"
						}, "Admin")) : createCommentVNode("", true), createVNode("span", { class: "truncate" }, toDisplayString(room.name), 1)])];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div></div><div class="p-3 border-t border-arbor-glass-border"><div class="flex items-center justify-between mb-2"><h3 class="text-xs font-semibold uppercase tracking-wider text-arbor-sage">Messages</h3><button class="text-arbor-sage hover:text-arbor-emerald" title="Nouvelle conversation"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></button></div><div class="space-y-1"><!--[-->`);
			ssrRenderList(__props.conversations, (conv) => {
				_push(ssrRenderComponent(unref(Link), {
					key: conv.id,
					href: _ctx.route("chat.conversations.show", conv.id),
					class: ["block px-3 py-2 rounded-lg text-sm transition", __props.activeConversation?.id === conv.id ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-cream hover:bg-arbor-glass"]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<div class="truncate"${_scopeId}>${ssrInterpolate(conv.users.filter((u) => u.id !== _ctx.$page.props.auth.user.id).map((u) => u.name).join(", "))}</div>`);
						else return [createVNode("div", { class: "truncate" }, toDisplayString(conv.users.filter((u) => u.id !== _ctx.$page.props.auth.user.id).map((u) => u.name).join(", ")), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div></div></div>`);
			_push(ssrRenderComponent(_sfc_main$3, {
				modelValue: showCreateRoom.value,
				"onUpdate:modelValue": ($event) => showCreateRoom.value = $event
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$2, {
				modelValue: showNewConversation.value,
				"onUpdate:modelValue": ($event) => showNewConversation.value = $event
			}, null, _parent));
			_push(`</aside>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Chat/ChatSidebar.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Chat/ChatLayout.vue
var _sfc_main = {
	__name: "ChatLayout",
	__ssrInlineRender: true,
	props: {
		rooms: Array,
		conversations: Array,
		activeRoom: Object,
		activeConversation: Object
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$4, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex h-[calc(100vh-4rem)]"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$1, {
							rooms: __props.rooms,
							conversations: __props.conversations,
							"active-room": __props.activeRoom,
							"active-conversation": __props.activeConversation
						}, null, _parent, _scopeId));
						_push(`<div class="flex-1 flex flex-col min-w-0"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "flex h-[calc(100vh-4rem)]" }, [createVNode(_sfc_main$1, {
						rooms: __props.rooms,
						conversations: __props.conversations,
						"active-room": __props.activeRoom,
						"active-conversation": __props.activeConversation
					}, null, 8, [
						"rooms",
						"conversations",
						"active-room",
						"active-conversation"
					]), createVNode("div", { class: "flex-1 flex flex-col min-w-0" }, [renderSlot(_ctx.$slots, "default")])])];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Chat/ChatLayout.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as t };

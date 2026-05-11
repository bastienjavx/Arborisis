import { t as _sfc_main$1 } from "./ChatLayout-CnXmm_Y6.js";
import { n as _sfc_main$3, r as _sfc_main$2, t as echo } from "./echo-tudSkfVs.js";
import { router, usePage } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createVNode, mergeProps, nextTick, onMounted, onUnmounted, openBlock, ref, renderList, toDisplayString, useSSRContext, watch, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Chat/Room.vue
var _sfc_main = {
	__name: "Room",
	__ssrInlineRender: true,
	props: {
		room: Object,
		messages: Array,
		nextPageUrl: String,
		isMember: Boolean,
		isBanned: Boolean,
		rooms: Array,
		conversations: Array
	},
	setup(__props) {
		const props = __props;
		const messages = ref([...props.messages].reverse());
		const loading = ref(false);
		const listRef = ref(null);
		const page = usePage();
		computed(() => page.props.auth.user?.is_moderator);
		watch(() => props.messages, (newMessages) => {
			messages.value = [...newMessages].reverse();
			scrollToBottom();
		});
		const scrollToBottom = () => {
			nextTick(() => {
				listRef.value?.scrollTo({
					top: listRef.value.scrollHeight,
					behavior: "smooth"
				});
			});
		};
		onMounted(() => {
			scrollToBottom();
			const channel = echo.private(`chat.room.${props.room.id}`);
			channel.listen(".MessageSent", (e) => {
				messages.value.push(e.message);
				scrollToBottom();
			});
			channel.listen(".UserBanned", (e) => {
				messages.value.push(e.message);
				scrollToBottom();
			});
		});
		onUnmounted(() => {
			echo.leave(`chat.room.${props.room.id}`);
		});
		const sendMessage = async (body) => {
			loading.value = true;
			try {
				const res = await fetch(route("chat.messages.store", props.room.slug), {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.getAttribute("content"),
						"X-Requested-With": "XMLHttpRequest"
					},
					body: JSON.stringify({ body })
				});
				if (res.ok) {
					const data = await res.json();
					messages.value.push(data.message);
					scrollToBottom();
				}
			} catch (e) {
				console.error(e);
			} finally {
				loading.value = false;
			}
		};
		const deleteMessage = async (msg) => {
			if (!confirm("Supprimer ce message ?")) return;
			try {
				if ((await fetch(route("chat.messages.destroy", msg.id), {
					method: "DELETE",
					headers: {
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.getAttribute("content"),
						"X-Requested-With": "XMLHttpRequest"
					}
				})).ok) {
					const idx = messages.value.findIndex((m) => m.id === msg.id);
					if (idx !== -1) messages.value.splice(idx, 1);
				}
			} catch (e) {
				console.error(e);
			}
		};
		const joinRoom = async () => {
			try {
				if ((await fetch(route("chat.rooms.join", props.room.slug), {
					method: "POST",
					headers: {
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.getAttribute("content"),
						"X-Requested-With": "XMLHttpRequest"
					}
				})).ok) router.reload();
			} catch (e) {
				console.error(e);
			}
		};
		const leaveRoom = async () => {
			try {
				if ((await fetch(route("chat.rooms.leave", props.room.slug), {
					method: "POST",
					headers: {
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.getAttribute("content"),
						"X-Requested-With": "XMLHttpRequest"
					}
				})).ok) router.reload();
			} catch (e) {
				console.error(e);
			}
		};
		const banUser = async (user) => {
			if (!user) return;
			if (!confirm(`Exclure ${user.name} de ce salon ?`)) return;
			try {
				if ((await fetch(route("chat.moderation.ban", props.room.slug), {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.getAttribute("content"),
						"X-Requested-With": "XMLHttpRequest"
					},
					body: JSON.stringify({ user_id: user.id })
				})).ok) router.reload();
			} catch (e) {
				console.error(e);
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, mergeProps({
				rooms: __props.rooms,
				conversations: __props.conversations,
				"active-room": __props.room
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-col h-full"${_scopeId}><div class="px-6 py-4 border-b border-arbor-glass-border flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="text-lg font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.room.name)}</h2>`);
						if (__props.room.description) _push(`<p class="text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(__props.room.description)}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="flex items-center gap-2"${_scopeId}>`);
						if (__props.room.type === "admin_only") _push(`<span class="text-xs bg-arbor-amber/20 text-arbor-amber px-2 py-1 rounded"${_scopeId}>Admin</span>`);
						else _push(`<!---->`);
						if (!__props.isMember && !__props.isBanned) _push(`<button class="text-xs px-3 py-1.5 rounded-lg bg-arbor-emerald text-arbor-night font-medium hover:bg-arbor-emerald-dark transition"${_scopeId}>Rejoindre</button>`);
						else _push(`<!---->`);
						if (__props.isMember) _push(`<button class="text-xs px-3 py-1.5 rounded-lg bg-arbor-glass text-arbor-sage hover:bg-white/10 transition"${_scopeId}>Quitter</button>`);
						else _push(`<!---->`);
						_push(`</div></div><div class="flex-1 overflow-y-auto p-6"${_scopeId}>`);
						if (__props.isBanned) _push(`<div class="text-center text-red-400 text-sm"${_scopeId}>Vous êtes exclu de ce salon.</div>`);
						else {
							_push(`<!--[-->`);
							ssrRenderList(messages.value, (msg) => {
								_push(ssrRenderComponent(_sfc_main$2, {
									key: msg.id,
									message: msg,
									onDelete: ($event) => deleteMessage(msg),
									onBan: ($event) => banUser(msg.user)
								}, null, _parent, _scopeId));
							});
							_push(`<!--]-->`);
						}
						_push(`</div>`);
						if (__props.isMember && !__props.isBanned) _push(ssrRenderComponent(_sfc_main$3, {
							loading: loading.value,
							onSend: sendMessage
						}, null, _parent, _scopeId));
						else if (!__props.isBanned && !__props.isMember) _push(`<div class="p-4 border-t border-arbor-glass-border text-center text-sm text-arbor-sage"${_scopeId}> Rejoignez le salon pour participer. </div>`);
						else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex flex-col h-full" }, [
						createVNode("div", { class: "px-6 py-4 border-b border-arbor-glass-border flex items-center justify-between" }, [createVNode("div", null, [createVNode("h2", { class: "text-lg font-semibold text-arbor-cream" }, toDisplayString(__props.room.name), 1), __props.room.description ? (openBlock(), createBlock("p", {
							key: 0,
							class: "text-xs text-arbor-sage"
						}, toDisplayString(__props.room.description), 1)) : createCommentVNode("", true)]), createVNode("div", { class: "flex items-center gap-2" }, [
							__props.room.type === "admin_only" ? (openBlock(), createBlock("span", {
								key: 0,
								class: "text-xs bg-arbor-amber/20 text-arbor-amber px-2 py-1 rounded"
							}, "Admin")) : createCommentVNode("", true),
							!__props.isMember && !__props.isBanned ? (openBlock(), createBlock("button", {
								key: 1,
								onClick: joinRoom,
								class: "text-xs px-3 py-1.5 rounded-lg bg-arbor-emerald text-arbor-night font-medium hover:bg-arbor-emerald-dark transition"
							}, "Rejoindre")) : createCommentVNode("", true),
							__props.isMember ? (openBlock(), createBlock("button", {
								key: 2,
								onClick: leaveRoom,
								class: "text-xs px-3 py-1.5 rounded-lg bg-arbor-glass text-arbor-sage hover:bg-white/10 transition"
							}, "Quitter")) : createCommentVNode("", true)
						])]),
						createVNode("div", {
							ref_key: "listRef",
							ref: listRef,
							class: "flex-1 overflow-y-auto p-6"
						}, [__props.isBanned ? (openBlock(), createBlock("div", {
							key: 0,
							class: "text-center text-red-400 text-sm"
						}, "Vous êtes exclu de ce salon.")) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(messages.value, (msg) => {
							return openBlock(), createBlock(_sfc_main$2, {
								key: msg.id,
								message: msg,
								onDelete: ($event) => deleteMessage(msg),
								onBan: ($event) => banUser(msg.user)
							}, null, 8, [
								"message",
								"onDelete",
								"onBan"
							]);
						}), 128))], 512),
						__props.isMember && !__props.isBanned ? (openBlock(), createBlock(_sfc_main$3, {
							key: 0,
							loading: loading.value,
							onSend: sendMessage
						}, null, 8, ["loading"])) : !__props.isBanned && !__props.isMember ? (openBlock(), createBlock("div", {
							key: 1,
							class: "p-4 border-t border-arbor-glass-border text-center text-sm text-arbor-sage"
						}, " Rejoignez le salon pour participer. ")) : createCommentVNode("", true)
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Chat/Room.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

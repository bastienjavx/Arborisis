import { t as echo } from "./echo-DCkQjCaD.js";
import { t as _sfc_main$1 } from "./ChatLayout-DU6mmbP-.js";
import { n as _sfc_main$2, t as _sfc_main$3 } from "./ChatInput-DHiWfNw_.js";
import { usePage } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createVNode, mergeProps, nextTick, onMounted, onUnmounted, openBlock, ref, renderList, toDisplayString, useSSRContext, watch, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Chat/Conversation.vue
var _sfc_main = {
	__name: "Conversation",
	__ssrInlineRender: true,
	props: {
		conversation: Object,
		messages: Array,
		nextPageUrl: String,
		rooms: Array,
		conversations: Array
	},
	setup(__props) {
		const props = __props;
		const messages = ref([...props.messages].reverse());
		const loading = ref(false);
		const listRef = ref(null);
		const page = usePage();
		const otherUser = computed(() => {
			return props.conversation.users.find((u) => u.id !== page.props.auth.user?.id);
		});
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
			echo.private(`chat.conversation.${props.conversation.id}`).listen(".PrivateMessageSent", (e) => {
				messages.value.push(e.message);
				scrollToBottom();
			});
		});
		onUnmounted(() => {
			echo.leave(`chat.conversation.${props.conversation.id}`);
		});
		const sendMessage = async (body) => {
			loading.value = true;
			try {
				const res = await fetch(route("chat.private_messages.store", props.conversation.id), {
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
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, mergeProps({
				rooms: __props.rooms,
				conversations: __props.conversations,
				"active-conversation": __props.conversation
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-col h-full"${_scopeId}><div class="px-6 py-4 border-b border-arbor-glass-border flex items-center gap-3"${_scopeId}><div class="w-8 h-8 rounded-full bg-arbor-moss/30 flex items-center justify-center text-xs font-medium text-arbor-emerald"${_scopeId}>${ssrInterpolate(otherUser.value?.name?.charAt(0).toUpperCase() || "?")}</div><div${_scopeId}><h2 class="text-lg font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(otherUser.value?.name || "Conversation")}</h2></div></div><div class="flex-1 overflow-y-auto p-6"${_scopeId}><!--[-->`);
						ssrRenderList(messages.value, (msg) => {
							_push(ssrRenderComponent(_sfc_main$2, {
								key: msg.id,
								message: msg
							}, null, _parent, _scopeId));
						});
						_push(`<!--]--></div>`);
						_push(ssrRenderComponent(_sfc_main$3, {
							loading: loading.value,
							onSend: sendMessage
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex flex-col h-full" }, [
						createVNode("div", { class: "px-6 py-4 border-b border-arbor-glass-border flex items-center gap-3" }, [createVNode("div", { class: "w-8 h-8 rounded-full bg-arbor-moss/30 flex items-center justify-center text-xs font-medium text-arbor-emerald" }, toDisplayString(otherUser.value?.name?.charAt(0).toUpperCase() || "?"), 1), createVNode("div", null, [createVNode("h2", { class: "text-lg font-semibold text-arbor-cream" }, toDisplayString(otherUser.value?.name || "Conversation"), 1)])]),
						createVNode("div", {
							ref_key: "listRef",
							ref: listRef,
							class: "flex-1 overflow-y-auto p-6"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(messages.value, (msg) => {
							return openBlock(), createBlock(_sfc_main$2, {
								key: msg.id,
								message: msg
							}, null, 8, ["message"]);
						}), 128))], 512),
						createVNode(_sfc_main$3, {
							loading: loading.value,
							onSend: sendMessage
						}, null, 8, ["loading"])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Chat/Conversation.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };

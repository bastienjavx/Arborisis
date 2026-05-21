import { t as ApplicationLogo_default } from "./ApplicationLogo-B6u9VnHg.js";
import { Link } from "@inertiajs/vue3";
import { computed, createBlock, createTextVNode, createVNode, mergeProps, onMounted, onUnmounted, openBlock, ref, renderSlot, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/Dropdown.vue
var _sfc_main$5 = {
	__name: "Dropdown",
	__ssrInlineRender: true,
	props: {
		align: {
			type: String,
			default: "right"
		},
		width: {
			type: String,
			default: "48"
		},
		contentClasses: {
			type: String,
			default: "py-1 bg-arbor-deep border border-arbor-glass-border rounded-xl overflow-hidden"
		}
	},
	setup(__props) {
		const props = __props;
		const closeOnEscape = (e) => {
			if (open.value && e.key === "Escape") open.value = false;
		};
		onMounted(() => document.addEventListener("keydown", closeOnEscape));
		onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
		const widthClass = computed(() => {
			return { 48: "w-48" }[props.width.toString()];
		});
		const alignmentClasses = computed(() => {
			if (props.align === "left") return "ltr:origin-top-left rtl:origin-top-right start-0";
			else if (props.align === "right") return "ltr:origin-top-right rtl:origin-top-left end-0";
			else return "origin-top";
		});
		const open = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
			ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
			_push(`</div><div class="fixed inset-0 z-40" style="${ssrRenderStyle(open.value ? null : { display: "none" })}"></div><div class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg"])}" style="${ssrRenderStyle([{ "display": "none" }, open.value ? null : { display: "none" }])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
			ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
			_push(`</div></div></div>`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Composables/usePushNotifications.js
var isSubscribed = ref(false);
var isLoading = ref(false);
var error = ref(null);
var vapidPublicKey = ref("");
function usePushNotifications() {
	const isSupported = computed(() => {
		return typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window;
	});
	async function fetchVapidKey() {
		try {
			vapidPublicKey.value = (await (await fetch("/api/vapid-public-key")).json()).key;
		} catch (e) {
			console.error("Impossible de récupérer la clé VAPID", e);
		}
	}
	async function checkSubscription() {
		if (!isSupported.value) return;
		isSubscribed.value = !!await (await navigator.serviceWorker.ready).pushManager.getSubscription();
	}
	function urlBase64ToUint8Array(base64String) {
		const base64 = (base64String + "=".repeat((4 - base64String.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/");
		const rawData = window.atob(base64);
		return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
	}
	async function subscribe() {
		if (!isSupported.value || !vapidPublicKey.value) return;
		isLoading.value = true;
		error.value = null;
		try {
			if (await Notification.requestPermission() !== "granted") throw new Error("Permission de notification refusée.");
			const subscription = await (await navigator.serviceWorker.ready).pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(vapidPublicKey.value)
			});
			await fetch("/api/push-subscriptions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.getAttribute("content") || ""
				},
				body: JSON.stringify({
					endpoint: subscription.endpoint,
					keys: {
						p256dh: subscription.toJSON().keys.p256dh,
						auth: subscription.toJSON().keys.auth
					}
				})
			});
			isSubscribed.value = true;
		} catch (e) {
			error.value = e.message || "Erreur lors de l'abonnement.";
			console.error(e);
		} finally {
			isLoading.value = false;
		}
	}
	async function unsubscribe() {
		if (!isSupported.value) return;
		isLoading.value = true;
		error.value = null;
		try {
			const subscription = await (await navigator.serviceWorker.ready).pushManager.getSubscription();
			if (subscription) {
				await fetch("/api/push-subscriptions", {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.getAttribute("content") || ""
					},
					body: JSON.stringify({ endpoint: subscription.endpoint })
				});
				await subscription.unsubscribe();
			}
			isSubscribed.value = false;
		} catch (e) {
			error.value = e.message || "Erreur lors du désabonnement.";
			console.error(e);
		} finally {
			isLoading.value = false;
		}
	}
	onMounted(() => {
		if (isSupported.value) {
			fetchVapidKey();
			checkSubscription();
		}
	});
	return {
		isSupported,
		isSubscribed,
		isLoading,
		error,
		subscribe,
		unsubscribe
	};
}
//#endregion
//#region resources/js/Components/PushNotificationToggle.vue
var _sfc_main$4 = {
	__name: "PushNotificationToggle",
	__ssrInlineRender: true,
	setup(__props) {
		const { isSupported, isSubscribed, isLoading, subscribe, unsubscribe } = usePushNotifications();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(isSupported)) {
				_push(`<button${ssrRenderAttrs(mergeProps({
					disabled: unref(isLoading),
					class: "inline-flex items-center gap-2 text-sm text-arbor-sage hover:text-arbor-emerald transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
					title: unref(isSubscribed) ? "Désactiver les notifications" : "Activer les notifications"
				}, _attrs))}>`);
				if (unref(isSubscribed)) _push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>`);
				else _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>`);
				_push(`<span class="hidden sm:inline">${ssrInterpolate(unref(isSubscribed) ? "Notifications activées" : "Notifications")}</span></button>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PushNotificationToggle.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/DropdownLink.vue
var _sfc_main$3 = {
	__name: "DropdownLink",
	__ssrInlineRender: true,
	props: { href: {
		type: String,
		required: true
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Link), mergeProps({
				href: __props.href,
				class: "block w-full px-4 py-2 text-start text-sm leading-5 text-arbor-sage transition duration-150 ease-in-out hover:bg-arbor-glass hover:text-arbor-cream focus:bg-arbor-glass focus:text-arbor-cream focus:outline-none"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/NavLink.vue
var _sfc_main$2 = {
	__name: "NavLink",
	__ssrInlineRender: true,
	props: {
		href: {
			type: String,
			required: true
		},
		active: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => props.active ? "inline-flex items-center px-1 pt-1 border-b-2 border-arbor-emerald text-sm font-medium leading-5 text-arbor-cream focus:outline-none focus:border-arbor-emerald-dark transition duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-arbor-sage hover:text-arbor-cream hover:border-arbor-sage/50 focus:outline-none focus:text-arbor-cream focus:border-arbor-sage/50 transition duration-150 ease-in-out");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Link), mergeProps({
				href: __props.href,
				class: classes.value
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavLink.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/ResponsiveNavLink.vue
var _sfc_main$1 = {
	__name: "ResponsiveNavLink",
	__ssrInlineRender: true,
	props: {
		href: {
			type: String,
			required: true
		},
		active: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => props.active ? "block w-full ps-3 pe-4 py-2 border-l-4 border-arbor-emerald text-start text-base font-medium text-arbor-cream bg-arbor-emerald/10 focus:outline-none focus:text-arbor-cream focus:bg-arbor-emerald/15 focus:border-arbor-emerald-dark transition duration-150 ease-in-out" : "block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass hover:border-arbor-sage/50 focus:outline-none focus:text-arbor-cream focus:bg-arbor-glass focus:border-arbor-sage/50 transition duration-150 ease-in-out");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Link), mergeProps({
				href: __props.href,
				class: classes.value
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ResponsiveNavLink.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Layouts/AuthenticatedLayout.vue
var _sfc_main = {
	__name: "AuthenticatedLayout",
	__ssrInlineRender: true,
	setup(__props) {
		const showingNavigationDropdown = ref(false);
		ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-arbor-night text-arbor-cream" }, _attrs))}><nav class="fixed top-0 left-0 right-0 z-fixed-nav bg-arbor-night/80 backdrop-blur-md border-b border-arbor-glass-border"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 justify-between"><div class="flex items-center gap-8">`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("landing"),
				class: "flex items-center"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(ApplicationLogo_default, { class: "block h-12 w-auto shrink-0" }, null, _parent, _scopeId));
					else return [createVNode(ApplicationLogo_default, { class: "block h-12 w-auto shrink-0" })];
				}),
				_: 1
			}, _parent));
			_push(`<div class="hidden space-x-1 sm:-my-px sm:ms-6 sm:flex sm:items-center">`);
			_push(ssrRenderComponent(_sfc_main$2, {
				href: _ctx.route("dashboard"),
				active: _ctx.route().current("dashboard")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Dashboard `);
					else return [createTextVNode(" Dashboard ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_sfc_main$2, {
				href: _ctx.route("chat.index"),
				active: _ctx.route().current("chat.*")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="flex items-center gap-1.5"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"${_scopeId}></path></svg> Chat </span>`);
					else return [createVNode("span", { class: "flex items-center gap-1.5" }, [(openBlock(), createBlock("svg", {
						class: "w-4 h-4",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						"stroke-width": "2",
						d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
					})])), createTextVNode(" Chat ")])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="relative ms-1">`);
			_push(ssrRenderComponent(_sfc_main$5, {
				align: "left",
				width: "48"
			}, {
				trigger: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="${ssrRenderClass([_ctx.route().current("sounds.*") || _ctx.route().current("map.index") || _ctx.route().current("creators.*") ? "text-arbor-cream" : "", "inline-flex items-center px-3 py-2 text-sm font-medium leading-5 text-arbor-sage hover:text-arbor-cream transition duration-150 ease-in-out cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night"])}"${_scopeId}> Explorer <svg class="-me-0.5 ms-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button>`);
					else return [createVNode("button", {
						type: "button",
						class: ["inline-flex items-center px-3 py-2 text-sm font-medium leading-5 text-arbor-sage hover:text-arbor-cream transition duration-150 ease-in-out cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night", _ctx.route().current("sounds.*") || _ctx.route().current("map.index") || _ctx.route().current("creators.*") ? "text-arbor-cream" : ""]
					}, [createTextVNode(" Explorer "), (openBlock(), createBlock("svg", {
						class: "-me-0.5 ms-1 h-4 w-4",
						xmlns: "http://www.w3.org/2000/svg",
						viewBox: "0 0 20 20",
						fill: "currentColor"
					}, [createVNode("path", {
						"fill-rule": "evenodd",
						d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
						"clip-rule": "evenodd"
					})]))], 2)];
				}),
				content: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_sfc_main$3, { href: _ctx.route("sounds.index") }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<span class="flex items-center gap-2"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg> Sons naturels </span>`);
								else return [createVNode("span", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
								})])), createTextVNode(" Sons naturels ")])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$3, { href: _ctx.route("map.index") }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<span class="flex items-center gap-2"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7"${_scopeId}></path></svg> Carte des sons </span>`);
								else return [createVNode("span", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7"
								})])), createTextVNode(" Carte des sons ")])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$3, { href: _ctx.route("<redacted>-map.index") }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<span class="flex items-center gap-2"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg> Carte des visites </span>`);
								else return [createVNode("span", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								}), createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								})])), createTextVNode(" Carte des visites ")])];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						createVNode(_sfc_main$3, { href: _ctx.route("sounds.index") }, {
							default: withCtx(() => [createVNode("span", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
							})])), createTextVNode(" Sons naturels ")])]),
							_: 1
						}, 8, ["href"]),
						createVNode(_sfc_main$3, { href: _ctx.route("map.index") }, {
							default: withCtx(() => [createVNode("span", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7"
							})])), createTextVNode(" Carte des sons ")])]),
							_: 1
						}, 8, ["href"]),
						createVNode(_sfc_main$3, { href: _ctx.route("<redacted>-map.index") }, {
							default: withCtx(() => [createVNode("span", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							}), createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							})])), createTextVNode(" Carte des visites ")])]),
							_: 1
						}, 8, ["href"])
					];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			_push(ssrRenderComponent(_sfc_main$2, {
				href: _ctx.route("sounds.create"),
				active: _ctx.route().current("sounds.create")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="flex items-center gap-1.5"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Publier </span>`);
					else return [createVNode("span", { class: "flex items-center gap-1.5" }, [(openBlock(), createBlock("svg", {
						class: "w-4 h-4",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						"stroke-width": "2",
						d: "M12 4v16m8-8H4"
					})])), createTextVNode(" Publier ")])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_sfc_main$2, {
				href: _ctx.route("sounds.record"),
				active: _ctx.route().current("sounds.record")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="flex items-center gap-1.5"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg> Enregistrer </span>`);
					else return [createVNode("span", { class: "flex items-center gap-1.5" }, [(openBlock(), createBlock("svg", {
						class: "w-4 h-4",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						"stroke-width": "1.5",
						d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
					})])), createTextVNode(" Enregistrer ")])];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="hidden sm:ms-6 sm:flex sm:items-center"><div class="relative ms-3">`);
			_push(ssrRenderComponent(_sfc_main$5, {
				align: "right",
				width: "48"
			}, {
				trigger: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center gap-2 rounded-xl border border-arbor-glass-border bg-arbor-glass px-3 py-2 text-sm font-medium leading-4 text-arbor-cream transition duration-150 ease-in-out hover:bg-white/10 focus:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night"${_scopeId}><div class="w-7 h-7 rounded-full bg-arbor-moss/30 flex items-center justify-center text-xs font-medium text-arbor-emerald"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name.charAt(0).toUpperCase())}</div><span class="hidden md:block"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)}</span><svg class="-me-0.5 ms-1 h-4 w-4 text-arbor-sage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
					else return [createVNode("span", { class: "inline-flex rounded-md" }, [createVNode("button", {
						type: "button",
						class: "inline-flex items-center gap-2 rounded-xl border border-arbor-glass-border bg-arbor-glass px-3 py-2 text-sm font-medium leading-4 text-arbor-cream transition duration-150 ease-in-out hover:bg-white/10 focus:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night"
					}, [
						createVNode("div", { class: "w-7 h-7 rounded-full bg-arbor-moss/30 flex items-center justify-center text-xs font-medium text-arbor-emerald" }, toDisplayString(_ctx.$page.props.auth.user.name.charAt(0).toUpperCase()), 1),
						createVNode("span", { class: "hidden md:block" }, toDisplayString(_ctx.$page.props.auth.user.name), 1),
						(openBlock(), createBlock("svg", {
							class: "-me-0.5 ms-1 h-4 w-4 text-arbor-sage",
							xmlns: "http://www.w3.org/2000/svg",
							viewBox: "0 0 20 20",
							fill: "currentColor"
						}, [createVNode("path", {
							"fill-rule": "evenodd",
							d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
							"clip-rule": "evenodd"
						})]))
					])])];
				}),
				content: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_sfc_main$3, { href: _ctx.route("profile.edit") }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<span class="flex items-center gap-2"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"${_scopeId}></path></svg> Profil </span>`);
								else return [createVNode("span", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								})])), createTextVNode(" Profil ")])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div class="border-t border-arbor-glass-border my-1"${_scopeId}></div><div class="px-4 py-2"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$4, null, null, _parent, _scopeId));
						_push(`</div><div class="border-t border-arbor-glass-border my-1"${_scopeId}></div>`);
						_push(ssrRenderComponent(_sfc_main$3, {
							href: _ctx.route("logout"),
							method: "post",
							as: "button"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<span class="flex items-center gap-2"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"${_scopeId}></path></svg> Déconnexion </span>`);
								else return [createVNode("span", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								})])), createTextVNode(" Déconnexion ")])];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						createVNode(_sfc_main$3, { href: _ctx.route("profile.edit") }, {
							default: withCtx(() => [createVNode("span", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							})])), createTextVNode(" Profil ")])]),
							_: 1
						}, 8, ["href"]),
						createVNode("div", { class: "border-t border-arbor-glass-border my-1" }),
						createVNode("div", { class: "px-4 py-2" }, [createVNode(_sfc_main$4)]),
						createVNode("div", { class: "border-t border-arbor-glass-border my-1" }),
						createVNode(_sfc_main$3, {
							href: _ctx.route("logout"),
							method: "post",
							as: "button"
						}, {
							default: withCtx(() => [createVNode("span", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							})])), createTextVNode(" Déconnexion ")])]),
							_: 1
						}, 8, ["href"])
					];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="-me-2 flex items-center sm:hidden"><button${ssrRenderAttr("aria-label", showingNavigationDropdown.value ? "Fermer le menu" : "Ouvrir le menu")}${ssrRenderAttr("aria-expanded", showingNavigationDropdown.value)} class="inline-flex items-center justify-center rounded-xl p-2.5 text-arbor-sage transition duration-150 ease-in-out hover:bg-arbor-glass hover:text-arbor-cream focus:bg-arbor-glass focus:text-arbor-cream focus:outline-none min-h-[44px] min-w-[44px]"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path class="${ssrRenderClass({
				hidden: showingNavigationDropdown.value,
				"inline-flex": !showingNavigationDropdown.value
			})}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({
				hidden: !showingNavigationDropdown.value,
				"inline-flex": showingNavigationDropdown.value
			})}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{
				block: showingNavigationDropdown.value,
				hidden: !showingNavigationDropdown.value
			}, "sm:hidden bg-arbor-deep/95 backdrop-blur-md border-b border-arbor-glass-border"])}"><div class="space-y-1 pb-3 pt-2 px-4">`);
			_push(ssrRenderComponent(_sfc_main$1, {
				href: _ctx.route("dashboard"),
				active: _ctx.route().current("dashboard")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Dashboard `);
					else return [createTextVNode(" Dashboard ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_sfc_main$1, {
				href: _ctx.route("sounds.index"),
				active: _ctx.route().current("sounds.*")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Sons naturels `);
					else return [createTextVNode(" Sons naturels ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_sfc_main$1, {
				href: _ctx.route("map.index"),
				active: _ctx.route().current("map.index")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Carte des sons `);
					else return [createTextVNode(" Carte des sons ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_sfc_main$1, {
				href: _ctx.route("<redacted>-map.index"),
				active: _ctx.route().current("<redacted>-map.index")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Carte communauté `);
					else return [createTextVNode(" Carte communauté ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_sfc_main$1, {
				href: _ctx.route("sounds.create"),
				active: _ctx.route().current("sounds.create")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="flex items-center gap-2"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Publier </span>`);
					else return [createVNode("span", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
						class: "w-4 h-4",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						"stroke-width": "2",
						d: "M12 4v16m8-8H4"
					})])), createTextVNode(" Publier ")])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_sfc_main$1, {
				href: _ctx.route("sounds.record"),
				active: _ctx.route().current("sounds.record")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="flex items-center gap-2"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg> Enregistrer </span>`);
					else return [createVNode("span", { class: "flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
						class: "w-4 h-4",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						"stroke-width": "1.5",
						d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
					})])), createTextVNode(" Enregistrer ")])];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="border-t border-arbor-glass-border pb-1 pt-4 px-4"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 rounded-full bg-arbor-moss/30 flex items-center justify-center text-sm font-medium text-arbor-emerald">${ssrInterpolate(_ctx.$page.props.auth.user.name.charAt(0).toUpperCase())}</div><div><div class="text-base font-medium text-arbor-cream">${ssrInterpolate(_ctx.$page.props.auth.user.name)}</div><div class="text-sm font-medium text-arbor-sage">${ssrInterpolate(_ctx.$page.props.auth.user.email)}</div></div></div><div class="mt-3 space-y-1">`);
			_push(ssrRenderComponent(_sfc_main$1, { href: _ctx.route("profile.edit") }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Profil `);
					else return [createTextVNode(" Profil ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_sfc_main$1, {
				href: _ctx.route("logout"),
				method: "post",
				as: "button"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Déconnexion `);
					else return [createTextVNode(" Déconnexion ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></nav>`);
			if (_ctx.$slots.header) {
				_push(`<header class="bg-arbor-deep/50 border-b border-arbor-glass-border mt-16"><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">`);
				ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
				_push(`</div></header>`);
			} else _push(`<!---->`);
			_push(`<main class="pt-16">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as t };

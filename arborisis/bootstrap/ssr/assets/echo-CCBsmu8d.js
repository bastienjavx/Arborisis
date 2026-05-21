import Echo from "laravel-echo";
import Pusher from "pusher-js";
//#region resources/js/echo.js
window.Pusher = Pusher;
var echo = new Echo({
	broadcaster: "reverb",
	key: void 0,
	wsHost: void 0,
	wsPort: 80,
	wssPort: 443,
	forceTLS: true,
	enabledTransports: ["ws", "wss"]
});
//#endregion
export { echo as t };

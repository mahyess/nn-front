import packageJson from "../../package.json";
let ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
let host = "://" + window.location.host;

if (process.env.NODE_ENV === "development") {
  host = packageJson.proxy.replace("http", "");
}

if (host.slice(-1) !== "/") {
  host = host + "/";
}

const API_PATH = ws_scheme + host + "ws/chat";
const GROUP_CHAT_PATH = ws_scheme + host + "ws/chat";

const NOTIF_API_PATH = ws_scheme + host + "ws/notification";
const USER_API_PATH = ws_scheme + host + "ws/user";

export default {
  API_PATH,
  NOTIF_API_PATH,
  USER_API_PATH,
  GROUP_CHAT_PATH,
};

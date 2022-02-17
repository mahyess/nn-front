import config from "../config";
import ReconnectingWebSocket from "reconnecting-websocket";

class NotificationSocket {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!NotificationSocket.instance) {
      NotificationSocket.instance = new NotificationSocket();
    }

    return NotificationSocket.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect() {
    let token = localStorage.getItem("token");

    let path;
    if (token !== null) {
      path = config.NOTIF_API_PATH + "?token=" + token;
    } else {
      token = localStorage.getItem("token");
      path = config.NOTIF_API_PATH + "?token=" + token;
    }

    this.socketRef = new ReconnectingWebSocket(path);

    this.socketRef.onopen = () => {
      console.log("WebSocket open for notification.");
    };
    this.socketRef.onmessage = (e) => {
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = (e) => {
      console.log("Error on notification socket connection." + e);
    };
    this.socketRef.onclose = (e) => {
      console.log("WebSocket for notification closed let's reopen");
      // setTimeout(() => {
      //   this.connect();
      // }, 5000);
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);

    // console.log("json data", data);

    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }

    if (command === "notifications") {
      this.callbacks[command](parsedData.notifications);
    }
    if (command === "unread_notifications") {
      this.callbacks[command](parsedData.count);
    }

    if (command === "unread_messages") {
      this.callbacks[command](parsedData.count);
    }

    if (command === "new_message") {
      this.callbacks[command](parsedData.message);
    }

    if (command === "new_request") {
      this.callbacks[command](parsedData.request);
    }
  }

  fetchNotifications() {
    this.sendMessage({
      command: "fetch_notification",
    });
  }

  fetchUnreadMessages() {
    this.sendMessage({
      command: "fetch_unread_messages",
    });
  }

  addCallbacks(
    unreadNotificationCallback,
    setNotificationCallback,
    setMessagesUnread,
    setUnreadCount,
    friendRequestCallback
  ) {
    this.callbacks["unread_notifications"] = unreadNotificationCallback;
    this.callbacks["notifications"] = setNotificationCallback;
    this.callbacks["new_message"] = setMessagesUnread;
    this.callbacks["unread_messages"] = setUnreadCount;
    this.callbacks["new_request"] = friendRequestCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }
}

const NotifWebSocketInstance = NotificationSocket.getInstance();

export default NotifWebSocketInstance;

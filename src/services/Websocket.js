import config from "../config";
import ReconnectingWebSocket from "reconnecting-websocket";

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect() {
    let path;
    let token = localStorage.getItem("token");

    if (token != null) {
      path = config.API_PATH + "?token=" + token;
    } else {
      token = localStorage.getItem("token");
      path = config.API_PATH + "?token=" + token;
    }
    // this.socketRef = new ReconnectingWebSocket(path, null, {
    //   reconnectInterval: 100,
    //   maxReconnectInterval: 100,
    //   maxReconnectAttempts: 20
    // });
    this.socketRef = new ReconnectingWebSocket(path);
    this.socketRef.binaryType = "arraybuffer";

    this.socketRef.onopen = () => {
      console.log("WebSocket open for messages");
    };
    this.socketRef.onmessage = (e) => {
      console.log("print", e);
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = (e) => {
      console.log("Error on socket connection." + e);
    };
    this.socketRef.onclose = (e) => {
      console.log(e);

      console.log("WebSocket closed let's reopen");
      // setTimeout(() => {
      //   this.connect();
      // }, 5000);
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    console.log("print", data);

    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parsedData.messages);
    }
    if (command === "new_message") {
      // console.log(parsedData.message);
      this.callbacks[command](parsedData.message);
    }
  }

  initChatUser(username) {
    this.sendMessage({ command: "init_chat", username: username });
  }

  fetchMessages(username) {
    this.sendMessage({
      command: "fetch_messages",
      username: username,
    });
    // console.log('fer');
  }

  newChatMessage(message) {
    console.log(message);

    this.sendMessage({
      command: "new_message",
      to: message.to,
      content: message.content,
    });
  }

  addCallbacks(messagesCallback, newMessageCallback, fetchFriendList) {
    this.callbacks["messages"] = messagesCallback;
    this.callbacks["new_message"] = newMessageCallback;
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

  waitForSocketConnection(callback) {
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(function () {
      if (socket.readyState === 1) {
        console.log("Connection is made");
        if (callback != null) {
          callback();
        }
        return;
      } else {
        console.log("wait for connection...");
        recursion(callback);
      }
    }, 1); // wait 5 milisecond for the connection...
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;

import config from "../config";
import ReconnectingWebSocket from "reconnecting-websocket";

class GroupChatSocket {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!GroupChatSocket.instance) {
      GroupChatSocket.instance = new GroupChatSocket();
    }
    return GroupChatSocket.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect() {
    let path;
    let token = localStorage.getItem("token");

    if (token != null) {
      path = config.GROUP_CHAT_PATH + "?token=" + token;
    } else {
      token = localStorage.getItem("token");
      path = config.GROUP_CHAT_PATH + "?token=" + token;
    }
    // this.socketRef = new ReconnectingWebSocket(path, null, {
    //   reconnectInterval: 100,
    //   maxReconnectInterval: 100,
    //   maxReconnectAttempts: 20
    // });
    this.socketRef = new ReconnectingWebSocket(path);
    this.socketRef.onopen = () => {
      console.log("WebSocket open for messages");
    };
    this.socketRef.onmessage = (e) => {
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = (e) => {
      console.log("Error on socket connection.", e);
    };
    this.socketRef.onclose = (e) => {
      console.log("WebSocket closed let's reopen", e);
      // setTimeout(() => {
      //   this.connect();
      // }, 5000);
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    // console.log(parsedData);

    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      // console.log(parsedData);
      console.log(parsedData.messages);
      this.callbacks[command](parsedData.messages);
    }
    else if (command === "new_message") {
      console.log(parsedData.message);
      this.callbacks[command](parsedData.message);
    }
  }

  initChat(groupID) {
    this.sendMessage({ command: "init_chat", groupID: groupID });
  }

  fetchMessages(groupID) {
    this.sendMessage({
      command: "fetch_messages",
      groupID: groupID,
    });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      groupID: message.groupID,
      content: message.content,
    });
  }

  addCallbacks(messagesCallback, newMessageCallback) {
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
}

const GroupChatInstance = GroupChatSocket.getInstance();

export default GroupChatInstance;

const isAttachment = (message) => {
  //   let cntnt = /[.]/.exec(message) ? /[^.]+$/.exec(message) : undefined;
  //   let images = ["jpg", "jpeg", "gif", "png"];

  // if (!isEmpty(message)) {
  if (typeof message === "string") {
    if (
      message.includes("data:image/gif;base64,") ||
      message.includes("data:image/png;base64,") ||
      message.includes("data:image/jpeg;base64,") ||
      message.includes("data:image/webp;base64,") ||
      message.includes(".png")
    ) {
      return true;
    }
  }
  // } else {
  //     return false;
  // }
};

export default isAttachment;

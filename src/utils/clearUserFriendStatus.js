const customAttributes = [
  "cancelledRequest",
  "requestSent",
  "requestAccepted",
  "requestRejected",
];

export const clearUserFriendStatus = (user) => {
  customAttributes.forEach((attribute) => {
    delete user[attribute];
  });
  return user;
};

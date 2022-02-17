// const ValidateEmail = (email) => {
//   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// };

const ValidateUsername = (username) => {
  if (username !== "" && username.length >= 4) {
    return true;
  } else {
    return false;
  }
};
const emailOrPhone = (value) => {
  if (value !== "") {
    return true;
  } else {
    return false;
  }
};

const ValidatePassword = (password) => {
  if (password !== "" && password.length >= 8) {
    return true;
  } else {
    return false;
  }
};

const ValidatePassword2 = (password2, password) => {
  if (password2 !== "" && password2 === password) {
    return true;
  } else {
    return false;
  }
};

export const Validator = (values) => {
  let username = ValidateUsername(values.username);
  let email_or_phone = emailOrPhone(values.email_or_phone);
  let password = ValidatePassword(values.password);
  let password2 = ValidatePassword2(values.password2, values.password);

  if (!username) {
    return {
      status: false,
      message: {
        username: "username must be grater then 4 digit.",
      },
    };
  }

  if (!password) {
    return {
      status: false,
      message: {
        password: "Password must be more then 8 digit long.",
      },
    };
  }
  if (!password2) {
    return {
      status: false,
      message: {
        password2: "Password must match.",
      },
    };
  }

  if (!email_or_phone) {
    return {
      status: false,
      message: {
        email_or_phone: "email/phone is required.",
      },
    };
  }

  return { status: true, message: "Validated." };
};


const formatString = function(string) {
  return string.replace(/_/g, ' ');
};

// check field is empty
const hasWhiteSpacesOnly = val => {
  return val.replace(/\s/g, '').length || 'Field is empty';
};

// check email format
const emailFormat = val => {
  const regex = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

  return regex.test(val) || 'Invalid email';
};

// check correct phone format
const { phone } = require('phone');
const phoneValid = val => {
  return phone(val, { country: 'USA' }).isValid || 'Invalid Phone Number';
};
// eg of valid no.
// 00-1-202-588-6500

// 0012025886500
// 12025886500
// (817) 569-8900


const showNotification = function(vm, message, color, icon , position = 'top-right',) {
  vm.$q.notify({
    message: message,
    color: color,
    icon: icon,
    position: position
  });
};

export default {
  formatString,
  hasWhiteSpacesOnly,
  phoneValid,
  showNotification,
  emailFormat
}


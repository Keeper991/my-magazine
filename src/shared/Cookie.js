const getCookie = (key) => {
  const cookies = "; " + document.cookie;
  const value = cookies.split(`; ${key}=`);
  if (value.length === 2) {
    return value[1].split("=")[0];
  }
};

const setCookie = (key, value, exp = 5) => {
  const time = new Date();
  time.setTime(time.getTime() + exp * 1000 * 60 * 60 * 24);
  document.cookie = `${key}=${value}; expires=${time.toUTCString()}`;
};

const deleteCookie = (key) => {
  const time = new Date("2020-01-01");
  document.cookie = `${key}=; expire=${time.toUTCString()}`;
};

export { getCookie, setCookie, deleteCookie };

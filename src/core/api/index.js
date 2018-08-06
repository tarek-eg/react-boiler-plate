import merge from "lodash/merge";
import get from "lodash/get";
import axios from "axios";

import storage from "../storage";
import transformKeys from "../transformKeys";
import ResourceStrings from "../../resources";
import { openNotification } from "../../components/Notifications";

const getOptions = config => {
  const auth = storage.get("auth");
  const headers = {
    Accept: "application/json",
    "X-API-ACCESS-TOKEN": "###"
  };
  if (["POST", "PATCH"].includes(config.method)) {
    // merge(headers, { 'Content-Type': 'multipart/form-data' });
  }

  if (get(auth, "token")) {
    return merge(
      {},
      config,
      { headers },
      { headers: { Authorization: `Bearer ${get(auth, "token")}` } }
    );
  }

  return merge({}, config, { headers });
};

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const auth = storage.get("auth");
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;

      return axios({
        url: "/v2/api/system/refresh-access-token",
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${get(auth, "token")}`,
          "X-API-ACCESS-TOKEN": "###"
        }
      })
        .then(({ response }) => {
          // const updatedUser = merge(data, {
          //   token: data.data.success.token,
          //   validUntil: data.data.success.validUntil
          // });
          // storage.set('user', updatedUser);
          storage.set("auth", {
            token: response.data.success.token,
            validUntil: response.data.success.validUntil
          });
          originalRequest.headers.Authorization = `Bearer ${
            response.data.success.token
          }`;
          return axios(originalRequest);
        })
        .catch(() => {
          storage.clear();
          window.location.href = "/user/signup";
        });
    }

    return Promise.reject(error);
  }
);

const api = config => {
  const options = getOptions(config);
  if (options && options.data) {
    transformKeys.toKebabCase(options.data);
  }
  return axios(options)
    .then(res => {
      // openNotification({
      //   type: 'success',
      //   message: res.data.success.message || ResourceStrings.defaultError,
      // });
      return transformKeys.toCamelCase(res);
    })
    .catch(err => {
      openNotification({
        type: "error",
        message: err.response.data.error.message || ResourceStrings.defaultError
      });
      return err.response;
    });
};

export default api;

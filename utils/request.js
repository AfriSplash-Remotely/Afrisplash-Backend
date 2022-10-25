const axios = require("axios");

exports.fetchRequest = async (url, method, headers, data) => {
  const options = {
    url: url,
    data,
    method,
    headers,
  };

  const request = await axios(options);
  return request.data;
};

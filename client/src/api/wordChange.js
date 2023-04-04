const SERVER_URL = `http://localhost:4777/`;

// url: URL에서 protocol, host(server), port를 제외한 나머지
export const wordChange = (url, config) => {
  return fetch(`${SERVER_URL}${url}`, config).then((res) => res.json());
};

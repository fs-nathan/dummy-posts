function makeHeader(token = "") {
  const header = token
    ? {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      }
    : {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
  return header;
}

function login(data, success, fail) {
  return fetch("/login", {
    method: "post",
    body: JSON.stringify(data),
    headers: makeHeader(),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(success)
    .catch(fail);
}

function getPosts(token, success, fail) {
  return fetch("/api/posts", {
    headers: makeHeader(token),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(success)
    .catch(fail);
}

function createPost(token, data) {
  return fetch("/api/posts", {
    method: "post",
    body: JSON.stringify(data),
    headers: makeHeader(token),
  }).then(checkStatus);
}

function updatePost(token, data) {
  return fetch("/api/posts", {
    method: "put",
    body: JSON.stringify(data),
    headers: makeHeader(token),
  }).then(checkStatus);
}

function deletePost(token, data) {
  return fetch("/api/posts", {
    method: "delete",
    body: JSON.stringify(data),
    headers: makeHeader(token),
  }).then(checkStatus);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

export default {
  login,
  getPosts,
  createPost,
  updatePost,
  deletePost,
};

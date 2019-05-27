import { default as LO } from 'lodash';
import 'whatwg-fetch';
import 'fetch-detector';
import 'fetch-ie8';

const Fetch = {};
const parseJSON = response => {
  if (response.headers.get('Content-Type').indexOf('text/plain') !== -1) {
    return response.text();
  }
  return response.json();
};

const checkHttpStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  // if (response.status === 400) {
  //   return response;
  // }
  const error = new Error(`调取服务发生错误:错误码:${response.status},错误信息:${response.statusText}`);
  throw error;
};
Fetch.getJSON = resource => fetch(resource.url + '?' + LO.map(resource.params, (item, key) => key + '=' + item).join('&'), { credentials: 'include' })
  .then(checkHttpStatus)
  .then(parseJSON);
Fetch.getHTML = Fetch.getJSON;

Fetch.post = resource => fetch(resource.url, {
  method: 'post',
  body: LO.map(resource.params, (item, key) => key + '=' + item).join('&'),
  credentials: 'include'
})
  .then(checkHttpStatus)
  .then(parseJSON);

Fetch.postForm = resource => fetch(resource.url, {
  method: 'post',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: LO.map(resource.params, (item, key) => key + '=' + item).join('&')
})
  .then(checkHttpStatus)
  .then(parseJSON);

Fetch.postJSON = resource => fetch(resource.url, {
  method: 'post',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(resource.params)
})
  .then(checkHttpStatus)
  .then(parseJSON);

Fetch.postFile = resource => {
  const formData = new FormData();
  LO.map(resource.params, (item, key) => formData.append(key, item));
  return fetch(resource.url, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  })
    .then(checkHttpStatus)
    .then(parseJSON);
};

export default Fetch;
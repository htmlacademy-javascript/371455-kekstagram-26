// // import { createAlertMessage } from './message-popup';
// import {API_ADDRESS} from './constants.js';

// const getData = (onSuccess) => {
//   fetch(`${API_ADDRESS}/data`, { method: 'GET' })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error(`${response.status} ${response.statusText}`);
//     })
//     .then((posts) => {
//       onSuccess(posts);
//     })
//     .catch(() => {
//       createAlertMessage();
//     });
// };

// const sendData = (formData, onSuccess, onError) => {
//   fetch(API_ADDRESS, { method: 'POST', body: formData })
//     .then((response) => {
//       if (response.ok) {
//         onSuccess();
//         return;
//       }
//       onError();
//     })
//     .catch(() => onError());
// };

// export { getData, sendData };

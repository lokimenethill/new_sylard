/* eslint-disable no-console */
/* eslint-disable no-alert */
import './stylesheets/style.css';

console.log('webpack junciona');
const show = (m = 'hola') => {
  alert(m);
};
show();
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resuelto');
    }, 2000);
  });
}
async function asyncCall() {
  console.log('llamando');
  const result = await resolveAfter2Seconds();
  console.log(result);
}
asyncCall();

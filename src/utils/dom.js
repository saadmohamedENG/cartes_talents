const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function clearElement(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

/** //기존 ES6문법
export function hello() {
  return "Hello";
}**/

// node.js문법
function hello() {
  return "Hello";
}

module.exports.hello = hello;
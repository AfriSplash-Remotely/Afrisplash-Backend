// test.js
const assert = require('assert');
const add = require('./add');

// Test case 1
assert.strictEqual(add(1, 2), 3, '1 + 2 should equal 3');

// Test case 2
assert.strictEqual(add(3, 7), 10, '3 + 7 should equal 10');

console.log('All tests passed successfully!');

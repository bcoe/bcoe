const { describe, it } = require('mocha');
const assert = require('assert');

const { chartData } = require('./');

describe('profile-interests', () => {
  it('break down of interests must be 100%', () => {
    const data = chartData();
    let sum = 0;
    for (const percent of data.datasets[0].data) {
      sum += percent;
    }
    assert.strictEqual(sum, 100);
  });
  it("must only list Ben's interests", () => {
    const expected = [
      'Rock climbing 🧗',
      'Coding 🤓',
      'Dinner with friends 🍕',
      'Making fancy drinks 🍹'
    ];
    const data = chartData();
    assert.deepStrictEqual(data.labels, expected);
  });
});

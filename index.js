const { writeFileSync } = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

async function render () {
  const width = 400;
  const height = 300;
  const type = 'svg';
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ type, width, height });
  const configuration = {
    type: 'pie',
    data: chartData()
  };
  const image = await chartJSNodeCanvas.renderToBufferSync(configuration);
  writeFileSync('./interests.svg', image);
}

function chartData () {
  const interests = require('./interests');
  const labels = [];
  const dataset = {
    label: "Ben's interests",
    data: [],
    backgroundColor: []
  };
  for (const interest of interests) {
    console.info(interest);
    labels.push(interest.interest);
    dataset.data.push(interest.timeSpent);
    dataset.backgroundColor.push(interest.color);
  }
  return {
    labels,
    datasets: [dataset]
  };
}

module.exports = {
  chartData
};

if (require.main === module) {
  console.info(chartData());
  render();
}

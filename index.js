const { writeFileSync } = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

// Render the chart described in interests.json and output as svg:
function render () {
  const width = 400;
  const height = 300;
  const type = 'svg';

  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    type,
    width,
    height,
    chartCallback: ChartJS => {
      ChartJS.defaults.global.defaultFontStyle = 'bold';
    }
  });
  const configuration = {
    type: 'pie',
    data: chartData()
  };
  const image = chartJSNodeCanvas.renderToBufferSync(configuration);
  writeFileSync('./interests.svg', image);
}

// Transform the data in interests.json to a format useable by Chart.js:
function chartData () {
  const interests = require('./interests');
  const labels = [];
  const dataset = {
    label: "Ben's interests",
    data: [],
    backgroundColor: []
  };
  for (const interest of interests) {
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
  render();
}

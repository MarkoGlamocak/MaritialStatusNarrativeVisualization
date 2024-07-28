let scene1_data = []; // Married Males and Females Ages 15 - 34
let scene2_data = []; // Married Males and Females Ages 35 - 54
let scene3_data = []; // Married Males and Females Ages 55 and over

async function init() {
  data = await d3.csv(
    'data/Week 30 - United States Marriage Status 2005 to 2017.csv'
  );

  let scene1_data_temp = {};
  let scene2_data_temp = {};
  let scene3_data_temp = {};
  data.forEach((d) => {
    if (
      d['Age Group'] === '15 to 19 years' ||
      d['Age Group'] === '20 to 34 years'
    ) {
      if (!(d.Year in scene1_data_temp)) {
        scene1_data_temp[d.Year] = {
          Year: +d.Year,
          Age_Group: 'ages 15 to 34',
          Married_Male_Population: 0,
          Married_Female_Population: 0,
          Total_Male_Population: 0,
          Total_Female_Population: 0,
          Total_Married_Percentage: 0,
          Married_Male_Percentage: 0,
          Married_Female_Percentage: 0,
        };
      }
      if (d.Metric === 'Total') {
        if (d.Gender === 'Male') {
          scene1_data_temp[d.Year].Total_Male_Population +=
            +d['Estimated Population'];
        } else {
          scene1_data_temp[d.Year].Total_Female_Population +=
            +d['Estimated Population'];
        }
      } else if (d.Metric === 'Married') {
        if (d.Gender === 'Male') {
          scene1_data_temp[d.Year].Married_Male_Population +=
            +d['Estimated Population'];
        } else {
          scene1_data_temp[d.Year].Married_Female_Population +=
            +d['Estimated Population'];
        }
      }
    } else if (
      d['Age Group'] === '35 to 44 years' ||
      d['Age Group'] === '45 to 54 years'
    ) {
      if (!(d.Year in scene2_data_temp)) {
        scene2_data_temp[d.Year] = {
          Year: +d.Year,
          Age_Group: 'ages 35 to 54',
          Married_Male_Population: 0,
          Married_Female_Population: 0,
          Total_Male_Population: 0,
          Total_Female_Population: 0,
          Total_Married_Percentage: 0,
          Married_Male_Percentage: 0,
          Married_Female_Percentage: 0,
        };
      }
      if (d.Metric === 'Total') {
        if (d.Gender === 'Male') {
          scene2_data_temp[d.Year].Total_Male_Population +=
            +d['Estimated Population'];
        } else {
          scene2_data_temp[d.Year].Total_Female_Population +=
            +d['Estimated Population'];
        }
      } else if (d.Metric === 'Married') {
        if (d.Gender === 'Male') {
          scene2_data_temp[d.Year].Married_Male_Population +=
            +d['Estimated Population'];
        } else {
          scene2_data_temp[d.Year].Married_Female_Population +=
            +d['Estimated Population'];
        }
      }
    } else {
      if (!(d.Year in scene3_data_temp)) {
        scene3_data_temp[d.Year] = {
          Year: +d.Year,
          Age_Group: 'ages 55 and over',
          Married_Male_Population: 0,
          Married_Female_Population: 0,
          Total_Male_Population: 0,
          Total_Female_Population: 0,
          Total_Married_Percentage: 0,
          Married_Male_Percentage: 0,
          Married_Female_Percentage: 0,
        };
      }
      if (d.Metric === 'Total') {
        if (d.Gender === 'Male') {
          scene3_data_temp[d.Year].Total_Male_Population +=
            +d['Estimated Population'];
        } else {
          scene3_data_temp[d.Year].Total_Female_Population +=
            +d['Estimated Population'];
        }
      } else if (d.Metric === 'Married') {
        if (d.Gender === 'Male') {
          scene3_data_temp[d.Year].Married_Male_Population +=
            +d['Estimated Population'];
        } else {
          scene3_data_temp[d.Year].Married_Female_Population +=
            +d['Estimated Population'];
        }
      }
    }
  });

  populateSceneData(scene1_data_temp, scene1_data);
  populateSceneData(scene2_data_temp, scene2_data);
  populateSceneData(scene3_data_temp, scene3_data);
}

async function martiniGlass() {
  await authorDrivenStage();
  userDrivenStage();
}

async function authorDrivenStage() {
  d3.selectAll('.intro-container').remove();

  await buildScene(scene1_data, 0, 11);
  await buildScene(scene2_data, 0, 10);
  await buildScene(scene3_data, 0, 11);

  d3.select('#interactive-message-container')
    .append('h2')
    .text('Discover More Insights!')
    .style('font-size', '2rem')
    .append('p')
    .text(
      'Scroll down the page to explore all the graphs. For additional details, hover over any graph to reveal more information.'
    )
    .style('font-size', '18px')
    .style('color', 'grey')
    .append('hr');

  return new Promise((resolve) => resolve('Operation successful!'));
}

function userDrivenStage() {
  buildEndScene(scene1_data, 1);
  buildEndScene(scene2_data, 2);
  buildEndScene(scene3_data, 3);
}

function populateSceneData(scene_data_temp, scene_data) {
  Object.keys(scene_data_temp).forEach((key) => {
    scene_data_temp[key].Total_Married_Percentage =
      ((scene_data_temp[key].Married_Male_Population +
        scene_data_temp[key].Married_Female_Population) /
        (scene_data_temp[key].Total_Male_Population +
          scene_data_temp[key].Total_Female_Population)) *
      100;
    scene_data_temp[key].Married_Male_Percentage =
      (scene_data_temp[key].Married_Male_Population /
        (scene_data_temp[key].Married_Male_Population +
          scene_data_temp[key].Married_Female_Population)) *
      100;
    scene_data_temp[key].Married_Female_Percentage =
      (scene_data_temp[key].Married_Female_Population /
        (scene_data_temp[key].Married_Male_Population +
          scene_data_temp[key].Married_Female_Population)) *
      100;
    scene_data.push(scene_data_temp[key]);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function chartAppear(ms) {
  return new Promise((resolve) =>
    d3
      .select('#line-chart')
      .transition()
      .duration(ms)
      .style('opacity', 1)
      .on('end', () => {
        resolve('Operation successful!');
      })
  );
}

function chartDisappear(ms) {
  return new Promise((resolve) =>
    d3
      .select('#line-chart')
      .transition()
      .duration(ms)
      .style('opacity', 0)
      .on('end', () => {
        d3.selectAll('svg').remove();
        resolve('Operation successful!');
      })
  );
}

function drawLine(path, ms) {
  return new Promise((resolve) => {
    const pathLength = path.node().getTotalLength();

    path
      .attr('stroke-dasharray', pathLength)
      .attr('stroke-dashoffset', pathLength)
      .transition()
      .duration(ms)
      .attr('stroke-dashoffset', 0)
      .ease(d3.easeLinear)
      .on('end', () => {
        resolve('Operation successful!');
      });
  });
}

async function buildScene(scene_data, highestPoint, lowestPoint) {
  const margin = { top: 80, right: 30, bottom: 60, left: 80 };
  const width = 1200 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  const x = d3
    .scaleLinear()
    .domain(d3.extent(scene_data, (d) => d.Year))
    .range([0, width]);

  const xAxis = d3
    .axisBottom(x)
    .tickFormat((d) => d.toString().replace(/,/g, ''));

  const y = d3
    .scaleLinear()
    .domain(d3.extent(scene_data, (d) => d.Total_Married_Percentage))
    .range([height, 0]);

  const yAxis = d3.axisLeft(y);

  const line = d3
    .line()
    .x((d) => x(d.Year))
    .y((d) => y(d.Total_Married_Percentage));

  const chart = d3
    .select('#line-chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  chart
    .append('text')
    .attr('x', width / 2)
    .attr('y', 50 - margin.top)
    .attr('text-anchor', 'middle')
    .style('font-size', '20px')
    .style('font-weight', 'bold')
    .style('fill', 'black')
    .text(
      `Estimated percentage of people married from 2005 - 2017 (Demographic: ${scene_data[0].Age_Group})`
    );

  chart.append('g').attr('transform', `translate(0,${height})`).call(xAxis);

  chart
    .selectAll('xGrid')
    .data(x.ticks().slice(1))
    .join('line')
    .attr('x1', (d) => x(d))
    .attr('x2', (d) => x(d))
    .attr('y1', 0)
    .attr('y2', height)
    .attr('stroke', 'lightgrey')
    .attr('stroke-width', 0.8);

  chart
    .append('text')
    .attr('transform', `translate(${width / 2},${height + margin.bottom - 10})`)
    .style('text-anchor', 'middle')
    .style('font-size', '15px')
    .style('fill', 'grey')
    .text('Year');

  chart.append('g').call(yAxis);

  chart
    .selectAll('yGrid')
    .data(y.ticks().slice(1))
    .join('line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', (d) => y(d))
    .attr('y2', (d) => y(d))
    .attr('stroke', 'lightgrey')
    .attr('stroke-width', 0.8);

  chart
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - height / 2)
    .attr('dy', '2em')
    .style('text-anchor', 'middle')
    .style('font-size', '15px')
    .style('fill', 'grey')
    .text('Estimated Percentage of Married (%)');

  await chartAppear(1000);

  await sleep(1000);

  const path = chart
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', 3)
    .attr('d', line(scene_data));

  await drawLine(path, 5000);

  const annotations = [
    {
      note: {
        label: `Married Male: ${
          Math.floor(scene_data[highestPoint].Married_Male_Percentage * 1000) /
          1000
        } %\n
        Married Female: ${
          Math.floor(
            scene_data[highestPoint].Married_Female_Percentage * 1000
          ) / 1000
        } %`,
        title: 'Gender Split',
        wrap: 200,
      },
      x: x(scene_data[highestPoint].Year),
      y: y(scene_data[highestPoint].Total_Married_Percentage),
      dy: 20,
      dx: 200,
      subject: {
        radius: 10,
      },
      type: d3.annotationCallout,
    },
    {
      note: {
        label: `Married Male: ${
          Math.floor(scene_data[lowestPoint].Married_Male_Percentage * 1000) /
          1000
        } %\n
        Married Female: ${
          Math.floor(scene_data[lowestPoint].Married_Female_Percentage * 1000) /
          1000
        } %`,
        title: 'Gender Split',
        wrap: 200,
      },
      x: x(scene_data[lowestPoint].Year),
      y: y(scene_data[lowestPoint].Total_Married_Percentage),
      dy: -200,
      dx: -200,
      subject: {
        radius: 10,
      },
      type: d3.annotationCallout,
    },
  ];

  chart
    .append('g')
    .attr('class', 'annotations')
    .call(d3.annotation().annotations(annotations));

  await sleep(5000);

  await chartDisappear(1000);

  return new Promise((resolve) => {
    resolve('Operation successful!');
  });
}

async function buildEndScene(scene_data, tooltipnum) {
  const margin = { top: 80, right: 30, bottom: 60, left: 80 };
  const width = 1200 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  const x = d3
    .scaleLinear()
    .domain(d3.extent(scene_data, (d) => d.Year))
    .range([0, width]);

  const xAxis = d3
    .axisBottom(x)
    .tickFormat((d) => d.toString().replace(/,/g, ''));

  const y = d3
    .scaleLinear()
    .domain(d3.extent(scene_data, (d) => d.Total_Married_Percentage))
    .range([height, 0]);

  const yAxis = d3.axisLeft(y);

  const line = d3
    .line()
    .x((d) => x(d.Year))
    .y((d) => y(d.Total_Married_Percentage));

  const chart = d3
    .select('#line-chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  chart
    .append('text')
    .attr('x', width / 2)
    .attr('y', 50 - margin.top)
    .attr('text-anchor', 'middle')
    .style('font-size', '20px')
    .style('font-weight', 'bold')
    .style('fill', 'black')
    .text(
      `Estimated percentage of people married from 2005 - 2017 (Demographic: ${scene_data[0].Age_Group})`
    );

  chart.append('g').attr('transform', `translate(0,${height})`).call(xAxis);

  chart
    .selectAll('xGrid')
    .data(x.ticks().slice(1))
    .join('line')
    .attr('x1', (d) => x(d))
    .attr('x2', (d) => x(d))
    .attr('y1', 0)
    .attr('y2', height)
    .attr('stroke', 'lightgrey')
    .attr('stroke-width', 0.8);

  chart
    .append('text')
    .attr('transform', `translate(${width / 2},${height + margin.bottom - 10})`)
    .style('text-anchor', 'middle')
    .style('font-size', '15px')
    .style('fill', 'grey')
    .text('Year');

  chart.append('g').call(yAxis);

  chart
    .selectAll('yGrid')
    .data(y.ticks().slice(1))
    .join('line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', (d) => y(d))
    .attr('y2', (d) => y(d))
    .attr('stroke', 'lightgrey')
    .attr('stroke-width', 0.8);

  chart
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - height / 2)
    .attr('dy', '2em')
    .style('text-anchor', 'middle')
    .style('font-size', '15px')
    .style('fill', 'grey')
    .text('Estimated Percentage of Married (%)');

  await chartAppear(0);

  chart
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', 3)
    .attr('d', line(scene_data));

  const tooltip = d3.select('.tooltip');
  const maleGenderLegend = d3.select('.maleGenderLegend');
  const femaleGenderLegend = d3.select('.femaleGenderLegend');

  const point = chart
    .append('circle')
    .attr('r', 0)
    .attr('fill', 'green')
    .style('stroke', 'white')
    .attr('opacity', 0.7)
    .style('pointer-events', 'none');

  const listeningRect = chart
    .append('rect')
    .attr('opacity', 0)
    .attr('width', width)
    .attr('height', height);

  listeningRect.on('mousemove', function (event) {
    const [xCoord] = d3.pointer(event, this);
    const bisectYear = d3.bisector((d) => d.Year).left;
    const x0 = x.invert(xCoord);
    const i = bisectYear(scene_data, x0, 1);
    const d0 = scene_data[i - 1];
    const d1 = scene_data[i];
    const d = x0 - d0.Year > d1.Year - x0 ? d1 : d0;
    const xPos = x(d.Year);
    const yPos = y(d.Total_Married_Percentage);

    point.attr('cx', xPos).attr('cy', yPos);

    point.transition().duration(50).attr('r', 5);

    switch (tooltipnum) {
      case 1:
        tooltip
          .style('display', 'block')
          .style('left', `${xPos + 120}px`)
          .style('top', `${yPos + 195}px`)
          .html(
            `<strong>Year:</strong> ${d.Year}<br><strong>Estimated % of Married:</strong>
        ${d.Total_Married_Percentage}`
          );
        maleGenderLegend
          .style('display', 'block')
          .style('left', `${width - margin.right * 5}px`)
          .style('top', `${margin.top * 3}px`)
          .html(
            `<strong>&#x2642; Married Male: </strong>${
              Math.floor(d.Married_Male_Percentage * 1000) / 1000
            } %`
          );
        femaleGenderLegend
          .style('display', 'block')
          .style('left', `${width - margin.right * 5}px`)
          .style('top', `${margin.top * 3 + 30}px`)
          .html(
            `<strong>&#x2640; Married Female: </strong>${
              Math.floor(d.Married_Female_Percentage * 1000) / 1000
            } %`
          );
        break;
      case 2:
        tooltip
          .style('display', 'block')
          .style('left', `${xPos + 120}px`)
          .style('top', `${yPos + 260 + height + margin.top}px`)
          .html(
            `<strong>Year:</strong> ${d.Year}<br><strong>Estimated % of Married:</strong>
        ${d.Total_Married_Percentage}`
          );
        maleGenderLegend
          .style('display', 'block')
          .style('left', `${width - margin.right * 5}px`)
          .style('top', `${4.8 * margin.top + height}px`)
          .html(
            `<strong>&#x2642; Married Male: </strong>${
              Math.floor(d.Married_Male_Percentage * 1000) / 1000
            } %`
          );
        femaleGenderLegend
          .style('display', 'block')
          .style('left', `${width - margin.right * 5}px`)
          .style('top', `${4.8 * margin.top + 30 + height}px`)
          .html(
            `<strong>&#x2640; Married Female: </strong>${
              Math.floor(d.Married_Female_Percentage * 1000) / 1000
            } %`
          );
        break;
      case 3:
        tooltip
          .style('display', 'block')
          .style('left', `${xPos + 120}px`)
          .style('top', `${yPos + 325 + 2 * height + 2 * margin.top}px`)
          .html(
            `<strong>Year:</strong> ${d.Year}<br><strong>Estimated % of Married:</strong>
        ${d.Total_Married_Percentage}`
          );
        maleGenderLegend
          .style('display', 'block')
          .style('left', `${width - margin.right * 5}px`)
          .style('top', `${6.6 * margin.top + 2 * height}px`)
          .html(
            `<strong>&#x2642; Married Male: </strong>${
              Math.floor(d.Married_Male_Percentage * 1000) / 1000
            } %`
          );
        femaleGenderLegend
          .style('display', 'block')
          .style('left', `${width - margin.right * 5}px`)
          .style('top', `${6.6 * margin.top + 30 + 2 * height}px`)
          .html(
            `<strong>&#x2640; Married Female: </strong>${
              Math.floor(d.Married_Female_Percentage * 1000) / 1000
            } %`
          );
        break;
      default:
    }
  });

  listeningRect.on('mouseleave', function () {
    point.transition().duration(50).attr('r', 0);

    tooltip.style('display', 'none');
    maleGenderLegend.style('display', 'none');
    femaleGenderLegend.style('display', 'none');
  });
}

 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.5,
  margin = {top: 20, bottom: 20, left: 20, right: 20};

/* LOAD DATA */
d3.csv('nyc_record_high_by_day.csv').then(function(data) {
  data.forEach(function(d) {
    d.Day = new Date(d.Day);
    d.Record_High = +d.Record_High;
  });

   // SCALES
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.Day))
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Record_High)])
    .range([height, 0]);


  // CREATE SVG ELEMENT
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "aliceblue")
    .style("overflow","visible")

  // Create the line generator/ area
  // const line = d3.line()
  const area = d3.area()
    .x(d => xScale(d.Day))
    .y0(height)
    .y1(d => yScale(d.Record_High));

  // Append the area to the SVG
  svg.append('path')
    .data([data])
    .attr('fill', 'brown')
    .attr("stroke", "black")
    .attr('stroke-width', 1.5)
    .attr('d', area);

  // Add the x-axis
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add the y-axis
  svg.append('g')
    .call(d3.axisLeft(yScale));
});
 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = {top: 20, bottom: 50, left: 60, right: 60};

/* LOAD DATA */
d3.csv("nyc_record_high_by_day.csv", d3.autoType)
  .then(data => {
    console.log(data)

// d3.csv('nyc_record_high_by_day.csv', d => {
//   // use custom initializer to reformat the data the way we want it
//   // ref: https://github.com/d3/d3-fetch#dsv
//   return {
//     Day: new Date(+d.Day, 0, 1),
//     Day_2: +d.Year,
//     Record_High: +d.Record_High,
//   }
// }).then(data => {
//   console.log('data :>> ', data);

  // SCALES
  const xScale = d3.scaleTime()
    .domain(d3.extend(data, d=> d.Day))
    .range([margin.left, width - margin.right])

  const yScale = d3.scaleLinear()
    .domain(d3.extend(data, d=> d.Record_High))
    .range([height - margin.bottom , margin.top])

  // CREATE SVG ELEMENT
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "aliceblue")
    .style("overflow","visible")


  // BUILD AND CALL AXES

  const xAxis = d3.axisBottom(xScale)
    .ticks(6) // limit the number of tick marks showing -- note: this is approximate

  const xAxisGroup = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0}, ${height - margin.bottom})`)
    .call(xAxis)

  const yAxis = d3.axisLeft(yScale)
    // .tickFormat(formatBillions)

  const yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.right}, ${0})`)
    .call(yAxis)

  yAxisGroup.append("text")
    .attr("class", 'yLabel')
    .attr("transform", `translate(${-45}, ${height / 2})`)
    .attr("writing-mode", 'vertical-rl')
    .text("Population")

  // LINE GENERATOR FUNCTION
  // const lineGen = d3.line()
  //   .x(d => xScale(d.year))
  //   .y(d => yScale(d.population))


  const groupedData = d3.groups(data, d => d.country)

  //DRAW LINE
  svg.selectAll(".line")
    .data(groupedData) // one array for every country
    .join("path")
    .attr("class", 'line')
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("d", ([country, data]) => lineGen(data))
    .attr("class", ([country, data]) => country)




});

/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .8;
const height = 500;
margin = {top: 40, bottom: 70, left: 70, right: 60};

/* LOAD DATA */
d3.csv('../data/MoMA_topTenNationalities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    const container = d3.select("#container")
    console.log('container', container)

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    const xScale = d3.scaleLinear()
    //   .domain(data.map(d => d.Count))
      .domain([0,6000])
      .range([ margin.left, width])

      console.log(data.map(d=> d.count))
      console.log(d3.extent(data.map(d=> d.count)))  // whats the min and max 

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.Nationality))
      .range([height,0])
      .padding(0.4)

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

    // svg

    const svg = d3.select("#container")
        .append("svg")
        .attr("height",height)
        .attr("width", width )
        .style("background-color", "aliceblue")
        .style("overflow","visible")

    //bars
    const bars = svg.selectAll("rect.bar")
        .data(data)
        .join("rect")
        .attr("class","bar")
        .attr("x", margin.left)
        .attr("width", d => xScale(d.Count))
        .attr("height", yScale.bandwidth())                 // Space inside rec
        .attr("y", d => yScale(d.Nationality))              // y positioning 
      

    const xAxisGroup = svg.append("g")
    const yAxisGroup = svg.append("g")


    yAxisGroup
      .attr("transform",`translate(${margin.left},${0})`)
      .call(d3.axisLeft(yScale)) // y scale
    //   .call(selection => selection.call(yAxis))
      


    xAxisGroup
        .attr("transform",`translate(0, ${height})`)
        .call(d3.axisBottom(xScale)) // axis bottom


  })

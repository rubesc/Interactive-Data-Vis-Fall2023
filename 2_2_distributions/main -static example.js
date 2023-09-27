/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = {top: 20, bottom: 60, left: 60, right: 40},
  radius = 5;

/* LOAD DATA */
d3.csv("../data/MoMA_distributions.csv", d3.autoType)
  .then(data => {
    console.log(data)

    /* SCALES */
    const xScale = d3.scaleLinear()
      // .domain([1840,1950])
      .domain([1800,1990])
      .range([margin.left, width - margin.right])


    const yScale = d3.scaleLinear()
      .domain([0,110])
      // .domain([30,110]) // to hide the zeros and for better legibility
      .range([height - margin.bottom , margin.top])

    
   const xAxis = d3.axisBottom(xScale)
   const yAxis = d3.axisLeft(yScale)

    /* HTML ELEMENTS */

    const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "aliceblue")
    .style("overflow","visible")


    svg.append("g")
      .attr("transform",`translate(${0},${height-margin.bottom})`)
      .call(selection => selection.call(xAxis))
    
    svg.append("g")
      .attr("transform",`translate(${margin.left},${0})`)
      .call(selection => selection.call(yAxis))
  
      
   // circles

   svg.selectAll("circle")
    .data(data)
    .join("circle") 
    .attr("class","Artist Lifespan")
    .attr("id",d => d.Artist)
    .attr("r",3) // radius
    .attr("cx", d => xScale(d.BeginDate)) 
    .attr("cy", d => yScale(d.ArtistLifespan) ) 



  });

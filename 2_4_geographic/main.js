/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 20, left: 20, right: 20 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
 Promise.all([
  d3.json("../data/world.json"),
  d3.csv("../data/MoMA_top_20_countries.csv", d3.autoType),
]).then(([geojson, nationalities]) => {

  // GETTING COUNTRIES OUT OF CSV FILE
  const countriesFromCSV = new Set(nationalities.map(d => d.Country));

  console.log('geojson, nationalities', geojson, nationalities)

 // CIRCLE SIZE BASED ON COUNT

  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "aliceblue")
    .style("overflow","visible")


  // SPECIFY PROJECTION
  const projection = d3.geoNaturalEarth1()
    .fitSize([width, height], geojson);


  // DEFINE PATH FUNCTION
  const pathGen = d3.geoPath().projection(projection);

  console.log(pathGen)

  // APPEND GEOJSON PATH  
  const Country = svg
    .selectAll("path.Country")
    .data(geojson.features)
    .join("path")
    .attr("class", "Country")
    .attr("d", d => pathGen(d))
    .attr("stroke", "white")
    .attr("fill","brown")


  // console.log(nationalities.longitude, nationalities.latitude)

  // svg.selectAll("circle")
  //   .data(nationalities)
  //   .enter()
  //   .append("circle")
  //   .attr("cx", d => projectionFunc([d.longitude, d.latitude])[0]) // Calculate x-coordinate
  //   .attr("cy", d => projectionFunc([d.longitude, d.latitude])[1]) // Calculate y-coordinate
  //   .attr("r", d => d.count) // Use the "count" column for the circle radius
  //   .attr("fill", "steelblue")
  //   .attr("opacity", 0.7);

  const circleRadius = d3.scaleLinear()
    .domain([0, 6000])
    .range([3, 20]); 


  // const centroidMap = new Map(
  //     geojson.features.map(country => [
  //       country.properties.name,
  //       projectionFunc.centroid(country)
  //     ]))  

  const circles = svg
    .selectAll("circle")
    .data(nationalities)
    .enter()
    .append("circle")
    .attr("r", d => circleRadius(d.Count))
    .attr("fill", "pink")
    .attr("stroke", "brown")
    // .attr("cx", d.longitude)
    // .attr("cy", d.latitude)
    // .attr("cx", d => centroidMap.get(d.Country)[0])
    // .attr("cy", d => centroidMap.get(d.Country)[1])
    .attr("cx", d => {const DotLatLong = geojson.features.find(country => country.properties.name === d.Country);
                      const centroid = pathGen.centroid(DotLatLong);
                      return centroid[0]})
    .attr("cy", d => { const DotLatLong = geojson.features.find(country => country.properties.name === d.Country);
                       const centroid = pathGen.centroid(DotLatLong);
                       return centroid[1]})

    console.log(centroid)

});


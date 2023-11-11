/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.8,
  margin = {top: 20, bottom: 60, left: 60, right: 60},
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
// let colorScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedParty: "All" // + YOUR INITIAL FILTER SELECTION
};

/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  console.log(state)

  // + SCALES

  xScale = d3.scaleLinear()
    .domain([0,1])
    // .domain(d3.extent(state.data, d=> d.ideologyScore2020)) // dynamic way
    .range([margin.left, width - margin.right])


  yScale = d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom , margin.top]) // weird one , go from top, to bottom (add margin)
  
colorScale = d3.scaledOrdina()
    .domain(["R","D"])
    .range(["red","blue"])


  // + AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  // + UI ELEMENT SETUP
  const selectElement = d3.select('#dropdown')

  selectElement
    .on("change", event => { 
      console.log(event);
      state.selectedParty = event.target.value;
      draw();
    
    })


  // + CREATE SVG ELEMENT
  svg = d3.select("#container")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
        

  // + CALL AXES

  // svg
  //   .append(g)
  //   .call(xAxis)
  //   .attr("transform", )


  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
const filteredData = state.data
    .filter(d => state.selectedParty === "All" || d.Party === state.selectedParty)


  svg.selectAll('circle.congress')
    .data(filteredData)
    // .join("circle")
    .join(
        enter => enter.append("circle")
          .attr("r",10)  
          .call(sel => sel
                .transition().attr("r",5))
          ,
        update => update,
        exit => exit.remove()
      )
    .attr("class", "congress")
    .attr("cx", d => xScale(d.ideologyScore2020))
    .attr("cy", d => yScale(d.envScore2020))
    // .attr("r", radius)
    .attr("fill", d => colorScale(d.Party))


}

// const filteredData = state.data
// // .filter(d => state.selectedParty === "All" || state.selectedParty === d.Party)

// const dot = svg
// .selectAll("circle")
// .data(filteredData, d => d.BioID)
// .join(
//   // + HANDLE ENTER SELECTION
//   enter => enter,

//   // + HANDLE UPDATE SELECTION
//   update => update,

//   // + HANDLE EXIT SELECTION
//   exit => exit
// );

/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .8;
const height = 500;

/* LOAD DATA */
d3.csv('../data/MoMA_topTenNationalities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    const container = d3.select("#container")
    console.log('container', container)

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    const xScale = d3.scaleBand()
        .domain([0,6000])
        .range([0,width])

      // console.log(data.map(d=> d.count))
      // console.log(d3.extent(data.map(d=> d.count)))  // whats the min and max 

    const yScale = d3.scaleLinear()
        .range([0,height])
        .domain(data.map(d => d.Nationality))
        .padding(.1)
        

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

    // svg
    const svg = d3.select("#container")
        .append("svg")
        .attr("height",height)
        .attr("width",width)
        .style("background-color", "aliceblue")
        .style("overflow","visible")

    // bars
    const bars = svg.selectAll("rect.bar")
        .data(data)
        .join("rect")
        .attr("class","bar")
        .attr("x",  x(0))
        .attr("y", function(d) { return y(d.Nationality);} )                       // y positioning 
        .attr("width", function(d) { return x(d.Value); })
        .attr("height", y.bandwidth() )                  // Space inside rec
        
      

    // const xAxisGroup = svg.append("g")
    // const yAxisGroup = svg.append("g")

    // yAxisGroup
    //     .call(d3.axisLeft(yScale)) // y scale

    // xAxisGroup
    //     .attr("transform",`translate(0, ${height})`)
    //     .call(d3.axisBottom(xScale)) // axis bottom


  })




        
        // .attr("x",(d,i,c) => {
        //   console.log(d,i,c)
        //   return i * 100
        // })
        


    // rows
    //   .append("td")
    //   .html(d => d.Nationality)

    // rows    
    //   .append("td")
    //    .html(d => d.Count)


    // .attr("id", (d) => {
        //   console.log(d)
        //   return d.Nationality
        // })

    // .attr("class", function(data) {
        //   return data.Count
        // })
    

    // const table = container
    //     .append("table")
    //     .attr("class","data")

    // console.log('table',table)



    // d3.select("#container")
    //   .append("table")
    //   .attr("Nationality","Count")





    // const svg = d3.select("#container")

    // container.append("div").html("this is a div")


        // const rows = table.selectAll("tr")
    //                   .data(data)
    //                   .join("tr")
    //                   .attr("id", getNationalityName)
    //                   .attr("class", getNationalityCount)
    //                   // .append("td")
    //                   // .html(d => d.Nationality)

    // rows.selectAll("td.cell")
    //     .data(d => {
    //       console.log(d)
    //       return [d.Nationality, d.Count]
    //     })
    //     .join("td") 
    //     .attr("class","cell")
    //     .html(d => d)
        
    
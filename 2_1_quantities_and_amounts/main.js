
/* CONSTANTS AND GLOBALS */
// const width = ;
// const height = ;

/* LOAD DATA */
d3.csv('../data/MoMA_topTenNationalities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)


    const container = d3.select("#container")
    console.log('container', container)
    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */
    
    const table = container
        .append("table")
        .attr("class","data")

    console.log('table',table)
 

    const getNationalityName = (d) => d.Nationality
    const getNationalityCount = (d) => d.Count


    const rows = table.selectAll("tr")
                      .data(data)
                      .join("tr")
                      .attr("id", getNationalityName)
                      .attr("class", getNationalityCount)
                      // .append("td")
                      // .html(d => d.Nationality)


    rows.selectAll("td.cell")
        .data(d => {
          console.log(d)
          return [d.Nationality, d.Count]
        })
        .join("td") 
        .attr("class","cell")
        .html(d => d)
        
    

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
    
    // d3.select("#container")
    //   .append("table")
    //   .attr("Nationality","Count")





    // const svg = d3.select("#container")

    // container.append("div").html("this is a div")

  })
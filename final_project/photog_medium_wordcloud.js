// photog_medium_wordcloud.js

// Load the CSV file
d3.csv('data.csv').then(function(data) {
    // Call the function to generate the word cloud
    generateWordCloud(data);
  });
  
  // Generate the word cloud using D3.js
  function generateWordCloud(data) {
    // Extract the relevant data from the CSV
    const wordsData = data.map(d => ({ word: d.Medium, frequency: +d.Count }));
  
    // Set up the dimensions of the word cloud container
    const width = 800;
    const height = 400;
  
    // Create an SVG container
    const svg = d3.select('#wordcloud')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
  
    // Use D3's pack layout to generate the word cloud
    const pack = d3.pack()
      .size([width, height])
      .padding(5);
  
    const root = d3.hierarchy({ children: wordsData })
      .sum(d => d.frequency);
  
    pack(root);
  
    // Create circles for each word
    const node = svg.selectAll('.node')
      .data(root.children)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
  
    node.append('circle')
      .attr('r', d => d.r)
      .style('fill', 'steelblue');
  
    // Add text labels to the circles
    node.append('text')
      .attr('dy', '.3em')
      .style('text-anchor', 'middle')
      .text(d => d.data.word);
  }
  
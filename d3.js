function scatterplot(){

    
    var svg = d3.select("body")
                .append("svg")
                .attr("width", 500)
                .attr("height", 500);
  
    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var width = svg.attr("width") - margin.left - margin.right;
    var height = svg.attr("height") - margin.top - margin.bottom;
    
    var g = svg.append("g")
               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    
    var data = [];
    for (var i = 0; i < 100; i++) {
      var x = Math.floor(Math.random() * 500);
      var y = Math.floor(Math.random() * 500);
      data.push([x, y]);
    }
  
    // Create scales for x and y axis
    var xScale = d3.scaleLinear()
                   .domain([0, d3.max(data, function(d) { return d[0]; })])
                   .range([0, width]);
    
    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(data, function(d) { return d[1]; })])
                   .range([height, 0]);
  
    svg.append('text')
       .attr('x', width/2)
       .attr('y', margin.top/2)
       .attr('text-anchor', 'middle')
       .style('font-family', 'Raleway')
       .style('font-size', 18)
       .text('Scatter Plot');
  
    g.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale));
          
    g.append("g")
     .call(d3.axisLeft(yScale));
  
    // Add circles for each data point
    g.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d) { return xScale(d[0]); })
     .attr("cy", function(d) { return yScale(d[1]); })
     .attr("r", 2)
     .style("fill", "black");
  }

  d3.csv("titanic.csv").then(function(data) {
    var ageDistribution = d3.rollup(data, v => v.length, d => d.Age);
    
    var width = 500;
    var height = 500;
    var radius = Math.min(width, height) / 2;
    
    var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);
    
    var pie = d3.pie()
      .value(function(d) { return d[1]; });
    
    var data = pie(ageDistribution);
    
    var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
    
    var color = d3.scaleOrdinal()
      .domain(ageDistribution.keys())
      .range(d3.schemeCategory10);
    
    var arcs = svg.selectAll("arc")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "arc");
    
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", function(d) { return color(d.data[0]); });
    
    arcs.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .text(function(d) { return d.data[0] + ": " + d.data[1]; });
  });
  
  
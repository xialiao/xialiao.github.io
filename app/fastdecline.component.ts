/// <reference path="../typings/d3/index.d.ts" />
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fastdecline',
  templateUrl: './fastdecline.component.html',
  styleUrls: [ './fastdecline.component.css' ]
})
export class FastDeclineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 730 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    /* 
     * value accessor - returns the value to encode for a given data object.
     * scale - maps value to a visual display encoding, such as a pixel position.
     * map function - maps from data value to display value
     * axis - sets up axis
     */ 

    // setup x 
    var xValue = function(d: any) { return d.NumChange;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d: any) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function(d: any) { return d.PercChange;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d: any) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

    // setup fill color
    var cValue = function(d: any) { return d.Manufacturer;},
    color = d3.scale.category10();

    // add the graph canvas to the body of the webpage
    var svg = d3.select("#fd-plot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    // load data
    d3.tsv("data/fastdecline.tsv", function(error: any, data: any) {

    // change string (from CSV) into number format
    data.forEach(function(d: any) {
      d.NumChange = +d.NumChange;
      d.PercChange = +d.PercChange;
    });

    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
    yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

    // x-axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Change in Job Number (thousands)");

    // y-axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Change in Percent");

    //legend
     var legend = svg.selectAll(".legend")
      .data([{label: 'declining', value: "#E05869"}])
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", 118)
      .attr("y", height-margin.bottom-40)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) {return d.value;});

    legend.append("text")
      .attr("x", 108)
      .attr("y", height-margin.bottom -31)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d.label; });
    
    //arrow
    svg.append("svg:defs").append("svg:marker")
    .attr("id", "fd-triangle")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "#1E384E");
    
    //line              
    svg.append("line")
    .attr("x1", 280)
    .attr("y1", 290)
    .attr("x2", 360)
    .attr("y2", 200)          
    .attr("stroke-width", 1)
    .style("stroke-dasharray", "1, 3")
    .attr("stroke", "#1E384E")
    .attr("marker-end", "url(#fd-triangle)");
  
    svg.append("text")
          .attr("x", 50)             
          .attr("y", 300)
          .attr("text-anchor", "start")  
          .style("fill", "#1E384E")
          .style("font-size", "12px") 
          .text("Production and farming, fishing, and forestry occupations are projected to shed large number of jobs"); 
    
    // draw dots
    svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", "#E05869") 
      .on("mouseover", function(d: any) {
          d3.select(this).style("cursor", "pointer");
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d.Occupation + "<br/> (" + xValue(d) 
	        + ", " + yValue(d) + ")")
               .style("left", ((<any>d3.event).pageX + 5) + "px")
               .style("top", ((<any>d3.event).pageY - 28) + "px");
      })
      .on("mouseout", function(d: any) {
          d3.select(this).style("cursor", "default");
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      })
      .on("click", function(d: any) {
        drawBarChart(d);  
        displayJobDetails(d);
      });
      
      function displayJobDetails(data: any) {
        d3.select("#fd-detail").selectAll("svg").remove();
        var svg = d3.select("#fd-detail").append("svg");
        var margin = {top: 30, right: 30, bottom: 30, left: 60},
        width = 400 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;
        
        var g = svg.attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + (-margin.left) + "," + margin.top + ")");
          
        g.append("text")
          .attr("x", margin.left)             
          .attr("y", height-3*margin.top)
          .attr("text-anchor", "start")  
          .style("fill", "#1E384E")
          .style("font-size", "16px") 
          .text("Median Salary in 2016: " + data.Salary); 
          
         g.append("text")
          .attr("x", margin.left)             
          .attr("y", margin.top)
          .attr("text-anchor", "start")  
          .style("fill", "#1E384E")
          .style("font-size", "16px") 
          .text("Education Required: " + data.Education); 
          
        g.append("text")
          .attr("x", margin.left+2)             
          .attr("y", height - margin.top)
          .attr("text-anchor", "start")  
          .style("fill", "#1E384E")
          .style("font-size", "16px") 
          .text("Work Experience: " + data.Experience); 
      }
      
      function drawBarChart(data: any) {
        d3.select("#fd-bchart").selectAll("svg").remove();
        var svg = d3.select("#fd-bchart").append("svg");
        
       
          
        var bardata = [{year: '2014', jobnum: data.Num2014, color: '#E3D06B'}, {year: '2024', jobnum: data.Num2024, color: '#3BCEAC'}];
       
        var margin = {top: 50, right: 30, bottom: 30, left: 60},
        width = 400 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;
    
        var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);
    
        var y = d3.scale.linear()
          .range([height, 0]);
    
        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");
    
        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");
        
        var g = svg.attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
       
        x.domain(bardata.map(function(d) { return d.year; }));
        y.domain([0, d3.max(bardata, function(d) { return +d.jobnum; })]);
        
        g.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
    
        g.append("g")
          .attr("class", "y axis")
          .call(yAxis);
        
        var bars = g.selectAll(".bar")
          .data(bardata)
          .enter();
        bars.append("rect")
          .attr("class", "bar")
          .style("fill", function(d) { return d.color;}) 
          .attr("x", function(d) { return x(d.year); })
          .attr("y", function(d) { return y(+d.jobnum); })
          .attr("height", function(d) { return height - y(+d.jobnum); })
          .attr("width", x.rangeBand())
        bars.append("text")
          .attr("x", function(d) { return x(d.year) + 20; })
          .attr("y", function(d) { return y(+d.jobnum) - 10; })
          .attr("dy", ".35em")
          .text(function(d) { return d.jobnum + " K" });
        
        var occp = data.Occupation;
        if (occp.length > 50)
          occp = occp.substring(0, 50) + "...";
          
        g.append("text")
          .attr("x", -58)             
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "start")  
          .style("fill", "#1E384E")
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text(occp); 
      }
    });
  }
}
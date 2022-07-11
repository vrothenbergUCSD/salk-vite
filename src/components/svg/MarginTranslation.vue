<template>
  <div class="text-center mx-auto">Margin Translation component</div>
  <div id="viz-area" class="relative text-center mt-10">
    <div class=""></div>

  </div>
</template>


<script>
import * as d3 from "d3";
import DataService from "../../services/DataService.js";

export default {
  name: "MarginTranslation",
  props: {
    //width: Number, 
    //height: Number, 
    msg: String,
  },
  data() {
    return {
      dataset: [],
    }
  },
  mounted() {
    console.log("MarginTranslation mounted");
    console.log("Retrieving sample data");
    this.retrieveData();
    console.log("Retrieved.")
    //this.margin_translation();
    this.data_binding();
    //this.my_foo();
  },
  methods: {
    retrieveData() {
      DataService.getAllSampleMetadata()
        .then(response => {
          this.dataset = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    margin_translation() {
      console.log("margin_translation from component")

      // set the dimensions and margins of the graph
      var margin = {top: 10, right: 40, bottom: 30, left: 30},
          width = 450 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var sVg = d3.select("#viz-area")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        // translate this svg element to leave some margin.
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      

      // X scale and Axis
      var x = d3.scaleLinear()
          .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
          .range([0, width]);       // This is the corresponding value I want in Pixel
      sVg
        .append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // X scale and Axis
      var y = d3.scaleLinear()
          .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
          .range([height, 0]);       // This is the corresponding value I want in Pixel
      sVg
        .append('g')
        .call(d3.axisLeft(y));

      console.log(sVg);

    },
    data_binding() {
      console.log("Data binding");
      // set the dimensions and margins of the graph
      var margin = {top: 10, right: 40, bottom: 30, left: 30},
          width = 450 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svG = d3.select("#viz-area")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // Create data
      var data = [ {x:10, y:20}, {x:40, y:90}, {x:80, y:50} ]

      // X scale and Axis
      var x = d3.scaleLinear()
          .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
          .range([0, width]);       // This is the corresponding value I want in Pixel
      svG
        .append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // X scale and Axis
      var y = d3.scaleLinear()
          .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
          .range([height, 0]);       // This is the corresponding value I want in Pixel
      svG
        .append('g')
        .call(d3.axisLeft(y));

      // Add 3 dots for 0, 50 and 100%
      svG
        .selectAll("whatever")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function(d){ return x(d.x) })
          .attr("cy", function(d){ return y(d.y) })
          .attr("r", 7)

    },
    my_foo() {
      console.log("my_foo")
      //d3.select()
    },
  }

}
</script>

<style>

</style>
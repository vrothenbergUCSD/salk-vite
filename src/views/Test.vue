<template>
  <div id="scatter-area" class="flex flex-row mt-10 justify-center items-center">
  </div>
</template>

<script>
import * as d3 from "d3"

export default {
  name: 'Test',
  components: {
    
  },
  data() {
    return {
      test_val: 0,
      width: 500,
      height: 200,
    }
  },
  mounted() {
    console.log('Test mounted');
    var svg = d3.select("#scatter-area")
        .append("svg:svg")
          .attr("width", this.width)
          .attr("height", this.height);

    //var svg = document.createElementNS(d3.ns.prefix.svg, 'svg');

    // Create a scale: transform value in pixel
    var x = d3.scaleLinear()
        .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([0, 400]);       // This is the corresponding value I want in Pixel
    console.log( x(25) ); 

    // Show the axis that corresponds to this scale
    svg.call(d3.axisBottom(x));

    // Add 3 dots for 0, 50 and 100%
    svg.append("circle")
      .attr("cx", x(10)).attr("cy", 100).attr("r", 40).style("fill", "blue");
    svg.append("circle")
      .attr("cx", x(50)).attr("cy", 100).attr("r", 40).style("fill", "red");
    svg.append("circle")
      .attr("cx", x(100)).attr("cy", 100).attr("r", 40).style("fill", "green");

  },
  methods: {
    foo() {
      return 0
    }
  },


}
</script>

<style>

</style>
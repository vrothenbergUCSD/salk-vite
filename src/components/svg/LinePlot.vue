<template>
<div class="mx-auto">
  <div class="text-center mb-5">Line Plot component</div>
  <div id="plot-area" class="mt-10">
  </div>
  <div id="table-area" class=""></div>

</div>
  

</template>


<script>
import * as d3 from "d3";
import DataService from "@/services/DataService.js";

export default {
  name: "BarPlot",
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
    console.log("BarPlot mounted");
    this.display_gene_expression_data_table();
  },
  methods: {
    filter_data(arr) {
      let first_gene = arr[0].gene_name
      let first_group = arr[0].group_name
      return arr.filter((a) => {
        return a.gene_name == first_gene
      }).filter((a) => {
        return a.group_name == first_group
      })
      
    },
    display_gene_expression_data_table() {
      let genes = ['0610009B22Rik','Agrn']
      genes = genes.toString()
      console.log(genes)

      console.log('gene_expression_data_by_genes')
      DataService.getExpressionDataByGenes(genes)
        .then(response => {
          this.dataset = response.data
          var data = this.filter_data(this.dataset)
          let columns = ['gene_name', 'group_name' ,'time_point', 'gene_expression']
          var myTable = this.tabulate(data, columns)

          myTable.selectAll("tbody tr") 
            // .sort(function(a, b) {
            //         return d3.descending(a.gene_expression, b.gene_expression);
            // });

          myTable.selectAll("thead th")
            .text(function(column) {
                    return column.charAt(0).toUpperCase()+column.substr(1);
            })
            .attr("style", "padding: 0 5px");

        // D3 SVG
        // set the dimensions and margins of the graph
        const margin = {top: 30, right: 30, bottom: 70, left: 60},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3.select("#plot-area")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "mx-auto")
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add X axis --> it is a date format
        var x = d3.scaleLinear()
          .domain(d3.extent(data, function(d) { return d.time_point; }))
          .range([ 0, width ]);

        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return +d.gene_expression; })])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.time_point) })
            .y(function(d) { return y(d.gene_expression) })
            )



        }) 
    },
    tabulate(data, columns) {
      console.log("Tabulating")
      var table = d3.select("#table-area").append("table")
              .attr("style", "margin-left: 0px")
              .style("border-collapse", "collapse")// <= Add this line in
              .style("border", "2px black solid") // <= Add this line in
              .attr("class", "mx-auto"),
          thead = table.append("thead"),
          tbody = table.append("tbody");

      // append the header row
      thead.append("tr")
          .selectAll("th")
          .data(columns)
          .enter()
          .append("th")
              .text(function(column) { return column; });

      // create a row for each object in the data
      var rows = tbody.selectAll("tr")
          .data(data)
          .enter()
          .append("tr");

      console.log('rows')
      console.log(rows)
      console.log(this.dataset)

      // create a cell in each row for each column
      var cells = rows.selectAll("td")
          .data(function(row) {
              return columns.map(function(column) {
                  return {column: column, value: row[column]};
              });
          })
          .enter()
          .append("td")
          .attr("style", "font-family: Courier") // sets the font style
              .html(function(d) { return d.value; });
      console.log('cells')
      console.log(cells)
      
      return table;
    },
  }

}
</script>

<style>

</style>
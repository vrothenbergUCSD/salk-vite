<template>
  <div class="p-5 font-semibold text-3xl text-center">Main</div>
  <div class="grid grid-cols-3 p-5 mx-auto w-11/12">
    <div class="w-1/3">
      <div class="font-semibold mb-2">Species</div>
      <Dropdown v-model="speciesSelected" :options="this.speciesFiltered" optionLabel="name" placeholder="Species" @change="speciesChange" :show-clear="true"  class="w-10 text-left"/>
    </div>
    <div class="w-1/3">
      <div class="font-semibold mb-2">Experiment</div>
      <Dropdown v-model="experimentSelected" :options="this.experimentsFiltered" optionLabel="name" placeholder="Experiment" @change="experimentChange" :show-clear="true" class="w-10 text-left"/>
    </div>
    <div class="w-1/3">
      <div class="font-semibold mb-2">Tissue</div>
      <Dropdown v-model="tissueSelected" :options="this.tissuesFiltered" optionLabel="name" placeholder="Tissue" @change="tissueChange" :show-clear="true" class="w-10 text-left"/>
    </div>
  </div>
  <div class="mx-auto w-full">
    <LinePlot/>
    <!--<MarginTranslation/>-->
  </div>
  

</template>

<script>
import Selection from "../components/Selection.vue"
import Prime from "../components/Prime.vue"
import Dropdown from "primevue/dropdown"
import LinePlot from "@/components/svg/LinePlot.vue"
import BarPlot from "@/components/svg/BarPlot.vue"
import MarginTranslation from "@/components/svg/MarginTranslation.vue"

export default {
  name: "Main",
  components: {
    Selection,
    Prime,
    Dropdown,
    LinePlot,
    BarPlot,
    MarginTranslation,
},
  data() {
    return {
      species: ["Mouse", "Human", "Baboon"],
      speciesFiltered: null,
      experiments: ["Mouse_TRF_2018", "Mouse_TRF_2019", "Baboon_TRF_2020", "Human_ABC_2020"],
      experimentsFiltered: null,
      tissues:["Liver", "Muscle", "Adipose", "Heart", "Neuron", "Something", "Another", "Some more", "Over"],
      tissuesFiltered: null, 

      speciesSelected: null,
      experimentSelected: null,
      tissueSelected: null,
    }
  },
  created() {
    this.species = this.buildList(this.species)
    this.speciesFiltered = this.species
    this.experiments = this.buildList(this.experiments)
    this.experimentsFiltered = this.experiments
    this.tissues = this.buildList(this.tissues)
    this.tissuesFiltered = this.tissues
  },
  mounted() {
    console.log(this.tissues)

  },
  methods: {
    buildList(list) {
      return list.map(object => {
        return {'name' : object}
    })},
    filterList(list, s) {
      console.log('filterList')
      list.forEach(object => {
        object.visible = (object.name.toLowerCase().includes(s.toLowerCase()));
      })
    },
    speciesChange(e) {
      console.log('speciesChange')
      if(!e.value) {
        this.experimentsFiltered = this.experiments
        return
      }
      //console.log(e.value.name)
      this.experimentsFiltered = this.experiments.filter(obj => obj.name.toLowerCase().includes(e.value.name.toLowerCase()))
      //console.log(this.experimentsFiltered)
    },
    experimentChange(e) {
      //console.log('experimentChange')
      //console.log(e.value.name)
      if(!e.value) {
        this.tissuesFiltered = this.tissues
        return
      }
      const searchString = e.value.name === "Human" ? "Heart" : "Liver";
      this.tissuesFiltered = this.tissues.filter(obj => obj.name.toLowerCase().includes(searchString.toLowerCase()))
      
    },
    tissueChange(e) {
      //console.log('tissueChange')
      //console.log(e.value.name)
      if(!e.value) {
        return
      }
      if (this.speciesSelected && this.experimentSelected && this.tissueSelected) {
        console.log("All selected")

      }
    },
    foo() {
      console.log("foo")
    }
  },


}
</script>

<style>

</style>
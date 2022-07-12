<template>
  <div class="p-5 font-semibold text-xl">Main</div>
  <div class="grid grid-cols-3 p-5 mx-auto w-11/12">
    <div class="w-1/3">
      <div class="font-semibold mb-2">Species</div>
      <Selection placeholder="Species" :rows="this.species" @change="this.speciesChange"/>
    </div>
    <div class="w-1/3">
      <div class="font-semibold mb-2">Experiment</div>
      <Selection placeholder="Experiment" :rows="this.experiments" @change="experimentChange"/>
    </div>
    <div class="w-1/3">
      <div class="font-semibold mb-2">Tissue</div>
      <Selection placeholder="Tissue" :rows="this.tissues" @change="tissueChange"/>
    </div>

  </div>

</template>

<script>
import Selection from "../components/Selection.vue"
import Prime from "../components/Prime.vue"

export default {
  name: "Main",
  components: {
    Selection,
    Prime
},
  data() {
    return {
      species: ["Mouse", "Human", "Baboon"],
      experiments: ["Mouse_TRF_2018", "Mouse_TRF_2019", "Baboon_TRF_2020", "Human_ABC_2020"],
      tissues:["Liver", "Muscle", "Adipose", "Heart", "Neuron", "Something", "Another", "Some more", "Over"],
    }
  },
  created() {
    this.species = this.buildList(this.species)
    this.experiments = this.buildList(this.experiments)
    this.tissues = this.buildList(this.tissues)
  },
  mounted() {
    console.log(this.tissues)

  },
  methods: {
    buildList(list) {
      return list.map(object => {
        return {'name' : object, 'visible' : true}
    })},
    filterList(list, s) {
      return list.forEach(object => {
        object.visible = (object.name.includes(s));
      })
    },
    speciesChange(e) {
      console.log('speciesChange')
      console.log(e.value.name)
      this.experiments = this.filterList(this.experiments, e.value.name)
      console.log(this.experiments)
    },
    experimentChange(e) {
      console.log('experimentChange')
      console.log(e.value.name)
    },
    tissueChange(e) {
      console.log('tissueChange')
      console.log(e.value.name)
    },
    foo() {
      console.log("foo")
    }
  },


}
</script>

<style>

</style>
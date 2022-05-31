<template>
  <pie  
        :chartData = 'chartData'
        :chartOptions = 'chartOptions'
        :chartId = 'chartId'
        :width = 'width'
        :height = 'height'
        :cssClasses = 'cssClasses'
        :styles = 'styles'
        :plugins = 'plugins'
        />
</template>

<script>
import { defineComponent } from 'vue'

import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Array
    }
  },
  data(){
    return({
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false
    }
    })
  },
})

</script>

<style>

</style>

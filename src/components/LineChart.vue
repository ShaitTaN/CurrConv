<template>
  <Line
    :chartData="chartData"
    :chartOptions="chartOptions"
    :chartId="chartId"
    :width="width"
    :height="height"
    :cssClasses="cssClasses"
    :styles="styles"
    :plugins="plugins"
  />
</template>

<script>
import { defineComponent } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export default defineComponent({
  name: "LineChart",
  components: {
    Line,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
		chartData: {
			type: Object
		}
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
});
</script>

<style>
</style>
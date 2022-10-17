<template>
  <Line :chart-data="some" />
</template>

<script>
import { Line } from 'vue-chartjs';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'LineChart',
  components: { Line },
  data() {
    return {
      some: {
        datasets: [{ data: [10, 20] }],
        labels: ['a', 'b']
      }
    };
  }
};
</script>

<style></style>

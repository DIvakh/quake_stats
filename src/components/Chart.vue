<template>
  <div class="charts">
    <Line :chart-data="chartData" :chart-options="options" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    logs: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      gamedata: {},
      datasets: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'teal',
            tension: 0.1
          },
          {
            label: 'My Second Dataset',
            data: [90, 9, 34, 15, 46, 51, 99],
            fill: false,
            borderColor: 'red',
            backgroundColor: 'red',
            tension: 0.1
          }
        ]
      },
      options: {
        scales: {
          xAxes: {
            grid: {
              borderColor: '#fff',
              tickColor: '#fff',
              color: 'rgba(255, 255, 255, 0.07)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.65)'
            }
          },

          yAxes: {
            grid: {
              borderColor: '#fff',
              tickColor: '#fff',
              color: 'rgba(255, 255, 255, 0.07)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.65)'
            }
          }
        }
      }
    };
  },
  methods: {
    parseLogData(id) {
      this.chartData.labels = [];
      this.datasets = [];
      let currentLog = this.logs.find((el) => el.id === id);

      const kills = currentLog.kills;

      for (let i = 0; i < kills.length; i++) {
        this.chartData.labels.push(i);
        let currentKiller = this.datasets.find(
          (el) => el.label === kills[i].killer
        );

        if (!currentKiller) {
          this.datasets.push({
            label: kills[i].killer,
            data: [0]
          });
        }
      }
      for (let i = 0; i < kills.length; i++) {
        for (let item of this.datasets) {
          if (item.label === kills[i].killer) {
            item.data.push(item.data[item.data.length - 1] + 1);
          } else {
            item.data.push(item.data[item.data.length - 1]);
          }

          if (item.label === 'twist') {
            item.borderColor = 'red';
            item.backgroundColor = 'red';
          } else if (item.label === 'Ignat') {
            item.borderColor = 'blue';
            item.backgroundColor = 'blue';
          } else {
            item.borderColor = 'teal';
            item.backgroundColor = 'teal';
          }
        }
      }

      this.chartData.datasets = this.datasets;
    }
  },
  watch: {
    id: {
      required: true,
      handler() {
        this.parseLogData(this.id);
      }
    }
  }
};
</script>

<style></style>

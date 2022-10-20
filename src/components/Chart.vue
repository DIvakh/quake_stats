<template>
  <div class="empty" ref="chart"></div>
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
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [
          {
            label: 'My First Dataset',
            data: [0, 20, 20, 20, 70, 70, 70, 20, 20, 20, 0],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'teal',
            tension: 0.15
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
    sortAndAddColor() {
      this.datasets.sort((a, b) => {
        return a.data[a.data.length - 1] > b.data[b.data.length - 1] ? -1 : 1;
      });
      const colors = [
        '#6897bb',
        '#ff4040',
        '#ffff66',
        '#ac7b06',
        '#7b5804',
        '#4a3502',
        '#312302'
      ];
      this.datasets.forEach((el, i) => {
        if (colors[i]) {
          el.borderColor = colors[i];
          el.backgroundColor = colors[i];
        } else {
          el.borderColor = '#312302';
          el.backgroundColor = '#312302';
        }
      });
    },

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
            data: [0],
            tension: 0.1,
            pointRadius: 1
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
        }
      }
      this.chartData.labels.push(this.chartData.labels.length);

      this.chartData.datasets = this.datasets;
      this.sortAndAddColor();
    }
  },
  watch: {
    id: {
      required: true,
      handler() {
        this.parseLogData(this.id);
      }
    }
  },
  mounted() {
    this.parseLogData(this.id);
    this.$refs.chart.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style>
.empty {
  padding-bottom: 100px;
}
.charts {
  margin-top: -50px;
}
</style>

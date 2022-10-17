<template>
  <section class="logs">
    <h2>LOGS</h2>
    <div class="container">
      <table v-for="game of tableLogs" :data-id="game.id">
        <thead>
          <tr>
            Date:
            {{
              game.date.replace(/[A-Z]|\.\d+/gm, ' ')
            }}
          </tr>
        </thead>
        <tr>
          <td class="empty"></td>
          <td v-for="(kills, player) in game.kills">
            {{ player }}
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>
<script>
import Chart from './Chart.vue';
export default {
  data() {
    return {
      logs: [],
      tableLogs: [],
      counterPage: 1
    };
  },
  methods: {
    async getLogsData() {
      let response = await fetch('/api/ffa/logs?page=1&perpage=20');
      let data = await response.json();
      this.logs = data;
      this.parseLogData();
    },
    parseLogData() {
      for (let game of this.logs) {
        let sorted = this.groupBy(game.kills, 'killer');
        let gameObj = {};
        for (let killer in sorted) {
          sorted[killer] = this.isUniq(sorted[killer]);
        }
        gameObj.kills = sorted;
        gameObj.id = game.id;
        gameObj.date = game.date;

        this.tableLogs.push(gameObj);
      }
    },
    groupBy(arr, item) {
      return arr.reduce(function (acc, val) {
        (acc[val[item]] = acc[val[item]] || []).push(val.victim);
        return acc;
      }, {});
    },
    isUniq(array) {
      return array
        .map((name) => {
          return { count: 1, name: name };
        })
        .reduce((a, b) => {
          a[b.name] = (a[b.name] || 0) + b.count;
          return a;
        }, {});
    }
  },
  beforeMount() {
    this.getLogsData();
  },
  mounted() {},
  components: { Chart }
};
</script>
<style lang="scss"></style>

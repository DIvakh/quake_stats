<template>
  <section class="logs">
    <h2>LOGS</h2>
    <div class="container">
      <table v-for="game of tableLogs" :data-id="game.id">
        <thead>
          <tr>
            <td>
              Date: &nbsp;
              {{ game.date.replace(/[A-Z]|\.\d+/gm, ' ') }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <!-- <td class="empty"></td> -->
            <td v-for="(kills, player) in game.kills">
              {{ player }}
            </td>
          </tr>
          <tr v-for="(kills, player, i) in game.kills">
            <td>{{ player }}</td>
            <td v-for="kill in kills">
              {{ kill }}
            </td>
          </tr>
        </tbody>
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
        let players = new Set();
        for (let killer in sorted) {
          sorted[killer] = this.isUniq(sorted[killer]);
          players.add(killer);
          for (let key in sorted[killer]) {
            players.add(key);
          }
        }

        players.forEach((player) => {
          if (!(player in sorted)) {
            let values = {};
            players.forEach((e) => {
              if (e !== player) {
                values[e] = 0;
              }
            });
            sorted[player] = values;
            players = Array.from(players);
          }
        });

        for (let key in sorted) {
          players.forEach((e) => {
            if (!(e in sorted[key]) && e !== key) {
              sorted[key][e] = 0;
            }
          });
        }

        gameObj.kills = sorted;
        gameObj.id = game.id;
        gameObj.date = game.date;

        for (let key in gameObj.kills) {
          gameObj.kills[key] = this.sort(gameObj.kills[key]);
          gameObj.kills = this.sort(gameObj.kills);
        }

        this.tableLogs.push(gameObj);
      }
    },
    groupBy(arr, item) {
      return arr
        .sort((a, b) => {
          return a.killer > b.killer ? 1 : -1;
        })
        .reduce(function (acc, val) {
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
    },
    renderTable() {
      let tables = document.querySelectorAll('table');

      tables.forEach((e) => {
        e.querySelectorAll('tr').forEach((el, i) => {
          let emptyCell = document.createElement('td');
          emptyCell.textContent = ' ';
          emptyCell.classList.add('empty');
          el.querySelectorAll('td').forEach((elem, ind, arr) => {
            if (i === ++ind) {
              elem.before(emptyCell);
            }
          });
        });
      });
    },
    sort(obj) {
      return Object.fromEntries(
        Object.entries(obj).sort(([a], [b]) => {
          console.log(a);
          return a < b ? -1 : 1;
        })
      );
    }
  },
  beforeMount() {
    this.getLogsData();
    console.log(this.tableLogs);
  },

  updated() {
    this.renderTable();
  },
  components: { Chart }
};
</script>
<style lang="scss">
.container {
  table {
    margin: 50px auto;
    font-size: 1.15rem;
    tbody {
      td {
        padding: 10px;
        border: 1px solid white;
        min-width: 100px;
      }

      tr {
        border: 1px solid white;
      }
    }
    thead {
      tr td {
        padding: 10px 0;
      }
    }
  }
}
</style>

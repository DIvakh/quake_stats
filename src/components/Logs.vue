<template>
  <section class="logs">
    <h2>LOGS</h2>
    <div class="container">
      <div class="tables">
        <table
          @click="clickHandler"
          v-for="game of tableLogs"
          :data-id="game.id"
        >
          <thead>
            <tr>
              <th>
                date: &nbsp;
                {{ game.date.replace(/[A-Z]|\.\d+/gm, ' ') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="row">
              <td class="center" v-for="(kills, player) in game.kills">
                {{ player }}
              </td>
            </tr>
            <tr class="row" v-for="(kills, player, i) in game.kills">
              <td>{{ player }}</td>
              <td class="center" v-for="kill in kills">
                {{ kill }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Chart :logs="logs" :id="id" />
    </div>
  </section>
</template>
<script>
import Chart from './Chart.vue';
export default {
  data() {
    return {
      tableLogs: [],
      counterPage: 1,
      id: ''
    };
  },
  props: {
    logs: {
      type: Array,
      required: true
    }
  },
  components: { Chart },
  methods: {
    clickHandler(e) {
      this.id = e.currentTarget.dataset.id;
    },
    parseLogData() {
      this.id = this.logs[0].id;
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
      let newArr = arr.slice(0);
      return newArr
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
        let counter = 0;
        e.querySelectorAll('tr.row').forEach((el, i, array) => {
          let emptyCell = document.createElement('td');
          emptyCell.textContent = ' ';
          emptyCell.classList.add('empty');

          el.querySelectorAll('td').forEach((elem, ind, arr) => {
            if (ind === counter) {
              elem.before(emptyCell);
            } else if (counter === arr.length && i === array.length - 1) {
              elem.after(emptyCell);
            }
          });
          counter++;
        });
      });
    },
    sort(obj) {
      return Object.fromEntries(
        Object.entries(obj).sort(([a], [b]) => {
          return a < b ? -1 : 1;
        })
      );
    }
  },
  watch: {
    logs: {
      required: true,
      async handler() {
        await this.parseLogData();
        await this.renderTable();
      }
    }
  },

  updated() {}
};
</script>
<style lang="scss">
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .tables,
  .charts {
    width: 50%;
  }
  table {
    cursor: pointer;
    margin: 50px auto;
    font-size: 1.15rem;
    tbody {
      td {
        padding: 10px;
        border: 1px solid white;
        min-width: 100px;
        &.empty {
          background: repeating-linear-gradient(
            -60deg,
            #555 0,
            #555 1px,
            transparent 1px,
            transparent 5px
          );
        }
        &.center {
          text-align: center;
        }
      }

      tr {
        border: 1px solid white;
      }
    }
    thead {
      tr th {
        padding: 10px 0;
      }
    }
  }
}
</style>

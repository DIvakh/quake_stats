<template>
  <section class="logs">
    <h2>FRAGS</h2>
    <div class="container">
      <div class="tables">
        <div class="table" v-for="game of tableLogs">
          <Chart v-if="id === game.id" :logs="logs" :id="game.id" />
          <table @click="clickHandler" :data-id="game.id">
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
          <div :class="id === game.id ? 'border' : ''"></div>
        </div>
      </div>
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
      if (this.id !== e.currentTarget.dataset.id) {
        this.id = e.currentTarget.dataset.id;
      } else this.id = '';
    },
    parseLogData() {
      // this.logs.push({
      //   id: '634d1546e5ccba7173ce97e7',
      //   date: '2022-10-20T08:41:42.85Z',
      //   kills: [
      //     {
      //       killer: 'twist',
      //       victim: 'JavaScripter'
      //     },
      //     {
      //       killer: 'IP',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'JavaScripter',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'JavaScripter',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'IP'
      //     },
      //     { killer: 'tequila', victim: 'Luxion' },
      //     {
      //       killer: 'twist',
      //       victim: 'JavaScripter'
      //     },
      //     {
      //       killer: 'Ignat',
      //       victim: 'twist'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'JavaScripter'
      //     },
      //     {
      //       killer: 'IP',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'JavaScripter',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'JavaScripter',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'JavaScripter'
      //     },
      //     {
      //       killer: 'Ignat',
      //       victim: 'twist'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'JavaScripter'
      //     },
      //     {
      //       killer: 'IP',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'JavaScripter',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'JavaScripter',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'JavaScripter'
      //     },
      //     {
      //       killer: 'Ignat',
      //       victim: 'twist'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'JavaScripter'
      //     },
      //     {
      //       killer: 'IP',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'JavaScripter',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'JavaScripter',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'JavaScripter'
      //     },
      //     { killer: 'IP', victim: 'Luxion' },
      //     { killer: 'tequila', victim: 'Luxion' },
      //     {
      //       killer: 'Ignat',
      //       victim: 'twist'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'JavaScripter'
      //     },
      //     { killer: 'tequila', victim: 'Luxion' },
      //     {
      //       killer: 'IP',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'JavaScripter',
      //       victim: 'IP'
      //     },
      //     { killer: 'Luxion', victim: 'Ignat' },
      //     {
      //       killer: 'JavaScripter',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'JavaScripter'
      //     },
      //     { killer: 'RILOSHKVAR', victim: 'IP' },
      //     { killer: 'Luxion', victim: 'IP' },
      //     {
      //       killer: 'Ignat',
      //       victim: 'twist'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'JavaScripter'
      //     },
      //     {
      //       killer: 'IP',
      //       victim: 'Ignat'
      //     },
      //     { killer: 'RILOSHKVAR', victim: 'Ignat' },
      //     {
      //       killer: 'twist',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'JavaScripter',
      //       victim: 'IP'
      //     },
      //     {
      //       killer: 'JavaScripter',
      //       victim: 'Ignat'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'Ignat'
      //     },
      //     { killer: 'RILOSHKVAR', victim: 'JavaScripter' },
      //     {
      //       killer: 'twist',
      //       victim: 'IP'
      //     },
      //     { killer: 'tequila', victim: 'Luxion' },
      //     { killer: 'RILOSHKVAR', victim: 'IP' },
      //     { killer: 'RILOSHKVAR', victim: 'Ignat' },

      //     {
      //       killer: 'Ignat',
      //       victim: 'twist'
      //     },
      //     {
      //       killer: 'twist',
      //       victim: 'JavaScripter'
      //     }
      //   ]
      // });
      if (this.logs) {
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
        if (this.logs) {
          await this.parseLogData();
          await this.renderTable();
        }
      }
    }
  }
};
</script>
<style lang="scss">
@mixin border($pb) {
  padding-bottom: $pb;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    to right,
    rgba(196, 196, 196, 0) 4.2%,
    #7d7d7d 52.33%,
    rgba(196, 196, 196, 0) 100.46%
  );

  border-image-slice: 1;
}
section.logs {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tables {
      width: 100%;
      align-self: center;
    }
    .charts {
      width: 50%;
      margin-left: auto;
      margin-right: auto;
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
}
.border {
  @include border(10px);
}
</style>

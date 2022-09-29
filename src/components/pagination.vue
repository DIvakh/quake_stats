<template>
  <section @click="test" class="daydata">
    <h2>Games</h2>
    <div class="container">
      <div class="game" v-for="game in dayData">
        <div class="game-header">
          <h3>{{ game.map }}</h3>
          <div>
            <p><span>type: </span>{{ game.type }}</p>
            <p><span>duration: </span>{{ game.duration }}</p>
            <p><span>date: </span>{{ game.datetime }}</p>
          </div>
        </div>
        <div class="game-players">
          <div class="player" v-for="(player, i) in game.players">
            <div class="player-header">
              {{ player.name }}
            </div>
            <div class="player-data">
              <p><span>score: </span>{{ player.score }}</p>
              <p><span>armor total: </span>{{ player.armor_total }}</p>
              <p><span>health total: </span>{{ player.health_total }}</p>
              <p><span>damage given: </span>{{ player.damage_given }}</p>
              <p><span>damage taken: </span>{{ player.damage_taken }}</p>
              <p><span>deaths: </span>{{ player.deaths }}</p>
              <p><span>kills: </span>{{ player.kills }}</p>
              <p><span>suicides: </span>{{ player.suicides }}</p>
            </div>
            <div class="icons">
              <!-- ==== Powerups ==== -->
              <div class="powerups">
                <div class="wrapper">
                  <div class="powerup" v-for="powerup in player.powerups">
                    <div class="powerup-container">
                      <img
                        :src="`./images/items/${powerup.name.toLowerCase()}.png`"
                        :alt="powerup.name"
                      />
                      <div class="text">
                        <p><span>Pickups:</span> {{ powerup.pickups }}</p>
                        <p>
                          <span>Time (min.):</span>
                          {{ Math.floor(powerup.time / 60000) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ==== Items ==== -->
              <div class="items">
                <div>
                  <div class="wrapper">
                    <div class="item" v-for="item in player.items">
                      <div class="item-container">
                        <img
                          :src="`./images/items/${item.name.toLowerCase()}.png`"
                          :alt="item.name"
                        />

                        <p><span>Pickups:</span> {{ item.pickups }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ====Weapons==== -->

              <div class="weapons">
                <div class="wrapper">
                  <div class="weapon" v-for="weapon in player.weapons">
                    <div class="weapon-container">
                      <img
                        :src="`./images/items/${weapon.name.toLowerCase()}1.png`"
                        :alt="weapon.name"
                      />
                      <div class="text">
                        <p><span>Hits:</span> {{ weapon.hits }}</p>
                        <p><span>Shots:</span> {{ weapon.shots }}</p>
                        <p><span>Kills:</span> {{ weapon.kills }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: { dayData: { type: Object } },
  methods: {
    test() {
      console.log(this.dayData);
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

section.daydata {
  span {
    filter: contrast(0.3);
  }
  .container {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    gap: 35px;
    .game {
      width: calc(50% - 60px);
      backdrop-filter: brightness(1) contrast(0.95);
      border-radius: 5px;

      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.192);
      transition: all 0.2s ease;
      padding: 15px;
      &:hover {
        backdrop-filter: brightness(1.2) contrast(0.94);
      }

      .game-header {
        text-align: center;
      }

      h3 + div {
        margin-top: 15px;
        @include border(15px);
      }
    }

    .game-players {
      display: flex;

      .player {
        margin-top: 15px;
        width: calc(100% / 3);
        .player-data,
        .player-header {
          text-align: center;
          margin-bottom: 10px;
        }
        .player-header {
          font-size: 1.2rem;
          font-weight: 600;
        }
        .powerups,
        .items,
        .weapons {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        img {
          width: 30px;
          align-self: center;
        }

        // .player-header,
        // .player-data {
        //   text-align: center;
        // }

        .powerups {
          .powerup {
            div.powerup-container {
              display: flex;
            }
          }
        }
        .items {
          .item {
            div.item-container {
              display: flex;
            }
          }
        }
        .weapons {
          .weapon {
            div.weapon-container {
              display: flex;
            }
          }
        }
      }
    }
  }
}
</style>

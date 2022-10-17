<template>
  <section @click="test" class="daydata">
    <h2>Games</h2>
    <div class="container">
      <div class="game" v-for="game in dayData">
        <h3>{{ game.map }}</h3>
        <div class="game-description">
          <p><span>type: </span>{{ game.type }}</p>
          <p>
            <span>duration: </span>{{ Math.floor(game.duration / 60) }} min.
          </p>
          <p><span>date: </span>{{ game.datetime }}</p>
        </div>
        <div class="game-container">
          <div v-for="player in game.players" class="player">
            <h5>{{ player.name }}</h5>
            <div class="player-description">
              <p><span>score: </span>{{ player.score }}</p>
              <p><span>kills: </span>{{ player.kills }}</p>
              <p><span>deaths: </span>{{ player.deaths }}</p>
              <p><span>suicides: </span>{{ player.suicides }}</p>
              <p><span>damage given: </span>{{ player.damage_given }}</p>
              <p><span>damage taken: </span>{{ player.damage_taken }}</p>
              <p><span>health total: </span>{{ player.health_total }}</p>
              <p><span>armor total: </span>{{ player.armor_total }}</p>
            </div>
            <div class="player-weapons">
              <div class="weapon-container" v-for="weapon in player.weapons">
                <img
                  :src="`/images/items/${weapon.name.toLowerCase()}1.png`"
                  :alt="`${weapon.name}.png`"
                />
                <p>{{ weapon.kills }}&nbsp;/&nbsp;</p>
                <p>{{ weapon.hits }}&nbsp;/&nbsp;</p>
                <p>{{ weapon.shots }}</p>
              </div>
            </div>

            <div class="player-items">
              <div class="item-container" v-for="item in player.items">
                <img
                  :src="`/images/items/${item.name.toLowerCase()}.png`"
                  :alt="`${item.name}.png`"
                />
                <p>{{ item.pickups }}</p>
              </div>
            </div>

            <div class="player-powerups">
              <div class="powerup-container" v-for="powerup in player.powerups">
                <img
                  :src="`/images/items/${powerup.name.toLowerCase()}.png`"
                  :alt="`${powerup.name}.png`"
                />
                <p>
                  {{ Math.floor(powerup.time / 1000) }}s ({{ powerup.pickups }})
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Spinner />
</template>
<script>
import Spinner from './Spinner.vue';
export default {
  data() {
    return {
      dayData: [],
      counterPage: 1
    };
  },

  methods: {
    scrollingData() {
      let windowRelativeBottom =
        document.documentElement.getBoundingClientRect().bottom;
      let step = 100;
      if (window.screen.width < 900) {
        step = 250;
      }

      if (windowRelativeBottom < document.documentElement.clientHeight + step) {
        this.counterPage++;
        this.getGameData(this.counterPage);
      }
    },
    async getGameData(page) {
      try {
        let response = await fetch(`/api/ffa/matches?page=${page}&perpage=6`);
        let data = await response.json();
        console.log(data);
        for (let item of data) {
          this.dayData.push(item);
        }
        document.querySelector('.spinner').classList.add('hidden');
      } catch (e) {
        console.error(e);
      }
    },

    debounce(fn, timer) {
      let timeout;

      return function (...args) {
        document.querySelector('.spinner').classList.remove('hidden');
        clearTimeout(timeout);
        return new Promise((resolve) => {
          timeout = setTimeout(() => resolve(fn(...args)), timer);
        });
      };
    }
  },
  beforeMount() {
    this.getGameData(1);
  },
  mounted() {
    window.onscroll = this.debounce(this.scrollingData, 300);
  },
  components: { Spinner }
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
    gap: 25px;
    .game {
      width: 100%;

      border-radius: 5px;

      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.192);

      h3 {
        padding: 15px;
        border-radius: 5px 5px 0 0;
      }
      h5 {
        font-size: 1.3rem;
        font-weight: 600;
        line-height: 1.5rem;
      }
      .game-description {
        font-size: 1.1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        padding-left: 15px;
      }
      .game-description {
        padding-bottom: 15px;
      }
      h3,
      .game-description {
        margin-top: 0;
        border: 0;
        // background-color: rgb(70, 78, 91);
        // background-color: rgb(26, 29, 34);
        background-color: rgb(32, 36, 42);
      }

      .player {
        padding: 15px 15px;
        padding-top: 0;
        &:first-of-type {
          padding-top: 10px;
        }
        backdrop-filter: brightness(1) contrast(0.95);
        // @include border(25px);
        transition: all 0.2s ease;

        &:last-of-type {
          border: none;
          padding-bottom: 0;
        }

        // &:hover {
        //   backdrop-filter: brightness(1.2) contrast(0.94);
        // }
        .player-description {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 30px;
          padding: 15px 0 0 0;
        }
        .player-weapons,
        .player-items,
        .player-powerups {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 30px;
          padding: 30px 0 0 0;
        }
        .player-powerups {
          padding-bottom: 15px;
          img {
            width: 1.3rem !important;
          }
        }

        .weapon-container,
        .item-container,
        .powerup-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          font-size: 1.2rem;

          img {
            margin-right: 5px;
            width: 1.21rem;
          }
        }
      }
    }
  }
}
</style>

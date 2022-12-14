<template>
  <header>
    <div class="container">
      <section class="total">
        <div>
          <span class="title-mini">total games:</span>
          {{ gameData.total_games }}
        </div>
        <div>
          <span class="title-mini">duration:</span> {{ gameData.duration }}
        </div>
      </section>
      <section class="winners">
        <span class="title-mini">wins:&nbsp;</span>
        <div v-for="winner of gameData.winners" class="winner">
          {{ winner.name }}: {{ winner.wins }}
        </div>
      </section>
      <section class="button">
        <button @click="changeView">
          {{ state === 'frags' ? 'INFORMATION' : 'FRAGS' }}
        </button>
      </section>
    </div>
  </header>
  <main>
    <Logs
      @click="controlsHandler"
      v-if="state === 'frags'"
      :state="state"
      :logs="logs"
      :logsPage="logsPage"
    />

    <Index
      v-if="state === 'information'"
      :gameData="gameData"
      :playersData="playersData"
    />
    <Pagination v-if="state === 'information'" />
  </main>
</template>

<script>
import Index from './components/Index';
import Pagination from './components/Pagination';
import Logs from './components/Logs';

export default {
  name: 'App',

  data() {
    return {
      ffaLink: '/api/ffa',
      playersLink: '/api/ffa/players',
      pageCounter: 1,

      state: 'information',

      gameData: {},
      playersData: {},
      logs: [],
      logsPage: 1
    };
  },
  methods: {
    async sendRequest(url) {
      try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
      } catch (e) {
        console.error(e);
      }
    },
    async getLogsData(page) {
      try {
        let response = await fetch(`/api/ffa/logs?page=${page}&perpage=3`);
        let data = await response.json();
        this.logs = data;
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    },
    controlsHandler(e) {
      if (e.target.classList.contains('back') && this.logsPage > 1) {
        --this.logsPage;
        this.getLogsData(this.logsPage);
      } else if (e.target.classList.contains('next')) {
        ++this.logsPage;
        this.getLogsData(this.logsPage);
      }
    },

    async getFfa() {
      this.gameData = await this.sendRequest(this.ffaLink);
    },

    async getPlayers() {
      this.playersData = await this.sendRequest(this.playersLink);
    },
    changeView(e) {
      this.state = e.target.textContent.toLowerCase();
    }
  },
  beforeMount() {
    this.getFfa();
    this.getPlayers();
    this.getLogsData(this.logsPage);
  },

  components: { Pagination, Logs, Index }
};
</script>

<style lang="scss">
@import 'assets/scss/container';
@import 'assets/scss/_normalize';
@import 'assets/scss/_reset';

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
body {
  background-color: #1b1f25;
  color: #d5dfe9;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

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

main {
  background-color: #1b1f25;
  margin-top: 2.2rem;

  .container {
    border-radius: 5px;
  }
}
.total {
  display: flex;
  gap: 20px;

  @media (min-width: 600px) and (max-width: 899px) {
    flex-grow: 1;
    gap: 10px;
  }
}
header {
  background-color: #16191ed5;
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px);
  .container {
    position: relative;
    width: calc(100% - 20px);
    display: flex;
    justify-content: center;
    gap: 50px;
    align-items: center;
    padding: 13px 0;

    section.button {
      position: absolute;
      right: 0;

      @media (max-width: 599px) {
        order: 0;
        position: static;
      }

      button {
        background: transparent;

        color: #d5dfe9;
        border: none;
        padding: 7px 15px;
        line-height: 1;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: underline;
        @media (min-width: 1199px) {
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
        @media (max-width: 599px) {
          padding: 10px 45px;
        }
      }
    }

    * {
      align-self: center;
    }
    @media (max-width: 599px) {
      flex-direction: column;
      gap: 10px;
    }
    @media (min-width: 600px) and (max-width: 899px) {
      gap: 0px;
    }
  }
}
.winners {
  display: flex;

  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 599px) {
    gap: 5px;
  }
  @media (min-width: 600px) and (max-width: 899px) {
    flex-shrink: 2;
  }
  .winner {
    margin-right: 1rem;

    @media (max-width: 599px) {
      margin-right: 8px;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
}
.title-mini {
  filter: contrast(0.3);
  font-size: 1.05rem;
}
h2 {
  text-align: center;
  padding-top: 30px;
  font-size: 3rem;
  font-weight: 200;
  text-transform: uppercase;

  @media (max-width: 599px) {
    padding-top: 115px;
  }
}
h3 {
  font-weight: 900;
  font-size: 1.7rem;
  @include border(10px);
}
.subtitle {
  font-weight: 100;
  font-size: 1.35rem;
  margin: 5px 0 13px 0;
  text-transform: uppercase;
}
.maps {
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    padding: 15px;

    .map {
      width: calc(100% / 5 - 13px);
      backdrop-filter: brightness(1) contrast(0.95);
      border-radius: 5px;
      min-height: 155px;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.192);
      transition: all 0.2s ease;

      @media (max-width: 599px) {
        width: calc(100% / 2 - 8px);
      }

      h3 {
        margin-top: 1rem;
        margin-bottom: 0.75rem;

        & ~ div {
          filter: contrast(0.3);
          margin-bottom: 0.3rem;
        }
      }
    }
  }
}

h1 {
  margin: 1rem 0;
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
}
.players {
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    padding: 15px;
    .player {
      width: calc(100% / 3 - 40px);
      backdrop-filter: brightness(1) contrast(0.95);
      border-radius: 5px;
      min-height: 145px;
      padding: 15px;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.192);
      transition: all 0.2s ease;

      @media (max-width: 599px) {
        width: 100%;
      }

      // &:hover {
      //   backdrop-filter: brightness(1.2) contrast(0.94);
      // }

      h3 {
        margin-top: 1rem;
        margin-bottom: 0.75rem;

        & ~ div {
          &.player_main {
            display: flex;
            justify-content: space-evenly;
          }
          span {
            filter: contrast(0.3);
          }
        }
      }
      .details {
        margin-bottom: 20px;
        margin-top: 20px;
        @include border(25px);
        p:not(:last-of-type) {
          margin-bottom: 5px;
        }
      }
      .powerups,
      .items {
        @include border(25px);
        margin-bottom: 20px;
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          gap: 20px;

          img {
            width: 50px;
          }
        }
      }
      .weapons {
        .wrapper {
          display: flex;
          flex-direction: column;
          gap: 15px;

          .weapon {
            div {
              img {
                margin-right: -5px;
              }
              display: flex;
              align-items: center;
              gap: 20px;
            }
          }

          img {
            width: 50px;
          }
        }
      }
    }
  }
}
</style>

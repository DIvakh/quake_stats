<template>
  <!-- ==== MAPS ==== -->
  <section class="maps">
    <h2>Maps</h2>
    <div class="container">
      <div v-for="map of gameData.maps" class="map">
        <h3>{{ map.name }}</h3>
        <div v-for="winner of map.winners">
          <span> {{ winner.name }}:</span> {{ winner.wins }}
        </div>
      </div>
    </div>
  </section>

  <!-- ==== PLAYERS ==== -->
  <section class="players">
    <h2>Players</h2>
    <div class="container">
      <div v-for="player of playersData" class="player">
        <div>
          <h3>{{ player.name }}</h3>
          <div class="player_main">
            <p><span>Games:</span> {{ player.games }}</p>
            <p><span>Score:</span> {{ player.score }}</p>
            <p><span>Kills:</span> {{ player.kills }}</p>
            <p><span>Deaths:</span> {{ player.deaths }}</p>
          </div>
          <div class="player_details">
            <div class="details_content">
              <div class="details">
                <p>
                  <span>Armor total:</span>
                  {{ player.armor_total.toLocaleString().replace(/\,/g, ' ') }}
                </p>
                <p>
                  <span>Health total:</span>
                  {{ player.health_total.toLocaleString().replace(/\,/g, ' ') }}
                </p>
                <p>
                  <span>Damage given:</span>
                  {{ player.damage_given.toLocaleString().replace(/\,/g, ' ') }}
                </p>
                <p>
                  <span>Damage taken:</span>
                  {{ player.damage_taken.toLocaleString().replace(/\,/g, ' ') }}
                </p>
                <p><span>Suicides:</span> {{ player.suicides }}</p>
                <p>
                  <span>Telefrags:</span>
                  {{ player.score - player.kills + player.suicides }}
                </p>
              </div>

              <!-- ====Powerups==== -->
              <div class="powerups">
                <p class="subtitle">Powerups:</p>
                <div class="wrapper">
                  <div class="powerup" v-for="powerup in player.powerups">
                    <div>
                      <img
                        :src="`./images/items/${powerup.name.toLowerCase()}.png`"
                        :alt="powerup.name"
                      />
                      <p><span>Pickups:</span> {{ powerup.pickups }}</p>
                      <p>
                        <span>Time (min.):</span>
                        {{ Math.floor(powerup.time / 60000) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ====Items==== -->
              <div class="items">
                <p class="subtitle">Items:</p>
                <div class="wrapper">
                  <div class="item" v-for="item in player.items">
                    <div>
                      <img
                        :src="`./images/items/${item.name.toLowerCase()}.png`"
                        :alt="item.name"
                      />
                      <p><span>Pickups:</span> {{ item.pickups }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ====Weapons==== -->
              <div class="weapons">
                <p class="subtitle">Weapons:</p>
                <div class="wrapper">
                  <div class="weapon" v-for="weapon in player.weapons">
                    <div>
                      <img
                        :src="`./images/items/${weapon.name.toLowerCase()}1.png`"
                        :alt="weapon.name"
                      />
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
  </section>
</template>
<script>
export default {
  props: {
    gameData: {
      type: Object
    },
    playersData: {
      type: Object
    }
  }
};
</script>
<style lang=""></style>

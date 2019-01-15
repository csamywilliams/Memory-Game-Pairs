<template>
  <div :id="styleClass">
    <p><b>Player {{ this.id }} </b></p>
    <img :src="getImgUrl" width="100px" height="100px" />
    <p>Score: {{ this.score }} </p>
  </div>
</template>

<script>

export default {
  name: 'player',
  props: {
    id: Number,
  },
  computed: {
    score() {
      return this.$store.getters.score[`player${this.id}`];
    },
    getImgUrl() {
      return require(`../assets/farmer${this.id}.svg`);
    },
    styleClass() {
      return `player${this.id}`;
    },
  },
};
</script>

<style lang="scss">

#player1 {
  position: absolute;
  top: 15%;
  left: 15%;
}

#player2 {
  position: absolute;
  top: 15%;
  right: 15%;
}

</style>

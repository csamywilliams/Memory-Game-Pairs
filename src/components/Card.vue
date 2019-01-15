<template>
  <div class="card" v-on:click="select" >
    <div v-show="!flipped" class="card-front">
      <img src="../assets/logo.png" width="100px" height="150px" />
    </div>
    <div v-show="flipped" class="card-back">
      <p><b>{{this.pic | capitalise}}</b></p>
      <img :src="getImgUrl" width="100px" height="100px" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'card',
  props: {
    pic: {
      type: String,
      default: 'chick',
    },
    cardId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      flipped: false,
      cardStyle: {
        'background-color': this.pic,
      },
    };
  },
  filters: {
    capitalise(s) {
      if (typeof s !== 'string') return '';
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
  },
  computed: {
    getImgUrl() {
      return require(`../assets/${this.pic}.svg`);
    },
  },
  methods: {
    select() {
      this.flip();

      const card = this;

      card.$store.dispatch('cardSelected', {
        id: this.cardId,
        name: this.pic,
      });

      if (card.$store.getters.cardState === 'lose' && card.$store.getters.cardsAvailable === 0) {
        setTimeout(() => {
          card.flip();
          card.$parent.$children[card.$store.getters.firstCard].$data.flipped = false;
        }, 700);
      }
    },
    flip() {
      this.flipped = !this.flipped;
    },
  },
};
</script>

<style lang="scss">

$color2: hsla(137%, 26%, 51%, 1);

.card {
  border: 1px solid $color2;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
}

</style>

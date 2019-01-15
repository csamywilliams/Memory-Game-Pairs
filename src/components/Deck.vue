<template>
  <div v-show="!inProgress" id="deck" :class="gridStyle">
      <div v-for="(card, index) in cardDeck" v-bind:key="index">
        <Card :pic="card" :cardId="index" :ref="'card' + index"/>
      </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import Card from './Card.vue';

export default {
  name: 'deck',
  components: {
    Card,
  },
  data() {
    return {
      inProgress: false,
      gameover: false,
    };
  },
  computed: {
    cardDeck() {
      return this.generateCards();
    },
    gridStyle() {
      return this.$store.getters.difficulty;
    },
    ...mapGetters({
      deck: 'deck',
    }),
  },
  methods: {
    generateCards() {
      const cardDeck = this.deck;
      const initialDeck = cardDeck.concat([...cardDeck]);
      return this.shuffleDeck(initialDeck);
    },
    shuffleDeck(deck) {

      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }

      return deck;
    },
  },
};
</script>

<style lang="scss">

#deck {
  display: grid;
  margin-top: 10px;
}

.easy {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.medium {
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
}

.hard {
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(8, 1fr);
}

</style>

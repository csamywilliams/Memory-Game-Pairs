<template>
  <div id="board">

    <h1>Oh What a lovely pair! </h1>

    <Player :id="1" />
    <Player :id="2" />

    <p v-show="!gameover">Player {{ turn }}'s turn</p>
    <p v-show="gameover">{{ winner }}</p>

    <div v-show="showGameDifficultyButtons">
      <button v-on:click="gameDifficulty('easy')" id="easy" class="button">Easy</button>
      <button v-on:click="gameDifficulty('medium')" id="medium" class="button">Medium</button>
      <button v-on:click="gameDifficulty('hard')" id="hard" class="button">Hard</button>
    </div>

    <button v-show="gameover" id="reset" class="button" type="button" v-on:click="resetGame">
      Play Again?
    </button>

    <Deck v-show="gameReady" ref="deck" />
  </div>
</template>

<script>

import Deck from './Deck.vue';
import Player from './Player.vue';
import constants from '../constants';

export default {
  name: 'board',
  components: {
    Deck,
    Player,
  },
  data() {
    return {
      gameplay: {
        easy: constants.EASY_CARDS,
        medium: constants.MEDIUM_CARDS,
        hard: constants.HARD_CARDS,
      },
      showGameButtons: true,
    };
  },
  computed: {
    turn() {
      return this.$store.state.playerTurn;
    },
    winner() {
      if (this.$store.state.winner === constants.DRAW) {
        return "It's a draw";
      }

      return `Player ${this.$store.state.winner} wins`;
    },
    gameover() {
      return this.$store.state.gameover;
    },
    gameReady() {
      return this.$store.state.gameReady;
    },
    showGameDifficultyButtons() {
      return this.showGameButtons;
    }
  },
  methods: {
    resetGame() {
      this.showGameButtons = true;
      this.$store.dispatch('resetGame');
      this.flipCardDeck();
    },
    flipCardDeck() {
      this.$refs.deck.$children.forEach(element => {
        element.$data.flipped = false;
      });
    },
    gameDifficulty(type) {
      this.showGameButtons = false;
      this.$store.commit('updateGameDifficulty', { difficulty: type });
      this.$store.dispatch('pickCards', { deck: this.gameplay[type] });
      this.$store.dispatch('gameReadyToPlay', { status: true });
    },
  },
};
</script>

<style lang="scss">

$color1: hsla(327%, 29%, 34%, 1);
$color2: hsla(137%, 26%, 51%, 1);
$color3: hsla(48%, 97%, 75%, 1);
$color4: hsla(11%, 57%, 62%, 1);
$color5: hsla(344%, 49%, 60%, 1);

.button {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    background-color: $color2;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 5px;
}

#easy {
  background-color: $color5;
}

#medium {
  background-color: $color4;
}

#hard {
  background-color: $color1;
}

</style>

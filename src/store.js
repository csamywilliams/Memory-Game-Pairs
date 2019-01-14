/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';

import { stat } from 'fs';
import constants from './constants';

Vue.use(Vuex);

const initialState = {
  deck: constants.EASY_CARDS,
  pairs: constants.EASY_CARDS.length,
  gameReady: false,
  cards: [],
  playerTurn: 1,
  selectedCard: "",
  cardsAvailable: 0,
  cardState: "lose",
  cardSelected: [
    {
      num: 0,
      name: "",
      id: 0
    },
    {
      num: 2,
      name: "",
      id: 0
    }
  ],
  score: {
    player1: 0,
    player2: 0
  },
  winner: "",
  gameover: false
};

const store = Object.assign({}, initialState);

export default new Vuex.Store({
  state: store,
  mutations: {
    updateDeck(state, payload) {
      state.deck = payload.deck;
    },
    updatePairs(state, payload) {
      state.pairs = payload.deck.length;
    },
    changeGameReady(state, payload) {
      state.gameReady = payload.status;
    }, 
    updatePlayerTurn(state, payload) {
      state.playerTurn = payload.turn;
    },
    changeCardState(state, payload) {
      state.cardState = payload.cardState;
    },
    updateCard(state, payload) {
      state.selectedCard = payload.name;
    },
    updateCardSelected(state, payload) {
      state.cardSelected[payload.cardNum].id = payload.id;
      state.cardSelected[payload.cardNum].name = payload.cardName;
    },
    updateScore(state) {
      const player = `player${state.playerTurn}`;
      state.score[player] = state.score[player] + 1;
    },
    resetScore(state, payload) {
      state.score.player1 = 0;
      state.score.player2 = 0;
    },
    updateLeader(state, payload) {
      if(state.score.player1 > state.score.player2) {
        state.winner = 1;
      } else if ((state.score.player2 === state.score.player1)) {
        state.winner = 3;
      } else {
        state.winner = 2;
      }
    },
    increment: state => state.cardsAvailable++,
    refreshCards(state) {
      state.cardsAvailable = 0;
    },
    triggerGameOver(state) {
      state.gameover = true;
    },
  },
  getters: {
    deck: state => state.deck,
    pairs: state => state.pairs,
    gameReady: state => state.gameReady,
    turn: state => state.playerTurn,
    cardState: state => state.cardState,
    cardsAvailable: state => state.cardsAvailable,
    firstCard: state => state.cardSelected[0].id,
    gameover: state => state.gameover,
    score: state => state.score
  },
  actions: {
    pickCards ({commit , state}, payload) {
      commit('updateDeck', payload);
      commit('updatePairs', payload);
    },
    gameReadyToPlay ( { commit }, payload ) {
      commit('changeGameReady', payload);
    },
    cardSelected ({ commit, dispatch, state }, payload) {

      commit('updateCardSelected', { 
        cardNum: state.cardsAvailable,
        cardName: payload.name,
        id: payload.id
      });

      commit('increment');

      if(state.cardsAvailable === constants.PAIR_CARDS) {
        commit('refreshCards');
        dispatch('checkForPairs', payload);
      } else {
        commit('updateCard', payload);
      }

    },
    checkForPairs({ commit, state, dispatch }, payload) {

      if(payload.name === state.selectedCard) {
        commit('changeCardState', { cardState: 'win'});
        commit('updateScore');
        commit('updateLeader');
        dispatch('checkIfGameOver');
      } else {
        commit('changeCardState', { cardState: 'lose'});
        dispatch('changePlayer');
      }
    },
    changePlayer ({ commit, state }, payload) {
      let player = 1;

      if(state.playerTurn === 1) {
        player = 2;
      } 

      commit('updatePlayerTurn', { turn: player });
    },
    checkIfGameOver({ state, commit }) {
      if((state.score.player1 + state.score.player2) === state.pairs) {
        commit('triggerGameOver');
      }
    },
    resetGame({ state, commit }) {
      Object.assign(state, initialState);
      this.commit('resetScore');
    }
  },
});

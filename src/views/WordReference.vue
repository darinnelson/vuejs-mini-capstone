<template>
  <div>
    <h4>Type a sentence to below to hover over the words and see the translation</h4>
    <input v-model="sentence">
<!--     <h3>{{ sentence }}</h3> -->
    <h1>
      <span 
        v-for="word in sentence.split(' ')" 
        @mouseover="translate(word)"
        v-bind:class="{selected: word === currentWord}"
      >{{ word }} </span>
    </h1>
    <h2>Current word: {{ currentWord }} <span v-if="loading"> (translating...)</span></h2>
    <button v-on:click="googleTranslate()">yo</button>
    <!-- <h2 v-else>{{ translation }}</h2> -->
  </div>
</template>

<style>
  .selected {
    color: green;
  }
</style>

<script>
import axios from "axios";
var wr = require('wordreference-api');

export default {
  data: function() {
    return {
      active: false,
      sentence: "",
      currentWord: "",
      translation: "",
      loading: false
    };
  },
  methods: {
    translate: function(word) {
      if (this.loading) {
        return;
      }
      console.log("translating...");
      this.loading = true;
      this.currentWord = word;
      wr(word,'en','es').then(
        function(result) {
          var translations = result.translations[0].translations
          this.translationsArray = []
          translations.forEach(function(translation) {
            this.translationsArray.push(translation.to);
          }.bind(this))
          this.currentWord = this.translationsArray;
          // this.currentWord = translations[0].to;
          console.log(this.translationsArray);
          this.loading = false;
        }.bind(this)); 
    },
    mouseOver: function(word) {
      this.active = !this.active;   
      this.currentWord = word;
    },
    googleTranslate: function() {
      axios.get("localhost:3000/api/googletanslate").
        then(
          function(response) {
            this.translation = response.data;
            console.log(this.translation)
          }
        )
    }
  }
};
</script>


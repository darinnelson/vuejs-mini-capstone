<template>
  <div class="login">
    <h6>Hover over any of the words in this following sentences to see the translation</h6>
    <h1><span v-for="word in sentence.split(' ')" @mouseover="translate(word)">{{ word }} </span></h1>
    <h2>Current word: {{ currentWord }}</h2>
  </div>
</template>

<script>
import axios from "axios";
var wr = require('wordreference-api');

export default {
  template: "#login-page",
  data: function() {
    return {
      active: false,
      sentence: "This is an interesting sentence",
      currentWord: ""
    };
  },
  methods: {
    translate: function(word) {
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
        }.bind(this)); 
    },
    mouseOver: function(word) {
      this.active = !this.active;   
      this.currentWord = word;
    }
  }
};
</script>
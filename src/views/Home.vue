<template>
  <div class="home">



        <nav class="white" role="navigation">
          <div class="nav-wrapper container">
            <a id="logo-container" href="/#/" class="brand-logo">Native Talk</a>
            <ul class="right hide-on-med-and-down">
              <li><a href="/#/leaderboards">Leaderboards</a></li>
              <li><a href="/#/signup">Sign Up</a></li>
              <li><a href="/#/login">Log In</a></li>
            </ul>

      <!--       <ul id="nav-mobile" class="sidenav">
              
            </ul> -->
            <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          </div>
        </nav>

        <div id="index-banner" class="parallax-container">
          <div class="section no-pad-bot">
            <div class="container">
              <br><br>
              <h1 class="header center teal-text text-lighten-2">Looking to learn some local slang for your travels?</h1>
 
<!--               <div class="row center">
                <h5>Learn slang from over 20 countries!</h5>
              </div> -->
              <div class="row center">
                <a href="/#/signup" class="btn-large waves-effect waves-light teal lighten-1">Let's get started!</a>
              </div>
              <br><br>

            </div>
          </div>
          <div class="parallax"><img src="background1.jpg" alt="Unsplashed background img 1"></div>
        </div>

  
  </div>

</template>



<style>

</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      courses: []
    };
  },
  methods: {},
  computed: {}
};
</script>

<!-- v-bind:src="recipe.image_url" -->
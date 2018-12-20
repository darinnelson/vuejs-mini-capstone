<template>
  <div class="course_home">

      <nav class="white" role="navigation">
        <div class="nav-wrapper container">
          <a id="logo-container" href="/#/" class="brand-logo">Native Talk</a>
          <ul class="right hide-on-med-and-down">
            <li><a href="#/leaderboards">Leaderboards</a></li>
            <li><a href="#/signup">Sign Up</a></li>
  <!--           <li><a v-on:click="showStats()">My Stats</a></l -->i>
          </ul>

          <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
      </nav>

  <div class="container">
    
      <div class="row" is="transition-group" name="slide-right">

        <div v-for="course in orderBy(courses, 'name')" class="col m4" v-bind:key="course.id" style="height:420px !important;">


          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img style="min-height:363px min-weight:500px" class="activator" v-bind:src="course.image_url">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">{{ course.name }}<i class="material-icons right">more_vert</i></span>
              <p><a v-bind:href="`/#/courses/${course.name}`" v-on:click="createCourseUser(course)">Go to course</a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">{{ course.name }}<i class="material-icons right">close</i></span>
              <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
          </div>



        </div>
      </div>

<!--       <div>
        <button v-on:click="showStats()">My Stats</button>
      </div> -->
    </div>

  <!--     <div is="transition-group" name="slide-right">
        <div v-for="course in orderBy(filterBy(courses, courseFilter, 'name'), sortAttribute, toggle)" v-bind:key="course.id">
          <button v-on:click="createCourseUser(course)">{{ course.name }}</button>
        </div>
      </div> -->
      
  </div>

</template>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

/* Vue.js slide-right */
.slide-right-enter-active {
  transition: all .5s ease;
}
.slide-right-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-right-enter, .slide-right-leave-to {
  transform: translateX(200px);
  opacity: 0;
}

/* Vue.js slide-left */
.slide-left-enter-active {
  transition: all .3s ease;
}
.slide-left-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-left-enter, .slide-left-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}


</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      courses: [],
      user: {},
      courseFilter: "",
      sortAttribute: "",
      toggle: 1
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/courses").then(
      function(response) {
        this.courses = response.data;
        console.log(response.data);
      }.bind(this));
  },
  methods: {
    showStats: function() {
      axios.get("http://localhost:3000/api/users/stats").then(
        function(response) {
        // console.log(response.data);
          this.user = response.data;
          if (this.user.total_attempted > 0) {
            var lifetimeScore = Math.round((this.user.xp / this.user.total_attempted) * 100).toFixed(0);
            alert("Total XP: " + this.user.xp + "\n" + "Lifetime score: " + lifetimeScore + "%");
          } else {
            alert("Total XP: " + this.user.xp + "\n" + "Lifetime score: You must attempt at least one translation to see your score.");
          }
          console.log(this.user.xp, this.user.total_attempted);
        }.bind(this)); 
    },
    createCourseUser: function(course) {
      axios.post("http://localhost:3000/api/course_users", {course_id: course.id});
      this.$router.push("/courses/" + course.name);
    },
    tog: function() {
      this.toggle *= -1;
    },
  },
  computed: {}
};
</script>

<!-- v-bind:src="recipe.image_url" -->
<!-- <a v-bind:href="    `/#/recipes/${recipe.id}`     " class="btn btn-primary">go somewhere</a> -->
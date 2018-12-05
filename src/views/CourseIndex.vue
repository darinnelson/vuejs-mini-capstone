<template>
  <div class="course_home">
<!--<div>
      <button v-on:click="sortAttribute = 'name', tog()">Sort by name</button>
      <button v-on:click="sortAttribute = 'id'">Sort by id</button>
    </div> -->
<!--<div>
      <h1>Search Courses</h1>
      <input type="text" v-model="courseFilter" list="courses">
    </div>
    <br> -->

<!--<datalist id="courses">
      <option v-for="course in orderBy(courses, 'name')">{{ course.name }}</option>
    </datalist> -->

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/#/">Native Talk</a>
      <a class="navbar-brand" href="/#/login">Log In</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>

    <div class="row" is="transition-group" name="slide-right">
      <div v-for="course in orderBy(courses, 'name')" class="col-md-4 mb-2" v-bind:key="course.id">
        <div class="card" style="min-height:363.66px;">
          <div class="card-body">
           <!--  <h5 class="card-title">{{ course.name }}</h5> -->
            <a v-bind:href="`/#/courses/${course.name}`" ><img class="card-img-top" v-bind:src="course.image_url" alt="Card image cap" style="height:363.66px;"></a>
            <div>
              <h3><center>{{ course.name }}</center></h3>
            </div>
          </div>
        </div>
      </div>
    </div>

<!--     <div is="transition-group" name="slide-right">
      <div v-for="course in orderBy(filterBy(courses, courseFilter, 'name'), sortAttribute, toggle)" v-bind:key="course.id">
        <button v-on:click="createCourseUser(course)">{{ course.name }}</button>
      </div>
    </div> -->

    <div>
      <button v-on:click="showStats()">My Stats</button>
    </div>

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
    }
  },
  computed: {}
};
</script>

<!-- v-bind:src="recipe.image_url" -->
<!-- <a v-bind:href="    `/#/recipes/${recipe.id}`     " class="btn btn-primary">go somewhere</a> -->
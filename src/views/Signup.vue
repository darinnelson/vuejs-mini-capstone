<template>
  <div class="signup">

      <nav class="white" role="navigation">
        <div class="nav-wrapper container">
          <a id="logo-container" href="/#/" class="brand-logo">Native Talk</a>
          <ul class="right hide-on-med-and-down">
            <li><a href="#/leaderboards">Leaderboards</a></li>
            <li><a href="/#/login">Log In</a></li>
          </ul>

    <!--       <ul id="nav-mobile" class="sidenav">
            
          </ul> -->
          <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
      </nav>

    <div class="container">

 <!--    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/#/">Native Talk</a>
      <a class="navbar-brand" href="/#/login">Log In</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
 -->

        
      <br>
      <br>
      <br>
      <div class="container">
        <div style="background-color: white; padding: 30px">
          <form v-on:submit.prevent="submit()" >
            <h1>Signup</h1>
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <div class="form-group">
              <label>Name:</label> 
              <input type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
              <label>Password:</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <div class="form-group">
              <label>Password confirmation:</label>
              <input type="password" class="form-control" v-model="passwordConfirmation">
            </div>
            <input type="submit" class="btn btn-primary" value="Submit"><br><br>
            <a href="/#/">Home</a>
          </form>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("http://localhost:3000/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
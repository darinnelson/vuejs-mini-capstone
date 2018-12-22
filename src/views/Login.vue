<template>
  <div class="login">

      <nav class="white" role="navigation">
        <div class="nav-wrapper container">
          <a id="logo-container" href="/#/" class="brand-logo">Native Talk</a>
          <ul class="right hide-on-med-and-down">
            <li><a href="#/leaderboards">Leaderboards</a></li>
            <li><a href="#/signup">Sign Up</a></li>
          </ul>

    <!--       <ul id="nav-mobile" class="sidenav">
            
          </ul> -->
          <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
      </nav>

    <div class="container">

        
      <br>
      <br>
      <br>
      <div style="background-color: white; padding: 30px">
        <form v-on:submit.prevent="submit()">
          <h1>Login</h1>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" class="form-control" v-model="email">
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" class="form-control" v-model="password">
          </div>
          <input type="submit" class="btn btn-primary" value="Submit">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      console.log(this.email, this.password);
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("http://localhost:3000/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/courses");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
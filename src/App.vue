<template>
  <div class="container-fluid">
    <div class="row">
    <nav class="navbar navbar-dark bg-dark" >
      <div class="container  justify-content-start ">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        </div>
    </nav>
    </div>
  </div>

  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  color: #2c3e50;
}
nav a{
  padding: 10px;
}
</style>

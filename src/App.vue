<template>
  <div id="app">

    <vk-sticky bottom="#offset">
      <vk-navbar>
        <vk-navbar-nav slot="center">
          <li v-if="logged">
            <router-link to="/home" class="uk-navbar-nav uk-navbar-item">Inicio</router-link>
          </li>
          <li v-if="notLogged">
            <router-link to="/login" class="uk-navbar-nav uk-navbar-item">Entrar</router-link>
          </li>
          <li v-if="notLogged">
            <router-link to="/signup" class="uk-navbar-nav uk-navbar-item">Registrar</router-link>
          </li>
        </vk-navbar-nav>
      </vk-navbar>
    </vk-sticky>

    <div class="uk-container uk-container-large uk-container-center uk-margin-small-bottom">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import EventBus from './eventBus'
import firebase from 'firebase'

export default {
  name: 'App',
  data () {
    return {
      autenticated: false
    }
  },
  mounted () {
    EventBus.$on('check-user', (value) => {
      this.autenticated = value
    })
  },
  computed: {
    logged () {
      return this.autenticated;
    },
    notLogged () {
      return !this.autenticated;
    }
  }
}
</script>

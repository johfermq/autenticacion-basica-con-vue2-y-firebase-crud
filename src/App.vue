<template>
  <div id="app">
    <vk-notification status="danger" :messages.sync="messages"></vk-notification>
    <vk-sticky bottom="#offset">
      <vk-navbar>
        <vk-navbar-nav slot="center">
          <template v-if="logged">
            <li>
              <router-link to="/home" class="uk-navbar-nav uk-navbar-item">Inicio</router-link>
            </li>
            <li>
              <router-link to="/persons" class="uk-navbar-nav uk-navbar-item">Personas</router-link>
            </li>
          </template>
          <template v-if="notLogged">
            <li>
              <router-link to="/login" class="uk-navbar-nav uk-navbar-item">Entrar</router-link>
            </li>
            <li>
              <router-link to="/signup" class="uk-navbar-nav uk-navbar-item">Registrar</router-link>
            </li>
          </template>
        </vk-navbar-nav>
        <vk-navbar-nav slot="right" v-if="logged">
          <vk-navbar-item>
            <vk-button @click="logout" type="primary">Cerrar sesión</vk-button>
          </vk-navbar-item>
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
      autenticated: false,
      messages: []
    }
  },
  created () {
    EventBus.$on('check-user', (value) => {
      this.autenticated = value
    })
  },
  computed: {
    logged () {
      return this.autenticated;
    },
    notLogged () {
      return this.autenticated == false;
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      },
      (err) => {
        this.messages.push({ message: err.message, key: Date.now() })
      })
    }
  }
}
</script>

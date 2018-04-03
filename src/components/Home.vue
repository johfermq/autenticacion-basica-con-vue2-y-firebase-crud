<template>
  <div>
    <vk-notification status="danger" :messages.sync="messages"></vk-notification>

    <article class="uk-article uk-text-center">

      <h1 class="uk-article-title uk-margin-top">Bienvenido {{ user }}</h1>
      <hr class="uk-divider-icon">

      <p class="uk-text-lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>

      <div class="uk-grid-small uk-child-width-auto uk-background-muted" uk-grid>
        <div>
          <vk-button @click="logout" type="primary">Cerrar sesión</vk-button>
        </div>
      </div>

    </article>
  </div>
</template>

<script>
import EventBus from './../eventBus'
import firebase from 'firebase'

export default {
  name: 'home',
  data () {
    return {
      user: '',
      messages: [],
    }
  },
  mounted () {
    this.checkUser()
    let user = firebase.auth().currentUser
    if (user != null) {
      this.user = user.email
    }
  },
  methods: {
    checkUser () {
      EventBus.$emit('check-user', true)
    },
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
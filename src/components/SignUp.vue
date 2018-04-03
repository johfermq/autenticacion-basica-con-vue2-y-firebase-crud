<template>
  <div>
    <vk-notification status="danger" :messages.sync="messages"></vk-notification>

    <vk-grid class="uk-margin-top uk-child-width-expand@s uk-text-center">
      <div></div>
      <div>
        <vk-icon icon="user" ratio="4"></vk-icon>
        <vk-grid class="uk-child-width-1-1\@s uk-text-center">
          <div>
            <h1>Crear cuenta</h1>
            <hr class="uk-divider-icon">
            <form @submit.prevent="signUp">
              <div class="uk-margin">
                <input v-model="email" class="uk-input" type="email" placeholder="Correo Electrónico" required>
              </div>
              <div class="uk-margin">
                <input v-model="password" class="uk-input" type="password" placeholder="Contraseña" required>
              </div>
              <div class="uk-margin">
                <vk-button htmlType="submit" type="primary" class="uk-width-1-1 uk-margin-small-bottom">
                  Crear cuenta
                </vk-button>
              </div>
            </form>
            <p>
              Ya tienes una cuenta. <router-link to="/login">Iniciar sesión</router-link>
            </p>
          </div>
        </vk-grid>
      </div>
      <div></div>
    </vk-grid>
  </div>
</template>

<script>
  import EventBus from './../eventBus'
  import firebase from 'firebase'

  export default {
    name: 'signup',
    data () {
      return {
        email: '',
        password: '',
        messages: [],
      }
    },
    mounted () {
      this.checkUser()
    },
    methods: {
      checkUser () {
        EventBus.$emit('check-user', false)
      },
      signUp () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('home')
          },
          (err) => {
            this.messages.push({ message: err.message, key: Date.now() })
          }
        );
      }
    }
  }
</script>
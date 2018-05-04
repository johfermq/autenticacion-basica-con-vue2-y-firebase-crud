<template>
  <div>
    <article class="uk-article uk-text-center">

      <h1 class="uk-article-title uk-margin-top">Listado de personas</h1>
      <hr class="uk-divider-icon"/>

      <vk-grid gutter="small" class="uk-child-width-expand@s uk-text-center">
        <div class="uk-width-auto@m">
          <vk-card>
            <h3>Crear usuario</h3>
            <form class="uk-form-stacked" @submit.prevent="enviar">
              <div class="uk-margin">
                <label class="uk-form-label uk-text-left" for="nombre">Nombre</label>
                <div class="uk-form-controls">
                  <input type="text" class="uk-input" id="nombre" v-model="person.nombre" required>
                </div>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label uk-text-left" for="apellido">Apellido</label>
                <div class="uk-form-controls">
                  <input type="text" class="uk-input" id="apellido" v-model="person.apellido" required>
                </div>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label uk-text-left" for="correo">Correo electrónico</label>
                <div class="uk-form-controls">
                  <input type="email" class="uk-input" id="correo" v-model="person.correo" required>
                </div>
              </div>
              <div class="uk-margin">
                <div class="uk-form-controls">
                  <vk-button type="secondary" @click="limpiar">Cancelar</vk-button>
                  <vk-button type="primary" htmlType="submit">Guardar</vk-button>
                </div>
              </div>
            </form>
          </vk-card>
        </div>
        <div>
          <vk-card>
            <h3>Todos las personas</h3>
            <div class="uk-overflow-auto">
              <vk-table striped hoverable narrowed justified :data="persons">
                <vk-table-column title="Nombre" cell="nombre"></vk-table-column>
                <vk-table-column title="Apellido" cell="apellido"></vk-table-column>
                <vk-table-column title="Correo" cell="correo"></vk-table-column>
                <vk-table-column title="Opciones">
                  <div slot-scope="{ row }">
                    <vk-button size="small" type="primary" @click="editar(row)">Editar</vk-button>
                    <vk-button size="small" type="danger" @click="eliminar(row)">Eliminar</vk-button>
                  </div>
                </vk-table-column>
              </vk-table>
            </div>
          </vk-card>
        </div>
      </vk-grid>

    </article>
  </div>
</template>

<script>
import EventBus from './../eventBus'
import firebase from 'firebase'

export default {
  name: 'persons',
  data () {
    return {
      person: {
        id: '',
        nombre: '',
        apellido: '',
        correo: ''
      },
      persons: [],
      key: '',
      editable: false
    }
  },
  created () {
    this.checkUser()
    this.snapshot()
  },
  methods: {
    checkUser () {
      EventBus.$emit('check-user', true)
    },
    snapshot () {
      firebase.database().ref('/persons').on('value', snapshot => this.listar(snapshot.val()))
    },
    listar (persons) {
      this.persons = [];
      for (let key in persons)
      {
        this.persons.push({
          id: persons[key].id,
          nombre: persons[key].nombre,
          apellido: persons[key].apellido,
          correo: persons[key].correo
        })
        /*this.key = parseInt(key)*/
      }
      /*this.key += 1*/
    },
    enviar () {
      if (this.editable) {
        this.actualizar()
      } else {
        this.guardar()
      }
    },
    nuevaKey () {
      return firebase.database().ref().child('persons').push().key
    },
    guardar () {
      this.key = this.nuevaKey()
      this.person.id = this.key
      firebase.database().ref('persons/' + this.key).set(this.person)
        .then((data) => {
          this.limpiar()
        })
    },
    editar (person) {
      this.person = {
        id: person.id,
        nombre: person.nombre,
        apellido: person.apellido,
        correo: person.correo
      }
      this.editable = true
    },
    actualizar () {
      let updates = {}
      updates['/persons/' + this.person.id] = this.person
      firebase.database().ref().update(updates)
        .then((data) => {
          this.limpiar()
        })
    },
    eliminar (person) {
      firebase.database().ref('persons/' + person.id).remove()
    },
    limpiar () {
      this.person = {
        id: '',
        nombre: '',
        apellido: '',
        correo: ''
      }
      this.key = ''
      this.editable = false
    }
  }
}
</script>
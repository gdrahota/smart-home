<template>
  <v-dialog
    :width="500"
  >
    <v-btn
      slot="activator"
      class="ml-5"
      icon
      color="green darken-1"
      outline
      small
    >
      <v-icon small color="green darken-1">fa-plus</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <div class="headline">Neue Eigenschaft benennen</div>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Name der Eigenschaft"
        />
      </v-card-text>
      <v-card-actions class="ml-2">
        <v-btn color="grey" outline @click.stop="cancel">
          <v-icon small left>fa-times</v-icon>
          <span>Abbrechen</span>
        </v-btn>
        <v-btn color="blue darken-2" outline @click.stop="submit">
          <v-icon small left>fa-save</v-icon>
          <span>Anlegen</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        name: ''
      }
    },

    methods: {
      submit () {
        this.$emit('add', this.name)
        this.name = ''
      },
      cancel () {
        this.$emit('cancel', this.name)
        this.name = ''
      }
    }
  }
</script>

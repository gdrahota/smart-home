<template>
  <v-dialog
    v-model="showDialog"
    persistent
    max-width="600"
    :disabled="disabled"
  >
    <v-btn
      v-if="label"
      slot="activator"
      outline
      :small="small"
      color="red"
      :fab="fab"
      :disabled="disabled"
      :medium="medium"
      :large="large"
    >
      <v-icon left>clear</v-icon>
      <span>{{ label }}&nbsp;&nbsp;</span>
    </v-btn>

    <v-btn
      v-else
      slot="activator"
      :disabled="disabled"
      fab
      :large="large"
      :medium="medium"
      :small="small"
      :icon="!fab"
      :flat="!fab"
    >
      <v-icon :small="small" color="red">{{ icon }}</v-icon>
    </v-btn>

    <div id="delete-dialog">
      <v-card>

        <v-card-title
          class="headline"
          primary-title
        >
          {{title}}
        </v-card-title>

        <v-card-text v-if="description" class="subheading">{{description}}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            medium
            color="primary"
            flat
            @click="disagree()"
          >
            Nein
          </v-btn>
          <v-btn
            medium
            color="primary"
            outline
            @click="agree()"
          >
            Ja
          </v-btn>
        </v-card-actions>

      </v-card>
    </div>

  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        showDialog: false
      }
    },

    props: {
      label: {
        type: String,
        required: false
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: false
      },
      small: {
        type: Boolean,
        required: true
      },
      medium: {
        type: Boolean,
        required: false
      },
      large: {
        type: Boolean,
        required: false
      },
      fab: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: 'fa-trash'
      },
      disabled: {
        type: Boolean,
        required: false
      }
    },

    methods: {
      agree () {
        this.$emit('agree')
        this.showDialog = false
      },
      disagree () {
        this.$emit('disagree')
        this.showDialog = false
      }
    }
  }
</script>

<style>
  #delete-dialog .v-card__actions {
    padding: 0 14px 14px 14px !important;
  }
</style>

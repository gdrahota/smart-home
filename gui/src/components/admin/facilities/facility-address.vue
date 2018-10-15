<template>
  <v-card tile>
    <v-card-title>
      <v-btn icon @click.stop="disabled = !disabled" :style="{ left: '-10px' }">
        <v-icon v-if="disabled">fa-lock</v-icon>
        <v-icon v-else>fa-unlock</v-icon>
      </v-btn>
      <span class="subheading">Adresse</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-layout align-start>
          <v-flex class="mr-2" xs1>
            <v-text-field
              label="PLZ"
              v-model="postCode"
              :disabled="disabled"
            />
          </v-flex>
          <v-flex class="mr-2" xs3>
            <v-text-field
              label="Ort"
              v-model="city"
              :disabled="disabled"
            />
          </v-flex>
          <v-flex xs4 class="mr-2">
            <v-text-field
              label="Straße"
              v-model="street"
              :disabled="disabled"
            />
          </v-flex>
          <v-flex xs1>
            <v-btn fab small v-if="!disabled" class="elevation-1" @click.stop="submit">
              <v-icon small color="blue darken-2">fa-save</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>

</template>

<script>
  export default {
    data () {
      return {
        disabled: true,
        postCode: this.address.postCode,
        city: this.address.city,
        street: this.address.street
      }
    },

    methods: {
      submit () {
        const address = {
          postCode: this.postCode,
          city: this.city,
          street: this.street
        }
        this.$emit('update', address)
        this.disabled = true
      }
    },

    props: {
      address: {
        type: Object,
        default: () => {
          return {
            postCode: '',
            city: '',
            street: ''
          }
        }
      }
    },

    watch: {
      address (changedAddress) {
        this.postCode = changedAddress.postCode,
          this.city = changedAddress.city,
          this.street = changedAddress.street
      }
    }
  }
</script>

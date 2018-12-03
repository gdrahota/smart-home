<template>
  <v-breadcrumbs divider="/">
    <v-breadcrumbs-item
      v-for="route of getBreadcrumbs"
      :to="route.to"
      :key="route.title"
      :disabled="route.disabled"
      exact
    >
      {{ route.title }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
  export default {
    computed: {
      getBreadcrumbs () {
        return this.$route.matched.map(r => {
          return {
            to: r.path.length > 0 ? r.path: '/',
            title: r.meta.title,
            disabled: r.meta.hasNoContent
          }
        })
      }
    }
  }
</script>

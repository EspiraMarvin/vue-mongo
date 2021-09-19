<template>
  <div class="row">
    <div class="col-md-8 col-xs-12 q-pa-md">
      <q-input
        class="provider-add-input"
        outlined
        v-model="providerForm.name"
        placeholder="Providers *"
        type="text"
        lazy-rules
      />
    </div>
    <div class="col-md-4 col-xs-12 q-pa-md">
      <q-btn
        size="md"
        class="q-pa-sm full-width text-capitalize add-provider"
        @click="btnAddProvider"
        label="Add Provider"
        :loading="submittingProviders"
        :disable="isDisabled"
      />
    </div>
  </div>
</template>

<script>
import utils from "src/helpers/utils";
export default {
name: "AddProvider",
  data(){
    return {
      ...utils,
      submittingProviders: false,
      providerFilter: '',
      providerForm: {
        name: ''
      }
    }
  },
  computed: {
      isDisabled() {
        return !this.providerForm.name.replace(/\s/g, '').length
      },
  },
  methods: {
    btnAddProvider() {
      this.submittingProviders = true
      this.providerForm.name.toLowerCase()
      this.$store.dispatch('providers/ADD_PROVIDER', this.providerForm.name.toLowerCase())
        .then(response => {
          this.submittingProviders = false
          this.providerForm.name = ''
          this.showNotification(this, 'Provider Added', 'primary','check_circle');
        })
        .catch((error) => {
          this.submittingProviders = false
          this.showErrorNotification(this, error)
        })
    },
  }
}
</script>

<style scoped>

</style>

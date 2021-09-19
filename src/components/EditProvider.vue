<template>
    <q-card class="" style="width: 500px; max-width: 350vw;">
      <q-card-section>
        <div class="text-h6 text-primary">Edit Provider</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-none">
        <q-form ref="providerForm" class="provider-form">
          <div class="row">
            <div class="col-12 q-pa-md">
              <q-input
                outlined
                class="provider-edit-input"
                v-model="providerForm.name"
                placeholder="Name *"
                type="text"
                lazy-rules
                :rules="[
                val => (val && val.length > 0) || 'Name is missing',
                hasWhiteSpacesOnly
              ]"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="bg-white text-black">
        <q-btn class="q-px-md" label="cancel" v-close-popup />
        <q-btn class="q-px-md" label="update" @click="btnSaveEditedProvider" />
      </q-card-actions>
    </q-card>
</template>

<script>
import utils from "src/helpers/utils";
import {cloneDeep} from "lodash";
export default {
name: "EditProvider",
  props: {
    providerDetailsToEdit: {
      type: Object,
      required: true
    },
    closeEditProviderDialog: {
      type: Function,
      required: true
    }
  },
  mounted() {
  this.populateProviderForm()
  },
  data() {
    return {
      ...utils,
      providerForm: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    btnSaveEditedProvider() {
      // providerForm
      this.$store.dispatch('providers/EDIT_PROVIDER', this.providerForm)
      .then(response => {
        this.closeEditProviderDialog()
        this.showNotification(this, 'Provider Updated', 'primary','check_circle');
      })
      .catch(error => this.showErrorNotification(this, error))
    },
    populateProviderForm() {
      const providerClone = cloneDeep(this.providerDetailsToEdit)
      this.providerForm.id = providerClone._id;
      this.providerForm.name = providerClone.name
    }
  }
}
</script>

<style scoped>

</style>

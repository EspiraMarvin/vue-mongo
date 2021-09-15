<template>
    <q-card class="" style="width: 500px; max-width: 350vw;">
      {{ providerDetailsToEdit }}
      <q-card-section>
        <div class="text-h6">Edit Provider</div>
      </q-card-section>
      <q-separator />

      <q-card-section class="q-pt-none">
        <q-form ref="providerForm">
          <div class="row">
            <div class="col-md-6 col-xs-12 q-pa-md">
              <q-input
                outlined
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
        <q-btn class="q-px-md" label="update" @click="btnSave" />
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
        name: '',
        label: ''
      }
    }
  },
  methods: {
    btnSave() {
      // console.log('providerForm', this.providerForm)
      this.$store.dispatch('providers/EDIT_PROVIDER', this.providerForm)
    },
    populateProviderForm() {
      const providerClone = cloneDeep(this.providerDetailsToEdit)
      console.log('providerClone', providerClone)
      this.providerForm.id = providerClone._id;
      this.providerForm.name = providerClone.name;
      this.providerForm.label = providerClone.label;
    }
  }
}
</script>

<style scoped>

</style>

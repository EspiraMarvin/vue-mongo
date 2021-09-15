<template>
  <div style="width: 800px; max-width: 350vw;">
  <q-card>
    <q-toolbar>
      <q-toolbar-title>{{ isEditing ? 'Edit Client' : 'Add Client' }}</q-toolbar-title>
      {{ clientForm }}
<!--      {{ clientDetailsToEdit }}-->
<!--      {{ providerSelection }}-->
<!--      {{ clientForm.providers }}-->
    </q-toolbar>
    <q-separator />
    <q-card-section>
      <q-form ref="clientForm">
        <div class="row">
          <div class="col-md-6 col-xs-12 q-pa-md">
            <q-input
              outlined
              v-model="clientForm.name"
              placeholder="Name *"
              type="text"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Name is missing',
                hasWhiteSpacesOnly
              ]"
            />
          </div>
          <div class="col-md-6 col-xs-12 q-pa-md">
            <q-input
              outlined
              v-model="clientForm.email"
              placeholder="Email *"
              type="email"
              lazy-rules
              :rules="[val => !!val || 'Email is missing', emailFormat]"
            />
          </div>
        </div>
          <div class="col-md-6 col-xs-12 q-pa-md">
          <q-input
            outlined
            v-model="clientForm.phone"
            placeholder="Phone *"
            type="number"
            lazy-rules
            :rules="[val => !!val || 'Phone is missing', phoneValid]"
          />
        </div>
        <div class="row">
          <div class="col-md-8 col-xs-12 q-pa-md">
            <q-input
              outlined
              v-model="providerForm.name"
              placeholder="Providers *"
              type="text"
              lazy-rules
            />
<!--            <q-select-->
<!--              multiple-->
<!--              filled-->
<!--              v-model="clientForm.providers"-->
<!--              :options="providers"-->
<!--              :label="Providers"-->
<!--            />-->
          </div>
          <div class="col-md-4 col-xs-12 q-pa-md">
            <q-btn
              size="md"
              class="q-pa-sm full-width text-capitalize"
              lable="Add Provider"
              @click="btnAddProvider"
              label="Add Provider"
            />
          </div>
        </div>

        <!--    providers-->
        <div class="row">
         <div class="col-md-8 col-xs-12 q-pa-md">
           <q-card>
              <q-list>
                  <q-item v-for="provider in providers" :key="provider._id">
                  <q-item-section>
                    <q-checkbox
                      v-model="clientForm.providers" :val="provider._id" :label="provider.name" color="primary"
                    />
                  </q-item-section>
                    <q-item-section class="text-right">
                      <span>
                        <q-btn
                          class="q-ma-xs"
                          outline
                          size="sm"
                         color="positive"
                          icon="edit"
                          @click="editProvider(provider) === true"
                         />
                        <q-btn
                          class="q-ma-xs"
                         outline
                          size="sm"
                          @click="btnDelete(props.row)"
                          color="negative"
                          icon="delete"
                         />
                      </span>
                    </q-item-section>
                  </q-item>
              </q-list>
            </q-card>
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        size="md"
        class="q-pl-md q-pr-md q-mr-md text-black text-capitalize"
        label="Cancel"
        v-close-popup
      />
      <q-btn
        size="md"
        class="q-pl-md q-pr-md text-capitalize"
        :loading="submitting"
        :disable="submitting"
        @click="btnSave"
        :label="isEditing ? 'Save Client' : 'Add Client'"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </q-card-actions>
  </q-card>

  <q-dialog v-model="AddEditProviderDialog">
    <EditProvider
      :providerDetailsToEdit="providerDetailsToEdit"
    />
  </q-dialog>

  </div>
</template>

<script>
import utils from 'src/helpers/utils';
import {cloneDeep, isEqual} from 'lodash'
import EditProvider from "components/EditProvider";
export default {
  name: 'AddEditClient',
  components: {EditProvider},
  props: {
    isEditing: {
      type: Boolean,
      required: true
    },
    clientDetailsToEdit: {
      type: Object,
      required: false,
      default: () => {}
    },
    providers: {
      type: Array,
      required: false
    }
  },
  computed: {
    // isDisabled(){
      // return !isEqual(this.providerSelection, this.clientForm.providers)
    // }
  },
  data() {
    return {
      model: null,
      isEqual: isEqual,
      AddEditProviderDialog: false,
      ...utils,
      clientForm: {
        id: '',
        name: 'marvin',
        email: 'marvin@gmail.com',
        phone: '12025886500',
        providers: []
      },
      providerForm: {
        name: ''
      },
      providerDetailsToEdit: {},
      providerSelection: [],
      submitting: false,
    };
  },
  mounted() {
    this.populateForm();
    console.log('type of providerSelection', typeof this.providerSelection)
    console.log('type of clientForm.providers', typeof this.clientForm.providers)
  },
  methods: {
    btnAddProvider() {
      // this.clientForm.providers = this.providerSelection
    },
    editProvider(provider) {
      this.AddEditProviderDialog = true
      this.providerDetailsToEdit = provider
    },
    btnSave() {
      console.log('this.form', this.clientForm)
      this.$refs.clientForm.validate().then(success => {
        if (success) {
          console.log('client added provider', this.clientForm.providers)
          console.log('client added', this.clientForm)
          this.submitting = true;
          if (this.isEditing) {
            this.$store
              .dispatch('clients/EDIT_CLIENT', this.clientForm)
              .then(response => {
                this.$emit('successAddEdit', true);
              })
              .catch(err => {
                this.submitting = false;
                this.showMissingFieldsErrors(this, err);
              });
          } else {
            this.$store
              .dispatch('users/ADD_USER', this.clientForm)
              .then(response => {
                this.$emit('successAddEdit', true);
              })
              .catch(err => {
                this.submitting = false;
                this.showMissingFieldsErrors(this, err);
              });
          }
        } else {
          this.showNotification(this, 'negative', 'Please fill the fields');
        }
      });
    },
    populateForm() {
      if (this.isEditing) {
        const clientClone = cloneDeep(this.clientDetailsToEdit)
        this.clientForm.id = clientClone._id;
        this.clientForm.name = clientClone.name;
        this.clientForm.email = clientClone.email;
        this.clientForm.phone = clientClone.phone;
        this.clientForm.providers = clientClone.providers.map(item => item.id);
        // console.log('clientClone.providers', clientClone.providers)
        // this.providerSelection = this.clientDetailsToEdit.providers
        // this.providerSelection = clientClone.providers
        // console.log('providerSelection', this.providerSelection)

      }
    }
  }
};
</script>

<style scoped></style>

<template>
  <div style="width: 800px; max-width: 350vw;">
  <q-card>
    <q-toolbar>
      <q-toolbar-title class="text-primary toolbar-title">{{ isEditing ? 'Edit Client' : 'Add Client' }}</q-toolbar-title>
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
              type="text" class="name"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Name is missing',hasWhiteSpacesOnly]"
            />
          </div>
          <div class="col-md-6 col-xs-12 q-pa-md">
            <q-input
              outlined
              v-model="clientForm.email"
              placeholder="Email *"
              type="email" class="email"
              lazy-rules
              :rules="[val => !!val || 'Email is missing', emailFormat]"
            />
          </div>
        </div>
          <div class="col-md-6 col-xs-12 q-pa-md">
            <q-form ref="addProviderForm">
              <q-input
                outlined
                v-model="clientForm.phone"
                placeholder="Phone *"
                type="number"
                class="phone"
                lazy-rules
                :rules="[val => !!val || 'Phone is missing', !isEditing  ? phoneValid : '']"
              />
            </q-form>
          </div>

<!--        add provider form-->
         <ProviderForm />

        <!--    providers list-->
        <div class="row">
         <div class="col-md-8 col-xs-12 q-pa-md">
           <q-card>
             <q-scroll-area class="full-width" style="height: 200px">
               <q-input
                 dense
                 borderless
                 debounce="1000"
                 v-model="providerFilter"
                 placeholder="Search..."
                 class="q-ma-sm" clearable
               >
                 <template v-slot:prepend>
                   <q-icon name="search" />
                 </template>
               </q-input>
               <q-separator />
               <q-list class="providers-list">
                  <q-item v-for="provider in providerResultsQuery" :key="provider._id">
                  <q-item-section>
                    <q-checkbox
                      v-model="clientForm.providers" :val="provider._id" :label="provider.name" color="primary" class="checkbox text-capitalize"
                    />
                  </q-item-section>
                    <q-item-section class="text-right">
                      <span>
                        <q-btn
                          class="q-ma-xs edit-provider"
                          outline
                          size="sm"
                         color="positive"
                          icon="edit"
                          @click="btnEditProvider(provider) === true"
                         />
                        <q-btn
                          class="q-ma-xs delete-provider"
                          outline
                          size="sm"
                          @click="confirm(provider)"
                          color="negative"
                          icon="delete"
                         />
                      </span>
                    </q-item-section>
                  </q-item>
              </q-list>
             </q-scroll-area>
            </q-card>
          </div>
        </div>
      </q-form>
    </q-card-section>

    <q-separator />
    <div class="row">
    <q-card-actions align="left">
      <q-btn
        v-if="isEditing"
        size="md"
        class="q-pl-md q-pr-md q-mr-md text-capitalize"
        label="Delete Client"
        color="negative"
        icon-right="delete"
        @click="confirm"
      />
    </q-card-actions>
      <q-space />
    <q-card-actions align="right">
      <q-btn
        class="close-client q-pl-md q-pr-md q-mr-md text-black text-capitalize" size="md"
        label="Cancel" v-close-popup
      />
      <q-btn
        class="submit-client q-pl-md q-pr-md text-capitalize" size="md"
        :loading="submitting" :disable="submitting" @click="btnSave"
        :label="isEditing ? 'Save Client' : 'Add Client'"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </q-card-actions>
    </div>
  </q-card>

  <q-dialog v-model="AddEditProviderDialog">
    <EditProvider
      :providerDetailsToEdit="providerDetailsToEdit"
      :closeEditProviderDialog="closeEditProviderDialog"
    />
  </q-dialog>
  </div>
</template>

<script>
import utils from 'src/helpers/utils';
import {cloneDeep} from 'lodash'
import EditProvider from "components/EditProvider";
import ProviderForm from "components/AddProvider";
export default {
  name: 'AddEditClient',
  components: {ProviderForm, EditProvider},
  props: {
    isEditing: {
      type: Boolean,
      required: true
    },
    clientDetailsToEdit: {
      type: Object,
      required: false,
    },
    providers: {
      type: Array,
      required: false
    },
    closeAddEditClientDialog: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      ...utils,
      clientForm: {
        name: '',
        email: '',
        phone: '',
        providers: []
      },
      providerFilter: '',
      providerDetailsToEdit: {},
      AddEditProviderDialog: false,
      submitting: false
    };
  },
  mounted() {
    this.populateForm();
  },
  computed: {
    providerResultsQuery () {
     return this.providerFilter ?
       this.providers.filter(provider => this.providerFilter.toLowerCase().split(' ').every(v => provider.name.toLowerCase().includes(v)))
       : this.providers
    }
  },
  methods: {
    btnEditProvider(provider) {
      this.AddEditProviderDialog = true
      this.providerDetailsToEdit = provider
    },
    closeEditProviderDialog(){
      this.AddEditProviderDialog = false
    },
    btnSave() {
      this.$refs.clientForm.validate().then(success => {
          if (success) {
            this.submitting = true;
            if (this.isEditing) {
              this.$store
                .dispatch('clients/EDIT_CLIENT', this.clientForm)
                .then(response => {
                  this.submitting = false;
                  this.closeAddEditClientDialog()
                  this.showNotification(this, 'Client Updated', 'primary', 'check_circle');
                })
                .catch(error => {
                  this.submitting = false;
                  this.showErrorNotification(this, error)
                })
            } else {
              this.$store
                .dispatch('clients/ADD_CLIENT', this.clientForm)
                .then(response => {
                  this.submitting = false;
                  this.closeAddEditClientDialog()
                  this.showNotification(this, 'Client Added', 'primary', 'check_circle');
                })
                .catch(error => {
                  this.submitting = false;
                  this.showErrorNotification(this, error)
                });
            }
          } else {
            this.showNotification(this, 'Please fill the fields', 'red-5', 'warning');
          }
      })
    },
    confirm (item) {
      item = item['name'] ? item : item = this.clientForm
      const itemTitle = item['name'] ? item['name'] : ''
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you use you want to delete ${itemTitle}?`,
        cancel: true, persistent: true
      }).onOk(() => {
        if (!item['email']){
          // delete provider
          this.$store.dispatch('providers/DELETE_PROVIDER', item)
            .then(response => this.showNotification(this, 'Provider Deleted', 'primary','check_circle'))
            .catch(error => this.showNotification(this, `${error.message}`,'red-5','warning'))
        }else {
          this.$store.dispatch('clients/DELETE_CLIENT', item)
            .then(response => {
              this.closeAddEditClientDialog()
              this.showNotification(this, 'Client Deleted', 'primary','check_circle');
            }).catch(error => this.showNotification(this, `${error.message}`,'red-5','warning'))
        }
      })
    },
    populateForm() {
      if (this.isEditing) {
        const clientClone = cloneDeep(this.clientDetailsToEdit)
        this.clientForm.id = clientClone._id;
        this.clientForm.name = clientClone.name;
        this.clientForm.email = clientClone.email;
        this.clientForm.phone = clientClone.phone;
        this.clientForm.providers = clientClone.providers.map(item => item.id);
      }
    }
  }
};
</script>

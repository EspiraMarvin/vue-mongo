<template>
  <div style="width: 800px; max-width: 350vw;">
  <q-card>
    <q-toolbar>
      <q-toolbar-title class="text-primary">{{ isEditing ? 'Edit Client' : 'Add Client' }}</q-toolbar-title>
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
            <q-form ref="addProviderForm">
              <q-input
                outlined
                v-model="clientForm.phone"
                placeholder="Phone *"
                type="number"
                lazy-rules
                :rules="[val => !!val || 'Phone is missing', phoneValid]"
              />
            </q-form>
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
          </div>
          <div class="col-md-4 col-xs-12 q-pa-md">
            <q-btn
              size="md"
              class="q-pa-sm full-width text-capitalize"
              @click="btnAddProvider"
              label="Add Provider"
              :loading="submittingProviders"
              :disable="isDisabled"
            />
          </div>
        </div>

        <!--    providers-->
        <div class="row">
         <div class="col-md-8 col-xs-12 q-pa-md">
           <q-card>
             <q-scroll-area class="full-width" style="height: 200px">
               <q-list>
                  <q-item v-for="provider in providers" :key="provider._id">
                  <q-item-section>
                    <q-checkbox
                      v-model="clientForm.providers" :val="provider._id" :label="provider.name" color="primary" class="text-capitalize"
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
                          @click="btnEditProvider(provider) === true"
                         />
                        <q-btn
                          class="q-ma-xs"
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
    </div>
  </q-card>

  <q-dialog v-model="AddEditProviderDialog">
    <EditProvider
      :providerDetailsToEdit="providerDetailsToEdit"
      :closeEditProviderDialog="closeEditProviderDialog"
      :closeAddEditClientDialog="closeAddEditClientDialog"
      :confirm="confirm"
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
      providerForm: {
        name: ''
      },
      isEqual: isEqual,
      providerDetailsToEdit: {},
      AddEditProviderDialog: false,
      submitting: false,
      submittingProviders: false
    };
  },
  mounted() {
    this.populateForm();
  },
  computed: {
    isDisabled() {
      return !this.providerForm.name.replace(/\s/g, '').length
    }
  },
  methods: {
    btnAddProvider() {
      this.submittingProviders = true
        this.$store.dispatch('providers/ADD_PROVIDER', this.providerForm)
          .then(response => {
            this.submittingProviders = false
              this.providerForm.name = ''
              this.showNotification(this, 'Provider Added', 'primary','check_circle');
          })
          .catch((error) => {
            this.submittingProviders = false
            this.showNotification(this, `${error}`, 'red-5','error');
          })
    },
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
                this.showNotification(this, 'Client Updated', 'primary','check_circle');
              })
              .catch(error => {
                this.submitting = false;
                this.showNotification(this, `${error.message}`, 'red-5','error');
              });
          } else {
            this.$store
              .dispatch('clients/ADD_CLIENT', this.clientForm)
              .then(response => {
                console.log('add client responseeeeeeeeeee', response)
                this.submitting = false;
                this.closeAddEditClientDialog()
                this.showNotification(this, 'Client Added', 'primary','check_circle');
              })
              .catch(error => {
                this.submitting = false;
                this.showNotification(this, `${error}`, 'red-5','error');
              });
          }
        } else {
          this.showNotification(this, 'Please fill the fields','red-5','warning');
        }
      });
    },
    confirm (item) {
      item = item['name'] ? item : item = this.clientForm
      const itemTitle = item['name'] ? item['name'] : ''
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you use you want to delete ${itemTitle}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        if (!item['email']){
          // delete provider
          this.$store.dispatch('providers/DELETE_PROVIDER', item)
            .then(response => {
              this.showNotification(this, 'Provider Deleted', 'primary','check_circle');
            })
            .catch(error => {
              this.showNotification(this, `${error.message}`,'red-5','warning');
            })
        }else {
          // delete client
          this.$store.dispatch('clients/DELETE_CLIENT', item)
            .then(response => {
              this.closeAddEditClientDialog()
              this.showNotification(this, 'Client Deleted', 'primary','check_circle');
            })
            .catch(error => {
              this.showNotification(this, `${error.message}`,'red-5','warning');
            })
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

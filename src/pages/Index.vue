<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-ma-md">
      List of clients
    </div>
    <q-table
      title="Clients"
      :data="clientsResults"
      :columns="tableHeaders"
      :loading="fetchingClients"
      :filter="filter"
      color="primary"
      row-key="_id"
    >
      <template v-slot:top-right>
        <q-input
          dense
          borderless
          debounce="1000"
          v-model="filter"
          placeholder="Search Clients"
          class="q-ma-sm"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          label="New Client"
          color="primary"
          class="q-ma-md text-white q-pl-md q-pr-md text-capitalize"
          @click="btnAdd"
        />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-capitalize text-black"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <template v-for="col in props.cols">
            <q-td class="text-center" v-if="col.name !== 'actions' && col.name !== 'providers'" :key="col.name">
              {{ props.row[col.name] }}
            </q-td>
            <q-td class="text-center" v-if="col.name === 'providers'" :key="col.name">
                {{ getNames(props.row[col.name]) }}
            </q-td>
            <q-td v-if="col.name === 'actions'" :key="col.name" class="text-center">
              <q-btn
                class="q-ma-xs"
                outline size="sm"
                color="primary"
                icon-right="edit"
                @click="btnEdit(props.row)"
               />
              <q-btn
                class="q-ma-xs"
                outline size="sm"
                color="red-14"
                icon-right="delete"
                @click="btnDelete(props.row)"
              />
            </q-td>
          </template>
        </q-tr>
      </template>
    </q-table>

<!--    dialogs-->
    <q-dialog v-model="AddEditClientDialog">
      <AddEditClient
        :isEditing="isEditing"
        :providers="providersResults"
        :clientDetailsToEdit="clientDetailsToEdit"
        :closeAddEditClientDialog="closeAddEditClientDialog"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import {mapGetters} from 'vuex'
import AddEditClient from "components/AddEditClient";
import utils from "src/helpers/utils";
export default {
  name: 'PageIndex',
  components: {AddEditClient},
  mounted() {
    this.$store.dispatch('providers/FETCH_PROVIDERS')
    this.$store.dispatch('clients/FETCH_CLIENTS')
  },
  data () {
    return {
      ...utils,
      filter: '',
      AddEditClientDialog: false,
      isEditing: false,
      clientDetailsToEdit: []
    }
  },
  methods: {
    getNames(clientProvidersArray) {
      const names = [];
      clientProvidersArray.forEach(item => {
        const resultsIndex = this.providersResults.findIndex(providerItem => providerItem._id === item.id)
        if (resultsIndex >= 0) {
          names.push(this.providersResults[resultsIndex].name)
        }
      })
      return this.providersValuesToString(names)
    },
    providersValuesToString(arr) {
      return arr.reduce((acc, cur, idx) => {
        let comma = (idx < arr.length - 1) ? ", " : ""
        acc = acc + cur + comma;
        return acc;
      }, "")
    },
    btnAdd () {
      this.isEditing = false;
      this.clientDetailsToEdit = {};
      this.AddEditClientDialog = true;
    },
    btnEdit(client) {
      this.isEditing = true;
      this.clientDetailsToEdit = client
      this.AddEditClientDialog = true;
    },
    btnDelete(client) {
      console.log('client', client)
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you use you want to delete ${client['name']}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
          // delete client
        this.$store.dispatch('clients/DELETE_CLIENT', client)
          .then(response => {
            this.showNotification(this, 'Client Deleted', 'primary','check_circle');
          })
          .catch(error => {
            this.showNotification(this, `${error.message}`,'red-5','warning');
          })
      })
    },
    closeAddEditClientDialog() {
      this.AddEditClientDialog = false;
    }
  },
  computed: {
    ...mapGetters({
      fetchingClients: 'clients/GET_FETCHING_CLIENTS',
      clientsResults: 'clients/GET_CLIENTS',
      providersResults: 'providers/GET_PROVIDERS'
    }),
    tableHeaders() {
      let columnObjects = []
      if (this.clientsResults && this.clientsResults.length) {
        let firstValue = this.clientsResults[0]
        let headerArray = Object.keys(firstValue);
        headerArray.map(header => {
          if (header !== '_id' && header !== 'date' && header !== '__v') {
            let obj1 = {
              name: header,
              sortable: true,
              label: header,
              field: header,
              headerClasses: 'bg-grey-3',
              align: 'center'
            }
            columnObjects.push(obj1);
          }
        })
        columnObjects.push({
          name: 'actions',
          sortable: false,
          label: 'Actions',
          field: 'actions',
          headerClasses: 'bg-grey-3',
          align: 'center'
        });
      }
      return columnObjects
    }
  }
}
</script>

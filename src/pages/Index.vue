<template>
  <q-page class="q-pa-md q-mt-xl">
    <div class="text-h6 q-ma-md">
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
          placeholder="Search..."
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
                {{ getProvidersValues(props.row[col.name]) }}
            </q-td>
            <q-td v-if="col.name === 'actions'" :key="col.name" class="text-center">
              <q-btn
                class="q-ma-xs"
                outline
                color="positive"
                icon="edit"
                @click="btnEdit(props.row)"
              ></q-btn>
              <q-btn
                class="q-ma-xs"
                outline
                @click="btnDelete(props.row)"
                color="negative"
                icon="delete"
              ></q-btn>
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
      />
    </q-dialog>
  </q-page>
</template>

<script>
import {mapGetters} from 'vuex'
import AddEditClient from "components/AddEditClient";

export default {
  name: 'PageIndex',
  components: {AddEditClient},
  mounted() {
    this.$store.dispatch('providers/FETCH_PROVIDERS')
    this.$store.dispatch('clients/FETCH_CLIENTS')
  },
  methods: {
    getProvidersValues(clientArr) {
      return clientArr.map((array1value, index) => {
        // if (array1value) return array1value['name']
        // if (index) return
        return this.providersResults[index]
      })
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
      console.log('edit', client)
      this.isEditing = true;
      this.clientDetailsToEdit = client
      this.AddEditClientDialog = true;
    },
    btnDelete(item) {
      console.log('delete', item._id)
    }
  },
  data () {
    return {
      filter: '',
      AddEditClientDialog: false,
      isEditing: false,
      confirm: false,
      clientDetailsToEdit: []
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
              sortable: false,
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
  },
}
</script>

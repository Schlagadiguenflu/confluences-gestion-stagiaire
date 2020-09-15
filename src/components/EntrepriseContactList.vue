<template>
  <v-card class="mx-auto" outlined>
    <v-list>
      <v-subheader>
        Contacts
        <v-spacer></v-spacer>
        <CreateContact :typeEntrepriseId="entreprise.entrepriseId" />
      </v-subheader>
      <v-simple-table v-if="entreprise.contacts.length > 0">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Nom</th>
              <th class="text-left">Fonction</th>
              <th class="text-left">Email</th>
              <th class="text-left">TelFixe</th>
              <th class="text-left">Natel</th>
              <th class="text-left">Actions</th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in entreprise.contacts" :key="i">
              <td>
                {{ item.prenom }}
                {{ item.nom }}
              </td>
              <td>{{ item.fonction }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.telFix }}</td>
              <td>{{ item.natel }}</td>
              <td>
                <EditContact :contact="JSON.parse(JSON.stringify(item))" />
              </td>
              <td>
                <v-icon color="red" @click="deleteContact(item.contactId)">
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-list>
  </v-card>
</template>

<script>
import store from '@/store/index.js'
import NProgress from 'nprogress'
import CreateContact from '@/components/CreateContact.vue'
import EditContact from '@/components/EditContact.vue'

export default {
  props: {
    entreprise: {
      type: Object,
      required: true
    }
  },

  components: {
    CreateContact,
    EditContact
  },

  methods: {
    deleteContact(contactId) {
      NProgress.start()
      store
        .dispatch('contact/deleteContact', {
          contactId
        })
        .then(() => {
          store.dispatch('entreprise/deleteContact', contactId)
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>

<style></style>

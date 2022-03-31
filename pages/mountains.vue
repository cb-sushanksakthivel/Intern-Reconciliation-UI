<template>
  <div>
    <p v-if="$fetchState.pending">Fetching mountains...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <h1>Nuxt Mismatched</h1>
        <v-simple-table class="border-separate border border-slate-500 ...">
            <thead>
                <tr>
                    <th class="border border-slate-600 ...">Id</th>
                    <th class="border border-slate-600 ...">Type</th>
                    <th class="border border-slate-600 ...">Issue</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="mountain in mountains.mismatched">
                    <td class="border border-slate-700 ...">{{mountain.id}}</td>
                    <td class="border border-slate-700 ...">{{mountain.transactionType}}</td>
                    <td class="border border-slate-700 ...">{{mountain.issues}}</td>
                </tr>
            </tbody>
        </v-simple-table>
      <button @click="$fetch">Refresh</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      this.mountains = await fetch(
        'http://localhost:8080/api/v1/reconciliation/mismatched'
      ).then(res => res.json())
    }
  }
</script>
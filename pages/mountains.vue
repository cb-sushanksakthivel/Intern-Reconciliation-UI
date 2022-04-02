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
            <tbody v-if="mountains.length!=0">
                <tr v-for="mountain in mountains.data.mismatched">
                    <td class="border border-slate-700 ...">{{mountain.id}}</td>
                    <td class="border border-slate-700 ...">{{mountain.transactionType}}</td>
                    <td class="border border-slate-700 ...">{{mountain.issues}}</td>
                </tr>
            </tbody>
            <tbody v-else>
              <h1>No data Available</h1>
            </tbody>
        </v-simple-table>
      <button @click="$fetch">Refresh</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
   jobId: String
 },
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      // get request
      if(this.jobId!=""){
      this.mountains = await this.$axios.get('/api/v1/job/4e4009e6-175b-472d-92b6-194d5c76866f')
      console.log(this.mountains);
      }
      console.log(this.jobId);
    }
  }
</script>
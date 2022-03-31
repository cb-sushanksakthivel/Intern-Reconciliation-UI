<template>
  <div>
    <p v-if="$fetchState.pending">Fetching mountains...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <h1>Nuxt Mountains</h1>
        <table class="border-separate border border-slate-500 ...">
            <thead>
                <tr>
                    <th class="border border-slate-600 ...">Name</th>
                    <th class="border border-slate-600 ...">Email</th>
                    <th class="border border-slate-600 ...">Role</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="mountain in mountains">
                    <td class="border border-slate-700 ...">{{mountain.title}}</td>
                    <td class="border border-slate-700 ...">{{mountain.height}}</td>
                    <td class="border border-slate-700 ...">{{mountain.continent}}</td>
                </tr>
            </tbody>
        </table>
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
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
    }
  }
</script>
<template>
  <div>
    <div justify="center" style="display:flex;">
      <v-flex lg3 sm6 xs12>
        <card
          icon="mdi-bookmark-check"
          :title=cardmatches
          sub-title="Matches"
          color="green">
        </card>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <card
          icon="mdi-bookmark-remove"
          :title=cardmismatches
          sub-title="Mismatches"
          color="red">
        </card>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <card
          icon="mdi-exclamation"
          :title=cardpercentage
          sub-title="Mismatch Rate"
          color="purple">
        </card>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <card
          icon="mdi-account"
          :title=cardcbdomain
          sub-title="Merchant"
          color="orange">
        </card>
      </v-flex>
    </div>
    <br>
    <div justify="center" style="display:flex;">
      <v-flex lg3 sm6 xs12>
        <card
          icon="mdi-cash-multiple"
          :title=cardtotalamount
          sub-title="Net Total"
          color="brown">
        </card>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <card
          icon="mdi-cash-multiple"
          :title=cardtotalgatewayfee
          sub-title="Total Gateway Fee"
          color="blue">
        </card>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <card
          icon="mdi-cash-multiple"
          :title=cardtotalcustomerpaid
          sub-title="Total Amount"
          color="teal">
        </card>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <card
          icon="mdi-cash-multiple"
          :title=cardfreqcurrency
          sub-title="Frequent Currency"
          color="cyan">
        </card>
      </v-flex>
    </div>
    <br>
    <div>
      <v-card>
        <v-card-title>
          Mismatched Data
          <v-spacer></v-spacer>
          <v-text-field
            v-model=search
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers=headers
          :items=mismatchdata
          :search=search
        ></v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import card from '../components/card.vue'

export default {
  components: { card},
  name: 'Recondata',
  props:{
    cardmatches:String,
    cardmismatches:String,
    cardpercentage:String,
    cardcbdomain:String,
    cardtotalamount:String,
    cardtotalgatewayfee:String,
    cardtotalcustomerpaid:String,
    cardfreqcurrency:String,
    search:String,
    mismatchdata:Array,
  },
  data:() =>({
    headers: [
      { text: 'Name', align: 'start', value: 'name' },
      { text: 'Date', value: 'date' },
      { text: 'Transaction Type', value: 'transactionType' },
      { text: 'Currency Code', value: 'currencyCode' },
      { text: 'Gateway', value: 'gateWay' },
      { text: 'Payment Method', value: 'paymentMethod' },
      { text: 'Amount', value: 'actualamount' },
      { text: 'Gateway Fee', value: 'gatewayFee'},
      { text: 'Total Amount', value: 'amount' },
      { text: 'Issue', value: 'issues' }
    ],
  }),
}
</script>

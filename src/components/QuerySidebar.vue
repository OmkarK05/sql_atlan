<template lang="">
  <div class="px-3">
    <div class="query-selector">
      <v-col
        class="d-flex"
        cols="12"
      >
        <v-select
          v-model="selectedQuery"
          :items="getQueries"
          label="Select Query"
          dense
          outlined
          @change="querySelected"
        />
      </v-col>
    </div>
  </div>
</template>
<script>
export default {
    name: 'QuerySidebar',
    data: function (){
        return {
            selectedQuery: '',
            queries: [
                {name: 'categories', label: "Categories"},
                {name: 'customers', label: "Customers"},
                {name: 'employees', label: "Employees"},
                {name: 'orders', label: "Orders"},
                {name: 'products', label: "Products"},
                {name: 'regions', label: "Regions"},
                {name: 'shippers', label: "Shippers"},
                {name: 'suppliers', label: "Suppliers"},

            ],
            selectedQueryData: null
        }
    },
    computed: {
        getQueries: function (){
            return this.queries.map(query => query['label'])
        },
        getSelectedQueryCsv: function() {
          return this.queries.find((query) => query['label'] === this.selectedQuery)['name'];
        } 
    },
    methods: {
      querySelected: function () {
        console.log(this.getSelectedQueryCsv);
        try{
          this.selectedQueryData = require(`./../assets/json/${this.getSelectedQueryCsv}.json`);
          console.log(this.selectedQueryData);
        }catch (error){
          console.log(error);
        }
      }
    }
}
</script>
<style lang="scss" scoped>
    .query-selector{
        .query-selector-menu{
            width: 100%;
        }
    }
</style>
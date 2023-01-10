<template lang="">
  <div class="px-3 py-3">
    <div class="__title primary--text">
      Analytics 
    </div>
    <!-- <div class="query-selector">
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
    </div> -->
    <div class="tabs-container">
      <div
        v-for="tab in tabs"
        :key="tab['name']"
        class="__tab"
        :class="tab['active'] ? 'active': ''"
        @click="switchTab(tab)"
      >
        <SvgLoader
          width="18"
          height="18"
          :icon-name="tab['label']"
          :color="tab['active'] ? '#ffffff': '#6c00ff'"
          class="mr-2"
        >
          <component :is="tab['icon']" />
        </SvgLoader>
        {{ tab['label'] }}
      </div>
    </div>
  </div>
</template>
<script>
import SvgLoader from './helpers/SvgLoader.vue';

export default {
    name: 'QuerySidebar',
    components: {SvgLoader},
    props: {
      tabs: {
        type: Array,
        default: () => []
      }
    },
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
            selectedQueryData: null,
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
      },
      switchTab: function (tab) {
        this.$emit('switch-tab', tab)
      }
    }
}
</script>
<style lang="scss" scoped>
    .__title{
      font-size: 24px;
      color: rgba(var(--secondary), 1);
      text-align: left;
      margin-bottom: 20px;
    }
    .tabs-container{
      .__tab{
        width: 100%;
        padding: 8px 8px;
        cursor: pointer;
        border-radius: 4px;
        display: flex;
        align-items: center;
        margin: 4px 0;

        &.active{
          color: #ffffff;
          background-color: rgba(var(--primary), 1) !important
        }
      
        &:hover{
          background-color: rgba(var(--secondary), 0.2);
        }
      }
    }
</style>
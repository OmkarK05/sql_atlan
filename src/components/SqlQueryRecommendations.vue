<template lang="">
  <div class="recommendations-container">
    <div
      v-for="recommendation in recommendations"
      :id="`recommendation-${recommendation['id']}`"
      :key="recommendation['id']"
    >
      <div
        :title="recommendation['query']"
        class="text-left __recommendation"
        @click="selectQuery(recommendation)"
      >
        {{ recommendation['label'] }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'SqlQueryRecommendations',
    props: {
        recommendations: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        selectQuery: function (query) {
            this.$emit('select', query)
        }
    }
}
</script>
<style scoped lang="scss">
    .recommendations-container{
        position: absolute;
        width: 100%;
        box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
        background: #ffffff;
        z-index: 99;
        padding: 8px;
        border-radius: 4px;

        .__recommendation{
            cursor: pointer;
            padding: 8px;
            border-radius: 4px;

            &:hover{
                background-color: rgba(var(--secondary), 0.2);
            }
        }
    }
</style>
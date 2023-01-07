<template>
  <div>
    <div className="table-container">
      <table
        id="app-table"
        className="app-table"
      >
        <thead
          id="table-header"
          className="table-header"
        >
          <tr>
            <th
              v-for="(header, index) in tableData"
              :key="`table-header-${header['label']}`"
              className="table-header-cell bg-primary text-white"
            >
              <div className="d-flex align-items-center">
                <p className="table-header-cell-title mb-0 font-medium">
                  {header["label"]}
                </p>
                <div
                  id="app-table-sorting-icon"
                  className="table-column-sorting-icon"
                >
                  <img
                    id="app-table-sort-ascending-icon"
                    title="Sort Ascending"
                    alt="Arrow up"
                    class="arrow-up"
                    :src="arrowUp"
                    @click="() => sortTable('ascending', index)"
                  >
                  <img
                    id="app-table-sort-descending-icon"
                    title="Sort Descending"
                    alt="Arrow Down"
                    className="arrow-down"
                    src="{arrowDown}"
                    @click="() => sortTable('descending', index)"
                  >
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody
          id="table-body"
          className="table-body"
        >
          <tr
            v-for="(row, index) in paginatedRows"
            id="table-body-row"
            :key="`table-body-row-${row['abbrevation']}-${index}`"
            className="table-body-row"
            onClick="() => handleRowClick(row)"
          >
            <td
              v-for="cell in row['cells']"
              :key="`table-body-cell-${row['id']}-${cell['value']}`"
              className="table-body-cell bg-tertiary font-medium"
            >
              { cell["value"] }
            </td>
          </tr>
        </tbody>
      </table>)
    </div>
    <div
      v-if="tableData && tableData['pagination']"
      className="mt-3 d-flex justify-content-end align-items-center"
    >
      <Button
        id="app-table-pagination-previous-button"
        size="sm"
        class-name="p-1"
        disabled="{disablePrev}"
        @click="() => handlePagination('prev')"
      >
        <img
          className="arrow-left"
          alt="Previous"
          src="{arrowLeft}"
        >
      </Button>
      <span id="app-table-pagination-text">
        <span className="mx-2 text-bold">{currentPage}</span> 
        <span className="mx-1">in</span> 
        <span className="mx-2 text-bold">{table["pagination"]["total_pages"]}</span> 
      </span>
      <Button
        id="app-table-pagination-next-button"
        size="sm"
        class-name="p-1"
        disabled="{disableNext}"
        @click="() => handlePagination('next')"
      >
        <img
          className="arrow-right"
          alt="Next"
          src="{arrowRight}"
        >
      </Button>
    </div>
  </div>
</template>
<script>
export default {
    name: 'AppTable',
    props: {
        table: {
            type: Object,
            default: null,
        }
    },
    data: function () {
        return {
            paginatedRows: null,
            tableData: null,
            currentPage: 1,
        }
    },
    beforeMount: function() {
        this.tableData = this.deepCopy(this.table)
    },
    methods: {

    }
}
</script>
<style lang="">
    
</style>
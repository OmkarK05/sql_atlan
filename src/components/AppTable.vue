<template>
  <div
    v-if="tableData"
    class="app-table"
  >
    <div class="table-container">
      <table
        id="app-table"
        class="app-table"
      >
        <thead
          id="table-header"
          class="table-header"
        >
          <tr>
            <th
              v-for="(header, index) in tableData['headers']"
              :key="`table-header-${header['label']}`"
              class="table-header-cell"
            >
              <div class="d-flex align-items-center">
                <p class="table-header-cell-title mb-0 font-medium">
                  {{ header["label"] }}
                </p>
                <div
                  id="app-table-sorting-icon"
                  class="table-column-sorting-icon"
                >
                  <SvgLoader
                    id="app-table-sort-ascending-icon"
                    class="arrow-up"
                    icon-name="Sort Ascending"
                    color="#5F6F94"
                    width="20"
                    height="20"
                    @click.native="sortTable('ascending', index)"
                  >
                    <CaretUp />
                  </SvgLoader>
                  <SvgLoader
                    id="app-table-sort-descending-icon"
                    class="arrow-down"
                    icon-name="Sort Descending"
                    color="#5F6F94"
                    width="20"
                    height="20"
                    @click.native="sortTable('descending', index)"
                  >
                    <CaretDown />
                  </SvgLoader>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody
          id="table-body"
          class="table-body"
        >
          <tr
            v-for="(row, index) in paginatedRows"
            id="table-body-row"
            :key="`table-body-row-${index}`"
            class="table-body-row"
            onClick="() => handleRowClick(row)"
          >
            <td
              v-for="(cell, cellIndex) in row['cells']"
              :key="`table-body-cell-${cell['value']}-${cellIndex}`"
              class="table-body-cell bg-tertiary font-medium"
            >
              {{ cell["value"] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="tableData && tableData['pagination'] && false"
      class="mt-3 d-flex justify-content-end align-items-center"
    >
      <Button
        id="app-table-pagination-previous-button"
        size="sm"
        class-name="p-1"
        disabled="{disablePrev}"
        @click="() => handlePagination('prev')"
      >
        <img
          class="arrow-left"
          alt="Previous"
          src="{arrowLeft}"
        >
      </Button>
      <span id="app-table-pagination-text">
        <span class="mx-2 text-bold">{currentPage}</span> 
        <span class="mx-1">in</span> 
        <span class="mx-2 text-bold">{table["pagination"]["total_pages"]}</span> 
      </span>
      <Button
        id="app-table-pagination-next-button"
        size="sm"
        class-name="p-1"
        disabled="{disableNext}"
        @click="() => handlePagination('next')"
      >
        <img
          class="arrow-right"
          alt="Next"
          src="{arrowRight}"
        >
      </Button>
    </div>
  </div>
</template>
<script>
import arrowUp from '../assets/icons/caret-up-fill.svg';
import arrowDown from '../assets/icons/caret-down-fill.svg'
import SvgLoader from './helpers/SvgLoader.vue';
import CaretUp from './svgs/CaretUp.vue'
import CaretDown from './svgs/CaretDown.vue'

export default {
    name: "AppTable",
    components: { SvgLoader, CaretDown, CaretUp },
    props: {
        table: {
            type: Object,
            default: null,
        },
        pagination: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            paginatedRows: null,
            tableData: null,
            currentPage: 1,
            arrowUp: arrowUp,
            arrowDown: arrowDown,
        };
    },
    watch: {
        table: function () {
            this.setupTable();
        }
    },
    beforeMount() {
        console.log(this.table);
        this.setupTable();
    },
    methods: {
        setupTable: function () {
            console.log("setup", this.table);
            this.tableData = this.deepCopy(this.table);
            if (this.table && this.table.body) {
                this.paginatedRows = this.getPaginatedRows(this.tableData["body"], this.currentPage);
            }
        },
        getPaginatedRows: function (rows, pageNumber) {
            if (!this.pagination)
                return rows;
            return rows.slice((pageNumber - 1) * 7, pageNumber * 7);
        },
        sortTable : function (sortBy, headerIndex) {
          console.log(sortBy, headerIndex)
          const updateTable = this.deepCopy(this.table.body).sort((a, b) => {
            if(typeof a["cells"][headerIndex]["value"] === 'number' && typeof b["cells"][headerIndex]["value"] === 'number'){
              if(sortBy === "ascending") return a["cells"][headerIndex]["value"] - b["cells"][headerIndex]["value"];
              if(sortBy === "descending") return b["cells"][headerIndex]["value"] - a["cells"][headerIndex]["value"];
            } else {
              if(sortBy === "ascending") return a["cells"][headerIndex]["value"].localeCompare(b["cells"][headerIndex]["value"]);
              if(sortBy === "descending") return b["cells"][headerIndex]["value"].localeCompare(a["cells"][headerIndex]["value"]);
            }
          });
          this.tableData['body'] = this.deepCopy(updateTable);
          this.paginatedRows = this.getPaginatedRows(updateTable, this.currentPage);
        }
    }
}
</script>
<style lang="scss" scoped>
.app-table{
  min-width: 100%;
  margin: 0 auto;
  table-layout: fixed;
  border-collapse: collapse;

  table, th, td {
    border: 1px solid rgba(var(--secondary), 0.2);
  }

  .table-header{
      .table-header-cell{
          padding: 10px 8px;
          font-weight: normal;
          min-width: 150px;
          background-color: rgba(var(--secondary), 0.2);
      }

      .table-header-cell-title {
          width: calc(100% - 20px);
      }

      .table-column-sorting-icon{
          width: 12px;
          height: 24px;
          display: flex;
          flex-direction: column;

          .arrow-up, .arrow-down{
              height: 12px;
              width: 12px;
              cursor: pointer;

              &:hover{
                  opacity: 0.6;
              }
          }
      }
  }

  .table-body{
      .table-body-row{
          cursor: pointer;

          &:hover{
              .table-body-cell{
                  background-color: var(--secondary) !important;
              }
          }

          .table-body-cell{
              padding: 2px 8px;
              font-weight: normal;
          }
      }

  }
}

.table-container{
  max-height: calc(100vh - 300px);
  overflow: auto;
}


.arrow-right, .arrow-left{
  width: 20px;
  height: 20px;
  cursor: pointer;
}

</style>
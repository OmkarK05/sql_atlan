module.exports = {
  dataSet: {
    name: "orders",
    label: "Orders",
    id: 10,
    columns: {
      measures: [
        {
          name: "orderID",
          column_id: 1,
          label: "orderID",
          data_type: "numeric",
        },
        {
          name: "freight",
          column_id: 2,
          label: "freight",
          data_type: "numeric",
        },
        {
          name: "unitPrice",
          column_id: 3,
          label: "unitPrice",
          data_type: "numeric",
        },
        {
          name: "quantity",
          column_id: 4,
          label: "quantity",
          data_type: "numeric",
        },
        {
          name: "discount",
          column_id: 5,
          label: "discount",
          data_type: "numeric",
        },
      ],
      dimensions: [
        {
          name: "city",
          column_id: 6,
          label: "city",
          data_type: "text",
        },
        {
          name: "city",
          column_id: 7,
          label: "city",
          data_type: "text",
        },
        {
          name: "country",
          column_id: 8,
          label: "country",
          data_type: "text",
        },
      ],
      date: [],
    },
    format: "json",
    description: "This table contains data related to food orders",
    row_count: 830,
    column_count: 8,
    created: "Sat Jan 7 2023 10:38:20",
    modified: "Tue Jan 10 2023 11:38:20",
    data_source: {
      name: "Sample Food Data",
      id: 1,
      source: "snowflake",
      owner: {
        name: "Omkar Kesarkhane",
        id: 2,
        email: "omkesarkhane@gmail.com",
      },
    },
  },
};

<h3 align="center">SQL queries</h3>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#performance">Prformance</a>
      <ul>
        <li><a href="#before">Before</a></li>
        <li><a href="#after">After Optimization</a></li>
        <li><a href="#optimization-details">Optimization Detail</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Create, design and implement a web-based application capable of running SQL queries and displaying the results of said query. The application must include a space which accepts SQL queries in the form of user inputs, then runs the given query, and displays the result within the application..

#### Features: 

1. 2 tables are available Orders and Products which have in total 5 queries.
2. Select data set from left sidebar and then select query and click Run Query
3. The Result of the query will be shown below.
4. Measures and Dimensions can be toggled to enable/disable them in result.
5. 4 different visualizations are available table, line-chart, bar-chart and horizontal bar chart.
6. Table can be sorted in ascending and descending order by clicking on up and down icons respectively.
7. Chart and Table both can be downloaded

### Built With

- Vue.js 2.6 https://v2.vuejs.org/
- Vuetify https://vuetifyjs.com/en/
- Jest https://jestjs.io/
- Vue-test-utils https://v1.test-utils.vuejs.org/
- Vuex https://vuex.vuejs.org/
- Echarts https://echarts.apache.org/en/index.html
- json2csv https://www.npmjs.com/package/json-2-csv

<!-- GETTING STARTED -->

### Performance
Measured performance and load time of application using Lighthouse.

#### Before
Before optimizing performance score was 72 
1. First Contentful Paint - 0.6s
2. Time to Interactive - 3.1s
3. Largest Contentful Paint - 3.1s
4. Cumulative Layout Shift - 0s
5. Total Blocking Time - 170ms
6. Speed Index - 2.1s

#### After
Performance score after optimization is 99 with below metrics
1. First Contentful Paint - 0.6s
2. Time to Interactive - 0.7s
3. Largest Contentful Paint - 1.0s
4. Cumulative Layout Shift - 0s
5. Total Blocking Time - 50ms
6. Speed Index - 1.2s

#### Optimization Details
1. Lazy-loading :
    Was importing echarts charts library in main.js which was causing issue.
    Moved echart import to AppEcharts component and lazy loaded AppEcharts component
    Lazy loaded QueryCard component which loads table and charts

2. Eliminated render-blocking resources :
    In index.html there were 2 render blocking stylesheet resources of font and icons.
    Improved it by "preload"

3. Loaded query data json on running query

## Getting Started

Follow below steps to setup up project locally

### Prerequisites

1. node >= 14.06
2. npm >= 6.14.6

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/OmkarK05/sql_atlan.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. To start project
   ```sh
   npm run serve
   ```
4. To run unit tests
   ```sh
   npm run test:unit
   ```
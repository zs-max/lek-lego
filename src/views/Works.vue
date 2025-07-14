<template>
  <div class="mywork-container content-container">
    <a-row
      type="flex"
      justify="space-between"
      align="middle"
      class="poster-title"
    >
      <h2>我的作品和模版</h2>
    </a-row>
    <a-tabs >
      <a-tab-pane key="0" tab="我的作品"> </a-tab-pane>
      <a-tab-pane key="1" tab="我的模版"> </a-tab-pane>
    </a-tabs>
    <a-empty >
      <template v-slot:description>
        <span> 还没有任何作品 </span>
      </template>
      <a-button type="primary" size="large"> 创建你的第一个设计 🎉 </a-button>
    </a-empty>

    <!-- <works-list>
    </works-list> -->
    <a-row type="flex" justify="space-between" align="middle">
      <ul class="ant-pagination">
        <li
          class="ant-pagination-prev"
        >
          <a class="ant-pagination-item-link" >
            上一页
          </a>
        </li>
        <li
          v-for="item in 5"
          :key="item"
          class="ant-pagination-item"
        >
          <a >aaaaa</a>
        </li>
        <li
          class="ant-pagination-next"
        >
          <a class="ant-pagination-item-link" >
            下一页
          </a>
        </li>
      </ul>
      <h2>aaaa</h2>
      <a-button
        type="primary"
        size="large"
        >上一页</a-button
      >
      <a-button
        type="primary"
        size="large"
        >下一页</a-button
      >
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
});
</script>

<style>
.mywork-container .ant-input-search {
  width: 30%;
}
.searchResult {
  display: flex;
  align-items: center;
}
#main-chart {
  position: relative;
}
.chart-loading {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>

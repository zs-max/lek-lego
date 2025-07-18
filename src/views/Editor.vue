<template>
  <div class="editor-container">
    <a-modal title="发布成功" width="700px" :footer="null">
      <!-- <publish-form /> -->
    </a-modal>
    <!-- <preview-form></preview-form> -->
    <a-layout>
      <a-layout-header class="header">
        <div class="page-title">
          <router-link to="/">
            <img alt="慕课乐高" src="#" class="logo-img" />
          </router-link>
          <!-- <inline-edit /> -->
        </div>
        <a-menu :selectable="false" theme="dark" mode="horizontal">
          <a-menu-item key="1">
            <a-button type="primary">预览和设置</a-button>
          </a-menu-item>
          <a-menu-item key="2">
            <a-button type="primary">保存</a-button>
          </a-menu-item>
          <a-menu-item key="3">
            <a-button type="primary">发布</a-button>
          </a-menu-item>
          <a-menu-item key="4">
            <!-- <user-profile></user-profile> -->
          </a-menu-item>
        </a-menu>
      </a-layout-header>
    </a-layout>
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          组件列表
          <components-list
              :list="defaultTextTemplates"
              @on-item-click="addItem"
          />
          <img id="test-image" :style="{ width: '300px' }" />
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <!-- <history-area></history-area> -->
          <div class="preview-list" id="canvas-area">
            <edit-wrapper
                v-for="component in components"
                :key="component.id"
                :id="component.id"
                @set-active="setActive"
                :active="component.id === (currentElement && currentElement.id)"
            >
              <component :is="component.name" v-bind="component.props" />
            </edit-wrapper>
          </div>
        </a-layout-content>``
      </a-layout>
      <a-layout-sider
          width="300"
          style="background: #fff"
          class="settings-panel"
      >
        组件属性
        <props-table v-if="currentElement && currentElement.props" :props="currentElement.props" @change="handleChange"></props-table>
        <pre>
        {{ currentElement && currentElement.props }}
        </pre>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store";
import LText from "@/components/Ltext.vue";
import ComponentsList from "@/components/ComponentsList.vue";
import defaultTextTemplates from "@/defalutTemplates";
import EditWrapper from "@/components/EditWrapper.vue";
import { ComponentData } from "@/store/editor";
import PropsTable from "@/components/PropsTable.vue";

export default defineComponent({
  components: {
    PropsTable,
    LText,
    ComponentsList,
    EditWrapper,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const components = computed(() => store.state.editor.components);
    const currentElement = computed<ComponentData | null>(
        () => store.getters.getCurrentElement
    );
    const addItem = (props: any) => {
      store.commit("addComponent", props);
    };
    const setActive = (id: string) => {
      store.commit("setActive", id);
    };

    const handleChange = (e:any) =>{
      store.commit("updateComponent", e);
    }
    return {
      components,
      defaultTextTemplates,
      addItem,
      setActive,
      currentElement,
      handleChange
    };
  },
});
</script>

<style>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
.page-title {
  display: flex;
}
.page-title .inline-edit span {
  font-weight: 500;
  margin-left: 10px;
  font-size: 16px;
}
.preview-list.canvas-fix .edit-wrapper > * {
  box-shadow: none !important;
}
.preview-list.canvas-fix {
  position: absolute;
  max-height: none;
}
</style>

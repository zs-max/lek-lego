import { Module } from "vuex";
import { GlobalDataProps } from ".";
export interface TemplateProps {
  id: number;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number;
}

const testData: TemplateProps[] = [
  {
    id: 1,
    title: "前端架构师直播海报1",
    author: "136****5632",
    copiedCount: 1923,
    coverImg:
      "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
  },
  {
    id: 2,
    title: "前端架构师直播海报2",
    author: "136****5632",
    copiedCount: 1923,
    coverImg:
      "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
  },
  {
    id: 3,
    title: "前端架构师直播海报3",
    author: "136****5632",
    copiedCount: 1923,
    coverImg:
      "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
  },
  {
    id: 4,
    title: "前端架构师直播海报",
    author: "136****5632",
    copiedCount: 1923,
    coverImg:
      "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
  },
  {
    id: 5,
    title: "前端架构师直播海报",
    author: "136****5632",
    copiedCount: 1923,
    coverImg:
      "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
  },
  {
    id: 6,
    title: "前端架构师直播海报",
    author: "136****5632",
    copiedCount: 1923,
    coverImg:
      "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
  },
];

export interface TemplatesProps {
  data: TemplateProps[];
}

const templates: Module<TemplatesProps,GlobalDataProps> = {
  state: {
    data: testData,
  },
  getters: {
    getTemplateById: (state,getters,rootState) => (id: number) => {
      return state.data.find((t) => t.id === id);
    },
  },
};
export default templates;

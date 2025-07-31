import {shallowMount, mount, VueWrapper} from "@vue/test-utils";
import Uploader from "@/components/Uploader.vue";
import axios from "axios";
import  flushPromises from "flush-promises";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
let wrapper:VueWrapper<any>

// 创建文件
const testFile = new File(['xyz'], 'test.png', {
    type: 'image/png',
})
describe('Uploader Component',()=>{
    beforeAll(()=>{
        wrapper = shallowMount(Uploader,{
            props:{
                action:'test.url'
            }
        })
    })
    it('basic layout behaves as expected',()=>{
        expect(wrapper.find('button').exists()).toBeTruthy()
        expect(wrapper.get('button span').text()).toBe('点击上传')
        expect(wrapper.get('input').isVisible()).toBeFalsy()
    })
    it('upload process should work fine',async ()=>{
        mockedAxios.post.mockResolvedValueOnce({status:'success'})
        // 怎样创建一个文件
        const fileInput = wrapper.get('input').element as HTMLInputElement
        const file = [testFile] as any
        Object.defineProperty(fileInput,'files',{
            value:file,
            writable:false
        })
        await wrapper.get('input').trigger('change')
        // expect(wrapper.get('button span').text()).toBe('正在上传')
        expect(mockedAxios.post).toHaveBeenCalledTimes(1)
        await flushPromises()
        expect(wrapper.get('button span').text()).toBe('上传成功')
    })
    it('should return error test when post is reject', async () => {
        mockedAxios.post.mockRejectedValueOnce({error:'error'})
        await wrapper.get('input').trigger('change')
        expect(mockedAxios.post).toHaveBeenCalledTimes(2)
        // expect(wrapper.get('button span').text()).toBe('正在上传')
        await flushPromises()
        expect(wrapper.get('button span').text()).toBe('上传失败')
    });
})

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

const mockComponent = {
    template:'<div><slot></slot></div>'
}

const mockComponents = {
    "DeleteOutlined":mockComponent;
    "LoadingOutlined":mockComponent;
    "FileOutlined":mockComponent;
}

describe('Uploader Component',()=>{
    beforeAll(()=>{
        wrapper = shallowMount(Uploader,{
            props:{
                action:'test.url'
            },
            global:{
                stubs:mockComponents  // component 是在全局注册的组件 stubs是在组件中注册的组件
            }
        })
    })
    it('basic layout behaves as expected',()=>{
        expect(wrapper.find('button').exists()).toBeTruthy()
        expect(wrapper.get('button span').text()).toBe('点击上传')
        expect(wrapper.get('input').isVisible()).toBeFalsy()
    })
    it.only('upload process should work fine',async ()=>{
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
        // button 为disabled
        console.log(wrapper.get('button').attributes(),9999)
        expect(wrapper.get('button').attributes()).toHaveProperty('disabled')
        // 列表长度修改
        expect(wrapper.get('button span').text()).toBe(1)
        const firstItem = wrapper.get('li:first-child')
        expect(firstItem.classes()).toContain('upload-loading')
        await flushPromises()
        expect(wrapper.get('button span').text()).toBe('点击上传')
        // 有正确的class，并且文件名称相对应
        expect(firstItem.classes()).toContain('upload-success')
        expect(firstItem.get('.filename').text()).toBe(testFile.name)
    })
    it('should return error test when post is reject', async () => {
        mockedAxios.post.mockRejectedValueOnce({error:'error'})
        await wrapper.get('input').trigger('change')
        expect(mockedAxios.post).toHaveBeenCalledTimes(2)
        // expect(wrapper.get('button span').text()).toBe('正在上传')
        await flushPromises()
        expect(wrapper.get('button span').text()).toBe('上传失败')
        // 列表长度增加，列表最后一项有正确的class名称
        expect(wrapper.findAll('li').length).toBe(1)
        const lastItem = wrapper.get('li:last-child')
        expect(lastItem.classes()).toContain('upload-error')
        // 点击列表右侧的button，可以删除这一项
        await lastItem.get('.delete-icon').trigger('click')
        expect(wrapper.findAll('li').length).toBe(1)

    });
    it.only('should show the correct interface when using custom slot',async()=>{
        const wrapper = mount(Uploader,{
            props:{
                action:'test.url'
            },
           slots:{
                default:'<div>自定义内容</div>',
                loading:'<div class="loading">custom loading</div>',
                uploaded:`<template #upload="{uploadedData}">
                             <div class="custom-loadad">{{uploadedData.url}}</div>
                         </template>`
                },
                global:{
                    stubs:mockComponents
                }
        })
    })
})

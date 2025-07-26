import {shallowMount,mount } from "@vue/test-utils";
import HelloWorld from "./HelloWorld.vue";
import Hello from "./Hello.vue";

describe("HelloWorld.vue", () => {
    it("render props.msg when passed", () => {
        const msg = 'new message'
        const wrapper = mount(HelloWorld,{
            props: {
                msg
            }
        });
        // console.log(wrapper.html());
        // console.log(wrapper.get('h1').text());
        console.log(wrapper.find('h1').text()); // 找不到的时候会报错
    });

    // 测试点击button后count是否加1
    it("should update the count when clicking the button", async () => {
        const msg = 'new message'
        const wrapper = shallowMount(HelloWorld,{
            props: {
                msg
            }
        });
        await wrapper.get('button').trigger('click');
        expect(wrapper.get('button').text()).toBe('2');
    })

    // 测试input和button后值变化了没
    it("should add todo when till the input and click the add button", async () => {
        const msg = 'new message'
        const todoContent = 'buy milk'
        const wrapper = shallowMount(HelloWorld,{
            props: {
                msg
            }
        });
        await wrapper.get('input').setValue(todoContent);
        expect(wrapper.get('input').element.value).toBe(todoContent);
        await wrapper.get('.addTodo').trigger('click');
        expect(wrapper.get('li').text())
        expect(wrapper.findAll('li')).toHaveLength(1);
        console.log(wrapper.emitted());
        expect(wrapper.emitted()).toHaveProperty('send')
        const events = wrapper.emitted('send')
        expect(events?.[0]).toEqual([todoContent])
    })
});

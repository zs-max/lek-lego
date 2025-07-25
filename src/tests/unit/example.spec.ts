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
});

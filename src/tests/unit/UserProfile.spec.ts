import {shallowMount, mount, VueWrapper} from "@vue/test-utils";
import UserProfile from "@/components/UserProfile.vue";

let wrapper:VueWrapper<any>

jest.mock('ant-design-vue');
jest.mock('vuex');
jest.mock('vue-router');

const mockComponent = {
    template: '<div><slot></slot></div>'
}

const mockComponent2 = {
    template: '<div><slot></slot><slot name="overlay"></slot></div>'
}
const globalComponents = {
    'a-button': mockComponent,
    'a-menu': mockComponent,
    'a-menu-item': mockComponent,
    'router-link': mockComponent,
    'a-dropdown-button': mockComponent2,
}
describe("UserProfile.vue", () => {
    beforeAll(()=>{
        wrapper = mount(UserProfile,{
            props: {
                user: {
                    isLogin:false
                }
            },
            global: {
                components: globalComponents
            }
        });
    })
    it("should render login button when login is false", () => {
        console.log(wrapper.html())
        expect(wrapper.get('div').text()).toBe('登录')
    })
    it("should render username when login is true", async () => {
      await wrapper.setProps({
            user: {
                isLogin:true,
                userName:'viking'
            }
        })
        console.log(wrapper.html())
        expect(wrapper.get('.user-profile-component').html()).toContain('viking')
        expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy()
    })
    afterAll(()=>{
        wrapper.unmount();
    })
})

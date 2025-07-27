import {shallowMount, mount, VueWrapper} from "@vue/test-utils";
import UserProfile from "@/components/UserProfile.vue";
import { message } from "ant-design-vue";
import store from "@/store/index";

let wrapper:VueWrapper<any>
jest.mock('ant-design-vue',()=>({
   message: {
       success: jest.fn()
    }
}));
// jest.mock('vuex');
const mockedRoutes:string[] = []
jest.mock('vue-router',()=>({
    useRouter: ()=>({
      push:(url:string)=>{
        mockedRoutes.push(url)
      }
    })
}));

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
        jest.useFakeTimers()
        wrapper = mount(UserProfile,{
            props: {
                user: {
                    isLogin:false
                }
            },
            global: {
                components: globalComponents,
                provide: {
                    store
                }
            }
        });
    })
    it("should render login button when login is false", async () => {
        // console.log(wrapper.html())
        const button = wrapper.get('.user-profile-component')
        expect(button.text()).toBe('登录')
        await button.trigger('click')
        // expect(wrapper.get('div').text()).toBe('登录')
        // await wrapper.get('div').trigger('click')
        expect(message.success).toHaveBeenCalled()
        expect(store.state.user.data.userName).toBe('viking')
    })
    it("should render username when login is true", async () => {
      await wrapper.setProps({
            user: {
                isLogin:true,
                userName:'viking'
            }
        })
        // console.log(wrapper.html())
        expect(wrapper.get('.user-profile-component').html()).toContain('viking')
        expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy()
    })

    it('should call logout abd show message,call router.push after timeout',async ()=>{
        await wrapper.get('.user-profile-dropdown .logout').trigger('click')
        expect(store.state.user.isLogin).toBeFalsy()
        expect(message.success).toHaveBeenCalledTimes(1)
        jest.runAllTimers()
        expect(mockedRoutes).toEqual(['/'])
    })

    afterEach( ()=>{
        (message as jest.Mocked<typeof message>).success.mockReset()
    })
})

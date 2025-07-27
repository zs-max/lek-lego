import {mount,VueWrapper} from "@vue/test-utils";
import ColorPicker from "@/components/ColorPicker.vue";

const defaultColors = ['#000000','#ffffff','#ff0000','#00ff00','#0000ff','#00ffff','#ff00ff','#ffff00']
let wrapper:VueWrapper<any>

describe('userProfile component',()=>{
    beforeAll(()=>{
        wrapper = mount(ColorPicker,{
            props:{
                value:'#ffffff'
            }
        })
    })
    it('should render the correct interface', () => {
        // 测试左侧是否为input,类型和值是否正确
        expect(wrapper.find('input').element.type).toBeTruthy()
        const input = wrapper.get('input').element
        expect(input.type).toBe('color')
        expect(input.value).toBe('#ffffff')
        // 测试右侧是否有颜色列表
        expect(wrapper.findAll('.picked-color-list li').length).toBe(defaultColors.length)
        // 检查第一个元素的css backgroundColor属性是否相等对应的颜色
        const firstColor = wrapper.get('li:first-child div').element as HTMLElement
        expect(firstColor.style.backgroundColor).toBe(defaultColors[0])
        // 测试最后一个元素是否有特殊的类名
        const lastColor = wrapper.get('li:last-child div').element as HTMLElement
        expect(lastColor.classList.contains('transparent-back')).toBeTruthy()
    });

    it('should send the correct event when change input', async () => {
        // 测试input修改以后，是否发送和对应的事件和对用的值
        const blackHex = '#000000'
        const input = wrapper.get('input')
        await input.setValue(blackHex)
        expect(wrapper.emitted()).toHaveProperty('change')
        const events = wrapper.emitted('change')
        if (events) {
            expect(events[0]).toEqual([blackHex])
        }
    })

    it('should send the correct event when clicking the color list', async () => {
        // 点击右侧颜色列表，是否发送对应的值
         const firstItem= wrapper.get('li:first-child div')
         firstItem.trigger('click')
         const events = wrapper.emitted('change')
         if (events) {
            expect(events[1]).toEqual([defaultColors[0]])
         }
    })


})

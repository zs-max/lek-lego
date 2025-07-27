import store from '@/store'
import { testData } from '@/store/templates'
import { testComponents,ComponentData } from "@/store/editor";
import { last,clone } from 'lodash-es'
import {TextComponentProps} from "@/defaultProps";

const cloneComponents = clone(testComponents)

describe('store',()=>{
    it('should have tree modules',()=>{
       expect(store.state).toHaveProperty('user')
       expect(store.state).toHaveProperty('editor')
       expect(store.state).toHaveProperty('templates')
    })

    describe('test user module',()=>{
        it('test login mutation',()=>{
             store.commit('login')
            expect(store.state.user.isLogin).toBeTruthy()
        })
        it('test logout mutation',()=>{
            store.commit('logout')
            expect(store.state.user.isLogin).toBeFalsy()
        })
    })

    describe('test templates module',()=>{
        it('should have default templates',()=>{
             expect(store.state.templates.data).toHaveLength(testData.length)
        })
        it('should get the correct template by Id',()=>{
          const selectTemplate = store.getters.getTemplateById(1)
          expect(selectTemplate.title).toBe('前端架构师直播海报1')
        })
    })

    describe('test editor module',()=>{
        it('should have default components',()=>{
            expect(store.state.editor.components).toHaveLength(cloneComponents.length)
        })
        it('should get current component when set active one component',()=>{
            store.commit('setActive',cloneComponents[0].id)
            expect(store.state.editor.currentElement).toBe(cloneComponents[0].id)
            const currentComponent = store.getters.getCurrentElement
            expect(currentComponent.id).toBe(cloneComponents[0].id)
        })
        it('add component should works fine',()=>{
            const payload:Partial<TextComponentProps> = {
                text:'text1'
            }
            store.commit('addComponent',payload)
            expect(store.state.editor.components).toHaveLength(cloneComponents.length+1)
            const lastComponent = last(store.state.editor.components)
            // @ts-ignore
            expect(lastComponent?.props.text).toBe('text1')
        })
        it('update component should works fine',()=>{
            const payload = {
                key:'text',
                value:'update'
            }
            store.commit('updateComponent',payload)
            const currentComponent:ComponentData = store.getters.getCurrentElement
            // @ts-ignore
            expect(currentComponent?.props.text).toBe('update')
        })
    })
})

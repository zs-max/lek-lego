import {TextComponentProps} from "@/defaultProps";
import {VNode,h} from "vue";

export interface PropToForm {
    component:string;
    subComponent?:string;
    extraProps?:{[key:string]:any};
    text?:string;
    options?:{
        text:string|VNode;
        value:any;
    }[];
    initalTransfrom?:(v:any) => any;
    afterTransfrom?:(v:any) => any;
    valueProp?:string;
    eventName?:string;
}

const fontFamilyArr = [
    {value:'SimSun',text:'宋体'},
    {value:'SimHei',text:'黑体'},
    {value:'FangSong',text:'仿宋'},
]

const fontFamilyOptions = fontFamilyArr.map(font=>{
    return {
        value:font.value,
        text:h('span',{style:{fontFamily:font.value}},font.text)
    }
})


export type PropsToForm = {
    [P in keyof TextComponentProps]?:PropToForm
}

export const mapPropsToForms:PropsToForm = {
    text:{
        text:'文本',
        component:'a-textarea',
        extraProps:{
            row:3
        },
        afterTransfrom:(e:any)=>e.target.value
    },
    fontSize:{
         text:'字号',
        component:'a-input-number',
        initalTransfrom:(v:string)=>parseInt(v),
        afterTransfrom:(e:number)=>e ?`${e}px`:''
    },
    lineHeight:{
         text:'行高',
        component:'a-slider',
        extraProps:{ min:0,max:3, step:0.1},
        initalTransfrom:(v:string)=>parseFloat(v),
        afterTransfrom:(e:number)=>e.toString()
    },
    textAlign:{
        component:'a-radio-group',
        subComponent:'a-radio-button',
        text:'对齐',
        options:[
            {value:'left',text:'左'},
            {value:'center',text:'中'},
            {value:'right',text:'右'},
        ],
        afterTransfrom:(e:any)=>e.target.value
    },
    fontFamily:{
        component:'a-select',
        subComponent:'a-select-option',
        text:'字体',
        options:[
            {value:'',text:'无'},
            ...fontFamilyOptions
        ]
    }
}
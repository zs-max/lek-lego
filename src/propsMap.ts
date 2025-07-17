import {TextComponentProps} from "@/defaultProps";


export interface PropToForm {
    component:string;
    value?:string;
    extraProps?:{[key:string]:any};
    text?:string;
    subComponent?:string;
    options?:{
        text:string;
        value:any;
    }[];
    initalTransfrom?:(v:any) => any;
    valueProp?:string;
}

export type PropsToForm = {
    [P in keyof TextComponentProps]?:PropToForm
}

export const mapPropsToForms:PropsToForm = {
    text:{
        text:'文本',
        component:'a-textarea',
        extraProps:{
            row:3
        }
    },
    fontSize:{
         text:'字号',
        component:'a-input-number',
        initalTransfrom:(v:string)=>parseInt(v)
    },
    lineHeight:{
         text:'行高',
        component:'a-slider',
        extraProps:{ min:0,max:3, step:0.1},
        initalTransfrom:(v:string)=>parseFloat(v)
    },
    textAlign:{
        component:'a-radio-group',
        subComponent:'a-radio-button',
        text:'对齐',
        options:[
            {value:'left',text:'左'},
            {value:'center',text:'中'},
            {value:'right',text:'右'},
        ]
    },
    fontFamily:{
        component:'a-select',
        subComponent:'a-select-option',
        text:'字体',
        options:[
            {value:'',text:'无'},
            {value:'宋体',text:'SimSun'},
            {value:'黑体',text:'SimHei'},
            {value:'仿宋',text:'FangSong'},
        ]
    }
}
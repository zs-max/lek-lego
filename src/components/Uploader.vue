<template>
   <div class="file-upload">
     <button @click="triggerUpload" :disabled="isUploading">
       <span v-if="isUploading">正在上传</span>
       <span v-else>点击上传</span>
     </button>
     <input ref="fileInput" type="file" :style="{display:'none'}" @change="onFileChange" />
     <ul>
       <li :class="`upload-file upload-${item.status}`" v-for="item in uploadFiles" :key="item.uid">
         <span class="filename">{{item.name}}</span>
         <button class="delete-icon" @click="removeFile(item.uid)">Del</button>
       </li>
     </ul>
   </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref} from 'vue'
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

type UploadStatus = 'ready'|'loading'|'success'|'error'

export interface UploadFile {
  uid:string;
  size:number;
  name:string;
  status:UploadStatus;
  raw:File;
}
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    }
  },
  setup(props,context){
    const fileInput = ref<null|HTMLInputElement>(null)
    const uploadFiles = ref<UploadFile[]>([])
    const isUploading = computed(()=>uploadFiles.value.some(item=>item.status === 'loading'))

    const removeFile = (uid:string)=>{
      uploadFiles.value = uploadFiles.value.filter(item=>item.uid !== uid)
    }
    const triggerUpload = ()=>{
      fileInput.value?.click()
    }
    const onFileChange = (e:Event)=>{
      const target = e.target as HTMLInputElement
      const files = target.files
      if(files){
        const uploadFile = files[0]
        const formData = new FormData()
        formData.append(uploadFile.name,uploadFile)
        const fileObj = reactive<UploadFile>({
          uid:uuidv4(),
          size:uploadFile.size,
          name:uploadFile.name,
          status:'loading',
          raw:uploadFile
        })
        uploadFiles.value.push(fileObj)
        // 'https://local.test:7001/api/upload's
        axios.post(props.action,formData,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }).then(resp=>{
          fileObj.status = 'success'
        }).catch(e=>{
          fileObj.status = 'error'
        }).finally(()=>{
          if(fileInput.value){
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      fileInput,
      triggerUpload,
      onFileChange,
      isUploading,
      uploadFiles,
      removeFile
    }
  }
})

</script>

<style scoped>
.upload-loading {
  color: yellow;
}
.upload-success{
  color: green;
}
.upload-error {
  color: red;
}

</style>
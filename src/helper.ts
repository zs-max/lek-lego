import { message } from 'ant-design-vue'

type ErrorType = 'size' | 'format' | null
interface CheckCondition {
  format?: string[];
  // 使用多少 M 为单位
  size?: number;
}

export const beforeUploadCheck = (file: File, condition: CheckCondition) => {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? file.size / 1024 / 1024 < size : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}

export const commonUploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
  const { passed, error } = result
  if (error === 'format') {
    message.error('上传图片只能是 JPG/PNG 格式!')
  }
  if (error === 'size') {
    message.error('上传图片大小不能超过 1Mb')
  }
  return passed
}

/**
 * get image naturalWidth and naturalHeight
 * @param file string http url; File image FileObject
 * @returns Promise({ width, height })
 */
export const getImageDimensions = (file: string | File) => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    // debugger
    const img = new Image()
    img.src = typeof file === 'string' ? file : URL.createObjectURL(file)

    img.addEventListener('load', () => {
      const { naturalWidth: width, naturalHeight: height } = img
      resolve({ width, height })
    })
    img.addEventListener('error', (e) => {
      console.error(e)
      reject(new Error('There was some problem with the image'))
    })
  })
}

import { API } from '@/constants/apis'
import { ImagePickerAsset } from 'expo-image-picker'
import { Buffer } from 'buffer'

export async function UploadToS3(picture: ImagePickerAsset): Promise<string> {
  if (!picture.base64) {
    throw new Error('Image base64 not found')
  }
  const res = await fetch(API + '/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fileName: picture.fileName,
      fileType: picture.type
    })
  })

  const { presignedUrl, publicUrl } = await res.json()

  const buffer = Buffer.from(picture.base64, 'base64')

  await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': picture.type || 'image'
    },
    body: buffer
  })

  return publicUrl
}

import { DocumentPickerAsset } from 'expo-document-picker'
import { API } from '@/constants/apis'
import { ImagePickerAsset } from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

type UploadAsset = Partial<ImagePickerAsset | DocumentPickerAsset>

// Type guard to check if the asset is an ImagePickerAsset
function isImagePickerAsset(
  asset: UploadAsset
): asset is Partial<ImagePickerAsset> {
  return 'fileName' in asset || 'width' in asset || 'height' in asset
}

// Type guard to check if the asset is a DocumentPickerAsset
function isDocumentPickerAsset(
  asset: UploadAsset
): asset is Partial<DocumentPickerAsset> {
  return 'name' in asset || 'lastModified' in asset || 'file' in asset
}

export async function UploadToS3(asset: UploadAsset): Promise<string> {
  if (!asset.uri) {
    throw new Error('File URI not found')
  }
  if (!asset.mimeType) {
    throw new Error('Unsupported mimeType')
  }
  let fileName: string | undefined

  // Determine file name and MIME type based on the asset type
  if (isImagePickerAsset(asset)) {
    fileName = asset.fileName || 'image'
  } else if (isDocumentPickerAsset(asset)) {
    fileName = asset.name || 'document'
  } else {
    throw new Error('Unsupported asset type')
  }

  // Fetch the presigned URL and public URL from the server
  const res = await fetch(`${API}/api/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fileName,
      fileType: asset.mimeType
    })
  })

  if (!res.ok) {
    throw new Error(`Failed to get presigned URL: ${res.statusText}`)
  }

  const { presignedUrl, publicUrl } = await res.json()

  // Upload the file using the presigned URL
  const uploadRes = await FileSystem.uploadAsync(presignedUrl, asset.uri, {
    httpMethod: 'PUT',
    headers: {
      'Content-Type': asset.mimeType
    }
  })

  if (uploadRes.status !== 200) {
    throw new Error(`Failed to upload file: ${uploadRes.status}`)
  }

  return publicUrl
}

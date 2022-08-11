import { useViewerRecord } from '@self.id/framework'
import type {
  BasicProfile,
} from '@self.id/framework'
import { useCallback } from 'react'

export function useEditProfile(): [boolean, (profile: BasicProfile) => Promise<void>] {
  const profileRecord = useViewerRecord('basicProfile')

  const editProfile = useCallback(
    async (profile: BasicProfile) => {
      if (!profileRecord.isMutable || profileRecord.isMutating) {
        return
      }

      try {
        await profileRecord.set(profile)
      } catch (error) {
        console.warn('Failed to save profile', error)
      }
    },
    [profileRecord]
  )

  return [profileRecord.isMutating, editProfile]
}
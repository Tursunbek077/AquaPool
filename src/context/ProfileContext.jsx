import { useMemo, useState } from 'react'
import { clearProfile, loadProfile, saveProfile } from '../services/profileService'
import { ProfileContext } from './profileContext'

// Hozirgi mijoz profili. 6-bosqichda AuthContext (login/register) shu o'rinni egallaydi.
export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(loadProfile)

  const value = useMemo(
    () => ({
      profile,
      isSignedIn: Boolean(profile.phone),
      // changes: { name?, phone?, avatar? }. Saqlab bo'lmasa xato tashlaydi.
      save(changes) {
        const next = saveProfile({ ...profile, ...changes })
        setProfile(next)
        return next
      },
      clear() {
        setProfile(clearProfile())
      },
    }),
    [profile],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

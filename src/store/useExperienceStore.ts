import {create} from 'zustand'

type ExperienceState = {
  activeLinkId: string | null
  setActiveLinkId: (id: string | null) => void
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  activeLinkId: null,
  setActiveLinkId: (activeLinkId) => set({activeLinkId}),
}))

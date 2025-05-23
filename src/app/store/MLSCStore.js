import { create } from "zustand";

export const useMLSCStore = create((set) => ({

  sideBarOpen: false,
  setSideBarOpen: (sideBarOpen) => set({ sideBarOpen }),
  
  showMotherBoard: false,
  setShowMotherBoard: (showMotherBoard) => set({ showMotherBoard }),

  cursorHover: false,
  setCursorHover: (cursorHover) => set({ cursorHover }),

  playBGM: true,
  setPlayBGM: (playBGM) => set({ playBGM }),

  teleporting: true,
  setTeleporting: (teleporting) => set({ teleporting }),

  domain: "core",
  setDomain: (domain) => set({ domain }),

  aboutYear: "",
  setAboutYear: (aboutYear) => set({ aboutYear }),

  positionsInAbout: 'gen',
  setPositionsInAbout: (positionsInAbout) => set({ positionsInAbout }),

}));

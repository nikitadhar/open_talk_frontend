// RECOILING
import { atom, } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist({
    key: 'data',
    storage: localStorage
})

export const adminAuthState = atom({
    key: 'admin',
    default: {
        token: null,
        userId: ''
    },
    effects_UNSTABLE: [persistAtom],
})
export const currentRole = atom({
    key: 'role',
    default: {
        role:''
    },
    effects_UNSTABLE: [persistAtom],
})
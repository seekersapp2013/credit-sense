import { Appwrite, Query } from 'appwrite'
// import { state } from './store'

//const profilesCollection = "62638f3d9cd1df31331a";
const profilesCollection = '6277ff5ed3a9aa7e2296'
const CRUD1Collection = '62a868fa5a73811bd81f'
const CRUD2Collection = '62a88531e7c974b9ef2a'
const WalletCollection = '62ac331313ad22a784f6'
const PlanCollection = '62ac78ac6f3fe5c968e7'
const postsCollection = '62638d05e0412d787e21'
const collateralCollection = '62ee180c9601fc050670'
const collateralsCollectionID = '62ecf9c7baeef6981cd5'
const bucketId = 'default'
const defaultBucketID = '62f634020216d281a22f'
const sdk = new Appwrite()

// sdk.setEndpoint('http://45.56.113.128/v1').setProject('6262d69263bdf28f15ce')
sdk.setEndpoint('https://api.startupkits.co/v1').setProject('6262d69263bdf28f15ce')

// sdk.functions.createExecution('', '')

const objectsToString = (data) => {
  return JSON.stringify(data)
}

const stringsToObject = (data) => {
  return JSON.parse(data)
}

const arrayObjectsToString = (data) => {
  return data.map((value) => objectsToString(value))
}

const arrayStringsToObject = (data) => {
  return data.map((value) => stringsToObject(value))
}

export const stringifySubObjects = (input) => {
  let data = { ...input }
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value == 'object') {
      if (Array.isArray(value)) {
        if (typeof value[0] == 'object' && !Array.isArray(value[0])) {
          data[key] = arrayObjectsToString(value)
        }
      } else {
        data[key] = objectsToString(value)
      }
    }
  })
  return data
}

export const objectifySubStrings = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (typeof value[0] === 'string') {
        if (value[0].indexOf('{') === 0) {
          data[key] = arrayStringsToObject(value)
        }
      }
    } else {
      if (typeof value === 'string') {
        if (value.indexOf('{') === 0) {
          data[key] = stringsToObject(value)
        }
      }
    }
  })
  return data
}

export const appwrite = {
  file: {
    new: async (file, id = 'unique()') => sdk.storage.createFile(defaultBucketID, id, file),
  },
  getAccount: async () => sdk.account.get(),
  getAccountAndPlan: async () => {
    try {
      const account = await sdk.account.get()
      let res = await sdk.database.listDocuments(
        PlanCollection,
        [Query.equal('user', account.$id)],
        1,
      )
      if (res.total > 0 && res.documents.length > 0) {
        return { account, plan: res.documents[0] }
      } else {
        let plan = await sdk.database.createDocument(
          PlanCollection,
          'unique()',
          {
            index: 0,
            plan_id: '',
            subscription_date: Date.now(),
            status: 'PAID',
            user: account.$id,
          },
          ['role:all'],
          [`user:${account.$id}`],
        )
        return { account, plan }
      }
    } catch (error) {
      return error
    }
  },
  getToken: async () => {
    const jwtJSON = localStorage.getItem('jwt')
    if (jwtJSON) {
      const { jwt, time } = JSON.parse(jwtJSON)
      console.log('Time Difference: ', time - Date.now())
      const expired = time - Date.now() < 5000
      if (expired) {
        const newJwt = (await sdk.account.createJWT()).jwt
        localStorage.setItem(
          'jwt',
          JSON.stringify({ jwt: newJwt, time: Date.now() + 15 * 60 * 1000 }),
        )
        return newJwt
      } else {
        return jwt
      }
    }
    return ''
  },
  loginWithGoogle: async () => {
    try {
      await sdk.account.createOAuth2Session(
        'google',
        'http://localhost:3001',
        'http://localhost:3001',
      )
    } catch (error) {
      console.log(error)
      return null
      throw error
    }
  },
  login: async (mail, pass) => {
    try {
      await sdk.account.createSession(mail, pass)
      const user = await sdk.account.get()
      localStorage.setItem('user', JSON.stringify(user))

      const { jwt } = await sdk.account.createJWT()
      console.log('jwt: ', jwt)
      localStorage.setItem('jwt', JSON.stringify({ jwt, time: Date.now() + 15 * 60 * 1000 }))

      return user

      // state.update((n) => {
      //   n.user = user
      //   return n
      // })

      //  window.location.href = 'profile#/profile/create';
    } catch (error) {
      localStorage.removeItem('user')
      localStorage.removeItem('jwt')
      localStorage.removeItem('profile')
      console.log(error)
      return null
      // state.update((n) => {
      //   n.user = null
      //   return n
      // })
      throw error
    }
  },
  forgotPassword: async (email, url) => {
    return await sdk.account.createRecovery(email, url)
  },
  completePasswordRecovery: async (userId, secret, pass, confirmPass) => {
    return await sdk.account.updateRecovery(userId, secret, pass, confirmPass)
  },
  createVerification: async (url) => {
    return await sdk.account.createVerification(url)
  },
  completeEmailVerification: async (userId, secret) => {
    return await sdk.account.updateVerification(userId, secret)
  },

  register: async (mail, pass, name) => {
    try {
      await sdk.account.create('unique()', mail, pass, name)
      return await appwrite.login(mail, pass)
    } catch (error) {
      console.log(error)
      return null
    }
  },

  logout: async () => {
    try {
      return await sdk.account.deleteSession('current')
    } catch (error) {
      console.log(error)
    } finally {
      localStorage.removeItem('user')
      localStorage.removeItem('jwt')
      localStorage.removeItem('profile')
      return null

      // state.update((n) => {
      //   n.user = null
      //   return n
      // })
    }
  },
  getAvatar: (name) => {
    return sdk.avatars.getInitials(name)
  },
  fetchUser: async () => {
    let res = await sdk.database.listDocuments(
      profilesCollection,
      [Query.equal('user', JSON.parse(localStorage.getItem('user')).$id)],
      1,
    )
    if (res.total > 0 && res.documents.length > 0) return res.documents[0]
    else throw Error('Profile Not found')
  },

  //  createUser: async (/** @type {any} */ id, /** @type {any} */ Settings_C5, /** @type {any} */ Settings_C6, /** @type {any} */ Settings_C7, /** @type {any} */ Settings_C8, /** @type {any} */ Settings_C11, /** @type {any} */ Settings_C16, /** @type {any} */ Settings_C17, /** @type {any} */ Settings_C21, /** @type {any} */ Settings_C22, /** @type {any} */ Settings_C23, /** @type {any} */ Settings_C24, /** @type {any} */ Settings_C29, /** @type {any} */ Settings_C30, /** @type {any} */ Settings_C33, /** @type {any} */ Settings_C36, /** @type {any} */ Settings_C43, /** @type {any} */ Settings_C46, /** @type {any} */ Settings_C48, /** @type {any} */ Settings_C49, /** @type {any} */   team_A1,  /** @type {any} */   team_A2,  /** @type {any} */   team_A3,  /** @type {any} */   team_A4,  /** @type {any} */   team_A5,  /** @type {any} */   team_A6,  /** @type {any} */   team_A7,  /** @type {any} */   team_A8 ) => {
  createUser: async (data) => {
    return sdk.database.createDocument(
      profilesCollection,
      'unique()',
      { ...data, user: JSON.parse(localStorage.getItem('user')).$id },
      ['role:all'],
      [`user:${JSON.parse(localStorage.getItem('user')).$id}`],
    )
  },

  //Just added this
  updateUser: async (id, data) => {
    return sdk.database.updateDocument(
      profilesCollection,
      id,
      { ...data, user: JSON.parse(localStorage.getItem('user')).$id },
      ['role:all'],
      [`user:${JSON.parse(localStorage.getItem('user')).$id}`],
    )
  },

  // Functions for CRUD1

  fetchCRUD1: async (id) => {
    let res = await sdk.database.listDocuments(CRUD1Collection, [Query.equal('user', id)], 1)
    if (res.total > 0 && res.documents.length > 0) return res.documents[0]
    else throw Error('Record Not found')
  },

  createCRUD1: async (data) => {
    return sdk.database.createDocument(
      CRUD1Collection,
      'unique()',
      { ...data, user: JSON.parse(localStorage.getItem('user')).$id },
      ['role:all'],
      [`user:${JSON.parse(localStorage.getItem('user')).$id}`],
    )
  },

  updateCRUD1: async (id, data) => {
    return sdk.database.updateDocument(
      CRUD1Collection,
      id,
      { ...data, user: JSON.parse(localStorage.getItem('user')).$id },
      ['role:all'],
      [`user:${JSON.parse(localStorage.getItem('user')).$id}`],
    )
  },

  // End of Functions for CRUD1

  // Functions for Wallet

  fetchWallet: async () => {
    let res = await sdk.database.listDocuments(
      WalletCollection,
      [Query.equal('user', JSON.parse(localStorage.getItem('user')).$id)],
      1,
    )
    if (res.total > 0 && res.documents.length > 0) return res.documents[0]
    else throw Error('Record Not found')
  },

  createWallet: async (data) => {
    return sdk.database.createDocument(
      WalletCollection,
      'unique()',
      { ...data, user: JSON.parse(localStorage.getItem('user')).$id },
      ['role:all'],
      [`user:${JSON.parse(localStorage.getItem('user')).$id}`],
    )
  },

  updateWallet: async (id, data) => {
    return sdk.database.updateDocument(
      WalletCollection,
      id,
      { ...data, user: JSON.parse(localStorage.getItem('user')).$id },
      ['role:all'],
      [`user:${JSON.parse(localStorage.getItem('user')).$id}`],
    )
  },

  // End of Functions for Wallet

  // Functions for Wallet

  fetchPlan: async () => {
    let res = await sdk.database.listDocuments(
      PlanCollection,
      [Query.equal('user', JSON.parse(localStorage.getItem('user')).$id)],
      1,
    )
    if (res.total > 0 && res.documents.length > 0) return res.documents[0]
    else throw Error('Record Not found')
  },

  createPlan: async (data) => {
    return sdk.database.createDocument(
      PlanCollection,
      'unique()',
      { ...data, user: JSON.parse(localStorage.getItem('user')).$id },
      ['role:all'],
      [`user:${JSON.parse(localStorage.getItem('user')).$id}`],
    )
  },

  updatePlan: async (id, data) => {
    return sdk.database.updateDocument(
      PlanCollection,
      id,
      { ...data, user: JSON.parse(localStorage.getItem('user')).$id },
      ['role:all'],
      [`user:${JSON.parse(localStorage.getItem('user')).$id}`],
    )
  },

  // End of Functions for Wallet

  // Functions for CRUD2

  fetchCRUD2: async (id) => {
    let res = await sdk.database.listDocuments(CRUD2Collection, [Query.equal('user', id)], 1)
    if (res.total > 0 && res.documents.length > 0) return res.documents[0]
    else throw Error('Record Not found')
  },

  createCRUD2: async (data) => {
    return sdk.database.createDocument(
      CRUD2Collection,
      'unique()',
      { ...data, user: JSON.parse(localStorage.getItem('user')).$id },
      ['role:all'],
      [`user:${JSON.parse(localStorage.getItem('user')).$id}`],
    )
  },

  updateCRUD2: async (id, data) => {
    return sdk.database.updateDocument(
      CRUD2Collection,
      id,
      { ...data, user: JSON.parse(localStorage.getItem('user')).$id },
      ['role:all'],
      [`user:${JSON.parse(localStorage.getItem('user')).$id}`],
    )
  },

  // End of Functions for CRUD2

  createPost: async (data, userId, profileId) => {
    return sdk.database.createDocument(
      postsCollection,
      'unique()',
      data,
      ['role:all'],
      [`user:${userId}`],
    )
  },
  updatePost: async (id, data, userId) => {
    return sdk.database.updateDocument(postsCollection, id, data, ['role:all'], [`user:${userId}`])
  },
  fetchPosts: (limit, offset) => {
    return sdk.database.listDocuments(
      postsCollection,
      [],
      limit,
      offset,
      undefined,
      undefined,
      ['created_at'],
      ['DESC'],
    )
  },
  fetchUserPosts: (userId) => {
    return sdk.database.listDocuments(
      postsCollection,
      [Query.equal('user_id', userId)],
      100,
      0,
      undefined,
      undefined,
      ['created_at'],
      ['DESC'],
    )
  },

  //  createUser: async (/** @type {any} */ id, /** @type {any} */ Settings_C5, /** @type {any} */ Settings_C6, /** @type {any} */ Settings_C7, /** @type {any} */ Settings_C8, /** @type {any} */ Settings_C11, /** @type {any} */ Settings_C16, /** @type {any} */ Settings_C17, /** @type {any} */ Settings_C21, /** @type {any} */ Settings_C22, /** @type {any} */ Settings_C23, /** @type {any} */ Settings_C24, /** @type {any} */ Settings_C29, /** @type {any} */ Settings_C30, /** @type {any} */ Settings_C33, /** @type {any} */ Settings_C36, /** @type {any} */ Settings_C43, /** @type {any} */ Settings_C46, /** @type {any} */ Settings_C48, /** @type {any} */ Settings_C49, /** @type {any} */   team_A1,  /** @type {any} */   team_A2,  /** @type {any} */   team_A3,  /** @type {any} */   team_A4,  /** @type {any} */   team_A5,  /** @type {any} */   team_A6,  /** @type {any} */   team_A7,  /** @type {any} */   team_A8 ) => {
  createCollateralProfile: async (data) => {
    return sdk.database.createDocument(
      collateralCollection,
      'unique()',
      { ...data, user: JSON.parse(localStorage.getItem('user')).$id },
      ['role:all'],
      [`user:${JSON.parse(localStorage.getItem('user')).$id}`],
    )
  },

  updateCollateralProfile: async (id, data) => {
    return sdk.database.updateDocument(
      collateralCollection,
      id,
      data,
      ['role:all'],
      [`user:${JSON.parse(localStorage.getItem('user')).$id}`],
    )
  },

  createCollateral: async (data) => {
    return sdk.database.createDocument(
      collateralsCollectionID,
      'unique()',
      data,
      ['role:all'],
      ['role:member'],
    )
  },

  fetchPost: (id) => sdk.database.getDocument(postsCollection, id),
  uploadFile: (file, userId) =>
    sdk.storage.createFile(bucketId, 'unique()', file, ['role:all'], [`user:${userId}`]),
  deleteFile: (id) => sdk.storage.deleteFile(bucketId, id),
  getThumbnail: (id, width = 1000, height = 600) =>
    sdk.storage.getFilePreview(bucketId, id, width, height),
  deletePost: (id) => sdk.database.deleteDocument(postsCollection, id),
  fetchUserTeams: () => sdk.teams.list(),
  createTeam: (name) => sdk.teams.create('unique()', name),
  deleteTeam: (id) => sdk.teams.delete(id),
  getTeam: (id) => sdk.teams.get(id),
  getMemberships: (teamId) => sdk.teams.getMemberships(teamId),
  createMembership: (teamId, email, roles, url, name) =>
    sdk.teams.createMembership(teamId, email, roles, url, name),
  updateMembership: (teamId, inviteId, userId, secret) =>
    sdk.teams.updateMembershipStatus(teamId, inviteId, userId, secret),
  deleteMembership: (teamId, inviteId) => sdk.teams.deleteMembership(teamId, inviteId),
  getQRcode: (text) => sdk.avatars.getQR(text),
}

// export default {
//   data() {
//     return {
//       operation: 1,
//       product: 5,
//     }
//   },
// }

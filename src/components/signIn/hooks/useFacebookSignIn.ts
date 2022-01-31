/* eslint-disable no-extra-semi */

const useFacebookSignIn = () => {
  const signIn = () => {
    return new Promise<any>((resolve, reject) => {
      resolve(true)
    })
  }

  const signOut = () => {}

  return { signIn, signOut }
}

export default useFacebookSignIn

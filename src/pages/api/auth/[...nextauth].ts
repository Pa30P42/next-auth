import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

// console.log('process.env.CLIENT_ID', process.env.CLIENT_ID)
// console.log('process.env.CLIENT_ID', process.env.CLIENT_SECRET)

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
        repeatPassword: {
          label: 'Repeat Password',
          type: 'password',
          placeholder: 'Repeat your password',
        },
      },
      async authorize(credentials, req) {
        try {
          console.log('credentials', credentials)
          console.log('req', req)
          const {email, password} = credentials as {
            email: string
            password: string
          }
          console.log('email', email)
          console.log('password', password)
          if (email !== 'ismayil@gmail.com' || password !== '12345678') {
            throw new Error('User not exists')
          }

          return {
            id: '123123',
            name: 'Ismayil',
            email: 'ismayil@gmail.com',
            avatar: 'some url',
          }
        } catch (error: any) {
          throw new Error(error)
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '',
  // },
})

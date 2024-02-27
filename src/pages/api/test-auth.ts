import {getSession} from 'next-auth/react'

const handler = async (req: any, res: any) => {
  console.log('req', req)
  const session = await getSession({req})

  console.log('session', session)

  if (!session) {
    return res.status(401).json({error: 'Unauthorized user'})
  }

  return res.status(200).json({message: 'Success', session})
}
export default handler

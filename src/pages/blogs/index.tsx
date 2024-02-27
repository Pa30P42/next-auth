import {getSession} from 'next-auth/react'
import React from 'react'
import {blogs} from '../../../lib/blogs'

export default function BlogsPage({data, session}: any) {
  return (
    <div>
      <h2>Blogs Page</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((blog: any) => (
            <div key={blog.id}>
              <h3>{blog.title}</h3>
              <p>{blog.body}</p>
            </div>
          ))}
        </ul>
      ) : (
        <div>
          <h2>You don&apos;t have access to blogs</h2>
        </div>
      )}
    </div>
  )
}
export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  console.log('session', session)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=http://localhost:3000/blogs',
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: session ? blogs : [],
    },
  }
}

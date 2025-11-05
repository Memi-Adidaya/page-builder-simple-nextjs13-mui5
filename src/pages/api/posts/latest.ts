// src/api/posts/latest.ts

import { NextApiRequest, NextApiResponse } from 'next/types'

// Mock data - ganti dengan database call yang sesungguhnya
const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    excerpt: 'Learn how to build modern web applications with Next.js',
    publishedAt: '2024-01-15',
    slug: 'getting-started-with-nextjs',
    imageUrl: 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    title: 'React Best Practices',
    excerpt: 'Discover the best practices for building React applications',
    publishedAt: '2024-01-10',
    slug: 'react-best-practices',
    imageUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '3',
    title: 'TypeScript for JavaScript Developers',
    excerpt: 'A comprehensive guide to TypeScript',
    publishedAt: '2024-01-05',
    slug: 'typescript-for-javascript-developers',
    imageUrl: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '4',
    title: 'JavaScript Developers',
    excerpt: 'A comprehensive guide to TypeScript',
    publishedAt: '2024-01-06',
    slug: 'javascript-developers',
    imageUrl: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
]

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url)
//   const limit = parseInt(searchParams.get('limit') || '3')

//   try {
//     // Dalam implementasi real, Anda akan memanggil database di sini
//     // const posts = await prisma.post.findMany({
//     //   take: limit,
//     //   orderBy: { publishedAt: 'desc' },
//     //   where: { published: true }
//     // });

//     const posts = mockPosts.slice(0, limit)

//     return NextResponse.json(posts)
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
//   }
// }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const limit = parseInt((req.query.limit as string) || '3', 10)
    const posts = mockPosts.slice(0, limit)
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
}

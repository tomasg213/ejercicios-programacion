export interface Video {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  duration: number
  views: number
  category: string
  channel: string
  uploadDate: string
}

export const videos: Video[] = [
  {
    id: '1',
    title: 'Tutorial de React Hooks',
    description: 'Aprende a usar useState, useEffect y más',
    url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnail: '/thumbnails/react.jpg',
    duration: 1200,
    views: 15000,
    category: 'Tutoriales',
    channel: 'DevCode',
    uploadDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'CSS Grid vs Flexbox',
    description: 'Cuál usar y cuándo',
    url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnail: '/thumbnails/css.jpg',
    duration: 900,
    views: 8500,
    category: 'Tutoriales',
    channel: 'WebDev',
    uploadDate: '2024-01-20'
  },
  {
    id: '3',
    title: 'TypeScript Basics',
    description: 'Introducción a TypeScript',
    url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnail: '/thumbnails/ts.jpg',
    duration: 1800,
    views: 22000,
    category: 'Tutoriales',
    channel: 'DevCode',
    uploadDate: '2024-01-10'
  },
  {
    id: '4',
    title: 'Next.js 14 Tutorial',
    description: 'Creando apps con App Router',
    url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnail: '/thumbnails/nextjs.jpg',
    duration: 2400,
    views: 35000,
    category: 'Tutoriales',
    channel: 'NextJS',
    uploadDate: '2024-01-25'
  }
]

export async function getVideos(): Promise<Video[]> {
  return videos
}

export async function getVideoById(id: string): Promise<Video | undefined> {
  return videos.find(v => v.id === id)
}

export async function getVideosByCategory(category: string): Promise<Video[]> {
  return videos.filter(v => v.category === category)
}

export async function searchVideos(query: string): Promise<Video[]> {
  const lowerQuery = query.toLowerCase()
  return videos.filter(v => 
    v.title.toLowerCase().includes(lowerQuery) ||
    v.description.toLowerCase().includes(lowerQuery)
  )
}

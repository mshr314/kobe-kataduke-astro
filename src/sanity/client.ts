import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Vercelサーバーサイドでのimport.meta.envは利用不可のため、process.envを使用
// モジュールロード時ではなく関数実行時に初期化することでSSRエラーを回避
function getClient() {
  const projectId = process.env.PUBLIC_SANITY_PROJECT_ID ?? 'mqj7r953'
  const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production'
  return createClient({
    projectId,
    dataset,
    useCdn: true,
    apiVersion: '2024-03-03',
  })
}

export function urlFor(source: any) {
  const client = getClient()
  const builder = imageUrlBuilder(client)
  return builder.image(source)
}

export async function fetchBlogPosts() {
  try {
    return await getClient().fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        title,
        slug,
        publishedAt,
        category,
        excerpt,
        eyecatch,
      }
    `)
  } catch {
    return []
  }
}

export async function fetchBlogPost(slug: string) {
  try {
    return await getClient().fetch(`
      *[_type == "blogPost" && slug.current == $slug][0] {
        title,
        slug,
        publishedAt,
        category,
        excerpt,
        eyecatch,
        body,
        seoTitle,
        seoDescription,
      }
    `, { slug })
  } catch {
    return null
  }
}

export async function fetchTestimonials() {
  try {
    return await getClient().fetch(`
      *[_type == "testimonial"] | order(publishedAt desc) {
        name,
        profile,
        area,
        serviceType,
        rating,
        content,
      }
    `)
  } catch {
    return []
  }
}

export async function fetchSiteSettings() {
  try {
    return await getClient().fetch(`
      *[_type == "siteSettings"][0] {
        companyName,
        tel,
        telDisplay,
        catchCopy,
        seoTitle,
        seoDescription,
      }
    `)
  } catch {
    return null
  }
}

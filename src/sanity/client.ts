import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID'
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'kobe-kataduke'

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2024-03-03',
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source)
}

export async function fetchBlogPosts() {
  return sanityClient.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      category,
      excerpt,
      eyecatch,
    }
  `)
}

export async function fetchBlogPost(slug: string) {
  return sanityClient.fetch(`
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
}

export async function fetchTestimonials() {
  return sanityClient.fetch(`
    *[_type == "testimonial"] | order(publishedAt desc) {
      name,
      profile,
      area,
      serviceType,
      rating,
      content,
    }
  `)
}

export async function fetchSiteSettings() {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0] {
      companyName,
      tel,
      telDisplay,
      catchCopy,
      seoTitle,
      seoDescription,
    }
  `)
}

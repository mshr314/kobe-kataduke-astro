import { defineType, defineField } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'ブログ記事',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ（URL）',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: '公開日',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'カテゴリ',
      type: 'string',
      options: {
        list: [
          { title: '遺品整理', value: 'isan-seiri' },
          { title: '生前整理', value: 'seizen-seiri' },
          { title: 'ゴミ屋敷清掃', value: 'gomiyashiki' },
          { title: '特殊清掃', value: 'tokusu-seiou' },
          { title: '地域ガイド', value: 'area-guide' },
          { title: 'お役立ち情報', value: 'tips' },
        ],
      },
    }),
    defineField({
      name: 'eyecatch',
      title: 'アイキャッチ画像',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt テキスト', type: 'string' },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: '抜粋（記事一覧・OGP用）',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: '本文（Portable Text）',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt テキスト', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEOタイトル（省略時は記事タイトルを使用）',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'メタディスクリプション',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'isAiGenerated',
      title: 'AI生成フラグ',
      type: 'boolean',
      description: 'Firecrawl + Claude で自動生成された記事の場合はONにする',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'eyecatch' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `📅 ${subtitle}` : '（日付未設定）', media }
    },
  },
  orderings: [
    {
      title: '新しい順',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})

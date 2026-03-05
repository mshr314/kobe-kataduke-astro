import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'サイト設定',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: '会社名',
      type: 'string',
    }),
    defineField({
      name: 'tel',
      title: '電話番号（ハイフンなし）',
      type: 'string',
      description: '例: 0120123456',
    }),
    defineField({
      name: 'telDisplay',
      title: '電話番号（表示用）',
      type: 'string',
      description: '例: 0120-123-456',
    }),
    defineField({
      name: 'catchCopy',
      title: 'キャッチコピー',
      type: 'string',
    }),
    defineField({
      name: 'seoTitle',
      title: 'サイトタイトル（SEO）',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'メタディスクリプション',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: { title: 'companyName' },
  },
})

import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'お客様の声',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'お名前（例: K.M. 様）',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profile',
      title: 'プロフィール（例: 50代・大阪市在住）',
      type: 'string',
    }),
    defineField({
      name: 'area',
      title: '作業エリア（例: 神戸市北区の実家）',
      type: 'string',
    }),
    defineField({
      name: 'serviceType',
      title: 'サービス種別',
      type: 'string',
      options: {
        list: [
          { title: '遺品整理', value: '遺品整理' },
          { title: '生前整理', value: '生前整理' },
          { title: 'ゴミ屋敷清掃', value: 'ゴミ屋敷清掃' },
          { title: '特殊清掃', value: '特殊清掃' },
        ],
      },
    }),
    defineField({
      name: 'rating',
      title: '評価（1〜5）',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'content',
      title: '口コミ本文',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: '掲載日',
      type: 'date',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'area' },
  },
})

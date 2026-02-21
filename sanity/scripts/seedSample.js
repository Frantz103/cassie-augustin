import fs from 'fs'
import path from 'path'

export default async function seed({client}) {
  // File paths relative to repo root
  const root = path.resolve(process.cwd(), '..')
  const heroPath = path.join(root, 'public', 'assets', 'img', 'banner-image-desktop.png')
  const lookPath = path.join(root, 'public', 'assets', 'img', 'lookbook', 'ludnie-4.jpg')

  // Upload hero image
  const heroAsset = await client.assets.upload(
    'image',
    fs.createReadStream(heroPath),
    {filename: 'banner-image-desktop.png'}
  )

  // Upload lookbook image
  const lookAsset = await client.assets.upload(
    'image',
    fs.createReadStream(lookPath),
    {filename: 'ludnie-4.jpg'}
  )

  const now = new Date().toISOString()

  // Upsert sample blog post
  await client
    .transaction()
    .createOrReplace({
      _id: 'sample-post',
      _type: 'blogPost',
      title: 'Sample Post from Sanity',
      slug: { _type: 'slug', current: 'sample-post' },
      description: 'Sanity pipeline smoke test.',
      publishedAt: now,
      heroImage: { _type: 'image', asset: { _type: 'reference', _ref: heroAsset._id }, alt: 'Cassie banner' },
      body: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Hello from Sanity!' }],
        },
      ],
    })
    .createOrReplace({
      _id: 'sample-look',
      _type: 'lookbookItem',
      title: 'Sample Look',
      slug: { _type: 'slug', current: 'sample-look' },
      category: 'Editorial',
      date: now.substring(0, 10),
      featured: true,
      layout: 'featured',
      order: 1,
      images: [
        {
          _type: 'image',
          asset: { _type: 'reference', _ref: lookAsset._id },
          alt: 'Cassie editorial shot',
        },
      ],
    })
    .commit({visibility: 'async'}) // faster, eventual consistency is fine for seeding

  console.log('Seed complete: sample-post and sample-look')
}

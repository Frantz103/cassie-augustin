import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('Set SANITY_WRITE_TOKEN env var');
  process.exit(1);
}

const client = createClient({
  projectId: 'gcavgznf',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token,
  useCdn: false,
});

const root = path.resolve(process.cwd(), '..');

async function uploadImage(relativePath, filename) {
  const fullPath = path.join(root, 'public', relativePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  Image not found: ${fullPath}`);
    return null;
  }
  const asset = await client.assets.upload('image', fs.createReadStream(fullPath), { filename });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function migrateHomepage() {
  console.log('Migrating homepage...');
  const heroImage = await uploadImage('assets/img/Ludnie.jpg', 'Ludnie.jpg');

  await client.createOrReplace({
    _id: 'singleton-homepage',
    _type: 'homepage',
    heroTitle: "Hi, I'm Cassie",
    heroSubtitle: 'I am a nutritionist passionate about women health, fashion, and modeling.',
    ctaText: "Let's Connect",
    ctaSubtext: 'Follow along for nutrition tips, modeling work, and wellness inspiration.',
    ...(heroImage && { heroImage }),
    heroImageAlt: 'A portrait of Ludnie Augustin showcasing her natural curly hair and bold makeup, with a focus on her expressive eyes and glossy lips, complemented by elegant earrings.',
  });
  console.log('  Done.');
}

async function migrateAbout() {
  console.log('Migrating about...');
  const aboutImage = await uploadImage('assets/img/ludnie-pink-dress.jpg', 'ludnie-pink-dress.jpg');

  await client.createOrReplace({
    _id: 'singleton-about',
    _type: 'about',
    title: 'About',
    body: [
      { _type: 'block', _key: 'a1', children: [{ _type: 'span', _key: 'as1', text: 'I am Ludnie Cassie Augustin, your newfound online bestie \u{1F496}. ', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'a2', children: [{ _type: 'span', _key: 'as2', text: 'As a dedicated nutritionist with an unwavering faith In God, I am deeply passionate about empowering women to embrace holistic wellness.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'a3', children: [{ _type: 'span', _key: 'as3', text: "My journey transcends the boundaries of conventional nutrition. With a heart for women's health, a flair for fashion and an eye for modeling, I am committed to uplift and hopefully inspire you to embrace self-love and acceptance.", marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'a4', children: [{ _type: 'span', _key: 'as4', text: "Here you will find a harmonious fusion of nutrition insight, faith-based guidance, Style inspirations and glimpses into the world of modeling. Together let's embark on a transformative journey toward a healthier and more radiant you.", marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'a5', children: [{ _type: 'span', _key: 'as5', text: 'Make yourself at home!! And I mean that will all my heart.', marks: [] }], markDefs: [] },
    ],
    closing: 'Xoxo,\nCassie',
    ...(aboutImage && { image: aboutImage }),
    imageAlt: 'Ludnie Augustin in a pink dress',
  });
  console.log('  Done.');
}

async function migrateSiteSettings() {
  console.log('Migrating site settings...');
  await client.createOrReplace({
    _id: 'singleton-siteSettings',
    _type: 'siteSettings',
    email: 'augustincassie@gmail.com',
    instagram: '@cassie.augustin',
    instagramUrl: 'https://www.instagram.com/cassie.augustin',
    contactIntro: "I'd love to connect with you! Whether you're interested in nutrition guidance, modeling collaborations, or just want to say hello, I'm here for it.",
    contactOutro: "I share nutrition tips, wellness insights, behind-the-scenes from photoshoots, and everything in between. Let's start this journey together!",
  });
  console.log('  Done.');
}

async function migrateLookbook() {
  console.log('Migrating lookbook items...');

  const items = [
    { file: 'lookbook/ludnie-4.jpg', alt: 'Ludnie Augustin Editorial', layout: 'featured', order: 1 },
    { file: 'lookbook/Ludnie-2.jpg', alt: 'Ludnie Augustin Portrait', layout: 'half', order: 2 },
    { file: 'lookbook/ludnie-3.jpg', alt: 'Ludnie Augustin Fashion', layout: 'half', order: 3 },
    { file: 'lookbook/ludnie-1.jpg', alt: 'Ludnie Augustin', layout: 'third', order: 4 },
    { file: 'ludnie-pink-dress.jpg', alt: 'Ludnie Augustin Pink Dress', layout: 'third', order: 5 },
    { file: 'lookbook/Ludnie-2.jpg', alt: 'Ludnie Augustin', layout: 'third', order: 6 },
    { file: 'lookbook/ludnie-6.jpg', alt: 'Ludnie Augustin', layout: 'third', order: 7 },
    { file: 'lookbook/ludnie-5.jpg', alt: 'Ludnie Augustin', layout: 'third', order: 8 },
    { file: 'lookbook/ludnie-9.jpg', alt: 'Ludnie Augustin', layout: 'third', order: 9 },
    { file: 'lookbook/ludnie-10.jpg', alt: 'Ludnie Augustin Editorial', layout: 'two-thirds', order: 10 },
    { file: 'lookbook/ludnie-8.jpg', alt: 'Ludnie Augustin', layout: 'one-third', order: 11 },
    { file: 'lookbook/ludnie-14.jpg', alt: 'Ludnie Augustin', layout: 'third', order: 12 },
    { file: 'lookbook/ludnie-13.jpg', alt: 'Ludnie Augustin', layout: 'third', order: 13 },
    { file: 'lookbook/ludnie-3.jpg', alt: 'Ludnie Augustin', layout: 'third', order: 14 },
    { file: 'lookbook/ludnie-15.jpg', alt: 'Ludnie Augustin Editorial', layout: 'featured', order: 15 },
  ];

  for (const item of items) {
    const image = await uploadImage(`assets/img/${item.file}`, path.basename(item.file));
    if (!image) continue;

    await client.createOrReplace({
      _id: `lookbook-item-${item.order}`,
      _type: 'lookbookItem',
      title: item.alt,
      slug: { _type: 'slug', current: `look-${item.order}` },
      category: 'Editorial',
      featured: item.layout === 'featured',
      layout: item.layout,
      order: item.order,
      images: [{ ...image, _key: `img${item.order}`, alt: item.alt }],
    });
    console.log(`  Lookbook ${item.order}: ${item.file}`);
  }
  console.log('  Done.');
}

async function createLegalPages() {
  console.log('Creating legal pages...');

  await client.createOrReplace({
    _id: 'page-privacy-policy',
    _type: 'page',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy-policy' },
    description: 'Privacy policy for the Cassie Augustin website.',
    showInNav: true,
    body: [
      { _type: 'block', _key: 'pp1', style: 'h2', children: [{ _type: 'span', _key: 'pps1', text: 'Privacy Policy', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'pp2', children: [{ _type: 'span', _key: 'pps2', text: 'Last updated: February 2026', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'pp3', children: [{ _type: 'span', _key: 'pps3', text: 'This website (cassieaugustin.com) is a personal portfolio and blog. We respect your privacy and are committed to protecting any personal information you share with us.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'pp4', style: 'h3', children: [{ _type: 'span', _key: 'pps4', text: 'Information We Collect', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'pp5', children: [{ _type: 'span', _key: 'pps5', text: 'We use Google Analytics to understand how visitors interact with our site. This may collect anonymized data such as your IP address, browser type, and pages visited. We do not collect personal information unless you voluntarily provide it (e.g., via email).', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'pp6', style: 'h3', children: [{ _type: 'span', _key: 'pps6', text: 'Cookies', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'pp7', children: [{ _type: 'span', _key: 'pps7', text: 'This site may use cookies for analytics purposes. You can disable cookies in your browser settings at any time.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'pp8', style: 'h3', children: [{ _type: 'span', _key: 'pps8', text: 'Third-Party Services', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'pp9', children: [{ _type: 'span', _key: 'pps9', text: 'We may link to third-party websites such as Instagram. These sites have their own privacy policies and we are not responsible for their practices.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'pp10', style: 'h3', children: [{ _type: 'span', _key: 'pps10', text: 'Contact', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'pp11', children: [{ _type: 'span', _key: 'pps11', text: 'If you have questions about this privacy policy, please contact us at augustincassie@gmail.com.', marks: [] }], markDefs: [] },
    ],
  });

  await client.createOrReplace({
    _id: 'page-terms-of-service',
    _type: 'page',
    title: 'Terms of Service',
    slug: { _type: 'slug', current: 'terms-of-service' },
    description: 'Terms of service for the Cassie Augustin website.',
    showInNav: true,
    body: [
      { _type: 'block', _key: 'ts1', style: 'h2', children: [{ _type: 'span', _key: 'tss1', text: 'Terms of Service', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'ts2', children: [{ _type: 'span', _key: 'tss2', text: 'Last updated: February 2026', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'ts3', children: [{ _type: 'span', _key: 'tss3', text: 'By accessing and using this website (cassieaugustin.com), you agree to the following terms and conditions.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'ts4', style: 'h3', children: [{ _type: 'span', _key: 'tss4', text: 'Intellectual Property', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'ts5', children: [{ _type: 'span', _key: 'tss5', text: 'All content on this site, including text, images, and photography, is the property of Ludnie Cassie Augustin and is protected by copyright law. You may not reproduce, distribute, or use any content without written permission.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'ts6', style: 'h3', children: [{ _type: 'span', _key: 'tss6', text: 'Use of Content', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'ts7', children: [{ _type: 'span', _key: 'tss7', text: 'You are welcome to browse this site for personal, non-commercial use. Any other use requires prior written consent.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'ts8', style: 'h3', children: [{ _type: 'span', _key: 'tss8', text: 'Health Disclaimer', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'ts9', children: [{ _type: 'span', _key: 'tss9', text: 'The nutritional information provided on this site is for general informational purposes only and is not a substitute for professional medical advice. Always consult a qualified healthcare provider before making changes to your diet or health routine.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'ts10', style: 'h3', children: [{ _type: 'span', _key: 'tss10', text: 'Limitation of Liability', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'ts11', children: [{ _type: 'span', _key: 'tss11', text: 'This website is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of this site.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'ts12', style: 'h3', children: [{ _type: 'span', _key: 'tss12', text: 'Contact', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'ts13', children: [{ _type: 'span', _key: 'tss13', text: 'For questions about these terms, please contact augustincassie@gmail.com.', marks: [] }], markDefs: [] },
    ],
  });

  console.log('  Done.');
}

async function main() {
  try {
    await migrateHomepage();
    await migrateAbout();
    await migrateSiteSettings();
    await migrateLookbook();
    await createLegalPages();
    console.log('\nAll migrations complete!');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

main();

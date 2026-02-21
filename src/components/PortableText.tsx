import { PortableText as PT } from '@portabletext/react';
import type { PortableTextReactComponents } from '@portabletext/react';
import { urlFor } from '../lib/sanity';

const components: Partial<PortableTextReactComponents> = {
	types: {
		image: ({ value }) => {
			const src = urlFor(value).width(1200).url();
			const alt = value.alt || '';
			return <img src={src} alt={alt} loading="lazy" />;
		},
	},
	marks: {
		link: ({ children, value }) => {
			const href = value?.href || '';
			const isExternal = href.startsWith('http');
			const rel = isExternal ? 'noopener noreferrer' : undefined;
			const target = isExternal ? '_blank' : undefined;
			// Basic protocol allowlist; extend if needed
			const allowed =
				href.startsWith('http://') ||
				href.startsWith('https://') ||
				href.startsWith('/') ||
				href.startsWith('mailto:');
			if (!allowed) return <>{children}</>;
			return (
				<a href={href} rel={rel} target={target}>
					{children}
				</a>
			);
		},
	},
};

type Props = {
	value: any[];
};

export default function PortableText({ value }: Props) {
	return <PT value={value} components={components} />;
}

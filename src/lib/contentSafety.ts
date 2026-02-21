const BR_TAG_RE = /<br\s*\/?>/gi;
const HTML_TAG_RE = /<[^>]*>/g;

type SafeExternalUrlOptions = {
	fallback: string;
	allowedHosts?: string[];
	allowedProtocols?: string[];
};

export function sanitizeCmsText(value: unknown, fallback = ''): string {
	const raw = typeof value === 'string' ? value : fallback;
	return raw.replace(BR_TAG_RE, '\n').replace(HTML_TAG_RE, '').trim();
}

export function safeExternalUrl(value: unknown, options: SafeExternalUrlOptions): string {
	const { fallback, allowedHosts = [], allowedProtocols = ['https:'] } = options;
	const input = typeof value === 'string' ? value : '';

	try {
		const parsed = new URL(input);
		if (!allowedProtocols.includes(parsed.protocol)) return fallback;
		if (allowedHosts.length > 0 && !allowedHosts.includes(parsed.hostname)) return fallback;
		return parsed.toString();
	} catch {
		return fallback;
	}
}

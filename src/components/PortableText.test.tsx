import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PortableText from './PortableText';

const { urlForMock, widthMock, urlMock } = vi.hoisted(() => {
  return {
    urlForMock: vi.fn(),
    widthMock: vi.fn(),
    urlMock: vi.fn(),
  };
});

vi.mock('../lib/sanity', () => ({
  urlFor: urlForMock,
}));

vi.mock('@portabletext/react', () => ({
  PortableText: ({ components }: { components: any }) => {
    const ImageRenderer = components?.types?.image;
    const LinkRenderer = components?.marks?.link;

    return (
      <div data-testid="portable-text-mock">
        {ImageRenderer ? <ImageRenderer value={{ _type: 'image', alt: 'Hero image', asset: { _ref: 'img-1' } }} /> : null}
        {LinkRenderer ? <LinkRenderer value={{ href: 'https://example.com' }}>External</LinkRenderer> : null}
        {LinkRenderer ? <LinkRenderer value={{ href: '/lookbook' }}>Internal</LinkRenderer> : null}
        {LinkRenderer ? <LinkRenderer value={{ href: 'mailto:hello@example.com' }}>Email</LinkRenderer> : null}
        {LinkRenderer ? <LinkRenderer value={{ href: 'javascript:alert(1)' }}>Blocked</LinkRenderer> : null}
      </div>
    );
  },
}));

describe('PortableText', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    urlMock.mockReturnValue('https://cdn.example.com/image.jpg');
    widthMock.mockReturnValue({ url: urlMock });
    urlForMock.mockReturnValue({ width: widthMock });
  });

  it('renders image and safe links with expected attributes', () => {
    render(<PortableText value={[]} />);

    expect(urlForMock).toHaveBeenCalledTimes(1);
    expect(widthMock).toHaveBeenCalledWith(1200);
    expect(urlMock).toHaveBeenCalledTimes(1);

    const image = screen.getByRole('img', { name: 'Hero image' });
    expect(image).toHaveAttribute('src', 'https://cdn.example.com/image.jpg');
    expect(image).toHaveAttribute('loading', 'lazy');

    const external = screen.getByRole('link', { name: 'External' });
    expect(external).toHaveAttribute('href', 'https://example.com');
    expect(external).toHaveAttribute('target', '_blank');
    expect(external).toHaveAttribute('rel', 'noopener noreferrer');

    const internal = screen.getByRole('link', { name: 'Internal' });
    expect(internal).toHaveAttribute('href', '/lookbook');
    expect(internal).not.toHaveAttribute('target');

    const email = screen.getByRole('link', { name: 'Email' });
    expect(email).toHaveAttribute('href', 'mailto:hello@example.com');
    expect(email).not.toHaveAttribute('target');
  });

  it('renders blocked protocols as plain text', () => {
    render(<PortableText value={[]} />);

    expect(screen.getByText('Blocked')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Blocked' })).not.toBeInTheDocument();
  });
});

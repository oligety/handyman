import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Layout from '../layouts/Layout.astro';
import Welcome from '../components/Welcome.astro';
import { GET } from '../pages/api/health';

describe('Layout component', () => {
  it('renders title, canonical URL, and SEO structured data', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Layout, {
      slots: { default: '<h1>Hello Handyman</h1>' },
    });

    expect(result).toContain('<title>M. Adap Construction Pty Ltd');
    expect(result).toContain('Central Coast');
    expect(result).toContain('Skip to main content');
    expect(result).toContain('<h1>Hello Handyman</h1>');
    expect(result).toContain('rel="canonical"');
    expect(result).toContain('HomeAndConstructionBusiness');
    expect(result).toContain('49702564458');
    expect(result).toContain('342519C');
    expect(result).toContain('0498 376 968');
    expect(result).toContain('marlon_adap@yahoo.com');
    expect(result).toContain('property="og:site_name" content="M. Adap Construction Pty Ltd"');
  });
});

describe('Welcome landing page component', () => {
  it('renders M. Adap Construction branding and services', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Welcome);

    expect(result).toContain('M. Adap');
    expect(result).toContain('Construction');
    expect(result).toContain('Central Coast');
    expect(result).toContain('id="main-content"');
    expect(result).toContain('aria-errormessage="name-error"');
    expect(result).toContain('aria-errormessage="phone-error"');
    expect(result).toContain('49 702 564 458');
    expect(result).toContain('342519C');
    expect(result).toContain('0498 376 968');
    expect(result).toContain('marlon_adap@yahoo.com');
    expect(result).toContain('Carpentry Work');
    expect(result).toContain('Remedial &amp; Defects Work');
    expect(result).toContain('Plastering &amp; Rendering');
    expect(result).toContain('Tiling &amp; Grouting');
    expect(result).toContain('Painting &amp; Finishing');
    expect(result).toContain('Roofing &amp; Gutters');
  });
});

describe('API health endpoint (SSR)', () => {
  it('returns ok status and json content', async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.status).toBe('ok');
    expect(data.mode).toBe('ssr');
    expect(data.timestamp).toBeDefined();
  });
});

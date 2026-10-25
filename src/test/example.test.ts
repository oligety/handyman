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

    expect(result).toContain('<title>M5 Handyman');
    expect(result).toContain('<h1>Hello Handyman</h1>');
    expect(result).toContain('rel="canonical"');
    expect(result).toContain('HomeAndConstructionBusiness');
    expect(result).toContain('property="og:site_name" content="M5 Handyman"');
  });
});

describe('Welcome landing page component', () => {
  it('renders M5 Handyman branding and services', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Welcome);

    expect(result).toContain('M5');
    expect(result).toContain('Handyman');
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

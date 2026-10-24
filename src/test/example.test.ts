import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Layout from '../layouts/Layout.astro';

describe('Layout component', () => {
  it('renders title and default slot content', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Layout, {
      slots: { default: '<h1>Hello Handyman</h1>' },
    });

    expect(result).toContain('<title>Astro Basics</title>');
    expect(result).toContain('<h1>Hello Handyman</h1>');
  });
});

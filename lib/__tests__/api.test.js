import { getAllPosts, getPostBySlug } from '../api.js';

describe('getAllPosts', () => {
  test('returns posts sorted by date in descending order', () => {
    const posts = getAllPosts();
    const dates = posts.map(p => p.date);
    const sortedDates = [...dates].sort((a, b) => (a < b ? 1 : -1));
    expect(dates).toEqual(sortedDates);
  });
});

describe('getPostBySlug', () => {
  test('returns slug, metadata and dashboard', () => {
    const slug = '2024-12-10';
    const post = getPostBySlug(slug);
    expect(post.slug).toBe(slug);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('date');
    expect(post).toHaveProperty('excerpt');
    expect(post).toHaveProperty('dashboard');
  });
});

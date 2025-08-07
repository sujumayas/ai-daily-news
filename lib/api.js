import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const postsDirectory = path.join(process.cwd(), '_posts');

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.yaml'))
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const parsed = YAML.parse(fileContents);

      const slug = fileName.replace(/\.yaml$/, '');

      return {
        ...parsed.metadata,
        slug,
        dashboard: parsed.dashboard
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.yaml`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const parsed = YAML.parse(fileContents);
  const realSlug = path.basename(fullPath, '.yaml');

  return {
    ...parsed.metadata,
    slug: realSlug,
    dashboard: parsed.dashboard
  };
}
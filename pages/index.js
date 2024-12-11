import Link from 'next/link';
import { getAllPosts } from '../lib/api';

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">AI Daily News</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.date}</p>
              <p className="mt-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
}
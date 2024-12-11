import { getPostBySlug, getAllPosts } from '../../lib/api';
import Dashboard from '../../components/Dashboard';

export default function Post({ post }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <Dashboard data={post.dashboard} />
    </div>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return {
    props: { post }
  };
}
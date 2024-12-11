// pages/posts/[slug].js
import { getPostBySlug, getAllPosts } from '../../lib/api';
import { AlertTriangle, TrendingUp, Cpu, Link2, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ImpactBadge = ({ impact }) => {
  const baseClasses = "px-2 py-1 rounded-full text-sm font-medium";
  const colorClasses = impact === 'high' 
    ? "bg-red-100 text-red-800"
    : "bg-yellow-100 text-yellow-800";
  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
    </span>
  );
};

const SectionCard = ({ title, icon: Icon, children }) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center space-x-2">
      <Icon className="w-6 h-6 text-blue-600" />
      <CardTitle className="text-xl font-bold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

const NewsItem = ({ title, detail, impact }) => (
  <div className="border-b last:border-0 py-4">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      {impact && <ImpactBadge impact={impact} />}
    </div>
    <p className="text-gray-600">{detail}</p>
  </div>
);

export default function Post({ post }) {
  const { dashboard } = post;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
          <p className="text-lg text-gray-600 mt-2">{post.excerpt}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SectionCard title="Market Moves" icon={TrendingUp}>
            {dashboard.marketMoves.map((item, index) => (
              <NewsItem key={index} {...item} />
            ))}
          </SectionCard>

          <SectionCard title="Model Performance" icon={Cpu}>
            {dashboard.modelPerformance.map((item, index) => (
              <NewsItem key={index} {...item} />
            ))}
          </SectionCard>

          <SectionCard title="Key Integrations" icon={Link2}>
            {dashboard.keyIntegrations.map((item, index) => (
              <NewsItem key={index} {...item} />
            ))}
          </SectionCard>

          <SectionCard title="Challenges" icon={Shield}>
            {dashboard.challenges.map((item, index) => (
              <NewsItem key={index} {...item} />
            ))}
          </SectionCard>
        </div>
      </div>
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
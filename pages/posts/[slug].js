import { getPostBySlug, getAllPosts } from '../../lib/api';
import { TrendingUp, Cpu, Link2, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const ImpactBadge = ({ impact }) => {
  const baseClasses = "px-3 py-1 rounded-full text-sm font-semibold shadow-sm";
  const colorClasses = impact === 'high' 
    ? "bg-red-50 text-red-700 ring-1 ring-red-600/10"
    : "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/10";
  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
    </span>
  );
};

const SectionCard = ({ title, icon: Icon, children }) => (
  <Card className="w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
    <CardHeader className="flex flex-row items-center space-x-2 border-b border-gray-100 bg-gray-50/50">
      <div className="p-2 rounded-full bg-blue-50">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
    </CardHeader>
    <CardContent className="divide-y divide-gray-100">
      {children}
    </CardContent>
  </Card>
);

const NewsItem = ({ title, detail, impact }) => (
  <div className="py-4 first:pt-2 last:pb-2">
    <div className="flex justify-between items-start mb-2 gap-4">
      <h3 className="font-medium text-gray-900">{title}</h3>
      {impact && <ImpactBadge impact={impact} />}
    </div>
    <p className="text-sm text-gray-600">{detail}</p>
  </div>
);

export default function Post({ post }) {
  const { dashboard } = post;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{post.title}</h1>
          <p className="text-lg text-gray-600">{post.excerpt}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
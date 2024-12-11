import { getPostBySlug, getAllPosts } from '../../lib/api';
import { TrendingUp, Cpu, Link2, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Constants for reusable styles
const STYLES = {
  impact: {
    base: "px-3 py-1 rounded-full text-sm font-semibold shadow-sm",
    high: "bg-red-50 text-red-700 ring-1 ring-red-600/10",
    medium: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/10"
  },
  card: {
    wrapper: "w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200",
    header: "flex flex-row items-center space-x-2 border-b border-gray-100 bg-gray-50/50",
    iconWrapper: "p-2 rounded-full bg-blue-50",
    icon: "w-5 h-5 text-blue-600",
    title: "text-lg font-semibold text-gray-900",
    content: "divide-y divide-gray-100"
  },
  newsItem: {
    wrapper: "py-4 first:pt-2 last:pb-2",
    header: "flex justify-between items-start mb-2 gap-4",
    title: "font-medium text-gray-900",
    detail: "text-sm text-gray-600"
  },
  page: {
    wrapper: "min-h-screen bg-gray-50/50",
    container: "container mx-auto px-4 py-8 max-w-7xl",
    header: {
      wrapper: "mb-8",
      title: "text-3xl sm:text-4xl font-bold text-gray-900 mb-3",
      excerpt: "text-lg text-gray-600"
    },
    grid: "grid grid-cols-1 lg:grid-cols-2 gap-6"
  }
};

// Component for displaying impact badges
const ImpactBadge = ({ impact }) => (
  <span className={`${STYLES.impact.base} ${STYLES.impact[impact]}`}>
    {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
  </span>
);

// Component for section cards
const SectionCard = ({ title, icon: Icon, children }) => (
  <Card className={STYLES.card.wrapper}>
    <CardHeader className={STYLES.card.header}>
      <div className={STYLES.card.iconWrapper}>
        <Icon className={STYLES.card.icon} />
      </div>
      <CardTitle className={STYLES.card.title}>{title}</CardTitle>
    </CardHeader>
    <CardContent className={STYLES.card.content}>
      {children}
    </CardContent>
  </Card>
);

// Component for individual news items
const NewsItem = ({ title, detail, impact }) => (
  <div className={STYLES.newsItem.wrapper}>
    <div className={STYLES.newsItem.header}>
      <h3 className={STYLES.newsItem.title}>{title}</h3>
      {impact && <ImpactBadge impact={impact} />}
    </div>
    <p className={STYLES.newsItem.detail}>{detail}</p>
  </div>
);

// Main dashboard sections configuration
const DASHBOARD_SECTIONS = [
  { id: 'marketMoves', title: 'Market Moves', icon: TrendingUp },
  { id: 'modelPerformance', title: 'Model Performance', icon: Cpu },
  { id: 'keyIntegrations', title: 'Key Integrations', icon: Link2 },
  { id: 'challenges', title: 'Challenges', icon: Shield }
];

export default function Post({ post }) {
  const { dashboard } = post;

  return (
    <div className={STYLES.page.wrapper}>
      <div className={STYLES.page.container}>
        <div className={STYLES.page.header.wrapper}>
          <h1 className={STYLES.page.header.title}>{post.title}</h1>
          <p className={STYLES.page.header.excerpt}>{post.excerpt}</p>
        </div>

        <div className={STYLES.page.grid}>
          {DASHBOARD_SECTIONS.map(({ id, title, icon }) => (
            <SectionCard key={id} title={title} icon={icon}>
              {dashboard[id].map((item, index) => (
                <NewsItem key={index} {...item} />
              ))}
            </SectionCard>
          ))}
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
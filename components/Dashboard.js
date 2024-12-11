import { TrendingUp, Zap, GitBranch, AlertCircle } from 'lucide-react';

export default function Dashboard({ data }) {
  const sections = [
    { title: 'Market Movements', icon: TrendingUp, data: data.marketMoves },
    { title: 'Model Performance', icon: Zap, data: data.modelPerformance },
    { title: 'Key Integrations', icon: GitBranch, data: data.keyIntegrations },
    { title: 'Challenges', icon: AlertCircle, data: data.challenges }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {sections.map((section) => (
        <div key={section.title} className="border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <section.icon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">{section.title}</h2>
          </div>
          <div className="space-y-4">
            {Array.isArray(section.data) ? section.data.map((item, index) => (
              <div key={index} className="border-b pb-2">
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-600">{item.detail}</div>
                {item.impact && (
                  <span className={`inline-block px-2 py-1 text-xs rounded mt-1 ${
                    item.impact === 'high' ? 'bg-red-100 text-red-800' :
                    item.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {item.impact}
                  </span>
                )}
              </div>
            )) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
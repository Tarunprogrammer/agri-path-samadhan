import { FileText, Lightbulb, CloudRain, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import AIChatAssistant from '@/components/community/AIChatAssistant';
import Layout from '@/components/layout/Layout';

const Community = () => {
  const { t } = useLanguage();

  const schemes = [
    {
      name: 'PM-KISAN',
      description: 'Direct income support of ₹6000/year to farmer families',
      link: 'https://pmkisan.gov.in',
      status: 'Active',
    },
    {
      name: 'Fasal Bima Yojana',
      description: 'Crop insurance scheme for agricultural losses',
      link: 'https://pmfby.gov.in',
      status: 'Active',
    },
    {
      name: 'Kisan Credit Card',
      description: 'Easy credit access for farming needs',
      link: 'https://www.nabard.org',
      status: 'Active',
    },
    {
      name: 'Soil Health Card',
      description: 'Free soil testing and recommendations',
      link: 'https://soilhealth.dac.gov.in',
      status: 'Active',
    },
  ];

  const tips = [
    {
      title: 'Water Conservation',
      content: 'Use drip irrigation to save up to 60% water compared to flood irrigation.',
      category: 'Irrigation',
    },
    {
      title: 'Natural Pest Control',
      content: 'Plant marigold around vegetables to repel harmful insects naturally.',
      category: 'Pest Management',
    },
    {
      title: 'Soil Health',
      content: 'Rotate crops with legumes to naturally fix nitrogen in soil.',
      category: 'Soil Care',
    },
    {
      title: 'Storage Tips',
      content: 'Dry grains to below 14% moisture content before storage to prevent fungal growth.',
      category: 'Post-Harvest',
    },
  ];

  const weatherAlerts = [
    {
      type: 'Rain',
      message: 'Heavy rainfall expected in Telangana region on Dec 15-16',
      severity: 'warning',
    },
    {
      type: 'Temperature',
      message: 'Cold wave warning for North India. Protect your crops.',
      severity: 'alert',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('community.title')}
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              {t('community.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Government Schemes */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {t('community.schemes')}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {schemes.map((scheme, index) => (
                    <a
                      key={index}
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {scheme.name}
                        </h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {scheme.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{scheme.description}</p>
                      <div className="flex items-center text-primary text-sm font-medium">
                        Apply Now <ExternalLink className="w-3 h-3 ml-1" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Farming Tips */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  {t('community.tips')}
                </h2>
                <div className="space-y-4">
                  {tips.map((tip, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                          {tip.category}
                        </span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground">{tip.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weather Alerts */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <CloudRain className="w-5 h-5 text-primary" />
                  {t('community.weather')}
                </h2>
                <div className="space-y-4">
                  {weatherAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl ${
                        alert.severity === 'alert'
                          ? 'bg-destructive/10 border border-destructive/20'
                          : 'bg-accent/10 border border-accent/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CloudRain className={`w-5 h-5 ${
                          alert.severity === 'alert' ? 'text-destructive' : 'text-accent'
                        }`} />
                        <div>
                          <h4 className="font-semibold text-foreground">{alert.type} Alert</h4>
                          <p className="text-sm text-muted-foreground">{alert.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Chat Assistant */}
              <AIChatAssistant />

              {/* Expert Help */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {t('community.expertHelp')}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with agricultural experts for personalized guidance
                </p>
                <Button variant="outline" className="w-full">
                  Find Local Expert
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-4">Community Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-xs text-muted-foreground">Farmers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1.2K</div>
                    <div className="text-xs text-muted-foreground">Experts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">25K</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">98%</div>
                    <div className="text-xs text-muted-foreground">Resolved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Community;

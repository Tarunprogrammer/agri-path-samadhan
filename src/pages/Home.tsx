import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Search, TrendingUp, Users, Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import heroBg from '@/assets/hero-bg.jpg';

const Home = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Leaf,
      title: t('home.features.cropSelection'),
      description: t('home.features.cropSelectionDesc'),
      link: '/crop-advisor',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Search,
      title: t('home.features.diseaseDetection'),
      description: t('home.features.diseaseDetectionDesc'),
      link: '/disease-detection',
      color: 'bg-accent/10 text-accent',
    },
    {
      icon: TrendingUp,
      title: t('home.features.marketPrices'),
      description: t('home.features.marketPricesDesc'),
      link: '/market-insights',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Users,
      title: t('home.features.community'),
      description: t('home.features.communityDesc'),
      link: '/community',
      color: 'bg-accent/10 text-accent',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Active Farmers' },
    { value: '95%', label: 'Accuracy Rate' },
    { value: '100+', label: 'Crop Types' },
    { value: '6', label: 'Languages' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="Agricultural fields" 
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent backdrop-blur-sm mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Agriculture Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {t('home.hero.title')}
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {t('home.hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/crop-advisor">
                <Button variant="accent" size="xl" className="gap-2">
                  {t('home.hero.getStarted')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="hero-outline" size="xl">
                  {t('home.hero.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Smart Farming
            </h2>
            <p className="text-muted-foreground text-lg">
              Harness the power of AI to make better decisions for your farm
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-elevated transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose AgriPath AI?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We combine cutting-edge AI technology with deep agricultural expertise to bring you the most accurate and actionable insights.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Zap, title: 'Real-time Analysis', desc: 'Get instant recommendations based on current conditions' },
                  { icon: Shield, title: 'Trusted by Farmers', desc: 'Backed by agricultural research and farmer feedback' },
                  { icon: Sparkles, title: 'Multilingual Support', desc: 'Available in 6 regional languages for easy access' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl gradient-hero p-8 flex items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <Leaf className="w-24 h-24 mx-auto mb-6 animate-float" />
                  <h3 className="text-2xl font-bold mb-2">Your Digital Krushi Mitra</h3>
                  <p className="text-primary-foreground/80">AI-powered farming assistant in your pocket</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-accent/20 blur-2xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl bg-primary/20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of farmers who are already using AI to grow smarter.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button variant="hero" size="xl" className="gap-2">
                  Start Free Today
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

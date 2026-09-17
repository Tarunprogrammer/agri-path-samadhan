import { useState } from 'react';
import { TrendingUp, TrendingDown, MapPin, Phone, Calendar, ArrowUpRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';

const MarketInsights = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('rice');

  const crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Soybean', 'Groundnut', 'Onion', 'Tomato', 'Potato'];

  const priceData = {
    rice: {
      name: 'Rice (Paddy)',
      currentPrice: 2450,
      previousPrice: 2380,
      unit: 'per quintal',
      demandScore: 85,
      prediction: '+5-7%',
      bestTimeToSell: 'December - January',
      trend: 'up',
    },
    wheat: {
      name: 'Wheat',
      currentPrice: 2275,
      previousPrice: 2300,
      unit: 'per quintal',
      demandScore: 78,
      prediction: '+2-3%',
      bestTimeToSell: 'March - April',
      trend: 'down',
    },
  };

  const mandis = [
    { name: 'Secunderabad Mandi', distance: '12 km', price: 2480, phone: '+91 98765 43210' },
    { name: 'Uppal Agricultural Market', distance: '18 km', price: 2450, phone: '+91 98765 43211' },
    { name: 'Ghatkesar Mandi', distance: '25 km', price: 2420, phone: '+91 98765 43212' },
    { name: 'Medchal Market Yard', distance: '30 km', price: 2460, phone: '+91 98765 43213' },
  ];

  const priceHistory = [
    { month: 'Jul', price: 2200 },
    { month: 'Aug', price: 2280 },
    { month: 'Sep', price: 2320 },
    { month: 'Oct', price: 2380 },
    { month: 'Nov', price: 2450 },
    { month: 'Dec', price: 2520 },
  ];

  const maxPrice = Math.max(...priceHistory.map(p => p.price));
  const minPrice = Math.min(...priceHistory.map(p => p.price));

  const currentData = priceData[selectedCrop as keyof typeof priceData] || priceData.rice;
  const priceChange = ((currentData.currentPrice - currentData.previousPrice) / currentData.previousPrice * 100).toFixed(1);
  const isUp = currentData.trend === 'up';

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('market.title')}
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              {t('market.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search for crops..." className="pl-10" />
            </div>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t('market.selectCrop')} />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop.toLowerCase()}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Price Card */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Price */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{currentData.name}</h2>
                    <p className="text-muted-foreground text-sm">Live Market Price</p>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    isUp ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                  }`}>
                    {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {priceChange}%
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-xl bg-secondary">
                    <div className="text-3xl font-bold text-foreground">₹{currentData.currentPrice}</div>
                    <div className="text-sm text-muted-foreground">{currentData.unit}</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary">
                    <div className="text-3xl font-bold text-primary">{currentData.demandScore}%</div>
                    <div className="text-sm text-muted-foreground">{t('market.demandScore')}</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary">
                    <div className="text-3xl font-bold text-accent">{currentData.prediction}</div>
                    <div className="text-sm text-muted-foreground">{t('market.prediction')}</div>
                  </div>
                </div>
              </div>

              {/* Price Trend Chart */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">{t('market.priceTrend')}</h3>
                <div className="h-48 flex items-end justify-between gap-2">
                  {priceHistory.map((item, index) => {
                    const height = ((item.price - minPrice) / (maxPrice - minPrice)) * 100 + 20;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="text-xs text-muted-foreground">₹{item.price}</div>
                        <div
                          className="w-full rounded-t-lg gradient-hero transition-all hover:opacity-80"
                          style={{ height: `${height}%` }}
                        />
                        <div className="text-xs text-muted-foreground">{item.month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Best Time to Sell */}
              <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t('market.bestTime')}</h4>
                    <p className="text-lg text-accent font-bold">{currentData.bestTimeToSell}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Mandis */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t('market.nearbyMandis')}
                </h3>
                <div className="space-y-4">
                  {mandis.map((mandi, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground">{mandi.name}</h4>
                        <span className="text-lg font-bold text-primary">₹{mandi.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {mandi.distance}
                        </span>
                        <a
                          href={`tel:${mandi.phone}`}
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <Phone className="w-3 h-3" />
                          Call
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="hero" className="w-full" size="lg">
                <Phone className="w-4 h-4" />
                {t('market.contactBuyers')}
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MarketInsights;

import { useState } from 'react';
import { MapPin, Mic, RotateCcw, Sparkles, TrendingUp, Droplets, ThermometerSun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';

const CropAdvisor = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    location: '',
    soilType: '',
    season: '',
    waterAvailability: '',
    landSize: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Black Cotton', 'Red Soil', 'Alluvial'];
  const seasons = ['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)'];
  const waterOptions = ['Irrigated', 'Rain-fed', 'Limited Irrigation', 'Canal Water'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      location: '',
      soilType: '',
      season: '',
      waterAvailability: '',
      landSize: '',
    });
    setShowResults(false);
  };

  const mockResults = [
    {
      crop: 'Rice (Paddy)',
      yield: '45-50 quintals/hectare',
      profit: '₹80,000 - ₹1,00,000',
      suitability: 95,
      waterNeed: 'High',
      growthPeriod: '120-150 days',
    },
    {
      crop: 'Cotton',
      yield: '20-25 quintals/hectare',
      profit: '₹60,000 - ₹80,000',
      suitability: 88,
      waterNeed: 'Medium',
      growthPeriod: '150-180 days',
    },
    {
      crop: 'Maize',
      yield: '35-40 quintals/hectare',
      profit: '₹40,000 - ₹55,000',
      suitability: 82,
      waterNeed: 'Medium',
      growthPeriod: '90-120 days',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('crop.title')}
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              {t('crop.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft sticky top-24">
                <h2 className="text-xl font-semibold text-foreground mb-6">Enter Farm Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="location">{t('crop.location')}</Label>
                    <div className="relative">
                      <Input
                        id="location"
                        placeholder={t('crop.locationPlaceholder')}
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <MapPin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('crop.soilType')}</Label>
                    <Select
                      value={formData.soilType}
                      onValueChange={(value) => setFormData({ ...formData, soilType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('crop.selectSoil')} />
                      </SelectTrigger>
                      <SelectContent>
                        {soilTypes.map((soil) => (
                          <SelectItem key={soil} value={soil.toLowerCase()}>
                            {soil}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('crop.season')}</Label>
                    <Select
                      value={formData.season}
                      onValueChange={(value) => setFormData({ ...formData, season: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('crop.selectSeason')} />
                      </SelectTrigger>
                      <SelectContent>
                        {seasons.map((season) => (
                          <SelectItem key={season} value={season.toLowerCase()}>
                            {season}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('crop.waterAvailability')}</Label>
                    <Select
                      value={formData.waterAvailability}
                      onValueChange={(value) => setFormData({ ...formData, waterAvailability: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('crop.selectWater')} />
                      </SelectTrigger>
                      <SelectContent>
                        {waterOptions.map((option) => (
                          <SelectItem key={option} value={option.toLowerCase()}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="landSize">{t('crop.landSize')}</Label>
                    <Input
                      id="landSize"
                      type="number"
                      placeholder={t('crop.landSizePlaceholder')}
                      value={formData.landSize}
                      onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" variant="hero" className="flex-1" disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          {t('crop.getRecommendation')}
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
                      <RotateCcw className="w-4 h-4" />
                      {t('crop.reset')}
                    </Button>
                    <Button type="button" variant="secondary" className="flex-1">
                      <Mic className="w-4 h-4" />
                      {t('crop.voiceInput')}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
              {!showResults ? (
                <div className="bg-card rounded-2xl border border-border p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Get AI-Powered Recommendations
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Fill in your farm details to receive personalized crop recommendations based on AI analysis
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">AI Recommendations</h3>
                        <p className="text-sm text-muted-foreground">Based on your farm conditions</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Based on <strong>Black Cotton Soil</strong>, <strong>Kharif Season</strong>, and <strong>Irrigated</strong> water availability in your location, here are the best crops for your farm.
                    </p>
                  </div>

                  {mockResults.map((result, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-2xl border border-border p-6 hover:border-primary/50 hover:shadow-elevated transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-foreground">{result.crop}</h4>
                          <p className="text-muted-foreground text-sm">Growth Period: {result.growthPeriod}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{result.suitability}%</div>
                          <div className="text-xs text-muted-foreground">Suitability</div>
                        </div>
                      </div>

                      <div className="w-full bg-secondary rounded-full h-2 mb-6">
                        <div
                          className="gradient-hero h-2 rounded-full transition-all duration-500"
                          style={{ width: `${result.suitability}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 rounded-xl bg-secondary">
                          <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground mb-1">Expected Yield</div>
                          <div className="text-sm font-semibold text-foreground">{result.yield}</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-secondary">
                          <Droplets className="w-5 h-5 text-accent mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground mb-1">Water Need</div>
                          <div className="text-sm font-semibold text-foreground">{result.waterNeed}</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-secondary">
                          <ThermometerSun className="w-5 h-5 text-primary mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground mb-1">Est. Profit</div>
                          <div className="text-sm font-semibold text-foreground">{result.profit}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full" asChild>
                    <a href="/market-insights">
                      <TrendingUp className="w-4 h-4" />
                      Check Market Prices for These Crops
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CropAdvisor;

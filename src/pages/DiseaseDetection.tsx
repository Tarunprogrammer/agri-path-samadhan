import { useState, useCallback } from 'react';
import { Upload, Camera, Search, Download, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';

const DiseaseDetection = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
          setShowResults(false);
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setShowResults(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  const mockResult = {
    disease: 'Bacterial Leaf Blight',
    confidence: 94,
    severity: 'Moderate',
    crop: 'Rice',
    symptoms: [
      'Yellow-orange lesions on leaf margins',
      'Wilting and drying of leaves',
      'Lesions appear water-soaked initially',
    ],
    treatment: [
      'Apply copper-based fungicides (Copper hydroxide 2g/L)',
      'Remove and destroy infected plant parts',
      'Maintain proper field drainage',
      'Avoid excess nitrogen fertilization',
    ],
    prevention: [
      'Use resistant varieties',
      'Seed treatment with Streptocycline',
      'Balanced fertilizer application',
      'Proper spacing between plants',
    ],
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('disease.title')}
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              {t('disease.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
                  dragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Selected leaf"
                      className="w-full h-64 object-contain rounded-xl bg-secondary"
                    />
                    <div className="flex gap-3">
                      <label className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <Button variant="outline" className="w-full" asChild>
                          <span>
                            <Upload className="w-4 h-4" />
                            Change Image
                          </span>
                        </Button>
                      </label>
                      <Button
                        variant="hero"
                        className="flex-1"
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Search className="w-4 h-4" />
                            {t('disease.analyze')}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                      <Upload className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {t('disease.dragDrop')}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Supports JPG, PNG, WEBP (Max 10MB)
                    </p>
                    <div className="flex gap-3 justify-center">
                      <label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <Button variant="default" asChild>
                          <span>
                            <Upload className="w-4 h-4" />
                            {t('disease.upload')}
                          </span>
                        </Button>
                      </label>
                      <Button variant="outline">
                        <Camera className="w-4 h-4" />
                        {t('disease.capture')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tips Card */}
              <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Tips for Better Results</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Take photos in natural daylight</li>
                      <li>• Focus on affected leaf area clearly</li>
                      <li>• Include both healthy and infected parts</li>
                      <li>• Avoid blurry or dark images</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div>
              {!showResults ? (
                <div className="bg-card rounded-2xl border border-border p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Upload a Leaf Image
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Our AI will analyze the image and detect any diseases, providing treatment recommendations
                  </p>
                </div>
              ) : (
                <div className="bg-card rounded-2xl border border-border overflow-hidden">
                  {/* Header */}
                  <div className="p-6 bg-destructive/10 border-b border-destructive/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-destructive" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{mockResult.disease}</h3>
                          <p className="text-muted-foreground text-sm">Detected in {mockResult.crop}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-destructive">{mockResult.confidence}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Severity */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">Severity:</span>
                      <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                        {mockResult.severity}
                      </span>
                    </div>

                    {/* Symptoms */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        Symptoms
                      </h4>
                      <ul className="space-y-2">
                        {mockResult.symptoms.map((symptom, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Treatment */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Treatment Steps
                      </h4>
                      <ul className="space-y-2">
                        {mockResult.treatment.map((step, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prevention */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-accent" />
                        Prevention Tips
                      </h4>
                      <ul className="space-y-2">
                        {mockResult.prevention.map((tip, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-border">
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4" />
                        {t('disease.saveReport')}
                      </Button>
                      <Button variant="default" className="flex-1">
                        Ask AI for More Details
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DiseaseDetection;

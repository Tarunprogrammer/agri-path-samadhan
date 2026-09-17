import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'te' | 'hi' | 'ta' | 'kn' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.cropAdvisor': 'Crop Advisor',
    'nav.diseaseDetection': 'Disease Detection',
    'nav.marketInsights': 'Market Insights',
    'nav.community': 'Community',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    
    // Home Page
    'home.hero.title': 'Smart Farming with AI',
    'home.hero.subtitle': 'Empowering farmers with intelligent crop selection, disease detection, and market insights',
    'home.hero.getStarted': 'Get Started',
    'home.hero.learnMore': 'Learn More',
    'home.features.cropSelection': 'Smart Crop Selection',
    'home.features.cropSelectionDesc': 'AI-powered recommendations based on your soil, climate, and market demand',
    'home.features.diseaseDetection': 'Disease Detection',
    'home.features.diseaseDetectionDesc': 'Upload leaf images for instant AI diagnosis and treatment advice',
    'home.features.marketPrices': 'Market Prices',
    'home.features.marketPricesDesc': 'Live mandi rates and price predictions to maximize your profits',
    'home.features.community': 'Farmer Community',
    'home.features.communityDesc': 'Connect with experts and access government schemes',
    
    // Crop Selection
    'crop.title': 'Smart Crop Selection',
    'crop.subtitle': 'Get AI-powered crop recommendations based on your farm conditions',
    'crop.location': 'Location',
    'crop.locationPlaceholder': 'Enter your location or use GPS',
    'crop.soilType': 'Soil Type',
    'crop.selectSoil': 'Select soil type',
    'crop.season': 'Season',
    'crop.selectSeason': 'Select season',
    'crop.waterAvailability': 'Water Availability',
    'crop.selectWater': 'Select water availability',
    'crop.landSize': 'Land Size (Acres)',
    'crop.landSizePlaceholder': 'Enter land size',
    'crop.getRecommendation': 'Get AI Recommendation',
    'crop.reset': 'Reset',
    'crop.voiceInput': 'Voice Input',
    
    // Disease Detection
    'disease.title': 'Crop Disease Detection',
    'disease.subtitle': 'Upload a leaf image for instant AI-powered disease diagnosis',
    'disease.upload': 'Upload Image',
    'disease.capture': 'Capture Photo',
    'disease.analyze': 'Analyze Disease',
    'disease.treatment': 'Treatment Advice',
    'disease.saveReport': 'Save Report',
    'disease.dragDrop': 'Drag and drop an image or click to upload',
    
    // Market Insights
    'market.title': 'Market Insights',
    'market.subtitle': 'Real-time prices and AI-powered market predictions',
    'market.selectCrop': 'Select Crop',
    'market.nearbyMandis': 'Nearby Mandis',
    'market.priceTrend': 'Price Trend',
    'market.bestTime': 'Best Time to Sell',
    'market.contactBuyers': 'Contact Buyers',
    'market.currentPrice': 'Current Price',
    'market.demandScore': 'Demand Score',
    'market.prediction': '7-Day Prediction',
    
    // Community
    'community.title': 'Farmer Community',
    'community.subtitle': 'Connect, learn, and grow together',
    'community.schemes': 'Government Schemes',
    'community.tips': 'Farming Tips',
    'community.weather': 'Weather Alerts',
    'community.askAI': 'Ask AI Assistant',
    'community.expertHelp': 'Expert Help',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Create Account',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.continueAsGuest': 'Continue as Guest',
    'auth.otpLogin': 'Login with OTP',
    'auth.phone': 'Phone Number',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.submit': 'Submit',
  },
  te: {
    'nav.home': 'హోమ్',
    'nav.cropAdvisor': 'పంట సలహాదారు',
    'nav.diseaseDetection': 'వ్యాధి గుర్తింపు',
    'nav.marketInsights': 'మార్కెట్ అంతర్దృష్టులు',
    'nav.community': 'సమాజం',
    'nav.login': 'లాగిన్',
    'nav.signup': 'సైన్ అప్',
    'home.hero.title': 'AI తో స్మార్ట్ వ్యవసాయం',
    'home.hero.subtitle': 'తెలివైన పంట ఎంపిక, వ్యాధి గుర్తింపు మరియు మార్కెట్ అంతర్దృష్టులతో రైతులకు సాధికారత',
    'home.hero.getStarted': 'ప్రారంభించండి',
    'home.hero.learnMore': 'మరింత తెలుసుకోండి',
  },
  hi: {
    'nav.home': 'होम',
    'nav.cropAdvisor': 'फसल सलाहकार',
    'nav.diseaseDetection': 'रोग पहचान',
    'nav.marketInsights': 'बाजार जानकारी',
    'nav.community': 'समुदाय',
    'nav.login': 'लॉग इन',
    'nav.signup': 'साइन अप',
    'home.hero.title': 'AI के साथ स्मार्ट खेती',
    'home.hero.subtitle': 'बुद्धिमान फसल चयन, रोग पहचान और बाजार अंतर्दृष्टि के साथ किसानों को सशक्त बनाना',
    'home.hero.getStarted': 'शुरू करें',
    'home.hero.learnMore': 'और जानें',
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.cropAdvisor': 'பயிர் ஆலோசகர்',
    'nav.diseaseDetection': 'நோய் கண்டறிதல்',
    'nav.marketInsights': 'சந்தை நுண்ணறிவுகள்',
    'nav.community': 'சமூகம்',
    'nav.login': 'உள்நுழை',
    'nav.signup': 'பதிவு செய்',
    'home.hero.title': 'AI உடன் ஸ்மார்ட் விவசாயம்',
    'home.hero.subtitle': 'புத்திசாலித்தனமான பயிர் தேர்வு, நோய் கண்டறிதல் மற்றும் சந்தை நுண்ணறிவுகளுடன் விவசாயிகளை மேம்படுத்துதல்',
    'home.hero.getStarted': 'தொடங்கு',
    'home.hero.learnMore': 'மேலும் அறிய',
  },
  kn: {
    'nav.home': 'ಮುಖಪುಟ',
    'nav.cropAdvisor': 'ಬೆಳೆ ಸಲಹೆಗಾರ',
    'nav.diseaseDetection': 'ರೋಗ ಪತ್ತೆ',
    'nav.marketInsights': 'ಮಾರುಕಟ್ಟೆ ಒಳನೋಟಗಳು',
    'nav.community': 'ಸಮುದಾಯ',
    'nav.login': 'ಲಾಗಿನ್',
    'nav.signup': 'ಸೈನ್ ಅಪ್',
    'home.hero.title': 'AI ಜೊತೆ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ',
    'home.hero.subtitle': 'ಬುದ್ಧಿವಂತ ಬೆಳೆ ಆಯ್ಕೆ, ರೋಗ ಪತ್ತೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಒಳನೋಟಗಳೊಂದಿಗೆ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು',
    'home.hero.getStarted': 'ಪ್ರಾರಂಭಿಸಿ',
    'home.hero.learnMore': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
  },
  mr: {
    'nav.home': 'मुख्यपृष्ठ',
    'nav.cropAdvisor': 'पीक सल्लागार',
    'nav.diseaseDetection': 'रोग शोध',
    'nav.marketInsights': 'बाजार माहिती',
    'nav.community': 'समुदाय',
    'nav.login': 'लॉग इन',
    'nav.signup': 'साइन अप',
    'home.hero.title': 'AI सह स्मार्ट शेती',
    'home.hero.subtitle': 'बुद्धिमान पीक निवड, रोग शोध आणि बाजार अंतर्दृष्टीसह शेतकऱ्यांना सक्षम करणे',
    'home.hero.getStarted': 'सुरू करा',
    'home.hero.learnMore': 'अधिक जाणून घ्या',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  te: 'తెలుగు',
  hi: 'हिंदी',
  ta: 'தமிழ்',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी',
};

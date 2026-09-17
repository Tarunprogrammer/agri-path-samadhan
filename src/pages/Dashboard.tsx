import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Search, TrendingUp, FileText, Settings, LogOut, Plus, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const recentAnalyses = [
    { crop: 'Rice', date: 'Dec 10, 2024', status: 'Completed', yield: '48 Q/ha' },
    { crop: 'Cotton', date: 'Dec 5, 2024', status: 'Completed', yield: '22 Q/ha' },
    { crop: 'Maize', date: 'Nov 28, 2024', status: 'Pending', yield: '-' },
  ];

  const diseaseHistory = [
    { crop: 'Rice', disease: 'Bacterial Leaf Blight', date: 'Dec 8, 2024', treated: true },
    { crop: 'Cotton', disease: 'Pink Bollworm', date: 'Nov 20, 2024', treated: true },
  ];

  const savedReports = [
    { title: 'Rice Market Analysis', date: 'Dec 10, 2024', type: 'Market' },
    { title: 'Kharif Season Plan', date: 'Nov 15, 2024', type: 'Crop' },
    { title: 'Disease Treatment Guide', date: 'Nov 10, 2024', type: 'Disease' },
  ];

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'Farmer';

  return (
    <Layout>
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {displayName}!</h1>
              <p className="text-muted-foreground">Here's an overview of your farm analytics</p>
              {profile?.email && (
                <p className="text-sm text-muted-foreground mt-1">{profile.email}</p>
              )}
            </div>
            <div className="flex gap-3">
              <Link to="/crop-advisor">
                <Button variant="default">
                  <Plus className="w-4 h-4" />
                  New Analysis
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Analyses', value: '24', icon: Leaf, color: 'bg-primary/10 text-primary' },
              { label: 'Diseases Detected', value: '8', icon: Search, color: 'bg-destructive/10 text-destructive' },
              { label: 'Market Reports', value: '12', icon: TrendingUp, color: 'bg-accent/10 text-accent' },
              { label: 'Saved Reports', value: '15', icon: FileText, color: 'bg-primary/10 text-primary' },
            ].map((stat, index) => (
              <div key={index} className="bg-card rounded-2xl border border-border p-5">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Crop Analyses */}
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">My Crops</h2>
                <Link to="/crop-advisor">
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Crop</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Expected Yield</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAnalyses.map((analysis, index) => (
                      <tr key={index} className="border-b border-border last:border-0">
                        <td className="py-4 font-medium text-foreground">{analysis.crop}</td>
                        <td className="py-4 text-muted-foreground">{analysis.date}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            analysis.status === 'Completed'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-accent/10 text-accent'
                          }`}>
                            {analysis.status}
                          </span>
                        </td>
                        <td className="py-4 text-foreground">{analysis.yield}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              {/* Disease History */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Disease History</h3>
                <div className="space-y-3">
                  {diseaseHistory.map((item, index) => (
                    <div key={index} className="p-3 rounded-xl bg-secondary">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground text-sm">{item.crop}</span>
                        {item.treated && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            Treated
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.disease}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                    </div>
                  ))}
                </div>
                <Link to="/disease-detection">
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    <Search className="w-4 h-4" />
                    New Scan
                  </Button>
                </Link>
              </div>

              {/* Saved Reports */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Saved Reports</h3>
                <div className="space-y-3">
                  {savedReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer">
                      <div>
                        <p className="font-medium text-foreground text-sm">{report.title}</p>
                        <p className="text-xs text-muted-foreground">{report.date}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {report.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;

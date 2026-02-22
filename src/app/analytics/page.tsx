'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Eye, MousePointer, Target, ChevronDown } from 'lucide-react';

interface GSCSite {
  siteUrl: string;
  permissionLevel: string;
}

interface GSCData {
  site: string;
  period: {
    start: string;
    end: string;
  };
  totals: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  };
  topQueries: Array<{
    keys: string[];
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  topPages: Array<{
    keys: string[];
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
}

interface SiteWithData extends GSCSite {
  data?: GSCData;
  loading?: boolean;
  error?: string;
}

export default function Analytics() {
  const [sites, setSites] = useState<SiteWithData[]>([]);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [selectedSiteData, setSelectedSiteData] = useState<GSCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch all sites
  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/analytics/gsc');
      const data = await response.json();
      
      if (data.error) {
        console.error('Error fetching sites:', data.error);
        setError('Kan GSC-sites niet ophalen: ' + data.details);
        return;
      }

      const sitesWithData = data.siteUrls || [];
      setSites(sitesWithData);
      
      // Fetch data for each site in the background
      sitesWithData.forEach((site: GSCSite) => {
        fetchSiteData(site.siteUrl);
      });
    } catch (error) {
      console.error('Failed to fetch sites:', error);
      setError('Netwerk error bij ophalen sites');
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteData = async (siteUrl: string) => {
    try {
      setSites(prev => prev.map(s => 
        s.siteUrl === siteUrl ? { ...s, loading: true, error: undefined } : s
      ));

      const response = await fetch(`/api/analytics/gsc?site=${encodeURIComponent(siteUrl)}&days=28`);
      const data = await response.json();
      
      if (data.error) {
        setSites(prev => prev.map(s => 
          s.siteUrl === siteUrl 
            ? { ...s, loading: false, error: data.details }
            : s
        ));
      } else {
        setSites(prev => prev.map(s => 
          s.siteUrl === siteUrl 
            ? { ...s, data, loading: false, error: undefined }
            : s
        ));
      }
    } catch (error) {
      console.error(`Failed to fetch data for ${siteUrl}:`, error);
      setSites(prev => prev.map(s => 
        s.siteUrl === siteUrl ? { ...s, loading: false, error: 'Netwerk error' } : s
      ));
    }
  };

  const getPositionColor = (position: number) => {
    if (position < 10) return 'text-green-500';
    if (position <= 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPositionBgColor = (position: number) => {
    if (position < 10) return 'bg-green-500/10 border-green-500/20';
    if (position <= 20) return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatPercentage = (num: number) => `${(num * 100).toFixed(1)}%`;

  const getLowHangingFruits = (queries: GSCData['topQueries']) => {
    return queries
      .filter(q => q.position >= 5 && q.position <= 20 && q.impressions > 100 && q.clicks < q.impressions * 0.05)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 10);
  };

  // Sort sites by clicks (descending)
  const sortedSites = [...sites].sort((a, b) => {
    const aClicks = a.data?.totals.clicks || 0;
    const bClicks = b.data?.totals.clicks || 0;
    return bClicks - aClicks;
  });

  const handleSiteClick = async (siteUrl: string) => {
    setSelectedSite(siteUrl);
    const siteData = sites.find(s => s.siteUrl === siteUrl)?.data;
    setSelectedSiteData(siteData || null);
  };

  const handleSiteSelect = (siteUrl: string) => {
    handleSiteClick(siteUrl);
    setShowDropdown(false);
  };

  const getTotalMetrics = () => {
    return sites.reduce((totals, site) => {
      if (site.data) {
        totals.clicks += site.data.totals.clicks;
        totals.impressions += site.data.totals.impressions;
        totals.sitesCount += 1;
        totals.avgPosition += site.data.totals.position;
      }
      return totals;
    }, { clicks: 0, impressions: 0, sitesCount: 0, avgPosition: 0 });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-8 h-8 text-[#F5911E]" />
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>
        <div className="text-gray-400">Sites laden...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-8 h-8 text-[#F5911E]" />
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
          <h3 className="text-red-400 font-semibold mb-2">Error</h3>
          <p className="text-red-300">{error}</p>
          <button 
            onClick={fetchSites}
            className="mt-4 px-4 py-2 bg-[#F5911E] hover:bg-[#F5911E]/80 rounded-lg"
          >
            Opnieuw proberen
          </button>
        </div>
      </div>
    );
  }

  if (selectedSite && selectedSiteData) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-[#F5911E]" />
            <div>
              <h1 className="text-3xl font-bold">Analytics Detail</h1>
              <p className="text-gray-400">{selectedSiteData.site}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedSite(null);
              setSelectedSiteData(null);
            }}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700"
          >
            ← Terug naar Overzicht
          </button>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <MousePointer className="w-5 h-5" />
              Klikken
            </div>
            <div className="text-3xl font-bold text-blue-400">
              {formatNumber(selectedSiteData.totals.clicks)}
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Eye className="w-5 h-5" />
              Vertoningen
            </div>
            <div className="text-3xl font-bold text-yellow-400">
              {formatNumber(selectedSiteData.totals.impressions)}
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
            <div className="text-gray-400 mb-2">CTR</div>
            <div className="text-3xl font-bold text-green-400">
              {formatPercentage(selectedSiteData.totals.ctr)}
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
            <div className="text-gray-400 mb-2">Gem. Positie</div>
            <div className={`text-3xl font-bold ${getPositionColor(selectedSiteData.totals.position)}`}>
              {selectedSiteData.totals.position.toFixed(1)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Keywords */}
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#F5911E]" />
              Top Zoekopdrachten
            </h3>
            <div className="space-y-2">
              {selectedSiteData.topQueries.map((query, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{query.keys[0]}</div>
                    <div className="text-sm text-gray-400">
                      Positie: <span className={getPositionColor(query.position)}>{query.position.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-blue-400">{formatNumber(query.clicks)} klik</span> • 
                      <span className="text-gray-400"> {formatNumber(query.impressions)} vert</span>
                    </div>
                    <div className="text-sm text-green-400">
                      CTR: {formatPercentage(query.ctr)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#F5911E]" />
              Top Pagina's
            </h3>
            <div className="space-y-2">
              {selectedSiteData.topPages.map((page, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm truncate">{page.keys[0]}</div>
                    <div className="text-sm text-gray-400">
                      Positie: <span className={getPositionColor(page.position)}>{page.position.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-blue-400">{formatNumber(page.clicks)} klik</span> • 
                      <span className="text-gray-400"> {formatNumber(page.impressions)} vert</span>
                    </div>
                    <div className="text-sm text-green-400">
                      CTR: {formatPercentage(page.ctr)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Hanging Fruits */}
        <div className="mt-8 bg-gradient-to-r from-[#F5911E]/10 to-orange-600/10 rounded-lg border border-[#F5911E]/20 p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#F5911E]" />
            🍎 Kansen voor Optimalisatie
            <span className="text-sm font-normal text-gray-400">
              (Positie 5-20, Hoge vertoningen, Lage klikken = Optimalisatie mogelijkheden!)
            </span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {getLowHangingFruits(selectedSiteData.topQueries).map((query, index) => (
              <div key={index} className="bg-gray-900/50 rounded-lg border border-gray-800 p-4">
                <div className="font-medium mb-2">{query.keys[0]}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Positie</div>
                    <div className={getPositionColor(query.position)}>#{query.position.toFixed(1)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Vertoningen</div>
                    <div className="text-yellow-400">{formatNumber(query.impressions)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Klikken</div>
                    <div className="text-blue-400">{formatNumber(query.clicks)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">CTR</div>
                    <div className="text-green-400">{formatPercentage(query.ctr)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {getLowHangingFruits(selectedSiteData.topQueries).length === 0 && (
            <p className="text-gray-400">Geen optimalisatie kansen gevonden.</p>
          )}
        </div>
      </div>
    );
  }

  const totalMetrics = getTotalMetrics();
  const avgCTR = totalMetrics.impressions > 0 ? totalMetrics.clicks / totalMetrics.impressions : 0;
  const avgPosition = totalMetrics.sitesCount > 0 ? totalMetrics.avgPosition / totalMetrics.sitesCount : 0;

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="w-8 h-8 text-[#F5911E]" />
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      </div>

      {/* Site Selector Dropdown */}
      <div className="mb-8">
        <div className="relative inline-block">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700"
          >
            Site kiezen
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showDropdown && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-gray-800 rounded-lg border border-gray-700 shadow-lg z-10">
              <div className="max-h-60 overflow-y-auto p-2">
                {sortedSites.map((site) => (
                  <button
                    key={site.siteUrl}
                    onClick={() => handleSiteSelect(site.siteUrl)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded-lg"
                  >
                    <div className="font-medium">
                      {site.siteUrl.replace(/^https?:\/\//, '').replace('www.', '')}
                    </div>
                    <div className="text-sm text-gray-400">
                      {site.data ? `${formatNumber(site.data.totals.clicks)} klikken` : 'Laden...'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Multi-site Overview */}
      <div className="mb-8 bg-gray-900/50 rounded-lg border border-gray-800 p-6">
        <h2 className="text-2xl font-semibold mb-4">Portfolio Overzicht</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">{formatNumber(totalMetrics.clicks)}</div>
            <div className="text-gray-400">Totaal Klikken</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{formatNumber(totalMetrics.impressions)}</div>
            <div className="text-gray-400">Totaal Vertoningen</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{formatPercentage(avgCTR)}</div>
            <div className="text-gray-400">Gem. CTR</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getPositionColor(avgPosition)}`}>{avgPosition.toFixed(1)}</div>
            <div className="text-gray-400">Gem. Positie</div>
          </div>
        </div>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSites.map((site, index) => (
          <div
            key={site.siteUrl}
            onClick={() => handleSiteClick(site.siteUrl)}
            className={`cursor-pointer p-6 rounded-lg border transition-all hover:border-[#F5911E]/50 hover:shadow-lg ${
              site.data ? getPositionBgColor(site.data.totals.position) : 'bg-gray-900/50 border-gray-800'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg truncate">
                  {site.siteUrl.replace(/^https?:\/\//, '').replace('www.', '')}
                </h3>
                <p className="text-sm text-gray-400">{site.siteUrl}</p>
              </div>
              <div className="text-2xl font-bold text-[#F5911E]">#{index + 1}</div>
            </div>

            {site.loading ? (
              <div className="text-gray-400">Laden...</div>
            ) : site.error ? (
              <div className="text-red-400 text-sm">Error: {site.error}</div>
            ) : site.data ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                      <MousePointer className="w-4 h-4" />
                      Klikken
                    </div>
                    <div className="text-xl font-bold text-blue-400">
                      {formatNumber(site.data.totals.clicks)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                      <Eye className="w-4 h-4" />
                      Vertoningen
                    </div>
                    <div className="text-xl font-bold text-yellow-400">
                      {formatNumber(site.data.totals.impressions)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">CTR</div>
                    <div className="text-lg font-bold text-green-400">
                      {formatPercentage(site.data.totals.ctr)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Gem. Positie</div>
                    <div className={`text-lg font-bold ${getPositionColor(site.data.totals.position)}`}>
                      {site.data.totals.position.toFixed(1)}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 pt-2 border-t border-gray-800">
                  Periode: {site.data.period.start} tot {site.data.period.end}
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Geen data beschikbaar</div>
            )}
          </div>
        ))}
      </div>

      {sites.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Geen sites gevonden. Zorg ervoor dat je Google Search Console correct is geconfigureerd.</p>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Eye, MousePointer, Target } from 'lucide-react';

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
}

export default function Analytics() {
  const [sites, setSites] = useState<SiteWithData[]>([]);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [selectedSiteData, setSelectedSiteData] = useState<GSCData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all sites
  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/gsc');
      const data = await response.json();
      
      if (data.error) {
        console.error('Error fetching sites:', data.error);
        return;
      }

      const sitesWithData = data.siteUrls || [];
      setSites(sitesWithData);
      
      // Fetch data for each site
      for (const site of sitesWithData) {
        fetchSiteData(site.siteUrl);
      }
    } catch (error) {
      console.error('Failed to fetch sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteData = async (siteUrl: string) => {
    try {
      setSites(prev => prev.map(s => 
        s.siteUrl === siteUrl ? { ...s, loading: true } : s
      ));

      const response = await fetch(`/api/analytics/gsc?site=${encodeURIComponent(siteUrl)}`);
      const data = await response.json();
      
      if (!data.error) {
        setSites(prev => prev.map(s => 
          s.siteUrl === siteUrl 
            ? { ...s, data, loading: false }
            : s
        ));
      }
    } catch (error) {
      console.error(`Failed to fetch data for ${siteUrl}:`, error);
      setSites(prev => prev.map(s => 
        s.siteUrl === siteUrl ? { ...s, loading: false } : s
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

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-8 h-8 text-[#F5911E]" />
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>
        <div className="text-gray-400">Loading sites...</div>
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
            ← Back to Overview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Keywords */}
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#F5911E]" />
              Top 20 Keywords
            </h3>
            <div className="space-y-2">
              {selectedSiteData.topQueries.map((query, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{query.keys[0]}</div>
                    <div className="text-sm text-gray-400">
                      Position: <span className={getPositionColor(query.position)}>{query.position.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-blue-400">{formatNumber(query.clicks)} clicks</span> • 
                      <span className="text-gray-400"> {formatNumber(query.impressions)} imp</span>
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
              Top 20 Pages
            </h3>
            <div className="space-y-2">
              {selectedSiteData.topPages.map((page, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm truncate">{page.keys[0]}</div>
                    <div className="text-sm text-gray-400">
                      Position: <span className={getPositionColor(page.position)}>{page.position.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-blue-400">{formatNumber(page.clicks)} clicks</span> • 
                      <span className="text-gray-400"> {formatNumber(page.impressions)} imp</span>
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
            🍎 Low Hanging Fruits
            <span className="text-sm font-normal text-gray-400">
              (Position 5-20, High impressions, Low clicks = Optimization opportunities!)
            </span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {getLowHangingFruits(selectedSiteData.topQueries).map((query, index) => (
              <div key={index} className="bg-gray-900/50 rounded-lg border border-gray-800 p-4">
                <div className="font-medium mb-2">{query.keys[0]}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Position</div>
                    <div className={getPositionColor(query.position)}>#{query.position.toFixed(1)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Impressions</div>
                    <div className="text-yellow-400">{formatNumber(query.impressions)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Clicks</div>
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
            <p className="text-gray-400">No low-hanging fruit opportunities found.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="w-8 h-8 text-[#F5911E]" />
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      </div>

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
              <div className="text-gray-400">Loading...</div>
            ) : site.data ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                      <MousePointer className="w-4 h-4" />
                      Clicks
                    </div>
                    <div className="text-xl font-bold text-blue-400">
                      {formatNumber(site.data.totals.clicks)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                      <Eye className="w-4 h-4" />
                      Impressions
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
                    <div className="text-sm text-gray-400 mb-1">Avg Position</div>
                    <div className={`text-lg font-bold ${getPositionColor(site.data.totals.position)}`}>
                      {site.data.totals.position.toFixed(1)}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 pt-2 border-t border-gray-800">
                  Period: {site.data.period.start} to {site.data.period.end}
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No data available</div>
            )}
          </div>
        ))}
      </div>

      {sites.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No sites found. Make sure your Google Search Console is properly configured.</p>
        </div>
      )}
    </div>
  );
}
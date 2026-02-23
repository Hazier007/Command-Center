"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  Search, 
  Eye, 
  MousePointer, 
  Target, 
  RefreshCw, 
  Zap,
  Filter,
  CheckSquare,
  AlertCircle,
  Loader2,
  BarChart3
} from "lucide-react";
import { SEOOpportunity } from '../api/seo/opportunities/route';

interface SEOStats {
  totalOpportunities: number;
  estimatedClicks: number;
  sitesAnalyzed: number;
}

interface SEOData {
  opportunities: SEOOpportunity[];
  stats: SEOStats;
  lastUpdated: string;
}

const statusColors = {
  nieuw: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  research: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  optimalisatie: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  review: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  live: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const statusLabels = {
  nieuw: 'Nieuw',
  research: 'Research',
  optimalisatie: 'Optimalisatie',
  review: 'Review',
  live: 'Live',
};

const getPositionColor = (position: number) => {
  if (position <= 3) return 'text-green-400';
  if (position <= 10) return 'text-yellow-400';
  return 'text-orange-400';
};

export default function SEOPage() {
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selectedOpportunities, setSelectedOpportunities] = useState<Set<string>>(new Set());
  const [autoPilot, setAutoPilot] = useState(false);
  
  // Filters
  const [siteFilter, setSiteFilter] = useState<string>('all');
  const [minImpressions, setMinImpressions] = useState<string>('50');
  const [positionRange, setPositionRange] = useState<string>('4-20');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchOpportunities = async (refresh = false) => {
    try {
      setRefreshing(refresh);
      const response = await fetch(`/api/seo/opportunities${refresh ? '?refresh=true' : ''}`);
      const data = await response.json();
      
      if (response.ok) {
        setSeoData(data);
      } else {
        console.error('Error fetching opportunities:', data.error);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const generateTasks = async () => {
    if (selectedOpportunities.size === 0) return;
    
    try {
      setGenerating(true);
      const opportunities = seoData?.opportunities.filter(opp => 
        selectedOpportunities.has(opp.id)
      ) || [];

      const response = await fetch('/api/seo/generate-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opportunities })
      });

      const result = await response.json();
      
      if (response.ok) {
        alert(`✅ ${result.tasksCreated} taken succesvol aangemaakt!`);
        setSelectedOpportunities(new Set());
        // Refresh opportunities to update task status
        fetchOpportunities(true);
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error generating tasks:', error);
      alert('❌ Er ging iets mis bij het aanmaken van taken');
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // Filter opportunities
  const filteredOpportunities = seoData?.opportunities.filter(opp => {
    if (siteFilter !== 'all' && opp.siteDomain !== siteFilter) return false;
    if (opp.impressions < parseInt(minImpressions)) return false;
    
    const [minPos, maxPos] = positionRange.split('-').map(Number);
    if (opp.currentPosition < minPos || opp.currentPosition > maxPos) return false;
    
    if (statusFilter !== 'all' && opp.status !== statusFilter) return false;
    
    return true;
  }) || [];

  // Get unique sites for filter
  const uniqueSites = [...new Set(seoData?.opportunities.map(opp => opp.siteDomain) || [])];

  const toggleOpportunitySelection = (id: string) => {
    const newSelected = new Set(selectedOpportunities);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedOpportunities(newSelected);
  };

  const selectAll = () => {
    if (selectedOpportunities.size === filteredOpportunities.length) {
      setSelectedOpportunities(new Set());
    } else {
      setSelectedOpportunities(new Set(filteredOpportunities.map(opp => opp.id)));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center gap-2 text-zinc-400">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>SEO kansen laden...</span>
        </div>
      </div>
    );
  }

  if (!seoData) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center text-zinc-400">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" />
          <p>Er ging iets mis bij het laden van SEO kansen.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => fetchOpportunities(true)}
          >
            Opnieuw proberen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">SEO Kansen</h1>
          <p className="text-zinc-400 mt-1">
            Identificeer en optimaliseer low-hanging fruit keywords
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => fetchOpportunities(true)}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Scan Nu
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Auto-pilot</span>
            <Button
              variant={autoPilot ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoPilot(!autoPilot)}
              className={autoPilot ? "bg-[#F5911E] hover:bg-[#F5911E]/80" : ""}
            >
              <Zap className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Totaal Kansen</CardTitle>
            <Target className="h-4 w-4 text-[#F5911E]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{seoData.stats.totalOpportunities}</div>
            <p className="text-xs text-zinc-500">
              {filteredOpportunities.length} gefilterd
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Geschat Extra Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              +{seoData.stats.estimatedClicks.toLocaleString()}/maand
            </div>
            <p className="text-xs text-zinc-500">
              Bij optimalisatie
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Sites Geanalyseerd</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{seoData.stats.sitesAnalyzed}</div>
            <p className="text-xs text-zinc-500">
              Live websites
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">Website</label>
              <Select value={siteFilter} onValueChange={setSiteFilter}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle websites</SelectItem>
                  {uniqueSites.map(site => (
                    <SelectItem key={site} value={site}>{site}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">Min. Vertoningen</label>
              <Select value={minImpressions} onValueChange={setMinImpressions}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50+</SelectItem>
                  <SelectItem value="100">100+</SelectItem>
                  <SelectItem value="200">200+</SelectItem>
                  <SelectItem value="500">500+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">Positie Range</label>
              <Select value={positionRange} onValueChange={setPositionRange}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4-10">4-10</SelectItem>
                  <SelectItem value="4-20">4-20</SelectItem>
                  <SelectItem value="11-20">11-20</SelectItem>
                  <SelectItem value="11-50">11-50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle statussen</SelectItem>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      {filteredOpportunities.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={selectAll}
              className="gap-2"
            >
              <CheckSquare className="h-4 w-4" />
              {selectedOpportunities.size === filteredOpportunities.length ? 'Deselecteer alles' : 'Selecteer alles'}
            </Button>
            
            {selectedOpportunities.size > 0 && (
              <span className="text-sm text-zinc-400">
                {selectedOpportunities.size} geselecteerd
              </span>
            )}
          </div>

          <Button
            onClick={generateTasks}
            disabled={selectedOpportunities.size === 0 || generating}
            className="bg-[#F5911E] hover:bg-[#F5911E]/80 gap-2"
          >
            {generating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
            Genereer Taken ({selectedOpportunities.size})
          </Button>
        </div>
      )}

      {/* Opportunities List */}
      <div className="space-y-3">
        {filteredOpportunities.length === 0 ? (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="py-12">
              <div className="text-center text-zinc-400">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Geen SEO kansen gevonden met de huidige filters.</p>
                <p className="text-sm mt-2">Probeer andere filterinstellingen.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredOpportunities.map((opportunity) => (
            <Card 
              key={opportunity.id} 
              className={`bg-zinc-900 border-zinc-800 cursor-pointer transition-colors hover:bg-zinc-800/50 ${
                selectedOpportunities.has(opportunity.id) ? 'ring-2 ring-[#F5911E]' : ''
              }`}
              onClick={() => toggleOpportunitySelection(opportunity.id)}
            >
              <CardContent className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  {/* Keyword & Site */}
                  <div className="lg:col-span-4">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={selectedOpportunities.has(opportunity.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleOpportunitySelection(opportunity.id);
                        }}
                        className="mt-1 w-4 h-4 text-[#F5911E] bg-zinc-800 border-zinc-600 rounded focus:ring-[#F5911E]"
                      />
                      <div>
                        <h3 className="font-medium text-white">{opportunity.keyword}</h3>
                        <p className="text-sm text-zinc-400">{opportunity.siteDomain}</p>
                        <p className="text-xs text-zinc-500 truncate" title={opportunity.targetPage}>
                          {opportunity.targetPage.replace(`https://${opportunity.siteDomain}`, '') || '/'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className={`text-lg font-semibold ${getPositionColor(opportunity.currentPosition)}`}>
                        #{opportunity.currentPosition}
                      </div>
                      <div className="text-xs text-zinc-500">Positie</div>
                    </div>
                    
                    <div>
                      <div className="text-lg font-semibold text-white">
                        {opportunity.impressions.toLocaleString()}
                      </div>
                      <div className="text-xs text-zinc-500">Vertoningen</div>
                    </div>
                    
                    <div>
                      <div className="text-lg font-semibold text-white">
                        {opportunity.currentCTR}%
                      </div>
                      <div className="text-xs text-zinc-500">CTR</div>
                    </div>
                    
                    <div>
                      <div className="text-lg font-semibold text-green-400">
                        +{opportunity.potentialClicks}
                      </div>
                      <div className="text-xs text-zinc-500">Potentieel</div>
                    </div>
                  </div>

                  {/* Status & Tasks */}
                  <div className="lg:col-span-2 flex flex-col gap-2 items-end">
                    <Badge className={statusColors[opportunity.status]}>
                      {statusLabels[opportunity.status]}
                    </Badge>
                    
                    <div className="flex gap-1">
                      {opportunity.hasResearchTask && (
                        <Badge variant="outline" className="text-xs">
                          🔭 Research
                        </Badge>
                      )}
                      {opportunity.hasOptimizationTask && (
                        <Badge variant="outline" className="text-xs">
                          📋 Optimalisatie
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {/* Last Updated */}
      <div className="text-center text-xs text-zinc-500">
        Laatst bijgewerkt: {new Date(seoData.lastUpdated).toLocaleString('nl-NL')}
      </div>
    </div>
  );
}

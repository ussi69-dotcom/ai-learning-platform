"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, Database, Server, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface ServiceStatus {
  name: string;
  status: string;
  message: string;
}

interface HealthResponse {
  status: string;
  services: ServiceStatus[];
  version: string;
}

export default function SystemStatus() {
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await axios.get<HealthResponse>(`${API_BASE}/health`);
        setHealthData(response.data);
      } catch (error) {
        console.error("Failed to fetch system health", error);
        setHealthData({
          status: "down",
          services: [],
          version: "unknown"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return null; // Don't show anything while loading to avoid layout shift

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'degraded': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'down': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle2 className="w-4 h-4" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4" />;
      case 'down': return <XCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border bg-card/30 backdrop-blur-sm border-border/50">
        
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${getStatusColor(healthData?.status || 'unknown')}`}>
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">System Status</h3>
            <p className="text-xs text-muted-foreground">
              {healthData?.status === 'healthy' ? 'All systems operational' : 'System issues detected'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {healthData?.services.map((service) => (
            <div key={service.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 border border-border/50 min-w-fit">
              {service.name === 'PostgreSQL' ? <Database className="w-3.5 h-3.5 text-slate-400" /> : <Server className="w-3.5 h-3.5 text-slate-400" />}
              <span className="text-xs font-medium text-foreground">{service.name}</span>
              <span className={`flex items-center gap-1 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${getStatusColor(service.status)}`}>
                {getStatusIcon(service.status)}
                {service.status}
              </span>
            </div>
          ))}
          
          <div className="text-[10px] font-mono text-muted-foreground ml-2">
            v{healthData?.version}
          </div>
        </div>

      </div>
    </div>
  );
}

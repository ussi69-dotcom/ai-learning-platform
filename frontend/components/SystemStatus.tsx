"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, Database, Server, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

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
  const [isHovered, setIsHovered] = useState(false);

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

  if (loading) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-emerald-500';
      case 'degraded': return 'text-amber-500';
      case 'down': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-emerald-500';
      case 'degraded': return 'bg-amber-500';
      case 'down': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle2 className="w-3 h-3" />;
      case 'degraded': return <AlertTriangle className="w-3 h-3" />;
      case 'down': return <XCircle className="w-3 h-3" />;
      default: return <Activity className="w-3 h-3" />;
    }
  };

  const overallStatus = healthData?.status || 'unknown';

  return (
    <div
      className="fixed bottom-20 left-4 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Collapsed state - just a small indicator */}
      <div
        className={`
          flex items-center gap-2 px-3 py-2 rounded-full
          bg-white/90 dark:bg-slate-900/90 backdrop-blur-md
          border border-slate-200 dark:border-slate-700
          shadow-lg shadow-black/5 dark:shadow-black/20
          cursor-pointer transition-all duration-300 ease-out
          ${isHovered ? 'rounded-xl' : ''}
        `}
      >
        {/* Status dot with pulse animation */}
        <div className="relative flex items-center justify-center">
          <div className={`w-2.5 h-2.5 rounded-full ${getStatusBgColor(overallStatus)}`} />
          {overallStatus === 'healthy' && (
            <div className={`absolute w-2.5 h-2.5 rounded-full ${getStatusBgColor(overallStatus)} animate-ping opacity-75`} />
          )}
        </div>

        {/* Expanded content on hover */}
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-out
            ${isHovered ? 'max-w-[400px] opacity-100' : 'max-w-0 opacity-0'}
          `}
        >
          <div className="flex items-center gap-3 whitespace-nowrap">
            {/* System label */}
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              System
            </span>

            {/* Services */}
            <div className="flex items-center gap-2">
              {healthData?.services.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800"
                >
                  {service.name === 'PostgreSQL' ? (
                    <Database className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                  ) : (
                    <Server className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                  )}
                  <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400">
                    {service.name}
                  </span>
                  <span className={`flex items-center gap-0.5 ${getStatusColor(service.status)}`}>
                    {getStatusIcon(service.status)}
                  </span>
                </div>
              ))}
            </div>

            {/* Version */}
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
              v{healthData?.version}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

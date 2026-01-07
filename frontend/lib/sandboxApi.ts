const API_BASE = getApiBaseUrl();
import { getApiBaseUrl } from "@/lib/utils";

export interface SandboxResponse {
  status: 'success' | 'error' | 'timeout';
  output?: string;
  error?: string;
  exit_code?: number;
}

export async function executeCode(code: string, token: string): Promise<SandboxResponse> {
  const response = await fetch(`${API_BASE}/sandbox/execute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ code, language: 'python' }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || `API Error: ${response.status}`);
  }

  return response.json();
}

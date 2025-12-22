"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// Types
interface SystemStatus {
  database: string;
  redis: string;
  total_users: number;
  verified_users: number;
  active_today: number;
  active_week: number;
  total_courses: number;
  total_lessons: number;
  total_news_items: number;
  total_certificates: number;
}

interface TestResult {
  name: string;
  status: "pass" | "fail" | "warning";
  message: string;
  duration_ms?: number;
}

interface SystemTestResults {
  timestamp: string;
  overall_status: string;
  tests: TestResult[];
}

interface AvailableTest {
  id: string;
  name: string;
}

interface UserAdmin {
  id: number;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  difficulty: string;
  xp: number;
  avatar?: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date?: string;
  courses_completed: number;
  lessons_completed: number;
  total_quiz_score: number;
}

interface UserProgress {
  lesson_id: number;
  lesson_title?: string;
  course_title?: string;
  completed_at?: string;
  last_accessed?: string;
  quiz_score?: number;
  quiz_attempts?: number;
  current_page?: number;
  completed_labs?: string[];
}

// Admin emails (must match backend)
const ADMIN_EMAILS = ["admin@ai-platform.com", "ussi@seznam.cz"];

export default function AdminPage() {
  const router = useRouter();
  const t = useTranslations();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"status" | "users" | "tests">("status");

  // Data states
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [testResults, setTestResults] = useState<SystemTestResults | null>(null);
  const [availableTests, setAvailableTests] = useState<AvailableTest[]>([]);
  const [individualResults, setIndividualResults] = useState<Map<string, TestResult>>(new Map());
  const [runningTest, setRunningTest] = useState<string | null>(null);
  const [users, setUsers] = useState<UserAdmin[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserAdmin | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [feedRefreshing, setFeedRefreshing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const user = await res.json();
        if (ADMIN_EMAILS.includes(user.email)) {
          setIsAdmin(true);
        } else {
          router.push("/");
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  // Fetch system status
  const fetchStatus = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const res = await fetch("/api/admin/status", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setStatus(await res.json());
      }
    } catch (e) {
      console.error("Failed to fetch status:", e);
    }
  }, []);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const url = searchQuery
        ? `/api/admin/users?search=${encodeURIComponent(searchQuery)}`
        : "/api/admin/users";
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUsers(await res.json());
      }
    } catch (e) {
      console.error("Failed to fetch users:", e);
    }
  }, [searchQuery]);

  // Fetch available tests
  const fetchAvailableTests = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const res = await fetch("/api/admin/tests/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAvailableTests(data.tests);
      }
    } catch (e) {
      console.error("Failed to fetch available tests:", e);
    }
  }, []);

  // Run all tests
  const runAllTests = async () => {
    setActionLoading(true);
    setIndividualResults(new Map());
    const token = localStorage.getItem("auth_token");
    try {
      const res = await fetch("/api/admin/tests/run", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const results = await res.json();
        setTestResults(results);
        // Populate individual results from batch
        const newMap = new Map<string, TestResult>();
        for (const test of results.tests) {
          // Find matching test id by name
          const matchingTest = availableTests.find(t => t.name === test.name);
          if (matchingTest) {
            newMap.set(matchingTest.id, test);
          }
        }
        setIndividualResults(newMap);
      }
    } catch (e) {
      console.error("Failed to run tests:", e);
    } finally {
      setActionLoading(false);
    }
  };

  // Run single test
  const runSingleTest = async (testId: string) => {
    setRunningTest(testId);
    const token = localStorage.getItem("auth_token");
    try {
      const res = await fetch(`/api/admin/tests/run/${testId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const result = await res.json();
        setIndividualResults(prev => new Map(prev).set(testId, result));
      }
    } catch (e) {
      console.error(`Failed to run test ${testId}:`, e);
    } finally {
      setRunningTest(null);
    }
  };

  // Refresh news feeds
  const refreshFeeds = async () => {
    setFeedRefreshing(true);
    const token = localStorage.getItem("auth_token");
    try {
      const res = await fetch("/api/admin/feeds/refresh", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status === "success") {
          setMessage({ type: "success", text: `Feedy obnoveny: ${data.total} položek (${data.duration_ms}ms)` });
        } else {
          setMessage({ type: "error", text: `Chyba: ${JSON.stringify(data.sources)}` });
        }
      } else {
        setMessage({ type: "error", text: "Nepodařilo se obnovit feedy" });
      }
    } catch (e) {
      console.error("Failed to refresh feeds:", e);
      setMessage({ type: "error", text: "Chyba při obnovování feedů" });
    } finally {
      setFeedRefreshing(false);
    }
  };

  // Fetch user progress
  const fetchUserProgress = async (userId: number) => {
    const token = localStorage.getItem("auth_token");
    try {
      const res = await fetch(`/api/admin/users/${userId}/progress`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUserProgress(await res.json());
      }
    } catch (e) {
      console.error("Failed to fetch progress:", e);
    }
  };

  // Reset user progress
  const resetUserProgress = async (userId: number) => {
    if (!confirm("Opravdu chcete resetovat progress tohoto uživatele? Tato akce je nevratná.")) {
      return;
    }

    setActionLoading(true);
    const token = localStorage.getItem("auth_token");
    try {
      const res = await fetch(`/api/admin/users/${userId}/reset-progress`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Progress byl resetován" });
        fetchUsers();
        setSelectedUser(null);
        setUserProgress([]);
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.detail || "Chyba při resetování" });
      }
    } catch {
      setMessage({ type: "error", text: "Chyba při resetování" });
    } finally {
      setActionLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (userId: number, email: string) => {
    if (!confirm(`Opravdu chcete smazat uživatele ${email}? Tato akce je nevratná.`)) {
      return;
    }

    setActionLoading(true);
    const token = localStorage.getItem("auth_token");
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessage({ type: "success", text: `Uživatel ${email} byl smazán` });
        fetchUsers();
        setSelectedUser(null);
        setUserProgress([]);
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.detail || "Chyba při mazání" });
      }
    } catch {
      setMessage({ type: "error", text: "Chyba při mazání" });
    } finally {
      setActionLoading(false);
    }
  };

  // Verify user manually
  const verifyUser = async (userId: number) => {
    setActionLoading(true);
    const token = localStorage.getItem("auth_token");
    try {
      const res = await fetch(`/api/admin/users/${userId}/verify`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Uživatel byl ověřen" });
        fetchUsers();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.detail || "Chyba při ověřování" });
      }
    } catch {
      setMessage({ type: "error", text: "Chyba při ověřování" });
    } finally {
      setActionLoading(false);
    }
  };

  // Load data based on active tab
  useEffect(() => {
    if (!isAdmin) return;

    if (activeTab === "status") {
      fetchStatus();
    } else if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "tests") {
      fetchAvailableTests();
    }
  }, [isAdmin, activeTab, fetchStatus, fetchUsers, fetchAvailableTests]);

  // Clear message after 5s
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Admin Dashboard
          </h1>
          <p className="text-slate-400 mt-1">Správa platformy AI Learning</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-500/20 border border-green-500 text-green-300"
              : "bg-red-500/20 border border-red-500 text-red-300"
          }`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-700 pb-2">
          {(["status", "users", "tests"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {tab === "status" && "System Status"}
              {tab === "users" && "Uživatelé"}
              {tab === "tests" && "Testy"}
            </button>
          ))}
        </div>

        {/* Status Tab */}
        {activeTab === "status" && status && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Connection Status */}
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <h3 className="text-slate-400 text-sm font-medium mb-3">Služby</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Database</span>
                  <span className={status.database === "connected" ? "text-green-400" : "text-red-400"}>
                    {status.database === "connected" ? "✓ Connected" : "✗ Error"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Redis</span>
                  <span className={status.redis === "connected" ? "text-green-400" : "text-yellow-400"}>
                    {status.redis === "connected" ? "✓ Connected" : "⚠ Disconnected"}
                  </span>
                </div>
              </div>
            </div>

            {/* Users */}
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <h3 className="text-slate-400 text-sm font-medium mb-3">Uživatelé</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Celkem</span>
                  <span className="text-purple-400 font-bold">{status.total_users}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ověřených</span>
                  <span className="text-green-400">{status.verified_users}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aktivních dnes</span>
                  <span className="text-blue-400">{status.active_today}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aktivních za týden</span>
                  <span className="text-blue-400">{status.active_week}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <h3 className="text-slate-400 text-sm font-medium mb-3">Obsah</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Kurzů</span>
                  <span className="text-purple-400 font-bold">{status.total_courses}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lekcí</span>
                  <span className="text-purple-400">{status.total_lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span>Novinek</span>
                  <span className="text-blue-400">{status.total_news_items}</span>
                </div>
                <div className="flex justify-between">
                  <span>Certifikátů</span>
                  <span className="text-yellow-400">{status.total_certificates}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <h3 className="text-slate-400 text-sm font-medium mb-3">Akce</h3>
              <div className="space-y-2">
                <button
                  onClick={fetchStatus}
                  className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Obnovit Status
                </button>
                <button
                  onClick={() => setActiveTab("tests")}
                  className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                >
                  Spustit Testy
                </button>
                <button
                  onClick={refreshFeeds}
                  disabled={feedRefreshing}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {feedRefreshing ? (
                    <>
                      <span className="animate-spin">⏳</span> Obnovování...
                    </>
                  ) : (
                    <>🔄 Obnovit Feedy</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User List */}
            <div className="lg:col-span-2 bg-slate-800 rounded-lg border border-slate-700">
              {/* Search */}
              <div className="p-4 border-b border-slate-700">
                <input
                  type="text"
                  placeholder="Hledat podle emailu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchUsers()}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Email</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-slate-400">Status</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-slate-400">XP</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-slate-400">Lekce</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-slate-400">Streak</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        onClick={() => {
                          setSelectedUser(user);
                          fetchUserProgress(user.id);
                        }}
                        className={`border-t border-slate-700 cursor-pointer transition-colors ${
                          selectedUser?.id === user.id
                            ? "bg-purple-900/30"
                            : "hover:bg-slate-700/50"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium">{user.email}</div>
                          <div className="text-xs text-slate-500">{user.difficulty}</div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {user.is_verified ? (
                            <span className="text-green-400">✓</span>
                          ) : (
                            <span className="text-yellow-400">⏳</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-purple-400">{user.xp}</td>
                        <td className="px-4 py-3 text-center">{user.lessons_completed}</td>
                        <td className="px-4 py-3 text-center">
                          {user.current_streak > 0 && (
                            <span className="text-orange-400">🔥 {user.current_streak}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* User Detail */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
              {selectedUser ? (
                <>
                  <h3 className="text-lg font-bold mb-4">{selectedUser.email}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-400">ID</span>
                      <span>{selectedUser.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ověřen</span>
                      <span className={selectedUser.is_verified ? "text-green-400" : "text-yellow-400"}>
                        {selectedUser.is_verified ? "Ano" : "Ne"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Obtížnost</span>
                      <span>{selectedUser.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">XP</span>
                      <span className="text-purple-400">{selectedUser.xp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dokončené lekce</span>
                      <span>{selectedUser.lessons_completed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Quiz skóre</span>
                      <span>{selectedUser.total_quiz_score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Streak</span>
                      <span>{selectedUser.current_streak} / {selectedUser.longest_streak}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  {userProgress.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-slate-400 mb-2">Progress</h4>
                      <div className="max-h-48 overflow-y-auto space-y-2">
                        {userProgress.map((p, i) => (
                          <div key={i} className="text-sm bg-slate-900 rounded p-2">
                            <div className="font-medium">{p.lesson_title || `Lesson ${p.lesson_id}`}</div>
                            <div className="text-xs text-slate-500">
                              {p.course_title} • Quiz: {p.quiz_score ?? "-"} • Page: {p.current_page ?? "-"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-2">
                    {!selectedUser.is_verified && (
                      <button
                        onClick={() => verifyUser(selectedUser.id)}
                        disabled={actionLoading}
                        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg transition-colors"
                      >
                        Ověřit Email
                      </button>
                    )}
                    <button
                      onClick={() => resetUserProgress(selectedUser.id)}
                      disabled={actionLoading || ADMIN_EMAILS.includes(selectedUser.email)}
                      className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 rounded-lg transition-colors"
                    >
                      Resetovat Progress
                    </button>
                    <button
                      onClick={() => deleteUser(selectedUser.id, selectedUser.email)}
                      disabled={actionLoading || ADMIN_EMAILS.includes(selectedUser.email)}
                      className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg transition-colors"
                    >
                      Smazat Uživatele
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-slate-500 py-8">
                  Vyberte uživatele ze seznamu
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tests Tab */}
        {activeTab === "tests" && (
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Systémové Testy</h3>
              <button
                onClick={runAllTests}
                disabled={actionLoading}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <span className="animate-spin">⏳</span> Running...
                  </>
                ) : (
                  <>▶ Spustit Všechny</>
                )}
              </button>
            </div>

            {/* Overall Status (if all tests ran) */}
            {testResults && (
              <div className={`mb-6 p-4 rounded-lg border ${
                testResults.overall_status === "pass"
                  ? "bg-green-900/20 border-green-500"
                  : testResults.overall_status === "warning"
                  ? "bg-yellow-900/20 border-yellow-500"
                  : "bg-red-900/20 border-red-500"
              }`}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">
                    {testResults.overall_status === "pass" && "✓ Všechny testy prošly"}
                    {testResults.overall_status === "warning" && "⚠ Některé varování"}
                    {testResults.overall_status === "fail" && "✗ Některé testy selhaly"}
                  </span>
                  <span className="text-sm text-slate-400">
                    {new Date(testResults.timestamp).toLocaleString("cs-CZ")}
                  </span>
                </div>
              </div>
            )}

            {/* Individual Tests */}
            <div className="space-y-3">
              {availableTests.map((test) => {
                const result = individualResults.get(test.id);
                const isRunning = runningTest === test.id;

                return (
                  <div
                    key={test.id}
                    className={`p-4 rounded-lg border ${
                      result
                        ? result.status === "pass"
                          ? "bg-green-900/10 border-green-800"
                          : result.status === "warning"
                          ? "bg-yellow-900/10 border-yellow-800"
                          : "bg-red-900/10 border-red-800"
                        : "bg-slate-900/50 border-slate-700"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-xl w-6">
                          {isRunning && <span className="animate-spin inline-block">⏳</span>}
                          {!isRunning && result?.status === "pass" && "✓"}
                          {!isRunning && result?.status === "warning" && "⚠"}
                          {!isRunning && result?.status === "fail" && "✗"}
                          {!isRunning && !result && "○"}
                        </span>
                        <div>
                          <div className="font-medium">{test.name}</div>
                          {result && (
                            <div className="text-sm text-slate-400">{result.message}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {result?.duration_ms && (
                          <span className="text-sm text-slate-500">{result.duration_ms}ms</span>
                        )}
                        <button
                          onClick={() => runSingleTest(test.id)}
                          disabled={isRunning || actionLoading}
                          className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded transition-colors"
                        >
                          {isRunning ? "..." : "▶"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {availableTests.length === 0 && (
              <div className="text-center text-slate-500 py-12">
                Načítání testů...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

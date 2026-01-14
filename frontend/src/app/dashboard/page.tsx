'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import StatsCards from '@/components/StatsCards';
import TaskForm from '@/components/TaskForm';
import LiveTaskView from '@/components/LiveTaskView';
import { AdvancedChatInterface } from '@/components/AdvancedChatInterface';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshCounter, setRefreshCounter] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <TopBar user={user} onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Dashboard Area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="mb-8">
              <StatsCards />
            </div>

            {/* Filters Section */}
            <div className="mb-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64"
                />
                <div className="flex gap-2">
                  {['All', 'Active', 'Completed'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedFilter === filter
                          ? 'bg-purple-600 text-white'
                          : 'bg-black/30 text-gray-300 hover:bg-black/40'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Task Form, Live Task View, and AI Assistant Chat */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Task Form - Left Column */}
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl h-full">
                  <h2 className="text-xl font-bold text-white mb-6">Create New Task</h2>
                  <TaskForm onTaskCreated={() => setRefreshCounter(prev => prev + 1)} />
                </div>
              </div>

              {/* Live Task View and AI Assistant - Right Column */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Live Task View */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Live Task View</h2>
                  </div>
                  <LiveTaskView
                    filter={selectedFilter}
                    searchQuery={searchQuery}
                    refreshTrigger={refreshCounter}
                  />
                </div>

                {/* AI Assistant Chat */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">AI Assistant</h2>
                  </div>
                  <div className="h-[400px]">
                    <AdvancedChatInterface onTaskAction={() => setRefreshCounter(prev => prev + 1)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
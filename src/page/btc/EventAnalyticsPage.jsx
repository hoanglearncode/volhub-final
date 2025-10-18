import React, { useState, useMemo } from 'react';
import { Users, Calendar, BarChart3, PieChart, Search, RefreshCw, Download, Eye, MapPin } from 'lucide-react';

const demoEvents = [
  { id: 1, name: 'Tech Innovation Summit', date: '2024-09-10', attendees: 1250 },
  { id: 2, name: 'Marketing Workshop', date: '2024-09-05', attendees: 345 },
  { id: 3, name: 'Startup Night', date: '2024-08-28', attendees: 189 }
];

const demoAudience = {
  devices: { mobile: 62, desktop: 30, tablet: 8 },
  sources: { organic: 40, social: 30, direct: 20, email: 10 }
};

const demoActivities = [
  { id: 1, text: 'User joined event room' },
  { id: 2, text: 'Question posted in Q&A' }
];

function Stat({ label, value, Icon, color = 'bg-blue-500' }){
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm flex items-center justify-between">
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-lg font-semibold text-gray-900 mt-1">{value}</div>
      </div>
      <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center text-white ml-3`}>
        <Icon size={18} />
      </div>
    </div>
  );
}

function ChartPlaceholder({ title, type = 'trend' }){
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <div className="text-gray-400 text-xs">Chart</div>
      </div>
      <div className="h-36 bg-gray-50 rounded flex items-center justify-center text-gray-400">{type} placeholder</div>
    </div>
  );
}

function EventCard({ e, onView }){
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="font-medium text-gray-900 truncate">{e.name}</div>
          <div className="text-xs text-gray-500 mt-1">{e.date} • <span className="font-semibold">{e.attendees}</span> attendees</div>
        </div>
        <div className="ml-3 flex-shrink-0">
          <button onClick={() => onView(e)} className="px-3 py-1 bg-gray-100 rounded">View</button>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ a }){
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <div className="text-sm text-gray-900">{a.text}</div>
    </div>
  );
}

export default function EventAnalyticsMobileSlim(){
  const [tab, setTab] = useState('overview');
  const [query, setQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [drawer, setDrawer] = useState({ open: false, item: null });

  const events = demoEvents;
  const audience = demoAudience;
  const activities = demoActivities;

  const totals = useMemo(() => ({
    events: events.length,
    attendees: events.reduce((s,e) => s + e.attendees, 0)
  }), [events]);

  const filteredEvents = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    return events.filter(ev => !q || ev.name.toLowerCase().includes(q));
  }, [events, query]);

  const handleExport = () => alert('Stub: export');
  const handleRefresh = () => alert('Stub: refresh');

  const openDrawer = (item) => setDrawer({ open: true, item });
  const closeDrawer = () => setDrawer({ open: false, item: null });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Event Analytics</h1>
            <p className="text-xs text-gray-500">Mobile UI-only demo</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleExport} aria-label="Export" className="p-2 bg-white rounded shadow-sm"><Download size={16} /></button>
            <button onClick={handleRefresh} aria-label="Refresh" className="p-2 bg-white rounded shadow-sm"><RefreshCw size={16} /></button>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Stat label="Events" value={totals.events} Icon={Calendar} color="bg-blue-500" />
          <Stat label="Attendees" value={totals.attendees.toLocaleString()} Icon={Users} color="bg-green-500" />
        </div>

        {/* tabs */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {['overview','realtime','events','audience','engagement'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-3 py-2 rounded-lg text-sm ${tab===t? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
              {t === 'overview' && 'Overview'}
              {t === 'realtime' && 'Real-time'}
              {t === 'events' && 'Events'}
              {t === 'audience' && 'Audience'}
              {t === 'engagement' && 'Engagement'}
            </button>
          ))}
        </div>

        {/* search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input aria-label="Tìm kiếm" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Tìm kiếm sự kiện..." className="w-full pl-10 pr-3 py-2 border rounded-lg" />
        </div>

        {/* content */}
        {tab === 'overview' && (
          <div className="space-y-3">
            <ChartPlaceholder title="Events Performance" type="trend" />
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Recent Activities</h3>
              <div className="space-y-2">
                {activities.map(a => <ActivityItem key={a.id} a={a} />)}
              </div>
            </div>
          </div>
        )}

        {tab === 'realtime' && (
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900">Real-time Overview</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="p-2 bg-gray-50 rounded text-center">
                  <div className="text-lg font-semibold">1247</div>
                  <div className="text-xs text-gray-500">Active users</div>
                </div>
                <div className="p-2 bg-gray-50 rounded text-center">
                  <div className="text-lg font-semibold">8,934</div>
                  <div className="text-xs text-gray-500">Page views</div>
                </div>
              </div>
            </div>
            <ChartPlaceholder title="Live Engagement" type="bar" />
          </div>
        )}

        {tab === 'events' && (
          <div className="space-y-3">
            {filteredEvents.map(ev => <EventCard key={ev.id} e={ev} onView={openDrawer} />)}
          </div>
        )}

        {tab === 'audience' && (
          <div className="space-y-3">
            <ChartPlaceholder title="Device Distribution" type="pie" />
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Traffic Sources</h3>
              <div className="space-y-2">
                {Object.entries(audience.sources).map(([k,v]) => (
                  <div key={k} className="flex items-center justify-between">
                    <div className="text-sm text-gray-700 capitalize">{k}</div>
                    <div className="font-semibold">{v}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'engagement' && (
          <div className="space-y-3">
            <ChartPlaceholder title="Engagement Timeline" type="trend" />
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Top Content</h3>
              <div className="space-y-2">
                <div className="p-2 bg-gray-50 rounded">Opening Keynote • 12.4K views</div>
                <div className="p-2 bg-gray-50 rounded">Panel Discussion • 9.8K views</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* drawer */}
      {drawer.open && (
        <div className="fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/40" onClick={closeDrawer} />
          <div className="ml-auto w-full max-w-md bg-white p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Event details</div>
              <button onClick={closeDrawer} className="text-gray-500">Close</button>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-gray-500">Name</div>
              <div className="font-medium text-gray-900">{drawer.item?.name}</div>
              <div className="text-sm text-gray-500">Date</div>
              <div className="font-medium text-gray-900">{drawer.item?.date}</div>
              <div className="text-sm text-gray-500">Attendees</div>
              <div className="font-medium text-gray-900">{drawer.item?.attendees}</div>
              <div className="mt-4">
                <button className="w-full py-2 bg-blue-600 text-white rounded">Open live view</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState, useMemo, useEffect } from "react";
import {
  Users,
  BarChart3,
  PieChart,
  Target,
  Award,
  Briefcase,
  Star,
  Eye,
  Download,
  Search,
  RefreshCw,
  Zap,
  AlertTriangle,
  Cpu
} from "lucide-react";

/*
  OrgAnalytics.mobile.ui.jsx (UPDATED)
  - Mobile-first, UI-only dashboard optimized for phones and small tablets
  - Includes realistic demo data so screens always show useful information
  - Removed any API/network logic; kept small stubs for actions
  - Good accessibility basics (aria-labels), readable typography, spacing and touch targets
*/

/* ---------------- Demo data (expanded & realistic) ---------------- */
const demoDepartments = [
  {
    id: 1,
    name: "Technology",
    employees: 542,
    projects: 34,
    satisfaction: 4.2,
    productivity: 87,
    budget: "2.8B VNĐ",
    utilization: 92,
    growth: "+12%",
    manager: "Nguyễn Văn Tân",
    avgSalary: "28M VNĐ",
    turnoverRate: "8.5%",
    skills: ["JavaScript", "Python", "React", "Node.js"]
  },
  {
    id: 2,
    name: "Marketing",
    employees: 234,
    projects: 28,
    satisfaction: 4.0,
    productivity: 82,
    budget: "1.5B VNĐ",
    utilization: 85,
    growth: "+8%",
    manager: "Trần Thị Lan",
    avgSalary: "18M VNĐ",
    turnoverRate: "12.3%",
    skills: ["SEO", "Content Marketing", "Social Media", "Analytics"]
  },
  {
    id: 3,
    name: "Sales",
    employees: 189,
    projects: 45,
    satisfaction: 3.8,
    productivity: 90,
    budget: "980M VNĐ",
    utilization: 94,
    growth: "+15%",
    manager: "Phạm Minh Đức",
    avgSalary: "22M VNĐ",
    turnoverRate: "15.7%",
    skills: ["CRM", "Negotiation", "Lead Generation", "Customer Service"]
  },
  {
    id: 4,
    name: "Human Resources",
    employees: 67,
    projects: 12,
    satisfaction: 4.1,
    productivity: 78,
    budget: "420M VNĐ",
    utilization: 88,
    growth: "+5%",
    manager: "Lê Thị Hoa",
    avgSalary: "16M VNĐ",
    turnoverRate: "9.2%",
    skills: ["Recruitment", "Training", "Performance", "Policy"]
  }
];

const demoEmployees = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    position: "Senior Developer",
    department: "Technology",
    performance: 9.2,
    projects: 8,
    tasksCompleted: 124,
    status: "active",
    joinDate: "2022-03-15",
    lastActive: "2 hours ago",
    skills: ["React", "Node.js", "TypeScript"],
    salary: "35M VNĐ",
    bonus: "8M VNĐ"
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    position: "Marketing Manager",
    department: "Marketing",
    performance: 8.7,
    projects: 12,
    tasksCompleted: 98,
    status: "active",
    joinDate: "2021-08-20",
    lastActive: "1 hour ago",
    skills: ["SEO", "Content Strategy", "Analytics"],
    salary: "28M VNĐ",
    bonus: "6M VNĐ"
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    position: "Sales Executive",
    department: "Sales",
    performance: 7.8,
    projects: 15,
    tasksCompleted: 156,
    status: "on_leave",
    joinDate: "2023-01-10",
    lastActive: "3 days ago",
    skills: ["CRM", "B2B Sales", "Presentation"],
    salary: "24M VNĐ",
    bonus: "12M VNĐ"
  },
  {
    id: 4,
    name: "Phạm Minh Quân",
    position: "DevOps Engineer",
    department: "Technology",
    performance: 8.8,
    projects: 6,
    tasksCompleted: 74,
    status: "active",
    joinDate: "2020-11-02",
    lastActive: "30 minutes ago",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    salary: "30M VNĐ",
    bonus: "5M VNĐ"
  }
];

const demoActivities = [
  { id: 1, activity: 'Deployed new release v1.2.0', time: '1h ago', type: 'project' },
  { id: 2, activity: 'Sales Q3 kickoff', time: '3h ago', type: 'project' },
  { id: 3, activity: 'Completed training: React Advanced', time: '1d ago', type: 'training' }
];

/* ---------------- Utility helpers ---------------- */
const formatNumber = (v) => typeof v === 'number' ? v.toLocaleString('vi-VN') : v;

/* ---------------- Small presentational components ---------------- */
function StatCard({ icon: Icon, label, value, color = 'bg-blue-500' }){
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
      <div className="flex-1">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-lg font-semibold text-gray-900 mt-1">{value}</div>
      </div>
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white ml-3`}>
        <Icon size={18} />
      </div>
    </div>
  );
}

function ChartPlaceholder({ title, type = 'trend' }){
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <div className="text-gray-400 text-xs">Chart</div>
      </div>
      <div className="h-40 bg-gray-50 rounded flex items-center justify-center">
        {type === 'trend' && <BarChart3 className="text-gray-300" size={36} />}
        {type === 'bar' && <BarChart3 className="text-gray-300" size={36} />}
        {type === 'pie' && <PieChart className="text-gray-300" size={36} />}
      </div>
    </div>
  );
}

function DepartmentCard({ d }){
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold text-gray-900">{d.name}</div>
          <div className="text-xs text-gray-500 mt-1">Manager: {d.manager}</div>
        </div>
        <div className="text-sm font-medium text-green-600">{d.growth}</div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="p-2 rounded bg-blue-50 text-center">
          <div className="text-xs text-gray-500">Employees</div>
          <div className="font-semibold">{formatNumber(d.employees)}</div>
        </div>
        <div className="p-2 rounded bg-green-50 text-center">
          <div className="text-xs text-gray-500">Projects</div>
          <div className="font-semibold">{formatNumber(d.projects)}</div>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-600">
        <div>Productivity: <span className="font-medium">{d.productivity}%</span></div>
        <div>Utilization: <span className="font-medium">{d.utilization}%</span></div>
      </div>

      <div className="mt-3">
        <button className="w-full py-2 bg-gray-100 rounded-lg text-sm">View details</button>
      </div>
    </div>
  );
}

function EmployeeCard({ e }){
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm flex items-start justify-between">
      <div className="min-w-0">
        <div className="font-medium text-gray-900 truncate">{e.name}</div>
        <div className="text-xs text-gray-500">{e.position} • {e.department}</div>
        <div className="text-xs text-gray-500 mt-2">Last active: {e.lastActive}</div>
      </div>
      <div className="text-right ml-3">
        <div className="text-sm font-semibold">{e.performance}</div>
        <div className="text-xs text-gray-500">score</div>
      </div>
    </div>
  );
}

function ActivityItem({ a }){
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-900">{a.activity}</div>
        <div className="text-xs text-gray-500">{a.time}</div>
      </div>
    </div>
  );
}

/* ---------------- Main mobile-first component ---------------- */
export default function OrgAnalyticsMobile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');
  const [query, setQuery] = useState('');

  // demo state
  const departments = demoDepartments;
  const employees = demoEmployees;
  const activities = demoActivities;

  const totals = useMemo(() => ({
    totalEmployees: departments.reduce((s,d) => s + d.employees, 0),
    activeProjects: departments.reduce((s,d) => s + d.projects, 0),
    completedTasks: 12890,
    orgScore: 8.4
  }), [departments]);

  // simple filter by department (UI-only)
  const filteredEmployees = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    return employees.filter(e => (selectedDepartment === 'all' || e.department === selectedDepartment) && (
      !q || `${e.name} ${e.position} ${e.department}`.toLowerCase().includes(q)
    ));
  }, [employees, selectedDepartment, query]);

  // UI stubs
  const handleRefresh = () => { /* stub: replace with real refresh */ alert('Stub: refresh'); };
  const handleExport = () => { /* stub: replace with real export */ alert('Stub: export'); };

  // ensure mobile-friendly page padding and max width
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 sm:p-6 mb-18">
      <div className="max-w-3xl mx-auto space-y-4">

        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Organization Analytics</h1>
            <p className="text-xs text-gray-500">Mobile-optimized dashboard with demo data</p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleExport} aria-label="Export" className="p-2 bg-white rounded shadow-sm"><Download size={16} /></button>
            <button onClick={handleRefresh} aria-label="Refresh" className="p-2 bg-white rounded shadow-sm"><RefreshCw size={16} /></button>
          </div>
        </header>

        {/* Stats grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-3">
          <StatCard icon={Users} label="Employees" value={formatNumber(totals.totalEmployees)} color="bg-blue-500" />
          <StatCard icon={Briefcase} label="Active Projects" value={formatNumber(totals.activeProjects)} color="bg-green-500" />
          <StatCard icon={Target} label="Completed Tasks" value={formatNumber(totals.completedTasks)} color="bg-purple-500" />
          <StatCard icon={Award} label="Org Score" value={totals.orgScore} color="bg-orange-500" />
        </div>

        {/* Tabs (scrollable) */}
        <div className="flex flex-wrap gap-5 pb-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'departments', label: 'Departments' },
            { id: 'employees', label: 'Employees' },
            { id: 'performance', label: 'Performance' },
            { id: 'resources', label: 'Resources' },
            { id: 'insights', label: 'Insights' }
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium ${activeTab===t.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Compact filters/search */}
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input aria-label="Tìm kiếm" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm kiếm..." className="w-full pl-10 pr-3 py-2 border rounded-lg" />
          </div>

          <select aria-label="Chọn phòng ban" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="all">All</option>
            {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>

        {/* Content by tab */}
        {activeTab === 'overview' && (
          <div className="space-y-3">
            <ChartPlaceholder title="Organization Performance Trends" type="trend" />

            <div className="grid grid-cols-1 gap-3">
              <ChartPlaceholder title="Department Comparison" type="bar" />
              <ChartPlaceholder title="Resource Allocation" type="pie" />
            </div>

            <div className="bg-white rounded-xl p-3 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Top Activities</h3>
              <div className="space-y-2">
                {activities.map(a => <ActivityItem key={a.id} a={a} />)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-3">
            {departments.map(d => <DepartmentCard key={d.id} d={d} />)}
          </div>
        )}

        {activeTab === 'employees' && (
          <div className="space-y-3">
            {filteredEmployees.map(e => <EmployeeCard key={e.id} e={e} />)}
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-3">
            {[
              { metric: 'Overall Productivity', value: '85.2%', change: '+5.3%' },
              { metric: 'Employee Satisfaction', value: '4.1/5.0', change: '+0.2' }
            ].map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{m.metric}</div>
                    <div className="text-xs text-gray-500">{m.change}</div>
                  </div>
                  <div className="text-lg font-semibold">{m.value}</div>
                </div>
              </div>
            ))}
            <ChartPlaceholder title="Performance Over Time" type="trend" />
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">CPU Usage</div>
                <div className="text-sm font-semibold">62%</div>
              </div>
              <div className="mt-3 h-24 bg-gray-50 rounded flex items-center justify-center text-gray-400"><Cpu size={28} /></div>
            </div>
            <ChartPlaceholder title="Storage" type="pie" />
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-start gap-3">
                <Zap className="text-yellow-500" />
                <div>
                  <div className="font-medium text-gray-900">Potential bottleneck in Tech</div>
                  <div className="text-xs text-gray-500">High utilization may impact delivery.</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-500" />
                <div>
                  <div className="font-medium text-gray-900">Rising turnover in Sales</div>
                  <div className="text-xs text-gray-500">Consider retention measures.</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

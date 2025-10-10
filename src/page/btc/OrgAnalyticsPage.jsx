import { useState } from "react";
import { 
  Building2, Users, TrendingUp, TrendingDown, BarChart3, PieChart,
  Target, Award, Clock, DollarSign, UserCheck, UserX, UserPlus,
  Activity, Zap, Globe, Calendar, MapPin, Star, Eye, Download,
  Filter, Search, RefreshCw, Settings, ArrowUp, ArrowDown, Minus,
  Briefcase, GraduationCap, Phone, Mail, CheckCircle, XCircle,
  AlertTriangle, MessageCircle, Heart, Share2, FileText, Database,
  Layers, Network, Cpu, HardDrive, Wifi, Shield, Lock, Unlock
} from "lucide-react";

export default function OrgAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [timeRange, setTimeRange] = useState("30days");
  const [viewMode, setViewMode] = useState("summary");
  const [employeePage, setEmployeePage] = useState(1);
  const pageSize = 10;

  const orgStats = {
    totalEmployees: 2847,
    activeProjects: 156,
    completedTasks: 12890,
    organizationScore: 8.4
  };

  const departments = [
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

  const employees = [
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
    }
  ];

  const performanceMetrics = [
    {
      metric: "Overall Productivity",
      value: "85.2%",
      change: "+5.3%",
      trend: "up",
      description: "Across all departments"
    },
    {
      metric: "Employee Satisfaction",
      value: "4.1/5.0",
      change: "+0.2",
      trend: "up",
      description: "Monthly survey average"
    },
    {
      metric: "Project Success Rate",
      value: "92.8%",
      change: "+8.1%",
      trend: "up",
      description: "On-time delivery rate"
    },
    {
      metric: "Resource Utilization",
      value: "89.5%",
      change: "-2.1%",
      trend: "down",
      description: "Team capacity usage"
    }
  ];

  const TabButton = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        activeTab === id
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <Icon size={18} />
      {label}
      {count && (
        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
          activeTab === id ? "bg-blue-500" : "bg-gray-200 text-gray-600"
        }`}>
          {count}
        </span>
      )}
    </button>
  );

  const StatCard = ({ icon: Icon, label, value, color, change, trend, subtitle }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 ${
            trend === 'up' ? 'text-green-500' : 
            trend === 'down' ? 'text-red-500' : 'text-gray-500'
          }`}>
            {trend === 'up' && <ArrowUp size={16} />}
            {trend === 'down' && <ArrowDown size={16} />}
            {trend === 'neutral' && <Minus size={16} />}
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600">{label}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  const DepartmentCard = ({ department }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{department.name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <Users size={14} />
              {department.employees} nhân viên
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={14} />
              {department.projects} dự án
            </span>
          </div>
          <div className="text-sm text-gray-600">Manager: {department.manager}</div>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          department.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'
        }`}>
          {department.growth.startsWith('+') ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          {department.growth}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">{department.productivity}%</div>
          <div className="text-xs text-gray-600">Năng suất</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-xl font-bold text-green-600">{department.utilization}%</div>
          <div className="text-xs text-gray-600">Sử dụng</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Satisfaction</span>
          <div className="flex items-center gap-1">
            <Star className="text-yellow-400 fill-current" size={14} />
            <span className="font-medium text-gray-900">{department.satisfaction}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Budget</span>
          <span className="font-medium text-gray-900">{department.budget}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Turnover</span>
          <span className="font-medium text-gray-900">{department.turnoverRate}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-xs font-medium text-gray-500 mb-2">Top Skills:</h4>
        <div className="flex flex-wrap gap-1">
          {department.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium">
        View Details
      </button>
    </div>
  );

  const EmployeeRow = ({ employee }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'on_leave': return 'bg-yellow-100 text-yellow-800';
        case 'inactive': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="font-medium text-gray-900">{employee.name}</div>
              <div className="text-sm text-gray-500">{employee.position}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-gray-900">{employee.department}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-1">
            <Star className="text-yellow-400 fill-current" size={14} />
            <span className="text-gray-900">{employee.performance}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-gray-900">{employee.projects}</td>
        <td className="px-6 py-4 text-gray-900">{employee.tasksCompleted}</td>
        <td className="px-6 py-4">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
            {employee.status === 'active' ? 'Hoạt động' :
             employee.status === 'on_leave' ? 'Nghỉ phép' : 'Không hoạt động'}
          </span>
        </td>
        <td className="px-6 py-4 text-gray-600 text-sm">{employee.lastActive}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <button className="text-blue-600 hover:text-blue-700" title="View profile">
              <Eye size={16} />
            </button>
            <button className="text-green-600 hover:text-green-700" title="Message">
              <MessageCircle size={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const MetricCard = ({ metric }) => (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{metric.metric}</h3>
        <div className={`flex items-center gap-1 ${
          metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
          {metric.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span className="text-sm font-medium">{metric.change}</span>
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</div>
      <p className="text-sm text-gray-600">{metric.description}</p>
    </div>
  );

  const ChartPlaceholder = ({ title, type, height = "h-64" }) => (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className={`${height} bg-gray-50 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          {type === 'bar' && <BarChart3 className="mx-auto text-gray-400 mb-2" size={48} />}
          {type === 'pie' && <PieChart className="mx-auto text-gray-400 mb-2" size={48} />}
          {type === 'trend' && <TrendingUp className="mx-auto text-gray-400 mb-2" size={48} />}
          <p className="text-gray-500">{title} Chart</p>
        </div>
      </div>
    </div>
  );

  // helper: paginate employees
  const pagedEmployees = employees.slice((employeePage - 1) * pageSize, employeePage * pageSize);
  const totalEmployeePages = Math.max(1, Math.ceil(employees.length / pageSize));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Organization Analytics</h1>
              <p className="text-gray-600">Comprehensive insights into organizational performance and metrics</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <select 
                  value={selectedDepartment} 
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id.toString()}>{dept.name}</option>
                  ))}
                </select>
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                  <option value="1year">Last year</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                <Download size={18} />
                <span>Export</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                <RefreshCw size={18} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Users} 
            label="Total Employees" 
            value={orgStats.totalEmployees.toLocaleString()} 
            color="bg-blue-500" 
            change="+5.2%"
            trend="up"
          />
          <StatCard 
            icon={Briefcase} 
            label="Active Projects" 
            value={orgStats.activeProjects} 
            color="bg-green-500" 
            change="+12"
            trend="up"
          />
          <StatCard 
            icon={Target} 
            label="Completed Tasks" 
            value={orgStats.completedTasks.toLocaleString()} 
            color="bg-purple-500" 
            change="+18%"
            trend="up"
          />
          <StatCard 
            icon={Award} 
            label="Organization Score" 
            value={orgStats.organizationScore} 
            color="bg-orange-500" 
            change="+0.3"
            trend="up"
            subtitle="out of 10.0"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <TabButton id="overview" label="Overview" icon={BarChart3} />
          <TabButton id="departments" label="Departments" icon={Building2} count={departments.length} />
          <TabButton id="employees" label="Employees" icon={Users} count={employees.length} />
          <TabButton id="performance" label="Performance" icon={TrendingUp} />
          <TabButton id="resources" label="Resources" icon={Database} />
          <TabButton id="insights" label="Insights" icon={Zap} />
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ChartPlaceholder title="Organization Performance Trends" type="trend" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Employee Retention</span>
                    <span className="font-semibold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Satisfaction</span>
                    <span className="font-semibold text-blue-600">4.1/5.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Project Success Rate</span>
                    <span className="font-semibold text-purple-600">92.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Training Completion</span>
                    <span className="font-semibold text-orange-600">87.5%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartPlaceholder title="Department Performance Comparison" type="bar" />
              <ChartPlaceholder title="Resource Allocation" type="pie" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
                <div className="space-y-3">
                  {employees.slice(0, 5).map((employee, index) => (
                    <div key={employee.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-500' : 
                        index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{employee.name}</div>
                        <div className="text-xs text-gray-500">{employee.department}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">{employee.performance}</div>
                        <div className="text-xs text-gray-500">score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  {[ /* activities */ ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'user' ? 'bg-green-500' :
                        activity.type === 'project' ? 'bg-blue-500' :
                        activity.type === 'training' ? 'bg-purple-500' :
                        activity.type === 'review' ? 'bg-yellow-500' :
                        'bg-orange-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{activity.activity}</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">95.8%</div>
                    <div className="text-sm text-gray-600">Employee Satisfaction</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">87.2%</div>
                    <div className="text-sm text-gray-600">Productivity Index</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">92.4%</div>
                    <div className="text-sm text-gray-600">Goal Achievement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "departments" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {departments.map((department) => (
              <DepartmentCard key={department.id} department={department} />
            ))}
          </div>
        )}

        {activeTab === "employees" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Employee Directory</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="on_leave">On Leave</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pagedEmployees.map(emp => <EmployeeRow key={emp.id} employee={emp} />)}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">Showing {(employeePage - 1) * pageSize + 1} - {Math.min(employeePage * pageSize, employees.length)} of {employees.length}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEmployeePage(p => Math.max(1, p - 1))}
                  className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  disabled={employeePage === 1}
                >
                  Prev
                </button>
                <span className="text-sm text-gray-700">Page {employeePage} / {totalEmployeePages}</span>
                <button
                  onClick={() => setEmployeePage(p => Math.min(totalEmployeePages, p + 1))}
                  className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  disabled={employeePage === totalEmployeePages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {performanceMetrics.map((m, idx) => (
              <MetricCard key={idx} metric={m} />
            ))}
            <div className="lg:col-span-2">
              <ChartPlaceholder title="Performance Over Time" type="trend" height="h-80" />
            </div>
            <div>
              <ChartPlaceholder title="Department Breakdown" type="bar" height="h-80" />
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Infrastructure</h3>
                <div className="text-xs text-gray-500">Realtime</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu size={20} />
                    <div>
                      <div className="font-medium">CPU Usage</div>
                      <div className="text-sm text-gray-500">Current: 62%</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">62%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HardDrive size={20} />
                    <div>
                      <div className="font-medium">Disk Usage</div>
                      <div className="text-sm text-gray-500">Used: 1.2TB / 2TB</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">60%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Network size={20} />
                    <div>
                      <div className="font-medium">Network</div>
                      <div className="text-sm text-gray-500">Latency: 38ms</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">Good</div>
                </div>
              </div>
            </div>

            <ChartPlaceholder title="Resource Trend (CPU / Memory)" type="trend" height="h-64" />
            <ChartPlaceholder title="Storage Usage" type="pie" height="h-64" />
          </div>
        )}

        {activeTab === "insights" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Automated Insights</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <Zap className="text-yellow-500" size={18} />
                  <div>
                    <div className="font-medium">Potential bottleneck in Tech</div>
                    <div className="text-xs text-gray-500">High utilization in Technology team may impact delivery.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-green-500" size={18} />
                  <div>
                    <div className="font-medium">Top performing teams</div>
                    <div className="text-xs text-gray-500">Sales and Technology show highest success rate this quarter.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="text-red-500" size={18} />
                  <div>
                    <div className="font-medium">Rising turnover in Sales</div>
                    <div className="text-xs text-gray-500">Turnover increased by 3.4% — consider retention measures.</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create retention program for Sales
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">
                  Schedule training: Advanced React patterns
                </button>
                <button className="w-full text-left px-4 py-3 bg-yellow-50 text-yellow-800 rounded-lg hover:bg-yellow-100">
                  Review budget allocation for Technology
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

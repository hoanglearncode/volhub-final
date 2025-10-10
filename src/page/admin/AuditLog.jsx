import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Clock,
  User,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Settings,
  Eye,
  Lock,
  Unlock,
  UserPlus,
  UserMinus,
  FileText,
  Database,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  AlertCircle,
  Ban,
  CheckSquare,
  X,
  SortAsc,
  SortDesc,
  ArrowUpDown
} from 'lucide-react';

/*
  AuditLog.Manager.jsx
  - Self-contained audit log UI with mock data
  - Features:
    • Search (debounced), filters, sorting, pagination
    • Expand log rows to view details
    • CSV export, copy selected log summary
    • Severity / action coloring and device icons
    • Accessible and responsive layout (Tailwind CSS)

  Usage: drop into a React app, ensure lucide-react & Tailwind are installed.
*/

const ITEMS_PER_PAGE_DEFAULT = 50;
const STORAGE_KEY = 'audit_log_ui_prefs_v1';

function useDebounce(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function AuditLogManager({ initialLogs = null }) {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 250);
  const [selectedFilters, setSelectedFilters] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { action: 'all', user: 'all', module: 'all', severity: 'all', timeRange: '7days' };
    } catch (e) { return { action: 'all', user: 'all', module: 'all', severity: 'all', timeRange: '7days' }; }
  });
  const [sortConfig, setSortConfig] = useState(() => ({ key: 'timestamp', direction: 'desc' }));
  const [expandedLog, setExpandedLog] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_DEFAULT);
  const [isLoading, setIsLoading] = useState(false);

  // --- Mock data (could be replaced with API) ---
  const _mockAuditLogs = [
    {
      id: 'audit_001',
      timestamp: '2025-01-15T14:30:25.123Z',
      user: { id: 'admin_001', name: 'Nguyễn Văn Admin', email: 'admin@volunteer.vn', role: 'Super Admin', avatar: null },
      action: 'CREATE', module: 'USER_MANAGEMENT', resource: 'volunteer', resourceId: 'vol_12345',
      description: 'Tạo tài khoản tình nguyện viên mới',
      details: { volunteerName: 'Trần Thị Bình', email: 'binh.tran@email.com', phone: '0901234567', location: 'Hà Nội' },
      ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', device: 'Desktop', location: 'Hà Nội, Việt Nam',
      severity: 'INFO', status: 'SUCCESS', duration: 245
    },
    {
      id: 'audit_002',
      timestamp: '2025-01-15T14:28:15.456Z',
      user: { id: 'manager_001', name: 'Lê Văn Manager', email: 'manager@volunteer.vn', role: 'Event Manager', avatar: null },
      action: 'UPDATE', module: 'EVENT_MANAGEMENT', resource: 'event', resourceId: 'event_789',
      description: 'Cập nhật thông tin sự kiện "Dọn dẹp công viên"',
      details: { eventName: 'Dọn dẹp công viên Thống Nhất', changes: { maxVolunteers: { old: 50, new: 80 } } },
      ipAddress: '10.0.0.50', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)', device: 'Mobile', location: 'TP.HCM, Việt Nam',
      severity: 'INFO', status: 'SUCCESS', duration: 180
    },
    {
      id: 'audit_003',
      timestamp: '2025-01-15T14:25:44.789Z',
      user: { id: 'system', name: 'Hệ thống', email: 'system@volunteer.vn', role: 'System', avatar: null },
      action: 'DELETE', module: 'DATA_CLEANUP', resource: 'expired_sessions', resourceId: 'batch_001',
      description: 'Tự động xóa các phiên đăng nhập hết hạn',
      details: { deletedSessions: 245, olderThan: '30 days', affectedUsers: 189 },
      ipAddress: 'internal', userAgent: 'System Process', device: 'Server', location: 'Server Internal',
      severity: 'INFO', status: 'SUCCESS', duration: 1200
    },
    {
      id: 'audit_004',
      timestamp: '2025-01-15T14:20:10.321Z',
      user: { id: 'user_456', name: 'Phạm Thu Hà', email: 'ha.pham@email.com', role: 'Volunteer', avatar: null },
      action: 'LOGIN_FAILED', module: 'AUTHENTICATION', resource: 'user_session', resourceId: 'session_failed_001',
      description: 'Đăng nhập thất bại - Sai mật khẩu',
      details: { attemptCount: 3, reason: 'Invalid password' },
      ipAddress: '203.162.4.190', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', device: 'Desktop', location: 'Đà Nẵng, Việt Nam',
      severity: 'WARNING', status: 'FAILED', duration: 50
    },
    {
      id: 'audit_005',
      timestamp: '2025-01-15T14:15:30.654Z',
      user: { id: 'admin_001', name: 'Nguyễn Văn Admin', email: 'admin@volunteer.vn', role: 'Super Admin', avatar: null },
      action: 'PERMISSION_CHANGE', module: 'ACCESS_CONTROL', resource: 'user_role', resourceId: 'role_change_001',
      description: 'Thay đổi quyền truy cập cho người dùng',
      details: { targetUser: 'Hoàng Minh Đức', roleChange: { old: 'Volunteer', new: 'Event Coordinator' } },
      ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0', device: 'Desktop', location: 'Hà Nội, Việt Nam',
      severity: 'HIGH', status: 'SUCCESS', duration: 320
    },
    {
      id: 'audit_006',
      timestamp: '2025-01-15T14:10:15.987Z',
      user: { id: 'coordinator_002', name: 'Vũ Thị Coordinator', email: 'coordinator@volunteer.vn', role: 'Event Coordinator', avatar: null },
      action: 'BULK_ACTION', module: 'EVENT_MANAGEMENT', resource: 'volunteer_assignments', resourceId: 'bulk_001',
      description: 'Phê duyệt hàng loạt đăng ký tình nguyện viên',
      details: { eventName: 'Hỗ trợ người cao tuổi', approvedApplications: 45, rejectedApplications: 3, totalApplications: 48 },
      ipAddress: '172.16.0.25', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/96.0', device: 'Desktop', location: 'Cần Thơ, Việt Nam',
      severity: 'INFO', status: 'SUCCESS', duration: 890
    },
    {
      id: 'audit_007',
      timestamp: '2025-01-15T13:55:42.147Z',
      user: { id: 'system', name: 'Hệ thống', email: 'system@volunteer.vn', role: 'System', avatar: null },
      action: 'BACKUP', module: 'SYSTEM_MAINTENANCE', resource: 'database', resourceId: 'backup_daily_001',
      description: 'Sao lưu dữ liệu hệ thống định kỳ',
      details: { backupSize: '2.3 GB', tablesBackedUp: 47, compressionRatio: '65%', backupLocation: '/backups/2025-01-15/' },
      ipAddress: 'internal', userAgent: 'Backup Service v2.1', device: 'Server', location: 'Server Internal',
      severity: 'INFO', status: 'SUCCESS', duration: 4500
    },
    {
      id: 'audit_008',
      timestamp: '2025-01-15T13:45:20.369Z',
      user: { id: 'security_001', name: 'Lê An Toàn', email: 'security@volunteer.vn', role: 'Security Officer', avatar: null },
      action: 'SECURITY_SCAN', module: 'SECURITY', resource: 'vulnerability_scan', resourceId: 'scan_001',
      description: 'Quét bảo mật hệ thống phát hiện lỗ hổng',
      details: { scannedEndpoints: 156, vulnerabilitiesFound: 2, recommendations: ['Cập nhật JWT', 'Tăng cường validation input'] },
      ipAddress: '192.168.1.200', userAgent: 'Security Scanner v3.2', device: 'Security Server', location: 'Hà Nội, Việt Nam',
      severity: 'CRITICAL', status: 'COMPLETED', duration: 2100
    },

    // --- Additional sample logs (bổ sung) ---
    {
      id: 'audit_009',
      timestamp: '2025-01-14T10:12:05.000Z',
      user: { id: 'user_789', name: 'Ngô Thị Lan', email: 'lan.ngo@email.com', role: 'Volunteer' },
      action: 'LOGIN', module: 'AUTHENTICATION', resource: 'user_session', resourceId: 'sess_789',
      description: 'Đăng nhập thành công từ thiết bị di động',
      details: { location: 'Hà Nội', method: 'password' },
      ipAddress: '203.162.10.12', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)', device: 'Mobile', location: 'Hà Nội, Việt Nam',
      severity: 'INFO', status: 'SUCCESS', duration: 40
    },
    {
      id: 'audit_010',
      timestamp: '2025-01-13T09:05:33.500Z',
      user: { id: 'devops_001', name: 'Trần Kỹ Thuật', email: 'devops@volunteer.vn', role: 'DevOps' },
      action: 'DEPLOY', module: 'SYSTEM_MAINTENANCE', resource: 'service', resourceId: 'svc_analytics',
      description: 'Triển khai bản vá cho dịch vụ analytics',
      details: { version: 'v2.1.4', nodesAffected: 3 },
      ipAddress: '10.1.1.5', userAgent: 'CI/CD Pipeline', device: 'Server', location: 'infra',
      severity: 'INFO', status: 'SUCCESS', duration: 600
    },
    {
      id: 'audit_011',
      timestamp: '2025-01-12T16:45:12.900Z',
      user: { id: 'support_001', name: 'Hoàng Linh', email: 'support@volunteer.vn', role: 'Support' },
      action: 'PASSWORD_RESET', module: 'AUTHENTICATION', resource: 'user', resourceId: 'user_234',
      description: 'Yêu cầu đặt lại mật khẩu cho người dùng',
      details: { targetEmail: 'user234@email.com', method: 'email_link' },
      ipAddress: '45.77.12.33', userAgent: 'Support Portal', device: 'Desktop', location: 'Hà Nội, Việt Nam',
      severity: 'INFO', status: 'SUCCESS', duration: 120
    },
    {
      id: 'audit_012',
      timestamp: '2025-01-11T08:22:00.000Z',
      user: { id: 'analyst_001', name: 'Đinh Minh', email: 'analyst@volunteer.vn', role: 'Analyst' },
      action: 'DATA_EXPORT', module: 'REPORTING', resource: 'volunteer_report', resourceId: 'export_20250111',
      description: 'Xuất báo cáo danh sách tình nguyện viên (CSV)',
      details: { rows: 15234, filters: { region: 'all' } },
      ipAddress: '203.162.20.34', userAgent: 'Analytics UI', device: 'Desktop', location: 'Hà Nội, Việt Nam',
      severity: 'INFO', status: 'SUCCESS', duration: 2000
    },
    {
      id: 'audit_013',
      timestamp: '2024-12-30T23:59:59.000Z',
      user: { id: 'importer_001', name: 'Nhập liệu', email: 'import@volunteer.vn', role: 'Data Admin' },
      action: 'IMPORT', module: 'DATA_IMPORT', resource: 'bulk_volunteers', resourceId: 'imp_20241230',
      description: 'Nhập danh sách tình nguyện viên từ file XLSX',
      details: { rowsProcessed: 4200, errors: 12 },
      ipAddress: '172.20.5.10', userAgent: 'Importer v1.2', device: 'Server', location: 'Hà Nội, Việt Nam',
      severity: 'INFO', status: 'COMPLETED', duration: 3700
    },
    {
      id: 'audit_014',
      timestamp: '2025-01-10T11:11:11.111Z',
      user: { id: 'security_002', name: 'Bảo Mật', email: 'sec2@volunteer.vn', role: 'Security' },
      action: 'RATE_LIMIT', module: 'API_GATEWAY', resource: 'api', resourceId: 'api_v1',
      description: 'Giới hạn tần suất truy cập API từ IP',
      details: { ip: '203.162.50.99', limit: 1000, window: '1h' },
      ipAddress: '203.162.50.99', userAgent: 'API Gateway', device: 'Gateway', location: 'Edge',
      severity: 'WARNING', status: 'BLOCKED', duration: 10
    },
    {
      id: 'audit_015',
      timestamp: '2025-01-09T07:30:00.000Z',
      user: { id: 'admin_002', name: 'Trần Quản Trị', email: 'admin2@volunteer.vn', role: 'Admin' },
      action: 'ROLE_ASSIGN', module: 'ACCESS_CONTROL', resource: 'user_role', resourceId: 'role_assign_001',
      description: 'Gán vai trò Event Coordinator cho người dùng',
      details: { targetUser: 'Nguyễn Văn A', role: 'Event Coordinator' },
      ipAddress: '192.168.2.10', userAgent: 'Admin Console', device: 'Desktop', location: 'Hà Nội, Việt Nam',
      severity: 'HIGH', status: 'SUCCESS', duration: 150
    },
    {
      id: 'audit_016',
      timestamp: '2025-01-08T18:00:00.000Z',
      user: { id: 'mailer_001', name: 'Mailer', email: 'mailer@volunteer.vn', role: 'System' },
      action: 'EMAIL_BOUNCE', module: 'COMMUNICATIONS', resource: 'email_campaign', resourceId: 'camp_2025_01',
      description: 'Phát hiện email bounce trong chiến dịch',
      details: { campaignId: 'camp_2025_01', bounced: 124 },
      ipAddress: 'internal', userAgent: 'Mailer Service', device: 'Server', location: 'Server Internal',
      severity: 'WARNING', status: 'COMPLETED', duration: 80
    },
    {
      id: 'audit_017',
      timestamp: '2025-01-07T12:00:00.000Z',
      user: { id: 'integ_001', name: 'Connector', email: 'connector@volunteer.vn', role: 'Integration' },
      action: 'API_KEY_CREATED', module: 'INTEGRATIONS', resource: 'api_key', resourceId: 'key_001',
      description: 'Tạo API key cho đối tác bên thứ ba',
      details: { partner: 'Partner A', scopes: ['read','write'] },
      ipAddress: '52.12.34.56', userAgent: 'Integration Portal', device: 'Desktop', location: 'Remote',
      severity: 'INFO', status: 'SUCCESS', duration: 60
    },
    {
      id: 'audit_018',
      timestamp: '2025-01-06T09:30:00.000Z',
      user: { id: 'sec_003', name: 'Phòng Giám sát', email: 'soc@volunteer.vn', role: 'SOC' },
      action: 'INCIDENT_REPORTED', module: 'SECURITY', resource: 'incident', resourceId: 'inc_20250106',
      description: 'Phát hiện truy cập bất thường - IP ngoại quốc',
      details: { ip: '203.0.113.45', attempts: 28, countries: ['RU'] },
      ipAddress: '203.0.113.45', userAgent: 'SIEM', device: 'Server', location: 'Cloud',
      severity: 'CRITICAL', status: 'OPEN', duration: 400
    },
    {
      id: 'audit_019',
      timestamp: '2025-01-05T15:20:20.000Z',
      user: { id: 'ops_001', name: 'Vận hành', email: 'ops@volunteer.vn', role: 'Ops' },
      action: 'SERVICE_RESTART', module: 'SYSTEM_MAINTENANCE', resource: 'queue_worker', resourceId: 'worker_7',
      description: 'Khởi động lại worker do memory leak',
      details: { reason: 'memory leak', restartedBy: 'ops_001' },
      ipAddress: '10.10.10.10', userAgent: 'Management Console', device: 'Server', location: 'Infra',
      severity: 'HIGH', status: 'SUCCESS', duration: 95
    },
    {
      id: 'audit_020',
      timestamp: '2025-01-04T08:08:08.000Z',
      user: { id: 'user_999', name: 'Người dùng thử', email: 'test.user@volunteer.vn', role: 'Volunteer' },
      action: 'SSO_LOGIN', module: 'AUTHENTICATION', resource: 'sso', resourceId: 'sso_azure',
      description: 'Đăng nhập qua SSO (Azure) thành công',
      details: { provider: 'AzureAD', userId: 'ext_999' },
      ipAddress: '81.2.69.142', userAgent: 'Mozilla/5.0', device: 'Desktop', location: 'Hà Nội, Việt Nam',
      severity: 'INFO', status: 'SUCCESS', duration: 30
    }
  ];

  const filterOptions = useMemo(() => ({
    actions: [ { value: 'all', label: 'Tất cả hành động' }, { value: 'CREATE', label: 'Tạo mới' }, { value: 'UPDATE', label: 'Cập nhật' }, { value: 'DELETE', label: 'Xóa' }, { value: 'LOGIN_FAILED', label: 'Đăng nhập thất bại' }, { value: 'PERMISSION_CHANGE', label: 'Thay đổi quyền' }, { value: 'BULK_ACTION', label: 'Hành động hàng loạt' }, { value: 'BACKUP', label: 'Sao lưu' }, { value: 'SECURITY_SCAN', label: 'Quét bảo mật' } ],
    modules: [ { value: 'all', label: 'Tất cả module' }, { value: 'USER_MANAGEMENT', label: 'Quản lý người dùng' }, { value: 'EVENT_MANAGEMENT', label: 'Quản lý sự kiện' }, { value: 'AUTHENTICATION', label: 'Xác thực' }, { value: 'ACCESS_CONTROL', label: 'Kiểm soát truy cập' }, { value: 'SYSTEM_MAINTENANCE', label: 'Bảo trì' }, { value: 'SECURITY', label: 'Bảo mật' }, { value: 'DATA_CLEANUP', label: 'Dọn dẹp dữ liệu' } ],
    severities: [ { value: 'all', label: 'Tất cả mức độ' }, { value: 'INFO', label: 'Thông tin' }, { value: 'WARNING', label: 'Cảnh báo' }, { value: 'HIGH', label: 'Quan trọng' }, { value: 'CRITICAL', label: 'Nghiêm trọng' } ],
    timeRanges: [ { value: '1hour', label: '1 giờ qua' }, { value: '24hours', label: '24 giờ qua' }, { value: '7days', label: '7 ngày qua' }, { value: '30days', label: '30 ngày qua' }, { value: '90days', label: '3 tháng qua' } ]
  }), []);

  // load initial data
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => {
      setLogs(initialLogs || _mockAuditLogs);
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [initialLogs]);

  // persist filter prefs
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFilters)); } catch (e) { }
  }, [selectedFilters]);

  // filtering, searching, sorting
  useEffect(() => {
    let out = [...logs];

    // time range cutoff
    const now = new Date();
    const hoursMap = { '1hour': 1, '24hours': 24, '7days': 24*7, '30days': 24*30, '90days': 24*90 };
    const hrs = hoursMap[selectedFilters.timeRange] || 24*7;
    const cutoff = new Date(now.getTime() - hrs * 60 * 60 * 1000);
    out = out.filter(l => new Date(l.timestamp) >= cutoff);

    // search
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      out = out.filter(l => (
        (l.description || '').toLowerCase().includes(q) ||
        (l.user?.name || '').toLowerCase().includes(q) ||
        (l.user?.email || '').toLowerCase().includes(q) ||
        (l.action || '').toLowerCase().includes(q) ||
        (l.module || '').toLowerCase().includes(q)
      ));
    }

    // action
    if (selectedFilters.action !== 'all') out = out.filter(l => l.action === selectedFilters.action);
    if (selectedFilters.module !== 'all') out = out.filter(l => l.module === selectedFilters.module);
    if (selectedFilters.severity !== 'all') out = out.filter(l => l.severity === selectedFilters.severity);

    // sort
    out.sort((a,b) => {
      let aV = a[sortConfig.key]; let bV = b[sortConfig.key];
      if (sortConfig.key === 'timestamp') { aV = new Date(aV); bV = new Date(bV); }
      if (aV < bV) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aV > bV) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredLogs(out);
    setCurrentPage(1);
  }, [logs, debouncedQuery, selectedFilters, sortConfig]);

  const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc' }));

  const getActionIcon = (action) => {
    const map = { CREATE: Plus, UPDATE: Edit, DELETE: Trash2, LOGIN: User, LOGIN_FAILED: Ban, LOGOUT: UserMinus, PERMISSION_CHANGE: Shield, BULK_ACTION: CheckSquare, BACKUP: Database, SECURITY_SCAN: Lock };
    return map[action] || Activity;
  };

  const getActionColor = (action) => {
    const map = { CREATE: 'text-green-600 bg-green-50', UPDATE: 'text-blue-600 bg-blue-50', DELETE: 'text-red-600 bg-red-50', LOGIN_FAILED: 'text-red-600 bg-red-50', PERMISSION_CHANGE: 'text-orange-600 bg-orange-50', BULK_ACTION: 'text-purple-600 bg-purple-50', BACKUP: 'text-indigo-600 bg-indigo-50', SECURITY_SCAN: 'text-yellow-600 bg-yellow-50' };
    return map[action] || 'text-gray-600 bg-gray-50';
  };

  const getSeverityColor = (severity) => {
    const map = { INFO: 'text-blue-700 bg-blue-50 border-blue-200', WARNING: 'text-yellow-700 bg-yellow-50 border-yellow-200', HIGH: 'text-orange-700 bg-orange-50 border-orange-200', CRITICAL: 'text-red-700 bg-red-50 border-red-200' };
    return map[severity] || 'text-gray-700 bg-gray-50 border-gray-200';
  };

  const getDeviceIcon = (device) => (device === 'Mobile' ? Smartphone : device === 'Desktop' ? Monitor : Globe);

  const formatDuration = (ms) => { if (ms < 1000) return `${ms}ms`; if (ms < 60000) return `${(ms/1000).toFixed(1)}s`; return `${(ms/60000).toFixed(1)}m`; };

  const exportLogs = useCallback(() => {
    const csv = [ ['Timestamp','User','Action','Module','Resource','Description','Severity','Status','IP','Duration'].join(',') ];
    filteredLogs.forEach(l => csv.push([`"${new Date(l.timestamp).toISOString()}"`,`"${l.user?.name||''}"`,l.action,l.module,l.resource,`"${(l.description||'').replace(/"/g,'""')}"`,l.severity,l.status,l.ipAddress,l.duration].join(',')));
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`; a.click(); URL.revokeObjectURL(url);
  }, [filteredLogs]);

  const copyLogSummary = useCallback(async (log) => {
    const txt = `Log ${log.id}\nTime: ${new Date(log.timestamp).toLocaleString('vi-VN')}\nUser: ${log.user?.name} (${log.user?.email})\nAction: ${log.action}\nModule: ${log.module}\nDesc: ${log.description}`;
    try { await navigator.clipboard.writeText(txt); } catch(e) { /* ignore */ }
  }, []);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  // small helpers UI
  const clearFilters = () => { setSelectedFilters({ action: 'all', user: 'all', module: 'all', severity: 'all', timeRange: '7days' }); setSearchQuery(''); };

  if (isLoading) return <div className="p-6 text-center text-gray-600">Đang tải nhật ký...</div>;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nhật ký hệ thống</h1>
          <p className="text-sm text-gray-600 mt-1">Giám sát hoạt động, kiểm tra an ninh và phân tích sự kiện</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600"><span className="font-medium">{filteredLogs.length.toLocaleString()}</span> bản ghi</div>
          <button onClick={() => { setLogs(initialLogs || _mockAuditLogs); }} className="flex items-center space-x-2 px-3 py-2 border rounded text-sm"><RefreshCw className="w-4 h-4" /><span>Làm mới</span></button>
          <button onClick={exportLogs} className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded text-sm"><Download className="w-4 h-4"/><span>Xuất CSV</span></button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Tìm kiếm mô tả, người dùng, hành động..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={()=>setShowFilters(s=>!s)} className="flex items-center space-x-2 px-3 py-2 border rounded text-sm"><Filter className="w-4 h-4"/>{showFilters? 'Ẩn bộ lọc':'Bộ lọc'} {showFilters? <ChevronUp className="w-4 h-4"/>: <ChevronDown className="w-4 h-4"/>}</button>
            <button onClick={() => { setSearchQuery(''); clearFilters(); }} className="px-3 py-2 border rounded text-sm">Xóa</button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Hành động</label>
              <select value={selectedFilters.action} onChange={e=>setSelectedFilters(prev=>({...prev, action: e.target.value}))} className="w-full p-2 border rounded">
                {filterOptions.actions.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Module</label>
              <select value={selectedFilters.module} onChange={e=>setSelectedFilters(prev=>({...prev, module: e.target.value}))} className="w-full p-2 border rounded">
                {filterOptions.modules.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Mức độ</label>
              <select value={selectedFilters.severity} onChange={e=>setSelectedFilters(prev=>({...prev, severity: e.target.value}))} className="w-full p-2 border rounded">
                {filterOptions.severities.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Khoảng thời gian</label>
              <select value={selectedFilters.timeRange} onChange={e=>setSelectedFilters(prev=>({...prev, timeRange: e.target.value}))} className="w-full p-2 border rounded">
                {filterOptions.timeRanges.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={()=>{ clearFilters(); }} className="w-full p-2 border rounded text-sm">Reset</button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500"> 
                  <button onClick={()=>handleSort('timestamp')} className="flex items-center space-x-1">
                    <span>Thời gian</span>
                    {sortConfig.key === 'timestamp' && (sortConfig.direction === 'desc' ? <SortDesc className="w-4 h-4"/> : <SortAsc className="w-4 h-4"/>)}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Người dùng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Hành động</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Mô tả</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Mức độ</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentLogs.map(log => {
                const Icon = getActionIcon(log.action);
                const DeviceIcon = getDeviceIcon(log.device);
                const sevClass = getSeverityColor(log.severity);
                const actionClass = getActionColor(log.action);
                const expanded = expandedLog === log.id;

                return (
                  <React.Fragment key={log.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 align-top w-56">
                        <div className="text-sm text-gray-900">{new Date(log.timestamp).toLocaleString('vi-VN')}</div>
                        <div className="text-xs text-gray-500">{formatDuration(log.duration)}</div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">{(log.user?.name||'').split(' ').slice(-1)[0]?.charAt(0) || 'U'}</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{log.user?.name}</div>
                            <div className="text-xs text-gray-500">{log.user?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${actionClass}`}> <Icon className="w-4 h-4 mr-1" />{log.action}</div>
                        <div className="text-xs text-gray-500 mt-1">{log.module}</div>
                      </td>
                      <td className="px-4 py-3 align-top"><div className="text-sm text-gray-900">{log.description}</div></td>
                      <td className="px-4 py-3 align-top">
                        <div className={`inline-flex items-center px-2 py-1 rounded border text-xs ${sevClass}`}>{log.severity}</div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className={`text-sm font-medium ${log.status === 'SUCCESS' ? 'text-green-600' : log.status === 'FAILED' ? 'text-red-600' : 'text-gray-700'}`}>{log.status}</div>
                        <div className="text-xs text-gray-500">{log.ipAddress}</div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex items-center space-x-2">
                          <button onClick={()=>setExpandedLog(expanded? null: log.id)} className="px-2 py-1 border rounded text-xs">{expanded? 'Thu gọn' : 'Mở'}</button>
                          <button onClick={()=>copyLogSummary(log)} className="px-2 py-1 border rounded text-xs">Sao chép</button>
                        </div>
                      </td>
                    </tr>

                    {expanded && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="p-4 text-sm text-gray-700">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="font-medium text-gray-900 mb-1">Chi tiết</div>
                              <pre className="text-xs bg-white border rounded p-3 overflow-auto">{JSON.stringify(log.details, null, 2)}</pre>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 mb-1">Kỹ thuật</div>
                              <div className="text-xs text-gray-700">User agent: {log.userAgent}</div>
                              <div className="text-xs text-gray-700">Device: {log.device}</div>
                              <div className="text-xs text-gray-700">Location: {log.location}</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
          <div className="text-sm text-gray-600">Hiển thị {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredLogs.length)} trên {filteredLogs.length} kết quả</div>
          <div className="flex items-center space-x-2">
            <button onClick={()=>setCurrentPage(p=>Math.max(1,p-1))} className="px-2 py-1 border rounded">Prev</button>
            <div className="px-3 py-1 border rounded">{currentPage} / {totalPages}</div>
            <button onClick={()=>setCurrentPage(p=>Math.min(totalPages,p+1))} className="px-2 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>

    </div>
  );
}

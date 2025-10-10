import React, { useState, useEffect, useMemo } from 'react';
import {
  Database,
  Download,
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  FileText,
  Users,
  Building,
  Activity,
  Shield,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Archive,
  HardDrive,
  Cloud,
  Zap,
  Eye,
  Trash2,
  Copy,
  Filter,
  Search,
  RefreshCw,
  ExternalLink,
  Lock,
  Unlock,
  FileImage,
  FileSpreadsheet,
  FilePlus,
  CloudDownload
} from 'lucide-react';

const BackupExport = () => {
  const [activeTab, setActiveTab] = useState('backups');
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [selectedBackups, setSelectedBackups] = useState([]);
  const [exportFilters, setExportFilters] = useState({
    dataType: 'all',
    dateRange: '30d',
    format: 'csv',
    includePersonalData: false
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Mock backup data
  const [backups, setBackups] = useState([
    {
      id: 'BK001',
      name: 'Full Database Backup',
      type: 'full',
      status: 'completed',
      size: '2.3 GB',
      createdAt: '2025-09-06 03:00:15',
      duration: '23m 45s',
      location: 'AWS S3 - Primary',
      retention: '30 days',
      encrypted: true,
      tables: ['users', 'events', 'volunteers', 'partners', 'connections', 'content'],
      checksum: 'sha256:a1b2c3...',
      automated: true
    },
    {
      id: 'BK002',
      name: 'User Data Export',
      type: 'partial',
      status: 'completed',
      size: '450 MB',
      createdAt: '2025-09-05 18:30:22',
      duration: '5m 12s',
      location: 'Local Storage',
      retention: '7 days',
      encrypted: true,
      tables: ['users', 'user_profiles', 'certificates'],
      checksum: 'sha256:x7y8z9...',
      automated: false
    },
    {
      id: 'BK003',
      name: 'Event System Backup',
      type: 'incremental',
      status: 'in_progress',
      size: '180 MB',
      createdAt: '2025-09-06 15:45:00',
      duration: '2m 30s',
      location: 'AWS S3 - Secondary',
      retention: '14 days',
      encrypted: true,
      tables: ['events', 'event_registrations', 'event_feedback'],
      checksum: 'calculating...',
      automated: true,
      progress: 75
    },
    {
      id: 'BK004',
      name: 'Content Moderation Data',
      type: 'partial',
      status: 'failed',
      size: '0 MB',
      createdAt: '2025-09-06 12:15:30',
      duration: '0m 45s',
      location: 'AWS S3 - Primary',
      retention: '7 days',
      encrypted: false,
      tables: ['content_posts', 'moderation_logs'],
      checksum: 'failed',
      automated: false,
      error: 'Permission denied - insufficient storage quota'
    }
  ]);

  const [backupSchedules, setBackupSchedules] = useState([
    {
      id: 'SCH001',
      name: 'Daily Full Backup',
      frequency: 'daily',
      time: '03:00',
      enabled: true,
      type: 'full',
      retention: 30,
      location: 'AWS S3 - Primary',
      lastRun: '2025-09-06 03:00:15',
      nextRun: '2025-09-07 03:00:00',
      status: 'active'
    },
    {
      id: 'SCH002',
      name: 'Hourly Incremental',
      frequency: 'hourly',
      time: 'every hour',
      enabled: true,
      type: 'incremental',
      retention: 7,
      location: 'AWS S3 - Secondary',
      lastRun: '2025-09-06 15:00:00',
      nextRun: '2025-09-06 16:00:00',
      status: 'active'
    },
    {
      id: 'SCH003',
      name: 'Weekly Archive',
      frequency: 'weekly',
      time: 'Sunday 02:00',
      enabled: false,
      type: 'archive',
      retention: 365,
      location: 'Glacier Archive',
      lastRun: '2025-08-25 02:00:00',
      nextRun: 'Disabled',
      status: 'disabled'
    }
  ]);

  const [exportRequests, setExportRequests] = useState([
    {
      id: 'EXP001',
      name: 'Volunteer Data Report - Q3 2025',
      type: 'volunteer_data',
      format: 'xlsx',
      status: 'completed',
      size: '15.2 MB',
      createdAt: '2025-09-06 14:30:15',
      completedAt: '2025-09-06 14:33:42',
      requestedBy: 'admin_reports',
      downloadUrl: '/exports/volunteer_data_q3_2025.xlsx',
      expiresAt: '2025-09-13 14:30:15',
      includePersonalData: false,
      records: 1247
    },
    {
      id: 'EXP002',
      name: 'Event Analytics Export',
      type: 'event_data',
      format: 'csv',
      status: 'processing',
      size: 'calculating...',
      createdAt: '2025-09-06 15:20:30',
      completedAt: null,
      requestedBy: 'admin_analytics',
      downloadUrl: null,
      expiresAt: '2025-09-13 15:20:30',
      includePersonalData: false,
      records: 'processing...',
      progress: 60
    },
    {
      id: 'EXP003',
      name: 'GDPR Data Request - User #12345',
      type: 'gdpr_request',
      format: 'json',
      status: 'completed',
      size: '2.8 MB',
      createdAt: '2025-09-05 10:15:00',
      completedAt: '2025-09-05 10:18:22',
      requestedBy: 'gdpr_processor',
      downloadUrl: '/exports/gdpr_user_12345.json',
      expiresAt: '2025-09-12 10:15:00',
      includePersonalData: true,
      records: 1
    }
  ]);

  const tabs = [
    { id: 'backups', label: 'Backup dữ liệu', icon: Database },
    { id: 'schedules', label: 'Lịch backup', icon: Calendar },
    { id: 'exports', label: 'Export dữ liệu', icon: Download },
    { id: 'storage', label: 'Quản lý lưu trữ', icon: HardDrive },
    { id: 'settings', label: 'Cài đặt', icon: Settings }
  ];

  const backupTypes = {
    full: { label: 'Full Backup', color: 'blue', description: 'Sao lưu toàn bộ cơ sở dữ liệu' },
    incremental: { label: 'Incremental', color: 'green', description: 'Chỉ sao lưu dữ liệu thay đổi' },
    partial: { label: 'Partial', color: 'yellow', description: 'Sao lưu một phần dữ liệu' },
    archive: { label: 'Archive', color: 'purple', description: 'Lưu trữ dài hạn' }
  };

  const statusConfig = {
    completed: { label: 'Hoàn thành', color: 'green', icon: CheckCircle },
    in_progress: { label: 'Đang thực hiện', color: 'blue', icon: Clock },
    processing: { label: 'Đang xử lý', color: 'yellow', icon: RefreshCw },
    failed: { label: 'Thất bại', color: 'red', icon: XCircle },
    active: { label: 'Đang hoạt động', color: 'green', icon: Play },
    disabled: { label: 'Tạm dừng', color: 'gray', icon: Pause }
  };

  const dataTypes = [
    { id: 'all', label: 'Tất cả dữ liệu', icon: Database },
    { id: 'users', label: 'Người dùng', icon: Users },
    { id: 'events', label: 'Sự kiện', icon: Calendar },
    { id: 'partners', label: 'Đối tác', icon: Building },
    { id: 'content', label: 'Nội dung', icon: FileText },
    { id: 'analytics', label: 'Phân tích', icon: Activity },
    { id: 'security', label: 'Bảo mật', icon: Shield }
  ];

  const exportFormats = [
    { id: 'csv', label: 'CSV', description: 'Comma-separated values' },
    { id: 'xlsx', label: 'Excel', description: 'Microsoft Excel format' },
    { id: 'json', label: 'JSON', description: 'JavaScript Object Notation' },
    { id: 'pdf', label: 'PDF', description: 'Portable Document Format' }
  ];

  // settings state
  const [settings, setSettings] = useState({
    retentionDays: 90,
    encryptByDefault: true,
    backupWindowStart: '02:00',
    backupWindowEnd: '04:00'
  });

  // Storage mock (MB)
  const storageInfo = useMemo(() => ({
    total: 500 * 1024, // MB ~ 500 GB
    used: 278 * 1024 // MB ~ 278 GB
  }), []);

  const usedPercent = Math.round((storageInfo.used / storageInfo.total) * 100);

  // Helpers & actions
  const toggleSelectBackup = (backupId) => {
    setSelectedBackups(prev => prev.includes(backupId) ? prev.filter(id => id !== backupId) : [...prev, backupId]);
  };

  const handleDeleteSelectedBackups = () => {
    if (selectedBackups.length === 0) {
      alert('Chưa chọn backup để xóa.');
      return;
    }
    if (!confirm(`Xác nhận xóa ${selectedBackups.length} backup đã chọn?`)) return;
    setBackups(prev => prev.filter(b => !selectedBackups.includes(b.id)));
    setSelectedBackups([]);
  };

  const handleDeleteBackup = (backupId) => {
    if (!confirm(`Xác nhận xóa backup ${backupId}?`)) return;
    setBackups(prev => prev.filter(b => b.id !== backupId));
    setSelectedBackups(prev => prev.filter(id => id !== backupId));
  };

  const handleDownloadBackup = (backup) => {
    // Replace with real download logic (presigned URL, streaming, etc.)
    alert(`Bắt đầu tải backup: ${backup.name} (mô phỏng)`);
  };

  const handleCreateBackup = async () => {
    setBackupInProgress(true);

    const newBackup = {
      id: `BK${String(backups.length + 1).padStart(3, '0')}`,
      name: 'Manual Backup',
      type: 'full',
      status: 'in_progress',
      size: 'calculating...',
      createdAt: new Date().toLocaleString('vi-VN'),
      duration: '0m 0s',
      location: 'AWS S3 - Primary',
      retention: '30 days',
      encrypted: settings.encryptByDefault,
      tables: ['users', 'events', 'volunteers', 'partners'],
      checksum: 'calculating...',
      automated: false,
      progress: 0
    };

    setBackups(prev => [newBackup, ...prev]);

    const progressInterval = setInterval(() => {
      setBackups(prev => prev.map(b => b.id === newBackup.id && (b.progress || 0) < 100 ? { ...b, progress: (b.progress || 0) + 10 } : b));
    }, 500);

    setTimeout(() => {
      clearInterval(progressInterval);
      setBackups(prev => prev.map(b => b.id === newBackup.id ? {
        ...b,
        status: 'completed',
        size: '2.1 GB',
        duration: '18m 32s',
        progress: 100,
        checksum: 'sha256:abc123...'
      } : b));
      setBackupInProgress(false);
    }, 5000);
  };

  const handleCreateExport = () => {
    const newExport = {
      id: `EXP${String(exportRequests.length + 1).padStart(3, '0')}`,
      name: `Manual Export - ${exportFilters.dataType}`,
      type: exportFilters.dataType,
      format: exportFilters.format,
      status: 'processing',
      size: 'calculating...',
      createdAt: new Date().toLocaleString('vi-VN'),
      completedAt: null,
      requestedBy: 'current_admin',
      downloadUrl: null,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleString('vi-VN'),
      includePersonalData: exportFilters.includePersonalData,
      records: 'processing...',
      progress: 0
    };

    setExportRequests(prev => [newExport, ...prev]);

    const progressInterval = setInterval(() => {
      setExportRequests(prev => prev.map(e => e.id === newExport.id && (e.progress || 0) < 100 ? { ...e, progress: (e.progress || 0) + 15 } : e));
    }, 1000);

    setTimeout(() => {
      clearInterval(progressInterval);
      setExportRequests(prev => prev.map(e => e.id === newExport.id ? {
        ...e,
        status: 'completed',
        size: '8.5 MB',
        completedAt: new Date().toLocaleString('vi-VN'),
        downloadUrl: `/exports/${e.type}_export.${e.format}`,
        records: Math.floor(Math.random() * 1000) + 500,
        progress: 100
      } : e));
    }, 6000);
  };

  const handleDownloadExport = (exp) => {
    if (!exp.downloadUrl) {
      alert('File chưa sẵn sàng để tải về.');
      return;
    }
    // Real implementation should fetch or open downloadUrl
    const a = document.createElement('a');
    a.href = exp.downloadUrl;
    a.download = exp.name + '.' + (exp.format || 'dat');
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDeleteExport = (exportId) => {
    if (!confirm(`Xác nhận xóa yêu cầu export ${exportId}?`)) return;
    setExportRequests(prev => prev.filter(e => e.id !== exportId));
  };

  const handlePurgeOldBackups = () => {
    if (!confirm('Bạn có chắc chắn muốn xóa tất cả backup cũ hơn chính sách retention không?')) return;
    setBackups(prev => prev.filter(b => {
      const days = parseInt(b.retention, 10);
      return isNaN(days) ? true : days >= settings.retentionDays;
    }));
    alert('Đã thực hiện purge (mô phỏng).');
  };

  // Render helpers
  const renderBackupsTab = () => (
    <div className="space-y-6">
      {/* Backup Actions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Tạo backup mới</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCreateBackup}
              disabled={backupInProgress}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {backupInProgress ? <RefreshCw size={16} className="animate-spin" /> : <Database size={16} />}
              {backupInProgress ? 'Đang backup...' : 'Tạo backup ngay'}
            </button>
            <button onClick={handleDeleteSelectedBackups} className="px-3 py-2 bg-red-50 text-red-700 rounded border hover:bg-red-100 text-sm">Xóa đã chọn</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(backupTypes).map(([key, type]) => (
            <div key={key} className="p-4 border-2 border-dashed rounded-lg hover:shadow-sm cursor-pointer transition-colors">
              <h4 className="font-medium mb-1">{type.label}</h4>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Backup List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Danh sách backup</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm backup..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {backups.filter(backup =>
            backup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            backup.type.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((backup) => {
            const backupType = backupTypes[backup.type] || { label: backup.type, color: 'gray' };
            const status = statusConfig[backup.status] || statusConfig.completed;
            const StatusIcon = status.icon;

            return (
              <div key={backup.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedBackups.includes(backup.id)}
                        onChange={() => toggleSelectBackup(backup.id)}
                        className="mr-3"
                      />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <Database size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{backup.name}</h4>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {backupType.label}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex items-center gap-1">
                            <StatusIcon size={12} />
                            {status.label}
                          </span>
                          {backup.encrypted && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                              <Lock size={10} />
                              Mã hóa
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{backup.tables.join(', ')}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {backup.createdAt}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {backup.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <HardDrive size={14} />
                            {backup.size}
                          </span>
                          <span className="flex items-center gap-1">
                            <Cloud size={14} />
                            {backup.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {backup.status === 'completed' && (
                      <button onClick={() => handleDownloadBackup(backup)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download size={16} />
                      </button>
                    )}
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <Eye size={16} />
                    </button>
                    {!backup.automated && (
                      <button onClick={() => handleDeleteBackup(backup.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {backup.status === 'in_progress' && backup.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Tiến độ backup</span>
                      <span>{backup.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${backup.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {backup.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-800 font-medium">Lỗi backup:</p>
                      <p className="text-sm text-red-700">{backup.error}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Checksum</p>
                    <p className="text-sm font-mono text-gray-700">{backup.checksum}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Retention</p>
                    <p className="text-sm text-gray-700">{backup.retention}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm text-gray-700">{backup.automated ? 'Tự động' : 'Thủ công'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Backup ID</p>
                    <p className="text-sm font-mono text-gray-700">{backup.id}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSchedulesTab = () => (
    <div className="space-y-6">
      {/* Schedule Management */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Lịch backup tự động</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <FilePlus size={16} />
            Tạo lịch mới
          </button>
        </div>

        <div className="grid gap-4">
          {backupSchedules.map((schedule) => {
            const status = statusConfig[schedule.status] || statusConfig.active;
            const StatusIcon = status.icon;

            return (
              <div key={schedule.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${schedule.enabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Calendar size={18} className={schedule.enabled ? 'text-green-600' : 'text-gray-500'} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{schedule.name}</h4>
                      <p className="text-sm text-gray-600">
                        {schedule.frequency === 'daily' ? 'Hàng ngày' :
                          schedule.frequency === 'hourly' ? 'Hàng giờ' :
                          schedule.frequency === 'weekly' ? 'Hàng tuần' : schedule.frequency}
                        {schedule.time !== 'every hour' && ` lúc ${schedule.time}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex items-center gap-1">
                      <StatusIcon size={12} />
                      {status.label}
                    </span>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <Settings size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Loại backup</p>
                    <p className="font-medium">{backupTypes[schedule.type]?.label}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Lưu trữ</p>
                    <p className="font-medium">{schedule.retention} ngày</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Chạy cuối</p>
                    <p className="font-medium">{schedule.lastRun}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Chạy tiếp</p>
                    <p className="font-medium">{schedule.nextRun}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Vị trí: {schedule.location}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${schedule.enabled ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                      onClick={() => setBackupSchedules(prev => prev.map(s => s.id === schedule.id ? { ...s, enabled: !s.enabled, status: s.enabled ? 'disabled' : 'active' } : s))}
                    >
                      {schedule.enabled ? 'Tạm dừng' : 'Kích hoạt'}
                    </button>
                    <button className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 rounded text-xs font-medium transition-colors">Chỉnh sửa</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderExportsTab = () => (
    <div className="space-y-6">
      {/* Export Configuration */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Tạo export dữ liệu mới</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loại dữ liệu</label>
            <select
              value={exportFilters.dataType}
              onChange={(e) => setExportFilters({...exportFilters, dataType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {dataTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Định dạng</label>
            <select
              value={exportFilters.format}
              onChange={(e) => setExportFilters({...exportFilters, format: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {exportFormats.map(format => (
                <option key={format.id} value={format.id}>{format.label} - {format.description}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng thời gian</label>
            <select
              value={exportFilters.dateRange}
              onChange={(e) => setExportFilters({...exportFilters, dateRange: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">7 ngày qua</option>
              <option value="30d">30 ngày qua</option>
              <option value="90d">90 ngày qua</option>
              <option value="1y">1 năm qua</option>
              <option value="all">Tất cả</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={exportFilters.includePersonalData}
                onChange={(e) => setExportFilters({...exportFilters, includePersonalData: e.target.checked})}
              />
              <span className="text-sm">Bao gồm dữ liệu cá nhân</span>
            </label>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button onClick={handleCreateExport} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Tạo export
          </button>
          <button onClick={() => setExportFilters({ dataType: 'all', dateRange: '30d', format: 'csv', includePersonalData: false })} className="px-3 py-2 border rounded">Reset</button>
        </div>
      </div>

      {/* Export Requests List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Yêu cầu export</h3>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">Tổng: {exportRequests.length}</div>
            <button onClick={() => setExportRequests([])} className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded">Xóa tất cả (mô phỏng)</button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {exportRequests.map(exp => {
            const status = statusConfig[exp.status] || statusConfig.processing;
            const StatusIcon = status.icon;
            return (
              <div key={exp.id} className="p-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold text-gray-900">{exp.name}</h4>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex items-center gap-1">
                      <StatusIcon size={12} />
                      {status.label}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">• {exp.format?.toUpperCase()}</span>
                  </div>
                  <p className="text-sm text-gray-600">{exp.createdAt} • {exp.records} records</p>

                  {exp.status === 'processing' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Tiến độ</span>
                        <span>{exp.progress ?? 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${exp.progress ?? 0}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {exp.status === 'completed' && (
                    <button onClick={() => handleDownloadExport(exp)} className="px-3 py-2 bg-blue-50 text-blue-700 rounded text-sm flex items-center gap-2">
                      <CloudDownload size={16} /> Tải về
                    </button>
                  )}
                  <button onClick={() => handleDeleteExport(exp.id)} className="px-3 py-2 bg-red-50 text-red-700 rounded text-sm flex items-center gap-2">
                    <Trash2 size={14} /> Xóa
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderStorageTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Quản lý lưu trữ</h3>
          <div className="text-sm text-gray-600">{Math.round(storageInfo.used / 1024)} GB dùng / {Math.round(storageInfo.total / 1024)} GB</div>
        </div>

        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="h-3 rounded-full bg-blue-600" style={{ width: `${usedPercent}%` }} />
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{usedPercent}% sử dụng</span>
            <span>{Math.round((storageInfo.total - storageInfo.used) / 1024)} GB còn lại</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded">
            <p className="text-sm text-gray-500">Số lượng backups</p>
            <p className="font-medium">{backups.length}</p>
          </div>
          <div className="p-4 border rounded">
            <p className="text-sm text-gray-500">Export sẵn có</p>
            <p className="font-medium">{exportRequests.length}</p>
          </div>
          <div className="p-4 border rounded">
            <p className="text-sm text-gray-500">Kho lưu trữ</p>
            <p className="font-medium">AWS S3 - Primary</p>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button onClick={() => alert('Mô phỏng: offload to Glacier')} className="px-4 py-2 bg-yellow-50 text-yellow-800 rounded">Offload to Glacier</button>
          <button onClick={() => alert('Mô phỏng: reclaim unused storage')} className="px-4 py-2 bg-blue-50 text-blue-800 rounded">Reclaim storage</button>
          <button onClick={handlePurgeOldBackups} className="px-4 py-2 bg-red-50 text-red-700 rounded">Purge old backups</button>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Cài đặt backup & export</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Retention (days)</label>
            <input
              type="number"
              min={1}
              value={settings.retentionDays}
              onChange={(e) => setSettings({ ...settings, retentionDays: Number(e.target.value) })}
              className="mt-2 px-3 py-2 border rounded w-32"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Backup Window</label>
            <div className="flex items-center gap-2 mt-2">
              <input type="time" value={settings.backupWindowStart} onChange={(e) => setSettings({ ...settings, backupWindowStart: e.target.value })} className="px-3 py-2 border rounded" />
              <span className="text-gray-500">to</span>
              <input type="time" value={settings.backupWindowEnd} onChange={(e) => setSettings({ ...settings, backupWindowEnd: e.target.value })} className="px-3 py-2 border rounded" />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={settings.encryptByDefault} onChange={(e) => setSettings({ ...settings, encryptByDefault: e.target.checked })} />
              <span className="text-sm">Mã hóa mặc định cho backup mới</span>
            </label>
            <p className="text-xs text-gray-500 mt-2">Khi bật, mọi backup thủ công hoặc automatic sẽ được mã hóa theo mặc định.</p>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button onClick={() => alert('Cài đặt đã lưu (mô phỏng)')} className="px-4 py-2 bg-blue-600 text-white rounded">Lưu cài đặt</button>
          <button onClick={() => setSettings({ retentionDays: 90, encryptByDefault: true, backupWindowStart: '02:00', backupWindowEnd: '04:00' })} className="px-4 py-2 bg-gray-100 rounded">Reset</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Database size={28} className="text-indigo-600" />
            <div>
              <h1 className="text-xl font-semibold">Backup & Export</h1>
              <p className="text-sm text-gray-500">Quản lý sao lưu, lịch và xuất dữ liệu</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Backups: {backups.length}</div>
            <div className="text-sm text-gray-600">Exports: {exportRequests.length}</div>
            <button onClick={() => { setBackups([]); setExportRequests([]); }} className="px-3 py-1 bg-gray-100 rounded border">Clear (mô phỏng)</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <nav className="flex space-x-4 px-4 py-3 overflow-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-3 py-2 rounded ${activeTab === tab.id ? 'bg-indigo-50 border border-indigo-200 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Icon size={16} />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        {activeTab === 'backups' && renderBackupsTab()}
        {activeTab === 'schedules' && renderSchedulesTab()}
        {activeTab === 'exports' && renderExportsTab()}
        {activeTab === 'storage' && renderStorageTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>
    </div>
  );
};

export default BackupExport;

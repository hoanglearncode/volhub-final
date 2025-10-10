import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Search,
  Filter,
  Settings,
  Crown,
  UserCheck,
  UserX,
  AlertTriangle,
  Info,
  ChevronRight,
  CheckCircle,
  ChevronDown,
  Copy,
  MoreVertical,
  Save,
  RefreshCw,
  Download,
  Upload,
  Calendar,
  Clock,
  Activity,
  Target,
  Database,
  FileText,
  Globe,
  Smartphone,
  Building2,
  Star,
  Award
} from 'lucide-react';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedRole, setExpandedRole] = useState(null);

  // Mock data
  const mockRoles = [
    {
      id: 'role_001',
      name: 'Super Admin',
      displayName: 'Quản trị viên cấp cao',
      description: 'Quyền truy cập toàn bộ hệ thống, quản lý tất cả tính năng',
      color: '#DC2626',
      icon: Crown,
      status: 'ACTIVE',
      priority: 1,
      isSystem: true,
      userCount: 2,
      createdAt: '2024-01-15T08:00:00Z',
      updatedAt: '2024-12-01T10:30:00Z',
      createdBy: 'system',
      permissions: [
        'user_management_all', 'role_management_all', 'event_management_all',
        'report_access_all', 'system_settings_all', 'audit_log_access',
        'backup_restore', 'security_settings'
      ]
    },
    {
      id: 'role_002',
      name: 'Event Manager',
      displayName: 'Quản lý sự kiện',
      description: 'Tạo và quản lý sự kiện, phê duyệt đăng ký tình nguyện viên',
      color: '#2563EB',
      icon: Calendar,
      status: 'ACTIVE',
      priority: 2,
      isSystem: false,
      userCount: 12,
      createdAt: '2024-02-01T09:15:00Z',
      updatedAt: '2024-11-15T14:20:00Z',
      createdBy: 'admin_001',
      permissions: [
        'event_create', 'event_edit', 'event_delete', 'event_view_all',
        'volunteer_approve', 'volunteer_reject', 'report_event_access',
        'notification_send'
      ]
    },
    {
      id: 'role_003',
      name: 'Event Coordinator',
      displayName: 'Điều phối viên sự kiện',
      description: 'Hỗ trợ quản lý sự kiện, liên lạc với tình nguyện viên',
      color: '#059669',
      icon: UserCheck,
      status: 'ACTIVE',
      priority: 3,
      isSystem: false,
      userCount: 28,
      createdAt: '2024-02-15T11:30:00Z',
      updatedAt: '2024-10-20T16:45:00Z',
      createdBy: 'admin_001',
      permissions: [
        'event_view_assigned', 'event_edit_assigned', 'volunteer_contact',
        'volunteer_check_in', 'report_basic_access', 'notification_send_limited'
      ]
    },
    {
      id: 'role_004',
      name: 'Volunteer',
      displayName: 'Tình nguyện viên',
      description: 'Người dùng cơ bản có thể đăng ký và tham gia sự kiện',
      color: '#7C3AED',
      icon: Users,
      status: 'ACTIVE',
      priority: 4,
      isSystem: true,
      userCount: 1247,
      createdAt: '2024-01-15T08:00:00Z',
      updatedAt: '2024-09-10T12:00:00Z',
      createdBy: 'system',
      permissions: [
        'profile_view', 'profile_edit', 'event_view_public', 'event_register',
        'event_unregister', 'notification_receive'
      ]
    },
    {
      id: 'role_005',
      name: 'Partner',
      displayName: 'Đối tác',
      description: 'Tổ chức đối tác có thể tạo và quản lý sự kiện của riêng mình',
      color: '#EA580C',
      icon: Building2,
      status: 'ACTIVE',
      priority: 3,
      isSystem: false,
      userCount: 45,
      createdAt: '2024-03-01T10:00:00Z',
      updatedAt: '2024-11-30T09:15:00Z',
      createdBy: 'admin_001',
      permissions: [
        'event_create_own', 'event_edit_own', 'event_view_own',
        'volunteer_view_registered', 'report_own_events', 'profile_edit'
      ]
    },
    {
      id: 'role_006',
      name: 'Content Moderator',
      displayName: 'Kiểm duyệt nội dung',
      description: 'Kiểm tra và phê duyệt nội dung trước khi xuất bản',
      color: '#DB2777',
      icon: Eye,
      status: 'INACTIVE',
      priority: 4,
      isSystem: false,
      userCount: 0,
      createdAt: '2024-04-15T14:30:00Z',
      updatedAt: '2024-05-20T11:20:00Z',
      createdBy: 'admin_001',
      permissions: [
        'content_review', 'content_approve', 'content_reject',
        'event_moderate', 'user_content_view'
      ]
    }
  ];

  const mockPermissions = [
    // User Management
    { id: 'user_management_all', name: 'Quản lý người dùng (Toàn quyền)', category: 'Quản lý người dùng', level: 'HIGH' },
    { id: 'user_create', name: 'Tạo người dùng mới', category: 'Quản lý người dùng', level: 'MEDIUM' },
    { id: 'user_edit', name: 'Chỉnh sửa thông tin người dùng', category: 'Quản lý người dùng', level: 'MEDIUM' },
    { id: 'user_delete', name: 'Xóa người dùng', category: 'Quản lý người dùng', level: 'HIGH' },
    { id: 'user_view_all', name: 'Xem tất cả người dùng', category: 'Quản lý người dùng', level: 'LOW' },
    { id: 'user_view_basic', name: 'Xem thông tin cơ bản', category: 'Quản lý người dùng', level: 'LOW' },

    // Role Management
    { id: 'role_management_all', name: 'Quản lý vai trò (Toàn quyền)', category: 'Quản lý vai trò', level: 'HIGH' },
    { id: 'role_create', name: 'Tạo vai trò mới', category: 'Quản lý vai trò', level: 'HIGH' },
    { id: 'role_edit', name: 'Chỉnh sửa vai trò', category: 'Quản lý vai trò', level: 'HIGH' },
    { id: 'role_assign', name: 'Gán vai trò cho người dùng', category: 'Quản lý vai trò', level: 'MEDIUM' },

    // Event Management
    { id: 'event_management_all', name: 'Quản lý sự kiện (Toàn quyền)', category: 'Quản lý sự kiện', level: 'HIGH' },
    { id: 'event_create', name: 'Tạo sự kiện mới', category: 'Quản lý sự kiện', level: 'MEDIUM' },
    { id: 'event_create_own', name: 'Tạo sự kiện của mình', category: 'Quản lý sự kiện', level: 'MEDIUM' },
    { id: 'event_edit', name: 'Chỉnh sửa mọi sự kiện', category: 'Quản lý sự kiện', level: 'MEDIUM' },
    { id: 'event_edit_own', name: 'Chỉnh sửa sự kiện của mình', category: 'Quản lý sự kiện', level: 'MEDIUM' },
    { id: 'event_edit_assigned', name: 'Chỉnh sửa sự kiện được gán', category: 'Quản lý sự kiện', level: 'MEDIUM' },
    { id: 'event_delete', name: 'Xóa sự kiện', category: 'Quản lý sự kiện', level: 'HIGH' },
    { id: 'event_view_all', name: 'Xem tất cả sự kiện', category: 'Quản lý sự kiện', level: 'LOW' },
    { id: 'event_view_public', name: 'Xem sự kiện công khai', category: 'Quản lý sự kiện', level: 'LOW' },
    { id: 'event_view_own', name: 'Xem sự kiện của mình', category: 'Quản lý sự kiện', level: 'LOW' },
    { id: 'event_view_assigned', name: 'Xem sự kiện được gán', category: 'Quản lý sự kiện', level: 'LOW' },

    // Volunteer Management
    { id: 'volunteer_approve', name: 'Phê duyệt đăng ký TNV', category: 'Quản lý TNV', level: 'MEDIUM' },
    { id: 'volunteer_reject', name: 'Từ chối đăng ký TNV', category: 'Quản lý TNV', level: 'MEDIUM' },
    { id: 'volunteer_contact', name: 'Liên hệ với TNV', category: 'Quản lý TNV', level: 'LOW' },
    { id: 'volunteer_check_in', name: 'Check-in TNV tại sự kiện', category: 'Quản lý TNV', level: 'LOW' },
    { id: 'volunteer_view_registered', name: 'Xem TNV đã đăng ký', category: 'Quản lý TNV', level: 'LOW' },

    // Profile Management
    { id: 'profile_view', name: 'Xem hồ sơ cá nhân', category: 'Hồ sơ', level: 'LOW' },
    { id: 'profile_edit', name: 'Chỉnh sửa hồ sơ cá nhân', category: 'Hồ sơ', level: 'LOW' },

    // Event Participation
    { id: 'event_register', name: 'Đăng ký tham gia sự kiện', category: 'Tham gia sự kiện', level: 'LOW' },
    { id: 'event_unregister', name: 'Hủy đăng ký sự kiện', category: 'Tham gia sự kiện', level: 'LOW' },

    // Reports
    { id: 'report_access_all', name: 'Truy cập tất cả báo cáo', category: 'Báo cáo', level: 'HIGH' },
    { id: 'report_event_access', name: 'Báo cáo về sự kiện', category: 'Báo cáo', level: 'MEDIUM' },
    { id: 'report_basic_access', name: 'Báo cáo cơ bản', category: 'Báo cáo', level: 'LOW' },
    { id: 'report_own_events', name: 'Báo cáo sự kiện của mình', category: 'Báo cáo', level: 'LOW' },

    // System
    { id: 'system_settings_all', name: 'Cài đặt hệ thống', category: 'Hệ thống', level: 'HIGH' },
    { id: 'audit_log_access', name: 'Truy cập nhật ký hệ thống', category: 'Hệ thống', level: 'HIGH' },
    { id: 'backup_restore', name: 'Sao lưu và khôi phục', category: 'Hệ thống', level: 'HIGH' },
    { id: 'security_settings', name: 'Cài đặt bảo mật', category: 'Hệ thống', level: 'HIGH' },

    // Notifications
    { id: 'notification_send', name: 'Gửi thông báo', category: 'Thông báo', level: 'MEDIUM' },
    { id: 'notification_send_limited', name: 'Gửi thông báo giới hạn', category: 'Thông báo', level: 'LOW' },
    { id: 'notification_receive', name: 'Nhận thông báo', category: 'Thông báo', level: 'LOW' },

    // Content Moderation
    { id: 'content_review', name: 'Xem xét nội dung', category: 'Kiểm duyệt', level: 'MEDIUM' },
    { id: 'content_approve', name: 'Phê duyệt nội dung', category: 'Kiểm duyệt', level: 'MEDIUM' },
    { id: 'content_reject', name: 'Từ chối nội dung', category: 'Kiểm duyệt', level: 'MEDIUM' },
    { id: 'event_moderate', name: 'Kiểm duyệt sự kiện', category: 'Kiểm duyệt', level: 'MEDIUM' },
    { id: 'user_content_view', name: 'Xem nội dung người dùng', category: 'Kiểm duyệt', level: 'LOW' }
  ];

  const mockUsers = [
    { id: 'user_001', name: 'Nguyễn Văn Admin', email: 'admin@volunteer.vn', role: 'role_001' },
    { id: 'user_002', name: 'Trần Thị Manager', email: 'manager@volunteer.vn', role: 'role_002' },
    { id: 'user_003', name: 'Lê Văn Coordinator', email: 'coordinator@volunteer.vn', role: 'role_003' }
  ];

  const [newRole, setNewRole] = useState({
    name: '',
    displayName: '',
    description: '',
    color: '#2563EB',
    permissions: []
  });

  useEffect(() => {
    setRoles(mockRoles);
    setPermissions(mockPermissions);
    setUsers(mockUsers);
  }, []);

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         role.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || role.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getPermissionLevel = (level) => {
    const levels = {
      HIGH: { color: 'text-red-700 bg-red-100', label: 'Cao' },
      MEDIUM: { color: 'text-orange-700 bg-orange-100', label: 'Trung bình' },
      LOW: { color: 'text-green-700 bg-green-100', label: 'Thấp' }
    };
    return levels[level] || levels.LOW;
  };

  const groupPermissionsByCategory = (permissions) => {
    return permissions.reduce((groups, permission) => {
      const category = permission.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(permission);
      return groups;
    }, {});
  };

  const handleCreateRole = () => {
    const roleId = `role_${Date.now()}`;
    const role = {
      ...newRole,
      id: roleId,
      status: 'ACTIVE',
      priority: roles.length + 1,
      isSystem: false,
      userCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current_user'
    };
    
    setRoles([...roles, role]);
    setNewRole({
      name: '',
      displayName: '',
      description: '',
      color: '#2563EB',
      permissions: []
    });
    setShowCreateModal(false);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setNewRole({
      name: role.name,
      displayName: role.displayName,
      description: role.description,
      color: role.color,
      permissions: role.permissions
    });
    setShowEditModal(true);
  };

  const handleUpdateRole = () => {
    const updatedRoles = roles.map(role =>
      role.id === selectedRole.id
        ? { ...role, ...newRole, updatedAt: new Date().toISOString() }
        : role
    );
    setRoles(updatedRoles);
    setShowEditModal(false);
    setSelectedRole(null);
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vai trò này?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  const handleToggleStatus = (roleId) => {
    const updatedRoles = roles.map(role =>
      role.id === roleId
        ? { 
            ...role, 
            status: role.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
            updatedAt: new Date().toISOString()
          }
        : role
    );
    setRoles(updatedRoles);
  };

  const RoleCard = ({ role }) => {
    const Icon = role.icon;
    const isExpanded = expandedRole === role.id;
    const rolePermissions = permissions.filter(p => role.permissions.includes(p.id));
    const groupedPermissions = groupPermissionsByCategory(rolePermissions);

    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
        {/* Role Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="p-3 rounded-full text-white"
                style={{ backgroundColor: role.color }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900">{role.displayName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    role.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {role.status === 'ACTIVE' ? 'Hoạt động' : 'Ngưng hoạt động'}
                  </span>
                  {role.isSystem && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Hệ thống
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{role.userCount} người dùng</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>{role.permissions.length} quyền</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
              
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <MoreVertical className="w-5 h-5" />
                </button>
                {/* Dropdown menu would go here */}
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="p-6 space-y-6">
            {/* Role Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleEditRole(role)}
                className="flex items-center space-x-2 px-4 py-2 text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200"
              >
                <Edit className="w-4 h-4" />
                <span>Chỉnh sửa</span>
              </button>
              
              <button
                onClick={() => handleToggleStatus(role.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  role.status === 'ACTIVE'
                    ? 'text-orange-700 bg-orange-100 hover:bg-orange-200'
                    : 'text-green-700 bg-green-100 hover:bg-green-200'
                }`}
              >
                {role.status === 'ACTIVE' ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Vô hiệu hóa</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Kích hoạt</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedRole(role)}
                className="flex items-center space-x-2 px-4 py-2 text-purple-700 bg-purple-100 rounded-lg hover:bg-purple-200"
              >
                <Users className="w-4 h-4" />
                <span>Gán người dùng</span>
              </button>

              {!role.isSystem && (
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="flex items-center space-x-2 px-4 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Xóa</span>
                </button>
              )}
            </div>

            {/* Permissions */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Quyền hạn ({role.permissions.length})</h4>
              <div className="space-y-4">
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                  <div key={category} className="border border-gray-200 rounded-lg">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <h5 className="font-medium text-gray-900">{category}</h5>
                      <p className="text-sm text-gray-600">{categoryPermissions.length} quyền</p>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {categoryPermissions.map(permission => {
                          const levelInfo = getPermissionLevel(permission.level);
                          return (
                            <div key={permission.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                              <span className="text-sm text-gray-900">{permission.name}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelInfo.color}`}>
                                {levelInfo.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Metadata */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Thông tin chi tiết</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Tạo lúc:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(role.createdAt).toLocaleString('vi-VN')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Cập nhật:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(role.updatedAt).toLocaleString('vi-VN')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Mã vai trò:</span>
                  <span className="ml-2 text-gray-900 font-mono">{role.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Độ ưu tiên:</span>
                  <span className="ml-2 text-gray-900">{role.priority}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CreateRoleModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Tạo vai trò mới</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên vai trò *
              </label>
              <input
                type="text"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin, manager, volunteer..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên hiển thị *
              </label>
              <input
                type="text"
                value={newRole.displayName}
                onChange={(e) => setNewRole({...newRole, displayName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Quản trị viên, Điều phối viên..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              value={newRole.description}
              onChange={(e) => setNewRole({...newRole, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Mô tả vai trò và trách nhiệm..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Màu sắc
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={newRole.color}
                onChange={(e) => setNewRole({...newRole, color: e.target.value})}
                className="w-12 h-8 rounded border border-gray-300"
              />
              <span className="text-sm text-gray-600">{newRole.color}</span>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quyền hạn
            </label>
            <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
              {Object.entries(groupPermissionsByCategory(permissions)).map(([category, categoryPermissions]) => (
                <div key={category} className="border-b border-gray-200 last:border-b-0">
                  <div className="px-4 py-3 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{category}</h4>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            const categoryPermissionIds = categoryPermissions.map(p => p.id);
                            const allSelected = categoryPermissionIds.every(id => newRole.permissions.includes(id));
                            if (allSelected) {
                              setNewRole({
                                ...newRole,
                                permissions: newRole.permissions.filter(id => !categoryPermissionIds.includes(id))
                              });
                            } else {
                              setNewRole({
                                ...newRole,
                                permissions: [...new Set([...newRole.permissions, ...categoryPermissionIds])]
                              });
                            }
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {categoryPermissions.every(p => newRole.permissions.includes(p.id)) ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    {categoryPermissions.map(permission => {
                      const levelInfo = getPermissionLevel(permission.level);
                      return (
                        <label key={permission.id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={newRole.permissions.includes(permission.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewRole({
                                  ...newRole,
                                  permissions: [...newRole.permissions, permission.id]
                                });
                              } else {
                                setNewRole({
                                  ...newRole,
                                  permissions: newRole.permissions.filter(id => id !== permission.id)
                                });
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <span className="text-sm text-gray-900">{permission.name}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelInfo.color}`}>
                            {levelInfo.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewRole({
                name: '',
                displayName: '',
                description: '',
                color: '#2563EB',
                permissions: []
              });
            }}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={handleCreateRole}
            disabled={!newRole.name || !newRole.displayName}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tạo vai trò
          </button>
        </div>
      </div>
    </div>
  );

  const EditRoleModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Chỉnh sửa vai trò</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên vai trò *
              </label>
              <input
                type="text"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={selectedRole?.isSystem}
              />
              {selectedRole?.isSystem && (
                <p className="text-xs text-gray-500 mt-1">Vai trò hệ thống không thể thay đổi tên</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên hiển thị *
              </label>
              <input
                type="text"
                value={newRole.displayName}
                onChange={(e) => setNewRole({...newRole, displayName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              value={newRole.description}
              onChange={(e) => setNewRole({...newRole, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Màu sắc
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={newRole.color}
                onChange={(e) => setNewRole({...newRole, color: e.target.value})}
                className="w-12 h-8 rounded border border-gray-300"
              />
              <span className="text-sm text-gray-600">{newRole.color}</span>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quyền hạn
            </label>
            <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
              {Object.entries(groupPermissionsByCategory(permissions)).map(([category, categoryPermissions]) => (
                <div key={category} className="border-b border-gray-200 last:border-b-0">
                  <div className="px-4 py-3 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{category}</h4>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            const categoryPermissionIds = categoryPermissions.map(p => p.id);
                            const allSelected = categoryPermissionIds.every(id => newRole.permissions.includes(id));
                            if (allSelected) {
                              setNewRole({
                                ...newRole,
                                permissions: newRole.permissions.filter(id => !categoryPermissionIds.includes(id))
                              });
                            } else {
                              setNewRole({
                                ...newRole,
                                permissions: [...new Set([...newRole.permissions, ...categoryPermissionIds])]
                              });
                            }
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {categoryPermissions.every(p => newRole.permissions.includes(p.id)) ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    {categoryPermissions.map(permission => {
                      const levelInfo = getPermissionLevel(permission.level);
                      return (
                        <label key={permission.id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={newRole.permissions.includes(permission.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewRole({
                                  ...newRole,
                                  permissions: [...newRole.permissions, permission.id]
                                });
                              } else {
                                setNewRole({
                                  ...newRole,
                                  permissions: newRole.permissions.filter(id => id !== permission.id)
                                });
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <span className="text-sm text-gray-900">{permission.name}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelInfo.color}`}>
                            {levelInfo.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => {
              setShowEditModal(false);
              setSelectedRole(null);
            }}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdateRole}
            disabled={!newRole.name || !newRole.displayName}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý vai trò</h1>
          <p className="text-gray-600 mt-1">
            Quản lý vai trò và quyền hạn trong hệ thống
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Xuất</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
            <span>Làm mới</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo vai trò</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng vai trò</p>
              <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Vai trò hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">
                {roles.filter(r => r.status === 'ACTIVE').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Người dùng</p>
              <p className="text-2xl font-bold text-gray-900">
                {roles.reduce((sum, role) => sum + role.userCount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-full">
              <Lock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Quyền hạn</p>
              <p className="text-2xl font-bold text-gray-900">{permissions.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm vai trò..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="ACTIVE">Hoạt động</option>
              <option value="INACTIVE">Ngưng hoạt động</option>
            </select>
          </div>
        </div>
      </div>

      {/* Role Cards */}
      <div className="space-y-6">
        {filteredRoles.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy vai trò</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? 'Không có vai trò nào khớp với tìm kiếm của bạn' 
                : 'Chưa có vai trò nào được tạo'
              }
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Tạo vai trò đầu tiên</span>
              </button>
            )}
          </div>
        ) : (
          filteredRoles.map(role => (
            <RoleCard key={role.id} role={role} />
          ))
        )}
      </div>

      {/* Modals */}
      {showCreateModal && <CreateRoleModal />}
      {showEditModal && <EditRoleModal />}
    </div>
  );
};

export default RoleManagement;
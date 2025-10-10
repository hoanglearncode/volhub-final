import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Database,
  Globe,
  Smartphone,
  Users,
  Shield,
  Lock,
  Unlock,
  Edit,
  Search,
  Trash2,
  Plus,
  Copy,
  RefreshCw,
  Download,
  ExternalLink,
  Info,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Calendar,
  Clock,
  Activity,
  ArrowUpDown
} from 'lucide-react';

/**
 * IntegrationManagement
 * - Mock data for integrations (API keys, webhooks, SSO, connectors)
 * - Features: search, filter by type/status, sort, pagination
 * - Actions: enable/disable, rotate key, revoke key, edit, delete, export CSV
 *
 * Usage: drop into your React app. Tailwind & lucide-react expected.
 */

function nowIso(offsetMinutes = 0) {
  return new Date(Date.now() + offsetMinutes * 60000).toISOString();
}

function generateKey(idSuffix = '') {
  // simple mock key generator
  return `sk_live_${Math.random().toString(36).slice(2, 18)}${idSuffix}`;
}

export default function IntegrationManagement() {
  const [integrations, setIntegrations] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', dir: 'desc' });
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showKeysModal, setShowKeysModal] = useState(false);

  // --- Mock sample data (diverse) ---
  useEffect(() => {
    const sample = [
      {
        id: 'int_001',
        name: 'Google OAuth SSO',
        provider: 'Google',
        type: 'SSO',
        category: 'Authentication',
        status: 'ACTIVE',
        createdAt: '2024-08-01T09:00:00Z',
        lastSync: nowIso(-60 * 24),
        owner: 'Security Team',
        connections: 1200,
        description: 'SSO via Google Workspace for volunteers.',
        configs: { clientId: 'g-abc', redirectUris: ['https://app/oidc/callback'] },
        apiKeys: [], // SSO has no api keys
        events: ['login', 'logout'],
        docsUrl: 'https://developers.google.com/identity'
      },
      {
        id: 'int_002',
        name: 'Analytics Connector',
        provider: 'Segment',
        type: 'CONNECTOR',
        category: 'Integrations',
        status: 'ACTIVE',
        createdAt: '2024-11-12T11:30:00Z',
        lastSync: nowIso(-60 * 6),
        owner: 'Analytics',
        connections: 8,
        description: 'Stream events to Segment for analytics routing.',
        configs: { workspace: 'prod' },
        apiKeys: [
          { id: 'key_002a', key: generateKey('-a'), active: true, createdAt: '2024-11-12T11:31:00Z', lastUsed: nowIso(-5), scopes: ['events:write'] }
        ],
        events: ['event.create', 'user.signup'],
        docsUrl: 'https://segment.com/docs'
      },
      {
        id: 'int_003',
        name: 'Mailchimp Campaigns',
        provider: 'Mailchimp',
        type: 'API',
        category: 'Communication',
        status: 'INACTIVE',
        createdAt: '2024-06-20T08:00:00Z',
        lastSync: nowIso(-60 * 24 * 7),
        owner: 'Comms',
        connections: 3,
        description: 'Push email audience segments to Mailchimp.',
        configs: { listId: 'mc_list_01' },
        apiKeys: [
          { id: 'key_003a', key: generateKey('-a'), active: false, createdAt: '2024-06-20T08:01:00Z', lastUsed: nowIso(-60 * 24 * 30), scopes: ['lists:write'] }
        ],
        events: ['subscriber.add'],
        docsUrl: 'https://mailchimp.com/developer'
      },
      {
        id: 'int_004',
        name: 'Slack Notifications',
        provider: 'Slack',
        type: 'WEBHOOK',
        category: 'Notifications',
        status: 'ACTIVE',
        createdAt: '2024-12-01T10:10:00Z',
        lastSync: nowIso(-120),
        owner: 'Ops',
        connections: 24,
        description: 'Send critical alerts to Slack channels.',
        configs: { channels: ['#ops', '#alerts'] },
        apiKeys: [
          { id: 'key_004a', key: generateKey('-a'), active: true, createdAt: '2024-12-01T10:11:00Z', lastUsed: nowIso(-10), scopes: ['messages:write'] }
        ],
        events: ['incident.reported', 'backup.completed'],
        docsUrl: 'https://api.slack.com'
      },
      {
        id: 'int_005',
        name: 'Partner API (Partner A)',
        provider: 'Partner A',
        type: 'API',
        category: 'Partners',
        status: 'ACTIVE',
        createdAt: '2025-01-02T09:15:00Z',
        lastSync: nowIso(-30),
        owner: 'Partnerships',
        connections: 2,
        description: 'Two-way sync with partner A for event data.',
        configs: { endpoint: 'https://partner-a.example.com/sync' },
        apiKeys: [
          { id: 'key_005a', key: generateKey('-a'), active: true, createdAt: '2025-01-02T09:16:00Z', lastUsed: nowIso(-1), scopes: ['events:read', 'events:write'] },
          { id: 'key_005b', key: generateKey('-b'), active: true, createdAt: '2025-01-15T09:00:00Z', lastUsed: nowIso(-1), scopes: ['events:read'] }
        ],
        events: ['event.sync'],
        docsUrl: ''
      },
      {
        id: 'int_006',
        name: 'Payment Gateway',
        provider: 'Stripe',
        type: 'API',
        category: 'Payments',
        status: 'ACTIVE',
        createdAt: '2024-03-01T07:00:00Z',
        lastSync: nowIso(-60 * 2),
        owner: 'Finance',
        connections: 430,
        description: 'Handle payments for paid events/donations.',
        configs: { mode: 'live' },
        apiKeys: [
          { id: 'key_006a', key: generateKey('-a'), active: true, createdAt: '2024-03-01T07:01:00Z', lastUsed: nowIso(-0.5), scopes: ['payments:write'] }
        ],
        events: ['payment.succeeded', 'payment.failed'],
        docsUrl: 'https://stripe.com/docs'
      },
      {
        id: 'int_007',
        name: 'Legacy Importer',
        provider: 'Internal',
        type: 'BATCH',
        category: 'Data',
        status: 'INACTIVE',
        createdAt: '2023-10-10T10:00:00Z',
        lastSync: nowIso(-60 * 24 * 100),
        owner: 'Data Team',
        connections: 0,
        description: 'Old nightly importer (deprecated).',
        configs: { schedule: '0 2 * * *' },
        apiKeys: [],
        events: ['import.completed'],
        docsUrl: ''
      },
      {
        id: 'int_008',
        name: 'Zapier Bridge',
        provider: 'Zapier',
        type: 'CONNECTOR',
        category: 'Integrations',
        status: 'ACTIVE',
        createdAt: '2024-09-09T09:09:00Z',
        lastSync: nowIso(-15),
        owner: 'Growth',
        connections: 14,
        description: 'Expose triggers/actions for external automation.',
        configs: { zaps: 32 },
        apiKeys: [
          { id: 'key_008a', key: generateKey('-a'), active: true, createdAt: '2024-09-09T09:10:00Z', lastUsed: nowIso(-2), scopes: ['webhooks:write'] }
        ],
        events: ['zap.trigger'],
        docsUrl: 'https://zapier.com/developer'
      }
    ];

    setIntegrations(sample);
  }, []);

  // derived lists
  const totalActive = useMemo(() => integrations.filter(i => i.status === 'ACTIVE').length, [integrations]);
  const totalKeys = useMemo(() => integrations.reduce((acc, it) => acc + (it.apiKeys?.length || 0), 0), [integrations]);

  // search/filter/sort
  const filtered = useMemo(() => {
    let out = integrations.slice();

    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(i =>
        (i.name || '').toLowerCase().includes(q) ||
        (i.provider || '').toLowerCase().includes(q) ||
        (i.description || '').toLowerCase().includes(q) ||
        (i.category || '').toLowerCase().includes(q)
      );
    }
    if (filterType !== 'all') out = out.filter(i => i.type === filterType);
    if (filterStatus !== 'all') out = out.filter(i => i.status === filterStatus);

    out.sort((a, b) => {
      const aV = a[sortConfig.key];
      const bV = b[sortConfig.key];
      if (aV < bV) return sortConfig.dir === 'asc' ? -1 : 1;
      if (aV > bV) return sortConfig.dir === 'asc' ? 1 : -1;
      return 0;
    });

    return out;
  }, [integrations, search, filterType, filterStatus, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const pageStart = (page - 1) * itemsPerPage;
  const currentPageItems = filtered.slice(pageStart, pageStart + itemsPerPage);

  // actions
  const toggleIntegrationStatus = (id) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, status: i.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : i));
  };

  const revokeKey = (integrationId, keyId) => {
    setIntegrations(prev => prev.map(i => {
      if (i.id !== integrationId) return i;
      return { ...i, apiKeys: (i.apiKeys || []).map(k => k.id === keyId ? { ...k, active: false } : k) };
    }));
  };

  const rotateKey = (integrationId, keyId = null) => {
    // rotate single key or create a new one if keyId null
    setIntegrations(prev => prev.map(i => {
      if (i.id !== integrationId) return i;
      const now = new Date().toISOString();
      if (keyId) {
        return {
          ...i,
          apiKeys: (i.apiKeys || []).map(k => k.id === keyId ? { ...k, key: generateKey('-rot'), createdAt: now, lastUsed: null, active: true } : k)
        };
      } else {
        const newKey = { id: `key_${Date.now()}`, key: generateKey('-new'), active: true, createdAt: now, lastUsed: null, scopes: ['default'] };
        return { ...i, apiKeys: [...(i.apiKeys || []), newKey] };
      }
    }));
  };

  const deleteIntegration = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tích hợp này? Hành động không thể hoàn tác.')) return;
    setIntegrations(prev => prev.filter(i => i.id !== id));
  };

  const createIntegration = (payload) => {
    const newItem = {
      id: `int_${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString(),
      lastSync: null,
      apiKeys: payload.apiKeys || [],
      connections: 0
    };
    setIntegrations(prev => [newItem, ...prev]);
    setShowCreateModal(false);
  };

  const updateIntegration = (id, payload) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, ...payload, updatedAt: new Date().toISOString() } : i));
    setShowEditModal(false);
    setSelectedIntegration(null);
  };

  const exportCSV = useCallback(() => {
    const header = ['id', 'name', 'provider', 'type', 'status', 'createdAt', 'connections', 'apiKeysCount', 'description'];
    const rows = filtered.map(i => [
      i.id, i.name, i.provider, i.type, i.status, i.createdAt, String(i.connections || 0), String((i.apiKeys || []).length), `"${(i.description||'').replace(/"/g,'""')}"`
    ]);
    const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `integrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  // small helper: format date/time
  const fmt = (iso) => iso ? new Date(iso).toLocaleString('vi-VN') : '-';

  // UI: Create/Edit form state
  const [form, setForm] = useState({
    name: '',
    provider: '',
    type: 'API',
    category: '',
    description: '',
    configs: {},
    apiKeys: []
  });

  useEffect(() => {
    if (selectedIntegration && showEditModal) {
      setForm({
        name: selectedIntegration.name,
        provider: selectedIntegration.provider,
        type: selectedIntegration.type,
        category: selectedIntegration.category,
        description: selectedIntegration.description,
        configs: selectedIntegration.configs || {},
        apiKeys: selectedIntegration.apiKeys || []
      });
    }
  }, [selectedIntegration, showEditModal]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý tích hợp</h1>
          <p className="text-sm text-gray-600 mt-1">Quản lý connectors, webhooks, API keys và SSO</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600">
            <div><span className="font-medium">{integrations.length}</span> tích hợp</div>
            <div className="text-xs text-gray-500">{totalActive} đang hoạt động · {totalKeys} api keys</div>
          </div>

          <button onClick={() => setShowCreateModal(true)} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />Tạo tích hợp
          </button>

          <button onClick={exportCSV} className="inline-flex items-center px-3 py-2 border rounded-lg">
            <Download className="w-4 h-4 mr-2" />Xuất CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-4 flex items-center space-x-3">
          <Database className="w-6 h-6 text-blue-600" />
          <div>
            <div className="text-sm text-gray-500">Tổng tích hợp</div>
            <div className="text-lg font-semibold text-gray-900">{integrations.length}</div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 flex items-center space-x-3">
          <Shield className="w-6 h-6 text-green-600" />
          <div>
            <div className="text-sm text-gray-500">Hoạt động</div>
            <div className="text-lg font-semibold text-gray-900">{totalActive}</div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 flex items-center space-x-3">
          <Users className="w-6 h-6 text-purple-600" />
          <div>
            <div className="text-sm text-gray-500">Kết nối tổng</div>
            <div className="text-lg font-semibold text-gray-900">{integrations.reduce((s,i)=>s+(i.connections||0),0)}</div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 flex items-center space-x-3">
          <Lock className="w-6 h-6 text-orange-600" />
          <div>
            <div className="text-sm text-gray-500">API keys</div>
            <div className="text-lg font-semibold text-gray-900">{totalKeys}</div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center space-x-3 w-full md:max-w-lg">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Tìm kiếm tên, nhà cung cấp, mô tả..." className="w-full pl-10 pr-3 py-2 border rounded-lg" />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="all">Tất cả loại</option>
            <option value="API">API</option>
            <option value="WEBHOOK">Webhook</option>
            <option value="SSO">SSO</option>
            <option value="CONNECTOR">Connector</option>
            <option value="BATCH">Batch</option>
          </select>

          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="all">Tất cả trạng thái</option>
            <option value="ACTIVE">Hoạt động</option>
            <option value="INACTIVE">Ngưng hoạt động</option>
          </select>

          <select value={sortConfig.key + '|' + sortConfig.dir} onChange={(e) => {
            const [key, dir] = e.target.value.split('|');
            setSortConfig({ key, dir });
          }} className="px-3 py-2 border rounded-lg">
            <option value="createdAt|desc">Mới nhất</option>
            <option value="createdAt|asc">Cũ nhất</option>
            <option value="lastSync|desc">Last sync (new → old)</option>
            <option value="lastSync|asc">Last sync (old → new)</option>
            <option value="connections|desc">Connections (high → low)</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {currentPageItems.length === 0 ? (
          <div className="bg-white border rounded-xl p-8 text-center text-gray-600">Không tìm thấy tích hợp.</div>
        ) : (
          currentPageItems.map(item => (
            <div key={item.id} className="bg-white border rounded-xl p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700">
                  {/* provider icon placeholder */}
                  {item.type === 'SSO' ? <Globe className="w-6 h-6" /> : item.type === 'API' ? <Database className="w-6 h-6" /> : item.type === 'WEBHOOK' ? <ExternalLink className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-xs text-gray-500">{item.provider}</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${item.status === 'ACTIVE' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Created: {fmt(item.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Last sync: {fmt(item.lastSync)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{item.connections} kết nối</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      <span>{(item.apiKeys||[]).length} keys</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 flex flex-col items-end justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => { setSelectedIntegration(item); setShowKeysModal(true); }} className="px-3 py-2 border rounded text-sm">Keys</button>
                  <button onClick={() => { setSelectedIntegration(item); setShowEditModal(true); }} className="px-3 py-2 border rounded text-sm"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => toggleIntegrationStatus(item.id)} className={`px-3 py-2 rounded text-sm ${item.status === 'ACTIVE' ? 'bg-orange-50 text-orange-700 border border-orange-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                    {item.status === 'ACTIVE' ? 'Vô hiệu' : 'Kích hoạt'}
                  </button>
                  <button onClick={() => deleteIntegration(item.id)} className="px-3 py-2 border rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>

                <div className="text-xs text-gray-500 mt-3 text-right">
                  <div>Owner: {item.owner}</div>
                  <div>Category: {item.category}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Hiển thị {pageStart + 1} - {Math.min(pageStart + itemsPerPage, filtered.length)} trong {filtered.length}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
          <div className="px-3 py-1 border rounded text-sm">{page} / {totalPages}</div>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>

      {/* Keys Modal */}
      {showKeysModal && selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl bg-white rounded-xl overflow-auto max-h-[90vh]">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{selectedIntegration.name} — Keys</h3>
                <p className="text-sm text-gray-500">{selectedIntegration.provider}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { rotateKey(selectedIntegration.id, null); }} className="px-3 py-2 text-sm bg-blue-600 text-white rounded">Tạo key mới</button>
                <button onClick={() => setShowKeysModal(false)} className="px-3 py-2 border rounded">Đóng</button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {(selectedIntegration.apiKeys || []).length === 0 ? (
                <div className="text-sm text-gray-600">Không có API key cho tích hợp này.</div>
              ) : (
                (selectedIntegration.apiKeys || []).map(k => (
                  <div key={k.id} className="border rounded p-3 flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium">{k.id} {k.active ? <span className="ml-2 text-xs text-green-700">Active</span> : <span className="ml-2 text-xs text-red-600">Inactive</span>}</div>
                      <div className="text-xs text-gray-500 mt-1">Created: {fmt(k.createdAt)} · Last used: {k.lastUsed ? fmt(k.lastUsed) : '—'}</div>
                      <div className="text-xs text-gray-500 mt-1">Scopes: {k.scopes?.join(', ')}</div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <button onClick={() => { navigator.clipboard?.writeText(k.key); }} className="px-2 py-1 border rounded text-sm"><Copy className="w-4 h-4 inline-block mr-1" />Copy</button>
                      <button onClick={() => rotateKey(selectedIntegration.id, k.id)} className="px-2 py-1 border rounded text-sm">Rotate</button>
                      <button onClick={() => revokeKey(selectedIntegration.id, k.id)} className="px-2 py-1 border rounded text-sm text-red-600">Revoke</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl bg-white rounded-xl overflow-auto max-h-[90vh]">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tạo tích hợp mới</h3>
              <button onClick={() => setShowCreateModal(false)} className="px-3 py-1 border rounded">Đóng</button>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-700">Tên</label>
                  <input className="w-full border px-3 py-2 rounded" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Nhà cung cấp</label>
                  <input className="w-full border px-3 py-2 rounded" value={form.provider} onChange={(e) => setForm(f => ({ ...f, provider: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Loại</label>
                  <select className="w-full border px-3 py-2 rounded" value={form.type} onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option value="API">API</option>
                    <option value="WEBHOOK">Webhook</option>
                    <option value="SSO">SSO</option>
                    <option value="CONNECTOR">Connector</option>
                    <option value="BATCH">Batch</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-700">Category</label>
                  <input className="w-full border px-3 py-2 rounded" value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Mô tả</label>
                <textarea className="w-full border px-3 py-2 rounded" rows={3} value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>

              <div className="flex justify-end gap-2">
                <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 border rounded">Hủy</button>
                <button onClick={() => createIntegration(form)} className="px-4 py-2 bg-blue-600 text-white rounded">Tạo</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl bg-white rounded-xl overflow-auto max-h-[90vh]">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Chỉnh sửa: {selectedIntegration.name}</h3>
              <button onClick={() => { setShowEditModal(false); setSelectedIntegration(null); }} className="px-3 py-1 border rounded">Đóng</button>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-700">Tên</label>
                  <input className="w-full border px-3 py-2 rounded" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Nhà cung cấp</label>
                  <input className="w-full border px-3 py-2 rounded" value={form.provider} onChange={(e) => setForm(f => ({ ...f, provider: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Mô tả</label>
                <textarea className="w-full border px-3 py-2 rounded" rows={3} value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>

              <div className="flex justify-end gap-2">
                <button onClick={() => { setShowEditModal(false); setSelectedIntegration(null); }} className="px-4 py-2 border rounded">Hủy</button>
                <button onClick={() => updateIntegration(selectedIntegration.id, form)} className="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

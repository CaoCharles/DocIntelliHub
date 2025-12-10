import {
    Search,
    Download,
    Filter,
    FileText,
    User,
    Clock,
    Eye,
    Edit,
    Trash2,
    LogIn,
    LogOut,
    CheckCircle
} from 'lucide-react'
import { useState } from 'react'

const logs = [
    {
        id: 1,
        timestamp: '2024-12-10 09:45:32',
        user: '王小明',
        role: '系統管理員',
        action: 'approve',
        resource: '文檔',
        resourceName: '品質手冊 v3.2',
        description: '批准文檔公開發行',
        ip: '192.168.1.100'
    },
    {
        id: 2,
        timestamp: '2024-12-10 09:30:15',
        user: '張小華',
        role: '文管人員',
        action: 'create',
        resource: '文檔',
        resourceName: '客訴處理流程',
        description: '建立新文檔草稿',
        ip: '192.168.1.105'
    },
    {
        id: 3,
        timestamp: '2024-12-10 09:15:48',
        user: '李經理',
        role: '部門主管',
        action: 'update',
        resource: 'CCAR',
        resourceName: 'CCAR-2024-001',
        description: '更新矯正措施內容',
        ip: '192.168.1.101'
    },
    {
        id: 4,
        timestamp: '2024-12-10 09:00:22',
        user: '陳美玲',
        role: '稽核員',
        action: 'login',
        resource: '系統',
        resourceName: '使用者登入',
        description: '使用者成功登入系統',
        ip: '192.168.1.110'
    },
    {
        id: 5,
        timestamp: '2024-12-10 08:45:10',
        user: '林志偉',
        role: '一般使用者',
        action: 'view',
        resource: '文檔',
        resourceName: 'ISO 9001 程序書',
        description: '檢視文檔內容',
        ip: '192.168.1.115'
    },
    {
        id: 6,
        timestamp: '2024-12-10 08:30:55',
        user: '王小明',
        role: '系統管理員',
        action: 'delete',
        resource: '使用者',
        resourceName: '測試帳號01',
        description: '刪除測試用帳號',
        ip: '192.168.1.100'
    },
    {
        id: 7,
        timestamp: '2024-12-10 08:15:33',
        user: '黃雅琪',
        role: '文管人員',
        action: 'export',
        resource: '報表',
        resourceName: '月度文檔統計報表',
        description: '匯出報表為 Excel 格式',
        ip: '192.168.1.120'
    },
    {
        id: 8,
        timestamp: '2024-12-09 17:30:00',
        user: '陳美玲',
        role: '稽核員',
        action: 'logout',
        resource: '系統',
        resourceName: '使用者登出',
        description: '使用者登出系統',
        ip: '192.168.1.110'
    },
]

const actionMap = {
    'create': { label: '建立', color: 'var(--success-500)', icon: FileText },
    'update': { label: '更新', color: 'var(--primary-500)', icon: Edit },
    'delete': { label: '刪除', color: 'var(--danger-500)', icon: Trash2 },
    'view': { label: '檢視', color: 'var(--gray-500)', icon: Eye },
    'approve': { label: '批准', color: 'var(--success-600)', icon: CheckCircle },
    'login': { label: '登入', color: 'var(--primary-600)', icon: LogIn },
    'logout': { label: '登出', color: 'var(--gray-600)', icon: LogOut },
    'export': { label: '匯出', color: 'var(--warning-500)', icon: Download },
}

const filterOptions = ['全部', '建立', '更新', '刪除', '檢視', '批准', '登入', '登出']

function AuditTrail() {
    const [activeFilter, setActiveFilter] = useState('全部')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredLogs = logs.filter(log => {
        const actionLabel = actionMap[log.action].label
        const matchesFilter = activeFilter === '全部' || actionLabel === activeFilter
        const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.resourceName.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">稽核軌跡</h1>
                <p className="page-subtitle">系統活動日誌與操作記錄</p>
            </div>

            {/* 工具列 */}
            <div className="card" style={{ marginBottom: '20px' }}>
                <div className="card-body">
                    <div className="toolbar">
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div className="search-box">
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="搜尋使用者或資源名稱..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="filter-group">
                                {filterOptions.slice(0, 5).map(option => (
                                    <button
                                        key={option}
                                        className={`filter-btn ${activeFilter === option ? 'active' : ''}`}
                                        onClick={() => setActiveFilter(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button className="btn btn-secondary">
                            <Download size={18} />
                            匯出日誌
                        </button>
                    </div>
                </div>
            </div>

            {/* 日誌列表 */}
            <div className="card">
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>時間</th>
                                    <th>使用者</th>
                                    <th>角色</th>
                                    <th>動作</th>
                                    <th>資源類型</th>
                                    <th>資源名稱</th>
                                    <th>描述</th>
                                    <th>IP 位址</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map((log) => {
                                    const ActionIcon = actionMap[log.action].icon
                                    return (
                                        <tr key={log.id}>
                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gray-600)' }}>
                                                    <Clock size={14} />
                                                    {log.timestamp}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        borderRadius: '50%',
                                                        background: 'var(--primary-100)',
                                                        color: 'var(--primary-600)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '12px',
                                                        fontWeight: '600'
                                                    }}>
                                                        {log.user.charAt(0)}
                                                    </div>
                                                    <strong>{log.user}</strong>
                                                </div>
                                            </td>
                                            <td style={{ color: 'var(--gray-500)' }}>{log.role}</td>
                                            <td>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    background: `${actionMap[log.action].color}15`,
                                                    color: actionMap[log.action].color
                                                }}>
                                                    <ActionIcon size={14} />
                                                    {actionMap[log.action].label}
                                                </span>
                                            </td>
                                            <td>{log.resource}</td>
                                            <td><strong>{log.resourceName}</strong></td>
                                            <td style={{ color: 'var(--gray-500)', maxWidth: '200px' }}>{log.description}</td>
                                            <td style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--gray-500)' }}>{log.ip}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 分頁 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <span style={{ color: 'var(--gray-500)', fontSize: '14px' }}>
                    顯示 1-{filteredLogs.length} 筆，共 {filteredLogs.length} 筆
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary btn-sm" disabled>上一頁</button>
                    <button className="btn btn-primary btn-sm">1</button>
                    <button className="btn btn-secondary btn-sm">下一頁</button>
                </div>
            </div>
        </div>
    )
}

export default AuditTrail

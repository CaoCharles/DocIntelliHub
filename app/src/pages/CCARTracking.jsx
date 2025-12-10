import {
    Plus,
    Search,
    Eye,
    Edit,
    AlertTriangle,
    Clock,
    CheckCircle,
    XCircle
} from 'lucide-react'
import { useState } from 'react'

const ccars = [
    {
        id: 'CCAR-2024-001',
        title: '文件版本控制不符合',
        source: '內部稽核 AUD-2024-012',
        severity: 'major',
        department: '品質部',
        assignee: '張小明',
        status: 'open',
        issuedDate: '2024-12-01',
        dueDate: '2024-12-15',
        daysLeft: 5
    },
    {
        id: 'CCAR-2024-002',
        title: '訓練紀錄未更新',
        source: '內部稽核 AUD-2024-010',
        severity: 'minor',
        department: '人資部',
        assignee: '李美華',
        status: 'in-progress',
        issuedDate: '2024-11-28',
        dueDate: '2024-12-12',
        daysLeft: 2
    },
    {
        id: 'CCAR-2024-003',
        title: '供應商評鑑過期',
        source: '供應商稽核 AUD-2024-008',
        severity: 'major',
        department: '採購部',
        assignee: '王建國',
        status: 'verification',
        issuedDate: '2024-11-20',
        dueDate: '2024-12-05',
        daysLeft: -5
    },
    {
        id: 'CCAR-2024-004',
        title: '設備校驗逾期',
        source: '內部稽核 AUD-2024-009',
        severity: 'critical',
        department: '生產部',
        assignee: '陳志豪',
        status: 'closed',
        issuedDate: '2024-11-15',
        dueDate: '2024-11-30',
        daysLeft: 0
    },
    {
        id: 'CCAR-2024-005',
        title: '客訴處理流程缺失',
        source: '客戶稽核',
        severity: 'major',
        department: '客服部',
        assignee: '林雅琪',
        status: 'open',
        issuedDate: '2024-12-05',
        dueDate: '2024-12-20',
        daysLeft: 10
    },
]

const statusMap = {
    'open': { label: '開立', class: 'open', icon: Clock },
    'in-progress': { label: '處理中', class: 'in-review', icon: AlertTriangle },
    'verification': { label: '驗證中', class: 'draft', icon: Eye },
    'closed': { label: '已結案', class: 'approved', icon: CheckCircle }
}

const severityMap = {
    'critical': { label: '重大', color: 'var(--danger-500)' },
    'major': { label: '主要', color: 'var(--warning-500)' },
    'minor': { label: '次要', color: 'var(--gray-500)' }
}

const filterOptions = ['全部', '開立', '處理中', '驗證中', '已結案']

function CCARTracking() {
    const [activeFilter, setActiveFilter] = useState('全部')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredCCARs = ccars.filter(ccar => {
        const statusLabel = statusMap[ccar.status].label
        const matchesFilter = activeFilter === '全部' || statusLabel === activeFilter
        const matchesSearch = ccar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ccar.id.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const openCount = ccars.filter(c => c.status === 'open').length
    const overdueCount = ccars.filter(c => c.daysLeft < 0 && c.status !== 'closed').length

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">CCAR 追蹤</h1>
                <p className="page-subtitle">矯正與預防措施請求管理</p>
            </div>

            {/* 統計概覽 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--warning-500)' }}>{openCount}</div>
                    <div className="stat-label">開立中</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--primary-500)' }}>{ccars.filter(c => c.status === 'in-progress').length}</div>
                    <div className="stat-label">處理中</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--danger-500)' }}>{overdueCount}</div>
                    <div className="stat-label">已逾期</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--success-500)' }}>{ccars.filter(c => c.status === 'closed').length}</div>
                    <div className="stat-label">已結案</div>
                </div>
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
                                    placeholder="搜尋 CCAR 編號或標題..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="filter-group">
                                {filterOptions.map(option => (
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
                        <button className="btn btn-primary">
                            <Plus size={18} />
                            新增 CCAR
                        </button>
                    </div>
                </div>
            </div>

            {/* CCAR 列表 */}
            <div className="card">
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>CCAR 編號</th>
                                    <th>問題描述</th>
                                    <th>來源</th>
                                    <th>嚴重程度</th>
                                    <th>負責部門</th>
                                    <th>負責人</th>
                                    <th>到期日</th>
                                    <th>狀態</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCCARs.map((ccar) => {
                                    const StatusIcon = statusMap[ccar.status].icon
                                    return (
                                        <tr key={ccar.id}>
                                            <td><strong>{ccar.id}</strong></td>
                                            <td>{ccar.title}</td>
                                            <td style={{ fontSize: '13px', color: 'var(--gray-500)' }}>{ccar.source}</td>
                                            <td>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    background: `${severityMap[ccar.severity].color}15`,
                                                    color: severityMap[ccar.severity].color
                                                }}>
                                                    <AlertTriangle size={14} />
                                                    {severityMap[ccar.severity].label}
                                                </span>
                                            </td>
                                            <td>{ccar.department}</td>
                                            <td>{ccar.assignee}</td>
                                            <td>
                                                <div>
                                                    <div>{ccar.dueDate}</div>
                                                    {ccar.daysLeft < 0 && ccar.status !== 'closed' && (
                                                        <div style={{ fontSize: '11px', color: 'var(--danger-500)' }}>
                                                            已逾期 {Math.abs(ccar.daysLeft)} 天
                                                        </div>
                                                    )}
                                                    {ccar.daysLeft > 0 && ccar.daysLeft <= 3 && ccar.status !== 'closed' && (
                                                        <div style={{ fontSize: '11px', color: 'var(--warning-500)' }}>
                                                            剩餘 {ccar.daysLeft} 天
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge ${statusMap[ccar.status].class}`}>
                                                    {statusMap[ccar.status].label}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '4px' }}>
                                                    <button className="btn-icon" title="查看">
                                                        <Eye size={16} />
                                                    </button>
                                                    <button className="btn-icon" title="編輯">
                                                        <Edit size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CCARTracking

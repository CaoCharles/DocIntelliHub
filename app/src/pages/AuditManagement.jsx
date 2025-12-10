import {
    Plus,
    Search,
    Eye,
    Edit,
    FileText,
    Calendar,
    Users,
    CheckCircle
} from 'lucide-react'
import { useState } from 'react'

const audits = [
    {
        id: 'AUD-2024-012',
        name: 'ISO 9001 年度稽核',
        type: '外部稽核',
        standard: 'ISO 9001:2015',
        department: '全公司',
        status: 'in-progress',
        startDate: '2024-12-01',
        endDate: '2024-12-10',
        leadAuditor: '張經理',
        findings: 5
    },
    {
        id: 'AUD-2024-013',
        name: '供應商評鑑稽核 - 大成公司',
        type: '供應商稽核',
        standard: '供應商評鑑標準',
        department: '採購部',
        status: 'completed',
        startDate: '2024-11-25',
        endDate: '2024-11-26',
        leadAuditor: '李稽核員',
        findings: 3
    },
    {
        id: 'AUD-2024-014',
        name: '倉儲管理內部稽核',
        type: '內部稽核',
        standard: 'ISO 9001:2015',
        department: '倉儲部',
        status: 'planned',
        startDate: '2024-12-15',
        endDate: '2024-12-16',
        leadAuditor: '王稽核員',
        findings: 0
    },
    {
        id: 'AUD-2024-015',
        name: '客服中心服務品質稽核',
        type: '內部稽核',
        standard: '服務品質標準',
        department: '客服部',
        status: 'reporting',
        startDate: '2024-11-28',
        endDate: '2024-11-30',
        leadAuditor: '陳稽核員',
        findings: 2
    },
    {
        id: 'AUD-2024-016',
        name: '生產線製程稽核',
        type: '內部稽核',
        standard: 'ISO 9001:2015',
        department: '生產部',
        status: 'in-progress',
        startDate: '2024-12-05',
        endDate: '2024-12-08',
        leadAuditor: '林稽核員',
        findings: 4
    },
]

const statusMap = {
    'planned': { label: '計劃中', class: 'draft' },
    'in-progress': { label: '進行中', class: 'in-review' },
    'reporting': { label: '報告撰寫', class: 'open' },
    'completed': { label: '已完成', class: 'approved' }
}

const filterOptions = ['全部', '計劃中', '進行中', '報告撰寫', '已完成']

function AuditManagement() {
    const [activeFilter, setActiveFilter] = useState('全部')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredAudits = audits.filter(audit => {
        const statusLabel = statusMap[audit.status].label
        const matchesFilter = activeFilter === '全部' || statusLabel === activeFilter
        const matchesSearch = audit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            audit.id.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">稽核管理</h1>
                <p className="page-subtitle">管理稽核計劃、執行與報告</p>
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
                                    placeholder="搜尋稽核編號或名稱..."
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
                            新增稽核計劃
                        </button>
                    </div>
                </div>
            </div>

            {/* 稽核卡片列表 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {filteredAudits.map(audit => (
                    <div key={audit.id} className="card">
                        <div className="card-body">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div>
                                    <span style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '4px', display: 'block' }}>
                                        {audit.id}
                                    </span>
                                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--gray-800)' }}>
                                        {audit.name}
                                    </h3>
                                </div>
                                <span className={`badge ${statusMap[audit.status].class}`}>
                                    {statusMap[audit.status].label}
                                </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--gray-600)' }}>
                                    <FileText size={16} />
                                    <span>{audit.type}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--gray-600)' }}>
                                    <Calendar size={16} />
                                    <span>{audit.startDate}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--gray-600)' }}>
                                    <Users size={16} />
                                    <span>{audit.leadAuditor}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--gray-600)' }}>
                                    <CheckCircle size={16} />
                                    <span>{audit.findings} 項發現</span>
                                </div>
                            </div>

                            <div style={{
                                padding: '10px 12px',
                                background: 'var(--gray-50)',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '16px',
                                fontSize: '13px',
                                color: 'var(--gray-600)'
                            }}>
                                標準：{audit.standard} | 部門：{audit.department}
                            </div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                                    <Eye size={16} />
                                    查看詳情
                                </button>
                                <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                                    <Edit size={16} />
                                    編輯
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AuditManagement

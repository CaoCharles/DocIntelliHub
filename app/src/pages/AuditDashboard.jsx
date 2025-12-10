import {
    ClipboardCheck,
    AlertTriangle,
    CheckCircle,
    Clock,
    TrendingUp,
    Calendar,
    ArrowRight
} from 'lucide-react'

const stats = [
    { label: '進行中稽核', value: '8', icon: ClipboardCheck, color: 'blue', trend: '3 件本週', trendUp: true },
    { label: '發現項總數', value: '47', icon: AlertTriangle, color: 'orange', trend: '+5 件', trendUp: true },
    { label: '合規率', value: '92.5%', icon: CheckCircle, color: 'green', trend: '+1.8%', trendUp: true },
    { label: '開放中 CCAR', value: '12', icon: Clock, color: 'red', trend: '3 件即將到期', trendUp: false },
]

const upcomingAudits = [
    { id: 'AUD-2024-015', name: 'ISO 9001 監督稽核', type: '外部稽核', department: '全公司', date: '2024-12-15', auditor: '張經理' },
    { id: 'AUD-2024-016', name: '生產線內部稽核', type: '內部稽核', department: '生產部', date: '2024-12-18', auditor: '李稽核員' },
    { id: 'AUD-2024-017', name: '供應商稽核 - 台北科技', type: '供應商稽核', department: '採購部', date: '2024-12-20', auditor: '王稽核員' },
    { id: 'AUD-2024-018', name: '品質管理系統稽核', type: '內部稽核', department: '品質部', date: '2024-12-22', auditor: '陳稽核員' },
]

const findingsByCategory = [
    { category: '文件管制', count: 15, percentage: 32 },
    { category: '作業程序', count: 12, percentage: 26 },
    { category: '紀錄保存', count: 8, percentage: 17 },
    { category: '訓練管理', count: 7, percentage: 15 },
    { category: '其他', count: 5, percentage: 10 },
]

const typeMap = {
    '外部稽核': 'primary',
    '內部稽核': 'green',
    '供應商稽核': 'orange'
}

function AuditDashboard() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">稽核儀表板</h1>
                <p className="page-subtitle">稽核活動總覽與關鍵指標</p>
            </div>

            {/* 統計卡片 */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-header">
                            <div className={`stat-icon ${stat.color}`}>
                                <stat.icon size={22} />
                            </div>
                        </div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                        <div className={`stat-trend ${stat.trendUp ? 'up' : 'down'}`}>
                            <TrendingUp size={14} />
                            <span>{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid-2">
                {/* 即將進行的稽核 */}
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">即將進行的稽核</h2>
                        <button className="btn btn-secondary btn-sm">
                            <Calendar size={16} />
                            查看行事曆
                        </button>
                    </div>
                    <div className="card-body" style={{ padding: 0 }}>
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>稽核編號</th>
                                        <th>稽核名稱</th>
                                        <th>類型</th>
                                        <th>日期</th>
                                        <th>主稽核員</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingAudits.map((audit) => (
                                        <tr key={audit.id}>
                                            <td><strong>{audit.id}</strong></td>
                                            <td>{audit.name}</td>
                                            <td>
                                                <span className={`badge ${audit.type === '外部稽核' ? 'in-review' : audit.type === '內部稽核' ? 'approved' : 'open'}`}>
                                                    {audit.type}
                                                </span>
                                            </td>
                                            <td>{audit.date}</td>
                                            <td>{audit.auditor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 發現項分類 */}
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">發現項分類統計</h2>
                    </div>
                    <div className="card-body">
                        {findingsByCategory.map((item, index) => (
                            <div key={index} style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '14px', color: 'var(--gray-700)' }}>{item.category}</span>
                                    <span style={{ fontSize: '14px', color: 'var(--gray-500)' }}>{item.count} 件 ({item.percentage}%)</span>
                                </div>
                                <div style={{
                                    height: '8px',
                                    background: 'var(--gray-100)',
                                    borderRadius: '999px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${item.percentage}%`,
                                        height: '100%',
                                        background: `linear-gradient(90deg, var(--primary-400), var(--primary-600))`,
                                        borderRadius: '999px',
                                        transition: 'width 0.3s ease'
                                    }} />
                                </div>
                            </div>
                        ))}
                        <div style={{
                            marginTop: '20px',
                            padding: '12px',
                            background: 'var(--gray-50)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>總發現項數</span>
                            <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--gray-800)' }}>47 件</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuditDashboard

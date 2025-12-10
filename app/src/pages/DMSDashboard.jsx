import {
    Building2,
    FileText,
    Clock,
    TrendingUp,
    Eye,
    Check,
    Upload
} from 'lucide-react'

const stats = [
    { label: '總部門數', value: '4', sublabel: '所有部門', icon: Building2 },
    { label: '總文件數', value: '120', sublabel: '有效受控文件', icon: FileText },
    { label: '待審核文件', value: '12', sublabel: '等待批准', icon: Clock },
    { label: '批准率', value: '98%', sublabel: '本月統計', icon: TrendingUp },
]

const pendingDocuments = [
    {
        title: '員工考核辦法 v2.1',
        priority: 'high',
        submitter: '王小明',
        department: '人力資源部',
        date: '2024-12-15',
        waiting: '等待 5 天'
    },
    {
        title: '商品規格標準手冊',
        priority: 'medium',
        submitter: '李美玲',
        department: '商品部',
        date: '2024-12-14',
        waiting: '等待 6 天'
    },
    {
        title: '客戶服務流程規範',
        priority: 'high',
        submitter: '張志偉',
        department: '業務部',
        date: '2024-12-13',
        waiting: '等待 7 天'
    },
    {
        title: '新人培訓教材 v3.0',
        priority: 'medium',
        submitter: '陳雅琪',
        department: '教育訓練部',
        date: '2024-12-12',
        waiting: '等待 8 天'
    },
]

const activities = [
    {
        icon: Check,
        user: '林主管',
        action: '已批准',
        target: '員工手冊 v3.2',
        department: '人力資源部',
        time: '2024/12/15 下午10:30:00'
    },
    {
        icon: Upload,
        user: '王小明',
        action: '提交審核',
        target: '商品包裝指南 v2.1',
        department: '商品部',
        time: '2024/12/15 上午09:15:00'
    },
]

function DMSDashboard() {
    return (
        <div className="page-container">
            {/* 統計卡片 */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-content">
                            <div className="stat-label">{stat.label}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-sublabel">{stat.sublabel}</div>
                        </div>
                        <div className="stat-icon">
                            <stat.icon size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* 主要內容區 */}
            <div className="grid-2">
                {/* 待處理文檔 */}
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">
                            <Clock size={18} />
                            待審核文件
                        </h2>
                    </div>
                    <div className="card-body" style={{ padding: 0 }}>
                        <div className="pending-list" style={{ padding: '0 20px' }}>
                            {pendingDocuments.map((doc, index) => (
                                <div key={index} className="pending-item">
                                    <div className="pending-content">
                                        <div className="pending-title">
                                            {doc.title}
                                            <span className={`priority-badge ${doc.priority}`}>
                                                {doc.priority === 'high' ? '高' : doc.priority === 'medium' ? '中' : '急'}
                                            </span>
                                        </div>
                                        <div className="pending-meta">
                                            {doc.submitter} • {doc.department}
                                            <br />
                                            提交於 {doc.date} • {doc.waiting}
                                        </div>
                                    </div>
                                    <div className="pending-action">
                                        <Eye size={18} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 右側區塊 */}
                <div>
                    {/* 文檔狀態圓餅圖 */}
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <div className="card-header">
                            <h2 className="card-title">文件狀態概覽</h2>
                        </div>
                        <div className="card-body">
                            <div className="chart-container">
                                <div className="donut-chart"></div>
                            </div>
                            <div className="chart-legend">
                                <div className="legend-item">
                                    <div className="legend-dot approved"></div>
                                    <span>已批准</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-dot pending"></div>
                                    <span>待審核</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-dot rejected"></div>
                                    <span>已拒絕</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 最近活動 */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">
                                <TrendingUp size={18} />
                                最近活動
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="activity-list">
                                {activities.map((activity, index) => (
                                    <div key={index} className="activity-item">
                                        <div className={`activity-icon ${activity.action === '已批准' ? 'approve' : 'create'}`}>
                                            <activity.icon size={16} />
                                        </div>
                                        <div className="activity-content">
                                            <div className="activity-text">
                                                <strong>{activity.user}</strong> {activity.action} <strong>{activity.target}</strong>
                                            </div>
                                            <div className="activity-time">{activity.department} • {activity.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DMSDashboard

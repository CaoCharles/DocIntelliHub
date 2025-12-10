import {
    Plus,
    Search,
    Edit,
    Trash2,
    Shield,
    Mail,
    MoreVertical
} from 'lucide-react'
import { useState } from 'react'

const users = [
    {
        id: 1,
        name: '林志偉',
        email: 'lin.zhiwei@agia.com',
        department: '人力資源部',
        role: '部門主管',
        status: 'active',
        lastLogin: '2024-12-10 09:45',
        twoFactor: true
    },
    {
        id: 2,
        name: '王美玲',
        email: 'wang.meiling@agia.com',
        department: '人力資源部',
        role: '一般使用者',
        status: 'active',
        lastLogin: '2024-12-10 08:30',
        twoFactor: false
    },
    {
        id: 3,
        name: '張志明',
        email: 'zhang.zhiming@agia.com',
        department: '業務部',
        role: '部門主管',
        status: 'active',
        lastLogin: '2024-12-09 17:20',
        twoFactor: true
    },
    {
        id: 4,
        name: '陳小華',
        email: 'chen.xiaohua@agia.com',
        department: '業務部',
        role: '一般使用者',
        status: 'active',
        lastLogin: '2024-12-10 09:00',
        twoFactor: false
    },
    {
        id: 5,
        name: '李明德',
        email: 'li.mingde@agia.com',
        department: '教育訓練部',
        role: '部門主管',
        status: 'active',
        lastLogin: '2024-12-10 10:15',
        twoFactor: true
    },
    {
        id: 6,
        name: '黃雅琪',
        email: 'huang.yaqi@agia.com',
        department: '教育訓練部',
        role: '一般使用者',
        status: 'active',
        lastLogin: '2024-12-10 08:15',
        twoFactor: false
    },
    {
        id: 7,
        name: '吳建國',
        email: 'wu.jianguo@agia.com',
        department: '商品部',
        role: '部門主管',
        status: 'active',
        lastLogin: '2024-12-09 16:30',
        twoFactor: true
    },
    {
        id: 8,
        name: '周小芬',
        email: 'zhou.xiaofen@agia.com',
        department: '商品部',
        role: '一般使用者',
        status: 'inactive',
        lastLogin: '2024-11-28 14:15',
        twoFactor: false
    },
]

const roleColors = {
    '系統管理員': 'var(--danger-500)',
    '部門主管': 'var(--warning-500)',
    '稽核員': 'var(--primary-500)',
    '文管人員': 'var(--success-500)',
    '一般使用者': 'var(--gray-500)'
}

function UserManagement() {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">使用者管理</h1>
                <p className="page-subtitle">管理系統使用者帳戶與權限</p>
            </div>

            {/* 統計 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                <div className="stat-card">
                    <div className="stat-value">{users.length}</div>
                    <div className="stat-label">總使用者數</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--success-500)' }}>{users.filter(u => u.status === 'active').length}</div>
                    <div className="stat-label">啟用中</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--gray-500)' }}>{users.filter(u => u.status === 'inactive').length}</div>
                    <div className="stat-label">已停用</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--primary-500)' }}>{users.filter(u => u.twoFactor).length}</div>
                    <div className="stat-label">已啟用 2FA</div>
                </div>
            </div>

            {/* 工具列 */}
            <div className="card" style={{ marginBottom: '20px' }}>
                <div className="card-body">
                    <div className="toolbar">
                        <div className="search-box">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="搜尋使用者姓名或 Email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary">
                            <Plus size={18} />
                            新增使用者
                        </button>
                    </div>
                </div>
            </div>

            {/* 使用者列表 */}
            <div className="card">
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>使用者</th>
                                    <th>Email</th>
                                    <th>部門</th>
                                    <th>角色</th>
                                    <th>狀態</th>
                                    <th>最後登入</th>
                                    <th>2FA</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, var(--primary-400), var(--primary-600))',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '14px',
                                                    fontWeight: '600'
                                                }}>
                                                    {user.name.charAt(0)}
                                                </div>
                                                <strong>{user.name}</strong>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gray-600)' }}>
                                                <Mail size={14} />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td>{user.department}</td>
                                        <td>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                padding: '4px 10px',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                background: `${roleColors[user.role]}15`,
                                                color: roleColors[user.role]
                                            }}>
                                                <Shield size={14} />
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${user.status}`}>
                                                {user.status === 'active' ? '啟用' : '停用'}
                                            </span>
                                        </td>
                                        <td style={{ color: 'var(--gray-500)', fontSize: '13px' }}>{user.lastLogin}</td>
                                        <td>
                                            {user.twoFactor ? (
                                                <span style={{ color: 'var(--success-500)', fontWeight: '500' }}>✓ 已啟用</span>
                                            ) : (
                                                <span style={{ color: 'var(--gray-400)' }}>未啟用</span>
                                            )}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <button className="btn-icon" title="編輯">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="btn-icon" title="刪除" style={{ color: 'var(--danger-500)' }}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManagement

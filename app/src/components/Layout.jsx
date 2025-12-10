import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
    LayoutDashboard,
    FileUp,
    FolderOpen,
    Users,
    Settings,
    HelpCircle,
    Bell,
    FileStack,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'

const navSections = [
    {
        title: '文件中心',
        items: [
            { path: '/dms', icon: LayoutDashboard, label: '總覽' },
            { path: '/dms/submission', icon: FileUp, label: '文件審核', badge: '6' },
            { path: '/dms/library', icon: FolderOpen, label: '知識庫', badge: '8' },
        ]
    },
    {
        title: '系統設定',
        items: [
            { path: '/system/users', icon: Users, label: '成員管理', badge: '8' },
            { path: '/system/settings', icon: Settings, label: '偏好設定' },
            { path: '/help', icon: HelpCircle, label: '幫助中心' },
        ]
    }
]

const pageTitles = {
    '/dms': { title: '文件總覽', subtitle: '查看文件狀態與待處理項目' },
    '/dms/submission': { title: '文件審核', subtitle: '管理待審核的文件' },
    '/dms/library': { title: '知識庫', subtitle: '瀏覽與搜尋所有文件' },
    '/system/users': { title: '成員管理', subtitle: '管理系統成員與權限' },
    '/system/settings': { title: '偏好設定', subtitle: '調整系統偏好設定' },
    '/help': { title: '幫助中心', subtitle: '取得協助與使用指南' },
}

function Layout() {
    const location = useLocation()
    const currentPage = pageTitles[location.pathname] || { title: 'Dashboard', subtitle: '' }
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="app-layout">
            {/* 側邊欄 */}
            <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <div className="sidebar-logo-icon">
                            <FileStack size={18} />
                        </div>
                        {!collapsed && (
                            <div>
                                <h1>Agia</h1>
                                <span style={{ fontSize: '11px', color: '#999' }}>文件管理後台</span>
                            </div>
                        )}
                    </div>
                    <button
                        className="sidebar-toggle"
                        onClick={() => setCollapsed(!collapsed)}
                        title={collapsed ? '展開' : '收合'}
                    >
                        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                {/* 搜尋框 */}
                {!collapsed && (
                    <div className="sidebar-search">
                        <input
                            type="text"
                            className="sidebar-search-input"
                            placeholder="搜尋..."
                        />
                    </div>
                )}

                <nav className="sidebar-nav">
                    {navSections.map((section) => (
                        <div key={section.title} className="nav-section">
                            {!collapsed && <div className="nav-section-title">{section.title}</div>}
                            {section.items.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/dms'}
                                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                    title={collapsed ? item.label : ''}
                                >
                                    <div className="nav-item-left">
                                        <item.icon size={18} />
                                        {!collapsed && <span>{item.label}</span>}
                                    </div>
                                    {!collapsed && item.badge && (
                                        <span className="nav-item-badge">{item.badge}</span>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </nav>

            </aside>

            {/* 主內容 */}
            <main className={`main-content ${collapsed ? 'expanded' : ''}`}>
                {/* 頂部導航 */}
                <header className="header">
                    <div className="header-left">
                        <div className="header-title">{currentPage.title}</div>
                        <div className="header-subtitle">{currentPage.subtitle}</div>
                    </div>
                    <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button className="btn-icon" title="通知">
                            <Bell size={18} />
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'var(--gray-800)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: '600',
                                fontSize: '14px'
                            }}>
                                A
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '13px', color: 'var(--gray-800)' }}>Admin</div>
                                <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>admin@agia.com</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 頁面內容 */}
                <Outlet />
            </main>
        </div>
    )
}

export default Layout

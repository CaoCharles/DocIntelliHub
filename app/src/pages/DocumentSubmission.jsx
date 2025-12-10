import {
    Search,
    Plus,
    Eye,
    Edit,
    Send,
    Trash2,
    Check,
    X,
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react'
import { useState } from 'react'

const statusConfig = {
    draft: { label: '草稿', color: 'var(--gray-500)', bg: 'var(--gray-100)' },
    pending: { label: '審核中', color: '#f59e0b', bg: '#fef3c7' },
    approved: { label: '已批准', color: '#10b981', bg: '#d1fae5' },
    rejected: { label: '已拒絕', color: '#ef4444', bg: '#fee2e2' },
}

const initialSubmissions = [
    { id: 'SUB-2024-001', title: '新版品質手冊', category: '品質文件', department: '品質部', submitter: '張小華', version: 'v1.0', status: 'draft', date: '2024-12-09', content: '品質手冊內容...' },
    { id: 'SUB-2024-002', title: '內部稽核程序書', category: '程序文件', department: '稽核室', submitter: '李明德', version: 'v2.1', status: 'pending', date: '2024-12-08', content: '稽核程序內容...' },
    { id: 'SUB-2024-003', title: '緊急應變計畫', category: '作業文件', department: '安全部', submitter: '王建國', version: 'v1.2', status: 'approved', date: '2024-12-07', content: '應變計畫內容...' },
    { id: 'SUB-2024-004', title: '供應商管理辦法', category: '程序文件', department: '採購部', submitter: '陳美玲', version: 'v1.0', status: 'rejected', date: '2024-12-06', content: '管理辦法內容...' },
    { id: 'SUB-2024-005', title: '教育訓練計畫', category: '計畫文件', department: '人資部', submitter: '林志偉', version: 'v1.1', status: 'pending', date: '2024-12-05', content: '訓練計畫內容...' },
    { id: 'SUB-2024-006', title: '客訴處理流程', category: '程序文件', department: '客服部', submitter: '黃雅琪', version: 'v1.0', status: 'draft', date: '2024-12-04', content: '處理流程內容...' },
]

const categoryOptions = ['品質文件', '程序文件', '作業文件', '計畫文件', '表單']
const departmentOptions = ['人力資源部', '商品部', '業務部', '教育訓練部', '品質部', '採購部', '客服部', '安全部', '稽核室']

function DocumentSubmission() {
    const [submissions, setSubmissions] = useState(initialSubmissions)
    const [activeFilter, setActiveFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalMode, setModalMode] = useState('view') // view, edit, create
    const [currentDoc, setCurrentDoc] = useState(null)
    const [formData, setFormData] = useState({ title: '', category: '', department: '', content: '' })

    const filters = [
        { key: 'all', label: '全部', count: submissions.length },
        { key: 'draft', label: '草稿', count: submissions.filter(s => s.status === 'draft').length },
        { key: 'pending', label: '審核中', count: submissions.filter(s => s.status === 'pending').length },
        { key: 'approved', label: '已批准', count: submissions.filter(s => s.status === 'approved').length },
        { key: 'rejected', label: '已拒絕', count: submissions.filter(s => s.status === 'rejected').length },
    ]

    const filteredSubmissions = submissions.filter(sub => {
        const matchesFilter = activeFilter === 'all' || sub.status === activeFilter
        const matchesSearch = sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.id.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const handleView = (doc) => {
        setCurrentDoc(doc)
        setModalMode('view')
        setShowModal(true)
    }

    const handleEdit = (doc) => {
        setCurrentDoc(doc)
        setFormData({ title: doc.title, category: doc.category, department: doc.department, content: doc.content })
        setModalMode('edit')
        setShowModal(true)
    }

    const handleCreate = () => {
        setCurrentDoc(null)
        setFormData({ title: '', category: categoryOptions[0], department: departmentOptions[0], content: '' })
        setModalMode('create')
        setShowModal(true)
    }

    const handleSubmit = (doc) => {
        setSubmissions(subs => subs.map(s =>
            s.id === doc.id ? { ...s, status: 'pending' } : s
        ))
    }

    const handleDelete = (id) => {
        if (confirm('確定要刪除此提交？')) {
            setSubmissions(subs => subs.filter(s => s.id !== id))
        }
    }

    const handleApprove = (id) => {
        setSubmissions(subs => subs.map(s =>
            s.id === id ? { ...s, status: 'approved' } : s
        ))
        setShowModal(false)
    }

    const handleReject = (id) => {
        setSubmissions(subs => subs.map(s =>
            s.id === id ? { ...s, status: 'rejected' } : s
        ))
        setShowModal(false)
    }

    const handleSave = () => {
        if (modalMode === 'create') {
            const newId = `SUB-2024-${String(submissions.length + 1).padStart(3, '0')}`
            const newDoc = {
                id: newId,
                ...formData,
                submitter: 'Admin',
                version: 'v1.0',
                status: 'draft',
                date: new Date().toISOString().split('T')[0]
            }
            setSubmissions([newDoc, ...submissions])
        } else {
            setSubmissions(subs => subs.map(s =>
                s.id === currentDoc.id ? { ...s, ...formData } : s
            ))
        }
        setShowModal(false)
    }

    const closeModal = () => {
        setShowModal(false)
        setCurrentDoc(null)
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <CheckCircle size={14} />
            case 'rejected': return <XCircle size={14} />
            case 'pending': return <Clock size={14} />
            default: return <AlertCircle size={14} />
        }
    }

    return (
        <div className="page-container">
            {/* 搜尋和篩選 */}
            <div className="card" style={{ marginBottom: '20px' }}>
                <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <div className="search-box" style={{ width: '280px' }}>
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="搜尋文檔編號或標題..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {filters.map(f => (
                                <button
                                    key={f.key}
                                    onClick={() => setActiveFilter(f.key)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid',
                                        borderColor: activeFilter === f.key ? 'var(--gray-800)' : 'var(--gray-200)',
                                        background: activeFilter === f.key ? 'var(--gray-800)' : 'white',
                                        color: activeFilter === f.key ? 'white' : 'var(--gray-600)',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={handleCreate}>
                        <Plus size={16} />
                        新增提交
                    </button>
                </div>
            </div>

            {/* 提交列表 */}
            <div className="card">
                <div className="card-body" style={{ padding: 0 }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>提交編號</th>
                                <th>文檔標題</th>
                                <th>分類</th>
                                <th>部門</th>
                                <th>提交者</th>
                                <th>版本</th>
                                <th>狀態</th>
                                <th>提交日期</th>
                                <th style={{ width: '150px' }}>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubmissions.map(sub => (
                                <tr key={sub.id}>
                                    <td style={{ fontWeight: '600', color: 'var(--gray-800)' }}>{sub.id}</td>
                                    <td>{sub.title}</td>
                                    <td>{sub.category}</td>
                                    <td>{sub.department}</td>
                                    <td>{sub.submitter}</td>
                                    <td>{sub.version}</td>
                                    <td>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            background: statusConfig[sub.status].bg,
                                            color: statusConfig[sub.status].color
                                        }}>
                                            {getStatusIcon(sub.status)}
                                            {statusConfig[sub.status].label}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--gray-500)' }}>{sub.date}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn-icon" title="查看" onClick={() => handleView(sub)}>
                                                <Eye size={16} />
                                            </button>
                                            {sub.status === 'draft' && (
                                                <>
                                                    <button className="btn-icon" title="編輯" onClick={() => handleEdit(sub)}>
                                                        <Edit size={16} />
                                                    </button>
                                                    <button className="btn-icon" title="送審" onClick={() => handleSubmit(sub)} style={{ color: '#10b981' }}>
                                                        <Send size={16} />
                                                    </button>
                                                    <button className="btn-icon" title="刪除" onClick={() => handleDelete(sub.id)} style={{ color: '#ef4444' }}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* 分頁 */}
                    <div style={{
                        padding: '16px 20px',
                        borderTop: '1px solid var(--gray-200)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>
                            顯示 1-{filteredSubmissions.length} 筆，共 {filteredSubmissions.length} 筆
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-secondary" disabled>上一頁</button>
                            <button style={{
                                padding: '8px 14px',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--gray-800)',
                                color: 'white',
                                border: 'none',
                                fontSize: '13px',
                                fontWeight: '500'
                            }}>1</button>
                            <button className="btn btn-secondary" disabled>下一頁</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        width: '90%',
                        maxWidth: '600px',
                        maxHeight: '80vh',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            padding: '20px',
                            borderBottom: '1px solid var(--gray-200)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>
                                {modalMode === 'view' ? '查看文檔' : modalMode === 'edit' ? '編輯文檔' : '新增提交'}
                            </h2>
                            <button className="btn-icon" onClick={closeModal}>
                                <X size={18} />
                            </button>
                        </div>

                        <div style={{ padding: '20px', overflow: 'auto', flex: 1 }}>
                            {modalMode === 'view' ? (
                                <div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ fontSize: '12px', color: 'var(--gray-500)', display: 'block', marginBottom: '4px' }}>提交編號</label>
                                        <div style={{ fontWeight: '600' }}>{currentDoc.id}</div>
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ fontSize: '12px', color: 'var(--gray-500)', display: 'block', marginBottom: '4px' }}>文檔標題</label>
                                        <div style={{ fontWeight: '600' }}>{currentDoc.title}</div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                        <div>
                                            <label style={{ fontSize: '12px', color: 'var(--gray-500)', display: 'block', marginBottom: '4px' }}>分類</label>
                                            <div>{currentDoc.category}</div>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', color: 'var(--gray-500)', display: 'block', marginBottom: '4px' }}>部門</label>
                                            <div>{currentDoc.department}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                        <div>
                                            <label style={{ fontSize: '12px', color: 'var(--gray-500)', display: 'block', marginBottom: '4px' }}>提交者</label>
                                            <div>{currentDoc.submitter}</div>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', color: 'var(--gray-500)', display: 'block', marginBottom: '4px' }}>版本</label>
                                            <div>{currentDoc.version}</div>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', color: 'var(--gray-500)', display: 'block', marginBottom: '4px' }}>狀態</label>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '4px 10px',
                                                borderRadius: '999px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                background: statusConfig[currentDoc.status].bg,
                                                color: statusConfig[currentDoc.status].color
                                            }}>
                                                {statusConfig[currentDoc.status].label}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '12px', color: 'var(--gray-500)', display: 'block', marginBottom: '4px' }}>內容</label>
                                        <div style={{ padding: '12px', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', minHeight: '100px' }}>
                                            {currentDoc.content}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--gray-700)', display: 'block', marginBottom: '6px' }}>文檔標題 *</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            style={{
                                                width: '100%',
                                                padding: '10px 14px',
                                                border: '1px solid var(--gray-300)',
                                                borderRadius: 'var(--radius-md)',
                                                fontSize: '14px',
                                                outline: 'none'
                                            }}
                                            placeholder="請輸入文檔標題"
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                        <div>
                                            <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--gray-700)', display: 'block', marginBottom: '6px' }}>分類 *</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 14px',
                                                    border: '1px solid var(--gray-300)',
                                                    borderRadius: 'var(--radius-md)',
                                                    fontSize: '14px',
                                                    outline: 'none',
                                                    background: 'white'
                                                }}
                                            >
                                                {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--gray-700)', display: 'block', marginBottom: '6px' }}>部門 *</label>
                                            <select
                                                value={formData.department}
                                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 14px',
                                                    border: '1px solid var(--gray-300)',
                                                    borderRadius: 'var(--radius-md)',
                                                    fontSize: '14px',
                                                    outline: 'none',
                                                    background: 'white'
                                                }}
                                            >
                                                {departmentOptions.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--gray-700)', display: 'block', marginBottom: '6px' }}>內容</label>
                                        <textarea
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            style={{
                                                width: '100%',
                                                padding: '12px 14px',
                                                border: '1px solid var(--gray-300)',
                                                borderRadius: 'var(--radius-md)',
                                                fontSize: '14px',
                                                outline: 'none',
                                                minHeight: '150px',
                                                resize: 'vertical'
                                            }}
                                            placeholder="請輸入文檔內容..."
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{
                            padding: '16px 20px',
                            borderTop: '1px solid var(--gray-200)',
                            display: 'flex',
                            gap: '12px',
                            justifyContent: 'flex-end'
                        }}>
                            <button className="btn btn-secondary" onClick={closeModal}>
                                {modalMode === 'view' ? '關閉' : '取消'}
                            </button>
                            {modalMode === 'view' && currentDoc.status === 'pending' && (
                                <>
                                    <button
                                        className="btn"
                                        onClick={() => handleReject(currentDoc.id)}
                                        style={{ background: '#fee2e2', color: '#ef4444', border: 'none' }}
                                    >
                                        <XCircle size={16} />
                                        拒絕
                                    </button>
                                    <button
                                        className="btn"
                                        onClick={() => handleApprove(currentDoc.id)}
                                        style={{ background: '#d1fae5', color: '#10b981', border: 'none' }}
                                    >
                                        <CheckCircle size={16} />
                                        批准
                                    </button>
                                </>
                            )}
                            {modalMode !== 'view' && (
                                <button className="btn btn-primary" onClick={handleSave}>
                                    儲存
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DocumentSubmission

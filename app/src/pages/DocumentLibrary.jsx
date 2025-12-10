import {
    Search,
    Folder,
    FileText,
    Download,
    Eye,
    Clock,
    Edit,
    X,
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Link,
    Code,
    Quote,
    Undo,
    Redo,
    Sparkles,
    ChevronDown,
    ChevronRight,
    Hash,
    Tag
} from 'lucide-react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const departments = [
    { id: 'all', name: '全部部門', count: 8 },
    { id: 'hr', name: '人力資源部', count: 2 },
    { id: 'product', name: '商品部', count: 2 },
    { id: 'sales', name: '業務部', count: 2 },
    { id: 'training', name: '教育訓練部', count: 2 },
]

const initialDocuments = [
    {
        id: 'DOC-001',
        title: '勞動基準法重點摘要',
        version: '2.0',
        department: '人力資源部',
        type: 'PDF',
        date: '2024-12-01',
        downloads: 328,
        content: `# 勞動基準法重點摘要

## 一、工作時間
- 每日正常工時不得超過 **8 小時**
- 每週正常工時不得超過 **40 小時**
- 延長工時每月不得超過 **46 小時**

## 二、休假規定
勞工每 7 日應有 2 日之休息，其中 1 日為例假，1 日為休息日

### 特別休假依年資計算：
| 年資 | 特休天數 |
|------|----------|
| 6個月以上1年未滿 | 3日 |
| 1年以上2年未滿 | 7日 |
| 2年以上3年未滿 | 10日 |
| 3年以上5年未滿 | 14日 |
| 5年以上10年未滿 | 15日 |
| 10年以上 | 每年加1日，最多30日 |

## 三、加班費計算
- 前2小時：時薪 × **1.34**
- 第3小時起：時薪 × **1.67**
- 休息日加班：前2小時 × 1.34，後續 × 1.67
- 例假日加班：**加倍發給工資**

> **重要提醒**：雇主不得強制勞工於例假日工作，除非有天災、事變或突發事件。

## 四、資遣規定
1. 預告期間依年資計算
2. 資遣費：每滿1年發給 **0.5個月** 平均工資`
    },
    {
        id: 'DOC-002',
        title: '員工請假辦法',
        version: '1.5',
        department: '人力資源部',
        type: 'PDF',
        date: '2024-11-28',
        downloads: 156,
        content: `# 員工請假辦法

## 一、請假類別與天數

| 假別 | 天數 | 給薪 |
|------|------|------|
| 事假 | 每年14日 | ❌ 不給薪 |
| 病假 | 每年30日 | ⚠️ 半薪 |
| 婚假 | 8日 | ✅ 給薪 |
| 喪假 | 3-8日依親等 | ✅ 給薪 |
| 產假 | 8週 | ✅ 給薪 |
| 陪產假 | 7日 | ✅ 給薪 |

## 二、請假程序
1. 事先填寫請假單
2. 主管核准
3. 人資部門備查

## 三、注意事項
- 病假 **3 日以上**需附診斷證明
- 事假需**提前 3 日**申請

> 緊急狀況可事後補假，但須於 **3 日內** 完成補假程序`
    },
    {
        id: 'DOC-003',
        title: '商品規格標準',
        version: '3.0',
        department: '商品部',
        type: 'DOCX',
        date: '2024-11-25',
        downloads: 89,
        content: `# 商品規格標準

## 一、包裝規範
- 外箱尺寸：依商品類別訂定
- 標籤位置：**右上角**
- 條碼格式：**EAN-13**

## 二、品質標準
| 項目 | 標準 |
|------|------|
| 外觀檢驗合格率 | ≥ 98% |
| 功能測試通過率 | 100% |

## 三、倉儲條件
- 溫度：15-25°C
- 濕度：40-60%`
    },
    {
        id: 'DOC-004',
        title: '商品上架流程',
        version: '2.1',
        department: '商品部',
        type: 'PDF',
        date: '2024-11-20',
        downloads: 67,
        content: `# 商品上架流程

## 一、前置作業
1. 商品資料建檔
2. 照片拍攝與處理
3. 定價審核

## 二、上架步驟
1. 登入後台系統
2. 新增商品資料
3. 設定庫存與價格
4. 預覽確認
5. 發布上線

## 三、檢核項目
- [ ] 商品名稱正確性
- [ ] 價格無誤
- [ ] 庫存數量設定`
    },
    {
        id: 'DOC-005',
        title: '業務開發手冊',
        version: '2.0',
        department: '業務部',
        type: 'PDF',
        date: '2024-11-15',
        downloads: 234,
        content: `# 業務開發手冊

## 一、客戶開發流程

\`\`\`
市場調研 → 名單整理 → 初次接洽 → 需求訪談 → 提案報價 → 合約簽訂
\`\`\`

## 二、報價原則
| 類型 | 報價方式 |
|------|----------|
| 標準產品 | 依公告價格 |
| 客製化服務 | 專案評估 |
| 大量訂購 | 另議優惠 |

## 三、客戶維護
- 每月至少聯繫 **1 次**
- 重要客戶定期拜訪
- 客訴 **24 小時內**回應`
    },
    {
        id: 'DOC-006',
        title: '客戶服務準則',
        version: '1.8',
        department: '業務部',
        type: 'PDF',
        date: '2024-11-10',
        downloads: 145,
        content: `# 客戶服務準則

## 一、服務態度
- 親切有禮 😊
- 耐心傾聽 👂
- 專業回應 💼

## 二、回應時效
| 管道 | 時效 |
|------|------|
| 電話 | 即時接聽 |
| 郵件 | 4小時內回覆 |
| 客訴 | 24小時內處理 |

## 三、問題處理流程
1. 確認問題內容
2. 記錄於系統
3. 分派處理人員
4. 追蹤至結案
5. 客戶滿意度確認`
    },
    {
        id: 'DOC-007',
        title: '新人訓練手冊',
        version: '3.2',
        department: '教育訓練部',
        type: 'DOCX',
        date: '2024-11-05',
        downloads: 412,
        content: `# 新人訓練手冊

## 一、訓練期程
| 週次 | 內容 |
|------|------|
| 第1週 | 公司介紹與環境認識 |
| 第2週 | 部門職能訓練 |
| 第3-4週 | 實務操作 |

## 二、必修課程
1. 公司規章制度
2. 資訊安全基礎
3. 職場倫理
4. 部門專業知識

## 三、考核方式
- 筆試：**60 分**及格
- 實作評估：主管評分
- 試用期結束前完成所有課程

> 💡 **提醒**：未通過考核者可申請一次補考機會`
    },
    {
        id: 'DOC-008',
        title: '內部講師培訓計畫',
        version: '1.5',
        department: '教育訓練部',
        type: 'PDF',
        date: '2024-10-30',
        downloads: 78,
        content: `# 內部講師培訓計畫

## 一、講師資格
- 年資 **2 年**以上
- 專業領域經驗
- 主管推薦

## 二、培訓內容
1. 教學技巧
2. 簡報製作
3. 課程設計
4. 學員互動

## 三、認證與獎勵
| 項目 | 內容 |
|------|------|
| 認證 | 授予講師證書 |
| 津貼 | 每小時 500 元 |
| 表揚 | 優秀講師年度表揚 |`
    },
]

// Markdown 工具列按鈕
const toolbarButtons = [
    { icon: Heading1, label: '標題1', action: (text) => `# ${text || '標題'}` },
    { icon: Heading2, label: '標題2', action: (text) => `## ${text || '標題'}` },
    { icon: Bold, label: '粗體', action: (text) => `**${text || '粗體文字'}**` },
    { icon: Italic, label: '斜體', action: (text) => `*${text || '斜體文字'}*` },
    { icon: List, label: '項目清單', action: () => `- 項目一\n- 項目二\n- 項目三` },
    { icon: ListOrdered, label: '編號清單', action: () => `1. 第一項\n2. 第二項\n3. 第三項` },
    { icon: Quote, label: '引用', action: (text) => `> ${text || '引用內容'}` },
    { icon: Code, label: '程式碼', action: (text) => `\`${text || '程式碼'}\`` },
    { icon: Link, label: '連結', action: (text) => `[${text || '連結文字'}](網址)` },
]

function DocumentLibrary() {
    const [selectedDepartment, setSelectedDepartment] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [documents, setDocuments] = useState(initialDocuments)
    const [viewingDoc, setViewingDoc] = useState(null)
    const [editingDoc, setEditingDoc] = useState(null)
    const [editContent, setEditContent] = useState('')
    const [showPreview, setShowPreview] = useState(true)
    const [history, setHistory] = useState([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [aiPreviewDoc, setAiPreviewDoc] = useState(null)
    const [aiClauses, setAiClauses] = useState([])
    const [expandedClause, setExpandedClause] = useState(null)

    const canUndo = historyIndex > 0
    const canRedo = historyIndex < history.length - 1

    // 模擬 AI 斷詞處理
    const processDocumentWithAI = (doc) => {
        // 模擬將文件內容拆分成條款
        const content = doc.content
        const sections = content.split(/\n## /).filter(s => s.trim())

        const clauses = sections.map((section, idx) => {
            const lines = section.split('\n')
            const title = lines[0].replace(/^#+ /, '').trim()
            const body = lines.slice(1).join('\n').trim()

            // 模擬 AI 判斷的概念和分類
            const concepts = generateConcepts(title, body)
            const category = getCategoryFromDepartment(doc.department)

            return {
                id: `${doc.id}-C${String(idx + 1).padStart(3, '0')}`,
                clause_number: idx + 1,
                title: title || `條款 ${idx + 1}`,
                content: body.substring(0, 200) + (body.length > 200 ? '...' : ''),
                full_content: body,
                metadata: {
                    source_document: doc.id,
                    source_document_title: doc.title,
                    department: doc.department,
                    category: category,
                    version: doc.version,
                    effective_date: doc.date
                },
                ai_analysis: {
                    concepts: concepts,
                    keywords: extractKeywords(body),
                    importance: Math.random() > 0.5 ? 'high' : 'normal',
                    related_clauses: []
                }
            }
        })

        return clauses
    }

    const generateConcepts = (title, body) => {
        const conceptMap = {
            '工作時間': ['勞動法規', '工時管理'],
            '休假': ['休假制度', '特休', '勞工權益'],
            '加班': ['加班費', '薪資計算', '工時管理'],
            '資遣': ['離職管理', '資遣費', '勞動契約'],
            '請假': ['請假制度', '出勤管理'],
            '商品': ['商品管理', '品質控制'],
            '業務': ['業務開發', '客戶關係'],
            '訓練': ['教育訓練', '人才發展'],
        }

        for (const [key, concepts] of Object.entries(conceptMap)) {
            if (title.includes(key) || body.includes(key)) {
                return concepts
            }
        }
        return ['一般規範', '內部流程']
    }

    const extractKeywords = (text) => {
        const keywords = []
        const patterns = ['員工', '主管', '公司', '申請', '核准', '規定', '標準', '流程']
        patterns.forEach(p => {
            if (text.includes(p)) keywords.push(p)
        })
        return keywords.slice(0, 5)
    }

    const getCategoryFromDepartment = (dept) => {
        const map = {
            '人力資源部': '人事管理',
            '商品部': '商品管理',
            '業務部': '營業管理',
            '教育訓練部': '教育訓練'
        }
        return map[dept] || '一般管理'
    }

    const handleAiPreview = (doc) => {
        const clauses = processDocumentWithAI(doc)
        setAiClauses(clauses)
        setAiPreviewDoc(doc)
        setExpandedClause(null)
    }

    const updateClauseMetadata = (clauseId, field, value) => {
        setAiClauses(clauses => clauses.map(c => {
            if (c.id === clauseId) {
                if (field.startsWith('ai_analysis.')) {
                    const subField = field.replace('ai_analysis.', '')
                    return { ...c, ai_analysis: { ...c.ai_analysis, [subField]: value } }
                }
                if (field.startsWith('metadata.')) {
                    const subField = field.replace('metadata.', '')
                    return { ...c, metadata: { ...c.metadata, [subField]: value } }
                }
                return { ...c, [field]: value }
            }
            return c
        }))
    }

    const filteredDocuments = documents.filter(doc => {
        const matchesDept = selectedDepartment === 'all' ||
            departments.find(d => d.id === selectedDepartment)?.name === doc.department
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.id.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesDept && matchesSearch
    })

    const handleView = (doc) => {
        setViewingDoc(doc)
        setEditingDoc(null)
    }

    const handleEdit = (doc) => {
        setEditingDoc(doc)
        setEditContent(doc.content)
        setHistory([doc.content])
        setHistoryIndex(0)
        setViewingDoc(null)
    }

    const updateContent = (newContent) => {
        setEditContent(newContent)
        // Add to history (debounced would be better but keeping simple)
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(newContent)
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
    }

    const handleUndo = () => {
        if (canUndo) {
            const newIndex = historyIndex - 1
            setHistoryIndex(newIndex)
            setEditContent(history[newIndex])
        }
    }

    const handleRedo = () => {
        if (canRedo) {
            const newIndex = historyIndex + 1
            setHistoryIndex(newIndex)
            setEditContent(history[newIndex])
        }
    }

    const handleSave = () => {
        setDocuments(docs => docs.map(d =>
            d.id === editingDoc.id
                ? { ...d, content: editContent, date: new Date().toISOString().split('T')[0] }
                : d
        ))
        setEditingDoc(null)
    }

    const closeModal = () => {
        setViewingDoc(null)
        setEditingDoc(null)
    }

    const insertMarkdown = (action) => {
        const textarea = document.getElementById('markdown-editor')
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const selectedText = editContent.substring(start, end)
        const newText = action(selectedText)

        const before = editContent.substring(0, start)
        const after = editContent.substring(end)
        setEditContent(before + newText + after)
    }

    return (
        <div className="page-container">
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '20px' }}>
                {/* 側邊分類 */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">部門分類</h3>
                    </div>
                    <div className="card-body" style={{ padding: '8px' }}>
                        {departments.map(dept => (
                            <div
                                key={dept.id}
                                onClick={() => setSelectedDepartment(dept.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 14px',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    background: selectedDepartment === dept.id ? 'var(--gray-800)' : 'transparent',
                                    color: selectedDepartment === dept.id ? 'white' : 'var(--gray-700)',
                                    marginBottom: '4px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Folder size={18} />
                                    <span>{dept.name}</span>
                                </div>
                                <span style={{
                                    background: selectedDepartment === dept.id ? 'rgba(255,255,255,0.2)' : 'var(--gray-100)',
                                    padding: '2px 8px',
                                    borderRadius: '999px',
                                    fontSize: '12px',
                                    fontWeight: '500'
                                }}>
                                    {dept.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 文檔列表 */}
                <div>
                    {/* 搜尋欄 */}
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <div className="card-body">
                            <div className="search-box" style={{ maxWidth: '100%' }}>
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="搜尋文件標題或編號..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 文檔網格 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                        {filteredDocuments.map(doc => (
                            <div key={doc.id} className="card">
                                <div className="card-body">
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: 'var(--radius-md)',
                                            background: 'var(--gray-100)',
                                            color: 'var(--gray-600)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <FileText size={24} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--gray-800)', marginBottom: '4px' }}>
                                                {doc.title}
                                            </h4>
                                            <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '8px' }}>
                                                {doc.id} • v{doc.version} • {doc.type}
                                            </p>
                                            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--gray-500)' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Clock size={14} />
                                                    {doc.date}
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Download size={14} />
                                                    {doc.downloads} 次
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                className="btn-icon"
                                                title="查看"
                                                onClick={() => handleView(doc)}
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                className="btn-icon"
                                                title="編輯"
                                                onClick={() => handleEdit(doc)}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="btn-icon"
                                                title="AI 處理預覽"
                                                onClick={() => handleAiPreview(doc)}
                                                style={{ color: 'var(--gray-600)' }}
                                            >
                                                <Sparkles size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 查看文件 Modal */}
            {viewingDoc && (
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
                        maxWidth: '800px',
                        maxHeight: '85vh',
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
                            <div>
                                <h2 style={{ fontSize: '18px', fontWeight: '600' }}>{viewingDoc.title}</h2>
                                <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginTop: '4px' }}>
                                    {viewingDoc.id} • v{viewingDoc.version} • {viewingDoc.department}
                                </p>
                            </div>
                            <button className="btn-icon" onClick={closeModal}>
                                <X size={18} />
                            </button>
                        </div>
                        <div style={{ padding: '24px', overflow: 'auto', flex: 1 }} className="markdown-content">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{viewingDoc.content}</ReactMarkdown>
                        </div>
                        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gray-200)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button className="btn btn-secondary" onClick={closeModal}>關閉</button>
                            <button className="btn btn-primary" onClick={() => handleEdit(viewingDoc)}>
                                <Edit size={16} />
                                編輯
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 編輯文件 Modal */}
            {editingDoc && (
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
                        width: '95%',
                        maxWidth: '1200px',
                        maxHeight: '90vh',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            padding: '16px 20px',
                            borderBottom: '1px solid var(--gray-200)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h2 style={{ fontSize: '18px', fontWeight: '600' }}>編輯文件</h2>
                                <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginTop: '4px' }}>
                                    {editingDoc.title}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--gray-600)' }}>
                                    <input
                                        type="checkbox"
                                        checked={showPreview}
                                        onChange={(e) => setShowPreview(e.target.checked)}
                                        style={{ width: '16px', height: '16px' }}
                                    />
                                    顯示預覽
                                </label>
                                <button className="btn-icon" onClick={closeModal}>
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* 工具列 */}
                        <div style={{
                            padding: '8px 20px',
                            borderBottom: '1px solid var(--gray-200)',
                            display: 'flex',
                            gap: '4px',
                            flexWrap: 'wrap',
                            alignItems: 'center'
                        }}>
                            <button
                                className="btn-icon"
                                title="上一步 (Ctrl+Z)"
                                onClick={handleUndo}
                                disabled={!canUndo}
                                style={{ padding: '8px', opacity: canUndo ? 1 : 0.4 }}
                            >
                                <Undo size={16} />
                            </button>
                            <button
                                className="btn-icon"
                                title="下一步 (Ctrl+Y)"
                                onClick={handleRedo}
                                disabled={!canRedo}
                                style={{ padding: '8px', opacity: canRedo ? 1 : 0.4 }}
                            >
                                <Redo size={16} />
                            </button>
                            <div style={{ width: '1px', height: '20px', background: 'var(--gray-200)', margin: '0 8px' }} />
                            {toolbarButtons.map((btn, idx) => (
                                <button
                                    key={idx}
                                    className="btn-icon"
                                    title={btn.label}
                                    onClick={() => insertMarkdown(btn.action)}
                                    style={{ padding: '8px' }}
                                >
                                    <btn.icon size={16} />
                                </button>
                            ))}
                            <span style={{
                                marginLeft: 'auto',
                                fontSize: '12px',
                                color: 'var(--gray-400)',
                                alignSelf: 'center'
                            }}>
                                支援 Markdown 語法
                            </span>
                        </div>

                        {/* 編輯器 + 預覽 */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr',
                            flex: 1,
                            overflow: 'hidden'
                        }}>
                            {/* 編輯區 */}
                            <div style={{ borderRight: showPreview ? '1px solid var(--gray-200)' : 'none', overflow: 'auto' }}>
                                <textarea
                                    id="markdown-editor"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    onBlur={(e) => {
                                        // Save to history when user leaves the field
                                        if (e.target.value !== history[historyIndex]) {
                                            const newHistory = history.slice(0, historyIndex + 1)
                                            newHistory.push(e.target.value)
                                            setHistory(newHistory)
                                            setHistoryIndex(newHistory.length - 1)
                                        }
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        minHeight: '400px',
                                        padding: '20px',
                                        border: 'none',
                                        fontSize: '14px',
                                        lineHeight: '1.8',
                                        fontFamily: 'monospace',
                                        resize: 'none',
                                        outline: 'none',
                                        background: 'var(--gray-50)'
                                    }}
                                    placeholder="使用 Markdown 語法編輯文件..."
                                />
                            </div>

                            {/* 預覽區 */}
                            {showPreview && (
                                <div style={{ overflow: 'auto', padding: '20px' }} className="markdown-content">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{editContent}</ReactMarkdown>
                                </div>
                            )}
                        </div>

                        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gray-200)', display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
                            <button className="btn btn-secondary" onClick={() => handleView(editingDoc)}>
                                ← 返回查看
                            </button>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn btn-secondary" onClick={closeModal}>取消</button>
                                <button className="btn btn-primary" onClick={handleSave}>儲存變更</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* AI 處理預覽 Modal */}
            {aiPreviewDoc && (
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
                        width: '95%',
                        maxWidth: '1100px',
                        maxHeight: '90vh',
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--gray-800)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '18px', fontWeight: '600' }}>AI 處理預覽</h2>
                                    <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginTop: '2px' }}>
                                        {aiPreviewDoc.title} - 共 {aiClauses.length} 個條款
                                    </p>
                                </div>
                            </div>
                            <button className="btn-icon" onClick={() => setAiPreviewDoc(null)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
                            {/* 左側：條款列表 */}
                            <div style={{ borderRight: '1px solid var(--gray-200)', overflow: 'auto', padding: '16px' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--gray-700)' }}>
                                    📋 擷取的條款
                                </h3>
                                {aiClauses.map((clause, idx) => (
                                    <div
                                        key={clause.id}
                                        style={{
                                            border: '1px solid',
                                            borderColor: expandedClause === clause.id ? 'var(--gray-800)' : 'var(--gray-200)',
                                            borderRadius: 'var(--radius-md)',
                                            marginBottom: '8px',
                                            overflow: 'hidden',
                                            background: expandedClause === clause.id ? 'var(--gray-50)' : 'white'
                                        }}
                                    >
                                        <div
                                            onClick={() => setExpandedClause(expandedClause === clause.id ? null : clause.id)}
                                            style={{
                                                padding: '12px 14px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}
                                        >
                                            {expandedClause === clause.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: '600', fontSize: '13px' }}>
                                                    {clause.clause_number}. {clause.title}
                                                </div>
                                                <div style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '2px' }}>
                                                    {clause.content.substring(0, 60)}...
                                                </div>
                                            </div>
                                            <span style={{
                                                padding: '2px 8px',
                                                borderRadius: '999px',
                                                fontSize: '11px',
                                                background: clause.ai_analysis.importance === 'high' ? '#fef3c7' : 'var(--gray-100)',
                                                color: clause.ai_analysis.importance === 'high' ? '#d97706' : 'var(--gray-600)'
                                            }}>
                                                {clause.ai_analysis.importance === 'high' ? '重要' : '一般'}
                                            </span>
                                        </div>

                                        {expandedClause === clause.id && (
                                            <div style={{ padding: '0 14px 14px 40px' }}>
                                                <div style={{ marginBottom: '12px' }}>
                                                    <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '4px' }}>AI 判斷概念</div>
                                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                        {clause.ai_analysis.concepts.map((c, i) => (
                                                            <span key={i} style={{
                                                                padding: '4px 10px',
                                                                borderRadius: '999px',
                                                                fontSize: '12px',
                                                                background: 'var(--gray-100)',
                                                                color: 'var(--gray-700)'
                                                            }}>
                                                                <Tag size={12} style={{ display: 'inline', marginRight: '4px' }} />
                                                                {c}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '4px' }}>關鍵字</div>
                                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                        {clause.ai_analysis.keywords.map((k, i) => (
                                                            <span key={i} style={{
                                                                padding: '3px 8px',
                                                                borderRadius: '4px',
                                                                fontSize: '11px',
                                                                background: 'var(--gray-100)',
                                                                color: 'var(--gray-600)'
                                                            }}>
                                                                #{k}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* 右側：JSON 預覽與編輯 */}
                            <div style={{ overflow: 'auto', padding: '16px', background: 'var(--gray-50)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-700)' }}>
                                        📄 JSON 輸出格式
                                    </h3>
                                    <button
                                        className="btn btn-secondary"
                                        style={{ fontSize: '12px', padding: '6px 12px' }}
                                        onClick={() => {
                                            navigator.clipboard.writeText(JSON.stringify(aiClauses, null, 2))
                                            alert('已複製到剪貼簿！')
                                        }}
                                    >
                                        複製 JSON
                                    </button>
                                </div>

                                <pre style={{
                                    background: 'var(--gray-800)',
                                    color: '#e2e8f0',
                                    padding: '16px',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '11px',
                                    lineHeight: '1.5',
                                    overflow: 'auto',
                                    maxHeight: '500px'
                                }}>
                                    {JSON.stringify(
                                        expandedClause
                                            ? aiClauses.find(c => c.id === expandedClause)
                                            : aiClauses,
                                        null,
                                        2
                                    )}
                                </pre>
                            </div>
                        </div>

                        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gray-200)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button className="btn btn-secondary" onClick={() => setAiPreviewDoc(null)}>關閉</button>
                            <button
                                className="btn btn-primary"
                                style={{ background: 'var(--gray-800)' }}
                                onClick={() => {
                                    console.log('Export AI processed data:', aiClauses)
                                    alert('已匯出 ' + aiClauses.length + ' 個條款到知識圖譜！')
                                    setAiPreviewDoc(null)
                                }}
                            >
                                <Sparkles size={16} />
                                匯出到知識圖譜
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DocumentLibrary

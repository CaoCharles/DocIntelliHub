import {
    FileUp,
    Users,
    ClipboardCheck,
    Mail,
    Phone,
    Book,
    ExternalLink,
    ChevronRight
} from 'lucide-react'

const quickGuides = [
    {
        icon: FileUp,
        title: '上傳文檔',
        description: '了解如何提交新文檔並進行版本管理'
    },
    {
        icon: Users,
        title: '管理使用者',
        description: '學習如何新增、編輯和管理系統使用者'
    },
    {
        icon: ClipboardCheck,
        title: '稽核報告',
        description: '建立稽核計劃、記錄發現項和產出報告'
    },
]

const faqs = [
    {
        question: '如何重設密碼？',
        answer: '點擊登入頁面的「忘記密碼」，輸入您的 Email 後即可收到重設連結。'
    },
    {
        question: '文檔送審後可以修改嗎？',
        answer: '文檔送審後將無法直接修改，需由審核者退回後才能進行編輯。'
    },
    {
        question: '如何查看文檔的歷史版本？',
        answer: '在文檔庫中點擊文檔，選擇「版本歷史」即可查看所有歷史版本。'
    },
    {
        question: 'CCAR 逾期會有什麼影響？',
        answer: '系統會發送提醒通知，並在儀表板上顯示警示。持續逾期將影響合規評分。'
    },
]

function HelpSupport() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">幫助與支援</h1>
                <p className="page-subtitle">取得協助和查閱使用文件</p>
            </div>

            {/* 快速入門 */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--gray-800)' }}>
                    快速入門指南
                </h2>
                <div className="help-grid">
                    {quickGuides.map((guide, index) => (
                        <div key={index} className="help-card">
                            <div className="help-card-icon">
                                <guide.icon size={28} />
                            </div>
                            <h3 className="help-card-title">{guide.title}</h3>
                            <p className="help-card-desc">{guide.description}</p>
                            <button className="btn btn-secondary btn-sm" style={{ marginTop: '16px' }}>
                                開始學習
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* 常見問題 */}
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">常見問題 FAQ</h2>
                    </div>
                    <div className="card-body">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: '16px 0',
                                    borderBottom: index < faqs.length - 1 ? '1px solid var(--gray-100)' : 'none'
                                }}
                            >
                                <h4 style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: 'var(--gray-800)',
                                    marginBottom: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <span style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: 'var(--primary-100)',
                                        color: 'var(--primary-600)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '11px',
                                        fontWeight: '700'
                                    }}>Q</span>
                                    {faq.question}
                                </h4>
                                <p style={{
                                    fontSize: '13px',
                                    color: 'var(--gray-600)',
                                    paddingLeft: '28px',
                                    lineHeight: '1.6'
                                }}>
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 聯繫支援 */}
                <div>
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <div className="card-header">
                            <h2 className="card-title">聯繫支援</h2>
                        </div>
                        <div className="card-body">
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '16px',
                                background: 'var(--gray-50)',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '12px'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--primary-100)',
                                    color: 'var(--primary-600)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', color: 'var(--gray-800)', marginBottom: '4px' }}>
                                        Email 支援
                                    </div>
                                    <a href="mailto:support@askara.com" style={{ color: 'var(--primary-600)', textDecoration: 'none' }}>
                                        support@askara.com
                                    </a>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '16px',
                                background: 'var(--gray-50)',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '12px'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--success-50)',
                                    color: 'var(--success-600)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', color: 'var(--gray-800)', marginBottom: '4px' }}>
                                        電話支援
                                    </div>
                                    <span style={{ color: 'var(--gray-600)' }}>
                                        (02) 2345-6789 (週一至週五 09:00-18:00)
                                    </span>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '16px',
                                background: 'var(--gray-50)',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--warning-50)',
                                    color: 'var(--warning-600)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Book size={24} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', color: 'var(--gray-800)', marginBottom: '4px' }}>
                                        QMS 團隊
                                    </div>
                                    <a href="mailto:qms@askara.com" style={{ color: 'var(--primary-600)', textDecoration: 'none' }}>
                                        qms@askara.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 文件下載 */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">ISO 平台指南</h2>
                        </div>
                        <div className="card-body">
                            <p style={{ color: 'var(--gray-600)', marginBottom: '16px', lineHeight: '1.6' }}>
                                下載完整的系統使用手冊和 ISO 合規指南，幫助您更有效地使用本平台。
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn btn-primary">
                                    <Book size={18} />
                                    使用者手冊
                                </button>
                                <button className="btn btn-secondary">
                                    <ExternalLink size={18} />
                                    ISO 標準文件
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 系統資訊 */}
            <div className="card" style={{ marginTop: '24px' }}>
                <div className="card-body">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: 'var(--gray-500)',
                        fontSize: '13px'
                    }}>
                        <div>DocIntelliHub v1.0.0</div>
                        <div>© 2024 Askara Group. All rights reserved.</div>
                        <div>最後更新：2024-12-10</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HelpSupport

import {
    Save,
    FileText,
    Shield,
    Bell,
    Link,
    Clock
} from 'lucide-react'
import { useState } from 'react'

function Settings() {
    const [settings, setSettings] = useState({
        docNumberFormat: 'DOC-{YEAR}-{SEQ}',
        maxFileSize: 10,
        retainVersions: 5,
        auditNumberFormat: 'AUD-{YEAR}-{SEQ}',
        ccarDefaultDays: 30,
        reminderDays: [3, 7, 14],
        auditRetentionYears: 7,
        passwordMinLength: 8,
        passwordExpireDays: 90,
        loginFailLock: 5,
        twoFactorEnabled: true,
        sessionTimeout: 30,
        emailEnabled: true,
        smtpServer: 'smtp.askara.com',
        apiEnabled: true
    })

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">系統設定</h1>
                <p className="page-subtitle">設定系統參數與偏好設定</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px' }}>
                {/* 設定導航 */}
                <div className="card">
                    <div className="card-body" style={{ padding: '8px' }}>
                        {[
                            { icon: FileText, label: '文檔設定', active: true },
                            { icon: Clock, label: '稽核設定' },
                            { icon: Shield, label: '安全設定' },
                            { icon: Bell, label: '通知設定' },
                            { icon: Link, label: 'API 整合' },
                        ].map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '12px 14px',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    background: item.active ? 'var(--primary-50)' : 'transparent',
                                    color: item.active ? 'var(--primary-700)' : 'var(--gray-700)',
                                    marginBottom: '4px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 設定內容 */}
                <div>
                    {/* 文檔設定 */}
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <div className="card-header">
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <FileText size={20} />
                                文檔設定
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="settings-item">
                                <div>
                                    <div className="settings-label">文檔編號格式</div>
                                    <div className="settings-desc">定義文檔自動編號規則</div>
                                </div>
                                <input
                                    type="text"
                                    className="input"
                                    style={{ width: '200px' }}
                                    value={settings.docNumberFormat}
                                    onChange={(e) => setSettings({ ...settings, docNumberFormat: e.target.value })}
                                />
                            </div>
                            <div className="settings-item">
                                <div>
                                    <div className="settings-label">檔案大小限制</div>
                                    <div className="settings-desc">單一檔案最大上傳大小 (MB)</div>
                                </div>
                                <select className="select" value={settings.maxFileSize} onChange={(e) => setSettings({ ...settings, maxFileSize: e.target.value })}>
                                    <option value="5">5 MB</option>
                                    <option value="10">10 MB</option>
                                    <option value="25">25 MB</option>
                                    <option value="50">50 MB</option>
                                </select>
                            </div>
                            <div className="settings-item">
                                <div>
                                    <div className="settings-label">版本保留數量</div>
                                    <div className="settings-desc">每份文檔保留的歷史版本數</div>
                                </div>
                                <select className="select" value={settings.retainVersions} onChange={(e) => setSettings({ ...settings, retainVersions: e.target.value })}>
                                    <option value="3">3 個版本</option>
                                    <option value="5">5 個版本</option>
                                    <option value="10">10 個版本</option>
                                    <option value="0">無限制</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 安全設定 */}
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <div className="card-header">
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Shield size={20} />
                                安全設定
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="settings-item">
                                <div>
                                    <div className="settings-label">雙因素認證 (2FA)</div>
                                    <div className="settings-desc">要求使用者啟用雙因素認證</div>
                                </div>
                                <div
                                    className={`toggle ${settings.twoFactorEnabled ? 'active' : ''}`}
                                    onClick={() => toggleSetting('twoFactorEnabled')}
                                />
                            </div>
                            <div className="settings-item">
                                <div>
                                    <div className="settings-label">密碼最小長度</div>
                                    <div className="settings-desc">使用者密碼的最小字元數</div>
                                </div>
                                <select className="select" value={settings.passwordMinLength} onChange={(e) => setSettings({ ...settings, passwordMinLength: e.target.value })}>
                                    <option value="6">6 字元</option>
                                    <option value="8">8 字元</option>
                                    <option value="10">10 字元</option>
                                    <option value="12">12 字元</option>
                                </select>
                            </div>
                            <div className="settings-item">
                                <div>
                                    <div className="settings-label">密碼有效期限</div>
                                    <div className="settings-desc">密碼過期天數，到期需重設</div>
                                </div>
                                <select className="select" value={settings.passwordExpireDays} onChange={(e) => setSettings({ ...settings, passwordExpireDays: e.target.value })}>
                                    <option value="30">30 天</option>
                                    <option value="60">60 天</option>
                                    <option value="90">90 天</option>
                                    <option value="180">180 天</option>
                                </select>
                            </div>
                            <div className="settings-item">
                                <div>
                                    <div className="settings-label">登入失敗鎖定</div>
                                    <div className="settings-desc">連續登入失敗次數後鎖定帳戶</div>
                                </div>
                                <select className="select" value={settings.loginFailLock} onChange={(e) => setSettings({ ...settings, loginFailLock: e.target.value })}>
                                    <option value="3">3 次</option>
                                    <option value="5">5 次</option>
                                    <option value="10">10 次</option>
                                </select>
                            </div>
                            <div className="settings-item">
                                <div>
                                    <div className="settings-label">會話超時時間</div>
                                    <div className="settings-desc">閒置多久後自動登出 (分鐘)</div>
                                </div>
                                <select className="select" value={settings.sessionTimeout} onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}>
                                    <option value="15">15 分鐘</option>
                                    <option value="30">30 分鐘</option>
                                    <option value="60">60 分鐘</option>
                                    <option value="120">120 分鐘</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 通知設定 */}
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <div className="card-header">
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Bell size={20} />
                                通知設定
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="settings-item">
                                <div>
                                    <div className="settings-label">Email 通知</div>
                                    <div className="settings-desc">啟用系統 Email 通知功能</div>
                                </div>
                                <div
                                    className={`toggle ${settings.emailEnabled ? 'active' : ''}`}
                                    onClick={() => toggleSetting('emailEnabled')}
                                />
                            </div>
                            <div className="settings-item">
                                <div>
                                    <div className="settings-label">SMTP 伺服器</div>
                                    <div className="settings-desc">郵件伺服器位址</div>
                                </div>
                                <input
                                    type="text"
                                    className="input"
                                    style={{ width: '200px' }}
                                    value={settings.smtpServer}
                                    onChange={(e) => setSettings({ ...settings, smtpServer: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* API 整合 */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Link size={20} />
                                API 整合
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="settings-item">
                                <div>
                                    <div className="settings-label">啟用 API</div>
                                    <div className="settings-desc">允許外部系統透過 API 存取</div>
                                </div>
                                <div
                                    className={`toggle ${settings.apiEnabled ? 'active' : ''}`}
                                    onClick={() => toggleSetting('apiEnabled')}
                                />
                            </div>
                            <div className="settings-item">
                                <div>
                                    <div className="settings-label">API 金鑰</div>
                                    <div className="settings-desc">用於 API 認證的金鑰</div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="text"
                                        className="input"
                                        style={{ width: '280px', fontFamily: 'monospace' }}
                                        value="sk_live_Askara2024xxxxxxxxxxx"
                                        readOnly
                                    />
                                    <button className="btn btn-secondary btn-sm">重新產生</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 儲存按鈕 */}
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button className="btn btn-secondary">取消變更</button>
                        <button className="btn btn-primary">
                            <Save size={18} />
                            儲存設定
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings

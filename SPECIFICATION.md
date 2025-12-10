# 文檔智能管理系統 (Document Management System)
## 完整規格說明書

---

## 1. 專案概述

### 1.1 專案名稱
**DocIntelliHub** - 文檔智能管理與稽核系統

### 1.2 專案目的
建立一個企業級的文檔管理與稽核追蹤平台，用於：
- 管理文檔的提交、審核、批准和存儲流程
- 執行和追蹤內部/外部稽核活動
- 管理矯正與預防措施 (CCAR)
- 提供完整的系統活動追蹤記錄

### 1.3 目標使用者
- 文檔管理員
- 稽核人員
- 部門主管
- 系統管理員
- 一般員工

---

## 2. 系統架構

### 2.1 技術選型 (建議)
| 層級 | 技術 |
|------|------|
| 前端框架 | React / Next.js |
| UI 組件 | 自定義 CSS / Tailwind CSS |
| 狀態管理 | React Context / Redux |
| 後端 API | Node.js / Python FastAPI |
| 資料庫 | PostgreSQL / MongoDB |
| 認證 | JWT / OAuth 2.0 |

### 2.2 整體架構圖
```
┌─────────────────────────────────────────────────────────────┐
│                        前端應用層                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │   DMS   │  │  Audit  │  │ System  │  │  Help   │        │
│  │ Module  │  │ Module  │  │ Module  │  │ Module  │        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        API 閘道層                            │
│         認證 / 授權 / 路由 / 日誌記錄 / 限流                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        後端服務層                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ 文檔服務      │  │ 稽核服務      │  │ 使用者服務    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        資料存儲層                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   資料庫      │  │  檔案存儲     │  │   快取       │      │
│  │ PostgreSQL   │  │  S3/MinIO    │  │   Redis      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 功能模組詳細規格

### 3.1 導航結構

```
📁 DMS (文檔管理系統)
├── 📊 DMS Dashboard (儀表板)
├── 📤 Document Submission (文檔提交)
└── 📚 Document Library (文檔庫)

📁 Audit (稽核管理)
├── 📊 Audit Dashboard (稽核儀表板)
├── 📋 Audit Management (稽核管理)
├── 🔄 CCAR Tracking (CCAR 追蹤)
└── 📝 Audit Trail (稽核軌跡)

📁 System (系統管理)
├── 👥 User Management (使用者管理)
├── ⚙️ Settings (系統設定)
└── ❓ Help & Support (幫助與支援)
```

---

## 4. 頁面詳細規格

### 4.1 DMS Dashboard (文檔管理儀表板)

#### 功能描述
提供文檔管理系統的整體概覽，顯示關鍵統計數據和近期活動。

#### 頁面元素

| 元素名稱 | 類型 | 說明 |
|----------|------|------|
| 總文檔數 | 統計卡片 | 顯示系統中的文檔總數 |
| 待處理文檔 | 統計卡片 | 顯示等待審核/批准的文檔數量 |
| 批准率 | 統計卡片 | 顯示文檔批准通過的百分比 |
| 文檔狀態分布 | 圖表 | 按狀態（草稿、審核中、已批准、已拒絕）分類的圓餅圖或長條圖 |
| 近期活動 | 列表 | 顯示最近的文檔操作記錄 |
| 快速操作按鈕 | 按鈕組 | 新增文檔、查看待辦事項等 |

#### 資料模型
```typescript
interface DashboardStats {
  totalDocuments: number;
  pendingDocuments: number;
  approvalRate: number;
  documentsThisMonth: number;
  statusDistribution: {
    draft: number;
    inReview: number;
    approved: number;
    rejected: number;
  };
}

interface RecentActivity {
  id: string;
  action: 'created' | 'updated' | 'approved' | 'rejected' | 'submitted';
  documentTitle: string;
  user: string;
  timestamp: Date;
}
```

---

### 4.2 Document Submission (文檔提交)

#### 功能描述
管理文檔的完整提交、審核和批准工作流程。

#### 頁面元素

| 元素名稱 | 類型 | 說明 |
|----------|------|------|
| 提交列表 | 表格 | 顯示所有提交項目及其狀態 |
| 搜尋/篩選 | 輸入框 + 下拉選單 | 按狀態、日期、部門篩選 |
| 新增提交按鈕 | 按鈕 | 開啟新增提交表單 |
| 狀態標籤 | 標籤 | Draft / In Review / Approved / Rejected |
| 操作按鈕 | 按鈕組 | 編輯、刪除、提交審核、查看詳情 |

#### 提交狀態流程
```
[草稿] → [提交審核] → [審核中] → [批准] 或 [拒絕]
   ↑                      │
   └──────────────────────┘
        (退回修改)
```

#### 資料模型
```typescript
interface DocumentSubmission {
  id: string;
  documentNumber: string;
  title: string;
  description: string;
  category: string;
  department: string;
  version: string;
  status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected';
  submittedBy: User;
  submittedAt: Date;
  reviewedBy?: User;
  reviewedAt?: Date;
  comments?: string;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

### 4.3 Document Library (文檔庫)

#### 功能描述
已批准和受控文檔的集中存儲和管理庫。

#### 頁面元素

| 元素名稱 | 類型 | 說明 |
|----------|------|------|
| 部門分類側欄 | 樹狀選單 | 按部門/類別組織文檔 |
| 文檔列表 | 表格/卡片 | 顯示文檔標題、版本、更新日期 |
| 搜尋框 | 輸入框 | 全文檢索文檔 |
| 下載按鈕 | 按鈕 | 下載文檔檔案 |
| 版本歷史 | 彈窗 | 查看文檔的歷史版本 |

#### 資料模型
```typescript
interface Document {
  id: string;
  documentNumber: string;
  title: string;
  description: string;
  category: string;
  department: string;
  currentVersion: string;
  effectiveDate: Date;
  expirationDate?: Date;
  owner: User;
  status: 'active' | 'obsolete' | 'archived';
  fileUrl: string;
  fileType: string;
  fileSize: number;
  versions: DocumentVersion[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface DocumentVersion {
  version: string;
  fileUrl: string;
  changedBy: User;
  changeDescription: string;
  effectiveDate: Date;
  createdAt: Date;
}
```

---

### 4.4 Audit Dashboard (稽核儀表板)

#### 功能描述
提供稽核活動的整體概覽和關鍵績效指標。

#### 頁面元素

| 元素名稱 | 類型 | 說明 |
|----------|------|------|
| 活躍稽核數 | 統計卡片 | 當前進行中的稽核數量 |
| 發現項總數 | 統計卡片 | 所有稽核發現項的數量 |
| 合規率 | 統計卡片 | 整體合規百分比 |
| CCAR 狀態 | 統計卡片 | 開放中的矯正措施數量 |
| 稽核時程表 | 日曆/甘特圖 | 顯示即將進行的稽核排程 |
| 發現項趨勢 | 折線圖 | 按月份顯示發現項數量趨勢 |

#### 資料模型
```typescript
interface AuditDashboardStats {
  activeAudits: number;
  totalFindings: number;
  complianceRate: number;
  openCCARs: number;
  upcomingAudits: AuditSchedule[];
  findingsTrend: {
    month: string;
    count: number;
  }[];
  findingsBySeverity: {
    critical: number;
    major: number;
    minor: number;
    observation: number;
  };
}
```

---

### 4.5 Audit Management (稽核管理)

#### 功能描述
管理稽核計劃、執行、檢查表和報告生成。

#### 頁面元素

| 元素名稱 | 類型 | 說明 |
|----------|------|------|
| 稽核列表 | 表格 | 所有稽核項目及其狀態 |
| 新增稽核按鈕 | 按鈕 | 建立新稽核計劃 |
| 稽核排程 | 日曆視圖 | 按日期顯示稽核安排 |
| 檢查表管理 | 子頁面 | 創建和管理稽核檢查表 |
| 報告生成 | 按鈕 | 生成稽核報告 (PDF/Excel) |

#### 稽核狀態流程
```
[計劃中] → [準備中] → [執行中] → [報告撰寫] → [已完成]
                         │
                         ▼
                   [發現項記錄]
                         │
                         ▼
                   [CCAR 開立]
```

#### 資料模型
```typescript
interface Audit {
  id: string;
  auditNumber: string;
  title: string;
  auditType: 'internal' | 'external' | 'supplier' | 'customer';
  scope: string;
  standard: string; // e.g., "ISO 9001:2015"
  department: string;
  status: 'planned' | 'in_preparation' | 'in_progress' | 'reporting' | 'completed' | 'cancelled';
  scheduledStartDate: Date;
  scheduledEndDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  leadAuditor: User;
  auditTeam: User[];
  auditees: User[];
  checklist: AuditChecklist;
  findings: AuditFinding[];
  createdAt: Date;
  updatedAt: Date;
}

interface AuditFinding {
  id: string;
  auditId: string;
  findingNumber: string;
  type: 'nonconformity' | 'observation' | 'opportunity';
  severity: 'critical' | 'major' | 'minor';
  clause: string; // e.g., "7.5.1"
  description: string;
  objectiveEvidence: string;
  status: 'open' | 'ccar_issued' | 'verified' | 'closed';
  ccarId?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuditChecklist {
  id: string;
  name: string;
  standard: string;
  items: ChecklistItem[];
}

interface ChecklistItem {
  id: string;
  clause: string;
  requirement: string;
  question: string;
  result: 'conforming' | 'nonconforming' | 'na' | 'pending';
  evidence: string;
  notes: string;
}
```

---

### 4.6 CCAR Tracking (CCAR 追蹤)

#### 功能描述
追蹤和管理矯正與預防措施請求 (Corrective and Preventive Action Request)。

#### 頁面元素

| 元素名稱 | 類型 | 說明 |
|----------|------|------|
| CCAR 列表 | 表格 | 所有 CCAR 及其狀態 |
| 狀態篩選 | 標籤按鈕 | Open / In Progress / Verification / Closed |
| 新增 CCAR | 按鈕 | 手動開立新 CCAR |
| 到期提醒 | 警示區塊 | 顯示即將到期或已逾期的 CCAR |
| 詳細視圖 | 彈窗/頁面 | CCAR 完整資訊和處理歷程 |

#### CCAR 流程
```
[開立 CCAR] → [根因分析] → [矯正計劃] → [執行矯正] → [驗證效果] → [結案]
     │            │            │            │            │
     ▼            ▼            ▼            ▼            ▼
  [指派負責人] [填寫分析] [設定期限] [更新進度] [上傳證據]
```

#### 資料模型
```typescript
interface CCAR {
  id: string;
  ccarNumber: string;
  sourceType: 'audit' | 'customer_complaint' | 'internal_issue' | 'other';
  sourceId?: string; // e.g., auditId or findingId
  title: string;
  description: string;
  severity: 'critical' | 'major' | 'minor';
  status: 'open' | 'root_cause_analysis' | 'action_planning' | 'implementation' | 'verification' | 'closed';
  
  // 負責人
  issuedBy: User;
  assignedTo: User;
  department: string;
  
  // 日期
  issuedDate: Date;
  targetCompletionDate: Date;
  actualCompletionDate?: Date;
  
  // 內容
  rootCauseAnalysis?: string;
  correctiveAction?: string;
  preventiveAction?: string;
  verificationMethod?: string;
  verificationResult?: string;
  effectivenessEvidence?: string;
  
  // 附件
  attachments: Attachment[];
  
  // 歷程
  history: CCARHistory[];
  
  createdAt: Date;
  updatedAt: Date;
}

interface CCARHistory {
  id: string;
  action: string;
  fromStatus: string;
  toStatus: string;
  comment: string;
  user: User;
  timestamp: Date;
}
```

---

### 4.7 Audit Trail (稽核軌跡)

#### 功能描述
提供完整的系統活動日誌，記錄所有操作和變更。

#### 頁面元素

| 元素名稱 | 類型 | 說明 |
|----------|------|------|
| 活動日誌列表 | 表格 | 時間、使用者、動作、對象、詳情 |
| 日期範圍篩選 | 日期選擇器 | 篩選特定時間範圍的記錄 |
| 使用者篩選 | 下拉選單 | 篩選特定使用者的操作 |
| 動作類型篩選 | 多選框 | Create / Update / Delete / View / Export |
| 匯出按鈕 | 按鈕 | 匯出日誌為 CSV/Excel |

#### 資料模型
```typescript
interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  userRole: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'login' | 'logout' | 'export' | 'approve' | 'reject';
  resourceType: 'document' | 'audit' | 'ccar' | 'user' | 'setting';
  resourceId: string;
  resourceName: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  oldValue?: object;
  newValue?: object;
}
```

---

### 4.8 User Management (使用者管理)

#### 功能描述
管理系統使用者帳戶、角色和權限。

#### 頁面元素

| 元素名稱 | 類型 | 說明 |
|----------|------|------|
| 使用者列表 | 表格 | 姓名、Email、角色、部門、狀態、最後登入 |
| 新增使用者 | 按鈕 | 建立新使用者帳戶 |
| 角色管理 | 子頁面/標籤 | 定義和管理角色權限 |
| 批次操作 | 下拉選單 | 啟用、停用、刪除多個使用者 |
| 使用者詳情 | 彈窗/側邊欄 | 編輯使用者資訊和權限 |

#### 角色與權限矩陣
| 功能模組 | Admin | Manager | Auditor | User | Viewer |
|----------|-------|---------|---------|------|--------|
| 文檔管理 | CRUD | CRUD | R | CRU | R |
| 文檔審批 | ✓ | ✓ | - | - | - |
| 稽核管理 | CRUD | CRUD | CRUD | R | R |
| CCAR 管理 | CRUD | CRUD | CRUD | CRU | R |
| 使用者管理 | CRUD | R | - | - | - |
| 系統設定 | CRUD | R | - | - | - |
| 稽核軌跡 | R | R | R | - | - |

#### 資料模型
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar?: string;
  department: string;
  position: string;
  role: Role;
  status: 'active' | 'inactive' | 'suspended';
  lastLoginAt?: Date;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve')[];
}
```

---

### 4.9 Settings (系統設定)

#### 功能描述
系統層級的配置和設定管理。

#### 設定類別

##### 4.9.1 文檔設定
| 設定項目 | 類型 | 說明 |
|----------|------|------|
| 文檔編號格式 | 文字 | 定義自動編號規則 |
| 允許的檔案類型 | 多選 | PDF, DOCX, XLSX 等 |
| 檔案大小限制 | 數字 | 最大上傳檔案大小 (MB) |
| 版本保留數量 | 數字 | 保留的歷史版本數量 |
| 預設審核者 | 選擇 | 指定預設文檔審核者 |

##### 4.9.2 稽核設定
| 設定項目 | 類型 | 說明 |
|----------|------|------|
| 稽核編號格式 | 文字 | 稽核案號自動編號規則 |
| CCAR 預設期限 | 數字 | 天數 |
| 提醒通知時間 | 多選 | 到期前幾天發送提醒 |
| 稽核記錄保留年限 | 數字 | 年 |

##### 4.9.3 安全設定
| 設定項目 | 類型 | 說明 |
|----------|------|------|
| 密碼複雜度要求 | 多選 | 長度、大小寫、特殊字元 |
| 密碼有效期限 | 數字 | 天數 |
| 登入失敗鎖定次數 | 數字 | 次 |
| 雙因素認證 (2FA) | 開關 | 啟用/停用 |
| 會話超時時間 | 數字 | 分鐘 |

##### 4.9.4 通知設定
| 設定項目 | 類型 | 說明 |
|----------|------|------|
| Email 通知 | 開關 | 啟用/停用 |
| SMTP 伺服器 | 文字/密碼 | 郵件伺服器設定 |
| 通知事件 | 多選 | 選擇觸發通知的事件 |

##### 4.9.5 API 整合
| 設定項目 | 類型 | 說明 |
|----------|------|------|
| API 金鑰管理 | 列表 | 生成和管理 API 金鑰 |
| Webhook URL | 文字 | 外部系統整合 |
| 整合狀態 | 開關 | 啟用/停用 API |

---

### 4.10 Help & Support (幫助與支援)

#### 功能描述
提供使用者指南、FAQ 和支援聯繫管道。

#### 頁面元素

| 元素名稱 | 類型 | 說明 |
|----------|------|------|
| 快速入門指南 | 連結列表 | 上傳文檔、管理使用者、稽核報告 |
| FAQ | 手風琴列表 | 常見問題解答 |
| 聯繫支援 | 表單/連結 | Email、電話等聯繫方式 |
| 文件下載 | 連結 | 使用者手冊 PDF |
| 系統版本資訊 | 文字 | 當前系統版本號 |

---

## 5. UI/UX 設計規格

### 5.1 整體佈局
```
┌────────────────────────────────────────────────────────────────┐
│                         頂部導航欄                              │
│  [Logo]          [搜尋框]          [通知] [使用者選單]          │
├──────────┬─────────────────────────────────────────────────────┤
│          │                                                      │
│          │                                                      │
│  側邊欄   │                    主內容區域                        │
│  導航選單 │                                                      │
│          │                                                      │
│          │                                                      │
│          │                                                      │
│          │                                                      │
│          │                                                      │
└──────────┴─────────────────────────────────────────────────────┘
```

### 5.2 配色方案
| 用途 | 色碼 | 說明 |
|------|------|------|
| 主色 | `#2563EB` | 藍色，用於主要按鈕、連結 |
| 次色 | `#3B82F6` | 淺藍，用於 hover 狀態 |
| 成功 | `#10B981` | 綠色，用於成功狀態 |
| 警告 | `#F59E0B` | 橙色，用於警告狀態 |
| 危險 | `#EF4444` | 紅色，用於錯誤、刪除 |
| 背景 | `#F8FAFC` | 淺灰，頁面背景 |
| 卡片背景 | `#FFFFFF` | 白色，卡片背景 |
| 文字主色 | `#1E293B` | 深灰，主要文字 |
| 文字次色 | `#64748B` | 灰色，次要文字 |

### 5.3 字體規格
| 層級 | 字體大小 | 字重 |
|------|----------|------|
| H1 標題 | 24px | Bold (700) |
| H2 標題 | 20px | Semi-Bold (600) |
| H3 標題 | 16px | Semi-Bold (600) |
| 正文 | 14px | Regular (400) |
| 小字 | 12px | Regular (400) |
| 標籤 | 12px | Medium (500) |

### 5.4 間距規格
| 類型 | 數值 |
|------|------|
| 頁面邊距 | 24px |
| 卡片間距 | 16px |
| 元素間距 (緊密) | 8px |
| 元素間距 (標準) | 12px |
| 元素間距 (寬鬆) | 16px |

### 5.5 元件規格

#### 按鈕
| 類型 | 樣式 |
|------|------|
| 主要按鈕 | 藍底白字、圓角 6px、高度 36px |
| 次要按鈕 | 白底藍框藍字 |
| 危險按鈕 | 紅底白字 |
| 文字按鈕 | 無邊框、藍字 |

#### 表格
| 項目 | 規格 |
|------|------|
| 標頭背景 | `#F1F5F9` |
| 行高 | 48px |
| 斑馬紋 | 隔行 `#F8FAFC` |
| 邊框 | 1px `#E2E8F0` |

#### 卡片
| 項目 | 規格 |
|------|------|
| 背景 | 白色 |
| 圓角 | 8px |
| 陰影 | `0 1px 3px rgba(0,0,0,0.1)` |
| 內距 | 16px |

#### 狀態標籤
| 狀態 | 顏色 |
|------|------|
| Draft | 灰色 `#94A3B8` |
| In Review | 藍色 `#3B82F6` |
| Approved | 綠色 `#10B981` |
| Rejected | 紅色 `#EF4444` |
| Open | 橙色 `#F59E0B` |
| Closed | 灰色 `#6B7280` |

---

## 6. 通用功能規格

### 6.1 認證與授權
- 支援 Email/密碼登入
- 可選的雙因素認證 (2FA)
- JWT Token 認證機制
- 角色基礎存取控制 (RBAC)
- 會話管理與自動登出

### 6.2 搜尋功能
- 全域搜尋框（頂部導航）
- 各模組內搜尋
- 進階篩選器
- 搜尋結果高亮

### 6.3 通知系統
- 應用內通知（鈴鐺圖示）
- Email 通知（可配置）
- 通知類型分類
- 已讀/未讀狀態
- 通知偏好設定

### 6.4 匯出功能
- 報表匯出 (PDF, Excel, CSV)
- 資料匯出
- 列印友善格式

### 6.5 響應式設計
- 桌面版：完整功能
- 平板版：調整佈局
- 手機版：基本功能（可選）

---

## 7. 資料庫 Schema 概覽

### 7.1 核心資料表
```sql
-- 使用者表
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  department VARCHAR(100),
  role_id UUID REFERENCES roles(id),
  status VARCHAR(20) DEFAULT 'active',
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 文檔表
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  document_number VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  department VARCHAR(100),
  current_version VARCHAR(20),
  status VARCHAR(20),
  owner_id UUID REFERENCES users(id),
  file_url VARCHAR(500),
  file_type VARCHAR(50),
  file_size INTEGER,
  effective_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 稽核表
CREATE TABLE audits (
  id UUID PRIMARY KEY,
  audit_number VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  audit_type VARCHAR(50),
  scope TEXT,
  standard VARCHAR(100),
  department VARCHAR(100),
  status VARCHAR(20),
  lead_auditor_id UUID REFERENCES users(id),
  scheduled_start_date DATE,
  scheduled_end_date DATE,
  actual_start_date DATE,
  actual_end_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- CCAR 表
CREATE TABLE ccars (
  id UUID PRIMARY KEY,
  ccar_number VARCHAR(50) UNIQUE NOT NULL,
  source_type VARCHAR(50),
  source_id UUID,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  severity VARCHAR(20),
  status VARCHAR(30),
  issued_by UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  department VARCHAR(100),
  issued_date DATE,
  target_completion_date DATE,
  actual_completion_date DATE,
  root_cause_analysis TEXT,
  corrective_action TEXT,
  preventive_action TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 稽核軌跡表
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  resource_name VARCHAR(255),
  description TEXT,
  ip_address INET,
  user_agent TEXT,
  old_value JSONB,
  new_value JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 8. API 端點規格

### 8.1 認證 API
| 方法 | 端點 | 說明 |
|------|------|------|
| POST | `/api/auth/login` | 使用者登入 |
| POST | `/api/auth/logout` | 使用者登出 |
| POST | `/api/auth/refresh` | 刷新 Token |
| POST | `/api/auth/forgot-password` | 忘記密碼 |
| POST | `/api/auth/reset-password` | 重設密碼 |

### 8.2 文檔 API
| 方法 | 端點 | 說明 |
|------|------|------|
| GET | `/api/documents` | 取得文檔列表 |
| GET | `/api/documents/:id` | 取得單一文檔 |
| POST | `/api/documents` | 建立文檔 |
| PUT | `/api/documents/:id` | 更新文檔 |
| DELETE | `/api/documents/:id` | 刪除文檔 |
| POST | `/api/documents/:id/submit` | 提交審核 |
| POST | `/api/documents/:id/approve` | 批准文檔 |
| POST | `/api/documents/:id/reject` | 拒絕文檔 |

### 8.3 稽核 API
| 方法 | 端點 | 說明 |
|------|------|------|
| GET | `/api/audits` | 取得稽核列表 |
| GET | `/api/audits/:id` | 取得單一稽核 |
| POST | `/api/audits` | 建立稽核 |
| PUT | `/api/audits/:id` | 更新稽核 |
| DELETE | `/api/audits/:id` | 刪除稽核 |
| GET | `/api/audits/:id/findings` | 取得稽核發現項 |
| POST | `/api/audits/:id/findings` | 新增發現項 |

### 8.4 CCAR API
| 方法 | 端點 | 說明 |
|------|------|------|
| GET | `/api/ccars` | 取得 CCAR 列表 |
| GET | `/api/ccars/:id` | 取得單一 CCAR |
| POST | `/api/ccars` | 建立 CCAR |
| PUT | `/api/ccars/:id` | 更新 CCAR |
| PUT | `/api/ccars/:id/status` | 更新 CCAR 狀態 |

### 8.5 使用者 API
| 方法 | 端點 | 說明 |
|------|------|------|
| GET | `/api/users` | 取得使用者列表 |
| GET | `/api/users/:id` | 取得單一使用者 |
| POST | `/api/users` | 建立使用者 |
| PUT | `/api/users/:id` | 更新使用者 |
| DELETE | `/api/users/:id` | 刪除使用者 |

---

## 9. 非功能需求

### 9.1 效能需求
- 頁面載入時間 < 3 秒
- API 回應時間 < 500ms
- 支援同時 100 位使用者線上

### 9.2 安全需求
- HTTPS 加密傳輸
- SQL 注入防護
- XSS 攻擊防護
- CSRF Token 驗證
- 敏感資料加密存儲
- 定期密碼更新要求

### 9.3 可用性需求
- 系統可用性 99.5%
- 定期資料備份
- 災難復原機制

### 9.4 合規需求
- ISO 9001 文檔控制要求
- 完整稽核軌跡
- 資料保留政策

---

## 10. 開發階段規劃

### Phase 1: 基礎建設 (2-3 週)
- [ ] 專案初始化與環境設定
- [ ] 資料庫設計與建置
- [ ] 認證系統實作
- [ ] 基本 UI 框架與版面

### Phase 2: DMS 模組 (3-4 週)
- [ ] DMS 儀表板
- [ ] 文檔提交功能
- [ ] 文檔審核流程
- [ ] 文檔庫管理

### Phase 3: 稽核模組 (3-4 週)
- [ ] 稽核儀表板
- [ ] 稽核計劃與管理
- [ ] CCAR 追蹤系統
- [ ] 稽核軌跡記錄

### Phase 4: 系統管理 (2-3 週)
- [ ] 使用者管理
- [ ] 角色與權限
- [ ] 系統設定
- [ ] 幫助與支援頁面

### Phase 5: 優化與測試 (2 週)
- [ ] 效能優化
- [ ] 安全測試
- [ ] 使用者驗收測試
- [ ] 文件撰寫

---

## 11. 附錄

### A. 術語表
| 術語 | 說明 |
|------|------|
| DMS | Document Management System - 文檔管理系統 |
| CCAR | Corrective and Preventive Action Request - 矯正與預防措施請求 |
| ISO | International Organization for Standardization - 國際標準化組織 |
| RBAC | Role-Based Access Control - 角色基礎存取控制 |
| 2FA | Two-Factor Authentication - 雙因素認證 |

### B. 參考截圖
原型設計來源：https://preset-math-75686949.figma.site/

---

**文件版本**: 1.0  
**建立日期**: 2024-12-10  
**最後更新**: 2024-12-10  
**作者**: Claude AI Assistant

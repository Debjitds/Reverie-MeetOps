/**
 * Chinese Simplified (zh) static UI dictionary.
 *
 * Values transcribed from `.docs/chainese_text_translation.md`
 * (the English → Chinese reference specification), mapped onto the app's
 * existing dot-notation keys. Doc wording is preserved exactly where
 * specified (e.g. 得到正式认可的, 地位, 行动, 传奇). Do not reword entries.
 * Interpolation placeholders ({resource}, {name}, {count}, {total_days},
 * {nativeName}, {error.message}, {bookingError.message}) must match the
 * calling code exactly. Keys missing here fall back to English (see ./index.ts).
 */
export const zh: Record<string, string> = {
  // ===== BRAND =====
  'nav.appName': '会议运营',

  // ===== NAVIGATION / SIDEBAR =====
  'nav.dashboard': '仪表板',
  'nav.bookings': '预订',
  'nav.calendar': '日历',
  'nav.resources': '资源',
  'nav.users': '用户',
  'nav.notifications': '通知',

  // ===== HEADER ROLES =====
  'navbar.admin': '行政',
  'navbar.manager': '经理',
  'navbar.user': '用户',
  'navbar.logout': '注销',

  // ===== LOGOUT DIALOG =====
  'logoutDialog.title': '确认登出',
  'logoutDialog.description':
    '您确定要退出登录吗？您需要重新登录才能访问您的控制面板和预订信息。',
  'logoutDialog.cancel': '取消',
  'logoutDialog.logout': '注销',

  // ===== DASHBOARD =====
  'dashboard.title': '仪表板',
  'dashboard.welcome': '欢迎回来',
  'dashboard.totalBookings': '总预订量',
  'dashboard.pendingBookings': '待办的',
  'dashboard.approvedBookings': '得到正式认可的',
  'dashboard.rejectedBookings': '已拒绝',
  'dashboard.upcomingBookings': '即将到来的预订',
  'dashboard.noUpcomingBookings': '暂无预订。',
  'dashboard.quickActions': '快速操作',
  'dashboard.newBooking': '新预订',
  'dashboard.viewAllBookings': '查看所有预订',
  'dashboard.manageResources': '管理资源',
  'dashboard.aiInsights': '人工智能洞察',
  'dashboard.chatWithAI': '与人工智能助手聊天',

  // ===== NOTIFICATIONS =====
  'notifications.title': '通知',
  'notifications.markAllAsRead': '全部标记为已读',

  // ===== AI ASSISTANT UI =====
  'chat.title': 'MEETOPS AI 助手',
  'chat.greeting': '您好！我是 MeetOps AI。我可以帮助您预订房间、查询空闲情况并管理您的预订。',
  'chat.examplePrompt': '试试这样说：“请帮我预订明天下午2点一个可容纳5人的房间”。',
  'chat.placeholder': '输入您的留言......',

  // ===== BOOKINGS PAGE =====
  'bookings.title': '预订',
  'bookings.activeBookings': '当前预订',
  'bookings.pastBookings': '过往预订',
  'bookings.exportPDF': '导出PDF',
  'bookings.newBooking': '新预订',
  'bookings.status': '地位',
  'bookings.allStatuses': '所有状态',
  'bookings.pending': '待办的',
  'bookings.approved': '得到正式认可的',
  'bookings.rejected': '已拒绝',
  'bookings.cancelled': '取消',
  'bookings.completed': '完全的',
  'bookings.user': '用户',
  'bookings.allUsers': '所有用户',
  'bookings.search': '搜索',
  'bookings.searchPlaceholder': '按资源、用途或用户搜索……',
  'bookings.resource': '资源',
  'bookings.purpose': '目的',
  'bookings.date': '日期',
  'bookings.startTime': '开始时间',
  'bookings.endTime': '结束时间',
  'bookings.type': '类型',
  'bookings.actions': '行动',
  'bookings.view': '查看',
  'bookings.viewDetails': '查看详情',
  'bookings.multiDay': '多日',
  'bookings.singleDay': '单日',
  'bookings.noActiveBookings': '未找到有效预订',
  'bookings.noPastBookings': '未找到过往预订记录',

  // ===== EXPORT PDF DIALOG =====
  'bookings.exportTitle': '将预订信息导出为 PDF 文件',
  'bookings.exportDescription': '选择筛选条件以导出预订历史记录',
  'bookings.startDate': '开始日期',
  'bookings.endDate': '结束日期',
  'bookings.exportButton': '导出PDF',
  'bookings.cancelButton': '取消',

  // ===== PAGINATION =====
  'bookings.previous': '以前的',
  'bookings.next': '下一页',
  'bookings.page': '页',
  'bookings.of': '的',

  // ===== NEW BOOKING =====
  'newBooking.title': '新预订',
  'newBooking.subtitle': '创建新的资源预订',
  'newBooking.step1Title': '步骤 1：选择资源',
  'newBooking.step1Description': '选择您要预订的资源',
  'newBooking.step2Title': '步骤二：选择日期和时间',
  'newBooking.step2Description': '选择您想要预订 {resource} 的时间',
  'newBooking.step3Title': '步骤 3：预订详情',
  'newBooking.step3Description': '请提供有关您预订的更多信息',
  'newBooking.bookingType': '预订类型',
  'newBooking.singleDay': '单日',
  'newBooking.multiDay': '多日',
  'newBooking.startDate': '开始日期',
  'newBooking.endDate': '结束日期',
  'newBooking.startTime': '开始时间',
  'newBooking.endTime': '结束时间',
  'newBooking.totalDays': '总天数',
  'newBooking.timeSlotAvailable': '可预订时间段',
  'newBooking.purposeLabel': '目的',
  'newBooking.purposePlaceholder': '例如：团队会议、客户演示',
  'newBooking.attendeesLabel': '出席者（可选）',
  'newBooking.attendeesPlaceholder': '请输入与会者姓名，以逗号分隔。',
  'newBooking.generateAgendaButton': '利用人工智能生成议程',
  'newBooking.bookingSummary': '预订概要',
  'newBooking.createBooking': '创建预订',

  // ===== BOOKING DETAILS =====
  'bookingDetails.title': '预订详情',
  'bookingDetails.resource': '资源',
  'bookingDetails.location': '地点',
  'bookingDetails.startTime': '开始时间',
  'bookingDetails.endTime': '结束时间',
  'bookingDetails.purpose': '目的',
  'bookingDetails.attendees': '出席者',

  // ===== CALENDAR PAGE =====
  'calendar.title': '日历',
  'calendar.subtitle': '查看所有资源预订',
  'calendar.month': '月',
  'calendar.week': '星期',
  'calendar.day': '天',
  'calendar.agenda': '议程',
  'calendar.today': '今天',
  'calendar.back': '后退',
  'calendar.next': '下一个',
  'calendar.legend': '传奇',
  'calendar.approved': '得到正式认可的',
  'calendar.pending': '待办的',
  'calendar.rejected': '已拒绝',
  'calendar.cancelled': '取消',

  // ===== RESOURCES PAGE =====
  'resources.title': '资源',
  'resources.addResource': '添加资源',
  'resources.name': '姓名',
  'resources.location': '地点',
  'resources.capacity': '容量',
  'resources.description': '描述',
  'resources.actions': '行动',
  'resources.addTitle': '添加新资源',
  'resources.editTitle': '编辑资源',
  'resources.addDescription': '创建一个新的预订资源',
  'resources.editDescription': '更新资源信息',
  'resources.namePlaceholder': '输入资源名称',
  'resources.locationPlaceholder': '输入位置',
  'resources.descriptionPlaceholder': '输入描述',
  'resources.create': '创建',
  'resources.update': '更新',

  // ===== DELETE RESOURCE CONFIRMATION =====
  'resources.deleteTitle': '删除资源',
  'resources.deleteDescription': '您确定要删除“{name}”吗？此操作无法撤销。',

  // ===== USERS PAGE =====
  'users.title': '用户',
  'users.name': '姓名',
  'users.email': '电子邮件',
  'users.role': '角色',
  'users.joined': '加入',
  'users.actions': '行动',
  'users.changeRole': '角色变更',
  'users.changeRoleTitle': '更改用户角色',
  'users.currentRole': '当前角色',
  'users.newRole': '新角色',
  'users.updateRole': '更新',
  'users.searchPlaceholder': '搜索用户...',
  'users.admin': '行政',
  'users.manager': '经理',
  'users.user': '用户',

  // ===== COMMON =====
  'common.cancel': '取消',
  'common.back': '后退',
  'common.next': '下一个',
  'common.previous': '上一个',
  'common.today': '今天',
  'common.view': '查看',
  'common.viewDetails': '查看详情',
  'common.search': '搜索',
  'common.filter': '筛选',
  'common.date': '日期',
  'common.name': '姓名',
  'common.description': '描述',
  'common.delete': '删除',
  'common.remove': '移除',
  'common.edit': '编辑',
  'common.create': '创建',
  'common.update': '更新',
  'common.actions': '行动',
  'common.status': '地位',

  // ===== AUTHENTICATION =====
  'auth.appName': '会议运营',
  'auth.subtitle': '资源预订管理系统',
  'auth.welcome': '欢迎',
  'auth.loginOrRegister': '登录或创建一个新账户',
  'auth.loginTab': '登录',
  'auth.registerTab': '注册',
  'auth.fullName': '全名',
  'auth.fullNamePlaceholder': '输入您的全名',
  'auth.username': '用户名',
  'auth.usernameRegisterPlaceholder': '仅限字母、数字和下划线',
  'auth.password': '密码',
  'auth.passwordRegisterPlaceholder': '至少 8 个字符，包含字母和数字',
  'auth.confirmPassword': '确认密码',
  'auth.confirmPasswordPlaceholder': '重新输入密码',
  'auth.termsAgreement': '我同意用户协议和隐私政策（请修改这些文档以符合相关法律要求）',
  'auth.registerButton': '注册',
  'auth.usernameLoginPlaceholder': '输入用户名',
  'auth.passwordLoginPlaceholder': '输入密码',
  'auth.forgotPassword': '忘记密码？',
  'auth.loginButton': '登录',
  'auth.fetchUserInfoFailed': '获取用户信息失败：{error.message}',

  // ===== LOGIN PAGE TOASTS =====
  'login.enterUsernamePassword': '请输入用户名和密码',
  'login.usernameFormat': '用户名只能包含字母、数字和下划线',
  'login.loginFailed': '登录失败：{error.message}',
  'login.loginSuccess': '登录成功',
  'login.fillAllFields': '请填写所有必填字段',
  'login.passwordMinLength': '密码必须至少为 8 个字符',
  'login.passwordRequirements': '密码必须同时包含字母和数字',
  'login.passwordsDoNotMatch': '密码不匹配',
  'login.agreeToTermsRequired': '请同意用户协议和隐私政策',
  'login.registrationFailed': '注册失败：{error.message}',
  'login.registrationSuccess': '注册成功！您现在可以登录了。',

  // ===== STANDALONE REGISTRATION PAGE TOASTS =====
  'register.fillAllFields': '请填写所有必填字段',
  'register.usernameFormat': '用户名只能包含字母、数字和下划线',
  'register.passwordMinLength': '密码必须至少为 8 个字符',
  'register.passwordRequirements': '密码必须同时包含字母和数字',
  'register.passwordsDoNotMatch': '密码不匹配',
  'register.agreeToTermsRequired': '请同意用户协议和隐私政策',
  'register.registrationFailed': '注册失败：{error.message}',
  'register.registrationSuccess': '注册成功！正在跳转到仪表板...',

  // ===== PASSWORD RESET TOASTS =====
  'resetPassword.usernameRequired': '请输入您的用户名',
  'resetPassword.usernameFormat': '用户名只能包含字母、数字和下划线',
  'resetPassword.sendFailed': '发送重置链接失败：{error.message}',
  'resetPassword.sendSuccess': '密码重置链接已发送！请检查您的邮箱。',

  // ===== NEW BOOKING TOASTS =====
  'newBooking.purposeRequired': '请输入目的',
  'newBooking.resourceRequired': '请选择一个资源',
  'newBooking.dateRequired': '请选择一个日期',
  'newBooking.startTimeRequired': '请选择开始时间',
  'newBooking.invalidTimeRange': '结束时间必须晚于开始时间',
  'newBooking.conflictDetected': '此时间段已被预订',
  'newBooking.createFailed': '创建预订失败：{bookingError.message}',
  'newBooking.createSuccess': '预订创建成功',
  'newBooking.multiDayCreateFailed': '创建多日预订失败',
  'newBooking.multiDayCreateSuccess': '多日预订创建成功！（{total_days} 天）',
  'newBooking.generalCreateFailed': '创建预订失败',

  // ===== BOOKINGS / PDF EXPORT TOASTS =====
  'bookings.exportDatesRequired': '请选择要导出的开始和结束日期',
  'bookings.noBookingsForFilters': '所选筛选条件下未找到预订',
  'bookings.exportSuccess': '已将 {count} 条预订导出到 PDF',

  // ===== BOOKING APPROVAL / DETAILS TOASTS =====
  'common.notFound': '未找到',
  'toast.approveMultiDayFailed': '批准多日预订失败：{error.message}',
  'toast.approveFailed': '批准预订失败：{error.message}',
  'toast.bookingApproved': '预订已成功批准',
  'toast.rejectMultiDayFailed': '拒绝多日预订失败：{error.message}',
  'toast.rejectFailed': '拒绝预订失败：{error.message}',
  'toast.bookingRejected': '预订已成功拒绝',
  'toast.cancelMultiDayFailed': '取消多日预订失败：{error.message}',
  'toast.cancelFailed': '取消预订失败：{error.message}',
  'toast.bookingCancelled': '预订取消成功',

  // ===== RESOURCE MANAGEMENT TOASTS =====
  'toast.requiredField': '此字段为必填项',
  'toast.resourceUpdateFailed': '更新资源失败：{error.message}',
  'toast.resourceUpdated': '资源更新成功',
  'toast.resourceCreateFailed': '创建资源失败：{error.message}',
  'toast.resourceCreated': '资源创建成功',
  'resources.deleteWarning': '无法删除存在当前预订的资源',
  'toast.resourceDeleteFailed': '删除资源失败：{error.message}',
  'toast.resourceDeleted': '资源删除成功',

  // ===== USER ROLE TOASTS =====
  'toast.userRoleUpdateFailed': '更新用户角色失败：{error.message}',
  'toast.userRoleChanged': '用户角色更新成功',

  // ===== LANGUAGE SWITCHER TOASTS =====
  'language.updateSuccess': '语言更新成功！',
  'language.updateFailed': '语言更新失败，请重试。',
  'language.changedTo': '语言已切换为{nativeName}',
  'language.changeFailed': '更改语言失败，请重试。',

  // ===== AI ASSISTANT / COMMON TOASTS =====
  'chat.sendError': '消息发送失败，请重试。',
  'common.somethingWentWrong': '出现错误',
  'toast.operationSuccess': '操作成功',
  'toast.operationFailed': '操作失败',
};

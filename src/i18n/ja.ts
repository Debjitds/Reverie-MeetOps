/**
 * Japanese (ja) static UI dictionary.
 *
 * Values transcribed from `.docs/Japanese_text_translation.md`
 * (the English → Japanese reference specification), mapped onto the app's
 * existing dot-notation keys. Doc wording is preserved exactly where
 * specified. The doc's "✓ 予約可能時間" omits the ✓ here because the JSX
 * renders its own checkmark (NewBookingPage). Doc entries that only repeat
 * the English (Current Role / New Role) were rendered with equivalent doc
 * vocabulary (現在の / 新しい) to keep full key parity.
 * Interpolation placeholders ({resource}, {name}, {count}, {total_days},
 * {nativeName}, {error.message}, {bookingError.message}) must match the
 * calling code exactly. Keys missing here fall back to English (see ./index.ts).
 */
export const ja: Record<string, string> = {
  // ===== BRAND =====
  'nav.appName': 'ミートオプス',

  // ===== NAVIGATION / SIDEBAR =====
  'nav.dashboard': 'ダッシュボード',
  'nav.bookings': '予約',
  'nav.calendar': 'カレンダー',
  'nav.resources': 'リソース',
  'nav.users': 'ユーザー',
  'nav.notifications': '通知',

  // ===== HEADER ROLES =====
  'navbar.admin': '管理者',
  'navbar.manager': 'マネージャー',
  'navbar.user': 'ユーザー',
  'navbar.logout': 'ログアウト',

  // ===== LOGOUT DIALOG =====
  'logoutDialog.title': 'ログアウトを確認する',
  'logoutDialog.description':
    '本当にログアウトしますか？ダッシュボードと予約情報にアクセスするには、再度ログインする必要があります。',
  'logoutDialog.cancel': 'キャンセル',
  'logoutDialog.logout': 'ログアウト',

  // ===== DASHBOARD =====
  'dashboard.title': 'ダッシュボード',
  'dashboard.welcome': 'おかえり',
  'dashboard.totalBookings': '予約総数',
  'dashboard.pendingBookings': '保留中',
  'dashboard.approvedBookings': '承認された',
  'dashboard.rejectedBookings': '拒否されました',
  'dashboard.upcomingBookings': '今後の予約',
  'dashboard.noUpcomingBookings': '今後の予約はありません',
  'dashboard.quickActions': 'クイックアクション',
  'dashboard.newBooking': '新規予約',
  'dashboard.viewAllBookings': 'すべての予約を見る',
  'dashboard.manageResources': 'リソースの管理',
  'dashboard.aiInsights': 'AIに関する洞察',
  'dashboard.chatWithAI': 'AIアシスタントとチャット',

  // ===== NOTIFICATIONS =====
  'notifications.title': '通知',
  'notifications.markAllAsRead': 'すべて既読にする',

  // ===== AI ASSISTANT UI =====
  'chat.title': 'ミートオプスAIアシスタント',
  'chat.greeting':
    'こんにちは！私はMeetOps AIです。会議室の予約、空き状況の確認、予約の管理をお手伝いします。',
  'chat.examplePrompt': '「明日午後2時に5人用の部屋を予約してください」と聞いてみてください。',
  'chat.placeholder': 'メッセージを入力してください...',

  // ===== BOOKINGS PAGE =====
  'bookings.title': '予約',
  'bookings.activeBookings': '予約状況',
  'bookings.pastBookings': '過去の予約',
  'bookings.exportPDF': 'PDFをエクスポート',
  'bookings.newBooking': '新規予約',
  'bookings.status': '状態',
  'bookings.allStatuses': 'すべてのステータス',
  'bookings.pending': '保留中',
  'bookings.approved': '承認された',
  'bookings.rejected': '拒否されました',
  'bookings.cancelled': 'キャンセル',
  'bookings.completed': '完了',
  'bookings.user': 'ユーザー',
  'bookings.allUsers': 'すべてのユーザー',
  'bookings.search': '検索',
  'bookings.searchPlaceholder': 'リソース、目的、またはユーザーで検索...',
  'bookings.resource': 'リソース',
  'bookings.purpose': '目的',
  'bookings.date': '日付',
  'bookings.startTime': '開始時間',
  'bookings.endTime': '終了時刻',
  'bookings.type': 'タイプ',
  'bookings.actions': '行動',
  'bookings.view': 'ビュー',
  'bookings.viewDetails': '詳細を見る',
  'bookings.multiDay': '複数日',
  'bookings.singleDay': '単日',
  'bookings.noActiveBookings': '有効な予約は見つかりませんでした',
  'bookings.noPastBookings': '過去の予約は見つかりませんでした',

  // ===== EXPORT PDF DIALOG =====
  'bookings.exportTitle': '予約をPDFにエクスポート',
  'bookings.exportDescription': '予約履歴をエクスポートするには、フィルターを選択してください。',
  'bookings.startDate': '開始日',
  'bookings.endDate': '終了日',
  'bookings.exportButton': 'PDFをエクスポート',
  'bookings.cancelButton': 'キャンセル',

  // ===== PAGINATION =====
  'bookings.previous': '前',
  'bookings.next': '次',
  'bookings.page': 'ページ',
  'bookings.of': '/',

  // ===== NEW BOOKING =====
  'newBooking.title': '新規予約',
  'newBooking.subtitle': '新しいリソース予約を作成する',
  'newBooking.step1Title': 'ステップ 1：リソースを選択する',
  'newBooking.step1Description': '予約したいリソースを選択してください',
  'newBooking.step2Title': 'ステップ2：日付と時間',
  'newBooking.step2Description': '{resource}を予約したい時間を選択してください',
  'newBooking.step3Title': 'ステップ 3：予約の詳細',
  'newBooking.step3Description': '予約に関する追加情報を提供してください',
  'newBooking.bookingType': '予約タイプ',
  'newBooking.singleDay': '単日',
  'newBooking.multiDay': '複数日',
  'newBooking.startDate': '開始日',
  'newBooking.endDate': '終了日',
  'newBooking.startTime': '開始時間',
  'newBooking.endTime': '終了時間',
  'newBooking.totalDays': '合計日数',
  'newBooking.timeSlotAvailable': '予約可能時間',
  'newBooking.purposeLabel': '目的',
  'newBooking.purposePlaceholder': '例：チームミーティング、クライアントプレゼンテーション',
  'newBooking.attendeesLabel': '参加者（任意）',
  'newBooking.attendeesPlaceholder': '参加者の名前をカンマで区切って入力してください。',
  'newBooking.generateAgendaButton': 'AIで議題を生成する',
  'newBooking.bookingSummary': '予約概要',
  'newBooking.createBooking': '予約を作成する',

  // ===== BOOKING DETAILS =====
  'bookingDetails.title': '予約の詳細',
  'bookingDetails.resource': 'リソース',
  'bookingDetails.location': '位置',
  'bookingDetails.startTime': '開始時間',
  'bookingDetails.endTime': '終了時刻',
  'bookingDetails.purpose': '目的',
  'bookingDetails.attendees': '参加者',

  // ===== CALENDAR PAGE =====
  'calendar.title': 'カレンダー',
  'calendar.subtitle': 'すべてのリソース予約を表示',
  'calendar.month': '月',
  'calendar.week': '週',
  'calendar.day': '日',
  'calendar.agenda': 'アジェンダ',
  'calendar.today': '今日',
  'calendar.back': '前',
  'calendar.next': '次',
  'calendar.legend': '凡例',
  'calendar.approved': '正式に可の',
  'calendar.pending': '待機中',
  'calendar.rejected': '既に拒絶',
  'calendar.cancelled': '取消',

  // ===== RESOURCES PAGE =====
  'resources.title': 'リソース',
  'resources.addResource': 'リソースを追加',
  'resources.name': '名前',
  'resources.location': '位置',
  'resources.capacity': '容量',
  'resources.description': '説明',
  'resources.actions': '行動',
  'resources.addTitle': '新しいリソースを追加する',
  'resources.editTitle': 'リソースを編集する',
  'resources.addDescription': '予約用の新しいリソースを作成します',
  'resources.editDescription': 'リソース情報を更新する',
  'resources.namePlaceholder': 'リソース名を入力してください',
  'resources.locationPlaceholder': '場所を入力してください',
  'resources.descriptionPlaceholder': '説明を入力してください',
  'resources.create': '作成する',
  'resources.update': 'アップデート',

  // ===== DELETE RESOURCE CONFIRMATION =====
  'resources.deleteTitle': 'リソースを削除する',
  'resources.deleteDescription': '本当に「{name}」を削除しても良いですか？この操作は元に戻せません。',

  // ===== USERS PAGE =====
  'users.title': 'ユーザー',
  'users.name': '名前',
  'users.email': 'メール',
  'users.role': '役割',
  'users.joined': '参加しました',
  'users.actions': '行動',
  'users.changeRole': '役割の変更',
  'users.changeRoleTitle': 'ユーザーロールの変更',
  'users.currentRole': '現在の役割',
  'users.newRole': '新しい役割',
  'users.updateRole': 'アップデート',
  'users.searchPlaceholder': 'ユーザーを検索...',
  'users.admin': '管理者',
  'users.manager': 'マネージャー',
  'users.user': 'ユーザー',

  // ===== COMMON =====
  'common.cancel': 'キャンセル',
  'common.back': '戻る',
  'common.next': '次',
  'common.previous': '前',
  'common.today': '今日',
  'common.view': 'ビュー',
  'common.viewDetails': '詳細を見る',
  'common.search': '検索',
  'common.filter': 'フィルター',
  'common.date': '日付',
  'common.name': '名前',
  'common.description': '説明',
  'common.delete': '消去',
  'common.remove': '削除',
  'common.edit': '編集',
  'common.create': '作成',
  'common.update': 'アップデート',
  'common.actions': '行動',
  'common.status': '状態',

  // ===== AUTHENTICATION =====
  'auth.appName': 'ミートオプス',
  'auth.subtitle': 'リソース予約管理システム',
  'auth.welcome': 'ようこそ',
  'auth.loginOrRegister': 'ログインまたは新規アカウント作成',
  'auth.loginTab': 'ログイン',
  'auth.registerTab': '登録',
  'auth.fullName': 'フルネーム',
  'auth.fullNamePlaceholder': 'フルネームを入力してください',
  'auth.username': 'ユーザー名',
  'auth.usernameRegisterPlaceholder': '英字、数字、アンダースコアのみ',
  'auth.password': 'パスワード',
  'auth.passwordRegisterPlaceholder': '英字と数字を含む8文字以上',
  'auth.confirmPassword': 'パスワードを確認',
  'auth.confirmPasswordPlaceholder': 'パスワードをもう一度入力',
  'auth.termsAgreement': 'ユーザー契約とプライバシーポリシーに同意します',
  'auth.registerButton': '登録',
  'auth.usernameLoginPlaceholder': 'ユーザー名を入力してください',
  'auth.passwordLoginPlaceholder': 'パスワードを入力してください',
  'auth.forgotPassword': 'パスワードをお忘れですか？',
  'auth.loginButton': 'ログイン',
  'auth.fetchUserInfoFailed': 'ユーザー情報の取得に失敗しました：{error.message}',

  // ===== LOGIN PAGE TOASTS =====
  'login.enterUsernamePassword': 'ユーザー名とパスワードを入力してください',
  'login.usernameFormat': 'ユーザー名は英字、数字、アンダースコアのみ使用できます',
  'login.loginFailed': 'ログインに失敗しました：{error.message}',
  'login.loginSuccess': 'ログインに成功しました',
  'login.fillAllFields': 'すべての必須項目を入力してください',
  'login.passwordMinLength': 'パスワードは8文字以上である必要があります',
  'login.passwordRequirements': 'パスワードには英字と数字の両方を含める必要があります',
  'login.passwordsDoNotMatch': 'パスワードが一致しません',
  'login.agreeToTermsRequired': 'ユーザー契約とプライバシーポリシーに同意してください',
  'login.registrationFailed': '登録に失敗しました：{error.message}',
  'login.registrationSuccess': '登録に成功しました！ログインできます。',

  // ===== STANDALONE REGISTRATION PAGE TOASTS =====
  'register.fillAllFields': 'すべての必須項目を入力してください',
  'register.usernameFormat': 'ユーザー名は英字、数字、アンダースコアのみ使用できます',
  'register.passwordMinLength': 'パスワードは8文字以上である必要があります',
  'register.passwordRequirements': 'パスワードには英字と数字の両方を含める必要があります',
  'register.passwordsDoNotMatch': 'パスワードが一致しません',
  'register.agreeToTermsRequired': 'ユーザー契約とプライバシーポリシーに同意してください',
  'register.registrationFailed': '登録に失敗しました：{error.message}',
  'register.registrationSuccess': '登録に成功しました！ダッシュボードに移動しています...',

  // ===== PASSWORD RESET TOASTS =====
  'resetPassword.usernameRequired': 'ユーザー名を入力してください',
  'resetPassword.usernameFormat': 'ユーザー名は英字、数字、アンダースコアのみ使用できます',
  'resetPassword.sendFailed': 'リセットリンクの送信に失敗しました：{error.message}',
  'resetPassword.sendSuccess': 'パスワードリセットリンクを送信しました！メールをご確認ください。',

  // ===== NEW BOOKING TOASTS =====
  'newBooking.purposeRequired': '目的を入力してください',
  'newBooking.resourceRequired': 'リソースを選択してください',
  'newBooking.dateRequired': '日付を選択してください',
  'newBooking.startTimeRequired': '開始時間を選択してください',
  'newBooking.invalidTimeRange': '終了時間は開始時間より後である必要があります',
  'newBooking.conflictDetected': 'この時間帯はすでに予約されています',
  'newBooking.createFailed': '予約の作成に失敗しました：{bookingError.message}',
  'newBooking.createSuccess': '予約を正常に作成しました',
  'newBooking.multiDayCreateFailed': '複数日予約の作成に失敗しました',
  'newBooking.multiDayCreateSuccess': '複数日予約を正常に作成しました（{total_days}日間）',
  'newBooking.generalCreateFailed': '予約の作成に失敗しました',

  // ===== BOOKINGS / PDF EXPORT TOASTS =====
  'bookings.exportDatesRequired': 'エクスポートする開始日と終了日を選択してください',
  'bookings.noBookingsForFilters': '選択したフィルターでは予約が見つかりませんでした',
  'bookings.exportSuccess': '{count}件の予約をPDFにエクスポートしました',

  // ===== BOOKING APPROVAL / DETAILS TOASTS =====
  'common.notFound': '見つかりません',
  'toast.approveMultiDayFailed': '複数日予約の承認に失敗しました：{error.message}',
  'toast.approveFailed': '予約の承認に失敗しました：{error.message}',
  'toast.bookingApproved': '予約を正常に承認しました',
  'toast.rejectMultiDayFailed': '複数日予約の拒否に失敗しました：{error.message}',
  'toast.rejectFailed': '予約の拒否に失敗しました：{error.message}',
  'toast.bookingRejected': '予約を正常に拒否しました',
  'toast.cancelMultiDayFailed': '複数日予約のキャンセルに失敗しました：{error.message}',
  'toast.cancelFailed': '予約のキャンセルに失敗しました：{error.message}',
  'toast.bookingCancelled': '予約を正常にキャンセルしました',

  // ===== RESOURCE MANAGEMENT TOASTS =====
  'toast.requiredField': 'この項目は必須です',
  'toast.resourceUpdateFailed': 'リソースの更新に失敗しました：{error.message}',
  'toast.resourceUpdated': 'リソースを正常に更新しました',
  'toast.resourceCreateFailed': 'リソースの作成に失敗しました：{error.message}',
  'toast.resourceCreated': 'リソースを正常に作成しました',
  'resources.deleteWarning': 'アクティブな予約があるリソースは削除できません',
  'toast.resourceDeleteFailed': 'リソースの削除に失敗しました：{error.message}',
  'toast.resourceDeleted': 'リソースを正常に削除しました',

  // ===== USER ROLE TOASTS =====
  'toast.userRoleUpdateFailed': 'ユーザーの役割の更新に失敗しました：{error.message}',
  'toast.userRoleChanged': 'ユーザーの役割を正常に更新しました',

  // ===== LANGUAGE SWITCHER TOASTS =====
  'language.updateSuccess': '言語を正常に更新しました',
  'language.updateFailed': '言語の更新に失敗しました。もう一度お試しください。',
  'language.changedTo': '言語を{nativeName}に変更しました',
  'language.changeFailed': '言語の変更に失敗しました。もう一度お試しください。',

  // ===== AI ASSISTANT / COMMON TOASTS =====
  'chat.sendError': 'メッセージの送信に失敗しました。もう一度お試しください。',
  'common.somethingWentWrong': '問題が発生しました',
  'toast.operationSuccess': '操作は正常に完了しました',
  'toast.operationFailed': '操作に失敗しました',
};

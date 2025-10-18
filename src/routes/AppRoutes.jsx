import Register from "../page/common/Register";
import LoginPage from '../page/common/Login';

import UserLayout from '../components/layout/UserLayout';
import BtcLayout from '../components/layout/BtcLayout';
import AdminLayout from '../components/layout/AdminLayout';
import PublicLayout from "../components/layout/PublicLayout";
import ProtectedRoute from "../components/routing/ProtectedRoute";
import VerifyRouter from "../components/routing/VerifyRouter";
import VerifyPasswordRouter from "../components/routing/VerifyPasswordRouter";


import Home from "../page/volunteer/Home";
import AboutPage from "../page/volunteer/About";
import EventDetailPage from "../page/volunteer/EventDetailPage";
import EventsPage from "../page/volunteer/EventsPage";
import Community from "../page/volunteer/Community";
import MyEvents from "../page/volunteer/MyEvents";
import ConnectInbox from "../page/volunteer/ConnectInbox";
import PrivacySettings from "../page/volunteer/PrivacySettings";
import Profile from "../page/volunteer/Profile";
import BlogPostDetail from "../page/volunteer/Post";


// Import existing pages
import Dashboard from "../page/admin/Dashboard";
import EventManagement from "../page/admin/EventManagement.jsx";
import VolunteerManagement from "../page/admin/VolunteerManagement.jsx";
import PartnerManagement from "../page/admin/PartnerManagement.jsx";
import ConnectionQueue from "../page/admin/ConnectionQueue.jsx";
import ContentModeration from "../page/admin/ContentModeration.jsx";
import Reports from "../page/admin/Reports.jsx";
import SystemMonitoring from "../page/admin/SystemMonitoring.jsx";
import DataBackup from "../page/admin/DataBackup.jsx";
import Support from "../page/admin/Support.jsx";
import AdminProfile from "../page/admin/AdminProfile.jsx";
import ServicesPage from "../page/admin/ServicesPage.jsx";
import AdminEventDetailPage from "../page/admin/EventDetailPage"; // Chi tiết sự kiện
import EventCreatePage from '../page/admin/EventCreatePage.jsx'
import EventApprovalQueue from "../page/admin/EventApprovalQueue.jsx"; // Hàng đợi duyệt sự kiện
import EventQualityControl from "../page/admin/EventQualityControl.jsx"; // Kiểm soát chất lượng sự kiện
import EventAnalytics from "../page/admin/EventAnalytics.jsx"; // Phân tích sự kiện
import VolunteerVerification from "../page/admin/VolunteerVerification.jsx"; // Xác minh TNV
import VolunteerViolationManagement from "../page/admin/VolunteerViolationManagement.jsx"; // Quản lý vi phạm TNV
import VolunteerDetailPage from "../page/admin/VolunteerDetailPage.jsx"; // Chi tiết hồ sơ TNV
import VolunteerCertificationSystem from "../page/admin/VolunteerCertificationSystem.jsx"; // Hệ thống chứng nhận
import PartnerVerification from "../page/admin/PartnerVerification.jsx"; // Xác minh đối tác
import PartnerTierManagement from "../page/admin/PartnerTierManagement.jsx"; // Quản lý tier đối tác
import PartnerAnalytics from "../page/admin/PartnerAnalytics.jsx"; // Phân tích đối tác
import ConnectionApprovalQueue from "../page/admin/ConnectionApprovalQueue.jsx"; // Hàng đợi duyệt kết nối
import ProxyChatSystem from "../page/admin/ProxyChatSystem.jsx"; // Hệ thống chat proxy
import AbuseReportManagement from "../page/admin/AbuseReportManagement.jsx"; // Quản lý báo cáo lạm dụng
import ContentQueue from "../page/admin/ContentQueue.jsx"; // Hàng đợi kiểm duyệt nội dung
import ContentSpotlight from "../page/admin/ContentSpotlight.jsx"; // Spotlight nội dung
import CommunityFeedManagement from "../page/admin/CommunityFeedManagement.jsx"; // Quản lý feed cộng đồng
import PlatformAnalytics from "../page/admin/PlatformAnalytics.jsx"; // Phân tích nền tảng
import ComparisonReports from "../page/admin/ComparisonReports.jsx"; // Báo cáo so sánh
import ConnectionFunnelAnalytics from "../page/admin/ConnectionFunnelAnalytics.jsx"; // Phân tích phễu kết nối
import SystemAlerts from "../page/admin/SystemAlerts.jsx"; // Cảnh báo hệ thống
import AuditLog from "../page/admin/AuditLog.jsx"; // Nhật ký hoạt động
import RoleManagement from "../page/admin/RoleManagement.jsx"; // Phân quyền
import IntegrationManagement from "../page/admin/IntegrationManagement.jsx"; // Tích hợp hệ thống
import DataExport from "../page/admin/DataExport.jsx"; // Xuất dữ liệ
import TicketManagement from "../page/admin/TicketManagement.jsx"; // Quản lý ticket
import ComplaintResolution from "../page/admin/ComplaintResolution.jsx"; // Xử lý khiếu nại
import AdminSettings from "../page/admin/AdminSettings.jsx"; // Cài đặt admin
import NotificationManagement from "../page/admin/NotificationManagement.jsx"; // Quản lý thông báo
import QueuePage from "../page/admin/QueuePage.jsx"; // quản lý các hàng đợi thông tin


import BtcDashboard from '../page/btc/BtcDashboard'
import EventManages from "../page/btc/EventManagesPage";
import RecruitmentPostPage from "../page/btc/RecruitmentPagePost";
import EventDetailPageBTC from "../page/btc/EventDetailPage";
import VolunteerManagementPage from "../page/btc/VolunteerManagementPage";
import VerifyPage from "../page/btc/Verify";
import CVManagementPage from "../page/btc/CVManages";
import OrgAnalyticsPage from "../page/btc/OrgAnalyticsPage";
import RecruitmentDashboard from "../page/btc/RecruitmentDashboard";
import EventAnalyticsPage from "../page/btc/EventAnalyticsPage";

import NotFoundPage from "../page/common/NotFoundPage";
import OTPVerification from "../page/common/VerifiyPage";
import ForgotPasswordPage from "../page/common/ForgotPasswordPage";
import ResetPasswordPage from "../page/common/ResetPasswordPage";
import VolunteerRecruitmentService from "../page/common/Services";
import VerifyPath from "../components/routing/VerifyPath";

import FeedbackManagementPage from "../page/btc/FeedbackManagementPage";
import OrgProfileManagement from "../page/btc/Profile";
import EventRecapPage from "../page/btc/EventRecapPage";
import BlogManagementPage from "../page/btc/BlogManagementPage";
import RecruiterSupportPage from "../page/btc/RecruiterSupportPage";
import ChatSystemPage from "../page/btc/ChatSystemPage";
import MyCartsPage from "../page/btc/MyCartPage";
import PostBoxPage from "../page/btc/PostPage";
import HistoryPage from "../page/btc/HistoryPage";
import Account from "../page/btc/Account";
import SettingsPage from "../page/btc/SettingsPage";
import TermsPage from "../page/common/Terms.jsx";
import PrivacyPolicyPage from "../page/common/PrivacyPolicyPage.jsx";




export const routes = [
    {
        path: '/',
        children: [
            {
                path: '',
                element: <PublicLayout />,
                children: [
                    {
                        path: '/register',
                        element:<VerifyPath><Register /> </VerifyPath>
                    },
                    {
                        path: '/login',
                        element: <VerifyPath><LoginPage /></VerifyPath>
                    },
                    {
                        path: '/forgot',
                        element: <VerifyPasswordRouter><ForgotPasswordPage /></VerifyPasswordRouter>
                    },
                    {
                        path: '/auth/reset',
                        element: <VerifyPasswordRouter><ResetPasswordPage /></VerifyPasswordRouter>
                    },
                    {
                        path: '/auth/verify',
                        element: <VerifyRouter><OTPVerification /></VerifyRouter>
                    },                   
                    {
                        path: "/",
                        element: <UserLayout />,
                        children: [
                            { index: true, element: <Home /> },         
                            { path: '/', element: <Home /> },
                            { path: 'about', element: <AboutPage />},
                            { path: 'events', element: <EventsPage />},
                            { path: 'community', element: <Community />},
                            { path: 'events/:slug', element: <EventDetailPage />},
                            { path: 'profile', element: <ProtectedRoute allowedRoles={["ROLE_VOLUNTEER"]}><Profile /></ProtectedRoute>},
                            { path: 'settings', element: <ProtectedRoute allowedRoles={["ROLE_VOLUNTEER"]}><PrivacySettings /></ProtectedRoute>},
                            { path: 'my-events', element: <ProtectedRoute allowedRoles={["ROLE_VOLUNTEER"]}><MyEvents /></ProtectedRoute>},
                            { path: 'connect-inbox', element: <ProtectedRoute allowedRoles={["ROLE_VOLUNTEER"]}><ConnectInbox /></ProtectedRoute>},
                            { path: '/services', element: <VolunteerRecruitmentService />}, 
                            { path: '/community/:slug', element: <BlogPostDetail />}, 
                            { path: '/terms', element: <TermsPage />},
                            { path: '/privacy-policy', element: <PrivacyPolicyPage />},
                            { path: '*', element: <NotFoundPage />},
                        ]
                    }
                ]
            },
            {
                path: "/btc",
                element: <ProtectedRoute allowedRoles={["ROLE_ORGANIZER"]}><BtcLayout/></ProtectedRoute>,
                children: [
                    { index: true, element: <BtcDashboard /> },         
                    { path: 'dashboard', element: <BtcDashboard /> },
                    { path: 'events', element: <EventManages /> },
                    { path: 'events/recruitment-post', element: <RecruitmentPostPage /> },
                    { path: 'events/:slug', element: <EventDetailPageBTC /> },
                    { path: 'volunteers', element: <VolunteerManagementPage /> },
                    { path: 'cv-manage', element: <CVManagementPage /> },
                    { path: 'profile/verification', element: <VerifyPage /> },
                    { path: 'analytics', element: <OrgAnalyticsPage />},
                    { path: 'recruitment-report', element: <RecruitmentDashboard />},
                    { path: 'analytics/events', element: <EventAnalyticsPage />},
                    { path: 'feedback', element: <FeedbackManagementPage />},
                    { path: 'profile', element: <OrgProfileManagement />},
                    { path: 'promotion/recap', element: <EventRecapPage />},
                    { path: 'blog', element: <BlogManagementPage />},
                    { path: 'support', element: <RecruiterSupportPage />},
                    { path: 'chat', element: <ChatSystemPage />},
                    { path: 'my-cart', element: <MyCartsPage />},
                    { path: 'post-box', element: <PostBoxPage />},
                    { path: 'history', element: <HistoryPage />},
                    { path: 'account', element: <Account />},
                    { path: 'settings', element: <SettingsPage />},
                    { path: '*', element: <NotFoundPage />},
                ]
            },
            {
                path: "/admin",
                element: <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><AdminLayout/></ProtectedRoute>,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: 'dashboard', element: <Dashboard /> },
                    { path: 'analytics/platform', element: <PlatformAnalytics /> },
                    { path: 'alerts', element: <SystemAlerts /> },
                    { path: 'events', element: <EventManagement /> },
                    { path: 'events/create', element: <EventCreatePage /> },
                    { path: 'events/detail/:id', element: <AdminEventDetailPage /> },
                    { path: 'events/approval-queue', element: <EventApprovalQueue /> },
                    { path: 'events/quality-control', element: <EventQualityControl /> },
                    { path: 'events/analytics', element: <EventAnalytics /> },
                    { path: 'volunteers', element: <VolunteerManagement /> },
                    { path: 'volunteers/detail/:id', element: <VolunteerDetailPage /> },
                    { path: 'volunteers/verification', element: <VolunteerVerification /> },
                    { path: 'volunteers/violations', element: <VolunteerViolationManagement /> },
                    { path: 'volunteers/certifications', element: <VolunteerCertificationSystem /> },
                    { path: 'partners', element: <PartnerManagement /> },
                    { path: 'partners/verification', element: <PartnerVerification /> },
                    { path: 'partners/tiers', element: <PartnerTierManagement /> },
                    { path: 'partners/analytics', element: <PartnerAnalytics /> },
                    { path: 'connections', element: <ConnectionQueue /> },
                    { path: 'connections/approval-queue', element: <ConnectionApprovalQueue /> },
                    { path: 'connections/proxy-chat', element: <ProxyChatSystem /> },
                    { path: 'connections/abuse-reports', element: <AbuseReportManagement /> },
                    { path: 'content', element: <ContentModeration /> },
                    { path: 'content/queue', element: <ContentQueue /> },
                    { path: 'content/spotlight', element: <ContentSpotlight /> },
                    { path: 'content/community-feed', element: <CommunityFeedManagement /> },
                    { path: 'services', element: <ServicesPage /> },
                    { path: 'report', element: <Reports /> },
                    { path: 'report/comparison', element: <ComparisonReports /> },
                    { path: 'report/connection-funnel', element: <ConnectionFunnelAnalytics /> },
                    { path: 'system', element: <SystemMonitoring /> },
                    { path: 'system/alerts', element: <SystemAlerts /> },
                    { path: 'system/audit-log', element: <AuditLog /> },
                    { path: 'system/roles', element: <RoleManagement /> },
                    { path: 'system/integrations', element: <IntegrationManagement /> },
                    { path: 'backup', element: <DataBackup /> },
                    { path: 'backup/export', element: <DataExport /> },
                    { path: 'support', element: <Support /> },
                    { path: 'support/tickets', element: <TicketManagement /> },
                    { path: 'support/complaints', element: <ComplaintResolution /> },
                    { path: 'profile', element: <AdminProfile /> },
                    { path: 'settings', element: <AdminSettings /> },
                    { path: 'notifications/manage', element: <NotificationManagement /> },
                    { path: 'post-box', element: <ConnectionQueue /> },
                    { path: 'history', element: <AuditLog /> },
                    { path: 'queue', element: <QueuePage /> },
                    { path: '*', element: <NotFoundPage /> },
                ]
            } 
        ]
    }
]
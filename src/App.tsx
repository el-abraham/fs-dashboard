import { useEffect, useState } from "react";
import "./App.css";

// function App() {
//   return (
//     <>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

interface StatCardProps {
  label: string;
  value: number;
  change: string;
  color: string;
  dataSource: string;
}

interface Course {
  id: number;
  title: string;
  category: string;
  progress: number;
  duration: string;
  status: string;
  color: string;
  icon: string;
}

interface ProgressItem {
  name: string;
  progress: number;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "courses" | "executive"
  >("dashboard");
  const [stats, setStats] = useState({
    activeUsers: 0,
    completedTraining: 0,
    ongoing: 0,
    certificates: 0,
  });

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setLoading(false);
      animateStats();
    }, 2000);
  }, []);

  const animateStats = () => {
    const targets = {
      activeUsers: 1247,
      completedTraining: 342,
      ongoing: 89,
      certificates: 278,
    };

    const duration = 1500;
    const steps = 50;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setStats({
        activeUsers: Math.floor(targets.activeUsers * progress),
        completedTraining: Math.floor(targets.completedTraining * progress),
        ongoing: Math.floor(targets.ongoing * progress),
        certificates: Math.floor(targets.certificates * progress),
      });

      if (step >= steps) {
        setStats(targets);
        clearInterval(timer);
      }
    }, interval);
  };

  const courses: Course[] = [
    {
      id: 1023,
      title: "K3 & Keselamatan Kerja",
      category: "WAJIB",
      progress: 100,
      duration: "2 jam",
      status: "✅ Selesai",
      color: "from-purple-500 to-indigo-600",
      icon: "🛡️",
    },
    {
      id: 1024,
      title: "Onboarding Program 2025",
      category: "WAJIB",
      progress: 65,
      duration: "3 jam",
      status: "🔄 Sedang Berjalan",
      color: "from-pink-500 to-rose-500",
      icon: "🎯",
    },
    {
      id: 1025,
      title: "Digital Marketing Fundamentals",
      category: "PILIHAN",
      progress: 30,
      duration: "4 jam",
      status: "🔄 Sedang Berjalan",
      color: "from-cyan-400 to-blue-500",
      icon: "📱",
    },
    {
      id: 1026,
      title: "Leadership & Management",
      category: "PILIHAN",
      progress: 0,
      duration: "5 jam",
      status: "📝 Tersedia",
      color: "from-orange-400 to-yellow-400",
      icon: "💼",
    },
    {
      id: 1027,
      title: "Customer Service Excellence",
      category: "WAJIB",
      progress: 0,
      duration: "3 jam",
      status: "📝 Tersedia",
      color: "from-teal-400 to-indigo-900",
      icon: "🤝",
    },
    {
      id: 1028,
      title: "Data Analytics for Business",
      category: "PILIHAN",
      progress: 0,
      duration: "6 jam",
      status: "📝 Tersedia",
      color: "from-emerald-300 to-pink-300",
      icon: "📊",
    },
  ];

  const mandatoryProgress: ProgressItem[] = [
    { name: "K3 & Keselamatan Kerja", progress: 87 },
    { name: "Onboarding Karyawan Baru", progress: 92 },
    { name: "Product Knowledge", progress: 74 },
    { name: "Customer Service Excellence", progress: 68 },
  ];

  const topPerformers = [
    { name: "Ahmad Rizki", branch: "Jakarta", courses: 8, status: "Excellent" },
    {
      name: "Siti Nurhaliza",
      branch: "Surabaya",
      courses: 7,
      status: "Excellent",
    },
    { name: "Dedi Kusuma", branch: "Bandung", courses: 6, status: "Good" },
    { name: "Rina Wati", branch: "Medan", courses: 6, status: "Good" },
    { name: "Budi Santoso", branch: "Jakarta", courses: 5, status: "Good" },
  ];

  const branchParticipation = [
    { branch: "Jakarta Pusat", employees: 450, active: 398, rate: 88 },
    { branch: "Surabaya", employees: 320, active: 267, rate: 83 },
    { branch: "Bandung", employees: 280, active: 221, rate: 79 },
    { branch: "Medan", employees: 190, active: 142, rate: 75 },
    { branch: "Makassar", employees: 150, active: 98, rate: 65 },
  ];

  const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    change,
    color,
    dataSource,
  }) => (
    <div
      className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${color} relative overflow-hidden`}
    >
      <div className="absolute top-4 right-4 w-10 h-10 bg-opacity-10 bg-blue-500 rounded-full" />
      <div className="text-gray-600 text-sm mb-2">{label}</div>
      <div className="text-3xl font-bold text-gray-800 mb-2">
        {value.toLocaleString("id-ID")}
      </div>
      <div className="text-green-600 text-sm mb-2">{change}</div>
      <div className="text-xs text-gray-400 flex items-center gap-1">
        <div className="text-xs">📊</div>
        {dataSource}
      </div>
    </div>
  );

  const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000 ease-out"
        style={{ width: loading ? "0%" : `${progress}%` }}
      />
    </div>
  );

  const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
      <div
        className={`h-40 bg-gradient-to-br ${course.color} flex items-center justify-center text-5xl relative`}
      >
        {course.icon}
        <a
          href="#"
          className="absolute top-2 right-2 bg-white bg-opacity-90 text-blue-600 text-xs px-2 py-1 rounded"
        >
          View in Moodle →
        </a>
      </div>
      <div className="p-6">
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
            course.category === "WAJIB"
              ? "bg-blue-100 text-blue-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {course.category}
        </span>
        <h3 className="font-semibold text-lg mb-4 text-gray-800">
          {course.title}
        </h3>
        <div className="mb-2">
          <div className="text-sm text-gray-600 mb-2">
            Progress: {course.progress}% • Course ID: {course.id}
          </div>
          <ProgressBar progress={course.progress} />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-4 pt-4 border-t">
          <span>⏱️ {course.duration}</span>
          <span>{course.status}</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        <div className="mt-4 text-gray-600">
          Fetching data from Moodle API...
        </div>
        <div className="mt-2 text-xs text-gray-400">
          Connected to: moodle.fiberstar.id/webservice/rest
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-900 font-bold text-lg">
              FS
            </div>
            <div>
              <div className="text-xl font-semibold">
                Fiber Star Learning Hub
                <span className="ml-2 text-xs bg-white/20 px-3 py-1 rounded-full font-bold">
                  Powered by Moodle 5.1
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm font-bold">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Live Sync</span>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Selamat datang,</div>
              <div className="font-semibold">Budi Santoso</div>
            </div>
            <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center font-bold">
              BS
            </div>
          </div>
        </div>
      </header>

      {/* API Info Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-8 flex items-center gap-3 text-sm">
        <span className="text-xl">🔗</span>
        <span>
          Dashboard ini terintegrasi real-time dengan Moodle Core menggunakan
          Web Services API • Data diperbarui setiap 5 menit
        </span>
      </div>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="px-8 flex gap-8">
          {(["dashboard", "courses", "executive"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 border-b-3 font-medium transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab === "dashboard" && "Dashboard"}
              {tab === "courses" && "Pelatihan Saya"}
              {tab === "executive" && "Executive Report"}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1366px] mx-auto p-8">
        {/* Dashboard View */}
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Ringkasan Aktivitas
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                label="Total Peserta Aktif"
                value={stats.activeUsers}
                change="↑ 12% dari bulan lalu"
                color="border-blue-600"
                dataSource="mdl_user table"
              />
              <StatCard
                label="Pelatihan Selesai"
                value={stats.completedTraining}
                change="↑ 8% dari bulan lalu"
                color="border-green-600"
                dataSource="mdl_course_completions"
              />
              <StatCard
                label="Sedang Berlangsung"
                value={stats.ongoing}
                change="→ Stabil"
                color="border-orange-600"
                dataSource="mdl_course_modules_completion"
              />
              <StatCard
                label="Sertifikat Diterbitkan"
                value={stats.certificates}
                change="↑ 15% dari bulan lalu"
                color="border-purple-600"
                dataSource="mdl_customcert_issues"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Aktivitas Pembelajaran per Cabang (30 Hari Terakhir)
                  </h3>
                  <button className="flex items-center gap-2 text-sm border px-3 py-1 rounded hover:bg-gray-50">
                    {/* <RefreshCw size={14} /> */}
                    Refresh
                  </button>
                </div>
                <div className="h-64 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-center p-6">
                  <div>
                    <div className="text-xl mb-2">📊</div>
                    <div>Data source: mdl_logstore_standard_log</div>
                    <div className="mt-2">
                      Partisipasi training: Jakarta (45%), Surabaya (28%),
                      Bandung (15%), Medan (12%)
                    </div>
                    <div className="text-xs opacity-80 mt-3">
                      Query: SELECT cohort, COUNT(*) FROM mdl_user GROUP BY
                      cohort
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  Progress Pelatihan Wajib
                </h3>
                <div className="space-y-4">
                  {mandatoryProgress.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700">{item.name}</span>
                        <span className="font-semibold">{item.progress}%</span>
                      </div>
                      <ProgressBar progress={item.progress} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Topik Pelatihan Paling Populer
                </h3>
                <span className="text-xs text-gray-400">
                  via mdl_course_enrolments
                </span>
              </div>
              <div className="h-48 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-center p-6">
                <div>
                  <div className="text-xl mb-2">📈</div>
                  <div>
                    Digital Marketing (234 peserta), Leadership (198), Technical
                    Support (187), Sales Skills (156)
                  </div>
                  <div className="text-xs opacity-80 mt-3">
                    Real-time enrollment tracking via Moodle enrollment API
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses View */}
        {activeTab === "courses" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Program Pelatihan Tersedia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Executive View */}
        {activeTab === "executive" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Executive Dashboard
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Top Performers */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Top Performers (Bulan Ini)
                  </h3>
                  <span className="text-xs text-gray-400">
                    mdl_grade_grades
                  </span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-sm text-gray-500">
                      <th className="p-3">Nama</th>
                      <th className="p-3">Cabang</th>
                      <th className="p-3">Pelatihan</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformers.map((performer, idx) => (
                      <tr key={idx} className="border-b border-black/10">
                        <td className="p-3">{performer.name}</td>
                        <td className="p-3">{performer.branch}</td>
                        <td className="p-3">{performer.courses}</td>
                        <td className="p-3">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              performer.status === "Excellent"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {performer.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Branch Participation */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Tingkat Partisipasi per Cabang
                  </h3>
                  <span className="text-xs text-gray-400">mdl_cohort</span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-sm text-gray-600">
                      <th className="p-3">Cabang</th>
                      <th className="p-3">Karyawan</th>
                      <th className="p-3">Aktif</th>
                      <th className="p-3">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branchParticipation.map((branch, idx) => (
                      <tr key={idx} className="border-b border-black/10">
                        <td className="p-3">{branch.branch}</td>
                        <td className="p-3">{branch.employees}</td>
                        <td className="p-3">{branch.active}</td>
                        <td className="p-3">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              branch.rate >= 80
                                ? "bg-green-100 text-green-700"
                                : branch.rate >= 70
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {branch.rate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Performance */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  System Performance & Uptime
                </h3>
                <span className="text-xs text-gray-400">
                  Real-time monitoring
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-700 mb-2">
                    Uptime (30 hari)
                  </div>
                  <div className="text-3xl font-bold text-green-800">99.8%</div>
                  <div className="text-xs text-gray-500 mt-1">
                    SLA target: ≥99.5%
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-700 mb-2">
                    Avg Response Time
                  </div>
                  <div className="text-3xl font-bold text-blue-800">1.2s</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Target: &lt;3s
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-purple-700 mb-2">
                    Server Load
                  </div>
                  <div className="text-3xl font-bold text-purple-800">34%</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Healthy: &lt;70%
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-orange-700 mb-2">
                    Daily Backup
                  </div>
                  <div className="text-3xl font-bold text-orange-800">
                    ✓ Active
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Last: 2 hours ago
                  </div>
                </div>
              </div>
            </div>

            {/* System Information */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">
                Moodle System Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="text-gray-600 mb-2">Moodle Version</div>
                  <div className="font-semibold">5.1.0</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Database</div>
                  <div className="font-semibold">MySQL 8.0.35</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">PHP Version</div>
                  <div className="font-semibold">8.2.15</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Web Server</div>
                  <div className="font-semibold">Nginx 1.24.0</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Active Plugins</div>
                  <div className="font-semibold">
                    Custom Certificate, Attendance, H5P
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Storage Used</div>
                  <div className="font-semibold">12.4 GB / 500 GB (2.5%)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white p-8 mt-12 text-center">
        <div className="text-gray-600 mb-4 text-sm">
          Teknologi yang Digunakan
        </div>
        <div className="flex justify-center gap-6 flex-wrap mb-4">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white font-bold text-xs">
              M
            </div>
            <span className="text-sm">
              <strong>Moodle 4.5</strong> - Open Source LMS
            </span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center text-white font-bold text-xs">
              JM
            </div>
            <span className="text-sm">
              <strong>Joel Media</strong> - Custom Development
            </span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">
              API
            </div>
            <span className="text-sm">
              <strong>Web Services</strong> - Real-time Integration
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-400">
          Dashboard ini menggunakan Moodle Web Services API untuk real-time data
          synchronization
          <br />
          Semua data bersumber dari Moodle database tables (mdl_*) dengan
          encryption & authentication
        </div>
      </footer>
    </div>
  );
};

export default App;

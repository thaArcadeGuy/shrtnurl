import { useUser, useAuth } from '@clerk/clerk-react'

export default function Dashboard() {
  const { user } = useUser()
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.firstName || user?.username}!</h1>
            <p className="text-gray-600 mt-1">Manage your shortened links</p>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Sign Out
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 text-sm">Total Links</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 text-sm">Total Clicks</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 text-sm">QR Codes</p>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        {/* Create Link Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Short Link</h2>
          <div className="flex gap-4">
            <input
              type="url"
              placeholder="https://your-long-url.com/..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#df2582]"
            />
            <button className="px-6 py-2 bg-[#df2582] text-white rounded-lg hover:bg-[#c01e6f] transition">
              Shorten
            </button>
          </div>
        </div>

        {/* Links Table - Coming Soon */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-center text-gray-500 py-8">
            No links yet. Create your first short link above!
          </p>
        </div>
      </div>
    </div>
  )
}
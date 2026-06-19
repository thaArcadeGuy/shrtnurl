import { useState } from "react"
import { useUser, useAuth } from "@clerk/clerk-react"
import  {useQuery, useMutation} from "convex/react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"

export default function Dashboard() {
  const { user } = useUser()
  const { signOut } = useAuth()
  const [originalUrl, setOriginalUrl] = useState("")
  const [customSlug, setCustomSlug] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const links = useQuery(api.links.getUserLinks) || []
  const createLink = useMutation(api.links.createLink)
  const deleteLink = useMutation(api.links.deleteLink)

  const CONVEX_SITE_URL = import.meta.env.VITE_CONVEX_SITE_URL

  const handleCreateLink = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!originalUrl) return

    setIsCreating(true)
    try {
      const result = await createLink({
        originalUrl,
        customSlug: customSlug || undefined,
      })

      console.log(`original URL: ${originalUrl}`)
      console.log(`custom slug ${customSlug}`)

      console.log(`Convex URL: ${CONVEX_SITE_URL}`)

      alert(`Success! Your short link: ${CONVEX_SITE_URL}/${result.slug}`)
      setOriginalUrl("")
      setCustomSlug("")
    } catch (error) {
      alert(error instanceof Error ? error.message: "Failed to create link")
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async (linkId: Id<"links">) => {
    if (confirm('Are you sure you want to delete this link?')) {
      await deleteLink({ linkId })
    }
  }

  const copyToClipboard = (slug: string) => {
    const url = `${CONVEX_SITE_URL}/${slug}`
    navigator.clipboard.writeText(url)
    alert("Copied to clipboard")
  }

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
            <p className="text-3xl font-bold">{links.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 text-sm">Total Clicks</p>
            <p className="text-3xl font-bold">
              {links.reduce((sum, link) => sum + (link.clicks || 0), 0)}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 text-sm">QR Codes</p>
            <p className="text-3xl font-bold">{links.length}</p>
          </div>
        </div>

        {/* Create Link Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Short Link</h2>
          <form onSubmit={handleCreateLink} className="flex gap-4">
            <input
              type="url"
              placeholder="https://your-long-url.com/..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#df2582]"
            />
            <input 
              type="text"
              placeholder="Custom slug (optional)"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value.toLowerCase())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#df2582]"
            />
            <button 
              type="submit"
              disabled={isCreating}
              className="px-6 py-2 bg-[#df2582] text-white rounded-lg hover:bg-[#c01e6f] transition disabled:opacity-50"
            >
              {isCreating ? "Creating..." : "Shorten"}
            </button>
          </form>
        </div>

        {/* Links Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Short URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Original URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {links.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 py-8">
                      No links yet. Create your first short link above!
                    </td>
                  </tr>
                ) : (
                  links.map((link) => (
                    <tr key={link._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <a 
                          href={`${CONVEX_SITE_URL}/${link.slug}`}
                          target="_blank"
                          className="text-[#df2582] hover:underline"
                        >
                          {CONVEX_SITE_URL}/{link.slug}
                        </a>
                      </td>
                      <td className="px-6 py-4 truncate max-w-xs">{link.originalUrl}</td>
                      <td className="px-6 py-4 font-semibold">{link.clicks}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyToClipboard(link.slug)}
                            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                          >
                            Copy
                          </button>
                          <button 
                            onClick={() => handleDelete(link._id)}
                            className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
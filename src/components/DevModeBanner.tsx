export default function DevModeBanner() {
  const isDevKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.startsWith("pk_test_")

  if (!isDevKey) return null

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-800">
      Running on Clerk development keys — production auth requires a custom domain.{" "}
      <a 
        href="https://github.com/thaArcadeGuy/shrtnurl#known-limitations"
        target="_blank"
        rel="noreferrer"
        className="underline font-medium"
      >
        Details
      </a>
    </div>
  )
}
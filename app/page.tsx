import fs from "fs"
import path from "path"
import Link from "next/link"

import MarkdownContent from "./components/MarkdownContent"

export default function Home() {
  // Read the README.md file content
  const readmePath = path.join(process.cwd(), "README.md")
  const readmeContent = fs.readFileSync(readmePath, "utf8")

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 py-4 border-b">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">
          Habyt Frontend Take-Home Assignment
        </h1>
        <Link
          href="/listings"
          className="inline-block rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors"
        >
          Go to Listings Page
        </Link>
      </header>

      <main>
        <MarkdownContent markdown={readmeContent} />
      </main>

      <footer className="mt-16 pt-6 border-t text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Habyt. All rights reserved.</p>
      </footer>
    </div>
  )
}

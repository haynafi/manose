import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex space-x-4">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
          <li><Link href="/inventory" className="text-blue-600 hover:text-blue-800">Inventory</Link></li>
          <li><Link href="/pic" className="text-blue-600 hover:text-blue-800">PIC</Link></li>
          <li><Link href="/about" className="text-blue-600 hover:text-blue-800">About</Link></li>
        </ul>
      </nav>
    </header>
  )
}


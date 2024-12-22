'use client'

import Layout from './components/layout'
import InventoryTable from './components/inventory-table'

export default function Home() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Inventory Management PMI</h1>
      <InventoryTable />
    </Layout>
  )
}


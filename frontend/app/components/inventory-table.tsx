'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { HandIcon, PlusIcon } from 'lucide-react'
import BorrowModal from './borrow-modal'
import AddInventoryModal from './add-inventory-modal'
import { fetchInventory, addInventoryItem } from '../api/api'

interface InventoryItem {
  items_id: number;
  items_name: string;
  category: string;
  first_stock: number;
  unit: string;
}

export default function InventoryTable() {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const data = await fetchInventory();
      setInventoryData(data);
    } catch (error) {
      console.error('Failed to load inventory:', error);
    }
  };

  const handleAddItem = async (newItem: Omit<InventoryItem, 'items_id'>) => {
    try {
      await addInventoryItem(newItem);
      await loadInventory();
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Button onClick={() => setShowAddModal(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Current Inventory</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryData.map((item) => (
              <TableRow key={item.items_id}>
                <TableCell>{item.items_id}</TableCell>
                <TableCell>{item.items_name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.first_stock}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedItem(item)}
                  >
                    <HandIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedItem && (
        <BorrowModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
      {showAddModal && (
        <AddInventoryModal
          onClose={() => setShowAddModal(false)}
          onAddItem={handleAddItem}
        />
      )}
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { HandIcon, PlusIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { fetchPIC, addPIC } from '../api/api'
import AddPICModal from './add-modal'

interface PIC {
  pic_id: number;
  pic_name: string;
  pic_phone_number: string;
  pic_email: string;
  pic_unit: string;
}

export default function PICPage() {
  const [picData, setPicData] = useState<PIC[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadPICData();
  }, []);

  const loadPICData = async () => {
    try {
      const data = await fetchPIC();
      setPicData(data);
    } catch (error) {
      console.error('Failed to load PIC data:', error);
    }
  };

  const handleAddItem = async (newItem: Omit<PIC, 'pic_id'>) => {
      try {
        await addPIC(newItem);
        await loadPICData();
        setShowAddModal(false);
      } catch (error) {
        console.error('Failed to add item:', error);
      }
    };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">PIC Data</h1>
      <div className="mb-4">
        <Button onClick={() => setShowAddModal(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New PIC
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>List of PIC</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {picData.map((pic) => (
              <TableRow key={pic.pic_id}>
                <TableCell>{pic.pic_id}</TableCell>
                <TableCell>{pic.pic_name}</TableCell>
                <TableCell>{pic.pic_phone_number}</TableCell>
                <TableCell>{pic.pic_email}</TableCell>
                <TableCell>{pic.pic_unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {showAddModal && (
          <AddPICModal
            onClose={() => setShowAddModal(false)}
            onAddPIC={handleAddItem}
          />
        )}
      </div>
    </Layout>
  )
}


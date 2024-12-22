import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AddPICModalProps {
  onClose: () => void;
  onAddPIC: (pic: {
    pic_name: string;
    pic_phone_number: string;
    pic_email: string;
    pic_unit: string;
  }) => void;
}

export default function AddPICModal({ onClose, onAddPIC }: AddPICModalProps) {
  const [pic_name, setName] = useState('')
  const [pic_phone_number, setPhoneNumber] = useState('')
  const [pic_email, setEmail] = useState('')
  const [pic_unit, setUnit] = useState('')

  const handleAddItem = () => {
    onAddPIC({
      pic_name,
      pic_phone_number,
      pic_email,
      pic_unit,
    });
    onClose();
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New PIC</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={pic_name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone_number" className="text-right">
              Phone Number
            </Label>
            <Input
              id="phone_number"
              value={pic_phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={pic_email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="unit" className="text-right">
              Unit
            </Label>
            <Input
              id="unit"
              value={pic_unit}
              onChange={(e) => setUnit(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddItem}>Add PIC</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// Sample data for PIC options
const picOptions = [
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'bob', label: 'Bob Johnson' },
]

export default function BorrowModal({ item, onClose }) {
  const [quantity, setQuantity] = useState(1)
  const [pic, setPic] = useState('')

  const handleBorrow = () => {
    // Here you would typically send this data to your backend
    console.log(`Borrowing ${quantity} of ${item.name}. PIC: ${pic}`)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Borrow {item.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              className="col-span-3"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min={1}
              max={item.quantity}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pic" className="text-right">
              PIC
            </Label>
            <Select onValueChange={setPic} value={pic}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a person in charge" />
              </SelectTrigger>
              <SelectContent>
                {picOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleBorrow}>Borrow</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


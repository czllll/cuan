import { Suspense } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import CpuList from '@/components/CpuList'

export default function ComponentsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="搜索配件..." 
              className="w-64"
            />
            <Button size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">价格从低到高</SelectItem>
              <SelectItem value="price-desc">价格从高到低</SelectItem>
              <SelectItem value="newest">最新上架</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="cpu" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cpu">CPU</TabsTrigger>
          <TabsTrigger value="gpu">显卡</TabsTrigger>
          <TabsTrigger value="motherboard">主板</TabsTrigger>
          <TabsTrigger value="memory">内存</TabsTrigger>
          <TabsTrigger value="storage">存储</TabsTrigger>
          <TabsTrigger value="psu">电源</TabsTrigger>
          <TabsTrigger value="case">机箱</TabsTrigger>
          <TabsTrigger value="cooling">散热器</TabsTrigger>
        </TabsList>

        <TabsContent value="cpu" className="space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            <CpuList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
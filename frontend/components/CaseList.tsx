'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'
import { formatCaseSpecs } from '@/utils/format'
import { CaseSpecs } from '@/types/hardwareTypes'

interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
  }
  
  interface PageResponse<T> {
    records: T[];
    total: number;
    size: number;
    current: number;
    pages: number;
  }

  async function getCaseSpecs(page: number, size: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/caseItem-specs/page?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!res.ok) throw new Error('Failed to fetch CPU specs')
    const data: BaseResponse<PageResponse<CaseSpecs>> = await res.json()
    if (data.code !== 200) {  // 检查 200 而不是 0
      throw new Error(data.message)
    }
    return data.data
  }
  

export default function CaseList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [data, setData] = useState<PageResponse<CaseSpecs> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const result = await getCaseSpecs(currentPage, 10)
        setData(result)
      } catch (error) {
        console.error('Failed to fetch CPU specs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage])

  const handlePageChange = (newPage: number) => {
    router.push(`/components?page=${newPage}`)
  }

  if (loading) {
    return (
      <Card className="col-span-full p-8">
        <div className="text-center">Loading CPU specifications...</div>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card className="col-span-full p-8">
        <div className="text-center">Failed to load CPU specifications</div>
      </Card>
    )
  }

  return (
    <div>
      {/* 筛选器 */}
      <Card className="p-4 mb-4">
        <div className="flex flex-wrap gap-4">
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="品牌" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amd">AMD</SelectItem>
              <SelectItem value="intel">Intel</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="价格区间" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-500">500元以下</SelectItem>
              <SelectItem value="500-1000">500-1000元</SelectItem>
              <SelectItem value="1000-2000">1000-2000元</SelectItem>
              <SelectItem value="2000+">2000元以上</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* CPU 列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {data.records.map(caseItem => (
    <Card key={caseItem.id} className="p-4">
      <div className="relative w-full h-48 bg-muted rounded-lg mb-4 overflow-hidden">
      <Image
        src={caseItem.imageUrl || '/images/caseItem-placeholder.jpg'}
        alt={caseItem.modelName}
        fill
        className="object-contain hover:scale-105 transition-transform duration-200"
        loading="lazy"
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            const target = e.currentTarget;
            target.src = '/images/caseItem-placeholder.jpg';
        }}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg">{caseItem.modelName}</h3>
            <p className="text-sm text-muted-foreground">{caseItem.manufacturer}</p>
          </div>
          <div className="text-lg font-bold text-primary">
            ¥{caseItem.msrp.toFixed(2)}
          </div>
        </div>
        
        <div className="space-y-1 text-sm text-muted-foreground">
          {Object.entries(formatCaseSpecs(caseItem.specs)).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span>{key}:</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>

        <Link href={`/hardware/${caseItem.id}`} className="block mt-4">
          <Button className="w-full">查看详情</Button>
        </Link>
      </div>
    </Card>
  ))}
</div>

      {/* 分页 */}
      <div className="flex justify-center mt-4 space-x-2">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          上一页
        </Button>
        <div className="flex items-center px-4">
          第 {currentPage} 页，共 {Math.ceil(data.total / data.size)} 页
        </div>
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * data.size >= data.total}
        >
          下一页
        </Button>
      </div>
    </div>
  )
}

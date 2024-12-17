import React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ComponentRowProps {
  label: string;
  product: {
    name: string;
    price: number;
    image?: string;
  };
  onReplace?: () => void;
}

function ComponentRow({ label, product, onReplace }: ComponentRowProps) {
  return (
    <div className="flex items-center py-6 border-b last:border-b-0">
      <div className="w-28 text-muted-foreground font-medium">{label}</div>
      <div className="flex-1 flex items-center">
        <div className="w-20 h-20 bg-muted rounded-lg mr-4 relative overflow-hidden flex items-center justify-center">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-muted-foreground">无图片</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium truncate">{product.name}</h3>
          <div className="text-lg font-bold text-primary mt-1">
            ¥{product.price.toFixed(2)}
          </div>
        </div>
        <Button 
          variant="outline" 
          className="ml-4"
          onClick={onReplace}
        >
          更换
        </Button>
      </div>
    </div>
  )
}

export default function BuildDetailPage() {
  // 模拟数据，实际应该从 API 获取
  const build = {
    id: "1",
    title: "性价比方案",
    totalPrice: 1999,
    components: {
      cpu: {
        name: "AMD Ryzen 5 5600G",
        price: 899,
      },
      cooler: {
        name: "利民 AX120 SE",
        price: 129,
      },
      motherboard: {
        name: "MSI B550M PRO-VDH WIFI",
        price: 699,
      },
      memory: {
        name: "光威天策 16GB(8GB×2) DDR4 3200MHz",
        price: 299,
      },
      storage: {
        name: "西数蓝盘 1TB + 光威弈Pro 512GB NVMe SSD",
        price: 599,
      },
      gpu: {
        name: "集成显卡",
        price: 0,
      },
      psu: {
        name: "长城 500W 80Plus 铜牌",
        price: 299,
      },
      case: {
        name: "先马趣造 MINI",
        price: 199,
      },
    },
    analysis: {
      performance: "基础办公性能，满足日常使用",
      compatibility: "所有配件兼容性良好",
      upgrade: "后续可添加独立显卡提升性能",
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* 返回按钮和标题 */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回配置列表
        </Link>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{build.title}</h1>
          <div className="text-2xl font-bold text-primary">
            ¥{build.totalPrice.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 配件列表 */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="divide-y">
              <ComponentRow label="CPU" product={build.components.cpu} />
              <ComponentRow label="CPU散热" product={build.components.cooler} />
              <ComponentRow label="主板" product={build.components.motherboard} />
              <ComponentRow label="内存" product={build.components.memory} />
              <ComponentRow label="存储" product={build.components.storage} />
              <ComponentRow label="显卡" product={build.components.gpu} />
              <ComponentRow label="电源" product={build.components.psu} />
              <ComponentRow label="机箱" product={build.components.case} />
            </div>
          </Card>
        </div>

        {/* 配置分析 */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">性能分析</h2>
            <p className="text-muted-foreground">
              {build.analysis.performance}
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">兼容性检查</h2>
            <div className="flex items-start space-x-2 text-green-600">
              <AlertCircle className="h-5 w-5 mt-0.5" />
              <p>{build.analysis.compatibility}</p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">升级建议</h2>
            <p className="text-muted-foreground">
              {build.analysis.upgrade}
            </p>
          </Card>
        </div>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        * 价格仅供参考，请以实际购买时为准
      </div>
    </div>
  )
}
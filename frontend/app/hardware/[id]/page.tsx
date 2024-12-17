import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Share2 } from "lucide-react";

export default function HardwareDetailPage() {
  // 模拟商品数据
  const product = {
    id: "1",
    name: "AMD Ryzen 5 5600G",
    brand: "AMD",
    price: 899,
    images: ["/api/placeholder/600/400"],
    specs: {
      cores: "6核12线程",
      baseFrequency: "3.9GHz",
      maxFrequency: "4.4GHz",
      cache: "16MB L3",
      tdp: "65W",
      architecture: "Zen 3",
      process: "7nm",
      socket: "AM4",
      igpu: "Radeon Graphics (7 CUs)"
    },
    description: "AMD Ryzen 5 5600G 是一款集成显卡的桌面处理器，基于 Zen 3 架构...",
    features: [
      "7nm制程工艺",
      "Zen 3架构",
      "集成Radeon显卡",
      "支持PCIe 3.0"
    ],
    recommendedUse: [
      "家用办公",
      "轻度游戏",
      "小型工作站",
      "ITX紧凑型主机"
    ]
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* 返回链接 */}
      <Link href="/hardware" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        返回硬件列表
      </Link>

      {/* 产品基本信息 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 左侧图片 */}
        <div className="relative aspect-4/3 bg-muted rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* 右侧信息 */}
        <div className="space-y-6">
          <div>
            <div className="text-sm text-muted-foreground mb-2">{product.brand}</div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-primary">¥{product.price}</span>
              <span className="text-sm text-muted-foreground">参考价</span>
            </div>
          </div>

          {/* 核心规格 */}
          <Card className="p-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">核心/线程</div>
              <div className="font-medium">{product.specs.cores}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">基础频率</div>
              <div className="font-medium">{product.specs.baseFrequency}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">最大加速</div>
              <div className="font-medium">{product.specs.maxFrequency}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">功耗</div>
              <div className="font-medium">{product.specs.tdp}</div>
            </div>
          </Card>

          {/* 操作按钮 */}
          <div className="flex space-x-4">
            <Button className="flex-1" size="lg">加入配置单</Button>
            <Button variant="outline" size="lg" className="w-12">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="w-12">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* 详细信息标签页 */}
      <Tabs defaultValue="specs" className="mt-8">
        <TabsList>
          <TabsTrigger value="specs">规格参数</TabsTrigger>
          <TabsTrigger value="desc">详细介绍</TabsTrigger>
          <TabsTrigger value="recommend">推荐用途</TabsTrigger>
        </TabsList>

        <TabsContent value="specs" className="mt-6">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">
                    {key === 'cores' ? '核心/线程' :
                     key === 'baseFrequency' ? '基础频率' :
                     key === 'maxFrequency' ? '最大频率' :
                     key === 'cache' ? '三级缓存' :
                     key === 'tdp' ? '功耗' :
                     key === 'architecture' ? '架构' :
                     key === 'process' ? '制程' :
                     key === 'socket' ? '接口' :
                     key === 'igpu' ? '集成显卡' : key}
                  </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="desc" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">产品特点</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p className="text-muted-foreground">{product.description}</p>
          </Card>
        </TabsContent>

        <TabsContent value="recommend" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">推荐使用场景</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.recommendedUse.map((use, index) => (
                <Card key={index} className="p-4">
                  <div className="font-medium">{use}</div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
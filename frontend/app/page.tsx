'use client'
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { Typewriter } from '@/components/Typewriter'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface PcComponents {
  cpu: string
  cooler: string
  motherboard: string
  memory: string
  storage: string[]
  gpu: string
  psu: string
  case: string
}

interface BuildRecommendation {
  title: string
  components: PcComponents
  totalPrice: number
  explanation: string
}

export default function PCBuilderPage () {
  const [userInput, setUserInput] = useState('')
  const [results, setResults] = useState<BuildRecommendation[] | null>(null)
  const [loading, setLoading] = useState(false)

  const exampleTexts = [
    '我想装一台电脑，主要用来打游戏和直播，预算8000...',
    '需要一台办公电脑，经常处理文档和表格，预算3000...',
    '想组装一台高性能主机，用来剪视频和3D建模，预算12000...',
    '配置一台家用电脑，主要看视频、网购，要求安静节能...'
  ]

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // 模拟三个配置方案
      const mockResults: BuildRecommendation[] = [
        {
          title: '性价比方案',
          components: {
            cpu: 'AMD Ryzen 5 5600G',
            cooler: '利民 AX120 SE',
            motherboard: 'MSI B550M PRO-VDH WIFI',
            memory: '光威天策 16GB(8GB×2) DDR4 3200MHz',
            storage: ['西数蓝盘 1TB', '光威弈Pro 512GB NVMe SSD'],
            gpu: '集成显卡',
            psu: '长城 500W 80Plus 铜牌',
            case: '先马趣造 MINI'
          },
          totalPrice: 1999,
          explanation: '性价比最优的方案，使用集显满足基本需求。'
        },
        {
          title: '均衡方案',
          components: {
            cpu: 'Intel i5-12400F',
            cooler: '利民 AX120 SE',
            motherboard: '铭瑄 B660M WIFI',
            memory: '光威天策 16GB(8GB×2) DDR4 3200MHz',
            storage: ['西数蓝盘 2TB', '光威弈Pro 512GB NVMe SSD'],
            gpu: '耕升 GTX 1650',
            psu: '长城 550W 80Plus 铜牌',
            case: '先马趣造 MINI'
          },
          totalPrice: 2499,
          explanation: '添加独立显卡，更好的游戏性能。'
        },
        {
          title: '性能方案',
          components: {
            cpu: 'Intel i5-12400F',
            cooler: '利民 AX120 R',
            motherboard: '铭瑄 B660M WIFI',
            memory: '光威天策 32GB(16GB×2) DDR4 3200MHz',
            storage: ['西数蓝盘 4TB', '光威弈Pro 1TB NVMe SSD'],
            gpu: '七彩虹 RTX 3050',
            psu: '长城 650W 80Plus 铜牌',
            case: '先马趣造 MINI'
          },
          totalPrice: 2999,
          explanation: '更大容量存储和更好的显卡性能。'
        }
      ]

      await new Promise(resolve => setTimeout(resolve, 1000))
      setResults(mockResults)
    } finally {
      setLoading(false)
    }
  }

  const ComponentItem = ({
    label,
    value
  }: {
    label: string
    value: string | string[]
  }) => (
    <div className='flex justify-between text-sm'>
      <span className='text-gray-600'>{label}</span>
      <span className='font-medium'>
        {Array.isArray(value) ? value.join(' + ') : value}
      </span>
    </div>
  )

  return (
    <div className='container mx-auto py-8 px-4'>
      <div className='max-w-3xl mx-auto mb-8'>
        <h1 className='text-3xl font-bold mb-6'>输入你的需求</h1>
        <Typewriter texts={exampleTexts} />
        <div className='space-y-4'>
          <Textarea
            placeholder='比如：不玩大型游戏，主要看视频和直播，需要大容量存储，预算2000左右...'
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            className='min-h-[100px]'
          />
          <Button
            className='w-full'
            size='lg'
            onClick={handleSubmit}
            disabled={!userInput.trim() || loading}
          >
            {loading ? '生成推荐配置中...' : '获取推荐配置'}
          </Button>
        </div>
      </div>

      {results && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
          {results.map((result, index) => (
            <Card key={index} className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold'>{result.title}</h2>
                <span className='text-lg font-bold text-primary'>
                  ¥{result.totalPrice}
                </span>
              </div>
              <div className='space-y-2 mb-4'>
                <ComponentItem label='CPU' value={result.components.cpu} />
                <ComponentItem
                  label='CPU散热'
                  value={result.components.cooler}
                />
                <ComponentItem
                  label='主板'
                  value={result.components.motherboard}
                />
                <ComponentItem label='内存' value={result.components.memory} />
                <ComponentItem label='存储' value={result.components.storage} />
                <ComponentItem label='显卡' value={result.components.gpu} />
                <ComponentItem label='电源' value={result.components.psu} />
                <ComponentItem label='机箱' value={result.components.case} />
              </div>
              <p className='text-sm text-gray-600 py-2'>{result.explanation}</p>
              <div className='w-full flex justify-end'>
                <Button asChild
                  variant='ghost'
                  size='sm'
                  className='hover:bg-gray-200 bg-gray-100 flex items-center gap-1'
                >
                    <div>
                            <Link href={"/builds/1"}>
                                查看详情
                            </Link>
                        <ChevronRight className='h-4 w-4' />
                    </div>

                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

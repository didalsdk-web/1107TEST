"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const visualItems = [
  {
    id: "design",
    title: "디자인",
    description: "혁신적이고 아름다운 디자인 솔루션",
    content: "사용자 중심의 직관적인 디자인으로 브랜드의 가치를 전달합니다. 최신 디자인 트렌드를 반영하여 시각적으로 매력적인 인터페이스를 제공합니다.",
    icon: "🎨",
  },
  {
    id: "development",
    title: "개발",
    description: "견고하고 확장 가능한 웹 솔루션",
    content: "최신 기술 스택을 활용하여 성능과 보안을 모두 고려한 웹 애플리케이션을 개발합니다. 반응형 디자인으로 모든 디바이스에서 완벽하게 작동합니다.",
    icon: "💻",
  },
  {
    id: "strategy",
    title: "전략",
    description: "비즈니스 목표를 달성하는 전략적 접근",
    content: "데이터 기반의 인사이트를 바탕으로 비즈니스 성장을 위한 맞춤형 전략을 수립합니다. 사용자 경험과 비즈니스 목표의 균형을 맞춥니다.",
    icon: "📊",
  },
]

export default function Visual() {
  const [activeTab, setActiveTab] = useState("design")

  return (
    <section id="visual" className="py-20 relative overflow-hidden">
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#2c2c54] to-[#3a3a5e] opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-12 text-center mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-[#4a90e2] via-[#6a5acd] to-[#8a2be2] bg-clip-text text-transparent">
              비주얼 솔루션
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            창의적이고 전문적인 디지털 경험을 제공합니다
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* GitHub 탭 제거 전 스타일 적용: 3개 탭, grid-cols-3, 동일한 스타일 */}
            <TabsList className="grid w-full grid-cols-3 bg-[#2c2c54] mb-8">
              {visualItems.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/60 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/10 transition-colors"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {visualItems.map((item) => (
              <TabsContent key={item.id} value={item.id} className="mt-6">
                <Card className="bg-[#2c2c54]/80 border-[#3a3a5e] backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{item.icon}</span>
                      <div>
                        <CardTitle className="text-2xl text-white">{item.title}</CardTitle>
                        <CardDescription className="text-white/70 mt-1">
                          {item.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* 추가 비주얼 요소 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {visualItems.map((item, index) => (
            <div
              key={item.id}
              className={`p-6 rounded-lg bg-[#2c2c54]/50 border border-[#3a3a5e] hover:border-primary/50 transition-all duration-300 ${
                activeTab === item.id ? "border-primary scale-105" : ""
              }`}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


"use client"

import { Code, Palette, Smartphone, BarChart3 } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "UI/UX 디자인",
    description: "사용자가 사랑하는 아름답고 직관적인 디자인입니다. 전환을 이끌어내는 경험을 만듭니다.",
  },
  {
    icon: Code,
    title: "웹 개발",
    description: "최신 기술과 모범 사례로 만든 현대적이고 성능 좋은 웹사이트입니다.",
  },
  {
    icon: Smartphone,
    title: "모바일 앱",
    description: "네이티브 및 크로스플랫폼 모바일 애플리케이션으로 성과를 달성합니다.",
  },
  {
    icon: BarChart3,
    title: "디지털 전략",
    description: "비즈니스 성장을 돕고 목표 달성을 위한 전략적 컨설팅입니다.",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-[#2c2c54]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">제공하는 서비스</h2>
          <p className="text-xl text-muted-foreground">
            당신의 브랜드를 높이고 고객과 연결하기 위한 포괄적인 디지털 솔루션입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="p-8 bg-background border border-border rounded-lg hover:shadow-lg hover:border-primary/50 transition duration-300 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

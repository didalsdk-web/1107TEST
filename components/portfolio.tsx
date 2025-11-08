"use client"

import { Calendar, Code, FileText, User, Clock, Palette, Smartphone } from "lucide-react"
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline"
import type { TimelineItem } from "@/components/ui/radial-orbital-timeline"

const projects = [
  {
    title: "이커머스 플랫폼",
    category: "웹 개발",
    description: "원활한 결제 흐름을 가진 현대적인 쇼핑 경험입니다.",
    image: "/ecommerce-platform-design.png",
  },
  {
    title: "SaaS 대시보드",
    category: "UI/UX 디자인",
    description: "데이터 기반의 의사결정을 위한 분석 대시보드입니다.",
    image: "/saas-dashboard-analytics.jpg",
  },
  {
    title: "모바일 뱅킹 앱",
    category: "모바일 개발",
    description: "안전하고 직관적인 금융 관리 앱입니다.",
    image: "/mobile-banking-app.png",
  },
  {
    title: "브랜드 아이덴티티",
    category: "디자인 전략",
    description: "새로운 시각 언어를 갖춘 완벽한 브랜드 리뉴얼입니다.",
    image: "/brand-identity-design-system.png",
  },
  {
    title: "콘텐츠 플랫폼",
    category: "풀스택",
    description: "크리에이터를 위한 미디어 관리 플랫폼입니다.",
    image: "/content-platform-interface.jpg",
  },
  {
    title: "부동산 포털",
    category: "웹 개발",
    description: "부동산 매물 및 관리 시스템입니다.",
    image: "/real-estate-portal-design.jpg",
  },
]

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: projects[0].title,
    date: "2024년 1월",
    content: projects[0].description,
    category: projects[0].category,
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
    image: projects[0].image,
  },
  {
    id: 2,
    title: projects[1].title,
    date: "2024년 2월",
    content: projects[1].description,
    category: projects[1].category,
    icon: Palette,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
    image: projects[1].image,
  },
  {
    id: 3,
    title: projects[2].title,
    date: "2024년 3월",
    content: projects[2].description,
    category: projects[2].category,
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 75,
    image: projects[2].image,
  },
  {
    id: 4,
    title: projects[3].title,
    date: "2024년 4월",
    content: projects[3].description,
    category: projects[3].category,
    icon: User,
    relatedIds: [3, 5],
    status: "pending",
    energy: 40,
    image: projects[3].image,
  },
  {
    id: 5,
    title: projects[4].title,
    date: "2024년 5월",
    content: projects[4].description,
    category: projects[4].category,
    icon: Clock,
    relatedIds: [4, 6],
    status: "pending",
    energy: 30,
    image: projects[4].image,
  },
  {
    id: 6,
    title: projects[5].title,
    date: "2024년 6월",
    content: projects[5].description,
    category: projects[5].category,
    icon: Smartphone,
    relatedIds: [5],
    status: "pending",
    energy: 10,
    image: projects[5].image,
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">저희의 작업</h2>
          <p className="text-xl text-muted-foreground">
            최근 프로젝트들을 살펴보고 저희가 무엇을 만들 수 있는지 확인해보세요.
          </p>
        </div>

        {/* RadialOrbitalTimeline 추가 */}
        <div className="mb-16 bg-[#2c2c54]/30 rounded-lg p-8 border border-[#3a3a5e]">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>

        {/* 기존 프로젝트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg bg-muted">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-200 mb-3">{project.description}</p>
                <span className="text-xs font-semibold text-primary inline-w-fit">{project.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

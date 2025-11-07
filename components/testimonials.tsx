"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "김민정",
    role: "CEO, 기술 스타트업",
    content: "처음부터 끝까지 탁월한 작업이었습니다. 팀이 저희 비전을 이해하고 기대 이상으로 전달했습니다.",
    rating: 5,
  },
  {
    name: "이승호",
    role: "제품 담당자, SaaS",
    content: "전문적이고 창의적이며 반응이 빠릅니다. 저희 제품을 정말 특별한 것으로 만들어주었습니다.",
    rating: 5,
  },
  {
    name: "박지은",
    role: "창업자, 이커머스",
    content: "세부 사항에 대한 관심이 뛰어났습니다. 리디자인 후 전환율이 크게 증가했습니다.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">우리 고객들의 평가</h2>
          <p className="text-xl text-muted-foreground">저희와 함께 일한 파트너들의 의견을 확인해보세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 bg-background border border-border rounded-lg">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

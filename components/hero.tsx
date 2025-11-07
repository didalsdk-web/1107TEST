"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '@/lib/firebase'

// 카운트업 애니메이션 훅
function useCountUp(targetValue: number, duration: number = 800) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const previousValueRef = useRef<number>(0)

  useEffect(() => {
    // 값이 변경되었을 때만 애니메이션 시작
    if (targetValue === previousValueRef.current) return
    
    const startValue = previousValueRef.current
    const endValue = targetValue
    previousValueRef.current = targetValue

    // 이전 애니메이션 취소
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
    }

    startTimeRef.current = undefined

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // easeOutCubic 함수로 부드러운 애니메이션
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutCubic)

      setCount(currentCount)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(endValue)
        startTimeRef.current = undefined
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [targetValue, duration])

  return count
}

export default function Hero() {
  const [stats, setStats] = useState({
    completedProjects: 252,
    satisfiedCustomers: 152,
    industryExperience: "5년",
    customerSupport: "24/7",
    visitors: 123,
  })
  const [loading, setLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)

  // 카운트업 애니메이션 값들
  const completedProjectsCount = useCountUp(stats.completedProjects, 800)
  const satisfiedCustomersCount = useCountUp(stats.satisfiedCustomers, 800)
  const visitorsCount = useCountUp(stats.visitors, 800)

  useEffect(() => {
    const updateStatistics = async () => {
      // 클라이언트 사이드에서만 실행
      if (typeof window === 'undefined') return
      
      // db가 초기화되지 않았으면 기본값 사용
      if (!db) {
        setLoading(false)
        return
      }

      try {
        const statsRef = doc(db, 'statistics', 'counters')
        const statsSnap = await getDoc(statsRef)

        if (statsSnap.exists()) {
          // 기존 데이터가 있으면 증가
          const currentData = statsSnap.data()
          await updateDoc(statsRef, {
            completedProjects: increment(1),
            satisfiedCustomers: increment(1),
            visitors: increment(1),
          })

          // 업데이트된 값 계산 (increment는 서버에서 처리되므로 현재 값 + 1)
          const newStats = {
            completedProjects: (currentData.completedProjects || 252) + 1,
            satisfiedCustomers: (currentData.satisfiedCustomers || 152) + 1,
            industryExperience: currentData.industryExperience || "5년",
            customerSupport: currentData.customerSupport || "24/7",
            visitors: (currentData.visitors || 123) + 1,
          }
          setStats(newStats)
          setHasLoaded(true)
        } else {
          // 초기 데이터 설정
          const initialStats = {
            completedProjects: 253,
            satisfiedCustomers: 153,
            visitors: 124,
            industryExperience: "5년",
            customerSupport: "24/7",
          }
          await setDoc(statsRef, initialStats)
          setStats({
            completedProjects: initialStats.completedProjects,
            satisfiedCustomers: initialStats.satisfiedCustomers,
            industryExperience: initialStats.industryExperience,
            customerSupport: initialStats.customerSupport,
            visitors: initialStats.visitors,
          })
          setHasLoaded(true)
        }
      } catch (error) {
        console.error('통계 업데이트 중 오류 발생:', error)
        // 에러 발생 시 기본값 유지
      } finally {
        setLoading(false)
      }
    }

    updateStatistics()
  }, [])
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 pb-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        <div className="space-y-8 mb-16">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-[#4a90e2] via-[#6a5acd] to-[#8a2be2] bg-clip-text text-transparent">
              디지털 경험을
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#9370db] to-[#ba55d3] bg-clip-text text-transparent">
              창조하는 에이전시
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            혁신적인 웹 솔루션으로 비즈니스의 성장을 가속화합니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button
              onClick={() => {
                const portfolioSection = document.getElementById('portfolio')
                if (portfolioSection) {
                  portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              프로젝트 보기
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition"
            >
              문의하기
            </button>
          </div>
        </div>

        {/* 통계 섹션 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-20 pt-12 border-t border-white/20">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              {loading ? '...' : hasLoaded ? completedProjectsCount : stats.completedProjects}
            </div>
            <div className="text-sm md:text-base text-white/80">+ 완료된 프로젝트</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              {loading ? '...' : hasLoaded ? satisfiedCustomersCount : stats.satisfiedCustomers}
            </div>
            <div className="text-sm md:text-base text-white/80">+ 만족한 고객</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stats.industryExperience}</div>
            <div className="text-sm md:text-base text-white/80">업계 경험</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stats.customerSupport}</div>
            <div className="text-sm md:text-base text-white/80">고객 지원</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              {loading ? '...' : hasLoaded ? visitorsCount : stats.visitors}
            </div>
            <div className="text-sm md:text-base text-white/80">방문객</div>
          </div>
        </div>
      </div>
    </section>
  )
}

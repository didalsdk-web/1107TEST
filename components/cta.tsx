"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getDbInstance } from '@/lib/firebase'

const teamMembers = [
  {
    name: "서배준",
    role: "CEO & Founder",
    image: "/SBJ.png",
    modalImage: "/MMSBJ.png",
  },
  {
    name: "양민아",
    role: "Lead Designer",
    image: "/YMA.jpg",
    modalImage: "/MYMA.png",
  },
  {
    name: "박건휘",
    role: "Tech Lead",
    image: "/PKW.png",
    modalImage: "/MPKW.png",
  },
  {
    name: "김하온",
    role: "Marketing Director",
    image: "/KHO.png",
    modalImage: "/MKHO.png",
  },
  {
    name: "성준성",
    role: "Business Developer",
    image: "/SJS.png",
    modalImage: "/MSJS.png",
  },
]

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    message: `웹사이트 목표 : 회사 소개, 쇼핑몰, 정보 제공, 커뮤니티 등
방문자층 : 연령대, 성별, 관심사 등
사용자 경험 : 반응형, 직관형
운영 계획 : 제작 후 업데이트, 오류 수정, 보관 관리 및 유지 보수 희망 여부`,
  })

  const [isEmailOpen, setIsEmailOpen] = useState(false)
  const [isPhoneOpen, setIsPhoneOpen] = useState(false)
  const [isOfficeOpen, setIsOfficeOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  const [emailCopied, setEmailCopied] = useState(false)
  const [phoneCopied, setPhoneCopied] = useState(false)
  const [addressCopied, setAddressCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage({ type: '', text: '' })

    // 유효성 검사
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage({ type: 'error', text: '이름, 이메일, 메시지를 모두 입력해주세요.' })
      setIsSubmitting(false)
      return
    }

    try {
      // Firestore에 데이터 저장
      const dbInstance = getDbInstance()
      if (!dbInstance) {
        setSubmitMessage({ 
          type: 'error', 
          text: '데이터베이스 연결에 실패했습니다. 잠시 후 다시 시도해주세요.' 
        })
        setIsSubmitting(false)
        return
      }

      const docRef = await addDoc(collection(dbInstance, 'contacts'), {
        name: formData.name,
        contact: formData.contact,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
      })

      console.log('문의가 성공적으로 저장되었습니다. ID:', docRef.id)
      
      // 성공 메시지 표시
      setSubmitMessage({ type: 'success', text: '문의가 성공적으로 전송되었습니다!' })
      
      // 폼 초기화
      setFormData({
        name: "",
        contact: "",
        email: "",
        message: `웹사이트 목표 : 회사 소개, 쇼핑몰, 정보 제공, 커뮤니티 등
방문자층 : 연령대, 성별, 관심사 등
사용자 경험 : 반응형, 직관형
운영 계획 : 제작 후 업데이트, 오류 수정, 보관 관리 및 유지 보수 희망 여부`,
      })

      // 3초 후 메시지 숨기기
      setTimeout(() => {
        setSubmitMessage({ type: '', text: '' })
      }, 3000)
    } catch (error: any) {
      console.error('문의 저장 중 오류 발생:', error)
      setSubmitMessage({ 
        type: 'error', 
        text: '문의 전송에 실패했습니다. 다시 시도해주세요.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = async (text: string, type: 'email' | 'phone' | 'address') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'email') setEmailCopied(true)
      if (type === 'phone') setPhoneCopied(true)
      if (type === 'address') setAddressCopied(true)
      setTimeout(() => {
        if (type === 'email') setEmailCopied(false)
        if (type === 'phone') setPhoneCopied(false)
        if (type === 'address') setAddressCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <>
      {/* 우리 팀 섹션 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">우리 팀</h2>
            <p className="text-xl text-white/80">
              열정과 전문성을 가진 팀원들이 함께 만들어갑니다
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {teamMembers.map((member, index) => (
              <button
                key={index}
                onClick={() => setSelectedMember(index)}
                className="bg-[#2c2c54] border border-[#3a3a5e] rounded-lg p-6 text-center hover:border-primary transition cursor-pointer w-full"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-white/70">{member.role}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 문의하기 섹션 */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">문의하기</h2>
            <p className="text-xl text-white/80">
              프로젝트에 대해 이야기를 나눠보세요
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 왼쪽: 연락처 정보 */}
            <div className="space-y-4">
              <button
                onClick={() => setIsEmailOpen(true)}
                className="w-full bg-[#2c2c54] border border-[#3a3a5e] rounded-lg p-6 hover:border-primary transition cursor-pointer text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/70 mb-1">이메일</h3>
                    <p className="text-white">didalsdk@gmail.com</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setIsPhoneOpen(true)}
                className="w-full bg-[#2c2c54] border border-[#3a3a5e] rounded-lg p-6 hover:border-primary transition cursor-pointer text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/70 mb-1">전화</h3>
                    <p className="text-white">+82 10-7562-8514</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setIsOfficeOpen(true)}
                className="w-full bg-[#2c2c54] border border-[#3a3a5e] rounded-lg p-6 hover:border-primary transition cursor-pointer text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/70 mb-1">오피스</h3>
                    <p className="text-white">서울 강남구 압구정로11길 17 미성 1차 1004호</p>
                  </div>
                </div>
              </button>
            </div>

            {/* 오른쪽: 연락 폼 */}
            <div className="bg-[#2c2c54] border border-[#3a3a5e] rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white mb-2 block">
                    이름
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-[#1a1a2e] border-[#3a3a5e] text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="contact" className="text-white mb-2 block">
                    연락처
                  </Label>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="010-1234-5678"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="bg-[#1a1a2e] border-[#3a3a5e] text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">
                    이메일
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-[#1a1a2e] border-[#3a3a5e] text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white mb-2 block">
                    메시지
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-[#1a1a2e] border-[#3a3a5e] text-white min-h-32 resize-y"
                    rows={6}
                  />
                </div>

                {submitMessage.text && (
                  <div className={`p-4 rounded-lg ${
                    submitMessage.type === 'success' 
                      ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
                      : 'bg-red-500/20 border border-red-500/50 text-red-400'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "전송 중..." : "메시지 보내기"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 이메일 모달 */}
      <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              이메일 연락처
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="bg-[#2c2c54] border border-[#3a3a5e] rounded-lg p-4">
              <p className="text-sm text-white/70 mb-2">이메일 주소</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-white">didalsdk@gmail.com</p>
                <button
                  onClick={() => copyToClipboard('didalsdk@gmail.com', 'email')}
                  className="p-2 hover:bg-[#3a3a5e] rounded transition"
                >
                  {emailCopied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => window.location.href = 'mailto:didalsdk@gmail.com'}
                className="flex-1 bg-primary text-white"
              >
                이메일 보내기
              </Button>
              <Button
                onClick={() => copyToClipboard('didalsdk@gmail.com', 'email')}
                variant="outline"
                className="flex-1"
              >
                {emailCopied ? '복사됨!' : '복사하기'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 전화 모달 */}
      <Dialog open={isPhoneOpen} onOpenChange={setIsPhoneOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Phone className="w-6 h-6 text-primary" />
              전화 연락처
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="bg-[#2c2c54] border border-[#3a3a5e] rounded-lg p-4">
              <p className="text-sm text-white/70 mb-2">전화번호</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-white">+82 10-7562-8514</p>
                <button
                  onClick={() => copyToClipboard('+821075628514', 'phone')}
                  className="p-2 hover:bg-[#3a3a5e] rounded transition"
                >
                  {phoneCopied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => window.location.href = 'tel:+821075628514'}
                className="flex-1 bg-primary text-white"
              >
                전화 걸기
              </Button>
              <Button
                onClick={() => copyToClipboard('+821075628514', 'phone')}
                variant="outline"
                className="flex-1"
              >
                {phoneCopied ? '복사됨!' : '복사하기'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 오피스 모달 */}
      <Dialog open={isOfficeOpen} onOpenChange={setIsOfficeOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              오피스 위치
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="bg-[#2c2c54] border border-[#3a3a5e] rounded-lg p-4">
              <p className="text-sm text-white/70 mb-2">주소</p>
              <div className="flex items-start justify-between gap-2">
                <p className="text-lg font-semibold text-white">
                  서울 강남구 압구정로11길 17<br />
                  미성 1차 1004호
                </p>
                <button
                  onClick={() => copyToClipboard('서울 강남구 압구정로11길 17 미성 1차 1004호', 'address')}
                  className="p-2 hover:bg-[#3a3a5e] rounded transition flex-shrink-0"
                >
                  {addressCopied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>
            <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">지도가 여기에 표시됩니다</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const address = encodeURIComponent('서울 강남구 압구정로11길 17 미성 1차 1004호')
                  window.open(`https://map.naver.com/search/${address}`, '_blank')
                }}
                className="flex-1 bg-primary text-white"
              >
                네이버 지도 열기
              </Button>
              <Button
                onClick={() => copyToClipboard('서울 강남구 압구정로11길 17 미성 1차 1004호', 'address')}
                variant="outline"
                className="flex-1"
              >
                {addressCopied ? '복사됨!' : '주소 복사'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 팀원 모달 */}
      <Dialog open={selectedMember !== null} onOpenChange={(open) => !open && setSelectedMember(null)}>
        {selectedMember !== null && (
          <DialogContent 
            className="max-w-[600px] w-[90vw] max-h-[90vh] overflow-y-auto p-0"
            showCloseButton={false}
          >
            <div className="w-full flex items-center justify-center py-0 px-0 bg-[#1a1a2e]">
              <img
                src={teamMembers[selectedMember].modalImage}
                alt={teamMembers[selectedMember].name}
                className="w-full h-auto object-contain"
                style={{ 
                  maxWidth: '600px',
                  width: '100%',
                  display: 'block',
                  filter: 'contrast(1.1) brightness(1.05)',
                  imageRendering: 'crisp-edges'
                }}
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

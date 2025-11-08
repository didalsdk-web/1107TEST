"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/hooks/use-auth"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { user, login, signup, logout, isAuthenticated } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.email || !formData.password) {
      setError("이메일과 비밀번호를 입력해주세요.")
      setLoading(false)
      return
    }

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      setIsAuthOpen(false)
      setFormData({ email: "", password: "" })
    } else {
      setError(result.error || "로그인에 실패했습니다.")
    }
    
    setLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.email || !formData.password) {
      setError("이메일과 비밀번호를 입력해주세요.")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.")
      setLoading(false)
      return
    }

    const result = await signup(formData.email, formData.password)
    
    if (result.success) {
      setIsAuthOpen(false)
      setFormData({ email: "", password: "" })
      setActiveTab("login")
    } else {
      setError(result.error || "회원가입에 실패했습니다.")
    }
    
    setLoading(false)
  }

  const handleAuthOpen = () => {
    setIsAuthOpen(true)
    setActiveTab("login")
    setError("")
    setFormData({ email: "", password: "" })
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="fixed w-full top-0 z-50 bg-[#1a1a2e]/95 backdrop-blur border-b border-[#3a3a5e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-3xl font-bold text-white">
            BOOSTCAMP
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            <Link href="#services" className="text-sm text-foreground hover:text-primary transition">
              서비스
            </Link>
            <Link href="#portfolio" className="text-sm text-foreground hover:text-primary transition">
              포트폴리오
            </Link>
            <Link href="#about" className="text-sm text-foreground hover:text-primary transition">
              소개
            </Link>
            <Link href="#contact" className="text-sm text-foreground hover:text-primary transition">
              문의
            </Link>
                   {isAuthenticated ? (
                     <div className="flex items-center gap-4">
                       <span className="text-sm text-foreground">
                         {user?.email || user?.displayName}
                       </span>
                       <button
                         onClick={handleLogout}
                         className="text-sm text-foreground hover:text-primary transition px-3 py-1 rounded-md hover:bg-white/10"
                       >
                         로그아웃
                       </button>
                     </div>
                   ) : (
              <button
                onClick={handleAuthOpen}
                className="text-sm text-white bg-primary hover:bg-primary/90 transition px-4 py-2 rounded-md"
              >
                로그인
              </button>
            )}
          </nav>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-foreground">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="#services" className="text-sm text-foreground hover:text-primary transition">
              서비스
            </Link>
            <Link href="#portfolio" className="text-sm text-foreground hover:text-primary transition">
              포트폴리오
            </Link>
            <Link href="#about" className="text-sm text-foreground hover:text-primary transition">
              소개
            </Link>
            <Link href="#contact" className="text-sm text-foreground hover:text-primary transition">
              문의
            </Link>
                   {isAuthenticated ? (
                     <div className="flex flex-col gap-2">
                       <span className="text-sm text-foreground">
                         {user?.email || user?.displayName}
                       </span>
                       <button
                         onClick={handleLogout}
                         className="text-sm text-foreground hover:text-primary transition text-left"
                       >
                         로그아웃
                       </button>
                     </div>
                   ) : (
              <button
                onClick={() => {
                  handleAuthOpen()
                  setIsMenuOpen(false)
                }}
                className="text-sm text-white bg-primary hover:bg-primary/90 transition px-4 py-2 rounded-md text-left w-fit"
              >
                로그인
              </button>
            )}
          </nav>
        )}
      </div>

      {/* 로그인/회원가입 모달 */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">로그인 / 회원가입</DialogTitle>
          </DialogHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-2 bg-[#2c2c54]">
              <TabsTrigger 
                value="login" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/60 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/10 transition-colors"
              >
                로그인
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/60 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/10 transition-colors"
              >
                회원가입
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email" className="text-white mb-2 block">
                    이메일
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      setError("")
                    }}
                    className="bg-[#1a1a2e] border-[#3a3a5e] text-white"
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label htmlFor="login-password" className="text-white mb-2 block">
                    비밀번호
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value })
                      setError("")
                    }}
                    className="bg-[#1a1a2e] border-[#3a3a5e] text-white"
                    disabled={loading}
                  />
                </div>
                {error && activeTab === "login" && (
                  <div className="text-red-400 text-sm">{error}</div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? "로그인 중..." : "로그인"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-email" className="text-white mb-2 block">
                    이메일
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      setError("")
                    }}
                    className="bg-[#1a1a2e] border-[#3a3a5e] text-white"
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label htmlFor="signup-password" className="text-white mb-2 block">
                    비밀번호
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="비밀번호를 입력하세요 (6자 이상)"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value })
                      setError("")
                    }}
                    className="bg-[#1a1a2e] border-[#3a3a5e] text-white"
                    disabled={loading}
                  />
                </div>
                {error && activeTab === "signup" && (
                  <div className="text-red-400 text-sm">{error}</div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? "회원가입 중..." : "회원가입"}
                </Button>
              </form>
            </TabsContent>

          </Tabs>
        </DialogContent>
      </Dialog>
    </header>
  )
}

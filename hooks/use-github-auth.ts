"use client"

import { useState, useEffect } from 'react'
import { 
  User, 
  signInWithCustomToken,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { getAuthInstance } from '@/lib/firebase'

export function useGitHubAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    const authInstance = getAuthInstance()
    if (!authInstance) {
      setLoading(false)
      if (process.env.NODE_ENV === 'development') {
        console.warn('Firebase Auth가 초기화되지 않았습니다. 환경 변수를 확인해주세요.')
      }
      return
    }

    try {
      const unsubscribe = onAuthStateChanged(authInstance, (user) => {
        setUser(user)
        setLoading(false)
      })

      return () => unsubscribe()
    } catch (error) {
      console.error('Auth state 변경 감지 오류:', error)
      setLoading(false)
    }
  }, [])

  const loginWithGitHubToken = async (githubToken: string) => {
    try {
      // 서버에서 Firebase Custom Token 받기
      const response = await fetch('/api/auth/github-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ githubToken }),
      })

      const data = await response.json()

      if (!data.success) {
        return {
          success: false,
          error: data.error || 'GitHub 인증에 실패했습니다.',
        }
      }

      // Firebase Custom Token으로 로그인
      const authInstance = getAuthInstance()
      if (!authInstance) {
        return {
          success: false,
          error: 'Firebase가 초기화되지 않았습니다.',
        }
      }

      const userCredential = await signInWithCustomToken(authInstance, data.customToken)
      
      return {
        success: true,
        user: userCredential.user,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || '로그인에 실패했습니다.',
      }
    }
  }

  const logout = async () => {
    const authInstance = getAuthInstance()
    if (!authInstance) {
      return { success: true }
    }

    try {
      await signOut(authInstance)
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || '로그아웃에 실패했습니다.',
      }
    }
  }

  return {
    user,
    loading,
    loginWithGitHubToken,
    logout,
    isAuthenticated: !!user,
  }
}


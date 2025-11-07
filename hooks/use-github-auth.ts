"use client"

import { useState, useEffect } from 'react'
import { 
  User, 
  signInWithCustomToken,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function useGitHubAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
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
      const userCredential = await signInWithCustomToken(auth, data.customToken)
      
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
    try {
      await signOut(auth)
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


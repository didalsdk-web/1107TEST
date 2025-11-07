"use client"

import { useState, useEffect } from 'react'
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { getAuthInstance } from '@/lib/firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authInstance = getAuthInstance()
    if (!authInstance) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const authInstance = getAuthInstance()
    if (!authInstance) {
      return { 
        success: false, 
        error: 'Firebase가 초기화되지 않았습니다.' 
      }
    }

    try {
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password)
      return { success: true, user: userCredential.user }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || '로그인에 실패했습니다.' 
      }
    }
  }

  const signup = async (email: string, password: string) => {
    const authInstance = getAuthInstance()
    if (!authInstance) {
      return { 
        success: false, 
        error: 'Firebase가 초기화되지 않았습니다.' 
      }
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password)
      return { success: true, user: userCredential.user }
    } catch (error: any) {
      let errorMessage = '회원가입에 실패했습니다.'
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = '이미 사용 중인 이메일입니다.'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = '비밀번호는 6자 이상이어야 합니다.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = '올바른 이메일 형식이 아닙니다.'
      }
      
      return { 
        success: false, 
        error: errorMessage 
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
        error: error.message || '로그아웃에 실패했습니다.'
      }
    }
  }

  return {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  }
}


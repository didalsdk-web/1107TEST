"use client"

import { useState, useEffect } from 'react'
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || '로그인에 실패했습니다.' 
      }
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
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
    try {
      await signOut(auth)
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


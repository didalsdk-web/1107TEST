"use client"

import React from 'react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] p-4">
          <div className="max-w-md w-full bg-[#2c2c54] border border-[#3a3a5e] rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">오류가 발생했습니다</h1>
            <p className="text-white/70 mb-6">
              페이지를 로드하는 중 문제가 발생했습니다. 새로고침을 시도해주세요.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-white/50 cursor-pointer mb-2">오류 상세 정보</summary>
                <pre className="text-xs text-red-400 bg-[#1a1a2e] p-3 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={this.handleReset}
                className="bg-primary text-white hover:opacity-90"
              >
                새로고침
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-[#3a3a5e] text-white hover:bg-white/10"
              >
                홈으로
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}


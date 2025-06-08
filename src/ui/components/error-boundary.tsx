"use client"

import { Component, type ReactNode } from "react"


interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: string | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-200 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center mb-4">
            <img src="/svg/triangle-alert.svg" alt="triangle" />
            <h2 className="text-lg font-bold">Xato yuz berdi</h2>
          </div>
          <p className="mb-4">{this.state.error}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
      
            <img src="/svg/refresh-cw.svg" alt="refresh"  className="mr-2"/>
            Qayta urinish
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary

// components/EnhancedSuccessMessage.tsx
import { ReactNode } from 'react'
import { CheckCircle } from 'lucide-react'

interface SuccessMessageProps {
  children: ReactNode
}

export default function SuccessMessage({ children }: SuccessMessageProps) {
  return (
    // <div className="relative px-8 py-24 rounded-2xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 animate-gradient">
    //   {/* Blurred animated background gradient */}
    //   <div className="absolute inset-0 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-purple-200 via-pink-200 to-blue-200 blur-3xl opacity-30 animate-spin-slow z-0" />

    //   <div className="relative z-10 max-w-md w-full px-6 py-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40">
    //     <div className="flex flex-col items-center space-y-4">
    //       <CheckCircle className="text-green-500 w-12 h-12" />
    //       {children}
    //     </div>
    //   </div>
    // </div>
    <div className="relative max-w-md mx-auto mt-10 p-6 rounded-2xl overflow-hidden shadow-2xl">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-purple-100 to-pink-100 animate-gradient-slow blur-xl opacity-60"></div>

      {/* Content Container (glassmorphism effect) */}
      <div className="relative backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-8 flex flex-col items-center space-y-4">
        <CheckCircle className="text-green-500 w-12 h-12" />
        {children}
      </div>
    </div>
  )
}

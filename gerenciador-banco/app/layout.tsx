import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/themeProvider/theme-provider"





export const metadata: Metadata = {
  title: 'Gerenciador PãoDaCasa ',
  description: 'Padaria PãoDCasa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="overflow-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

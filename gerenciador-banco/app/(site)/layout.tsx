'use client'

import { Toaster } from "@/components/ui/toaster"


export default function Home({
    children,
}: {
    children: React.ReactNode
}) {
    return <div
        className="h-screen w-screen overflow-hidden"
    >
        <div className="flex flex-row ">

            {children}
            <Toaster />
        </div>

    </div>
}
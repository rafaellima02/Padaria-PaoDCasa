'use client'

import Menu from "@/components/menu/Menu";


export default function Home({
    children,
}: {
    children: React.ReactNode
}) {
    return <div
        className="h-screen w-screen overflow-hidden"
    >
        <div className="flex flex-row ">
            <Menu />
            {children}
        </div>

    </div>
}
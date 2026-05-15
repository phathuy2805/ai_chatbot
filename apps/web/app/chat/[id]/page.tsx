'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import ChatInterface from '../../../components/ChatInterface'
import { ChatSidebar } from '../../../components/ChatSidebar'

export default function ChatPage() {
    const params = useParams()
    const id = params.id as string
    const [refreshKey, setRefreshKey] = useState(0)

    return (
        <div className="flex h-screen">
            <ChatSidebar refreshKey={refreshKey} />
            <ChatInterface
                chatId={id}
                onChatUpdate={() => setRefreshKey((k) => k + 1)}
            />
        </div>
    )
}

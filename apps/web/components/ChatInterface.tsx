'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, UIMessage } from 'ai'
import { useEffect, useRef, useState } from 'react'
import { WeatherCard } from '../components/WeatherCard'
import { MemoizedMarkdown } from './MemoziedMarkdown'
import { StreamingMessage } from './StreamingMessage'

interface ChatInterfaceProps {
    chatId: string
    onChatUpdate?: () => void
}

interface ModelOption {
    id: string
    name: string
    owned_by: string
}

export default function ChatInterface({
    chatId,
    onChatUpdate,
}: ChatInterfaceProps) {
    const [input, setInput] = useState('')
    const [selectedModel, setSelectedModel] = useState('google/gemini-3-flash')
    const [modelOptions, setModelOptions] = useState<ModelOption[]>([])
    const selectedModelRef = useRef(selectedModel)

    selectedModelRef.current = selectedModel

    useEffect(() => {
        fetch('https://ai-gateway.vercel.sh/v1/models')
            .then((response) => response.json())
            .then(({ data }) => {
                const languageModels: ModelOption[] = (
                    data as Array<{
                        id: string
                        name: string
                        owned_by: string
                        type: string
                    }>
                )
                    .filter((model) => model.type === 'language')
                    .map((model) => ({
                        id: model.id,
                        name: model.name,
                        owned_by: model.owned_by,
                    }))
                setModelOptions(languageModels)
            })
            .catch(() => {})
    }, [])

    const grouped = modelOptions.reduce<Record<string, ModelOption[]>>(
        (acc, model) => {
            if (!acc[model.owned_by]) acc[model.owned_by] = []
            acc[model.owned_by]?.push(model)
            return acc
        },
        {},
    )

    const { messages, sendMessage, status, setMessages } = useChat({
        id: chatId,
        transport: new DefaultChatTransport({
            api: `${process.env.NEXT_PUBLIC_API_URL}/chats`,
            prepareSendMessagesRequest: ({ messages }) => {
                return {
                    body: {
                        message: messages[messages.length - 1] as UIMessage,
                        id: chatId,
                        model: selectedModelRef.current,
                    },
                }
            },
        }),
        generateId: () => crypto.randomUUID(),
    })
    const prevStatusRef = useRef(status)

    useEffect(() => {
        if (prevStatusRef.current === 'streaming' && status === 'ready') {
            onChatUpdate?.()
        }
        prevStatusRef.current = status
    }, [status, onChatUpdate])

    useEffect(() => {
        const loadMessages = async () => {
            const response = await fetch(`/api/chats/${chatId}/messages`)
            const existingMessages = (await response.json()) as UIMessage[]
            if (existingMessages.length > 0) {
                setMessages(existingMessages)
            }
        }
        loadMessages()
    }, [chatId, setMessages])

    return (
        <div className="flex-1 flex flex-col h-screen max-w-4xl mx-auto p-4">
            <div className="mb-4">
                <label
                    htmlFor="model-select"
                    className="block text-sm font-medium text-gray-400 mb-2"
                >
                    Model
                </label>
                <select
                    id="model-select"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                >
                    {modelOptions.length === 0 ? (
                        <option value={selectedModel}>{selectedModel}</option>
                    ) : (
                        Object.entries(grouped)
                            .sort(([a], [b]) => a.localeCompare(b))
                            .map(([provider, models]) => (
                                <optgroup key={provider} label={provider}>
                                    {models.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.name}
                                        </option>
                                    ))}
                                </optgroup>
                            ))
                    )}
                </select>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400 mt-8">
                        Start a conversation by typing a message below.
                    </div>
                )}
                {messages.map((message, index) => (
                    <div
                        key={message.id || index}
                        id={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'}`}
                        >
                            <div className="text-xs font-semibold mb-1 opacity-70">
                                {message.role === 'user' ? 'You' : 'Assistant'}
                            </div>
                            <div className="space-y-3">
                                {(message.parts ?? []).map((part, index) => {
                                    if (part.type === 'text') {
                                        const isCurrentStreaming =
                                            message.role === 'assistant' &&
                                            status === 'streaming' &&
                                            message.id ===
                                                messages[messages.length - 1]
                                                    ?.id

                                        if (isCurrentStreaming) {
                                            return (
                                                <StreamingMessage
                                                    key={index}
                                                    id={`${message.id}-${index}`}
                                                    text={part.text}
                                                    animate={true}
                                                />
                                            )
                                        }

                                        return (
                                            <MemoizedMarkdown
                                                key={index}
                                                id={`${message.id}-${index}`}
                                                content={part.text}
                                            />
                                        )
                                    }
                                    if (
                                        part.type === 'tool-getWeather' &&
                                        part.state === 'output-available'
                                    ) {
                                        return (
                                            <WeatherCard
                                                key={index}
                                                data={
                                                    part.output as unknown as Parameters<
                                                        typeof WeatherCard
                                                    >[0]['data']
                                                }
                                            />
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        </div>
                    </div>
                ))}
                {status !== 'ready' && (
                    <div className="flex justify-start">
                        <div className="bg-gray-800 text-gray-100 rounded-lg px-4 py-2">
                            <div className="flex items-center space-x-2">
                                <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{
                                        animationDelay: '0ms',
                                    }}
                                ></div>
                                <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{
                                        animationDelay: '150ms',
                                    }}
                                ></div>
                                <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{
                                        animationDelay: '300ms',
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (input.trim()) {
                        sendMessage({ text: input })
                        setInput('')
                    }
                }}
                className="flex gap-2"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500"
                    placeholder="Type your message..."
                />
                <button
                    type="submit"
                    disabled={status !== 'ready' || !input.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

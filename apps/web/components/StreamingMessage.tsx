import { memo, useEffect, useRef } from 'react'
import { useStream } from '../hooks/use-stream'
import { MemoizedMarkdown } from './MemoziedMarkdown'

export function StreamingMessage({
    text,
    animate = false,
    id,
}: {
    text: string
    animate?: boolean
    id: string
}) {
    const contentRef = useRef('')
    const { stream, addPart } = useStream()
    // DELTA: hệ số chữ mới so với lần cuối update
    useEffect(() => {
        if (!text || !animate) return

        if (contentRef.current !== text) {
            const delta = text.slice(contentRef.current.length)
            if (delta) {
                addPart(delta)
            }
            contentRef.current = text
        }
    }, [text, animate, addPart])

    const displayText = animate ? stream || text : text

    return <MemoizedMarkdown id={id} content={displayText} />
}

export default memo(StreamingMessage)

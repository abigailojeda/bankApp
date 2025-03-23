
export interface ToasterMessage {
    title: string
    subtitle?: string
    content?: string
    color?: string
    caption?: string
}

export interface ToasterProps {
    message: ToasterMessage
}
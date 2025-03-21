
export interface ToasterMessage {
    title: string
    subtitle?: string
    content?: string
    color?: string
}

export interface ToasterProps {
    message: ToasterMessage
}
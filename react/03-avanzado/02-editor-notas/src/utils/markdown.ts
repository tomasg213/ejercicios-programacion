export function parseMarkdown(markdown: string): string {
  let html = markdown

  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/__(.+?)__/g, '<u>$1</u>')

  html = html.replace(/^\* (.+)$/gm, '<li>$1</li>')
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')

  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')

  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')

  html = html.replace(/^---$/gm, '<hr>')

  const lines = html.split('\n')
  let inList = false
  const processedLines: string[] = []

  for (const line of lines) {
    if (line.startsWith('<li>')) {
      if (!inList) {
        processedLines.push('<ul>')
        inList = true
      }
      processedLines.push(line)
    } else {
      if (inList) {
        processedLines.push('</ul>')
        inList = false
      }
      processedLines.push(line)
    }
  }

  if (inList) {
    processedLines.push('</ul>')
  }

  return processedLines.join('\n').replace(/\n/g, '<br>')
}

export function obtenerTiempoRelativo(date: Date): string {
  const ahora = new Date()
  const diff = ahora.getTime() - new Date(date).getTime()
  
  const minutos = Math.floor(diff / 60000)
  const horas = Math.floor(diff / 3600000)
  const dias = Math.floor(diff / 86400000)
  
  if (minutos < 1) return 'hace un momento'
  if (minutos < 60) return `hace ${minutos} minutos`
  if (horas < 24) return `hace ${horas} horas`
  if (dias === 1) return 'ayer'
  return `hace ${dias} días`
}

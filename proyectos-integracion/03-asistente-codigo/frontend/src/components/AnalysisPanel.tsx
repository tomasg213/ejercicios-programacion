interface Issue {
  type?: string
  severity?: string
  message: string
}

interface AnalysisPanelProps {
  issues: Issue[]
  suggestions: string[]
  loading?: boolean
  onAnalyze: () => void
}

export default function AnalysisPanel({ issues, suggestions, loading, onAnalyze }: AnalysisPanelProps) {
  return (
    <div className="bg-gray-50 p-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Analysis</h2>
        <button onClick={onAnalyze} disabled={loading} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      
      {issues.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Issues</h3>
          {issues.map((issue, i) => (
            <div key={i} className={`p-2 rounded mb-2 text-sm ${issue.severity === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {issue.message}
            </div>
          ))}
        </div>
      )}
      
      {suggestions.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Suggestions</h3>
          {suggestions.map((suggestion, i) => (
            <div key={i} className="p-2 bg-blue-50 rounded mb-2 text-sm">
              {suggestion}
            </div>
          ))}
        </div>
      )}
      
      {issues.length === 0 && suggestions.length === 0 && !loading && (
        <p className="text-gray-500 text-sm">Click Analyze to check your code</p>
      )}
    </div>
  )
}

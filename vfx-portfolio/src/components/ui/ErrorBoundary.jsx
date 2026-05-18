import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed', inset: 0, background: '#06060a',
          color: '#c9a84c', display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexDirection: 'column', gap: '20px',
          padding: '40px', fontFamily: 'monospace', zIndex: 99999
        }}>
          <h2 style={{color:'#f5f2ec'}}>Runtime Error Caught</h2>
          <pre style={{
            background: '#141412', padding: '20px', borderRadius: '4px',
            maxWidth: '800px', overflow: 'auto', fontSize: '13px',
            border: '1px solid #222', whiteSpace: 'pre-wrap'
          }}>
            {this.state.error.toString()}
            {this.state.error.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

import React from 'react';

// Catches render-time errors anywhere below it so a single broken component
// shows a friendly fallback instead of a blank white screen.
export default class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Unhandled UI error:', error, info);
  }

  handleReload = () => {
    window.location.assign('/');
  };

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-paper px-6 text-center">
          <div className="max-w-md">
            <p className="eyebrow mb-4">Error</p>
            <h1 className="mb-3 text-2xl font-normal text-ink">Something went wrong</h1>
            <p className="mb-8 text-sm leading-relaxed text-muted">
              An unexpected error occurred. Reloading the page usually fixes it — your cart and
              account are safe.
            </p>
            <button type="button" onClick={this.handleReload} className="btn btn-primary">
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

import React from "react";

interface State {
  hasError: boolean;
  error: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; name?: string },
  State
> {
  constructor(props: { children: React.ReactNode; name?: string }) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[ErrorBoundary: ${this.props.name}]`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: "fixed",
          bottom: 40,
          left: 8,
          zIndex: 999999,
          backgroundColor: "#ffcccc",
          border: "2px solid red",
          padding: "8px",
          fontFamily: "monospace",
          fontSize: "11px",
          maxWidth: "360px"
        }}>
          💥 [{this.props.name}] crashed: {this.state.error}
        </div>
      );
    }
    return this.props.children;
  }
}

import React, { Component, type ErrorInfo, type ReactNode } from "react";
import styled from '@emotion/styled';
import Card from 'web-check-live/components/Form/Card';
import Heading from 'web-check-live/components/Form/Heading';
import colors from 'web-check-live/styles/colors';

interface Props {
  children: ReactNode;
  title?: string;
  key?: string;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

const ErrorText = styled.p`
  color: ${colors.danger};
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: null
  };

  // Catch errors in any components below and re-render with error message
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }


  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Card>
          { this.props.title && <Heading color={colors.primary}>{this.props.title}</Heading> }
          <ErrorText>This component errored unexpectedly</ErrorText>
         
          {
            this.state.errorMessage &&
            <details>
              <summary>Error Details</summary>
              <div>{this.state.errorMessage}</div>
            </details>
          }
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

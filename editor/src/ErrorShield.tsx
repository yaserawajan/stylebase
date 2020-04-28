import * as React from "react";

interface Props {
    message: string
}

export class ErrorShield extends React.Component<Props, { hasError: boolean }> {
    
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error:any, info:any) {
        console.warn("PLUGIN ERROR", error, info);
    }
 
    render() {
        if (this.state.hasError) {
            // Render custom fallback UI or Text if there is error
            return <div>{this.props.message}</div>;
        }

        return this.props.children; 
    }
}
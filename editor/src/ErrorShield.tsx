import * as React from "react";

export class ErrorShield extends React.Component<{}, { hasError: boolean }> {
    
    constructor(props:{}) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error:any, info:any) {
        //console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            // Render custom fallback UI or Text if there is error
            return <div>Oops, something went wrong in rendering component card from library</div>;
        }
        return this.props.children; 
    }
}
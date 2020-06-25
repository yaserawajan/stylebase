import * as React from "react";
import { InputArea } from "../InputArea";
import { Row, Col } from "../../layouts";
import { InputIcon } from "../InputIcon";
import { FolderHandleIcon } from "../FolderHandleIcon";
import { Title } from "../Title";
import { ctx } from "./DropDownListContext";
import { Input } from "../Input";

interface Props {
    style?: React.CSSProperties
    className?: string
    disabled?: boolean
    tabIndex?: number
    value?: any
    onChange?: (value: any) => void
    valueAsText?: (value: any) => string
}

const defaultOnChange = (value: any) => { }

const defaultRenderSummary = (value:any) => value;

export const DropDownList:React.SFC<Props> = ({
    style,
    className,
    disabled = false,
    tabIndex = 0,
    value,
    onChange = defaultOnChange,
    valueAsText = defaultRenderSummary,
    children
}) => {

    const [toggled, setToggled] = React.useState(false);

    const handleToggle = () => setToggled(s => !s);

    const handleChange = (newValue: any) => {
        setTimeout(() => setToggled(false), 0);
        onChange(newValue);
    }

    const handleFocus = () => {

    }

    return (
        <InputArea className={className} style={style}>

            <Row key="header" style={{ width: "100%" }} onClick={handleToggle}>

                <Input value={valueAsText(value)} 
                    tabIndex={tabIndex}
                    onChange={defaultOnChange}
                    onFocus={handleFocus} className="stretch" />
                
                <InputIcon>
                    <FolderHandleIcon toggled={toggled} />
                </InputIcon>
                
            </Row> 

            {toggled && !disabled &&
                
                <Col key="body" style={{ 
                    maxHeight: 200, 
                    overflowY: "scroll",
                    position: "absolute",
                    top: "100%",  
                    left: 0,  
                    width: "100%",
                    zIndex: 10000,
                    backgroundColor: "white"
                }}>
                    <ctx.Provider value={{ value, onChange: handleChange }}>
                        {children}
                    </ctx.Provider>
                </Col>
                
            }

        </InputArea>
    )
}
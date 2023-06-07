import { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"

const Container = styled("div")`
    display: flex;
    flex-direction: column;

    border: 1px solid #28282840;
    border-radius: 10px;
    overflow-x: auto;
    overflow-y: auto;

    max-height: 70vh;
    max-width: 100%;
    width: 100%;
    min-width: 0;
`

const Row = styled("div")`
    display: flex;
    align-items: center;

    background-color: ${props => props.header ? "#f1f1f1" : "#ffffff"};
    font-weight: ${props => props.header ? 500 : 400};
    position: ${props => props.header ? "sticky" : "static"};
    top: 0;

    border-bottom: 1px solid #28282840;
    width: fit-content;

    &:nth-last-child(2){
        border-bottom: none;
    }
`

const Cell = styled("div")`
    width: 15rem;
    box-sizing: border-box;

    padding: 0.5rem 1rem;
    border-right: 1px solid #28282840;

    position: ${props => props.first ? "sticky" : "static"};
    left: 0;
    background-color: ${props => props.header ? "#f1f1f1" : "#ffffff"};
`

const Actions = styled("div")`
    position: fixed;
    right: 3rem;

    display: flex;
    align-items: center;

    background-color: ${props => props.header ? "#f1f1f1" : "#ffffff"};
    border-radius: 20px;

    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover{
        background-color: ${props => props.header ? "#ffffff" : "#f1f1f1"};
    }
`

const ActionsMenu = styled("div")`
    position: fixed;

    width: 18.75rem;

    transition: opacity 0.2s ease-in-out;

    background-color: #f0f0f0;
    opacity: ${props => props.visibility == "true" ? 1 : 0};
    pointer-events: ${props => props.visibility == "true" ? "all" : "none"};
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

    left: ${props => props.x + "px"};
    top: ${props => props.y + "px"};

    border-radius: 15px;
    overflow: hidden;
`

const OptionsItem = styled("div")`
    padding: 0.625rem 1.25rem;
    cursor: pointer;

    &:hover{
        background-color: #d9d9d9;
    }
`

const Table = ({
    tableData = {
        header: [],
        data: [
            {
                rowData: [],
                actions: [{
                    value: "Placeholder",
                    function: () => {}
                }]
            }
        ]
    },
    emptyDataText = "Žádná data"
}) => {
    const [menuItems, setMenuItems] = useState([
        {value: "", function: () => {}}
    ])

    const [menuItemsVisibility, setMenuItemsVisibility] = useState(false)
    const [menuItemsPosition, setMenuItemsPosition] = useState({
        x: 0,
        y: 0
    })

    const openMenu = (rowOptions, e) => {
        setMenuItems(rowOptions)

        setMenuItemsVisibility(true)
        
        const xPos = e.clientX;
        const yPos = e.clientY;

        if(window.innerWidth - xPos <= 320){
            setMenuItemsPosition({
                x: window.innerWidth - 320,
                y: yPos
            })
        }else{
            setMenuItemsPosition({
                x: xPos,
                y: yPos
            })
        }
    }

    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(ref.current && !ref.current.contains(e.target)){
                setMenuItemsVisibility(false)
            }
        }

        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return (
        <Container>
            {
                tableData.header.length > 0 ? (
                    <Row header={true}>
                        {
                            tableData.header.map((element, index) => {
                                if(index == 0){
                                    return (
                                        <Cell first={true} header={true}>{element}</Cell>
                                    )
                                }

                                return (
                                    <Cell header={true}>{element}</Cell>
                                )
                            })
                        }
                    </Row>
                ) : (
                    <></>
                )
            }
            {
                tableData.data.length > 0 ? (
                    tableData.data.map((element, index) => {
                        return (
                            <Row>
                                {
                                    element.rowData.map((element, index) => {
                                        if(index == 0){
                                            return (
                                                <Cell first={true}>
                                                    {element}
                                                </Cell>
                                            )
                                        }

                                        return (
                                            <Cell>
                                                {element}
                                            </Cell>
                                        )
                                    })
                                }
                                {
                                    element.actions.length > 0 ? (
                                        <Actions onClick={(e) => {openMenu(element.actions, e)}}>
                                            <img 
                                                src="/more_icon.png"
                                                height={30}
                                                width={30}
                                            />
                                        </Actions>
                                    ) : (
                                        <></>
                                    )
                                }
                            </Row>
                        )
                    })
                ) : (
                    <Row style={{width: "100%"}}>
                        <div style={{
                            padding: "10px 10px",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {emptyDataText}
                        </div>
                    </Row>
                )
            }
            <ActionsMenu ref={ref} x={menuItemsPosition.x} y={menuItemsPosition.y} visibility={menuItemsVisibility.toString()}>
                {
                    <>
                        {
                            menuItems.map((element, index) => {
                                return (
                                    <OptionsItem key={"menu-item-openable-" + index} onClick={() => {element.function(); setMenuItemsVisibility(false)}}>{element.value}</OptionsItem>
                                )
                            })
                        }
                        <OptionsItem onClick={() => {setMenuItemsVisibility(false)}}>Zavřít</OptionsItem>
                    </>

                }
            </ActionsMenu>
        </Container>
    )
}

export default Table
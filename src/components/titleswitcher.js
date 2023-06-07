import { styled } from "styled-components"

const Container = styled("div")`
    background-color: #f1f1f1;
    padding: 10px 10px;
    border-radius: 15px;
    border: 1px solid #28282840;
    box-sizing: border-box;
    cursor: pointer;

    &:hover{
        background-color: #d0d0d0d0;
    }
`

const Titleswitcher = ({children, onClick = () => {}}) => {
    return (
        <Container onClick={onClick}>{children}</Container>
    )
}

export default Titleswitcher
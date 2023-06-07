import { styled } from "styled-components"

const Container = styled("button")`
    padding: 10px 40px;
    border: 1px solid #28282840;
    border-radius: 10px;
    box-sizing: border-box;
    width: 100%;
    font-family: 'Montserrat', sans-serif;

    background-color: #282828;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover{
        background-color: #484848;
    }
`

const Button = ({children, onClick = () => {}}) => {
    return (
        <Container onClick={onClick}>
            {children}
        </Container>
    )
}

export default Button
import { styled } from "styled-components"

const Container = styled("div")`
    padding: 5px 10px;
    cursor: pointer;

    &:hover{
        background-color: #f1f1f1;
    }

    display: flex;
    flex-direction: column;

    gap: 5px;
    padding: 10px 10px;
    box-sizing: border-box;
`

const AutocompleteItem = ({children, onClick = () => {}}) => {
    return (
        <Container onClick={onClick}>
            {children}
        </Container>
    )
}

export default AutocompleteItem
import { styled } from "styled-components"

const Container = styled("div")`
    position: absolute;

    left: 0;

    width: 100%;
    height: 15rem;

    background-color: #ffffff;
    border: 1px solid #28282840;
    border-radius: 10px;

    overflow-y: auto;
    z-index: 200;
`

const Autocomplete = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Autocomplete
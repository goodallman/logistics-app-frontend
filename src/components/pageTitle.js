import { styled } from "styled-components"

const Container = styled("div")`
    font-size: 2rem;
`

const PageTitle = ({children}) => {
    return (
        <Container>{children}</Container>
    )
}

export default PageTitle
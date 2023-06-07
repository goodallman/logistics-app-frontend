import { styled } from "styled-components"

const Container = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    flex: 1;
    height: 100vh;
    width: 100%;
    max-width: 100%;
    min-width: 0;
`

const Top = styled("div")`
    border-bottom: 1px solid #28282840;
    width: 100%;

    padding: 1rem 1.5rem;
    box-sizing: border-box;
`

const Content = styled("div")`
    padding: 1rem 1.5rem;
    position: relative;
    box-sizing: border-box;
    flex: 1;

    max-width: 100%;
    width: 100%;
`

const PageContainer = ({
    children,
    title = <>Nepřiřazeno</>
}) => {
    return (
        <Container>
            <Top>
                {title}
            </Top>
            <Content>
                {children}
            </Content>
        </Container>
    )
}

export default PageContainer
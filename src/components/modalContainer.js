import { styled } from "styled-components"

const Container = styled("div")`
    position: fixed;
    width: calc(100% - 15rem);
    height: 100%;

    top: 0;
    left: 0;
    margin: 0 0 0 15rem;

    background-color: #28282840;
    display: flex;
    justify-content: center;

    box-sizing: border-box;
    padding: 10vh 0 0 0;
    transition: all 0.3s ease-in-out;

    pointer-events: ${props => props.open ? "all" : "none"};
    opacity: ${props => props.open ? 1 : 0};
`

const ContentContainer = styled("div")`
    width: 50vw;
    height: fit-content;
    max-height: 80vh;
    min-height: 50vh;
    overflow: auto;

    background-color: #ffffff;
    border-radius: 15px;

    opacity: ${props => props.open ? 1 : 0};
    transform: ${props => props.open ? "translateY(0)" : "translateY(1rem)"};
    transition: all 0.3s ease-in-out;
`

const Title = styled("div")`
    font-size: 1.2rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #28282840;

    position: sticky;
`

const Wrapper = styled("div")`
    padding: 1rem 1.5rem;
`

const Close = styled("div")`
    position: absolute;
    right: 0;
    top: 0;

    padding: 5px 10px;
    border-top-right-radius: 10px;
    background-color: #BC011D;

    cursor: pointer;
    color: #ffffff;

    &:hover{
        background-color: #BC011D;
    }
`

const ModalContainer = ({
    modalTitle = "Titulek modalu",
    open = false,
    onClose = () => {},
    children
}) => {
    return (
        <Container open={open} onClick={onClose}>
            <ContentContainer open={open} onClick={(e) => {e.stopPropagation()}}>
                <Title>
                    {modalTitle}
                    <Close onClick={onClose}>x</Close>
                </Title>
                <Wrapper>
                {
                    children
                }
                </Wrapper>
            </ContentContainer>
        </Container>
    )
}

export default ModalContainer
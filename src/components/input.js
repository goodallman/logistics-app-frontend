import { styled } from "styled-components"

const Container = styled("div")`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 7px;
`

const Label = styled("div")`

`

const InputEl = styled("input")`
    height: 2rem;
    font-size: 1rem;
    font-family: 'Montserrat', sans-serif;

    padding: 0 0.7rem;

    border: 1px solid #28282840;
    border-radius: 10px;

    transition: all 0.3s ease-in-out;
    width: 100%;
    box-sizing: border-box;

    &:focus{
        outline: none;
        border: 1px solid #282828;
    }
`

const Input = ({
    label = "",
    value = "",
    onChange = () => {},
    type="text",
    required=false
}) => {
    return (
        <Container>
            {
                label !== "" ? (
                    <Label>{label}</Label>
                ) : (
                    <></>
                )
            }
            <InputEl value={value} onChange={onChange} type={type} required={required}></InputEl>
        </Container>
    )
}

export default Input
import React, { useState } from 'react'
import Input from '../input'
import { styled } from 'styled-components'
import Button from '../button'
import addProduct from '../../fetch/productAdd'

const Container = styled("form")`
    display: flex;
    flex-direction: column;
    gap: 20px;
`


{/*
Component for optional addition to warehouse described below

const Optional = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 20px;

    height: ${props => props.open ? "fit-content" : 0};
    overflow: hidden;
`
*/}

const ProductAddModal = ({
    setAddProductModal=() => {},
    refreshData = () => {}
}) => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [loading, setLoading] = useState(false)

    {/*
        States for adding optional button for addition of product directly into warehouse described below.
        const [warehouse, setWarehouse] = useState("")
        const [supplier, setSupplier] = useState("")
        
        const [optional, setOptional] = useState(false)
    */}
    
    const handleProductSubmit = async() => {
        setLoading(true)
        const data = await addProduct(name, price)

        if(data.status == "001"){
            alert("Úspěšně přidáno!")
            setName("")
            setPrice("")
            setAddProductModal(false)
        }else{
            alert("Vyskytla se nějaká chyba")
        }

        refreshData()
        setLoading(false)
    }

    return (
        <Container onSubmit={(e) => {e.preventDefault(); handleProductSubmit()}}>
            <Input 
                label='Název' 
                value={name}
                onChange={(e) => {setName(e.target.value)}}
                required
            />
            <Input 
                label='Cena (CZK)' 
                value={price}
                onChange={(e) => {setPrice(e.target.value)}}
                required
            />
            {/*
                Frontend element for adding optional button for addition of product directly into warehouse.

                <div 
                    style={{
                        cursor: "pointer", 
                        userSelect: "none",
                        display: "flex",
                        alignItems: "center"
                    }} 
                    onClick={() => {setOptional(!optional)}
                }>
                    {"Přidat do skladu (volitelné)"}
                    <input type='checkbox' checked={optional} />
                </div>
                <Optional open={optional}>
                    <Input label='Sklad' />
                    <Input label='Dodavatel' />
                </Optional>
            */}
            {
                loading ? (
                    <div style={{width: "fit-content"}}>
                        Zpracovávám...
                    </div>
                ) : (
                    <div style={{width: "fit-content"}}>
                        <Button>Přidat</Button>
                    </div>
                )
            }
        </Container>
    )
}

export default ProductAddModal
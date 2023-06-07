import React, { useState } from 'react'
import Input from '../input'
import { styled } from 'styled-components'
import Button from '../button'
import { addSupplier } from '../../fetch/supplier'

const Container = styled("form")`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const SupplierAddModal = ({
    setAddSupplierModal=() => {},
    refreshData = () => {}
}) => {
    const [address, setAddress] = useState("")
    const [supplier, setSupplier] = useState("")

    const [loading, setLoading] = useState(false)
    
    const handleSupplierSubmit = async() => {
        setLoading(true)
        const data = await addSupplier(supplier, address)

        if(data.status == "001"){
            alert("Úspěšně přidáno!")
            setAddress("")
            setSupplier("")
            setAddSupplierModal(false)
        }else{
            alert("Vyskytla se nějaká chyba")
        }

        refreshData()
        setLoading(false)
    }

    return (
        <Container onSubmit={(e) => {e.preventDefault(); handleSupplierSubmit()}}>
            <Input 
                label='Adresa dodavatele' 
                value={address}
                onChange={(e) => {setAddress(e.target.value)}}
            />
            <Input 
                label='Jméno dodavatele' 
                value={supplier}
                onChange={(e) => {setSupplier(e.target.value)}}
            />
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

export default SupplierAddModal
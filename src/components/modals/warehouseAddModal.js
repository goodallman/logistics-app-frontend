import React, { useEffect, useState } from 'react'
import Input from '../input'
import { styled } from 'styled-components'
import Button from '../button'
import {addWarehouse} from '../../fetch/warehouse'
import { getSuppliers } from '../../fetch/supplier'
import Fuse from 'fuse.js'
import Autocomplete from '../autocomplete'
import AutocompleteItem from '../autocompleteItem'
import { useNavigate } from 'react-router-dom'

const Container = styled("form")`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const WarehouseAddModal = ({
    setAddWarehouseModal=() => {},
    refreshData = () => {}
}) => {
    const [address, setAddress] = useState("")
    const [supplier, setSupplier] = useState("")
    const [selectedSupplierId, setSelectedSupplierId] = useState()

    const [loading, setLoading] = useState(false)
    
    const handleWarehouseSubmit = async() => {
        setLoading(true)
        const data = await addWarehouse(selectedSupplierId, address)

        if(data.status == "001"){
            alert("Úspěšně přidáno!")
            setAddress("")
            setSupplier("")
            setAddWarehouseModal(false)
        }else{
            alert("Vyskytla se nějaká chyba")
        }

        refreshData()
        setLoading(false)
    }

    const [supplierList, setSupplierList] = useState([])
    const [searchSupply, setSearchSupply] = useState([])
    const [autocompleteShow, setAutocompleteShow] = useState(false)

    const getSuppliersList = async() => {
        const data = await getSuppliers()
        setSupplierList(data)
    }

    useEffect(() => {
        getSuppliersList()
    }, [])

    const search = (search_param = "") => {
        if(search_param.length == 0){
            return
        }

        setAutocompleteShow(true)

        const fuse = new Fuse(supplierList, {
            keys: ['supplier_name', 'supplier_address']
        })

        const output = fuse.search(search_param)
        setSearchSupply(output)
    }

    useEffect(() => {
        search(supplier)
    }, [supplier])

    const navigate = useNavigate()

    return (
        <Container onSubmit={(e) => {e.preventDefault(); handleWarehouseSubmit()}}>
            <Input 
                label='Adresa skladiště' 
                value={address}
                onChange={(e) => {setAddress(e.target.value)}}
            />
            <div style={{position: "relative"}}>
                <Input 
                    label='Dodavatel' 
                    value={supplier}
                    onChange={(e) => {setSupplier(e.target.value)}}
                />
                {
                    autocompleteShow == true && supplier.length > 0 ? (
                        <Autocomplete>
                            <AutocompleteItem onClick={() => {setAutocompleteShow(false); navigate("/suppliers")}}>
                                <div>{"Přidat dodavatele..."}</div>
                                <div style={{fontSize: "0.7rem"}}>{"Žádný dodavatel neodpovídá vyhledávání?"}</div>
                            </AutocompleteItem>
                            {
                                searchSupply.map((element, key) => {
                                    return (
                                        <AutocompleteItem 
                                        onClick={() => {
                                            setSupplier(element.item.supplier_name)
                                            setSelectedSupplierId(element.item.id)
                                            setTimeout(() => {
                                                setAutocompleteShow(false)
                                            }, 100)
                                        }}>
                                            <div style={{}}>{element.item.supplier_name}</div>
                                            <div style={{fontSize: "0.7rem"}}>{element.item.supplier_address}</div>
                                        </AutocompleteItem>
                                    )
                                })
                            }
                        </Autocomplete>
                    ) : (
                        <></>
                    )
                }
            </div>
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

export default WarehouseAddModal
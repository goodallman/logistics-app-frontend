import React, { useEffect, useState } from 'react'
import Input from '../input'
import { styled } from 'styled-components'
import Button from '../button'
import { postToCatalog } from '../../fetch/products'
import Autocomplete from '../autocomplete'
import AutocompleteItem from '../autocompleteItem'
import Fuse from 'fuse.js'
import { useNavigate } from 'react-router-dom'

const Container = styled("form")`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const CatalogAddModal = ({
    setAddProductModal=() => {},
    refreshData = () => {},
    productsArray = [],
    warehouseArray = [],
    supplierArray = []
}) => {
    const [product, setProduct] = useState("")
    const [warehouse, setWarehouse] = useState("")
    const [supplier, setSupplier] = useState("")
    const [count, setCount] = useState(0)
    
    const [selectedProductId, setSelectedProductId] = useState(0)
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(0)
    const [selectedSupplierId, setSelectedSupplierId] = useState(0)

    const [autocompleteShowProduct, setAutocompleteShowProduct] = useState(false)
    const [autocompleteShowWarehouse, setAutocompleteShowWarehouse] = useState(false)
    const [autocompleteShowSupplier, setAutocompleteShowSupplier] = useState(false)

    const [supplierSearch, setSupplierSearch] = useState([])
    const [warehouseSearch, setWarehouseSearch] = useState([])
    const [productSearch, setProductSearch] = useState([])

    const [loading, setLoading] = useState(false)
    
    const handleProductSubmit = async() => {
        setLoading(true)
        const data = await postToCatalog(selectedProductId, selectedWarehouseId, selectedSupplierId, count)

        if(data.status == "001"){
            alert("Úspěšně přidáno!")
            setProduct("")
            setSupplier("")
            setWarehouse("")
            setAddProductModal(false)
        }else{
            alert("Vyskytla se nějaká chyba")
        }

        refreshData()
        setLoading(false)
    }

    const search = (array = [], search_param = "", type = "") => {
        if(search_param.length == 0){
            return
        }

        let fuse

        if(type == "supplier"){
            setAutocompleteShowSupplier(true)
            fuse = new Fuse(array, {
                keys: ['supplier_name', 'supplier_address']
            })
        }

        if(type == "warehouse"){
            setAutocompleteShowWarehouse(true)
            fuse = new Fuse(array, {
                keys: ['warehouse_address']
            })
        }

        if(type == "product"){
            setAutocompleteShowProduct(true)
            fuse = new Fuse(array, {
                keys: ['product_name']
            })
        }


        const output = fuse.search(search_param)
        if(type == "supplier"){
            setSupplierSearch(output)
        }

        if(type == "warehouse"){
            setWarehouseSearch(output)
        }

        if(type == "product"){
            setProductSearch(output)
        }
    }

    useEffect(() => {
        search(supplierArray, supplier, "supplier")
    }, [supplier])

    useEffect(() => {
        search(warehouseArray, warehouse, "warehouse")
    }, [warehouse])

    useEffect(() => {
        search(productsArray, product, "product")
    }, [product])

    const navigate = useNavigate()

    return (
        <Container onSubmit={(e) => {e.preventDefault(); handleProductSubmit()}}>
            <div style={{position: "relative"}}>
                <Input 
                    label='Produkt' 
                    value={product}
                    onChange={(e) => {setProduct(e.target.value)}}
                    required
                />
                {
                    autocompleteShowProduct == true && product.length > 0 ? (
                        <Autocomplete>
                            <AutocompleteItem onClick={() => {navigate("/products")}}>
                                <div>{"Přidat produkt..."}</div>
                                <div style={{fontSize: "0.7rem"}}>{"Žádný produkt neodpovídá vyhledávání?"}</div>
                            </AutocompleteItem>
                            {
                                productSearch.map((element, index) => {
                                    return (
                                        <AutocompleteItem
                                            onClick={() => {
                                                setProduct(element.item.product_name)
                                                setSelectedProductId(element.item.id)
                                                setTimeout(() => {
                                                    setAutocompleteShowProduct(false)
                                                }, 100)
                                            }}
                                        >
                                            <div>{element.item.product_name}</div>
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
            <div style={{position: "relative"}}>
                <Input 
                    label='Sklad' 
                    value={warehouse}
                    required
                    onChange={(e) => {setWarehouse(e.target.value)}}
                />
                {
                    autocompleteShowWarehouse == true && warehouse.length > 0 ? (
                        <Autocomplete>
                            <AutocompleteItem onClick={() => {navigate("/warehouses")}}>
                                <div>{"Přidat skladiště..."}</div>
                                <div style={{fontSize: "0.7rem"}}>{"Žádné skladiště neodpovídá vyhledávání?"}</div>
                            </AutocompleteItem>
                            {
                                warehouseSearch.map((element, index) => {
                                    return (
                                        <AutocompleteItem
                                            onClick={() => {
                                                setWarehouse(element.item.warehouse_address)
                                                setSelectedWarehouseId(element.item.id)
                                                setTimeout(() => {
                                                    setAutocompleteShowWarehouse(false)
                                                }, 100)
                                            }}
                                        >
                                            <div>{element.item.warehouse_address}</div>
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
            <div style={{position: "relative"}}>
                <Input 
                    label='Dodavatel'
                    value={supplier}
                    required
                    onChange={(e) => {setSupplier(e.target.value)}}
                />
                {
                    autocompleteShowSupplier == true && supplier.length > 0 ? (
                        <Autocomplete>
                            <AutocompleteItem onClick={() => {navigate("/suppliers")}}>
                                <div>{"Přidat dodavatele..."}</div>
                                <div style={{fontSize: "0.7rem"}}>{"Žádný dodavatel neodpovídá vyhledávání?"}</div>
                            </AutocompleteItem>
                            {
                                supplierSearch.map((element, index) => {
                                    return (
                                        <AutocompleteItem
                                            onClick={() => {
                                                setSupplier(element.item.supplier_name)
                                                setSelectedSupplierId(element.item.id)
                                                setTimeout(() => {
                                                    setAutocompleteShowSupplier(false)
                                                }, 100)
                                            }}
                                        >
                                            <div>{element.item.supplier_name}</div>
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
            <Input 
                label='Množství'
                required
                onChange={(e) => {setCount(e.target.value)}}
                value={count}
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

export default CatalogAddModal
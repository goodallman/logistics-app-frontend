import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/pageTitle'
import PageContainer from '../../components/pageContainer'
import Table from '../../components/table'
import Button from '../../components/button'
import ModalContainer from '../../components/modalContainer'
import {deleteFromCatalog, getCatalog, getProducts} from '../../fetch/products'
import { useNavigate } from 'react-router-dom'
import Titleswitcher from '../../components/titleswitcher'
import { getWarehouses } from '../../fetch/warehouse'
import { getSuppliers } from '../../fetch/supplier'
import CatalogAddModal from '../../components/modals/catalogAddModal'

const Katalog = () => {
    const [addProductModal, setAddProductModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigator = useNavigate()
    
    const [tableData, setTableData] = useState({
        header: [],
        data: []
    })

    const [productsArray, setProductsArray] = useState([])
    const [warehousesArray, setWarehousesArray] = useState([])
    const [suppliersArray, setSuppliersArray] = useState([])

    const handleProductDelete = async(assoc_id) => {
        setLoading(true)
        const data = await deleteFromCatalog(assoc_id)

        if(data.status !== "001"){
            alert("Vyskytl se error")
            navigator(0)
        }

        loadData()
    }

    const searchForId = (array, id) => {
        return array.find(item => item.id === id);
    }
    
    const loadData = async() => {
        setLoading(true)

        const data = await getProducts()
        const catalogData = await getCatalog()

        const warhousesData = await getWarehouses()
        const suppliersData = await getSuppliers()

        setProductsArray(data)
        setSuppliersArray(suppliersData)
        setWarehousesArray(warhousesData)

        if(data.length > 0){
            const newData = catalogData.map((element, index) => {
                return {
                    rowData: [
                        searchForId(data, element.product_id).product_name, 
                        searchForId(data, element.product_id).product_price, 
                        searchForId(warhousesData, element.warehouse_id).warehouse_address, 
                        searchForId(suppliersData, element.supplier_id).supplier_name,
                        element.product_count
                    ],
                    actions: [{
                        value: "Smazat ze skladu",
                        function: () => {handleProductDelete(element.id)}
                    }]
                }
            })

            setTableData({
                header: ["Jméno produktu", "Cena produktu", "Adresa skladiště", "Dodavatel", "Množství"],
                data: newData
            })
        }else{
            setTableData({
                header: [],
                data: []
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <PageContainer
            title={
                <div style={{display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                    <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                        <PageTitle>Produkty</PageTitle>
                        <Titleswitcher onClick={() => {navigator("/products")}}>Produkty</Titleswitcher>
                        <Titleswitcher onClick={() => {navigator("/catalog")}}>Katalog skladiště</Titleswitcher>
                    </div>
                    <div style={{width: "fit-content"}}>
                        <Button onClick={() => {setAddProductModal(true)}}>Přidat produkt</Button>
                    </div>
                </div>
            }
        >
            {
                loading ? (
                    <div>
                        Načítám...
                    </div>
                ) : (
                    <Table 
                        tableData={tableData}
                        emptyDataText='Žádné nahrané produkty. Přidejte produkt do skladu!'
                    />
                )
            }
            <ModalContainer open={addProductModal} onClose={() => {setAddProductModal(!addProductModal)}} modalTitle='Přidat do katalogu'>
                <CatalogAddModal 
                    setAddProductModal={setAddProductModal}
                    refreshData={() => {loadData()}}
                    productsArray={productsArray}
                    supplierArray={suppliersArray}
                    warehouseArray={warehousesArray}
                />
            </ModalContainer>
        </PageContainer>
    )
}

export default Katalog
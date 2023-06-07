import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/pageTitle'
import PageContainer from '../../components/pageContainer'
import Table from '../../components/table'
import Button from '../../components/button'
import ModalContainer from '../../components/modalContainer'
import ProductAddModal from '../../components/modals/productAddModal'
import {deleteProduct, getProducts} from '../../fetch/products'
import { useNavigate } from 'react-router-dom'
import Titleswitcher from '../../components/titleswitcher'

const Products = () => {
    const [addProductModal, setAddProductModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigator = useNavigate()
    
    const [tableData, setTableData] = useState({
        header: [],
        data: []
    })

    const handleProductDelete = async(product_id) => {
        setLoading(true)
        const data = await deleteProduct(product_id)

        if(data.status !== "001"){
            alert("Vyskytl se error")
            navigator(0)
        }

        loadData()
    }
    
    const loadData = async() => {
        setLoading(true)
        const data = await getProducts()

        if(data.length > 0){
            const newData = data.map((element, index) => {
                return {
                    rowData: [element.product_name, element.product_price],
                    actions: [{
                        value: "Smazat produkt",
                        function: () => {handleProductDelete(element.id)}
                    }]
                }
            })

            setTableData({
                header: ["Jméno produktu", "Cena produktu"],
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
                        emptyDataText='Žádné nahrané produkty. Přidejte svůj první produkt!'
                    />
                )
            }
            <ModalContainer open={addProductModal} onClose={() => {setAddProductModal(!addProductModal)}} modalTitle='Přidat produkt'>
                <ProductAddModal 
                    setAddProductModal={setAddProductModal}
                    refreshData={() => {loadData()}}
                />
            </ModalContainer>
        </PageContainer>
    )
}

export default Products
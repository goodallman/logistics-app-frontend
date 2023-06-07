import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/pageTitle'
import PageContainer from '../../components/pageContainer'
import Table from '../../components/table'
import Button from '../../components/button'
import ModalContainer from '../../components/modalContainer'
import { deleteSupplier, getSuppliers } from '../../fetch/supplier'
import { useNavigate } from 'react-router-dom'
import SupplierAddModal from '../../components/modals/supplierAddModal'

const Suppliers = () => {
    const [addSupplierModal, setAddSupplierModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigator = useNavigate()
    
    const [tableData, setTableData] = useState({
        header: [],
        data: []
    })

    const handleSupplierDelete = async(supplier_id) => {
        setLoading(true)
        const data = await deleteSupplier(supplier_id)

        if(data.status !== "001"){
            alert("Vyskytl se error")
            navigator(0)
        }

        loadData()
    }
    
    const loadData = async() => {
        setLoading(true)
        const data = await getSuppliers()

        if(data.length > 0){
            const newData = data.map((element, index) => {
                return {
                    rowData: [element.supplier_name, element.supplier_address],
                    actions: [{
                        value: "Smazat dodavatele",
                        function: () => {handleSupplierDelete(element.id)}
                    }]
                }
            })

            setTableData({
                header: ["Jméno dodavatele", "Adresa dodavatele"],
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
                    <PageTitle>Dodavatelé</PageTitle>
                    <div style={{width: "fit-content"}}>
                        <Button onClick={() => {setAddSupplierModal(true)}}>Přidat dodavatele</Button>
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
                        emptyDataText='Žádní nahraní dodavatelé. Přidejte je!'
                    />
                )
            }
            <ModalContainer open={addSupplierModal} onClose={() => {setAddSupplierModal(!addSupplierModal)}} modalTitle='Přidat skladiště'>
                <SupplierAddModal 
                    setAddSupplierModal={setAddSupplierModal}
                    refreshData={() => {loadData()}}
                />
            </ModalContainer>
        </PageContainer>
    )
}

export default Suppliers
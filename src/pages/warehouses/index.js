import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/pageTitle'
import PageContainer from '../../components/pageContainer'
import Table from '../../components/table'
import Button from '../../components/button'
import ModalContainer from '../../components/modalContainer'
import { useNavigate } from 'react-router-dom'
import WarehouseAddModal from '../../components/modals/warehouseAddModal'
import { deleteWarehouse, getWarehouses } from '../../fetch/warehouse'
import { getSuppliers } from '../../fetch/supplier'

const Warehouses = () => {
    const [addWarehouseModal, setAddWarehouseModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigator = useNavigate()
    
    const [tableData, setTableData] = useState({
        header: [],
        data: []
    })

    const handleWarehouseDelete = async(warehouse_id) => {
        setLoading(true)
        const data = await deleteWarehouse(warehouse_id)

        if(data.status !== "001"){
            alert("Vyskytl se error")
            navigator(0)
        }

        loadData()
    }
    
    const loadData = async() => {
        setLoading(true)
        const data = await getWarehouses()
        const suppliers = await getSuppliers()

        const searchById = (id) => {
            return suppliers.find(item => item.id === id);
        }

        if(data.length > 0){
            const newData = data.map((element, index) => {
                return {
                    rowData: [element.warehouse_address, searchById(element.supplier_id).supplier_name],
                    actions: [{
                        value: "Smazat skladiště",
                        function: () => {handleWarehouseDelete(element.id)}
                    }]
                }
            })

            setTableData({
                header: ["Adresa skladiště", "Dodavatel"],
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
                    <PageTitle>Skladiště</PageTitle>
                    <div style={{width: "fit-content"}}>
                        <Button onClick={() => {setAddWarehouseModal(true)}}>Přidat skladiště</Button>
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
                        emptyDataText='Žádná nahraná skladiště. Přidejte svoje první skladiště!'
                    />
                )
            }
            <ModalContainer open={addWarehouseModal} onClose={() => {setAddWarehouseModal(!addWarehouseModal)}} modalTitle='Přidat skladiště'>
                <WarehouseAddModal 
                    setAddWarehouseModal={setAddWarehouseModal}
                    refreshData={() => {loadData()}}
                />
            </ModalContainer>
        </PageContainer>
    )
}

export default Warehouses
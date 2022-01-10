import React from "react";
import {Button, ButtonGroup, Container, Row} from "react-bootstrap";
import {setProductsGrid} from "../realgrid/setGrid";

let container, provider, gridView;

const ProductList = () => {
    document.addEventListener("DOMContentLoaded", function () {
        container = document.getElementById("realgrid");

        /* 데이터를 담기 위한 LocalDataProvider 객체 생성 */
        // eslint-disable-next-line no-undef
        provider = new RealGrid.LocalDataProvider(false);

        /* 데이터를 보여주기 위한 GridView 객체 생성 */
        // eslint-disable-next-line no-undef
        gridView = new RealGrid.GridView(container);
        gridView.setDataSource(provider);

        setProductsGrid(provider, gridView);
    });

    const addRow = () => {
        gridView.beginInsertRow();
        gridView.showEditor();
        gridView.setFocus();
    }

    return (
        <Container fluid="lg" style={{padding: '0'}}>
            <h1>Product List</h1>
            <Row>
                <ButtonGroup style={{width: "20%"}} className="mb-1 m-lg-1">
                    <Button variant="primary" onClick={addRow}>추가</Button>
                    <Button variant="warning">수정</Button>
                    <Button variant="danger">삭제</Button>
                </ButtonGroup>
            </Row>
            <Row className="justify-content-md-center">
                <div id="realgrid" style={{width: '100%', height: '430px'}}></div>
            </Row>
        </Container>
    );
};

export default ProductList;
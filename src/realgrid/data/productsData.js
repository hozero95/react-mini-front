export const productsField = [
    {
        fieldName: "productUnum",
        dataType: "number"
    },
    {
        fieldName: "productName",
        dataType: "text"
    },
    {
        fieldName: "price",
        dataType: "number"
    },
    {
        fieldName: "regdate",
        dataType: "datetime",
        datetimeFormat: "yyyy-MM-dd"
    }
];

export const productsColumns = [
    {
        name: "productUnum",
        fieldName: "productUnum",
        type: "data",
        width: "100",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "상품번호"
        },
        numberFormat: '0'
    },
    {
        name: "productName",
        fieldName: "productName",
        type: "data",
        width: "150",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "상품명"
        },
    },
    {
        name: "price",
        fieldName: "price",
        type: "data",
        width: "100",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "가격"
        },
        numberFormat: '#,##0'
    },
    {
        name: "regdate",
        fieldName: "regdate",
        type: "data",
        width: "100",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "최종수정일"
        }
    }
];

export const productsRows = [
    {
        "productUnum": 1,
        "productName": "sample01",
        "price": 10000,
        "regdate": "2999-01-01"
    },
    {
        "productUnum": 2,
        "productName": "sample02",
        "price": 10000,
        "regdate": "2999-01-01"
    },
    {
        "productUnum": 3,
        "productName": "sample03",
        "price": 20000,
        "regdate": "2999-01-01"
    },
    {
        "productUnum": 4,
        "productName": "sample04",
        "price": 20000,
        "regdate": "2999-01-01"
    },
    {
        "productUnum": 5,
        "productName": "sample05",
        "price": 30000,
        "regdate": "2999-01-01"
    },
];
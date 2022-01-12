export const noticesField = [
    {
        fieldName: "noticeUnum",
        dataType: "number"
    },
    {
        fieldName: "title",
        dataType: "text"
    },
    {
        fieldName: "content",
        dataType: "text"
    },
    {
        fieldName: "views",
        dataType: "number"
    },
    {
        fieldName: "regdate",
        dataType: "datetime",
        datetimeFormat: "yyyy-MM-dd"
    },
    {
        fieldName: "moddate",
        dataType: "datetime",
        datetimeFormat: "yyyy-MM-dd"
    }
];

export const noticesColumns = [
    {
        name: "noticeUnum",
        fieldName: "noticeUnum",
        type: "data",
        width: "80",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "공지번호"
        },
        numberFormat: '0'
    },
    {
        name: "title",
        fieldName: "title",
        type: "data",
        width: "500",
        header: {
            text: "제목"
        }
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
            text: "작성일"
        }
    },
    {
        name: "views",
        fieldName: "views",
        type: "data",
        width: "50",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "조회수"
        },
        numberFormat: '0'
    }
];

export const noticesRows = [
    {
        "noticeUnum": 1,
        "title": "sample01",
        "content": "sample content01",
        "views": 0,
        "regdate": "2999-01-01",
        "moddate": "2999-01-01"
    },
    {
        "noticeUnum": 2,
        "title": "sample02",
        "content": "sample content02",
        "views": 0,
        "regdate": "2999-01-01",
        "moddate": "2999-01-01"
    },
    {
        "noticeUnum": 3,
        "title": "sample03",
        "content": "sample content03",
        "views": 0,
        "regdate": "2999-01-01",
        "moddate": "2999-01-01"
    },
    {
        "noticeUnum": 4,
        "title": "sample04",
        "content": "sample content04",
        "views": 0,
        "regdate": "2999-01-01",
        "moddate": "2999-01-01"
    },
    {
        "noticeUnum": 5,
        "title": "sample05",
        "content": "sample content05",
        "views": 0,
        "regdate": "2999-01-01",
        "moddate": "2999-01-01"
    }
];
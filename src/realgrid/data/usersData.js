import {btOptions} from "../datepicker";

export const usersField = [
    {
        fieldName: "userUnum",
        dataType: "number"
    },
    {
        fieldName: "userId",
        dataType: "text"
    },
    {
        fieldName: "postcode",
        dataType: "text"
    },
    {
        fieldName: "address",
        dataType: "text"
    },
    {
        fieldName: "detailAddress",
        dataType: "text"
    },
    {
        fieldName: "extraAddress",
        dataType: "text"
    },
    {
        fieldName: "email",
        dataType: "text"
    },
    {
        fieldName: "tel",
        dataType: "text"
    },
    {
        fieldName: "regdate",
        dataType: "datetime",
        datetimeFormat: "yyyy-MM-dd"
    }
];

export const usersColumns = [
    {
        name: "userUnum",
        fieldName: "userUnum",
        type: "data",
        width: "80",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "유저번호"
        },
        numberFormat: '0'
    },
    {
        name: "userId",
        fieldName: "userId",
        type: "data",
        width: "150",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "아이디"
        }
    },
    {
        name: "postcode",
        fieldName: "postcode",
        type: "data",
        width: "80",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "우편번호"
        }
    },
    {
        name: "address",
        fieldName: "address",
        type: "data",
        width: "200",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "주소"
        }
    },
    {
        name: "detailAddress",
        fieldName: "detailAddress",
        type: "data",
        width: "200",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "상세주소"
        }
    },
    {
        name: "extraAddress",
        fieldName: "extraAddress",
        type: "data",
        width: "200",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "참고주소"
        }
    },
    {
        name: "email",
        fieldName: "email",
        type: "data",
        width: "200",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "이메일"
        }
    },
    {
        name: "tel",
        fieldName: "tel",
        type: "data",
        width: "200",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "연락처"
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
            text: "최종수정일"
        },
        editor: {
            type: "btdate",
            btOptions: btOptions,
            textReadOnly: true
        }
    }
];

export const usersRows = [
    {
        "userUnum": 1,
        "userId": "sample01",
        "postcode": 12345,
        "address": "sample address",
        "detailAddress": "sample detailAddress",
        "extraAddress": "sample extraAddress",
        "email": "sample01@gmail.com",
        "tel": "010-1234-5678",
        "regdate": "2999-01-01"
    },
    {
        "userUnum": 2,
        "userId": "sample02",
        "postcode": 12345,
        "address": "sample address",
        "detailAddress": "sample detailAddress",
        "extraAddress": "sample extraAddress",
        "email": "sample02@gmail.com",
        "tel": "010-1234-5678",
        "regdate": "2999-01-01"
    },
    {
        "userUnum": 3,
        "userId": "sample03",
        "postcode": 12345,
        "address": "sample address",
        "detailAddress": "sample detailAddress",
        "extraAddress": "sample extraAddress",
        "email": "sample03@gmail.com",
        "tel": "010-1234-5678",
        "regdate": "2999-01-01"
    },
    {
        "userUnum": 4,
        "userId": "sample04",
        "postcode": 12345,
        "address": "sample address",
        "detailAddress": "sample detailAddress",
        "extraAddress": "sample extraAddress",
        "email": "sample04@gmail.com",
        "tel": "010-1234-5678",
        "regdate": "2999-01-01"
    },
    {
        "userUnum": 5,
        "userId": "sample05",
        "postcode": 12345,
        "address": "sample address",
        "detailAddress": "sample detailAddress",
        "extraAddress": "sample extraAddress",
        "email": "sample05@gmail.com",
        "tel": "010-1234-5678",
        "regdate": "2999-01-01"
    }
];
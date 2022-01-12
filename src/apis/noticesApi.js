import axios from "axios";

export const getNoticesAll = async (token) => {
    let result = [];

    await axios.get('http://localhost:8000/api/notices/all')
        .then(res => {
            result = res.data;
        }, error => {
            alert('정보를 불러오는데 실패했습니다.');
        });

    return result;
};

export const getNotices = async (noticeUnum) => {
    let result = [];

    await axios({
        url: "http://localhost:8000/api/notices",
        method: "get",
        params: {
            noticeUnum: noticeUnum
        }
    }).then(res => {
        result = res.data;
    }).catch(err => {
        alert('정보를 불러오는데 실패했습니다.');
    });

    return result;
};

export const addNotices = async (token, addData) => {
    let result = {};

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };

    await axios({
        url: "http://localhost:8000/api/notices",
        method: "post",
        headers: headers,
        data: addData
    }).then(res => {
        result = res.data;
        alert('insert ' + res.data);
    }).catch(err => {
        alert('접근 권한이 없습니다.');
    });

    return result;
};

export const viewNotices = async (token, updateData) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
    await axios({
        url: "http://localhost:8000/api/notices/views",
        method: "put",
        headers: headers,
        data: updateData
    }).then(res => {
        console.log('update ' + res.data);
    }).catch(err => {
        alert('접근 권한이 없습니다.');
    });
};

export const updateNotices = async (token, updateData) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
    await axios({
        url: "http://localhost:8000/api/notices",
        method: "put",
        headers: headers,
        data: updateData
    }).then(res => {
        alert('update ' + res.data);
    }).catch(err => {
        alert('접근 권한이 없습니다.');
    });
};

export const deleteNotices = async (token, noticeUnum) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
    await axios({
        url: "http://localhost:8000/api/notices",
        method: "delete",
        headers: headers,
        params: {
            noticeUnum: noticeUnum
        }
    }).then(res => {
        alert('delete ' + res.data);
    }).catch(err => {
        alert('접근 권한이 없습니다.');
    });
};
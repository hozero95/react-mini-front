import axios from "axios";

export const getUsersAll = async (token) => {
    let result = [];

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
    axios.defaults.headers.post = null;
    await axios.get('http://localhost:8000/api/users/all', {
        headers
    }).then(res => {
        result = res.data;
    }, error => {
        alert('접근 권한이 없습니다.');
    });

    return result;
};

export const getUsers = () => {

};

export const updateUsers = async (token, updateData) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
    await axios({
        url: "http://localhost:8000/api/users",
        method: "put",
        headers: headers,
        data: updateData
    }).then(res => {
        alert('update ' + res.data);
    }).catch(err => {
        alert('접근 권한이 없습니다.');
    })
};

export const deleteUsers = async (token, userUnum) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
    await axios({
        url: "http://localhost:8000/api/users",
        method: "delete",
        headers: headers,
        params: {
            userUnum: userUnum
        }
    }).then(res => {
        alert('delete ' + res.data);
    }).catch(err => {
        alert('접근 권한이 없습니다.');
    })
};
class UserServices {
    getUserApi = () => {
        return axios({
            url: "https://637b699b10a6f23f7fa80af9.mockapi.io/api/teacher",
            method: "GET"
        });
    };

    addUsersApi = (user) => {
        return axios({
            url: 'https://637b699b10a6f23f7fa80af9.mockapi.io/api/teacher',
            method: "POST",
            data: user,
        });
    };

    getUserByIdApi = (id) => {
        return axios({
            url: `https://637b699b10a6f23f7fa80af9.mockapi.io/api/teacher/${id}`,
            method: "GET"
        })
    }

    updateUserByIdApi = (user) => {
        return axios({
            url: `https://637b699b10a6f23f7fa80af9.mockapi.io/api/teacher/${user.id}`,
            method: "PUT",
            data: user,
        })
    }

    deleteUserApi = function (id) {
        return axios({
            url: `https://637b699b10a6f23f7fa80af9.mockapi.io/api/teacher/${id}`,
            method: "DELETE"
        })
    }
}

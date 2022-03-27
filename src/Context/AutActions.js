export const loginStart = (usuariodatos) =>({
    type:"LOGINS_START"
})

export const loginSuccess = (usuario) =>({
    type:"LOGIN_SUCCESS",
    payload: usuario,
})

export const loginFail = () =>({
    type:"LOGIN_FAIL"
})

export const Logout = () =>({
    type:"LOGOUT"
})
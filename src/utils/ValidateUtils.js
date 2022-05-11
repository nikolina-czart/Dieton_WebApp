import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isEmpty = (value, message) => {
    if (!value) {
        toast.error(message)
        return true
    }
    return false
}

const validateEmail = (email) => {
    if (String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        console.log("True")
        return true

    }
    toast.error("Incorrect e-mail address entered.")
    console.log("False")
    return false
};

const matchPassword = (password, repeatPassword) => {
    if (password === repeatPassword) {
        return true
    }
    toast.error("Passwords don't match")
    return false
}

export { isEmpty, validateEmail, matchPassword }
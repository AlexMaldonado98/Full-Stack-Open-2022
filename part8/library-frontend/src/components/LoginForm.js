import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../graphql/mutations";

export const LoginForm = (props) => {
    const [form,setForm] = useState({
        username: '',
        password: '',
    });

    const [login,result] = useMutation(LOGIN,{
        onError:(error) => console.log(error.graphQLErrors[0].message)
    })

    useEffect(() => {
        if(result.data){
            window.localStorage.setItem('token-library',result.data.login.value)
            props.saveToken(result.data.login.value,'authors')
            setForm({username:'',password:''})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[result.data])

    if (!props.show) return null


    const submit = (event) => {
        event.preventDefault();
        login({variables:{username:form.username,password:form.password}})
    };

    const handleChange = ({target}) => {
        setForm(prev => ({...prev,[target.name]: target.value}))
    };

    return (
        <>
            <form onSubmit={submit} >
                <div>username
                    <input type='text' name="username" value={form.username} onChange={(e) => handleChange(e)}></input>
                </div>
                <div>password
                    <input type='text' name="password" value={form.password} onChange={(e) => handleChange(e)} ></input>
                </div>
                <button>LOGIN</button>
            </form>
        </>
    );
};
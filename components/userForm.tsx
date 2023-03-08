import React,{useState,useEffect} from 'react';
import useUserInfo from "../hook/useUserInfo";
import {useRouter} from "next/router";

function UserForm() {
    const {userInfo,status} = useUserInfo() as any;
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') {
            return;
        }
        if (username === '') {
            const defaultUsername = userInfo?.email?.split('@')[0];
            setUsername(defaultUsername.replace(/[^a-z]+/gi,''));
        }
    }, [status])

    async function handleFormSubmit(e: { preventDefault: () => void; } ) {
        e.preventDefault();
        await fetch('/api/users', {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({username}),
        });
        router.reload();
    }

    if (status === 'loading') {
        return '';
    }
    return (
        <div className="flex h-screen items-center justify-center">
            <input type="text" placeholder="username" />
        </div>
    );
}

export default UserForm;
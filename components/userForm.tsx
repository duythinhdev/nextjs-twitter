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
            setUsername(defaultUsername?.replace(/[^a-z]+/gi,''));
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
            <form className="text-center" onSubmit={handleFormSubmit}>
                <h1 className="text-xl mb-2">Pick a username</h1>
                <input type="text" className="block mb-1 bg-twitterBorder px-3 py-1 rounded-full" placeholder={'username'} value={username} onChange={e => {setUsername(e.target.value)}} />
                <button className="block bg-twitterBlue w-full rounded-full py-1">Continue</button>
            </form>
        </div>
    );
}

export default UserForm;
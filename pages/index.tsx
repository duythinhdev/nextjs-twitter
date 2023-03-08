import {signOut, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import UserNameForm from "../components/userForm";

export default function Home() {
    const {data: session, status} = useSession() as any;
    const [userInfo, setUserInfo] = useState() as any;
    const [userStatus, setUserStatus] = useState('loading');

    function getUserInfo() {
        if (status == 'loading') {
            return;
        }
        fetch(`/api/users?id=${session.user.id}`).then(res => {
            res.json().then(json => {
                setUserInfo(json?.user);
                setUserStatus('done');
            })
        });
    }

    useEffect(() => {
        getUserInfo();
    }, [status])
    if(userStatus == 'loading'){
        return 'loading user info';
    }
    if(!userInfo?.username){
        return <UserNameForm />;
    }

    return (
        <div>
            test
        </div>
    )
}

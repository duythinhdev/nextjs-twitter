import {signOut, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import UserNameForm from "../components/userForm";
import useUserInfo from "@/hook/useUserInfo";

export default function Home() {
    const [userInfo,status] = useUserInfo() as any;

    if(status == 'loading'){
        return 'loading user info';
    }
    if(!userInfo?.username){
        return <UserNameForm />;
    }

    return (
        <div>
            homepage logged in {userInfo.username}
        </div>
    )
}

import {signOut, useSession} from "next-auth/react";
import {useEffect} from "react";

export default function Home() {
    const {data: session, status} = useSession() as any ;
    function getUserInfo() {
        if(status == 'loading'){
            return;
        }
        fetch(`/api/users?id=${session.user.id}` );
    }
    useEffect(() => {
        getUserInfo();
    },[status])
  return (
    <div>
      test
    </div>
  )
}

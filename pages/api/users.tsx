import type { NextApiRequest, NextApiResponse } from 'next';
import {initMongoose} from "@/lib/mongoose";
import User from "../../models/User";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";
interface user {
    email: string;
    emailVerified: null | undefined;
    image: string | undefined;
    name: string | undefined;
    _id: string | undefined;
}
type Data = {
    name: user;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await initMongoose();
    const session: any = await unstable_getServerSession(req, res, authOptions);
    if(req.method === 'PUT'){

        const { username } = req.body;
        await await User.findByIdAndUpdate(session?.user?.id, {username});
        res.json('ok');
    }
    if(req.method === "GET"){
        const id = req.query.id;
        const user = await User.findById(id);
        res.status(200).json({ name: user})
    }
}

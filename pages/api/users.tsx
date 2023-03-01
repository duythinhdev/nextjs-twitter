import type { NextApiRequest, NextApiResponse } from 'next';
import {initMongoose} from "@/lib/mongoose";
import User from "../../models/User";
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
    const id = req.query.id;
    const user = await User.findById(id);
    res.status(200).json({ name: user})
}

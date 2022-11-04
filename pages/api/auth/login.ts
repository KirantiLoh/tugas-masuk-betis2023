import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    if (req.method !== "POST") return res.status(405).json({message: `Method ${req.method} not allowed`});

    const body = req.body;

    if (!body) return res.status(400).json({"message": "Invalid parameters"})

    try {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/`, body);
        console.log(response)
        if (response.status === 200) {
            console.log("Success")
            const data: IAuthResponse = await response.data;
            console.log(data)
            // cookies.set("refresh_token", data.refresh_token, {
            //     secure: true,
            //     samesite: "strict",
            //     path: "/api/auth",
            //     maxAge: 60 * 60 * 24
            // })
            // cookies.set("access_token", data.access_token, {
            //     secure: true,
            //     samesite: "strict",
            //     path: "/api",
            //     maxAge: 60 * 60 * 24
            // })
            return res.status(200).json({access_token: data.access_token, user: data.user});
        }
        else {
            throw new Error("Authentication failed");
        }
    } 
    catch (err) {
        return res.status(500).json(err)
    }
}

export default loginHandler;
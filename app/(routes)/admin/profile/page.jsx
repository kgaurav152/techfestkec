'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from 'js-cookie';
import {toast} from 'sonner'
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/redux/slices/profileSlice";
import { apiConnector } from "@/helpers/apiConnector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card'
import { Building, Mail, Phone} from 'lucide-react';

export const ProfilePage = () => {
    
    const router=useRouter();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(false);

    const { user } = useSelector((state) => state.profile);
    const [participatingEventsData, setparticipatingEventsData] = useState([]);

    const fetchParticipatingEventsData = async () => {
        setLoading(true);
        const obj = {
            user_id: user.id
        }
        try {
            const { data } = await apiConnector("POST","/api/userEvents");
            setLoading(false);
            if (data.success) {
            toast.success("Data Fetched Successfully!");
            setparticipatingEventsData(data.data);
            } else {
            toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchParticipatingEventsData();
    }, []);

    // if(actionSuccess){ 
    //     fetchParticipatingEventsData();
    //     setActionSuccess(false);
    // }

    const logoutHandler = async() =>{
    const {data} = await axios.get('/api/logout');
    if(data.success) {
      toast.success("Logout Successful");
      dispatch(setUserDetails(null));
      Cookies.remove('token');
      Cookies.set("IsLoggedIn", false);

      router.push('/');
    }
  }

  return (
        <div className="h-[100vh] w-11/12 mx-auto flex flex-col items-center mt-2 text-center">
            {user &&
                <Card className="mx-auto max-w-xl mb-4 text-left shadow-lg bg-white/20 backdrop-blur-md ring-1 ring-black/5 text-white">
                    <CardContent>
                        <div className="flex flex-col text-left pt-4">
                            <span className="pr-12">
                                <h1 className="font-extrabold text-center text-xl mb-4">Welcome!</h1>
                                <h2 className="font-bold font-mono text-lg mb-3 flex flex-row">{user.name || 'No Name Found'}</h2>
                                <p className="font-semibold font-mono mb-1 flex flex-row"><Mail className="h-5 w-5 mr-3"/>{user.email || 'Not Available'}</p>
                                <p className="font-semibold font-mono mb-1 flex flex-row"><Phone className="h-5 w-5 mr-3"/>{user.mobile || 'Not Available'}</p>
                                <p className="font-semibold font-mono mb-1 flex flex-row"><Building className="h-5 w-5 mr-3"/>{user.college || 'Not Available'}</p>
                                <p className="font-semibold font-mono mb-1 flex flex-row">TechFusion Id: {user.festId || 'Not Available'}</p>
                                <p className="font-semibold font-mono mb-1 flex flex-row">Payment Status: {user.status}</p>
                            </span>
                            <Button variant="destructive" onClick={logoutHandler} className="flex items-center mt-4">Logout</Button>
                        </div>
                    </CardContent>
                </Card>
            }
        </div>
  )
};

export default ProfilePage;
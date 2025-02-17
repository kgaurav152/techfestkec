'use client'

import React, {useState, useEffect} from "react";
import { usePathname } from 'next/navigation';
import {toast} from 'sonner'
import { apiConnector } from '@/helpers/apiConnector';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { SkeletonCard } from "@/components/SkeletonCard";

export const CertificateDetailPage = () => {
  
    const [certificateDetails, setCertificateDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const pathname = usePathname();
    const parts = pathname.split('/');
    const certId = parts[parts.length - 1];
  
    const fetchCertificateDetails = async () => {
        try{
            const toastId = toast.loading("Loading ....")
            const { data } = await apiConnector("POST", "/api/verifyCertificate",{certId:certId});
            toast.dismiss(toastId);
            setLoading(false)
            if (data.success) {
            setCertificateDetails(data.data);
            } else { 
            }
        } catch (err) {
            console.log(err);
        }
    };
  
    useEffect(() => {
        fetchCertificateDetails();
    }, []);
 
  
    return ( 
            <div className="text-center mb-4 w-11/12 mx-auto text-border flex-col min-h-screen">
                <Card className="mx-auto w-full max-w-xl mb-8 mt-20 text-left min-h-[400px] flex items-center justify-center">
                    <CardContent>    
                   {
                    loading ?  
                    <SkeletonCard/>
            : certificateDetails ? 
                    <>
                    <div className="mb-8 mt-8 text-center"><h2 className="font-bold lg:text-3xl text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Certificate Verified!</h2></div>
                   <div className="max-w-[450px]">
                   <div className='grid grid-cols-10'><span className="col-span-4">Certificate ID</span> <span>-</span> <span className="font-semibold col-span-5">{certificateDetails.certId}</span> </div>
                    <div  className='grid grid-cols-10'><span className="col-span-4">Name</span> - <span className="font-semibold col-span-5">{certificateDetails.name}</span> </div>
                    <div  className='grid grid-cols-10'><span className="col-span-4">College</span> - <span className="font-semibold col-span-5">{certificateDetails.college}</span> </div>
                  
                   </div>
                     <div className='mt-3'>
                        <p className="text-2xl">Participated In :</p>
                         <ul className="list-disc ml-10">
                            {
                                certificateDetails.participatedIn.map((item,i) =>(
                                    <li key={i}>{item.event.name}</li>
                                ))
                            }
                         </ul>
                         </div>


                    </> : <div className="text-red-500 text-xl font-semibold">We {"didn't"} find any details about this certificate</div>
                }
                </CardContent>
                </Card>
            </div> 
    );
  }
  
  export default CertificateDetailPage;
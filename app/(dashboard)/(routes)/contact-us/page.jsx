'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiConnector } from "@/helpers/apiConnector";
import {eventCoordinators} from "@/public/coordinators";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card'
import { Building, Mail, Phone } from 'lucide-react';
import { ChevronsUpDown, Check, Sparkles } from "lucide-react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from "@/components/ui/accordion";
import {
Command,
CommandEmpty,
CommandGroup,
CommandInput,
CommandItem,
} from "@/components/ui/command";
import {
Popover,
PopoverContent,
PopoverTrigger,
} from "@/components/ui/popover";

export const ContactUsPage = () => {
    
    const router=useRouter();

    const [loading, setLoading] = useState(false);
    const [openPop, setOpenPop] = useState(false);  
    const [value, setValue] = useState("");
    const [eventData, setEventData] = useState([]);
    const [actionSuccess, setActionSuccess] = useState(false);

    const [participatingEventsData, setparticipatingEventsData] = useState([]);

    const fetchEvents = async () => {
        // setIsLoading(true);
        try {
            const { data } = await apiConnector("POST","/api/event/getAllEvent")
            // setIsLoading(false);
            if (data.success) {
            const unRestructuredEvents=data.data;
            const restructuredEvents = unRestructuredEvents.map((event) => ({
              label: `${event.eventId} - ${event.name}`,
              value: event._id,
              // participationMode:event.participationMode
            }));
            setEventData(restructuredEvents);
            } else {
            toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }
      
    useEffect(() => {
        fetchEvents();
    }, []);

    // if(actionSuccess){ 
    //     fetchParticipatingEventsData();
    //     setActionSuccess(false);
    // }


  return (
        <div className="flex flex-col items-center mt-2 mb-8 text-center">
            {/* {user &&
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
            } */}
            <div className="text-left text-white mb-4 w-4/5 border-2 border-orange-100 p-4 md:p-10 ">
                <h2 className='text-2xl text-center underline text-white font-bold'>FAQs</h2>
                <h4 className='flex flex-row text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-bold mt-5'><SparklesIcon className="text-[#b49bff] mr-2 h-5 w-5" />About TechFusion:</h4>
                <Accordion type="single" collapsible className="ml-2 md:ml-4 mr-1 md:mr-4">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is TechFusion?</AccordionTrigger>
                        <AccordionContent>                       
                        TechFusion is the annual four-day technical cum cultural festival held at Katihar Engineering College, Katihar. 
                        It features a diverse range of events covering various engineering domains and cultural activities.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What can participants expect at TechFusion?</AccordionTrigger>
                        <AccordionContent>
                        Participants can expect engaging technical competitions, workshops, cultural performances, and activities. The festival aims to foster learning, creativity, and entertainment.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <h4 className='flex flex-row text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-bold mt-5'><SparklesIcon className="text-[#b49bff] mr-2 h-5 w-5" />Participation and Rewards:</h4>
                <Accordion type="single" collapsible className="ml-2 md:ml-4 mr-1 md:mr-4 text-left">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What are the benefits of participating in TechFusion?</AccordionTrigger>
                        <AccordionContent>
                        Participants receive participation certificates, and winners are awarded winning certificates and cash rewards. 
                        The total pool prize amounts to Rs 2 Lakhs across different events.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How diverse are the events at TechFusion?</AccordionTrigger>
                        <AccordionContent>
                        TechFusion hosts a wide array of events encompassing nearly all engineering disciplines, ensuring a platform for participants with varied interests.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <h4 className='flex flex-row text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-bold mt-5'><SparklesIcon className="text-[#b49bff] mr-2 h-5 w-5" />Registration and Venue:</h4>
                <Accordion type="single" collapsible className="ml-2 md:ml-4 mr-1 md:mr-4 text-left">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How do I register for TechFusion?</AccordionTrigger>
                        <AccordionContent>
                        Register on the registration page of the website, fill in the required details, and make the payment to the provided bank account. 
                        Account verification enables enrollment in desired events.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>When and where does TechFusion take place?</AccordionTrigger>
                        <AccordionContent>
                        TechFusion will be held from January 25th to January 28th, 2024, at Katihar Engineering College, Katihar&apos;s campus.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <h4 className='flex flex-row text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-bold mt-5'><SparklesIcon className="text-[#b49bff] mr-2 h-5 w-5" />Accommodation and Food Options:</h4>
                <Accordion type="single" collapsible className="ml-2 md:ml-4 mr-1 md:mr-4 text-left">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Do you provide accommodation?</AccordionTrigger>
                        <AccordionContent>
                        Yes, hostel accommodation is available on campus at Rs 50 per day. 
                        Participants can avail of accommodation from January 24th until January 29th, upon their arrival at the campus.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How can I book accommodation?</AccordionTrigger>
                        <AccordionContent>
                        Upon arrival at the campus, accommodation will be allotted to participants.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What food options are available during the festival?</AccordionTrigger>
                        <AccordionContent>
                        Participants can avail themselves of food at the campus canteen/mess or opt for a food voucher system at Rs 50 per meal at our partnered mess.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <h4 className='flex flex-row text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-bold mt-5'><SparklesIcon className="text-[#b49bff] mr-2 h-5 w-5" />Contacting Event Coordinators and Further Assistance:</h4>
                <Accordion type="single" collapsible className="ml-2 md:ml-4 mr-1 md:mr-4 text-left">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How can I reach event coordinators for assistance?</AccordionTrigger>
                        <AccordionContent>
                        Select your desired event from the dropdown in section below to access the contact details of respective coordinators for event-related queries.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Where can I find more information about Katihar Engineering College, Katihar?</AccordionTrigger>
                        <AccordionContent>
                        For details about Katihar Engineering College and its programs, visit the official college website{" "}<a className="text-blue-400" href="http://keck.ac.in" target="_blank">http://keck.ac.in</a>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="flex flex-col items-center mt-4 p-4 w-4/5 text-center">
                <h3 className='text-xl text-white font-bold'>Select event from below to get contact details of Co-ordinators</h3>
                <div className='container mt-4 mb-5'>
                    <Popover open={openPop} onOpenChange={setOpenPop}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openPop}
                            className={cn(
                                "justify-between",
                                !value && "text-muted-foreground"
                            )}
                            >
                            {value?eventData.find(
                                    (event) => event.value === value
                                )?.label
                                : "Select Event"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                            <CommandInput placeholder="Search Event..." />
                            <CommandEmpty>No Event found.</CommandEmpty>
                            <CommandGroup>
                                    {eventData.map((event) => (
                                    <CommandItem
                                        value={event.label}
                                        key={event.value}
                                        onSelect={() => {
                                        setValue(event)
                                        setOpenPop(false);
                                        }}
                                    >
                                        <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === event.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                        />
                                        {event.label}
                                    </CommandItem>
                                    ))}
                            </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
  )
};

export default ContactUsPage;
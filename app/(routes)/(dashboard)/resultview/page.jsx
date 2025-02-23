'use client'

import React, { useEffect, useState } from 'react';
import { apiConnector } from '@/helpers/apiConnector';
import {toast} from 'sonner'
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check, Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DataTable from './data-table';
import { columns } from './columns';

export const ViewResultPage = () => {

    const [loading, setLoading] = useState(false);
    const [openPop, setOpenPop] = useState(false);  
    const [openCalPop, setOpenCalPop] = useState(false);  
    const [value, setValue] = React.useState("");
    const [round, setRound] = React.useState();
    const [eventData, setEventData] = useState([]);
    const [participantData, setParticipantData] = useState([]);
    const [data,setData] = useState([]);
    const [allResultId,setAllResultId] = useState(null)

    
    const fetchEvents = async () => {
      try {
        const { data } = await apiConnector("POST","/api/event/getAllEvent")
        if (data.success) {
          const unRestructuredEvents=data.data;
          const restructuredEvents = unRestructuredEvents.map((event) => ({
            label: `${event.eventId} - ${event.name}`,
            value: event._id,
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

    const fetchEventResult = async (event_id) => { 
      setData([]);
      setParticipantData([]);
      setRound();
      setLoading(true);
      const obj = {
          event_id: event_id
      }
      try { 
        const { data } = await apiConnector("POST","/api/result/view",obj);
        // console.log(data)
        setLoading(false);
        if (data.success) {
            console.log(data.data)
            if(data.data.length==0){
                toast.error("Result is not Created Yet !!!");
                return;
              }
          toast.success("Result Fetched Successfully!");
          setData(data.data);
          
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }

    const setParticipants = (id) =>{
      const temp = data.find((data)=> data._id === id);
      setAllResultId(temp._id);
      // temp._id chahiye delete ke lie
      //isko ek variable me set krke table me pass kr dena table me delte me use kr lena
      // {
          // _id
      //   event : ,
      //   round : ,
      //   result:[]
      // }
    
      setParticipantData(temp.result);
      // result me jo array hai object ka id hai wo ek particular participation ka 
      // jis object to delete krege uska id 
    }


    return (
      <div className="flex flex-col items-center w-11/12 mx-auto mt-2 text-center min-h-screen">
        <h1 className='text-3xl text-white font-bold mb-8 mt-4'>View Result by Event</h1>
        <div className='container flex lg:flex-row flex-col justify-center mt-4 mb-5 w-full gap-4'>
            <Popover open={openPop} onOpenChange={setOpenPop} className="mt-4 mb-2">
                <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPop}
                    className={cn(
                        "justify-between w-[300px]",
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
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                    <CommandInput placeholder="Search Event..." />
                    <CommandEmpty>No Event found.</CommandEmpty>
                    <ScrollArea className="h-48 overflow-auto">
                        <CommandGroup>
                                {eventData.map((event) => (
                                <CommandItem
                                    value={event.label}
                                    key={event.value}
                                    onSelect={() => {
                                    setValue(event.value)
                                    setOpenPop(false);
                                    fetchEventResult(event.value);
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
                    </ScrollArea>
                    </Command>
                </PopoverContent>
            </Popover>
            <Select onValueChange={(v) => {setRound(v); setParticipants(v) }} value={round}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Round" />
              </SelectTrigger>
              <SelectContent>
                {
                  data.map((item)=>(
                    <SelectItem key={item._id} value={item._id}>{item.round}</SelectItem>
                  ))
                } 
              </SelectContent>
            </Select>
            {/* <Popover open={openCalPop} onOpenChange={setOpenCalPop} className="mt-4 mb-2">
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                    setDate(d);                        
                    setOpenCalPop(false);                        
                    }}
                    initialFocus
                    />
                </PopoverContent>
            </Popover> */}
        </div>
        {round && participantData.length>0 && 
            <div className='text-white'>
                <DataTable columns={columns(setParticipantData,allResultId)} data={participantData}/>
            </div>
        }
      </div>
)};

export default ViewResultPage;
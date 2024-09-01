import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PrevTeamModal({year}){

    const [memberData, setMemberData] = useState([]);

    const [domain, setDomain] = useState("Core Team");

    const getPrevTeamData = async() => {
        try {
            const teamData = await axios.get(`/api/team?year=${year}`);
            if (!teamData.data.cached) setMemberData(teamData.data.data);
            else setMemberData(teamData.data.cached);
        } catch (err) {
            console.log(err);
        } finally {
            console.log("done");
            console.log(memberData);
        }
    }

    useEffect(() => {
        getPrevTeamData();
    }, [year]);

    return(
        <div className="absolute z-10 flex flex-col gap-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-72 rounded-[10px] bg-[#203a61d6] lg:h-[85%] lg:w-[95%] h-[85%] w-[90%] overflow-y-scroll overflow-x-hidden">
            <CoreTeamDomain />
            <PrevTeamDomain domain={domain} />
        </div>
    )
}


function CoreTeamDomain(){
    return(
        <div className="relative flex flex-col items-center justify-start ">
            <h1 className="flex items-center justify-center text-xl text-[#0092cd] py-2 h-auto w-full font-bold">Core Team</h1>
            <div className="flex flex-col items-center justify-center w-full h-auto gap-10">
                <div className='flex lg:flex-row flex-col gap-8'>
                    <div className="flex items-center bg-[url('/images/svgs/event-bg.svg')] bg-cover bg-center justify-center lg:w-[25rem] lg:h-[18rem] w-[20rem] h-[14rem] rounded-md">

                    </div>
                    <div className="flex items-center bg-[url('/images/svgs/event-bg.svg')] bg-cover bg-center justify-center lg:w-[25rem] lg:h-[18rem] w-[20rem] h-[14rem] rounded-md">

                    </div>
                </div>
                <div className="flex flex-wrap-reverse items-center justify-center w-full h-auto gap-10 text-[#0092cd]">
                   {Array(5).fill().map((_,i)=>(
                        <div key={i} className="flex items-center bg-[url('/images/svgs/event-bg.svg')] bg-cover bg-center justify-center lg:w-[25rem] lg:h-[18rem] w-[20rem] h-[14rem] rounded-md">
                            <div className='h-full w-[40%] bg-slate-500 flex items-center justify-center p-1'></div>
                            <div className='h-full w-[60%] bg-slate-700 flex flex-col p-2 items-start justify-center gap-5'>
                                <h2 className='text-wrap'><b>Name:</b> Soham Panchal</h2>
                                <h2 className='text-wrap'><b>Position:</b> Technical Head</h2>
                                <div className='flex flex-row w-full items-center justify-between px-8'>
                                    <span>X</span>
                                    <span>X</span>
                                    <span>X</span>
                                </div>
                            </div>
                        </div>
                   ))}
                </div>
            </div>
        </div>
    )
}

function PrevTeamDomain({domain}){
    return(
        <div className="relative flex flex-col items-center justify-start">
            <h1 className="flex items-center justify-center text-xl text-[#0092cd] py-2 h-auto w-full font-bold">{domain}</h1>
            <div className="flex flex-wrap items-center justify-center w-full h-[35rem] gap-10">
                <div className="flex items-center bg-[url('/images/svgs/event-bg.svg')] bg-cover bg-center justify-center lg:w-[25rem] lg:h-[18rem] w-[20rem] h-[14rem] rounded-md">

                </div>
                <div className="flex flex-wrap-reverse items-center justify-center w-full h-auto gap-10 text-[#0092cd]">
                   {Array(5).fill().map((_,i)=>(
                        <div key={i} className="flex items-center bg-[url('/images/svgs/event-bg.svg')] bg-cover bg-center justify-center lg:w-[25rem] lg:h-[18rem] w-[20rem] h-[14rem] rounded-md">
                            <div className='h-full w-[40%] bg-slate-500 flex items-center justify-center p-1'></div>
                            <div className='h-full w-[60%] bg-slate-700 flex flex-col p-2 items-start justify-center gap-5'>
                                <h2 className='text-wrap'><b>Name:</b> Soham Panchal</h2>
                                <h2 className='text-wrap'><b>Position:</b> Technical Head</h2>
                                <div className='flex flex-row w-full items-center justify-between px-8'>
                                    <span>X</span>
                                    <span>X</span>
                                    <span>X</span>
                                </div>
                            </div>
                        </div>
                   ))}
                </div>
            </div>
        </div>
    )
}

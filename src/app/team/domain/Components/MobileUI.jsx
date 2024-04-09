import Link from 'next/link';
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

function MobileUI({data, handlePrev, handleNext, handleAvatarClick}) {
  return (
    <div className="relative flex flex-col items-center justify-end w-full bottom-0 h-[30%] bg-opacity-30 bg-[#102240] bg-center bg-cover text-[#f0f0f0]">
      <button onClick={handleAvatarClick} className="absolute top-1 p-1 px-2 text-base rounded-md bg-slate-500">
        Zoom
      </button>
      <div className="flex flex-col items-center justify-between h-[83%] w-full mt-[5px]">
        <div className="flex flex-row justify-between items-center w-[80%] h-[20%] text-lg">
          <div className="text-wrap">{data?.fullName}</div>
          <div className="text-wrap text-[#70c0df] text-[1rem] leading-tight w-[35%]">{data?.position}</div>  {/*  */}
        </div>
        <div className="flex flex-row justify-between items-center w-[80%] h-[20%] text-lg">
          <div className="text-wrap">{data?.year}, {data?.aboutMes}</div>
          <div className="text-wrap text-[#70c0df] text-[1rem] leading-tight w-[35%]">{data?.domain}</div>  {/*  */}
        </div>
        <div className="flex flex-row justify-between w-[50%] min-h-[10%] text-base">
            <button onClick={handlePrev} className="p-1 px-2 rounded-md bg-slate-500">Prev</button>
            <button onClick={handleNext} className="p-1 px-2 rounded-md bg-slate-500">Next</button>
        </div>
        <div className="flex flex-row justify-between w-[80%] min-h-[10%] text-sm">
            {data?.githubLink && <Link href={data?.githubLink}><img src="/images/svgs/github.svg" alt="GitHub Icon" /></Link> }
            {data?.linkedinLink && <Link href={data?.linkedinLink}><img src="/images/svgs/linkedin.svg" alt="LinkedIn Icon" /></Link>}
            {data?.xLink && <Link href={data?.xLink}><img className="w-8 h-8" src="/images/svgs/x.svg" alt="X Icon" /></Link>}
        </div>
        <div className="flex flex-row text-center justify-center w-[90%] min-h-[10%] text-[0.75rem]">
            Scroll up-down to rotate{" "} 
        </div>
      </div>
    </div>
  );
}

export default MobileUI;

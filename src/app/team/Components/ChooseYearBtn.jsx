import { useEffect } from "react";


function ChooseYearBtn({ year, setYear }) {

   
    return (
        <div className="absolute flex items-center justify-center rounded-[8px] bg-[#203a61d6] border-[#0078D4] border-[1px] top-6 right-1/2 translate-x-1/2 w-auto px-3 py-1 h-auto cursor-pointer z-50 ">
            <label htmlFor="select" className="font-bold text-[#0078D4]">Year</label>
            <select defaultValue={year} onChange={(e)=>{setYear(e.target.value)}} className="flex items-center justify-center p-2 bg-transparent focus:border-none" >
                {/* <option value="2020-21" className="bg-[#203a61d6]">2020-21</option> */}
                <option value="2021-22" className="bg-[#203a61d6]">2021-22</option>
                <option value="2022-23" className="bg-[#203a61d6]">2022-23</option>
                <option value="2023-24" className="bg-[#203a61d6]">2023-24</option>
                <option value="2024-25" className="bg-[#203a61d6]">2024-25</option>
            </select>
        </div>
    )
}

export default ChooseYearBtn;
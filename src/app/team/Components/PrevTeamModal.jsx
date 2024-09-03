import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function PrevTeamModal({ year }) {
  const [memberData, setMemberData] = useState([]);

  const getPrevTeamData = async () => {
    try {
      const teamData = await axios.get(`/api/team?year=${year}`);

      if (!teamData.data.cached) {
        setMemberData(teamData.data.data);
        // console.log("Cached data not found");
      } else setMemberData(teamData.data.cached);
      console.log(memberData);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("done");
    }
  };

  useEffect(() => {
    getPrevTeamData();
  }, [year]);

  return (
    <div className="absolute z-10 flex flex-col gap-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-72 rounded-[10px] bg-[#203a61d6] lg:h-[85%] lg:w-[95%] h-[85%] w-[90%] overflow-y-scroll overflow-x-hidden">
      <CoreTeamDomain memberData={memberData} />
      <PrevTeamDomain memberData={memberData} />
    </div>
  );
}

function CoreTeamDomain({ memberData }) {
  const groupedByDomain = memberData.reduce((acc, obj) => {
    const domain = obj.domain;
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push(obj);
    return acc;
  }, {});

  //   console.log("CORE", groupedByDomain["Core"]);

  let President;
  let VicePresident;

  if (groupedByDomain["Core"] !== undefined) {
    President = groupedByDomain["Core"].filter(
      (item) => item.position === "President"
    );
    VicePresident = groupedByDomain["Core"].filter(
      (item) => item.position === "Vice President"
    );
  }

  return (
    <div className="relative flex flex-col items-center text-[#39b7e9] justify-start ">
      <h1 className="flex items-center justify-center text-xl py-2 h-auto w-full font-bold">
        Core Team
      </h1>
      <div className="flex flex-col items-center justify-center w-full h-auto gap-10">
        <div className="flex lg:flex-row flex-col gap-8">
          <div className="flex items-center bg-[url('/images/svgs/event-bg.svg')] bg-cover bg-center justify-center lg:w-[25rem] lg:h-[18rem] w-[20rem] h-[14rem] rounded-md">
            <div className="h-full w-[40%] bg-slate-500 flex items-center justify-center p-1"></div>
            <div className="h-full w-[60%] flex flex-col p-2 items-start justify-center gap-5">
              <h2 className="text-wrap">
                <b>Name: </b>  {President && President[0]?.fullName}
              </h2>
              <h2 className="text-wrap">
                <b>Position:</b> {President && President[0]?.position}
              </h2>
              <div className="flex flex-row w-full items-center justify-between px-8">
                {President && President[0].githubLink !== undefined && (
                  <span>
                    <Link href={President[0].githubLink}>
                      <img src="/images/svgs/github.svg" alt="" />
                    </Link>{" "}
                  </span>
                )}

                {President && President[0].linkedinLink !== undefined && (
                  <span>
                    <Link href={President[0].linkedinLink}>
                      <img src="/images/svgs/linkedin.svg" alt="" />
                    </Link>
                  </span>
                )}

                {President && President[0].xLink !== undefined && (
                  <span>
                    <Link href={President[0].xLink}>
                      <img src="/images/svgs/x.svg" alt="" />
                    </Link>{" "}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center bg-[url('/images/svgs/event-bg.svg')] bg-cover bg-center justify-center lg:w-[25rem] lg:h-[18rem] w-[20rem] h-[14rem] rounded-md">
            <div className="h-full w-[40%] bg-slate-500 flex items-center justify-center p-1"></div>
            <div className="h-full w-[60%] flex flex-col p-2 items-start justify-center gap-5">
              <h2 className="text-wrap">
                <b>Name:</b> {VicePresident && VicePresident[0]?.fullName}
              </h2>
              <h2 className="text-wrap">
                <b>Position:</b> {VicePresident && VicePresident[0]?.position}
              </h2>
              <div className="flex flex-row w-full items-center justify-between px-8">
                {VicePresident && VicePresident[0].githubLink !== undefined && (
                  <span>
                    <Link href={VicePresident[0].githubLink}>
                      <img src="/images/svgs/github.svg" alt="" />
                    </Link>{" "}
                  </span>
                )}

                {VicePresident && VicePresident[0].linkedinLink !== undefined && (
                  <span>
                    <Link href={VicePresident[0].linkedinLink}>
                      <img src="/images/svgs/linkedin.svg" alt="" />
                    </Link>
                  </span>
                )}

                {VicePresident && VicePresident[0].xLink !== undefined && (
                  <span>
                    <Link href={VicePresident[0].xLink}>
                      <img src="/images/svgs/x.svg" alt="" />
                    </Link>{" "}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap-reverse items-center justify-center w-full h-auto gap-10 text-[#39b7e9]">
          {groupedByDomain &&
            groupedByDomain["Core"]?.map((item, i) => {
              if (
                item.position === "President" ||
                item.position === "Vice President"
              )
                return null;
              else
                return (
                  <div
                    key={i}
                    className="flex items-center bg-[url('/images/svgs/event-bg.svg')] bg-cover bg-center justify-center lg:w-[25rem] lg:h-[18rem] w-[20rem] h-[14rem] rounded-md"
                  >
                    <div className="h-full w-[40%] bg-slate-500 flex items-center justify-center p-1"></div>
                    <div className="h-full w-[60%] flex flex-col p-2 items-start justify-center gap-5">
                      <h2 className="text-wrap">
                        <b>Name:</b> {item.fullName}
                      </h2>
                      <h2 className="text-wrap">
                        <b>Position:</b> {item.position}
                      </h2>
                      <div className="flex flex-row w-full items-center justify-between px-8">
                        {item.githubLink !== undefined && (
                          <span>
                            <Link href={item.githubLink}>
                              <img src="/images/svgs/github.svg" alt="" />
                            </Link>
                          </span>
                        )}
                        {item.linkedinLink !== undefined && (
                          <span>
                            <Link href={item.linkedinLink}>
                              <img src="/images/svgs/linkedin.svg" alt="" />
                            </Link>
                          </span>
                        )}
                        {item.xLink !== undefined && (
                          <span>
                            <Link href={item.xLink}>
                              <img src="/images/svgs/x.svg" alt="" />
                            </Link>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
            })}
        </div>
      </div>
    </div>
  );
}

function PrevTeamDomain({ memberData }) {

  const [domainLead, setDomainLead] = useState();
  const groupedByDomain = memberData.reduce((acc, obj) => {
    const domain = obj.domain;
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push(obj);
    return acc;
  }, {});

  return (
    <div className="relative flex flex-col items-center text-[#39b7e9] justify-start">
      {Object.keys(groupedByDomain).map((domain, j) => {
        if (domain === "Past year" || domain === "Core") return null;
        else
          return (
            <div className="w-full h-full" key={j}>
              <h1 className="flex items-center justify-center text-xl py-2 h-auto w-full font-bold">
                {domain}
              </h1>
              
             <div className="flex flex-wrap items-center justify-center w-full h-auto gap-10">
              {groupedByDomain[domain] && groupedByDomain[domain].filter((item) => item.position === "Domain Lead")[0] &&
                <div className="flex items-center bg-[url('/images/svgs/event-bg.svg')] bg-cover bg-center justify-center lg:w-[25rem] lg:h-[18rem] w-[20rem] h-[14rem] rounded-md">
                  <div className="h-full w-[40%] bg-slate-500 flex items-center justify-center p-1"></div>
                  <div className="h-full w-[60%] flex flex-col p-2 items-start justify-center gap-5">
                    <h2 className="text-wrap">
                      <b>Name:</b>{" "}
                      {groupedByDomain[domain].filter((item) => item.position === "Domain Lead")[0]?.fullName}
                    </h2>
                    <h2 className="text-wrap">
                      <b>Position:</b> Domain Lead
                    </h2>
                    <div className="flex flex-row w-full items-center justify-between px-8">
                      {groupedByDomain[domain].filter((a) => a.position=== "Domain Lead")[0]?.githubLink !== undefined && (
                        <span>
                          <Link href={groupedByDomain[domain].filter((a) => a.position=== "Domain Lead")[0]?.githubLink}>
                            <img src="/images/svgs/github.svg" alt="" />
                          </Link>{" "}
                        </span>
                      )}

                      {groupedByDomain[domain].filter((a) => a.position=== "Domain Lead")[0]?.linkedinLink !== undefined && (
                        <span>
                          <Link href={groupedByDomain[domain].filter((a) => a.position=== "Domain Lead")[0]?.linkedinLink}>
                            <img src="/images/svgs/linkedin.svg" alt="" />
                          </Link>
                        </span>
                      )}

                      {groupedByDomain[domain].filter((a) => a.position=== "Domain Lead")[0]?.xLink !== undefined && (
                        <span>
                          <Link href={groupedByDomain[domain].filter((a) => a.position=== "Domain Lead")[0].xLink}>
                            <img src="/images/svgs/x.svg" alt="" />
                          </Link>{" "}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
          }
                 <div className="flex flex-wrap-reverse items-center justify-center w-full h-auto gap-10 text-[#39b7e9]">
                  {groupedByDomain[domain].map((item, i) => {
                    if (item.position === "Domain Lead") return null;
                    else
                      return (
                        <div
                          key={i}
                          className="flex items-center bg-[url('/images/svgs/event-bg.svg')] bg-cover bg-center justify-center lg:w-[25rem] lg:h-[18rem] w-[20rem] h-[14rem] rounded-md"
                        >
                          <div className="h-full w-[40%] bg-slate-500 flex items-center justify-center p-1"></div>
                          <div className="h-full w-[60%] flex flex-col p-2 items-start justify-center gap-5">
                            <h2 className="text-wrap">
                              <b>Name:</b> {item.fullName}
                            </h2>
                            <h2 className="text-wrap">
                              <b>Position:</b> {item.position}
                            </h2>
                            <div className="flex flex-row w-full items-center justify-between px-8">
                              {item.githubLink !== undefined && (
                                <span>
                                  <Link href={item.githubLink}>
                                    <img src="/images/svgs/github.svg" alt="" />
                                  </Link>{" "}
                                </span>
                              )}

                              {item.linkedinLink !== undefined && (
                                <span>
                                  <Link href={item.linkedinLink}>
                                    <img
                                      src="/images/svgs/linkedin.svg"
                                      alt=""
                                    />
                                  </Link>
                                </span>
                              )}

                              {item.xLink !== undefined && (
                                <span>
                                  <Link href={item.xLink}>
                                    <img src="/images/svgs/x.svg" alt="" />
                                  </Link>{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>
            </div>
          );
      })}
    </div>
  );
}

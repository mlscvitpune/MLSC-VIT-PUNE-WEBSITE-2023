"use client";
import { useEffect, useState } from "react";

import axios from "axios";

import { useRef } from "react";
import Image from "next/image";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import { CldUploadButton, CldImage } from "next-cloudinary";

import Button from "../components/Button";
import Searchbox from "../components/Searchbox";
import Sidepanel from "../components/Sidepanel";
import { Selectbox, Textbox, Textboxico } from "../components/Textbox";
import Domainoutput from "./Domainoutput";
import WhichDomain from "./WhichDomain";
import { useServerSession } from "./hooks";

//TODO: api/jobs/<teams | events | projects | teams | blogs , cache refresing

function AddTeamMember() {
  // const {data: session} = useSession();
  // const userSession = useSession();

  // console.log("session = " + JSON.stringify(userSession.data))

  const [userSession, setUserSession] = useState(null);
  useEffect(() => {
    const getSession = async () => {
      const session = await useServerSession();
      setUserSession(session);
      console.log(session);
    };
    getSession();
  }, []);

  const [formData, setFormData] = useState({
    academicYear: "",
    name: "",
    domain: "",
    department: "",
    position: "",
    photoURL: "",
    modelURL: "",
    mail: "",
    githubID: "",
    twitterID: "",
    linkedinID: "",
  });

  const [seeDomains, setSeeDomains] = useState(true);
  // console.log(seeDomains)
  const [output, setoutput] = useState([]);
  const [whichDomain, setWhichDomain] = useState("Core Team");
  const [memberData, setMemberData] = useState([]);
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTeamData = async () => {
    try {
      const teamData = await axios.get("/api/team");
      setMemberData(teamData.data.data);
      // setMemberData([]);
      // console.log(JSON.stringify(teamData.data.data[0].domain))
    } catch (err) {
      console.log("GET req error");
      // console.log(err);
      return err;
    }
  };

  // console.log(memberData);
  useEffect(() => {
    getTeamData();

    // setMemberData(teamData.data.data);
    // console.log(memberData)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const res = async () => {
      try {
        const body = {
          fullName: formData.name,
          domain: formData.domain,
          position: formData.position,
          year: formData.academicYear,
          xLink: formData.twitterID,
          email: userSession?.user.email ?? formData.mail,
          linkedinLink: formData.linkedinID,
          githubLink: formData.githubID,
          aboutMe: formData.department,
          imageLink: formData.photoURL,
          modelLink: formData.modelURL,
        };
        const { data, status } = await axios.post(`/api/team`, body);

        if (status === 200) alert("Data added successfully!");

        console.log("DATA AND STATUS");
        console.log(data, status);
      } catch (err) {
        console.log(err);
      }
    };

    await res();
    const cache = await axios.get("/api/jobs/teams");

    console.log(cache);

    window.location.reload();
  };

  return (
    <div className="flex flex-row justify-center bg-[#666666] h-screen w-screen text-[#F0F0F0]">
      <div className="flex flex-col items-center p-5 h-full w-3/5">
        <div className="flex flex-row items-center w-full h-[25%] rounded-t-[40px] rounded-bl-[40px] bg-black">
          <div className="flex flex-col item-start gap-5 h-full w-[30%] p-7 font-light ">
            <div className="text-2xl">MLSC</div>
            <img
              src="/images/MLSC LOGO.png"
              alt="MLSC VIT Pune"
              width={50}
              height={50}
            />
          </div>

          <div className="flex flex-row w-[70%] h-full items-center text-[#0078D4] text-2xl gap-3 font-light ml-32">
            <span>Hi, {userSession?.user.name}</span>
            {formData.photoURL ? (
              <img
                className="rounded-lg"
                src={`https://res.cloudinary.com/df4li6iqc/image/upload/v1712430857/mlsc-team-profile-pics/${formData.photoURL}`}
                width="80"
                height="80"
              />
            ) : (
              <span className="text-xs text-wrap w-44 h-24 bg-slate-500 rounded-lg p-2 text-[#f0f0f0]">
                Filename of the photo you upload should be your lowercased full name separated by a dash <span className="text-yellow-300">'-'</span>. eg. "soham-panchal" 
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between w-full h-[75%] rounded-b-[40px]  rounded-[40px] rounded-tr-[0px]">
          <Sidepanel />
          <div className="flex gap-5 flex-col h-full w-[91%] rounded-b-[40px] bg-black px-20">
            <Textboxico
              name="name"
              onChange={handleChange}
              label="Team Member Name"
              icons="/icons/user.svg"
              type="text"
            />
            <div className="flex flex-row gap-4 justify-between">
              <Selectbox
                name="domain"
                label="Domain"
                onChange={handleChange}
                options={[
                  "__select__",
                  "Core",
                  "AI-ML",
                  "App dev",
                  "Community management",
                  "Event Management",
                  "IoT",
                  "Multimedia",
                  "Partnership",
                  "Web development",
                  "Web3",
                ]}
              />
              <Selectbox
                name="position"
                onChange={handleChange}
                label="Position"
                options={[
                  "__select__",
                  "President",
                  "Vice President",
                  "Management Head",
                  "Technical Head",
                  "Multimedia Head",
                  "Domain lead",
                  "Coordinator",
                ]}
              />
            </div>
            <div className="flex flex-row justify-evenly gap-4 w-full">
              <Selectbox
                name="academicYear"
                onChange={handleChange}
                label="Year"
                options={["2021-22", "2022-23", "2023-24"]}
              />
              <Selectbox
                name="department"
                onChange={handleChange}
                label="Department"
                options={[
                  "__select__",
                  "CS",
                  "CS-AI",
                  "CS-ML",
                  "IT",
                  "AI-DS",
                  "EnTc",
                  "Mech",
                  "Chem",
                  "Instru",
                ]}
              />
            </div>

            <div className="flex flex-row justify-evenly gap-4 w-full">
              <Textboxico
                name="githubID"
                onChange={handleChange}
                label="Github"
                icons="/icons/github-form.svg"
              />
              <Textboxico
                name="linkedinID"
                onChange={handleChange}
                label="LinkedIn"
                icons="/icons/linkedin-form.svg"
              />
            </div>

            <div className="flex flex-row justify-evenly gap-4 w-full">
              {/*{!userSession && !userSession.user.email &&  */}
              {!userSession?.user.email && (
                <Textboxico
                  name="mail"
                  onChange={handleChange}
                  label="MailID (GitHub)"
                  icons="/icons/mail-form.svg"
                />
              )}
              {/*}*/}
              <Textboxico
                name="twitterID"
                onChange={handleChange}
                label="X"
                icons="/icons/X-form.svg"
              />
            </div>

            <div className="flex flex-row justify-between gap-4 w-full">
              {/* <Textbox
                name="photoURL"
                onChange={handleChange}
                label="Photo"
                type="text"
              /> */}

              <div className="flex flex-row items-center justify-start p-1 gap-3 w-1/2 ">
                {/* <input name="file" 
                  className="w-3/5 text-xs flex items-center justify-center h-full p-1 text-[#f0f0f0] border border-gray-300 rounded-lg cursor-pointer bg-[#373737]  "
                  ref={inputFileRef} type="file" required /> */}
                <CldUploadButton
                  uploadPreset="mlsc-team-preset"
                  options={{ sources: ["local", "camera"], multiple: false }}
                  className="bg-[#a54cc3] text-xs p-2 rounded-[7px] hover:bg-slate-400 active:bg-green-400"
                >Upload Image</CldUploadButton>
                <Textbox
                  name="photoURL"
                  onChange={handleChange}
                  label="Image filename"
                  type="text"
                />
              </div>
              <div className="w-1/2">
                <Textbox
                  name="modelURL"
                  onChange={handleChange}
                  label="Action Figure"
                  type="text"
                />
              </div>
            </div>
            <Button label="Submit" onClick={handleSubmit} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 justify-evenly h-full w-2/5 p-5 bg-[#666666] text-[#bfbdbd]">
        <Searchbox />
        <div className="flex flex-col items-center w-full h-[90%] bg-[#1E1E1E] p-8 px-10  rounded-[40px] border-[#bfbdbd]-2">
          <span className="text-lg text-[#bfbdbd] border-b-2 border-[#bfbdbd] w-full text-center py-3 ">
            All Team Members
          </span>

          {/* Domains */}
          {/* {console.log(seeDomains)} */}
          <div className="w-full h-[88%]">
            {seeDomains ? (
              <Domainoutput
                setSeeDomains={setSeeDomains}
                setWhichDomain={setWhichDomain}
              />
            ) : (
              <WhichDomain
                teamData={memberData}
                whichDomain={whichDomain}
                setWhichDomain={setWhichDomain}
              />
            )}
          </div>

          <div className="flex flex-row items-center gap-5 relative h-8 w-20">
            <MdNavigateBefore
              onClick={() => {
                setSeeDomains(true);
              }}
              className="h-8 w-8 rounded-full p-1 hover:bg-[#373737] active:bg-[#888888]"
            />
            <MdNavigateNext
              onClick={() => setSeeDomains(false)}
              className="h-8 w-8 rounded-full p-1 hover:bg-[#373737] active:bg-[#888888]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddTeamMember;

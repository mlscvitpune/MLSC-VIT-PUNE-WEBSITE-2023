import React, { useState } from 'react';
//import imagevar from "./edit-2.svg";
//import './AddBlogPage.css'; 

const AddBlogPage = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [author, setAuthor] = useState('');
  const [domain, setDomain] = useState('');

  const handleSubmit = () => {
    console.log('Blog Title:', blogTitle);
    console.log('Photo URL:', photoURL);
    console.log('Blog Description:', blogDescription);
    console.log('Publish Date:', publishDate);
    console.log('Author:', author);
    console.log('Domain:', domain);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#6A6A6A] font-jura">
      {/* Header Section */}
      <div className="absolute top-0 left-0 p-4 text-white">
        <img
          src="https://mlscvitpune.club/Images/MLSC%20Logo%20Changed.png"
          alt="Logo"
          className="w-40 h-40"
        />
      </div>

      <div className="container mx-auto my-4 px-4 lg:px-20 flex">
        <div className="w-full md:w-2/3 p-8 my-4 md:px-12 lg:w-3/4 mr-4 rounded-2xl bg-black backdrop-blur-sm relative">
          <div className="flex">
            <h1 className="font-bold uppercase text-4xl my-4 text-white ">Blog</h1>
          </div>
          <div className="grid grid-cols-1 gap-5">

            {/* Input fields  */}
            
            <div className="mb-3 relative">
              <img
                src="your-favicon-url"
                alt="favicon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="text"
                className="block w-full h-10 pl-10 rounded border border-[#0078D4] bg-transparent py-2 outline-none transition-all duration-200 ease-linear text-white"
                id="blogTitleInput"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder="Blog Title"
              />
            </div>

            <div className="mb-3 relative">
              <img
                src="your-favicon-url"
                alt="favicon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="url"
                className="block w-full h-10 pl-10 rounded border border-[#0078D4] bg-transparent py-2 outline-none transition-all duration-200 ease-linear text-white"
                id="PhotoURL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Photo URL"
              />
            </div>

            <div className="mb-3 relative">
              <img
                src="your-favicon-url"
                alt="favicon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="text"
                className="block w-full h-10 pl-10 rounded border border-[#0078D4] bg-transparent py-2 outline-none transition-all duration-200 ease-linear text-white"
                id="PublishDate"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                placeholder="Publish Date"
              />
            </div>

            <div className="mb-3 relative">
              <img
                src="your-favicon-url"
                alt="favicon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="text"
                className="block w-full h-10 pl-10 rounded border border-[#0078D4] bg-transparent py-2 outline-none transition-all duration-200 ease-linear text-white"
                id="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
              />
            </div>

            <div className="mb-3 relative">
              <img
                src="your-favicon-url"
                alt="favicon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="text"
                className="block w-full h-10 pl-10 rounded border border-[#0078D4] bg-transparent py-2 outline-none transition-all duration-200 ease-linear text-white"
                id="Domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Domain"
              />
            </div>

            <div className="my-4">
              <textarea
                placeholder="Blog Description*"
                className="w-full h-12 bg-gray-100 bg-transparent text-gray-900 border-[#0078D4] mt-2 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                value={blogDescription}
                onChange={(e) => setBlogDescription(e.target.value)}
              ></textarea>
            </div>

            <button
              className="absolute bottom-3.5 right-12 uppercase text-sm font-bold tracking-wide bg-[#0078D4] text-gray-100 p-2 rounded-lg focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Add Blog 
            </button>

          </div>
        </div>

        {/* Display Blog Information Section */}
        <div className="w-full md:w-2/3 px-8 py-12 ml-auto rounded-2xl bg-[#1E1E1E] backdrop-blur-sm">
          <div className="flex flex-col text-[#6A6A6A]">
            <h1 className="font-bold uppercase text-4xl my-4 text-white text-center ">All Blogs</h1>
            <div className="my-4">
              <p>
                <span className="text-blue-500">&#8226;</span> Blog Title: {blogTitle}
              </p>
              <div className="my-2 flex items-center">
                <img src="./edit-2.svg" alt="first-favicon" className="ml-2"/>
                <img src="second-favicon-url" alt="second-favicon" className="ml-2" />
              </div>
              <hr className="my-2 border-blue-500" />
              <p>
                <span className="text-blue-500">&#8226;</span> Photo URL: {photoURL}
              </p>
              <div className="my-2 flex items-center">
                <img src="first-favicon-url" alt="first-favicon" className="ml-2" />
                <img src="second-favicon-url" alt="second-favicon" className="ml-2" />
              </div>
              <hr className="my-2 border-blue-500" />
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogPage;

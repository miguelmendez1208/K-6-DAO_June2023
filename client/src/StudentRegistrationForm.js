import React, { useState } from 'react';
import axios from 'axios';
import { mintNFTnoIPFS } from "./utils/interact";

const StudentRegistrationForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    gradeLevel: '',
    school: '',
    walletAddress: '',
    subjects: [],
  });

  const [minting, setMinting] = useState(false);
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState("");
  const [rewardBalance, setRewardBalance] = useState("");
  const [mintedTokens, setMintedTokens] = useState(false);
  const [url, setUrl] = useState("");

  const onJsonMintPressed = async () => { //TODO: implement
    setMinting(true); // Start loading at the beginning of the operation
    const { status } = await mintNFTnoIPFS(url, "testname", "testdescription");
    setStatus(status);
    setMinting(false); // End loading after the operation is performed
    setRewardBalance(rewardBalance);
    setMintedTokens(mintedTokens);
};


  const [subject, setSubject] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const addSubject = () => {
    setForm({
      ...form,
      subjects: [...form.subjects, subject],
    });
    setSubject('');
  };

  const removeSubject = (subjectToRemove) => {
    setForm({
      ...form,
      subjects: form.subjects.filter((subject) => subject !== subjectToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var axios = require('axios');
    const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyMTI2NGRkOC1kOTZlLTQ4MjUtYTAwMC1mOGRhY2JhMDdmOWMiLCJlbWFpbCI6Im1pZ3VlbG1lbmRlejEyMDhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImJkZDNjOWYxNmE3ZTNjMDFiMGIzIiwic2NvcGVkS2V5U2VjcmV0IjoiMjMxNDk2Y2RiYzdiYjM5Yjk5NzRlNDQyMWM2YTI4ZDQ1ZjM4NmYxZGMxMmQwYWFhNmJkM2Q2MTUxZTQyNWZiZSIsImlhdCI6MTY5MDY4ODIyM30.JrWgZcHO1STS80_5fsMjC78-fZ_2ipGrEUl3hAsiolc"
    const bearer = "Bearer " + JWT
    var form_data = JSON.stringify(form)
    console.log(form_data);
    var json_data = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 1
      },
      "pinataContent": {
        form_data
      }
    });
    
    var config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': bearer
      },
      data : json_data
    };
    const res = await axios(config);
    console.log(res.data);
    console.log(res.data.IpfsHash);
    setUrl(res.data.IpfsHash);
  };

  return (
<form onSubmit={handleSubmit} className="space-y-4">
  <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
  <br />
  <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
  <br />
  <input name="gradeLevel" type="text" placeholder="Grade Level" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
  <br />
  <input name="school" type="text" placeholder="School" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
  <br />
  <input name="walletAddress" type="text" placeholder="Wallet Address" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
  <br />
  <div className="flex items-center space-x-2">
    <input name="subject" type="text" placeholder="Subject" value={subject} onChange={handleSubjectChange} className="flex-grow p-2 border border-gray-300 rounded" />
    <br />
    <button type="button" onClick={addSubject} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Subject</button>
    <br />
  </div>
  {form.subjects.map((subject, index) => (
    <div key={index} className="flex items-center justify-between p-2 border border-gray-300 rounded">
      <span>{subject}</span>
      <br /><button type="button" onClick={() => removeSubject(subject)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
    </div>
  ))}
  <button type="submit" className="px-4 py-2 border-blue-800 text-blue-800 bg-blue-800 rounded-md text-center font-bold cursor-pointer">Submit</button>
</form>
  );
};

export default StudentRegistrationForm;
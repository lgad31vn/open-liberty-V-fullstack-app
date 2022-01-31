import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

interface Props {
  placeholder: string;
  name: string;
  type: string;
  handleChange: (e: any, name: string) => void;
}

const Input = ({ placeholder, name, type, handleChange }: Props) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      // value={value}
      onChange={(e) => handleChange(e, name)}
      className='my-2 w-36 rounded-md p-2 border-[1px] border-indigo-400  text-indigo-400  text-sm'
    />
  );
};
const options = [
  { value: 'captain', label: 'Captain' },
  { value: 'officer', label: 'Officer' },
  { value: 'enginer', label: 'Engineer' },
];

const Login = () => {
  interface FType {
    name: string;
    id: string;
    rank: string;
  }
  const [items, setItems] = useState<any>({});
  const [formData, setFormData] = useState<FType>({
    name: '',
    id: '',
    rank: '',
  });
  const handleChange = (e: any, name: string) => {
    setFormData((prevState) => ({
      ...prevState, // copy previous state since it's immutable
      [name]: e.target.value.toLowerCase(), // update name dynamically
    }));
  };

  const handleChange2 = (rankValue: any) => {
    setRankState(rankValue);
    console.log(rankState);
    // setFormData((prevState) => ({
    //   ...prevState, // copy previous state since it's immutable
    //   [name]: e.target.value, // update name dynamically
    // }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { name, id, rank } = formData;

    if (!name || !id || !rank) return; // do nothing if fields are not filled
  };
  const handleSubmit2 = (e: any) => {
    e.preventDefault();

    const { name, id, rank } = formData;

    if (!name || !id || !rank) return; // do nothing if fields are not filled
    console.log(`${name} - ${id} - ${rank}`);
    sendRequest();
  };

  const sendRequest = async () => {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    };
    const res = await axios.get('http://localhost:9080', config);
    setItems(JSON.stringify(res));
    console.log(res);
  };

  const [rankState, setRankState] = useState(null);
  return (
    <div className='flex justify-center p-3 border-[1px]'>
      <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center border-[1px] border-indigo-200 rounded-lg'>
        <div className='font-bold text-4xl text-sky-700 py-5'> Welcome :) </div>
        <div className='flex flex-row justify-between w-full items-centr'>
          <div className='font-semibold text-lg '> Name </div>
          <Input
            placeholder='Your name... '
            name='name'
            type='text'
            handleChange={handleChange}
          />
        </div>
        <div className='flex flex-row justify-between w-full items-center'>
          <div className='font-semibold text-lg '> ID </div>
          <Input
            placeholder='Your crew ID... '
            name='id'
            type='number'
            handleChange={handleChange}
          />
        </div>
        <div className='flex flex-row justify-between w-full items-center'>
          <div className='font-semibold text-xl'> Rank</div>
          <Input
            placeholder='captain, officer, or engineer'
            name='rank'
            type='text'
            handleChange={handleChange}
          />
        </div>
        <div className='h-[1px] w-full bg-gray-400 my-2' />
        <button
          type='button'
          onClick={handleSubmit}
          className='text-white w-full mt-2 border-[1px] p-2 bg-indigo-700 border-[#3d4f7c] rounded-full cursor-pointer hover:opacity-[0.8]'
        >
          Register Member
        </button>
        <button
          type='button'
          onClick={handleSubmit2}
          className='text-white w-full mt-2 border-[1px] p-2 bg-indigo-700 border-[#3d4f7c] rounded-full cursor-pointer hover:opacity-[0.8]'
        >
          Get All Members
        </button>
      </div>
    </div>
  );
};

export default Login;

import axios from 'axios';
import { useEffect, useState } from 'react';

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

const Login = () => {
  interface FType {
    name: string;
    id: string;
    rank: string;
  }
  const a = {
    name: 'Tony Stark',
    id: 123,
    rank: 'Captain',
  };
  const b = JSON.stringify(a);
  const [items, setItems] = useState<any>(b);
  //   setItems(JSON.stringify(a));
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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { name, id, rank } = formData;

    if (!name || !id || !rank) return; // do nothing if fields are not filled
  };
  const handleSubmit2 = (e: any) => {
    e.preventDefault();

    const { name, id, rank } = formData;

    if (!name || !id || !rank) return; // do nothing if fields are not filled
    setItems(JSON.stringify(formData));
    getUsers();
  };

  // http:127.0.1:9080/mongo/db/crew
  const PATH = 'http://127.0.1:9080/mongo/db/crew';
  const PATH_9083 = 'http://localhost:9083/rest-api/users';
  const getUsers = () => {
    fetch(PATH_9083)
      .then((res) => res.json())
      .then((data) => console.log(data));
    // console.log(res.data);
  };

  const addUser = async () => {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers':
          'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
      },
    };
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='flex w-full p-3 justify-center border-[1px]'>
      <div>
        <div className='p-5 sm:w-96 flex flex-col justify-center items-center border-[1px] border-indigo-200 rounded-lg'>
          <div className='font-bold text-4xl text-sky-700 py-5'>
            {' '}
            Welcome :){' '}
          </div>
          <div className='flex flex-row justify-between w-full items-centr'>
            <div className='font-semibold text-lg flex justify-center items-center'>
              {' '}
              Name{' '}
            </div>
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
        <div className='p-5 w-full flex flex-col justify-center items-center border-[1px] border-indigo-200 rounded-lg'>
          <div className='text-lg font-semibold '>API placeholder ...</div>
          <div className=' pt-10'> Data from the http requests goes here</div>

          {items}
        </div>
      </div>
    </div>
  );
};

export default Login;

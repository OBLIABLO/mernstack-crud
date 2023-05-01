import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [list, setList] = useState([]);

  const postData = async () => {
    const result = await axios.post('https://mernstack2.onrender.com/post', { name: name, age: age });
    console.log(result.data);
    setList([...list,{_id:result.data._id,name:name,age:age}]);
  };

  const updatedata = async (id) => {
    const newname = prompt("Enter New Name");
    const newage = prompt("Enter New Age");
    const data = await axios.put(`https://mernstack2.onrender.com/${id}`, { name: newname, age: newage });
    console.log(data);
    setList(list.map((val)=>{
      return val._id==id? {_id:id,name:newname,age:newage}:val
    }))
  };

  const deletedata = async (id) => {
    const data = await axios.delete(`https://mernstack2.onrender.com/${id}`);
    console.log(data);
    setList(list.filter((val)=>{
      return val._id !== id;
    }))
    
  };

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get('https://mernstack2.onrender.com/get');
      console.log(result.data);
      setList(result.data);
    };
    getData();
  }, []);

  return (
    <div>
      <div className="bg-gray-900 p-3 text-white text-center text-4xl font-extrabold">CRUD App</div>
      <div className="bg-gray-900 p-5 h-[30vh] flex flex-col items-center m-3 rounded-md">
        <input type="text" className="m-3 rounded-md w-[25rem] text-lg" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
        <input type="number" className="m-3 rounded-md w-[25rem] text-lg" placeholder="Enter Age" onChange={(e) => setAge(e.target.value)} />
        <button type="submit" className="bg-white rounded-md m-3 font-bold w-[8rem] text-black text-center text-lg" onClick={postData}>
          Submit
        </button>
      </div>
      <div className='bg-black m-3 p-5 rounded-md '>
         {list.map((val) => (
  <div key={val._id} className="bg-gray-800 p-5  flex flex-col text-white font-bold m-3 rounded-md w-[20rem] "style={{border: "2px solid white"}}>
    <div className="flex ">
      <label>Name:</label>
      <h1 className="ml-3">{val.name}</h1>
    </div>
    <div className="flex ">
      <label>Age:</label>
      <h2 className="ml-3">{val.age}</h2>
      <button className='bg-yellow-400 text-black font-bold w-[6rem] rounded-md ml-10' onClick={()=>updatedata(val._id)}>Update</button>
      <button className='bg-red-400 text-black font-bold w-[6rem] rounded-md ml-10' onClick={()=>{deletedata(val._id);window.location.reload(false)}}>Delete</button>
    </div>
  </div>
  
))}

      </div>
     
    </div>
  );
};

export default App;

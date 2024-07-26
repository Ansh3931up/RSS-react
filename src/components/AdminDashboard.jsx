import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import chroma from 'chroma-js'; // Optional: for color generation
import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";

import {useDebounce} from '../components/Hook/useDebounce.jsx'
// import { setSearchTerm } from '../Redux/Filter';
import { admindatas, filterPincode, revenues } from "../Redux/Reducer";

ChartJS.register(ArcElement, Tooltip, Legend);

// Generate distinct colors
const generateColors = (numColors) => {
  return chroma.scale('Set1').mode('lch').colors(numColors);
};

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const filterdata=useSelector((state)=>state?.auth?.filteruser);
  const revenue = useSelector((state) => state?.auth?.revenue);
  const admindata = useSelector((state) => state?.auth?.admindata);
  const [search,setsearch]=useState(false);
  // const searchTerm = useSelector((state) => state.filter.searchTerm);
  const [searchTerm,setSearchTerm]=useState();
  // const debouncedCallBack=useDebounce((e)=>updateSearchTerm(e.target.value));
  console.log("filtered user AreaChart",filterdata)
  const [uniquePincodes, setUniquePincodes] = useState(0);
  const [uniqueState, setUniqueState] = useState(0);
  // console.log(filterdata,"search")
  useEffect(() => {
    dispatch(revenues());
    dispatch(admindatas());
  }, [dispatch]);
  useEffect(() => {
    dispatch(filterPincode(searchTerm));
  },[searchTerm]);

  useEffect(() => {
    if (admindata && admindata?.length > 0) {
      const pincodes = new Set(admindata?.map(user => user.Pincode));
      setUniquePincodes(pincodes?.size);
    }
    if (admindata && admindata?.length > 0) {
      const state = new Set(admindata?.map(user => user.State));
      setUniqueState(state?.size);
    }
  }, [admindata]);

  // Filter users based on exact match with searchTerm
  

  const total_user = admindata?.length;
  // Assuming search is a boolean indicating if a search term is being used
// and filterdata is an array of filtered user data
// console.log(filterdata.length)
const tabledata = (search && searchTerm) ? filterdata?.slice(-10) : admindata?.slice(-6);

  const debouncedCallBack=useDebounce((e)=>setSearchTerm(e.target.value));

  return (
    <div className="min-h-screen bg-orange-100 p-6 sm:p-8 md:p-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-orange-500 md:text-3xl">Admin Dashboard</h1>
        <div className="flex items-center gap-4 mt-4">
          <input
            type="text"
            placeholder="Enter Pincode"
            // Ensure input reflects current search term
            onChange={(e)=>debouncedCallBack(e)}
            className="flex-1 p-2 border bg-orange-50 text-orange-500 rounded"
          />
          <button className="shrink-0 py-2 px-4 bg-orange-500  border rounded-xl  text-orange-50" onClick={()=>setsearch(!search)}>Search</button>
        </div>
        </header>
      {!(search && searchTerm) &&  
      (
      <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card title="Total Revenue" value={revenue} />
        <Card title="Total Users" value={total_user ? total_user : 0} />
        <Card title="Unique Pincodes" value={uniquePincodes} />
        <Card title="Unique State" value={uniqueState} />
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <div className="bg-orange-50 p-6 rounded">
            <h2 className="font-bold">Pie Chart</h2>
            <StatePieChart data={admindata} />
          </div>
        </div>
      </main>)}

      <div className="relative flex mt-auto w-full flex-col rounded-xl border border-gray-200 bg-orange-50 shadow-md">
        <div className="w-full overflow-x-auto px-4">
          <table className="w-full min-w-max mt-auto overflow-x-scroll">
            <thead>
              <tr>
                <th className="pb-2 pt-4 text-start uppercase tracking-wide text-gray-600">Username</th>
                <th className="pb-2 pt-4 text-start uppercase tracking-wide text-gray-600">Email</th>
                <th className="pb-2 pt-4 text-start uppercase tracking-wide text-gray-600">Pincode</th>
                <th className="pb-2 pt-4 text-start uppercase tracking-wide text-gray-600">State</th>
                <th className="pb-2 pt-4 text-start uppercase tracking-wide text-gray-600">Subscribed</th>
                <th className="pb-2 pt-4 text-start uppercase tracking-wide text-gray-600">Avatar</th>
              </tr>
            </thead>
            <tbody>
              {tabledata?.map((user) => (
                <tr key={user.id}>
                  <td className="py-3 text-sm">
                    <p className="text-sm font-medium text-gray-700">{user.fullname}</p>
                  </td>
                  <td className="py-3 text-sm">
                    <p className="text-sm font-medium text-gray-700">{user.email}</p>
                  </td>
                  <td className="py-3 text-sm">
                    <p className="text-sm font-medium text-gray-700">{user.Pincode}</p>
                  </td>
                  <td className="py-3 text-sm">
                    <p className="text-sm font-medium text-gray-700">{user.State}</p>
                  </td>
                  <td className="py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-white ${user.isSubscribed > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                      {user.isSubscribed > 0 ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full">
                        <img src={user?.avatar} className="h-full w-full rounded-full" alt={user?.username} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, change }) {
  return (
    <div className="bg-orange-50 p-6 rounded text-orange-500">
      <h3 className="font-bold">{title}</h3>
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-sm text-orange-500/80">{change}</div>
    </div>
  );
}

const StatePieChart = ({ data }) => {
  // console.log("Data:", data);

  // Extract state names from the data
  const states = data?.map(item => item.State || 'Unknown');

  // Get unique state names
  const uniqueStates = [...new Set(states)];

  // Count the occurrences of each state
  const stateCounts = uniqueStates?.map(state => ({
    state,
    count: states?.filter(s => s === state).length,
  })).reduce((acc, { state, count }) => {
    acc[state] = count;
    return acc;
  }, {});

  // Generate colors for each state
  const colors = generateColors(uniqueStates?.length);

  const chartData = {
    labels: Object.keys(stateCounts),
    datasets: [
      {
        label: 'Users by State',
        data: Object.values(stateCounts),
        backgroundColor: colors,
        borderColor: colors?.map(color => chroma(color).darken(1).hex()), // Darken colors for borders
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Pie data={chartData} />
    </div>
  );
};

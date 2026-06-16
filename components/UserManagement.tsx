"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
export default function UserManagement() {
  const supabase = createClient();
  const itemPerPages = 2;
  const [users, setUsers] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [maxPage,setMaxPage] = useState(1);
  const [searchUser, setSearchUser] = useState("");
  
  const userSupabaseQuery = () => {
    let query = supabase
      .from('users')
      .select('*', { count: 'exact' })
    if (searchUser) {
      query = query.like('fullname', `%${searchUser}%`)
    }
    query = query.range((page - 1) * itemPerPages, page * itemPerPages - 1)
    return query
  }

  
  
  const fetchUsers = async () => {
    let { data, error, count } = await userSupabaseQuery();

    if (!data || error) {
      console.log("error", error);
    }
    setUsers(data);
    count = count || 1;
    const calculateMaxPage = Math.ceil(count / itemPerPages);
    setMaxPage(calculateMaxPage);
  };

  useEffect(() => {
    //เพื่อ call API
    fetchUsers();
  }, [page]);

  const handleSearch = (event: any) => {
    setSearchUser(event.target.value);
  };

  const search = async () => {
    
    let { data, error, count } = await userSupabaseQuery();

    if (error) {
      alert("Fail to search");
      return false;
    }
    setPage(1);
    count = count || 1;
    const calculateMaxPage = Math.ceil(count / itemPerPages)
    setMaxPage(calculateMaxPage);
    setUsers(data);
  };

  return (
    <div className="w-full p-6">
      <div className="flex gap-2 items-center mb-6">
        {searchUser}
        <input
          onChange={handleSearch}
          className="rounded-md px-4 py-2 border w-full max-w-md"
          type="text"
          placeholder="Search user..."
        />
        <button onClick={search} className="px-4 py-2 border rounded-md">
          Search
        </button>
      </div>

      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Telephone</th>
            <th className="border px-4 py-2">Attachment</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.fullname}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.tel}</td>
              <td className="border px-4 py-2">
                {user.attachment && <a href={user.attachment}>Download file</a>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center gap-2">
       {page>1 && <button 
        onClick = {() => setPage(page-1)}
        className="px-3 py-1 border rounded-md">Previous</button>
       }
        <span>Page {page} / {maxPage}</span>

        {page<maxPage && <button 
        onClick = {() => setPage(page+1)}
        className="px-3 py-1 border rounded-md">Next</button>
}
        </div>
    </div>
  );
}

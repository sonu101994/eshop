import DeleteBtn from "@/components/admin/DeleteBtn.";
import ToggleBtn from "@/components/admin/ToggleBtn";
import { getColors } from "@/library/api-call";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import { FiPlus,FiSearch } from "react-icons/fi";

export default async function ColorPage(){
    const {colors}=await getColors();
    console.log(colors);


    const base_url="/color/toggle";

     return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-5 lg:p-6">

      {/* header*/}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Colors
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all product colors easily
          </p>
        </div>

        <Link
          href="/admin/color/add"
          className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition text-sm font-medium w-full sm:w-auto"
        >
          <FiPlus size={18} />
          Add Color
        </Link>

      </div>

      {/* search and total */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* search */}
          <div className="relative flex-1">

            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search color..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none"
            />

          </div>

          {/* total */}
          <div className="text-sm text-gray-500">
            Total:
            <span className="font-semibold text-black ml-1">
              {colors.length}
            </span>{" "}
            {colors.length === 1 ? "Color" : "Colors"}
          </div>

        </div>

      </div>

      {/* table */}
      <div className="hidden xl:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        <table className="w-full">

          {/* head */}
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>

              {["Color", "Slug", "Color Code", "Status", "Actions"].map((head) => (
                <th
                  key={head}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase"
                >
                  {head}
                </th>
              ))}

            </tr>
          </thead>

          {/* body */}
          <tbody className="divide-y divide-gray-100">

            {colors.map((color) => (
              <tr key={color._id} className="hover:bg-gray-50">

                {/* color name + preview via dot */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">

                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.color_code }}
                    />

                    <span className="font-medium text-gray-800">
                      {color.name}
                    </span>

                  </div>
                </td>

                {/* slug */}
                <td className="px-6 py-5">
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                    {color.slug}
                  </span>
                </td>

                {/* color code */}
                <td className="px-6 py-5">
                  <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {color.color_code}
                  </span>
                </td>

                {/* status*/}
                <td className="px-6 py-5">
                  <ToggleBtn
                    id={color._id}
                    current={color.status}
                    base_url={base_url}
                    trueText="Active"
                    falseText="Inactive"
                  />
                </td>

                {/* actions */}
                <td className="px-6 py-5 flex gap-3">

                  <DeleteBtn delete_url={`/color/delete/${color._id}`} />

                  <Link
                    href={`/admin/color/edit/${color._id}`}
                    className="w-9 h-9 flex items-center justify-center border rounded-lg hover:bg-black hover:text-white transition"
                  >
                    <FaPen size={14} />
                  </Link>

                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>

      {/* no color present ui */}
      {colors.length === 0 && (
        <div className="py-16 text-center bg-white rounded-2xl border">
          <h3 className="text-lg font-semibold text-gray-700">
            No Colors Found
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Start by adding your first color
          </p>
        </div>
      )}

    </div>
  );
}
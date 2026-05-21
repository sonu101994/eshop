import DeleteBtn from "@/components/admin/DeleteBtn.";
import ToggleBtn from "@/components/admin/ToggleBtn";
import { getCategory } from "@/library/api-call";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import { FiPlus, FiSearch } from "react-icons/fi";

export default async function CategoryPage() {

  const { categories, image_path } = await getCategory();

  const base_url = "/category/toggle";

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-5 lg:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Categories
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all product categories easily
          </p>
        </div>

        <Link
          href="/admin/category/add"
          className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 text-sm font-medium w-full sm:w-auto"
        >
          <FiPlus size={18} />
          Add Category
        </Link>

      </div>

      {/* Search & Total */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* Search */}
          <div className="relative  flex-1">

            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search category..."
              className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-700 border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />

          </div>

          {/* Total */}
          <div className="text-sm text-gray-500">

            Total:
            <span className="font-semibold text-black ml-1">
              {categories.length}
            </span>{" "}

            {categories.length === 1 ? "Category" : "Categories"}

          </div>

        </div>

      </div>

      {/* Desktop Table */}
      <div className="hidden xl:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* Head */}
            <thead className="bg-gray-100 border-b border-gray-200">

              <tr>

                {[
                  "Category",
                  "Slug",
                  "Products",
                  "Image",
                  "Settings",
                  "Actions",
                ].map((head) => (

                  <th
                    key={head}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {head}
                  </th>

                ))}

              </tr>

            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-100">

              {categories.map((cat) => {

                return (
                  <tr
                    key={cat.id}
                    className="hover:bg-gray-50 transition-colors"
                  >

                    {/* Category */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">

                          <img
                            src={`${process.env.NEXT_PUBLIC_ASSET_PATH}${image_path}${cat.image_name}`}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                          />

                        </div>

                        <div>

                          <h3 className="font-semibold text-gray-800">
                            {cat.name}
                          </h3>

                          <p className="text-xs text-gray-500 mt-1">
                            Product Category
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Slug */}
                    <td className="px-6 py-5">

                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                        {cat.slug}
                      </span>

                    </td>

                    {/* Products */}
                    <td className="px-6 py-5">

                      <div className="font-medium text-gray-700">
                        0 Products
                      </div>

                    </td>

                    {/* Image */}
                    <td className="px-6 py-5">

                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">

                        <img
                          src={`${process.env.NEXT_PUBLIC_ASSET_PATH}${image_path}${cat.image_name}`}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />

                      </div>

                    </td>

                    {/* Settings */}
                    <td className="px-6 py-5">

                      <div className="flex flex-wrap gap-2">

                        <ToggleBtn
                          id={cat._id}
                          current={cat.status}
                          flag="1"
                          trueText={"Active"}
                          falseText={"Inactive"}
                          base_url={base_url}
                        />

                        <ToggleBtn
                          id={cat._id}
                          current={cat.on_home}
                          flag="2"
                          trueText={"On Home"}
                          falseText={"Not Home"}
                          base_url={base_url}
                        />

                        <ToggleBtn
                          id={cat._id}
                          current={cat.is_featured}
                          flag="3"
                          trueText={"Featured"}
                          falseText={"Not Featured"}
                          base_url={base_url}
                        />

                        <ToggleBtn
                          id={cat._id}
                          current={cat.is_top}
                          flag="4"
                          trueText={"Top"}
                          falseText={"Not Top"}
                          base_url={base_url}
                        />

                      </div>

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <DeleteBtn
                          delete_url={`/category/delete/${cat._id}`}
                        />

                        <Link
                          href={`/admin/category/edit/${cat._id}`}
                          className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                        >
                          <FaPen size={14} />
                        </Link>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

          {/* Empty */}
          {categories.length === 0 && (

            <div className="py-16 text-center">

              <h3 className="text-lg font-semibold text-gray-700">
                No Categories Found
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Start by adding your first category
              </p>

            </div>

          )}

        </div>

      </div>

      {/* mobile & tablet Cards */}
      <div className="xl:hidden space-y-4">

        {categories.map((cat) => {

          return (
            <div
              key={cat.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4"
            >

              {/* top */}
              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">

                    <img
                      src={`${process.env.NEXT_PUBLIC_ASSET_PATH}${image_path}${cat.image_name}`}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  <div>

                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      {cat.name}
                    </h2>

                    <span className="inline-block mt-2 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                      {cat.slug}
                    </span>

                  </div>

                </div>

                {/* actions */}
                <div className="flex items-center gap-2">

                  <DeleteBtn
                    delete_url={`/category/delete/${cat._id}`}
                  />

                 <Link
                                                    href={`/admin/category/edit/${cat._id}`}
                                                    className="w-9 h-9 rounded-lg border text-gray-700 border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                                                >
                                                    <FaPen size={14} />
                                                </Link>

                </div>

              </div>

              {/* products */}
              <div className="mt-4">

                <p className="text-sm text-gray-500">
                  Products
                </p>

                <p className="font-medium text-gray-800 mt-1">
                  0 Products
                </p>

              </div>

              {/* settings */}
              <div className="mt-4 flex flex-wrap gap-2">

                <ToggleBtn
                  id={cat._id}
                  current={cat.status}
                  flag="1"
                  trueText={"Active"}
                  falseText={"Inactive"}
                  base_url={base_url}
                />

                <ToggleBtn
                  id={cat._id}
                  current={cat.on_home}
                  flag="2"
                  trueText={"On Home"}
                  falseText={"Not Home"}
                  base_url={base_url}
                />

                <ToggleBtn
                  id={cat._id}
                  current={cat.is_featured}
                  flag="3"
                  trueText={"Featured"}
                  falseText={"Not Featured"}
                  base_url={base_url}
                />

                <ToggleBtn
                  id={cat._id}
                  current={cat.is_top}
                  flag="4"
                  trueText={"Top"}
                  falseText={"Not Top"}
                  base_url={base_url}
                />

              </div>

            </div>
          );
        })}

        {/* empty */}
        {categories.length === 0 && (

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-16 text-center">

            <h3 className="text-lg font-semibold text-gray-700">
              No Categories Found
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Start by adding your first category
            </p>

          </div>

        )}

      </div>

    </div>
  );
}
import DeleteBtn from "@/components/admin/DeleteBtn.";
import ToggleBtn from "@/components/admin/ToggleBtn";
import { getBrand } from "@/library/api-call";
import Link from "next/link";
import { FaPen } from "react-icons/fa";

export default async function BrandPage() {

    const { brands, image_path } = await getBrand();

    console.log("brands", brands);
    console.log("imagePath", image_path);

    const base_url = "/brand/toggle";

    return (
        <div className="space-y-6 mt-4 px-3 sm:px-5 lg:px-0">

            {/* page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Brands
                    </h1>

                    <p className="mt-1 text-sm sm:text-base text-gray-600">
                        Manage your product brand
                    </p>

                </div>

                <Link
                    href="/admin/brand/add"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >

                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>

                    Add Brand

                </Link>

            </div>

            {/* search and filters */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                    <div className="flex-1 relative">

                        <input
                            type="text"
                            placeholder="Search brands..."
                            className="w-full rounded-lg border text-gray-700 border-gray-300 pl-10 pr-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <svg
                            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>

                    </div>

                    <div className="text-sm text-gray-600 whitespace-nowrap">

                        {brands.length} {brands.length === 1 ? "brand" : "brands"} found

                    </div>

                </div>

            </div>

            {/* brands Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        <thead className="bg-gray-50">
                            <tr>
                                {["Name", "Slug", "Category Name(s)", "Image", "Setting", "Actions"].map((head, index) => {
                                    return (
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                            {head}
                                        </th>
                                    )

                                })}

                            </tr>



                        </thead>

                        <tbody className="divide-y divide-gray-200 bg-white">

                            {brands.map((brand) => {
                                console.log(brand.status);
                                console.log(brand.category_ids);
                                return (

                                    <tr
                                        key={brand._id}
                                        className="transition-colors hover:bg-gray-50"
                                    >

                                        <td className="px-6 py-4 whitespace-nowrap ">

                                            <div className="text-sm font-semibold text-gray-900">
                                                {brand.name}
                                            </div>

                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">

                                            <div className="text-sm text-gray-700">
                                                {brand.slug}
                                            </div>

                                        </td>

                                        <td className="px-6 py-4">

                                            <ul className="space-y-1 text-sm text-gray-700">

                                                {brand.category_ids?.map((cat) => (

                                                    <li
                                                        key={cat._id}
                                                        className="inline-flex mr-2 mb-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                                                    >
                                                        {cat.name}
                                                    </li>

                                                ))}

                                            </ul>

                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">

                                            <img
                                                width={55}
                                                height={55}
                                                src={`${process.env.NEXT_PUBLIC_ASSET_PATH}${image_path}${brand.image_name}`}
                                                alt={brand.name}
                                                className="h-14 w-14 rounded-lg border border-gray-200 object-cover"
                                            />

                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">

                                            {/* toggle button */}
                                            <ToggleBtn
                                                id={brand._id}
                                                current={brand.status}
                                                trueText={"Active"}
                                                falseText={"Inactive"}
                                                base_url={base_url}
                                            />

                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">

                                            <div className="flex items-center justify-center gap-3">

                                                <DeleteBtn
                                                    className=""
                                                    delete_url={`/brand/delete/${brand._id}`}
                                                />

                                                <Link
                                                    href={`/admin/brand/edit/${brand._id}`}
                                                    className="w-9 h-9 rounded-lg border text-gray-700 border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all"
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

                </div>

            </div>

        </div>

    )
}
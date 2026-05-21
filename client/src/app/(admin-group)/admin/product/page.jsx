import DeleteBtn from "@/components/admin/DeleteBtn.";
import MultipleImage from "@/components/admin/MultipleImage";
import ToggleBtn from "@/components/admin/ToggleBtn";
import { getProduct } from "@/library/api-call";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import { FiPlus, FiSearch } from "react-icons/fi";

export default async function ProductPage() {

    const { products, image_path } = await getProduct();
    console.log("products",products,image_path)

    const base_url = "/product/toggle";

    return (

        <div className="min-h-screen bg-gray-50 p-3 sm:p-5 lg:p-6">

            {/* header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Products
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage all products easily
                    </p>

                </div>

                <Link
                    href="/admin/product/add"
                    className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 text-sm font-medium w-full sm:w-auto"
                >

                    <FiPlus size={18} />

                    Add Product

                </Link>

            </div>

            {/* search and total count */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    {/* search */}
                    <div className="relative w-full lg:max-w-md">

                        <FiSearch
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder="Search product..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                        />

                    </div>

                    {/* total */}
                    <div className="text-sm text-gray-500">

                        Total:

                        <span className="font-semibold text-black ml-1">
                            {products.length}
                        </span>{" "}

                        {products.length === 1 ? "Product" : "Products"}

                    </div>

                </div>

            </div>

            {/* desktop table */}
            <div className="hidden xl:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        {/* table head */}
                        <thead className="bg-gray-100 border-b border-gray-200">

                            <tr>

                                {[
                                    "Product",
                                    "Slug",
                                    "Price",
                                    "Colors",
                                    "Brand",
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

                        {/* table body */}
                        <tbody className="divide-y divide-gray-100">

                            {products.map((prod) => {

                                return (

                                    <tr
                                        key={prod._id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >

                                        {/* product */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-4">

                                                <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">

                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_ASSET_PATH}${image_path}/main_images/${prod.image_name}`}
                                                        alt={prod.name}
                                                        className="w-full h-full object-cover"
                                                    />

                                                </div>

                                                <div>

                                                    <h3 className="font-semibold text-gray-800">
                                                        {prod.name}
                                                    </h3>

                                                    <p className="text-xs text-gray-500 mt-1">
                                                        SKU : {prod.sku_id}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        {/* slug */}
                                        <td className="px-6 py-5">

                                            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                                {prod.slug}
                                            </span>

                                        </td>

                                        {/* price */}
                                        <td className="px-6 py-5">

                                            <div className="flex flex-col">

                                                <span className="font-semibold text-gray-800">
                                                    ₹{prod.discounted_price}
                                                </span>

                                                <span className="text-sm text-gray-400 line-through">
                                                    ₹{prod.original_price}
                                                </span>

                                            </div>

                                        </td>

                                        {/* colors */}
                                        <td className="px-6 py-5">

                                            <div className="flex flex-wrap gap-2">

                                                {prod.color_ids?.map((color) => (

                                                    <span
                                                        key={color._id}
                                                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-lg"
                                                    >

                                                        {color.name}

                                                    </span>

                                                ))}

                                            </div>

                                        </td>

                                        {/* brand */}
                                        <td className="px-6 py-5">

                                            <span className="font-medium text-gray-700">
                                                {prod.brand_id?.name || "N/A"}
                                            </span>

                                        </td>

                                        {/* image */}
                                        <td className="px-6 py-5">

                                            <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">

                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_ASSET_PATH}${image_path}/main_images/${prod.image_name}`}
                                                    alt={prod.name}
                                                    className="w-full h-full object-cover"
                                                />

                                            </div>

                                        </td>

                                        {/* settings */}
                                        <td className="px-6 py-5">

                                            <div className="flex flex-wrap gap-2">

                                                <ToggleBtn
                                                    id={prod._id}
                                                    current={prod.status}
                                                    flag="1"
                                                    trueText={"Active"}
                                                    falseText={"Inactive"}
                                                    base_url={base_url}
                                                />

                                                <ToggleBtn
                                                    id={prod._id}
                                                    current={prod.on_home}
                                                    flag="2"
                                                    trueText={"On Home"}
                                                    falseText={"Not Home"}
                                                    base_url={base_url}
                                                />

                                                <ToggleBtn
                                                    id={prod._id}
                                                    current={prod.is_featured}
                                                    flag="3"
                                                    trueText={"Featured"}
                                                    falseText={"Not Featured"}
                                                    base_url={base_url}
                                                />

                                                <ToggleBtn
                                                    id={prod._id}
                                                    current={prod.is_top}
                                                    flag="4"
                                                    trueText={"Top"}
                                                    falseText={"Not Top"}
                                                    base_url={base_url}
                                                />

                                                <ToggleBtn
                                                    id={prod._id}
                                                    current={prod.is_hot}
                                                    flag="5"
                                                    trueText={"Hot"}
                                                    falseText={"Not Hot"}
                                                    base_url={base_url}
                                                />

                                                <ToggleBtn
                                                    id={prod._id}
                                                    current={prod.is_best}
                                                    flag="6"
                                                    trueText={"Best"}
                                                    falseText={"Not Best"}
                                                    base_url={base_url}
                                                />

                                            </div>

                                        </td>

                                        {/* actions */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3">

                                                <DeleteBtn
                                                    delete_url={`/product/delete/${prod._id}`}
                                                />

                                                <Link
                                                    href={`/admin/product/edit/${prod._id}`}
                                                    className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                                                >

                                                    <FaPen size={14} />

                                                </Link>

                                                <MultipleImage
                                                    delete_url={`/product/delete-other-image/${prod._id}/`}
                                                    api_url={`/product/add-other-images/${prod._id}`}
                                                    other_images={prod.other_images}
                                                    image_url={
                                                        process.env.NEXT_PUBLIC_ASSET_PATH +
                                                        image_path +
                                                        "other_images/"
                                                    }
                                                />

                                            </div>

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                    {/* empty */}
                    {products.length === 0 && (

                        <div className="py-16 text-center">

                            <h3 className="text-lg font-semibold text-gray-700">
                                No Products Found
                            </h3>

                            <p className="text-gray-500 text-sm mt-1">
                                Start by adding your first product
                            </p>

                        </div>

                    )}

                </div>

            </div>

            {/* mobile cards */}
            <div className="xl:hidden space-y-4">

                {products.map((prod) => {

                    return (

                        <div
                            key={prod._id}
                            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4"
                        >

                            {/* top */}
                            <div className="flex items-start justify-between gap-3">

                                <div className="flex items-center gap-3">

                                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">

                                        <img
                                            src={`${process.env.NEXT_PUBLIC_ASSET_PATH}${image_path}/main_images/${prod.image_name}`}
                                            alt={prod.name}
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                    <div>

                                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                                            {prod.name}
                                        </h2>

                                        <p className="text-xs text-gray-500 mt-1">
                                            SKU : {prod.sku_id}
                                        </p>

                                        <span className="inline-block mt-2 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                            {prod.slug}
                                        </span>

                                    </div>

                                </div>

                                {/* actions */}
                                <div className="flex items-center gap-2">

                                    <DeleteBtn
                                        delete_url={`/product/delete/${prod._id}`}
                                    />

                                    <Link
                                        href={`/admin/product/edit/${prod._id}`}
                                        className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                                    >

                                        <FaPen size={14} />

                                    </Link>

                                    <MultipleImage
                                        delete_url={`/product/delete-other-image/${prod._id}/`}
                                        api_url={`/product/add-other-images/${prod._id}`}
                                        other_images={prod.other_images}
                                        image_url={
                                            process.env.NEXT_PUBLIC_ASSET_PATH +
                                            image_path +
                                            "/other_images/"
                                        }
                                    />

                                </div>

                            </div>

                            {/* price */}
                            <div className="mt-4">

                                <p className="text-sm text-gray-500">
                                    Price
                                </p>

                                <div className="flex items-center gap-3 mt-1">

                                    <p className="font-semibold text-gray-900">
                                        ₹{prod.discounted_price}
                                    </p>

                                    <p className="text-sm text-gray-400 line-through">
                                        ₹{prod.original_price}
                                    </p>

                                </div>

                            </div>

                            {/* colors */}
                            <div className="mt-4">

                                <p className="text-sm text-gray-500 mb-2">
                                    Colors
                                </p>

                                <div className="flex flex-wrap gap-2">

                                    {prod.color_ids?.length > 0 ? (

                                        prod.color_ids.map((color) => (

                                            <span
                                                key={color._id}
                                                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-lg"
                                            >

                                                {color.name}

                                            </span>

                                        ))

                                    ) : (

                                        <span className="text-sm text-gray-400">
                                            No Colors
                                        </span>

                                    )}

                                </div>

                            </div>

                            {/* brand */}
                            <div className="mt-4">

                                <p className="text-sm text-gray-500">
                                    Brand
                                </p>

                                <p className="font-medium text-gray-800 mt-1">
                                    {prod.brand_id?.name || "N/A"}
                                </p>

                            </div>

                            {/* settings */}
                            <div className="mt-4 flex flex-wrap gap-2">

                                <ToggleBtn
                                    id={prod._id}
                                    current={prod.status}
                                    flag="1"
                                    trueText={"Active"}
                                    falseText={"Inactive"}
                                    base_url={base_url}
                                />

                                <ToggleBtn
                                    id={prod._id}
                                    current={prod.on_home}
                                    flag="2"
                                    trueText={"On Home"}
                                    falseText={"Not Home"}
                                    base_url={base_url}
                                />

                                <ToggleBtn
                                    id={prod._id}
                                    current={prod.is_featured}
                                    flag="3"
                                    trueText={"Featured"}
                                    falseText={"Not Featured"}
                                    base_url={base_url}
                                />

                                <ToggleBtn
                                    id={prod._id}
                                    current={prod.is_top}
                                    flag="4"
                                    trueText={"Top"}
                                    falseText={"Not Top"}
                                    base_url={base_url}
                                />

                                <ToggleBtn
                                    id={prod._id}
                                    current={prod.is_hot}
                                    flag="5"
                                    trueText={"Hot"}
                                    falseText={"Not Hot"}
                                    base_url={base_url}
                                />

                                <ToggleBtn
                                    id={prod._id}
                                    current={prod.is_best}
                                    flag="6"
                                    trueText={"Best"}
                                    falseText={"Not Best"}
                                    base_url={base_url}
                                />

                            </div>

                        </div>

                    );

                })}

                {/* empty */}
                {products.length === 0 && (

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-16 text-center">

                        <h3 className="text-lg font-semibold text-gray-700">
                            No Products Found
                        </h3>

                        <p className="text-gray-500 text-sm mt-1">
                            Start by adding your first product
                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}
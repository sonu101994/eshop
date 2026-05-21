"use client";
import { apiClient,getAuthHeader } from "@/library/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ToggleBtn({
    id,
    current,
    base_url,
    flag,
    trueText,
    falseText
}) {

    const [currentValue, setCurrentValue] = useState(current);

    // sync latest value
    useEffect(() => {
        setCurrentValue(current);
    }, [current]);

    // toggle status handler

    const toggleHandler = async () => {
        try {
            const response = await apiClient.patch(
                flag ? `${base_url}/${id}/${flag}` : `${base_url}/${id}`,{},getAuthHeader()
            );

            if (response.data.flag == 1) {
                toast.success(response.data.msg);
                setCurrentValue(!currentValue);
            }
            else {
                toast.warning(response.data.msg);
            }
        } catch (error) {
            console.log("error", error);
            toast.error("Something went wrong!");
        }
    }

    return (
           <button
            onClick={toggleHandler}
            className={`mb-1 mr-1 rounded-md px-3 py-1.5 text-xs font-medium text-white transition ${
                currentValue
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
            }`}
        >

            {currentValue ? trueText : falseText}

        </button>
    );

}
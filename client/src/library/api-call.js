import { apiClient,getAuthHeader } from "./helper";

export const getCategory=async(query_object=null)=>{

    try {
      
        const searchParams=new URLSearchParams();

        if (query_object?.id) {
            searchParams.append("id",query_object.id);
        }
         if (query_object?.slug) {
            searchParams.append("slug",query_object.slug);
        }

        const apiUrl=searchParams.toString()?`/category?${searchParams.toString()}`:"/category";

        return await apiClient.get(apiUrl).then(
            (response)=>{
                if (response.data.flag==1) {
                    return{
                        categories:response.data.categories,
                        image_path:response.data.image_path,
                    };
                }else{
                     return {categories: [],image_path:""};
                }
            }
        )
    } catch (error) {
         return {categories:[],image_path:""};
    }
}

export const getBrand=async (query_object=null)=>{
    try {
        const searchParams=new URLSearchParams();

        if (query_object?.id) {
            searchParams.append("id",query_object.id);
        }

        if (query_object?.category_id) {
            searchParams.append("category_id",query_object.category_id);
        }
       const apiUrl=searchParams.toString()?`/brand?${searchParams.toString()}`:"/brand";

       const response =await apiClient.get(apiUrl);
       if (response.data.flag==1) {
        return{
            brands:response.data.brands,
            image_path:response.data.image_path,
        };
       }else{
        return {brands:[],image_path:""};
       }
    } catch (error) {
        return {brands:[],image_path:""};
    }
};


export const getColors=async(query_object=null)=>{
    try {
        const searchParams=new URLSearchParams();
        if (query_object?.id) {
            searchParams.append("id",query_object.id);
        }


        if (query_object?.slug) {
            searchParams.append("slug",query_object.slug);
        }

        if (query_object?.status!=undefined) {
            searchParams.append("status",query_object.status);
        }

        // api url
        const apiUrl=searchParams.toString()?`color?${searchParams.toString()}`:"color";

        const response=await apiClient.get(apiUrl);

        if (response.data.flag==1) {
           return{
             colors:response.data.colors,
           }
        }else{
            return{
                colors:[],
            };
        }
    } catch (error) {

        console.log("ERROR:", error);

  const status = error?.response?.status;
  const data = error?.response?.data;

  console.log("STATUS:", status);
  console.log("DATA:", data);

  if (!error.response) {
    console.log("Network / CORS / Server not reachable");
  }
          return{
                colors:[],
            };
    }
}

export const getProduct=async (query_object={})=>{
    try {
      const query=new URLSearchParams(query_object).toString();
      const apiUrl=query?`/product?${query}`:"/product";

    //api call
    const response=await apiClient.get(apiUrl);
    // success
        if (response.data.flag==1) {
            return{
                products:response.data.products||[],
                image_path:response.data.image_path||"",
            };
        }else{

            console.log(error)
            return{
                 products:[],
            image_path:"",
            }
        }

    } catch (error) {
          console.log(error);
        return{
            products:[],
            image_path:"",
        }
    }
}


export const getAdmins=async()=>{
    try {
        const response=await apiClient.get(
            "/admin/all",
            getAuthHeader()
        );

        if (response.data.flag===1) {
            return {
                admins:response.data.admins||[],
            }
        }else{
             return {
            admins: [],
        };
        }
    } catch (error) {
        
        console.log(error);

        return {
            admins: [],
        };
    }
}

// get all orders (admin)
export const getOrders=async ()=>{
    console.log("hitting");
    try {
        const response=await apiClient.get(
            "/order/admin/all",
            getAuthHeader()
        );
        console.log("response",response.data)
        if(response.data.flag==1){
            console.log("receiving");
            console.log("orders",response.data.orders);
            return {
                orders:response.data.orders||[],
            };
        }else{
             return {
            orders:[],
        }
        }

       
    } catch (error) {

        console.log(error);
         return {
            orders:[],
        }
    }
}

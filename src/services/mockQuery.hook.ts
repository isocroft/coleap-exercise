import { useState } from "react";
import { useQuery, QueryKey } from "react-query";
import { sortVehicles } from "../libs/utils";
import { Vehicle, getAllVehicles } from "./mockQuery";

export { Vehicle };
export const useGetAllVehicles = (defaultSortOption: string) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const { isRefetching, isError, isLoading } = useQuery<Vehicle[]>(
    ["get_Vehicles"] as QueryKey | string[],
    getAllVehicles,
    {
      onSuccess: (data) => {
        setVehicles(sortVehicles(data, defaultSortOption));
      }
    }
  );

  return {
    vehicles,
    isRefetching,
    isError,
    setVehicles,
    isLoading
  };
};

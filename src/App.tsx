import "./styles.css";
import ViewVehicles from "./pages/ViewVehicles";

import { queryClient } from "./config/queryClient";
import { QueryClientProvider } from "react-query";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ViewVehicles
          sortOptions={["price", "range.distance"]}
          defaultSortOption="range.distance"
        />
      </div>
    </QueryClientProvider>
  );
}

import { Outlet } from "react-router-dom";
import "./HomeLayout.css";
import VwIndicator from "../../components/VWIndicator/VWIndicator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navigation from "../../components/navigation/Navigation";
import { useAppSelector } from "../../hooks";
import CurrentUser from "../../components/currentUser/CurrentUser";

const queryClient = new QueryClient();
const HomeLayout = () => {
  return (
    <>
      <VwIndicator />
      <Navigation />
      <CurrentUser />
      <main>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition='bottom-left'
          />
          <Outlet />
        </QueryClientProvider>
      </main>
    </>
  );
};
export default HomeLayout;

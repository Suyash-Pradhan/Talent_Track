import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import Dashboard from "./pages/dashboard";
import { Layout } from "./components/refine-ui/layout/layout";
import { BookAIcon, BookOpenCheckIcon, Home } from "lucide-react";
import CreateList from "./pages/subjects/list";
import CreateSubjects from "./pages/subjects/create";

function App() {
  return (
    <BrowserRouter>

      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "zWZJ2i-6lCjf7-GE2dg9",
              }}
              resources={[
                {
                  name: 'dashboard',
                  list: '/',
                  meta: { label: "Home", icon: <Home /> }

                },
                {
                  name: 'subjects',
                  list: '/subjects',
                  create: '/subjects/create',
                  meta: { label: "Subjects", icon: <BookOpenCheckIcon /> }
                }
              ]}
            >
              <Routes>
                <Route element={
                  <Layout>
                    <Outlet />
                  </Layout>
                  
                }>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="subjects">
                    <Route index element={<CreateList />} />
                    <Route path="create" element={<CreateSubjects />} />
                  </Route>
                </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter >
  );
}

export default App;

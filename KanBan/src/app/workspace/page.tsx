"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import useWorkspaceStore, { WorkspaceStoreState } from "@/store/workspace";
import { logOut } from "@/lib/firebase.auth";
import { WORKSPACE_TYPE } from "@/types";
import { LogOut, Search } from "lucide-react";
import WorkspaceBtn from "@/components/WorkspaceBtn/WorkspaceBtn";
import CreateWorkspaceForm from "@/components/CreateWorkspaceForm/CreateWorkspaceForm";
import Divider from "@/components/Divider/Divider";
import { SkeletonCard } from "@/components/SkeletonCard/SkeletonCard";
import { Input } from "@/components/ui/input";
import JoinWorkspaceForm from "@/components/JoinWorkspaceForm/JoinWorkspaceForm";
import { Button } from "@/components/ui/button";

const WorkspacePage = () => {
  const router = useRouter();

  const { user }: any = useAuth();
  const { workspaces, loading, getWorkspaces }: WorkspaceStoreState =
    useWorkspaceStore();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [workspaceList, setWorkspaceList] =
    useState<WORKSPACE_TYPE[]>(workspaces);

  const handleAccessWorkSpace = () => {
    console.log("Access workspace");
  };

  const handleSearchWorkspace = (searchStr: string) => {
    const filterWorkspace = workspaces?.filter((workspace: WORKSPACE_TYPE) => {
      return workspace?.name?.toLowerCase()?.includes(searchStr.toLowerCase());
    });

    setWorkspaceList(filterWorkspace);
  };

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  useEffect(() => {
    if (user?.uid) getWorkspaces(user?.uid);
  }, [getWorkspaces, user?.uid]);

  useEffect(() => {
    if (workspaces) setWorkspaceList(workspaces);
  }, [workspaces]);

  useEffect(() => {
    if (debouncedQuery === "") setWorkspaceList(workspaces);
    if (debouncedQuery) handleSearchWorkspace(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-10">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-[1.8rem] font-bold text-center">
        KanBan Workspace
      </h1>

      {/* Description */}
      <p className="my-4 text-sm sm:text-base text-gray-500 text-center">
        A workspace is a centralized hub where you manage all your projects,
        tasks, and teams. Create a separate workspace for each client or project
        to stay organized and focused.
      </p>

      {/* Search and Actions */}
      <nav className="mt-8 mb-6">
        <div className="w-full flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative w-full md:w-[50%]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              type="search"
              placeholder="Search a workspace..."
              className="w-full rounded-lg bg-background pl-8"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <JoinWorkspaceForm />
            <Button
              className="text-gray-600 bg-zinc-200 hover:bg-zinc-300 dark:text-white hover:dark:bg-slate-800 dark:bg-slate-900"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </nav>

      {/* Divider */}
      <Divider />

      {/* Workspaces */}
      {loading ? (
        <div className="my-8 w-full">
          <SkeletonCard />
        </div>
      ) : (
        <div className="my-8 w-full flex flex-wrap justify-center gap-5">
          <CreateWorkspaceForm />

          {workspaceList?.map((workspace: WORKSPACE_TYPE) => (
            <WorkspaceBtn
              key={workspace?.id}
              workspace={workspace}
              isCreated={false}
              onClick={handleAccessWorkSpace}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkspacePage;

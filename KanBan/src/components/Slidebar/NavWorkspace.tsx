"use client";

import { useEffect, useState } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import useTaskStore, { TaskStoreState } from "@/store/task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LiteSkeletonCard } from "../LiteSkeletonCard/LiteSkeletonCard";
import useWorkspaceStore, { WorkspaceStoreState } from "@/store/workspace";
import { useAuth } from "../providers/AuthProvider";
import { WORKSPACE_TYPE } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getFirstLetterUppercase } from "@/lib/utils";

export function WorkspaceSwitcher() {
  const { user }: any = useAuth();
  const {
    loading,
    setJoinUsers,
    workspaces,
    getWorkspaces,
    getWorkspaceByWorkspaceId,
  }: WorkspaceStoreState = useWorkspaceStore();
  const {
    setProjects,
    getProjectsByWorkspaceId,
    setTasks,
    getTasksByWorkspaceId,
  }: TaskStoreState = useTaskStore();

  const { state, isMobile } = useSidebar();
  const router = useRouter();
  const params = useParams();

  const workspaceId = params?.id;

  const [workspaceList, setWorkspaceList] =
    useState<WORKSPACE_TYPE[]>(workspaces);
  const [workspace, setWorkspace] = useState<WORKSPACE_TYPE | null>(null);

  useEffect(() => {
    if (user?.uid) getWorkspaces(user?.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useEffect(() => {
    if (workspaces) setWorkspaceList(workspaces);
  }, [workspaces]);

  const handleGetWorkspace = async () => {
    const res = await getWorkspaceByWorkspaceId(workspaceId as string);

    if (res && res?.id) {
      setWorkspace(res);

      const projectsRes = await getProjectsByWorkspaceId(res?.id);
      const tasksRes = await getTasksByWorkspaceId(res?.id);

      setJoinUsers(res?.joinUsers ?? []);
      setProjects(projectsRes);
      setTasks(tasksRes);
    }
  };

  useEffect(() => {
    if (workspaceId && user?.uid) handleGetWorkspace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, user?.id]);

  const handleChangeWorkspace = (id: string) => {
    router.push(`/workspace/${id}`);
  };

  const handleAddWorkSpace = () => {
    router.push("/workspace");
  };

  return (
    <SidebarMenu>
      {state === "expanded" && (
        <SidebarMenuItem className="px-2 pt-1 flex items-center">
          <div
            className="flex items-center"
            onClick={() => {
              if (workspaceId) handleChangeWorkspace(workspaceId as string);
            }}
          >
            <Image src="/logo.png" width={25} height={25} alt="app-logo" />
            <h1 className="max-w-[160px] truncate text-[1.2rem] font-bold text-primary hover:cursor-pointer">
              {process.env.NEXT_PUBLIC_APP_NAME
                ? process.env.NEXT_PUBLIC_APP_NAME
                : "KanBan App"}
            </h1>
          </div>
        </SidebarMenuItem>
      )}

      <SidebarMenuItem className="mt-3 mb-0 py-2 border-gray-300 dark:border-gray-600 border-y border-dashed">
        <SidebarGroupLabel>
          <div className="w-full flex items-center justify-between">
            <span>Workspace</span>
            <button
              className="bg-primary hover:bg-primary/90 p-1 rounded-full text-white"
              onClick={() => {
                handleAddWorkSpace();
              }}
            >
              <Plus size={12} />
            </button>
          </div>
        </SidebarGroupLabel>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {loading ? (
              <LiteSkeletonCard />
            ) : (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                  {workspace?.name
                    ? getFirstLetterUppercase(workspace?.name)
                    : "U"}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {workspace?.name ? workspace?.name : "unknow"}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {workspaceList?.map((workspace: WORKSPACE_TYPE, index) => {
              return (
                <DropdownMenuItem
                  key={workspace?.id}
                  onClick={() =>
                    workspace?.id && handleChangeWorkspace(workspace?.id)
                  }
                  className="gap-2 p-2"
                >
                  <Avatar className="h-6 w-6 rounded-md">
                    <AvatarImage
                      src={workspace?.avatarUrl}
                      alt={workspace?.name}
                    />
                    <AvatarFallback className="rounded-lg bg-primary text-white text-[0.6rem]">
                      {workspace?.name
                        ? getFirstLetterUppercase(workspace?.name)
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  {workspace?.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="gap-2 p-2 hover:cursor-pointer"
              onClick={() => {
                handleAddWorkSpace();
              }}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add workspace
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

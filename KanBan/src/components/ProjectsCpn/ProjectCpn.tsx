"use client";

import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTimeStampDate, getFirstLetterUppercase } from "@/lib/utils";
import Link from "next/link";
import useWorkspaceStore, { WorkspaceStoreState } from "@/store/workspace";
import useTaskStore, { TaskStoreState } from "@/store/task";
import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";
import { PROJECT_TYPE } from "@/types";
import { Timestamp } from "firebase/firestore";
import Empty from "../Empty/Empty";

const ProjectCpn = () => {
  const { workspace }: WorkspaceStoreState = useWorkspaceStore();
  const { projects }: TaskStoreState = useTaskStore();

  return (
    <Card className="px-0 w-full rounded-sm">
      <CardHeader className="px-4 pt-4 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-[1.05rem] font-bold">
            Projects ({projects?.length})
          </h1>

          <CreateProjectForm>
            <div className="text-black dark:text-white rounded-md p-2 bg-zinc-200 hover:bg-zinc-300 dark:bg-gray-900 dark:hover:bg-gray-800 hover:cursor-pointer">
              <Plus size={20} />
            </div>
          </CreateProjectForm>
        </div>
      </CardHeader>

      <div className="mx-4 border-t border-dashed border-zinc-300 dark:border-gray-600" />

      <CardContent className="px-4 pb-4 pt-4">
        {projects?.length === 0 && (
          <div className="w-full">
            <Empty size={40} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects?.slice(0, 4).map((project: PROJECT_TYPE) => (
            <Link
              key={uuidv4()}
              href={`/workspace/${workspace?.id}/project/${project?.id}`}
            >
              <Card className="rounded-md hover:bg-zinc-100 dark:hover:bg-slate-900">
                <CardContent className="py-3 px-5">
                  <div className="flex items-center gap-4">
                    <Avatar className="rounded-md">
                      <AvatarImage
                        src={"project avatar url"}
                        alt={project?.name}
                      />
                      <AvatarFallback className="rounded-md bg-primary text-white text-[0.9rem] font-bold">
                        {project?.name
                          ? getFirstLetterUppercase(project?.name)
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1 w-full">
                      <h1 className="text-sm font-bold truncate">
                        {project?.name}
                      </h1>
                      <span className="text-xs text-gray-400 truncate">
                        Started at:{" "}
                        {project?.createdAt
                          ? formatTimeStampDate(
                              project?.createdAt as Timestamp,
                              "date"
                            )
                          : "unknown"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCpn;

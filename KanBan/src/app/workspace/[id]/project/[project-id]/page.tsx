"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import useTaskStore, { TaskStoreState } from "@/store/task";
import useWorkspaceStore, { WorkspaceStoreState } from "@/store/workspace";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ButtonCpn from "@/components/ButtonCpn/ButtonCpn";
import { formatTimeStampDate, getFirstLetterUppercase } from "@/lib/utils";
import { Timestamp } from "firebase/firestore";
import { SkeletonCard } from "@/components/SkeletonCard/SkeletonCard";

const DetailProjectPage = () => {
  const { user }: any = useAuth();

  const { workspace }: WorkspaceStoreState = useWorkspaceStore();
  const { loading, project, getProjectByProjectId }: TaskStoreState =
    useTaskStore();

  const router = useRouter();
  const params = useParams();
  const projectId = params?.["project-id"];

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (projectId) getProjectByProjectId(projectId as string);
  }, [getProjectByProjectId, projectId]);

  return (
    <>
      {loading ? (
        <SkeletonCard />
      ) : (
        <div className="p-4 sm:p-6">
          {/* Breadcrumb + Back */}
          <div className="w-full flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_API_URL}/workspace/${project?.workspaceId}`}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 rounded-md">
                        <AvatarImage
                          src={project?.workspace?.avatarUrl}
                          alt={project?.workspace?.name}
                        />
                        <AvatarFallback className="rounded-md bg-primary text-white text-[0.7rem]">
                          {project?.workspace?.name
                            ? getFirstLetterUppercase(project?.workspace?.name)
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{project?.workspace?.name}</span>
                    </div>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm">
                    {project?.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <ButtonCpn
              type="button"
              title="Back"
              icon={<RotateCcw size={15} />}
              onClick={handleBack}
            />
          </div>

          {/* Project Overview Card */}
          <Card className="p-0 bg-zinc-50 dark:bg-slate-900 rounded-md">
            <CardHeader className="px-5 pt-5 pb-5">
              <div className="flex items-center justify-between">
                <h1 className="text-[1.05rem] font-semibold">Overview</h1>
              </div>
            </CardHeader>

            <CardContent className="px-5 pt-0 pb-5">
              <div className="pt-5 flex flex-col md:flex-row border-t border-dashed border-gray-300 dark:border-gray-700 gap-8">
                {/* Left Column */}
                <div className="flex-1 flex flex-col gap-5">
                  <InfoRow label="Name" value={project?.name} />

                  <InfoRow
                    label="Owner"
                    value={
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 rounded-md">
                          <AvatarImage
                            src={project?.workspace?.owner?.photoURL}
                            alt={project?.workspace?.owner?.displayName}
                          />
                          <AvatarFallback className="rounded-full bg-primary text-white text-[0.7rem]">
                            {project?.workspace?.owner?.displayName
                              ? getFirstLetterUppercase(
                                  project?.workspace?.owner?.displayName
                                )
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span>{project?.workspace?.owner?.displayName}</span>
                      </div>
                    }
                  />

                  <InfoRow
                    label="Workspace"
                    value={
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 rounded-md">
                          <AvatarImage
                            src={project?.workspace?.avatarUrl}
                            alt={project?.workspace?.name}
                          />
                          <AvatarFallback className="rounded-full bg-primary text-white text-[0.7rem]">
                            {project?.workspace?.name
                              ? getFirstLetterUppercase(project?.workspace?.name)
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span>{project?.workspace?.name}</span>
                      </div>
                    }
                  />
                </div>

                {/* Right Column */}
                <div className="flex-1 flex flex-col gap-5">
                  <InfoRow
                    label="Created At"
                    value={
                      project?.createdAt &&
                      formatTimeStampDate(
                        project?.createdAt as Timestamp,
                        "datetime"
                      )
                    }
                  />
                  <InfoRow
                    label="Updated At"
                    value={
                      project?.updatedAt &&
                      formatTimeStampDate(
                        project?.updatedAt as Timestamp,
                        "datetime"
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default DetailProjectPage;

// Sub-component for reusability
const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) => (
  <div className="text-[0.9rem] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
    <h1 className="w-[100px] max-w-[100px] truncate font-semibold text-gray-400">
      {label}
    </h1>
    <div className="text-gray-800 dark:text-gray-300">{value || "—"}</div>
  </div>
);

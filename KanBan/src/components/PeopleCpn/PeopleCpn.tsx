"use client";

import { Settings } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstLetterUppercase } from "@/lib/utils";
import useWorkspaceStore, { WorkspaceStoreState } from "@/store/workspace";
import { USER_TYPE } from "@/types";

const PeopleCpn = () => {
  const { workspace }: WorkspaceStoreState = useWorkspaceStore();

  return (
    <Card className="w-full rounded-sm">
      <CardHeader className="px-4 pt-4 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-[1.05rem] font-bold">
            People ({workspace?.joinUsers?.length ?? 0})
          </h1>
          <div className="text-black dark:text-white rounded-md p-2 bg-zinc-200 hover:bg-zinc-300 dark:bg-gray-900 dark:hover:bg-gray-800 cursor-pointer">
            <Settings size={20} />
          </div>
        </div>
      </CardHeader>

      <div className="mx-4 border-t border-dashed border-zinc-300 dark:border-gray-600" />

      <CardContent className="px-4 pb-4 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {workspace?.joinUsers?.slice(0, 3).map((user: USER_TYPE) => (
            <Card key={uuidv4()} className="rounded-md w-full">
              <CardContent className="p-5">
                <div className="flex flex-col items-center text-center gap-2">
                  <Avatar className="rounded-md">
                    <AvatarImage
                      src={"project avatar url"}
                      alt={user?.displayName}
                    />
                    <AvatarFallback className="rounded-full bg-primary text-white text-[0.9rem] font-bold">
                      {user?.displayName
                        ? getFirstLetterUppercase(user?.displayName)
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-sm font-bold truncate w-full">
                    {user?.displayName}
                  </h1>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full">
                    {user?.email}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PeopleCpn;
